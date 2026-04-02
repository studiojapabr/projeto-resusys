// ═══════════════════════════════════════════
//  THEME.JS — Identidade Visual
//  Altere apenas este arquivo para cada cliente
// ═══════════════════════════════════════════

// ── 1. CORES PRINCIPAIS ──────────────────────
const PRIMARY   = "#C0C0C0";   // prata
const SECONDARY = "#888888";   // grafite médio

// ── 2. TOKENS GERADOS AUTOMATICAMENTE ────────
export const T = {
  // Cores base
  primary:     PRIMARY,
  secondary:   SECONDARY,
  primaryDark: "#999999",

  // Gradiente principal (botões, destaques, faixas)
  gradient:     `linear-gradient(135deg, #C0C0C0 0%, #888888 100%)`,
  gradientV:    `linear-gradient(180deg, #C0C0C0 0%, #888888 100%)`,
  gradientCard: `linear-gradient(145deg, rgba(192,192,192,0.08) 0%, rgba(136,136,136,0.03) 100%)`,

  // Glows — sutis, sem cor forte
  glowPrimary:   `rgba(192,192,192,0.20)`,
  glowSecondary: `rgba(136,136,136,0.16)`,
  bgAccent:      `rgba(192,192,192,0.04)`,

  // Backgrounds — bem escuros, preto profundo
  bg1: "#080808",
  bg2: "#0f0f0f",

  // Glass — levemente mais visível para contraste
  glass:       "rgba(255,255,255,0.04)",
  glassBorder: "rgba(255,255,255,0.09)",
  blur:        "blur(20px)",

  // Border radius
  radius:   "999px",
  radiusSm: "20px",

  // Cores de texto
  white:  "#FFFFFF",
  muted:  "rgba(255,255,255,0.55)",
  dim:    "rgba(255,255,255,0.35)",
  faint:  "rgba(255,255,255,0.08)",

  // Outras cores do sistema
  yellow: "#C8A84B",   // ouro apagado, premium
  blue:   "#6B8EAD",
  purple: "#7A6B8A",

  // Tipografia — fonte FIXA (não muda por cliente)
  fontDisplay: "'Maver', sans-serif",
  fontBody:    "'Sora', sans-serif",
  titleSize:   55,
  titleLine:   0.88,
  titleSpacing: -2,
};
