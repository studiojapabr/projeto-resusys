// ═══════════════════════════════════════════
//  THEME.JS — Identidade Visual
//  Altere APENAS PRIMARY e SECONDARY aqui.
//  Todo o resto do app usa esses tokens.
// ═══════════════════════════════════════════

// ── 1. CORES BASE ────────────────────────────
const PRIMARY   = "#232323";   // Vermelho
const SECONDARY = "#efefef";   // Laranja

// ── 2. Extrai RGB para usar em rgba() ────────
const hexToRgb = (hex) => {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r},${g},${b}`;
};
const P = hexToRgb(PRIMARY);    // "239,35,57"
const S = hexToRgb(SECONDARY);  // "255,103,9"

// ── 3. TOKENS ────────────────────────────────
export const T = {

  // ── Cores base ──────────────────────────────
  primary:     PRIMARY,
  secondary:   SECONDARY,
  primaryDark: `rgba(${P},0.75)`,

  // ── Gradientes ──────────────────────────────
  // Botões e elementos de destaque: degradê vibrante primário → secundário
  gradient:      `linear-gradient(90deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
  // Versão vertical (e.g. cards, banners)
  gradientV:     `linear-gradient(180deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
  // Fundo sutil de cards (efeito vidro com toque da cor primária)
  gradientCard:  `rgba(${P},0.07)`,

  // Degradê nos títulos: cinza escuro → branco em 90°
  titleGradient: `linear-gradient(90deg, #3b3b3b 0%, #ffffff 100%)`,

  // ── Brilhos e sombras ───────────────────────
  glowPrimary:   `rgba(${P},0.25)`,
  glowSecondary: `rgba(${S},0.18)`,
  bgAccent:      `rgba(${P},0.04)`,

  // Sombra de brilho nos botões primários preenchidos
  btnGlow:       `0 0 18px rgba(${P},0.55), 0 0 40px rgba(${S},0.25)`,
  btnGlowSm:     `0 0 16px rgba(${P},0.50), 0 0 36px rgba(${S},0.22)`,

  // ── Inputs ──────────────────────────────────
  scrollThumb:       `rgba(${P},0.25)`,
  inputBorderFocus:   PRIMARY,
  inputFocusShadow:  `0 0 0 2px rgba(${P},0.14), 0 0 14px rgba(${P},0.10)`,

  // ── Animações / Pulse ────────────────────────
  pulseShadowLo: `rgba(${P},0.22)`,
  pulseShadowHi: `rgba(${P},0.35)`,
  dotBg:         `rgba(${P},0.60)`,
  dotAfter:      `rgba(${S},0.70)`,
  spinnerTrack:  `rgba(${P},0.15)`,

  // ── Coin / Moeda ─────────────────────────────
  coinGlow:     `rgba(${P},0.90)`,
  coinGlowMid:  `rgba(${S},0.50)`,
  coinGlowFar:  `rgba(${P},0.15)`,
  coinGlowBlur: 22,

  // ── Fundos escuros ───────────────────────────
  bg1: "#080808",
  bg2: "#0f0f0f",

  // ── Glass (Glassmorphism) ────────────────────
  glass:       "rgba(255,255,255,0.04)",
  glassBorder: "rgba(255,255,255,0.09)",
  blur:        "blur(20px)",

  // ── Bordas arredondadas ──────────────────────
  radius:   "60px",
  radiusSm: "30px",

  // ── Tipografia — SEMPRE clara em fundo escuro ──
  // NUNCA usar preto (#000) sobre fundos escuros.
  white:  "#ffffff",                    // Texto principal / headings
  muted:  "rgba(255,255,255,0.55)",     // Texto secundário / labels
  dim:    "rgba(255,255,255,0.35)",     // Texto terciário / placeholders
  faint:  "rgba(255,255,255,0.08)",     // Separadores / bordas sutis

  // Texto/ícone SOBRE botão preenchido com gradiente vibrante.
  // O gradiente claro (vermelho/laranja) exige texto escuro para contraste WCAG AA.
  btnTextOnGradient: "#000000",

  // ── Cores de acento ──────────────────────────
  yellow: "#F59E0B",
  blue:   "#6B8EAD",
  purple: "#7A6B8A",

  // ── Ícones ───────────────────────────────────
  // Em dark mode os ícones acompanham a tipografia clara.
  iconColor: "#ffffff",
  iconSize:  8,

  // ── Badge "Concluído" / Estados de sucesso ────
  // Efeito "faded/apagado": fundo vidro verde-escuro + texto/ícone verde-claro.
  // Harmoniza com o dark mode sem competir com o degradê primário.
  badgeSuccessBg:   "rgba(34,197,94,0.12)",    // Verde escuro transparente (glass)
  badgeSuccessBorder: "rgba(34,197,94,0.22)",  // Borda sutil verde
  badgeSuccessText: "rgba(134,239,172,0.85)",  // Verde-menta claro, levemente apagado

  // ── Tipografia ───────────────────────────────
  fontDisplay: "'Maver', sans-serif",
  fontBody:    "'Sora', sans-serif",
  titleSize:   35,
  titleLine:   0.88,
  titleSpacing: -2,
};
