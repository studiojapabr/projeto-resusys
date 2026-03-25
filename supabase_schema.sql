-- ═══════════════════════════════════════════════════════════════
-- RESUSYS — SCRIPT SQL COMPLETO PARA SUPABASE
-- Cole este script inteiro no "SQL Editor" do seu projeto Supabase
-- e clique em "Run". Todas as tabelas serão criadas automaticamente.
-- ═══════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────
-- EXTENSÕES
-- ─────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────
-- TABELA: profiles
-- Perfil público de cada usuário (espelha auth.users)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'user',   -- 'user' | 'admin'
  saldo       NUMERIC(10, 2) NOT NULL DEFAULT 0,
  missoes_cnt INTEGER NOT NULL DEFAULT 0,
  status      TEXT NOT NULL DEFAULT 'ativo',  -- 'ativo' | 'bloqueado'
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Garante que toda conta nova cria um profile automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─────────────────────────────────────────
-- TABELA: missions
-- Missões/tarefas criadas pelo admin
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.missions (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo     TEXT NOT NULL,
  descricao  TEXT,
  valor      NUMERIC(10, 2) NOT NULL DEFAULT 0,
  tipo       TEXT NOT NULL DEFAULT 'outro',   -- 'deposito'|'cadastro'|'indicacao'|'aposta'|'outro'
  link       TEXT,
  ativa      BOOLEAN NOT NULL DEFAULT TRUE,
  ordem      INTEGER NOT NULL DEFAULT 0,
  max_sub    INTEGER,                         -- Máximo de submissões aceitas (NULL = ilimitado)
  expiracao  DATE,                            -- Data de expiração (NULL = sem expiração)
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- TABELA: submissions
-- Comprovantes enviados pelos usuários
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.submissions (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  mission_id   UUID NOT NULL REFERENCES public.missions(id) ON DELETE CASCADE,
  user_name    TEXT NOT NULL,
  user_initials TEXT NOT NULL,
  mission_title TEXT NOT NULL,
  tipo         TEXT NOT NULL DEFAULT 'outro',
  valor        NUMERIC(10, 2) NOT NULL,
  status       TEXT NOT NULL DEFAULT 'pendente', -- 'pendente'|'aprovado'|'recusado'
  file_name    TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Quando uma submissão é aprovada: creditar saldo e incrementar contador
CREATE OR REPLACE FUNCTION public.handle_submission_approved()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  IF NEW.status = 'aprovado' AND OLD.status <> 'aprovado' THEN
    UPDATE public.profiles
    SET
      saldo       = saldo + NEW.valor,
      missoes_cnt = missoes_cnt + 1
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_submission_approved ON public.submissions;
CREATE TRIGGER on_submission_approved
  AFTER UPDATE ON public.submissions
  FOR EACH ROW EXECUTE FUNCTION public.handle_submission_approved();

-- ─────────────────────────────────────────
-- TABELA: withdrawals
-- Pedidos de saque dos usuários
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.withdrawals (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_name   TEXT NOT NULL,
  valor       NUMERIC(10, 2) NOT NULL,
  pix_key     TEXT NOT NULL,
  pix_tipo    TEXT NOT NULL DEFAULT 'email',  -- 'email'|'cpf'|'telefone'|'aleatoria'
  status      TEXT NOT NULL DEFAULT 'pendente', -- 'pendente'|'pago'|'recusado'
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Quando um saque é criado: debitar saldo do usuário
CREATE OR REPLACE FUNCTION public.handle_withdrawal_created()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE public.profiles
  SET saldo = saldo - NEW.valor
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_withdrawal_created ON public.withdrawals;
CREATE TRIGGER on_withdrawal_created
  AFTER INSERT ON public.withdrawals
  FOR EACH ROW EXECUTE FUNCTION public.handle_withdrawal_created();

-- Se um saque for recusado: devolver saldo
CREATE OR REPLACE FUNCTION public.handle_withdrawal_refund()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  IF NEW.status = 'recusado' AND OLD.status = 'pendente' THEN
    UPDATE public.profiles
    SET saldo = saldo + NEW.valor
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_withdrawal_refund ON public.withdrawals;
CREATE TRIGGER on_withdrawal_refund
  AFTER UPDATE ON public.withdrawals
  FOR EACH ROW EXECUTE FUNCTION public.handle_withdrawal_refund();

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- Cada instalação isola completamente os dados de outras.
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE public.profiles    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.missions     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawals  ENABLE ROW LEVEL SECURITY;

-- ── profiles ──
-- Usuário vê apenas o próprio perfil; admin vê todos
CREATE POLICY "profiles: user reads own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles: admin reads all" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

CREATE POLICY "profiles: user updates own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles: admin updates all" ON public.profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- ── missions ──
-- Todos os usuários autenticados podem LER missões ativas
CREATE POLICY "missions: authenticated reads" ON public.missions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Apenas admin pode criar/editar/deletar
CREATE POLICY "missions: admin writes" ON public.missions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- ── submissions ──
CREATE POLICY "submissions: user reads own" ON public.submissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "submissions: admin reads all" ON public.submissions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

CREATE POLICY "submissions: user inserts own" ON public.submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "submissions: admin updates" ON public.submissions
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- ── withdrawals ──
CREATE POLICY "withdrawals: user reads own" ON public.withdrawals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "withdrawals: admin reads all" ON public.withdrawals
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

CREATE POLICY "withdrawals: user inserts own" ON public.withdrawals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "withdrawals: admin updates" ON public.withdrawals
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- ═══════════════════════════════════════════════════════════════
-- DADOS INICIAIS (SEED)
-- 3 missões de exemplo para você começar
-- ═══════════════════════════════════════════════════════════════
INSERT INTO public.missions (titulo, descricao, valor, tipo, link, ativa, ordem)
VALUES
  ('DEPOSITE R$50 NA MGBET',     'Faça um depósito mínimo de R$50 na plataforma MGBET e envie o comprovante.', 25, 'deposito',  'https://mgbet.com',      TRUE, 0),
  ('CADASTRE NA ESTRELA BET',    'Crie sua conta na Estrela Bet usando nosso link.',                           10, 'cadastro',  'https://estrelabet.com', TRUE, 1),
  ('INDIQUE 5 AMIGOS',           'Convide 5 amigos para se cadastrar na plataforma.',                         30, 'indicacao', NULL,                     TRUE, 2)
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- COMO CRIAR SUA CONTA ADMIN
-- Após fazer deploy, cadastre-se normalmente na plataforma e
-- depois execute o comando abaixo no SQL Editor substituindo
-- o e-mail pelo que você usou no cadastro:
--
--   UPDATE public.profiles SET role = 'admin'
--   WHERE email = 'seu-email@exemplo.com';
--
-- Pronto! Ao fazer login com esse e-mail você terá acesso ao admin.
-- ═══════════════════════════════════════════════════════════════
