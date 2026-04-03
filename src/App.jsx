import { useState, useRef, useEffect } from "react";
import { Wallet, LogOut, ChevronLeft, X, Check, Clock, CloudUpload, Ticket, Trophy, Info, ExternalLink, Globe, MessageCircle, Music2, RefreshCw, Download, Paintbrush, SlidersHorizontal } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

import AdminApp from "./resusys-painel-admin";

import imgBgMobile from "./assets/bg-mobile.png";
import imgBgDesktop from "./assets/bg-desktop.png";
import imgIconePrincipal from "./assets/icone-task.png";
import imgLogo from "./assets/logo-t.png";

// ═══════════════════════════════════════════
// SUPABASE CLIENT
// ═══════════════════════════════════════════
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ═══════════════════════════════════════════
// SETTINGS PUB-SUB (runtime icon/glow overrides)
// ═══════════════════════════════════════════
let _S = {
  iconColor:    "#ffffff",
  coinGlow:     "rgba(35,35,35,0.90)",
  coinGlowMid:  "rgba(239,239,239,0.50)",
  coinGlowBlur: 22,
};
let _SL = [];
const updateSettings = (s) => { _S = { ..._S, ...s }; _SL.forEach((f) => f()); };
const useRuntimeSettings = () => {
  const [, fu] = useState(0);
  useEffect(() => {
    const l = () => fu((n) => n + 1);
    _SL.push(l);
    return () => { _SL = _SL.filter((x) => x !== l); };
  }, []);
  return _S;
};

// ═══════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════
const D = {
  bg1: "#080808", bg2: "#0f0f0f", bgCenter: "rgba(35,35,35,0.04)",
  glass: "rgba(255,255,255,0.04)", glassBorder: "rgba(255,255,255,0.09)", blur: "blur(20px)",
  radius: "60px", radiusSm: "30px",
  red: "#232323", redDark: "rgba(35,35,35,0.75)", orange: "#efefef",
  redGlow: "rgba(35,35,35,0.25)", green: "#efefef", greenGlow: "rgba(239,239,239,0.18)",
  yellow: "#F59E0B", blue: "#6B8EAD", purple: "#7A6B8A",
  white: "#ffffff", muted: "rgba(255,255,255,0.55)", dim: "rgba(255,255,255,0.35)", faint: "rgba(255,255,255,0.08)",
  btnGrad: "linear-gradient(90deg, #232323 0%, #efefef 100%)", cardGrad: "rgba(35,35,35,0.07)",
  btnGlow: "0 0 10px rgba(35,35,35,0.30), 0 0 20px rgba(239,239,239,0.12)", btnGlowSm: "0 0 8px rgba(35,35,35,0.25), 0 0 18px rgba(239,239,239,0.10)",
  titleGrad: "linear-gradient(90deg, #3b3b3b 0%, #ffffff 100%)",
  sora: "'Sora', sans-serif", maver: "'Maver', sans-serif",
};

// ═══════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════
const Styles = () => <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
  body, html, #root { background: ${D.bg1}; color: ${D.white}; font-family: ${D.sora}; overflow-x: hidden; min-height: 100dvh; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-thumb { background: rgba(35,35,35,0.25); border-radius: 10px; }
  input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.34); font-family: ${D.sora}; font-weight: 600; font-size: 13px; letter-spacing: 0.5px; }
  input, textarea, button { transition: all 0.2s ease; outline: none; } button { border: none; appearance: none; -webkit-appearance: none; }
  input:focus, textarea:focus { outline: none; border-color: #232323 !important; box-shadow: 0 0 0 2px rgba(35,35,35,0.14), 0 0 14px rgba(35,35,35,0.10); }
  @keyframes fadeUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
  @keyframes slideUp   { from{opacity:0;transform:translateY(50px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes scaleIn   { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
  @keyframes pulse     { 0%,100%{box-shadow:0 0 10px rgba(35,35,35,0.22)} 50%{box-shadow:0 0 24px rgba(35,35,35,0.35)} }
  @keyframes pulseDot  { 0%{transform:scale(1);opacity:0.65} 100%{transform:scale(2.1);opacity:0} }
  .pulse-dot-red { width:10px; height:10px; background:rgba(35,35,35,0.60); border-radius:50%; position:relative; flex-shrink:0; }
  .pulse-dot-red::after { content:""; position:absolute; inset:0; border-radius:50%; background:rgba(239,239,239,0.70); animation:pulseDot 2s infinite; }
  .pulse-dot-green { width:10px; height:10px; background:rgba(35,35,35,0.60); border-radius:50%; position:relative; flex-shrink:0; }
  .pulse-dot-green::after { content:""; position:absolute; inset:0; border-radius:50%; background:rgba(239,239,239,0.70); animation:pulseDot 2s infinite; }
  @keyframes glowPulse { 0%,100%{opacity:0.18} 50%{opacity:0.35} }
  @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
  @keyframes shake     { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-3px)} 75%{transform:translateX(3px)} }
  @keyframes countUp   { from{opacity:0;transform:scale(0.8)} to{opacity:1;transform:scale(1)} }
  @keyframes popIn     { 0%{opacity:0;transform:scale(0.45)} 60%{transform:scale(1.02)} 100%{opacity:1;transform:scale(1)} }
  @keyframes slideRight{ from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
  @keyframes spin      { to { transform: rotate(360deg); } }
  .premium-glass { transition: all 0.2s ease; box-shadow: 0 14px 34px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.06); }
  .btn-hover-grad:hover { filter: brightness(0.55); transform: scale(1.01); }
  .ic-btn { cursor: pointer; transition: filter 0.15s ease; } .ic-btn:hover { filter: brightness(0.7); }
  .txt-link { cursor: pointer; transition: opacity 0.15s; } .txt-link:hover { opacity: 0.7; }
`}</style>;

// ═══════════════════════════════════════════
// ICON SYSTEM — Lucide React (filled/solid)

const IC = {
  check:   (col = "#ffffff", s = 14) => <Check size={s} color={col} strokeWidth={1.75} />,
  x:       (col = "#ffffff", s = 14) => <X size={s} color={col} strokeWidth={1.75} />,
  clock:   (col = "#ffffff", s = 14) => <Clock size={s} color={col} strokeWidth={1.75} />,
  wallet:  (col = "#ffffff", s = 14) => <Wallet size={s} color={col} strokeWidth={1.75} />,
  upload:  (col = "#ffffff", s = 14) => <CloudUpload size={s} color={col} strokeWidth={1.75} />,
  logout:  (col = "#ffffff", s = 14) => <LogOut size={s} color={col} strokeWidth={1.75} />,
  back:    (col = "#ffffff", s = 14) => <ChevronLeft size={s} color={col} strokeWidth={1.75} />,
  trophy:  (col = "#ffffff", s = 14) => <Trophy size={s} color={col} strokeWidth={1.75} />,
  ticket:  (col = "#ffffff", s = 14) => <Ticket size={s} color={col} strokeWidth={1.75} />,
  info:    (col = "#ffffff", s = 14) => <Info size={s} color={col} strokeWidth={1.75} />,
  link:    (col = "#ffffff", s = 14) => <ExternalLink size={s} color={col} strokeWidth={1.75} />,
};

const SocialIcons = [
  { href: "https://instagram.com/SEU_PERFIL", icon: <Globe size={14} strokeWidth={1.75} /> },
  { href: "https://t.me/SEU_CANAL",           icon: <MessageCircle size={14} strokeWidth={1.75} /> },
  { href: "https://tiktok.com/@SEU_PERFIL",   icon: <Music2 size={14} strokeWidth={1.75} /> },
];

const MIcon = () => {
  const s = useRuntimeSettings();
  return (
    <div style={{ width: 150, height: 150, display: "flex", alignItems: "center", justifyContent: "center", animation: "float 3.5s ease-in-out infinite", position: "relative" }}>
      <div style={{ position: "absolute", inset: -50, background: `radial-gradient(circle, ${s.coinGlow} 0%, ${s.coinGlowMid} 35%, rgba(35,35,35,0.15) 60%, transparent 78%)`, borderRadius: "50%", filter: `blur(${s.coinGlowBlur}px)`, pointerEvents: "none" }} />
      <img src={imgIconePrincipal} alt="Moeda" style={{ width: "100%", height: "100%", objectFit: "contain", position: "relative", zIndex: 1 }} />
    </div>
  );
};

const Loading = () => (
  <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", background: D.bg1 }}>
    <div style={{ textAlign: "center" }}>
      <div style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(35,35,35,0.15)", borderTopColor: D.red, animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
      <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 700, color: D.muted, textTransform: "uppercase", letterSpacing: 1 }}>CARREGANDO...</span>
    </div>
  </div>
);

// ═══════════════════════════════════════════
// TELA: LANDING
// ═══════════════════════════════════════════
const Landing = ({ go }) => (
  <BG>
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 20px 44px", maxWidth: 430, width: "100%", margin: "0 auto" }}>
      <Glass s={{ padding: "36px 30px" }} a="slideUp 0.9s ease-out">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <img src={imgLogo} alt={"TASKY"} style={{ height: 28, width: "auto", objectFit: "contain" }} />
          <span style={{ fontFamily: D.sora, fontWeight: 800, fontSize: 12, color: D.muted, textTransform: "uppercase" }}>BEM VINDO</span>
        </div>
        <h1 style={{ fontFamily: D.sora, fontSize: 35, fontWeight: 800, lineHeight: 0.88, textTransform: "uppercase", letterSpacing: -2, wordBreak: "break-word", background: D.titleGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 14 }} dangerouslySetInnerHTML={{ __html: "CONCLUA TAREFAS E GANHE" }} />
        <p style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: D.muted, marginBottom: 30 }}>{"SOLICITE O SAQUE 24H"}</p>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Btn onClick={() => go("register")} s={{ flex: 1 }}>CADASTRE-SE</Btn>
          <Btn v="outline" onClick={() => go("login")} s={{ flex: 1 }}>LOGIN</Btn>
        </div>
      </Glass>
    </div>
  </BG>
);

// ═══════════════════════════════════════════
// TELA: LOGIN
// ═══════════════════════════════════════════
const LoginScreen = ({ go }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    setLoading(false);
    if (error) { setToast(error.message === "Invalid login credentials" ? "E-MAIL OU SENHA INCORRETOS!" : error.message.toUpperCase()); setTimeout(() => setToast(null), 2500); }
  };

  return (
    <><ToastC msg={toast} type="danger" />
    <BG>
      <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 20px 44px", maxWidth: 430, width: "100%", margin: "0 auto" }}>
        <Glass s={{ padding: "36px 30px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
            <img src={imgLogo} alt={"TASKY"} style={{ height: 28, width: "auto", objectFit: "contain" }} />
            <div onClick={() => go("landing")} className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{IC.back("rgba(255,255,255,0.7)")}</div>
          </div>
          <h1 style={{ fontFamily: D.sora, fontSize: 35, fontWeight: 800, lineHeight: 0.88, textTransform: "uppercase", letterSpacing: -2, wordBreak: "break-word", background: D.titleGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 28 }} dangerouslySetInnerHTML={{ __html: "SEJA BEM VINDO" }} />
          <Inp placeholder="E-MAIL:" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <Inp placeholder="SENHA:" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
          <Btn onClick={handleLogin} disabled={loading || !email || !senha}>{loading ? "ENTRANDO..." : "ENTRAR"}</Btn>
          <p onClick={() => go("register")} className="txt-link" style={{ textAlign: "center", marginTop: 18, fontFamily: D.sora, fontSize: 12, color: D.dim, textTransform: "uppercase", fontWeight: 600 }}>{"NÃO TEM CONTA?"} <span style={{ color: D.red, fontWeight: 800 }}>{"CADASTRE-SE"}</span></p>
        </Glass>
      </div>
    </BG></>
  );
};

// ═══════════════════════════════════════════
// TELA: CADASTRO
// ═══════════════════════════════════════════
const RegisterScreen = ({ go }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setToast("E-MAIL INVÁLIDO!"); setTimeout(() => setToast(null), 2500); return; }
    if (senha.length < 6) { setToast("SENHA MÍNIMA: 6 CARACTERES!"); setTimeout(() => setToast(null), 2500); return; }
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password: senha, options: { data: { name: nome, role: "user" } } });
    setLoading(false);
    if (error) { setToast(error.message.toUpperCase()); setTimeout(() => setToast(null), 2500); }
  };

  return (
    <><ToastC msg={toast} type="danger" />
    <BG>
      <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 20px 44px", maxWidth: 430, width: "100%", margin: "0 auto" }}>
        <Glass s={{ padding: "36px 30px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
            <img src={imgLogo} alt={"TASKY"} style={{ height: 28, width: "auto", objectFit: "contain" }} />
            <span style={{ fontFamily: D.sora, fontWeight: 800, fontSize: 12, color: D.muted, textTransform: "uppercase" }}>BEM VINDO</span>
          </div>
          <h1 style={{ fontFamily: D.sora, fontSize: 35, fontWeight: 800, lineHeight: 0.88, textTransform: "uppercase", letterSpacing: -2, wordBreak: "break-word", background: D.titleGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 28 }} dangerouslySetInnerHTML={{ __html: "CRIE SUA CONTA" }} />
          <Inp placeholder="NOME DE USUÁRIO:" value={nome} onChange={e => setNome(e.target.value)} />
          <Inp placeholder="E-MAIL:" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <Inp placeholder="SENHA:" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
          <div style={{ marginTop: 12 }}>
            <Btn onClick={handleRegister} disabled={loading || !nome || !email || !senha}>{loading ? "CRIANDO..." : "CONTINUAR"}</Btn>
          </div>
          <p onClick={() => go("login")} className="txt-link" style={{ textAlign: "center", marginTop: 18, fontFamily: D.sora, fontSize: 12, color: D.dim, textTransform: "uppercase", fontWeight: 600 }}>{"JÁ TEM CONTA?"} <span style={{ color: D.red, fontWeight: 800 }}>{"FAÇA LOGIN"}</span></p>
        </Glass>
      </div>
    </BG></>
  );
};

// ═══════════════════════════════════════════
// BOTÃO SORTEIO MINI
// ═══════════════════════════════════════════
const RaffleBtnUser = ({ go, profile }) => {
  const [raffle, setRaffle] = useState(null);
  const [myTickets, setMyTickets] = useState(0);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("raffles").select("*").eq("status", "ativo").maybeSingle();
      if (data) {
        setRaffle(data);
        const { data: tks } = await supabase.from("raffle_tickets").select("quantidade").eq("raffle_id", data.id).eq("user_id", profile.id).eq("status", "aprovado");
        if (tks) setMyTickets(tks.reduce((s, t) => s + t.quantidade, 0));
      }
    };
    load();
  }, [profile.id]);

  if (!raffle) return null;
  return (
    <div onClick={() => go("raffle")} className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", background: D.btnGrad, boxShadow: D.btnGlowSm, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", animation: "pulse 2.4s infinite" }}>
      {IC.ticket("white")}
      {myTickets > 0 && (
        <div style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, borderRadius: "50%", background: "#050505", border: `1px solid ${D.orange}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, fontFamily: D.sora, color: D.orange }}>{myTickets}</div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════
// TELA: SORTEIO (USUÁRIO)
// ═══════════════════════════════════════════
const RaffleScreen = ({ go, profile }) => {
  const [raffle, setRaffle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myTickets, setMyTickets] = useState(0);
  const [myPending, setMyPending] = useState(false);
  const [prizeUrl, setPrizeUrl] = useState(null);
  const [modal, setModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [file, setFile] = useState(null);
  const [valor, setValor] = useState("");
  const [observacao, setObservacao] = useState("");
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 2500); };

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("raffles").select("*").eq("status", "ativo").maybeSingle();
    if (data) {
      setRaffle(data);
      if (data.imagem_url) {
        const { data: signed } = await supabase.storage.from("raffle-prizes").createSignedUrl(data.imagem_url, 300);
        if (signed?.signedUrl) setPrizeUrl(signed.signedUrl);
      }
      const { data: tks } = await supabase.from("raffle_tickets").select("quantidade, status").eq("raffle_id", data.id).eq("user_id", profile.id);
      if (tks) {
        setMyTickets(tks.filter(t => t.status === "aprovado").reduce((s, t) => s + t.quantidade, 0));
        setMyPending(tks.some(t => t.status === "pendente"));
      }
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, [profile.id]);

  const handleSend = async () => {
    if (!file || !valor || Number(valor) < 20) { showToast("VALOR MÍNIMO: R$20", "danger"); return; }
    setUploading(true);
    const { data: { session } } = await supabase.auth.getSession();
    const authUserId = session?.user?.id;
    if (!authUserId) { showToast("SESSÃO EXPIRADA. FAÇA LOGIN NOVAMENTE.", "danger"); setUploading(false); return; }
    const filePath = `${authUserId}/${raffle.id}/${Date.now()}_${file.name}`;
    const { error: upErr } = await supabase.storage.from("raffle-comprovantes").upload(filePath, file);
    if (upErr) { showToast("ERRO NO UPLOAD: " + upErr.message); setUploading(false); return; }
    const { error: insErr } = await supabase.from("raffle_tickets").insert({ raffle_id: raffle.id, user_id: authUserId, user_name: profile.name, quantidade: Math.floor(Number(valor) / 20), valor_depositado: Number(valor), file_name: filePath, status: "pendente", observacao: observacao.trim() || null });
    setUploading(false);
    if (insErr) { showToast("ERRO: " + insErr.message); return; }
    setModal(false); setFile(null); setValor(""); setObservacao("");
    showToast("COMPROVANTE ENVIADO!", "success");
    load();
  };

  const socialLinks = [
    { href: "https://instagram.com/SEU_PERFIL", icon: <SvgPhone size={18} /> },
    { href: "https://t.me/SEU_CANAL",  icon: <SvgTelegram size={18} /> },
    { href: "https://tiktok.com/@SEU_PERFIL",    icon: <SvgTiktok size={18} /> },
  ];

  return (
    <>
      {toast && <ToastC msg={toast?.msg || toast} type={toast?.type || "success"} />}
      <div style={{ padding: "0 20px 44px", maxWidth: 430, width: "100%", margin: "0 auto" }}>

        {/* Header */}
        <Glass s={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", marginTop: 16 }} a="fadeUp 0.6s ease-out">
          <img src={imgLogo} alt={"TASKY"} style={{ height: 28, width: "auto", objectFit: "contain" }} />
          <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, color: myPending ? D.yellow : myTickets > 0 ? D.orange : D.muted, textTransform: "uppercase" }}>
            {myPending ? "EM ANÁLISE" : `${myTickets} TICKET${myTickets !== 1 ? "S" : ""}`}
          </span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div onClick={() => go("dashboard")} className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>{IC.back("rgba(255,255,255,0.7)")}</div>
          </div>
        </Glass>

        <h1 style={{ fontFamily: D.sora, fontSize: 35, fontWeight: 800, lineHeight: 0.88, textTransform: "uppercase", letterSpacing: -2, wordBreak: "break-word", background: D.titleGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", margin: "18px 0 8px 4px", animation: "fadeUp 0.6s ease-out 0.1s both" }} dangerouslySetInnerHTML={{ __html: "SORTEIO ESPECIAL" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14, marginLeft: 4, animation: "fadeUp 0.6s ease-out 0.15s both" }}>
          <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 700, color: D.white, textTransform: "uppercase", letterSpacing: 0.5 }}>R$20 = 1 <span style={{ color: D.orange }}>TICKET</span></span>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 22, marginLeft: 4, animation: "fadeUp 0.6s ease-out 0.2s both" }}>
          {socialLinks.map(({ href, icon }, idx) => (
            <a key={idx} href={href} target="_blank" rel="noopener noreferrer" className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.70)", textDecoration: "none" }}>{icon}</a>
          ))}
          <div style={{ width: 35, height: 35, borderRadius: "50%", background: D.btnGrad, boxShadow: D.btnGlowSm, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, animation: "pulse 2.4s infinite" }}>
            {IC.ticket("white")}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 40, color: D.muted, fontFamily: D.sora, fontSize: 12, textTransform: "uppercase" }}>CARREGANDO...</div>
        ) : !raffle ? (
          <Glass s={{ padding: "36px 28px", textAlign: "center" }}>
            <p style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 700, color: D.muted, textTransform: "uppercase" }}>{"NENHUM SORTEIO ATIVO NO MOMENTO."}</p>
          </Glass>
        ) : (
          <div style={{ borderRadius: D.radiusSm, background: "linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 40%, #3a3a3a 100%)", padding: "28px 24px", position: "relative", overflow: "hidden", animation: "slideUp 0.6s ease-out 0.25s both" }}>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(to top, rgba(0,0,0,0.28), transparent)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, letterSpacing: 0.5, color: "rgba(255,255,255,0.80)", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.90)", flexShrink: 0 }} /> SORTEIO ESPECIAL
              </span>
              <h2 style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, lineHeight: 1.15, textTransform: "uppercase", margin: "0 0 10px", color: "#ffffff", letterSpacing: 0.5 }}>{raffle.titulo}</h2>
              {prizeUrl && (
                <div style={{ width: "100%", borderRadius: 14, overflow: "hidden", marginBottom: 14, background: "rgba(0,0,0,0.20)" }}>
                  <img src={prizeUrl} alt="Prêmio" style={{ width: "100%", height: "auto", display: "block", maxHeight: 220, objectFit: "cover" }} />
                </div>
              )}
              <p style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.75)", letterSpacing: 0.3, textTransform: "uppercase", marginBottom: 18 }}>{raffle.premio}</p>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Btn onClick={() => { setFile(null); setValor(""); setModal(true); }} s={{ width: "auto", maxWidth: 200, background: "rgba(0,0,0,0.30)", border: "1px solid rgba(255,255,255,0.30)", backdropFilter: "none" }}>
                  COMPROVANTE
                </Btn>
                {raffle.link && (
                  <div onClick={() => window.open(raffle.link, "_blank")} className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.30)", background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <ExternalLink size={14} color="rgba(255,255,255,0.60)" strokeWidth={1.75} />
                  </div>
                )}
                {raffle.link2 && (
                  <div onClick={() => window.open(raffle.link2, "_blank")} className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.30)", background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <ExternalLink size={14} color="rgba(255,255,255,0.60)" strokeWidth={1.75} />
                  </div>
                )}
                <div onClick={() => setInfoModal(true)} className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", background: D.btnGrad, boxShadow: D.btnGlowSm, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {IC.info("white")}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Upload comprovante */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(5,5,5,0.70)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "fadeIn 0.24s" }} onClick={() => setModal(false)}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 380, animation: "scaleIn 0.35s ease-out" }}>
            <Glass s={{ padding: "30px 24px", textAlign: "center" }}>
              <h3 style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, textTransform: "uppercase", marginBottom: 8 }}>ENVIAR COMPROVANTE</h3>
              <p style={{ fontFamily: D.sora, fontSize: 12, color: D.muted, marginBottom: 20, textTransform: "uppercase" }}>Informe o valor depositado e envie o print.</p>
              <Inp placeholder="VALOR DEPOSITADO (R$):" type="number" value={valor} onChange={e => setValor(e.target.value)} />
              {valor && Number(valor) >= 20 && (
                <div style={{ padding: "8px 16px", borderRadius: D.radius, background: "rgba(192,192,192,0.08)", border: "1px solid rgba(192,192,192,0.20)", marginBottom: 14, fontFamily: D.sora, fontSize: 12, fontWeight: 800, color: D.orange }}>
                  = {Math.floor(Number(valor) / 20)} TICKET(S)
                </div>
              )}
              <div onClick={() => document.getElementById("raffleFileInput").click()} className="ic-btn" style={{ border: `1px solid ${D.glassBorder}`, borderRadius: D.radius, padding: "24px 16px", marginBottom: 18, background: D.glass }}>
                <input id="raffleFileInput" type="file" accept="image/png,image/jpeg" style={{ display: "none" }} onChange={e => { const f = e.target.files[0]; if (f && f.size > 5 * 1024 * 1024) { showToast("ARQUIVO MAIOR QUE 5MB!", "danger"); return; } setFile(f || null); }} />
                {file
                  ? <p style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 700, color: D.orange, textTransform: "uppercase" }}>{file.name}</p>
                  : <><p style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 700, color: D.muted, textTransform: "uppercase" }}>TOQUE PARA ENVIAR</p><p style={{ fontFamily: D.sora, fontSize: 12, color: D.dim, marginTop: 4, textTransform: "uppercase" }}>PNG, JPG — MÁX 5MB</p></>}
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <Btn onClick={handleSend} disabled={uploading || !file || !valor || Number(valor) < 20} s={{ flex: 1 }}>{uploading ? "ENVIANDO..." : "CONFIRMAR"}</Btn>
                <div onClick={() => setModal(false)} className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", border: `1px solid ${D.glassBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{IC.x(D.muted)}</div>
              </div>
            </Glass>
          </div>
        </div>
      )}

      {/* Modal: FaCircleInfo sorteio */}
      {infoModal && raffle && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(5,5,5,0.70)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "fadeIn 0.24s" }} onClick={() => setInfoModal(false)}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 380, animation: "scaleIn 0.35s ease-out" }}>
            <Glass s={{ padding: "30px 24px", textAlign: "center" }}>
              <h3 style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, textTransform: "uppercase", marginBottom: 12 }}>{raffle.titulo}</h3>
              <p style={{ fontFamily: D.sora, fontSize: 12, color: D.muted, marginBottom: 10, textTransform: "uppercase", lineHeight: 1.6 }}>{raffle.descricao || "Sem descrição disponível."}</p>
              <p style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, color: D.orange, marginBottom: 20, textTransform: "uppercase" }}>R$20 = 1 TICKET — SEUS TICKETS: {myTickets}</p>
              <Btn onClick={() => setInfoModal(false)}>ENTENDI</Btn>
            </Glass>
          </div>
        </div>
      )}
    </>
  );
};

// ═══════════════════════════════════════════
// TELA: DASHBOARD DO USUÁRIO
// ═══════════════════════════════════════════
const UserDash = ({ profile, go, onLogout }) => {
  const [missions, setMissions] = useState([]);
  const [loadingMissions, setLoadingMissions] = useState(true);
  const [modal, setModal] = useState(null);
  const [done, setDone] = useState({});
  const [info, setInfo] = useState(null);
  const [toast, setToast] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [observacao, setObservacao] = useState("");
  const [saldo, setSaldo] = useState(profile?.saldo ?? 0);

  useEffect(() => {
    const fetchMissions = async () => {
      const { data, error } = await supabase.from("missions").select("*").eq("ativa", true).order("ordem", { ascending: true });
      if (!error) setMissions(data || []);
      setLoadingMissions(false);
    };
    fetchMissions();
  }, []);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const { data } = await supabase.from("submissions").select("mission_id, status").eq("user_id", profile.id).in("status", ["pendente", "aprovado"]);
      if (data) { const doneMap = {}; data.forEach(s => { doneMap[s.mission_id] = s.status; }); setDone(doneMap); }
    };
    fetchSubmissions();
  }, [profile.id]);

  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 2500); };

  const handleSubmit = async (missionId) => {
    if (!file) return;
    setUploading(true);
    const mission = missions.find(m => m.id === missionId);
    const filePath = `${profile.id}/${missionId}/${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage.from("comprovantes").upload(filePath, file);
    if (uploadError) { showToast("ERRO NO UPLOAD: " + uploadError.message, "danger"); setUploading(false); return; }
    const ini = profile.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    const { error: subError } = await supabase.from("submissions").insert({ user_id: profile.id, mission_id: missionId, user_name: profile.name, user_initials: ini, mission_title: mission.titulo, tipo: mission.tipo, valor: mission.valor, file_name: filePath, status: "pendente", observacao: observacao.trim() || null });
    setUploading(false);
    if (subError) { showToast("ERRO: " + subError.message, "danger"); return; }
    setDone(p => ({ ...p, [missionId]: "pendente" }));
    setModal(null); setFile(null); setObservacao("");
    showToast("COMPROVANTE ENVIADO!", "success");
  };

  const socialLinks = [
    { href: "https://instagram.com/SEU_PERFIL", icon: <SvgPhone size={18} /> },
    { href: "https://t.me/SEU_CANAL",  icon: <SvgTelegram size={18} /> },
    { href: "https://tiktok.com/@SEU_PERFIL",    icon: <SvgTiktok size={18} /> },
  ];

  return (
    <>
      {toast && <ToastC msg={toast.msg} type={toast.type} />}
      <div style={{ padding: "0 20px 44px", maxWidth: 430, width: "100%" }}>

        {/* Header */}
        <Glass s={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", marginTop: 16 }} a="fadeUp 0.6s ease-out">
          <img src={imgLogo} alt={"TASKY"} style={{ height: 28, width: "auto", objectFit: "contain" }} />
          <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, color: saldo >= 5 ? D.orange : D.muted, textTransform: "uppercase" }}>R$ {Number(saldo).toFixed(2).replace(".", ",")}</span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div onClick={() => go("withdrawal")} className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", background: D.btnGrad, boxShadow: D.btnGlowSm, display: "flex", alignItems: "center", justifyContent: "center", animation: saldo > 0 ? "pulse 2.4s infinite" : "none" }}>{IC.wallet("white")}</div>
            <div onClick={onLogout} className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>{IC.back("rgba(255,255,255,0.60)")}</div>
          </div>
        </Glass>

        <h1 style={{ fontFamily: D.sora, fontSize: 35, fontWeight: 800, lineHeight: 0.88, textTransform: "uppercase", letterSpacing: -2, wordBreak: "break-word", background: D.titleGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", margin: "18px 0 8px 4px", animation: "fadeUp 0.6s ease-out 0.1s both" }} dangerouslySetInnerHTML={{ __html: "SUAS TAREFAS" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14, marginLeft: 4, animation: "fadeUp 0.6s ease-out 0.15s both" }}>
          <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 700, color: D.white, textTransform: "uppercase", letterSpacing: 0.5 }}>{"NOVAS TAREFAS EM 24H"}</span>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 22, marginLeft: 4, animation: "fadeUp 0.6s ease-out 0.2s both" }}>
          {socialLinks.map(({ href, icon }, idx) => (
            <a key={idx} href={href} target="_blank" rel="noopener noreferrer" className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.70)", textDecoration: "none" }}>{icon}</a>
          ))}
          <RaffleBtnUser go={go} profile={profile} />
        </div>

        {loadingMissions
          ? <div style={{ textAlign: "center", padding: 40, color: D.muted, fontFamily: D.sora, fontSize: 12, textTransform: "uppercase" }}>CARREGANDO MISSÕES...</div>
          : missions.length === 0
            ? <div style={{ textAlign: "center", padding: 40, color: D.muted, fontFamily: D.sora, fontSize: 12, textTransform: "uppercase" }}>NENHUMA MISSÃO ATIVA.</div>
            : <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {missions.map((m, i) => {
                  const completed = done[m.id];
                  const aprovado = done[m.id] === "aprovado";
                  return (
                    <Glass key={m.id} s={{ padding: "28px 24px", background: aprovado ? "rgba(192,192,192,0.10)" : completed ? "rgba(192,192,192,0.06)" : D.glass, borderColor: aprovado ? "rgba(192,192,192,0.35)" : completed ? "rgba(192,192,192,0.18)" : D.glassBorder }} a={`slideUp 0.6s ease-out ${0.2 + i * 0.08}s both`}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ flex: 1, zIndex: 1 }}>
                          <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, letterSpacing: 0.5, color: completed ? D.orange : D.muted, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
                            <span className={completed ? "pulse-dot-green" : "pulse-dot-red"} /> TAREFA {String(i + 1).padStart(2, "0")}
                          </span>
                          <h2 style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, lineHeight: 1.15, textTransform: "uppercase", margin: "8px 0 10px", color: completed ? D.muted : D.white, letterSpacing: 0.5 }}>{m.titulo}</h2>
                          <p style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, color: completed ? D.orange : D.muted, letterSpacing: 0.3, textTransform: "uppercase", marginBottom: 16 }}>VALOR: {m.valor}R$</p>
                          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                            {aprovado
                              ? <div style={{ padding: "10px 22px", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.22)", borderRadius: D.radius, fontFamily: D.sora, fontSize: 12, fontWeight: 800, letterSpacing: 0.5, color: "rgba(134,239,172,0.85)", display: "flex", alignItems: "center", gap: 8, textTransform: "uppercase" }}>{IC.check("rgba(134,239,172,0.85)")} CONCLUÍDO</div>
                              : completed
                                ? <div style={{ padding: "10px 22px", background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: D.radius, fontFamily: D.sora, fontSize: 12, fontWeight: 800, letterSpacing: 0.5, color: D.yellow, display: "flex", alignItems: "center", gap: 8, textTransform: "uppercase" }}>{IC.clock(D.yellow)} EM ANÁLISE</div>
                                : <Btn onClick={() => { setFile(null); setObservacao(""); setModal(m.id); }} s={{ width: "auto", maxWidth: 200 }}>COMPROVANTE</Btn>}
                            {m.link && (
                              <div onClick={() => window.open(m.link, "_blank")} className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <ExternalLink size={14} color="rgba(255,255,255,0.60)" strokeWidth={1.75} />
                              </div>
                            )}
                            <div onClick={() => setInfo(m)} className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", background: D.btnGrad, boxShadow: D.btnGlowSm, border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              {IC.info("white")}
                            </div>
                          </div>
                        </div>
                        <div style={{ position: "absolute", right: -30, bottom: -20, opacity: completed ? 0.2 : 0.95 }}>
                          <MIcon />
                        </div>
                      </div>
                    </Glass>
                  );
                })}
              </div>
        }
      </div>

      {/* FaCircleInfo Modal */}
      {info && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(5,5,5,0.70)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "fadeIn 0.24s" }} onClick={() => setInfo(null)}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 380, animation: "scaleIn 0.35s ease-out" }}>
            <Glass s={{ padding: "30px 24px", textAlign: "center" }}>
              <h3 style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, textTransform: "uppercase", marginBottom: 12 }}>{info.titulo}</h3>
              <p style={{ fontFamily: D.sora, fontSize: 12, color: D.muted, marginBottom: 8, textTransform: "uppercase", lineHeight: 1.5 }}>{info.descricao || "Sem descrição disponível."}</p>
              <p style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, color: D.orange, marginBottom: 20, textTransform: "uppercase" }}>VALOR: {info.valor}R$</p>
              <Btn onClick={() => setInfo(null)}>ENTENDI</Btn>
            </Glass>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(5,5,5,0.70)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "fadeIn 0.24s" }} onClick={() => { setModal(null); setFile(null); }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 380, animation: "scaleIn 0.35s ease-out" }}>
            <Glass s={{ padding: "30px 24px", textAlign: "center" }}>
              <h3 style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, textTransform: "uppercase", marginBottom: 8, letterSpacing: 0.5 }}>ENVIAR COMPROVANTE</h3>
              <p style={{ fontFamily: D.sora, fontSize: 12, color: D.muted, marginBottom: 22, fontWeight: 500, textTransform: "uppercase" }}>Envie o print para validação.</p>
              <div onClick={() => document.getElementById("fileInput").click()} className="ic-btn" style={{ border: `1px solid ${D.glassBorder}`, borderRadius: D.radius, padding: "32px 16px", textAlign: "center", marginBottom: 18, background: D.glass }}>
                <input id="fileInput" type="file" accept="image/png,image/jpeg" style={{ display: "none" }} onChange={e => { const f = e.target.files[0]; if (f && f.size > 5 * 1024 * 1024) { showToast("ARQUIVO MAIOR QUE 5MB!", "danger"); e.target.value = ""; return; } setFile(f || null); }} />
                {file
                  ? <><p style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 700, color: D.orange, textTransform: "uppercase" }}>{file.name}</p><p style={{ fontFamily: D.sora, fontSize: 12, color: D.muted, marginTop: 4, textTransform: "uppercase" }}>{(file.size / 1024).toFixed(0)}KB — TOQUE PARA TROCAR</p></>
                  : <>{IC.upload("rgba(255,255,255,0.15)")}<p style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 700, color: D.muted, marginTop: 10, textTransform: "uppercase" }}>TOQUE PARA ENVIAR</p><p style={{ fontFamily: D.sora, fontSize: 12, color: D.dim, marginTop: 4, textTransform: "uppercase" }}>PNG, JPG — MÁX 5MB</p></>}
              </div>
              <div style={{ marginBottom: 18, textAlign: "left" }}>
                <p style={{ fontFamily: D.sora, fontSize: 11, fontWeight: 700, color: D.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>OBSERVAÇÃO <span style={{ color: D.dim, fontWeight: 400 }}>(OPCIONAL)</span></p>
                <textarea value={observacao} onChange={e => setObservacao(e.target.value)} placeholder="DESCREVA AQUI SE NECESSÁRIO..." maxLength={300} rows={3} style={{ width: "100%", boxSizing: "border-box", background: D.glass, backdropFilter: D.blur, border: `1px solid ${D.glassBorder}`, borderRadius: 16, padding: "12px 16px", fontFamily: D.sora, fontSize: 12, fontWeight: 600, color: D.white, letterSpacing: 0.3, resize: "none", outline: "none" }} />
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <Btn onClick={() => !uploading && file && handleSubmit(modal)} disabled={uploading || !file} s={{ flex: 1 }}>{uploading ? "ENVIANDO..." : "CONFIRMAR ENVIO"}</Btn>
                <div onClick={() => { setModal(null); setObservacao(""); }} className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", border: `1px solid ${D.glassBorder}`, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.05)", flexShrink: 0 }}>{IC.x(D.muted)}</div>
              </div>
            </Glass>
          </div>
        </div>
      )}
    </>
  );
};

// ═══════════════════════════════════════════
// TELA: SAQUE
// ═══════════════════════════════════════════
const Withdrawal = ({ go, profile }) => {
  const [nome, setNome] = useState(profile?.name || "");
  const [cpf, setCpf] = useState("");
  const [pix, setPix] = useState("");
  const [valor, setValor] = useState("");
  const [ok, setOk] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const saldo = profile?.saldo ?? 0;

  const showToast = (msg, type = "danger") => { setToast({ msg, type }); setTimeout(() => setToast(null), 2500); };

  const handleSaque = async () => {
    const val = Number(valor);
    if (val <= 0) { showToast("VALOR INVÁLIDO!"); return; }
    if (val > saldo) { showToast("SALDO INSUFICIENTE!"); return; }
    setLoading(true);
    const { error } = await supabase.from("withdrawals").insert({ user_id: profile.id, user_name: nome, valor: val, pix_key: pix, pix_tipo: pix.includes("@") ? "email" : /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(pix) ? "cpf" : "aleatoria", status: "pendente" });
    setLoading(false);
    if (error) { showToast("ERRO: " + error.message); return; }
    setOk(true);
  };

  if (ok) return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 20px 44px", maxWidth: 430, width: "100%", margin: "0 auto" }}>
      <Glass s={{ padding: "36px 30px", display: "flex", flexDirection: "column", alignItems: "center" }} a="slideUp 0.6s ease-out">
        <div style={{ width: 35, height: 35, borderRadius: "50%", background: D.btnGrad, boxShadow: D.btnGlowSm, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, animation: "popIn 0.6s ease-out" }}>{IC.check("white")}</div>
        <h2 style={{ fontFamily: D.sora, fontSize: 35, fontWeight: 800, textTransform: "uppercase", textAlign: "center", marginBottom: 14, letterSpacing: -2, lineHeight: 0.88, wordBreak: "break-word", background: D.titleGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }} dangerouslySetInnerHTML={{ __html: "VALOR SOLICITADO!" }} />
        <p style={{ fontFamily: D.sora, fontSize: 12, color: D.muted, textAlign: "center", marginBottom: 28, textTransform: "uppercase", fontWeight: 600 }}>Processamento em até 24h.</p>
        <div onClick={() => go("dashboard")} className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>{IC.back("rgba(255,255,255,0.7)")}</div>
      </Glass>
    </div>
  );

  return (
    <><ToastC msg={toast?.msg} type={toast?.type} />
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 20px 44px", maxWidth: 430, width: "100%", margin: "0 auto" }}>
      <Glass s={{ padding: "34px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <img src={imgLogo} alt={"TASKY"} style={{ height: 28, width: "auto", objectFit: "contain" }} />
          <div onClick={() => go("dashboard")} className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{IC.back("rgba(255,255,255,0.7)")}</div>
        </div>
        <h1 style={{ fontFamily: D.sora, fontSize: 35, fontWeight: 800, lineHeight: 0.88, textTransform: "uppercase", letterSpacing: -2, wordBreak: "break-word", background: D.titleGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: "SOLICITE SEU PIX E AGUARDE" }} />
        <p style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: D.muted, marginBottom: 22 }}>PREENCHA OS DADOS CORRETAMENTE</p>
        <div style={{ padding: "10px 22px", borderRadius: D.radius, background: D.glass, border: `1px solid ${D.glassBorder}`, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: 40 }}>
          <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, color: D.muted, textTransform: "uppercase" }}>SALDO</span>
          <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, color: D.orange, textTransform: "uppercase" }}>R$ {Number(saldo).toFixed(2).replace(".", ",")}</span>
        </div>
        <Inp placeholder="NOME COMPLETO:" value={nome} onChange={e => setNome(e.target.value)} />
        <div style={{ display: "flex", gap: 12 }}>
          <Inp placeholder="CPF:" value={cpf} onChange={e => setCpf(e.target.value)} s={{ flex: "0 0 36%" }} />
          <Inp placeholder="CHAVE PIX:" value={pix} onChange={e => setPix(e.target.value)} s={{ flex: 1 }} />
        </div>
        <Inp placeholder="VALOR DESEJADO:" type="number" value={valor} onChange={e => setValor(e.target.value)} />
        <div style={{ marginTop: 12 }}>
          <Btn onClick={handleSaque} disabled={loading || !nome || !cpf || !pix || !valor}>{loading ? "SOLICITANDO..." : "SACAR"}</Btn>
        </div>
      </Glass>
    </div></>
  );
};

// ═══════════════════════════════════════════
// APP PRINCIPAL
// ═══════════════════════════════════════════
export default function App() {
  const [session, setSession] = useState(undefined);
  const [profile, setProfile] = useState(null);
  const [page, setPage] = useState("landing");
  const [trans, setTrans] = useState(false);

  // Carrega settings do Supabase ao iniciar
  useEffect(() => {
    supabase.from("settings").select("value").eq("key", "app_config").maybeSingle()
      .then(({ data }) => {
        if (data?.value) {
          try { updateSettings(JSON.parse(data.value)); } catch {}
        }
      });
  }, []);

  const go = (p) => { setTrans(true); setTimeout(() => { setPage(p); setTrans(false); window.scrollTo(0, 0); }, 180); };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) loadProfile(session.user.id);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) { loadProfile(session.user.id); } else { setProfile(null); setPage("landing"); }
    });
    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId) => {
    const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
    if (data) { setProfile(data); if (data.role !== "admin") go("dashboard"); }
  };

  const handleLogout = async () => { await supabase.auth.signOut(); setProfile(null); setPage("landing"); };

  if (session === undefined) return <><Styles /><Loading /></>;
  if (session && profile?.role === "admin") return <AdminApp />;

  if (session && profile) {
    if (page === "withdrawal") return <><Styles /><BG><div style={{ opacity: trans ? 0 : 1, transition: "opacity 0.18s" }}><Withdrawal go={go} profile={profile} /></div></BG></>;
    if (page === "raffle")     return <><Styles /><BG><div style={{ opacity: trans ? 0 : 1, transition: "opacity 0.18s" }}><RaffleScreen go={go} profile={profile} /></div></BG></>;
    return <><Styles /><BG><div style={{ opacity: trans ? 0 : 1, transition: "opacity 0.18s" }}><UserDash profile={profile} go={go} onLogout={handleLogout} /></div></BG></>;
  }

  return (
    <><Styles />
    <div style={{ opacity: trans ? 0 : 1, transition: "opacity 0.18s" }}>
      {page === "landing"  && <Landing go={go} />}
      {page === "login"    && <LoginScreen go={go} />}
      {page === "register" && <RegisterScreen go={go} />}
    </div></>
  );
}
