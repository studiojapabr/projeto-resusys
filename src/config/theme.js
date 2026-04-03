// ═══════════════════════════════════════════
//  THEME.JS — Identidade Visual
//  Altere apenas este arquivo para cada cliente
// ═══════════════════════════════════════════

// ── 1. COR PRINCIPAL ─────────────────────────
const PRIMARY   = "#8cfc00";
const SECONDARY = "#8cfc00";

// ── 2. TOKENS ────────────────────────────────
export const T = {
  primary:     PRIMARY,
  secondary:   SECONDARY,
  primaryDark: "#6dce00",

  // Cor sólida em todos os contextos
  gradient:     PRIMARY,
  gradientV:    PRIMARY,
  gradientCard: `rgba(140,252,0,0.07)`,

  glowPrimary:   `rgba(140,252,0,0.25)`,
  glowSecondary: `rgba(140,252,0,0.18)`,
  bgAccent:      `rgba(140,252,0,0.04)`,

  bg1: "#080808",
  bg2: "#0f0f0f",

  glass:       "rgba(255,255,255,0.04)",
  glassBorder: "rgba(255,255,255,0.09)",
  blur:        "blur(20px)",

  radius:   "30px",
  radiusSm: "16px",

  white:  "#FFFFFF",
  muted:  "rgba(255,255,255,0.55)",
  dim:    "rgba(255,255,255,0.35)",
  faint:  "rgba(255,255,255,0.08)",

  yellow: "#F59E0B",
  blue:   "#6B8EAD",
  purple: "#7A6B8A",

  fontDisplay: "'Maver', sans-serif",
  fontBody:    "'Sora', sans-serif",
  titleSize:   35,
  titleLine:   0.88,
  titleSpacing: -2,
};
