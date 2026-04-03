// ═══════════════════════════════════════════
//  THEME.JS — Identidade Visual
//  Altere APENAS PRIMARY e SECONDARY aqui.
//  Todo o resto do app usa esses tokens.
// ═══════════════════════════════════════════

// ── 1. COR PRINCIPAL ─────────────────────────
const PRIMARY   = "#8cfc00";
const SECONDARY = "#646464";

// ── 2. Extrai RGB para usar em rgba() ────────
const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
};
const P = hexToRgb(PRIMARY);
const S = hexToRgb(SECONDARY);

// ── 3. TOKENS ────────────────────────────────
export const T = {
  primary:     PRIMARY,
  secondary:   SECONDARY,
  primaryDark: `rgba(${P},0.75)`,

  gradient:     PRIMARY,
  gradientV:    PRIMARY,
  gradientCard: `rgba(${P},0.07)`,
  titleGradient:`linear-gradient(90deg, ${PRIMARY} 0%, #f0f0f0 100%)`,

  glowPrimary:   `rgba(${P},0.25)`,
  glowSecondary: `rgba(${S},0.18)`,
  bgAccent:      `rgba(${P},0.04)`,

  btnGlow:       `0 0 18px rgba(${P},0.55), 0 0 40px rgba(${P},0.25)`,
  btnGlowSm:     `0 0 16px rgba(${P},0.50), 0 0 36px rgba(${P},0.22)`,

  scrollThumb:      `rgba(${P},0.25)`,
  inputBorderFocus:  PRIMARY,
  inputFocusShadow: `0 0 0 2px rgba(${P},0.14), 0 0 14px rgba(${P},0.10)`,

  pulseShadowLo: `rgba(${P},0.22)`,
  pulseShadowHi: `rgba(${P},0.35)`,
  dotBg:         `rgba(${P},0.60)`,
  dotAfter:      `rgba(${P},0.70)`,
  spinnerTrack:  `rgba(${P},0.15)`,

  coinGlow:     `rgba(${P},0.90)`,
  coinGlowMid:  `rgba(${P},0.50)`,
  coinGlowFar:  `rgba(${P},0.15)`,
  coinGlowBlur: 22,

  bg1: "#080808",
  bg2: "#0f0f0f",

  glass:       "rgba(255,255,255,0.04)",
  glassBorder: "rgba(255,255,255,0.09)",
  blur:        "blur(20px)",

  radius:   "60px",
  radiusSm: "30px",

  white:  "#ffffff",
  muted:  "rgba(255,255,255,0.55)",
  dim:    "rgba(255,255,255,0.35)",
  faint:  "rgba(255,255,255,0.08)",

  yellow: "#F59E0B",
  blue:   "#6B8EAD",
  purple: "#7A6B8A",

  iconColor: "#000000",
  iconSize:  8,

  fontDisplay: "'Maver', sans-serif",
  fontBody:    "'Sora', sans-serif",
  titleSize:   35,
  titleLine:   0.88,
  titleSpacing: -2,
};
