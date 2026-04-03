import { useState, useRef, useEffect } from "react";
import { FaArrowUpRightFromSquare, FaArrowsRotate, FaBan, FaBolt, FaBorderAll, FaCamera, FaChevronDown, FaChevronLeft, FaChevronUp, FaCircleCheck, FaSackDollar, FaCircleExclamation, FaCircleInfo, FaCircleXmark, FaClock, FaCloudArrowUp, FaDownload, FaEllipsisVertical, FaEye, FaGear, FaLink, FaMagnifyingGlass, FaMusic, FaPaintbrush, FaPaperPlane, FaPencil, FaRightFromBracket, FaSliders, FaTicket, FaTrash, FaTrophy, FaUsers, FaWallet, FaXmark } from "react-icons/fa6";
import { createClient } from "@supabase/supabase-js";

import AdminApp from "./resusys-painel-admin";

import imgBgMobile from "./assets/bg-mobile.png";
import imgBgDesktop from "./assets/bg-desktop.png";
import { T } from "./config/theme";
import { C } from "./config/content";
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
  iconColor:    T.iconColor,
  coinGlow:     T.coinGlow,
  coinGlowMid:  T.coinGlowMid,
  coinGlowBlur: T.coinGlowBlur,
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
  bg1: T.bg1, bg2: T.bg2, bgCenter: T.bgAccent,
  glass: T.glass, glassBorder: T.glassBorder, blur: T.blur,
  radius: T.radius, radiusSm: T.radiusSm,
  red: T.primary, redDark: T.primaryDark, orange: T.secondary,
  redGlow: T.glowPrimary, green: T.secondary, greenGlow: T.glowSecondary,
  yellow: T.yellow, blue: T.blue, purple: T.purple,
  white: T.white, muted: T.muted, dim: T.dim, faint: T.faint,
  btnGrad: T.gradient, cardGrad: T.gradientCard,
  sora: T.fontBody, maver: T.fontDisplay,
};

// ═══════════════════════════════════════════
// ICON SYSTEM — Lucide React (filled/solid)
// ═══════════════════════════════════════════
// filled circle icons: fill the background shape
const solidIC = (Icon, c, s) => (
  <Icon size={s} style={{ color: c }} />
);
// bold stroke icons: heavy stroke = solid look
const boldIC = (Icon, c, s) => (
  <Icon size={s} style={{ color: c }} />
);

const IC = {
  check:   (c, s = 18) => solidIC(FaCircleCheck,       c ?? _S.iconColor, s),
  x:       (c, s = 18) => solidIC(FaCircleXmark,           c ?? _S.iconColor, s),
  info:    (c, s = 18) => solidIC(FaCircleInfo,               c ?? _S.iconColor, s),
  clock:   (c, s = 18) => boldIC(FaClock,              c ?? _S.iconColor, s),
  wallet:  (c, s = 18) => boldIC(FaWallet,             c ?? _S.iconColor, s),
  upload:  (c, s = 18) => boldIC(FaCloudArrowUp,        c ?? _S.iconColor, s),
  logout:  (c, s = 18) => boldIC(FaRightFromBracket,             c ?? _S.iconColor, s),
  back:    (c, s = 18) => boldIC(FaChevronLeft,        c ?? _S.iconColor, s),
  trophy:  (c, s = 18) => boldIC(FaTrophy,             c ?? _S.iconColor, s),
  ticket:  (c, s = 18) => boldIC(FaTicket,             c ?? _S.iconColor, s),
  link:    (c, s = 18) => boldIC(FaArrowUpRightFromSquare,       c ?? _S.iconColor, s),
};

// ─── Hook para leitura de settings ─────────
const useIsMobile = () => {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
};

// ─── Styles ────────────────────────────────
const Styles = () => <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
  @font-face { font-family: 'Maver'; src: url('data:font/opentype;base64,T1RUTwANAIAAAwBQQ0ZGIPL1x6sAABNoAABuBERTSUcAAAABAAD5nAAAAAhHREVGLXIuhAAAgWwAAAEoR1BPU9rV2xsAAIKUAABjykdTVULKGQpQAADmYAAAEzxPUy8yaSqvaQAACoQAAABgY21hcOCC+eAAAA3gAAAFaGhlYWQVXdvXAAAA5AAAADZoaGVhB1wHVAAACmAAAAAkaG10eHnc+8sAAAEcAAAJRG1heHACWFAAAAAA3AAAAAZuYW1lQ8UqMAAACuQAAAL8cG9zdP+4ADIAABNIAAAAIAABAAIAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=') format('opentype'); font-weight: normal; font-style: normal; }
  * { margin:0; padding:0; box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
  body, html, #root { background: ${D.bg1}; color: ${D.white}; font-family: ${D.sora}; overflow-x: hidden; min-height: 100dvh; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-thumb { background: rgba(100,100,100,0.25); border-radius: 10px; }
  input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.34); font-family: ${D.sora}; font-weight: 600; font-size: 13px; letter-spacing: 0.5px; }
  input, textarea, button { transition: all 0.2s ease; }
  input:focus, textarea:focus { outline: none; border-color: #646464 !important; box-shadow: 0 0 0 2px rgba(100,100,100,0.14), 0 0 14px rgba(100,100,100,0.10); }
  @keyframes fadeUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
  @keyframes slideUp   { from{opacity:0;transform:translateY(50px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes scaleIn   { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
  @keyframes pulse     { 0%,100%{box-shadow:0 0 10px rgba(100,100,100,0.22)} 50%{box-shadow:0 0 24px rgba(100,100,100,0.35)} }
  @keyframes pulseDot  { 0%{transform:scale(1);opacity:0.65} 100%{transform:scale(2.1);opacity:0} }
  .pulse-dot-red { width:10px; height:10px; background:rgba(100,100,100,0.60); border-radius:50%; position:relative; flex-shrink:0; }
  .pulse-dot-red::after { content:""; position:absolute; inset:0; border-radius:50%; background:rgba(100,100,100,0.70); animation:pulseDot 2s infinite; }
  .pulse-dot-green { width:10px; height:10px; background:rgba(100,100,100,0.60); border-radius:50%; position:relative; flex-shrink:0; }
  .pulse-dot-green::after { content:""; position:absolute; inset:0; border-radius:50%; background:rgba(100,100,100,0.70); animation:pulseDot 2s infinite; }
  @keyframes glowPulse { 0%,100%{opacity:0.18} 50%{opacity:0.35} }
  @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
  @keyframes shake     { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-3px)} 75%{transform:translateX(3px)} }
  @keyframes countUp   { from{opacity:0;transform:scale(0.8)} to{opacity:1;transform:scale(1)} }
  @keyframes popIn     { 0%{opacity:0;transform:scale(0.45)} 60%{transform:scale(1.02)} 100%{opacity:1;transform:scale(1)} }
  @keyframes slideRight{ from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
  @keyframes spin      { to { transform: rotate(360deg); } }
  .premium-glass { transition: all 0.2s ease; box-shadow: 0 14px 34px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.06); }
  .btn-hover-grad:hover { filter: brightness(0.55); transform: scale(1.01); }
  [data-click]:hover, .clickable:hover { filter: brightness(0.55); transition: filter 0.18s ease; }
  a[href]:hover { filter: brightness(0.55); transition: filter 0.18s ease; }
  .ic-btn:hover { filter: brightness(0.55); }
  .ic-btn { transition: filter 0.18s ease, transform 0.18s ease; cursor: pointer; }
  .ic-btn:active { transform: scale(0.94); filter: brightness(0.45); }
  .txt-link:hover { filter: brightness(0.55); }
  .txt-link { transition: filter 0.18s ease; cursor: pointer; }
`}</style>;

const Spotlight = () => {
  const ref = useRef(null);
  const handleMove = (e) => { const el = ref.current; if (!el) return; const rect = el.parentElement.getBoundingClientRect(); el.style.opacity = "1"; el.style.left = (e.clientX - rect.left) + "px"; el.style.top = (e.clientY - rect.top) + "px"; };
  const handleLeave = () => { if (ref.current) ref.current.style.opacity = "0"; };
  useEffect(() => { const parent = ref.current?.parentElement; if (!parent) return; parent.addEventListener("mousemove", handleMove); parent.addEventListener("mouseleave", handleLeave); return () => { parent.removeEventListener("mousemove", handleMove); parent.removeEventListener("mouseleave", handleLeave); }; }, []);
  return null;
};

const Glass = ({ children, s = {}, a = "", onClick }) => (
  <div className="premium-glass" onClick={onClick} style={{ background: D.glass, backdropFilter: D.blur, WebkitBackdropFilter: D.blur, border: `1px solid ${D.glassBorder}`, borderRadius: D.radiusSm, position: "relative", overflow: "hidden", animation: a, ...s }}>
    <Spotlight />{children}
  </div>
);

const BadgeC = ({ l, c = D.red }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 14px", borderRadius: 30, background: `${c}20`, color: c, fontSize: 12, fontFamily: D.sora, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase", whiteSpace: "nowrap" }}>
    <span style={{ width: 5, height: 5, borderRadius: "50%", background: c }} />{l}
  </span>
);

const Btn = ({ children, onClick, v = "primary", disabled = false, s = {} }) => {
  const vs = {
    primary: { background: D.btnGrad, color: "#000000", border: "1px solid rgba(100,100,100,0.35)", boxShadow: "none" },
    success: { background: D.btnGrad, color: "#000000", border: "1px solid rgba(100,100,100,0.35)", boxShadow: "none" },
    danger:  { background: "transparent", color: "#EF4444", border: "1.5px solid rgba(239,68,68,0.30)" },
    outline: { background: "transparent", color: "rgba(255,255,255,0.6)", border: "1.5px solid rgba(255,255,255,0.12)" },
    ghost:   { background: D.faint, color: "rgba(255,255,255,0.6)", border: `1px solid ${D.glassBorder}` },
  };
  return <button className="btn-hover-grad" onClick={disabled ? undefined : onClick} style={{ padding: "10px 22px", borderRadius: D.radius, minHeight: 40, width: "100%", justifyContent: "center", cursor: disabled ? "not-allowed" : "pointer", fontFamily: D.sora, fontSize: 12, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase", transition: "all 0.2s ease", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 10, opacity: disabled ? 0.35 : 1, ...vs[v], ...s }}>{children}</button>;
};

const Inp = ({ label, placeholder, type = "text", value, onChange, s = {}, multi = false }) => (
  <div style={{ marginBottom: 16, ...s }}>
    {label && <label style={{ display: "block", fontFamily: D.sora, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: D.dim, marginBottom: 8, paddingLeft: 20 }}>{label}</label>}
    {multi
      ? <textarea placeholder={placeholder} value={value} onChange={onChange} rows={2} style={{ width: "100%", padding: "12px 18px", background: D.glass, border: `1px solid ${D.glassBorder}`, borderRadius: D.radiusSm, color: D.white, fontFamily: D.sora, fontSize: 12, fontWeight: 500, resize: "none", backdropFilter: D.blur, WebkitBackdropFilter: D.blur, minHeight: 40, textAlign: "left" }} />
      : <input type={type} placeholder={placeholder} value={value} onChange={onChange} style={{ width: "100%", padding: "12px 18px", background: D.glass, border: `1px solid ${D.glassBorder}`, borderRadius: D.radiusSm, color: D.white, fontFamily: D.sora, fontSize: 12, fontWeight: 500, backdropFilter: D.blur, WebkitBackdropFilter: D.blur, textAlign: "left", minHeight: 40 }} />}
  </div>
);

const Chk = ({ checked, onChange, label }) => (
  <div onClick={onChange} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", padding: "6px 0" }}>
    <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase", color: D.muted }}>{label}</span>
    <div style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid ${checked ? D.red : D.faint}`, background: checked ? D.red : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease", boxShadow: checked ? `0 0 10px ${D.redGlow}` : "none" }}>
      {checked && IC.check("white", 10)}
    </div>
  </div>
);

const ToastC = ({ msg, type }) => msg ? (
  <div style={{ position: "fixed", top: 28, left: "50%", transform: "translateX(-50%)", zIndex: 300, animation: "slideDown 0.35s cubic-bezier(0.34,1.56,0.64,1)", maxWidth: 340, width: "calc(100% - 40px)", background: D.glass, backdropFilter: D.blur, WebkitBackdropFilter: D.blur, border: `1px solid ${D.glassBorder}`, borderRadius: D.radiusSm, boxShadow: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 20px" }}>
    <div style={{ background: D.btnGrad, borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {IC.check("black")}
    </div>
    <span style={{ fontFamily: D.sora, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "rgba(255,255,255,0.92)", lineHeight: 1.4, textAlign: "center" }}>{msg}</span>
  </div>
) : null;

const BgResponsive = () => {
  const isMobile = useIsMobile();
  const img = isMobile ? imgBgMobile : imgBgDesktop;
  return <div style={{ position: "fixed", inset: 0, zIndex: 0, backgroundImage: `linear-gradient(rgba(0,0,0,0.40), rgba(0,0,0,0.40)), url(${img})`, backgroundSize: "cover", backgroundPosition: "center center", backgroundRepeat: "no-repeat", backgroundAttachment: "scroll", opacity: 1, pointerEvents: "none" }} />;
};

const BG = ({ children }) => (
  <div style={{ minHeight: "100dvh", background: D.bg1, position: "relative", overflow: "hidden" }}>
    <BgResponsive />
    <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)", pointerEvents: "none" }} />
    <div style={{ position: "relative", zIndex: 1, minHeight: "100dvh", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>{children}</div>
  </div>
);

// ── Moeda com glow dinâmico ─────────────────
const MIcon = () => {
  const s = useRuntimeSettings();
  return (
    <div style={{ width: 150, height: 150, display: "flex", alignItems: "center", justifyContent: "center", animation: "float 3.5s ease-in-out infinite", position: "relative" }}>
      <div style={{ position: "absolute", inset: -50, background: `radial-gradient(circle, ${s.coinGlow} 0%, ${s.coinGlowMid} 35%, rgba(100,100,100,0.15) 60%, transparent 78%)`, borderRadius: "50%", filter: `blur(${s.coinGlowBlur}px)`, pointerEvents: "none" }} />
      <img src={imgIconePrincipal} alt="Moeda" style={{ width: "100%", height: "100%", objectFit: "contain", position: "relative", zIndex: 1 }} />
    </div>
  );
};

const Loading = () => (
  <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", background: D.bg1 }}>
    <div style={{ textAlign: "center" }}>
      <div style={{ width: 48, height: 48, borderRadius: "50%", border: `3px solid rgba(100,100,100,0.15)`, borderTopColor: D.red, animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
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
          <img src={imgLogo} alt={C.brandName} style={{ height: 28, width: "auto", objectFit: "contain" }} />
          <span style={{ fontFamily: D.sora, fontWeight: 800, fontSize: 12, color: D.muted, textTransform: "uppercase" }}>BEM VINDO</span>
        </div>
        <h1 style={{ fontFamily: D.sora, fontSize: 35, fontWeight: 800, lineHeight: 0.88, textTransform: "uppercase", letterSpacing: -2, wordBreak: "break-word", background: "linear-gradient(90deg, #646464 0%, #f0f0f0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 14 }} dangerouslySetInnerHTML={{ __html: C.landing.title }} />
        <p style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: D.muted, marginBottom: 30 }}>{C.landing.subtitle}</p>
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
            <img src={imgLogo} alt={C.brandName} style={{ height: 28, width: "auto", objectFit: "contain" }} />
            <div onClick={() => go("landing")} className="ic-btn" style={{ width: 40, height: 40, borderRadius: "50%", background: "transparent", border: "1.5px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{IC.back("rgba(255,255,255,0.7)")}</div>
          </div>
          <h1 style={{ fontFamily: D.sora, fontSize: 35, fontWeight: 800, lineHeight: 0.88, textTransform: "uppercase", letterSpacing: -2, wordBreak: "break-word", background: "linear-gradient(90deg, #646464 0%, #f0f0f0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 28 }} dangerouslySetInnerHTML={{ __html: C.login.title }} />
          <Inp placeholder="E-MAIL:" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <Inp placeholder="SENHA:" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
          <Btn onClick={handleLogin} disabled={loading || !email || !senha}>{loading ? "ENTRANDO..." : "ENTRAR"}</Btn>
          <p onClick={() => go("register")} className="txt-link" style={{ textAlign: "center", marginTop: 18, fontFamily: D.sora, fontSize: 12, color: D.dim, textTransform: "uppercase", fontWeight: 600 }}>{C.login.linkText} <span style={{ color: D.red, fontWeight: 800 }}>{C.login.linkCta}</span></p>
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
            <img src={imgLogo} alt={C.brandName} style={{ height: 28, width: "auto", objectFit: "contain" }} />
            <span style={{ fontFamily: D.sora, fontWeight: 800, fontSize: 12, color: D.muted, textTransform: "uppercase" }}>BEM VINDO</span>
          </div>
          <h1 style={{ fontFamily: D.sora, fontSize: 35, fontWeight: 800, lineHeight: 0.88, textTransform: "uppercase", letterSpacing: -2, wordBreak: "break-word", background: "linear-gradient(90deg, #646464 0%, #f0f0f0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 28 }} dangerouslySetInnerHTML={{ __html: C.register.title }} />
          <Inp placeholder="NOME DE USUÁRIO:" value={nome} onChange={e => setNome(e.target.value)} />
          <Inp placeholder="E-MAIL:" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <Inp placeholder="SENHA:" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
          <div style={{ marginTop: 12 }}>
            <Btn onClick={handleRegister} disabled={loading || !nome || !email || !senha}>{loading ? "CRIANDO..." : "CONTINUAR"}</Btn>
          </div>
          <p onClick={() => go("login")} className="txt-link" style={{ textAlign: "center", marginTop: 18, fontFamily: D.sora, fontSize: 12, color: D.dim, textTransform: "uppercase", fontWeight: 600 }}>{C.register.linkText} <span style={{ color: D.red, fontWeight: 800 }}>{C.register.linkCta}</span></p>
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
    <div onClick={() => go("raffle")} className="ic-btn" style={{ width: 42, height: 42, borderRadius: "50%", background: D.btnGrad, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", animation: "pulse 2.4s infinite" }}>
      {IC.ticket("black")}
      {myTickets > 0 && (
        <div style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, borderRadius: "50%", background: "#050505", border: `1.5px solid ${D.orange}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, fontFamily: D.sora, color: D.orange }}>{myTickets}</div>
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
    { href: C.social.instagram, icon: <FaCamera size={22} /> },
    { href: C.social.telegram,  icon: <FaPaperPlane size={22} /> },
    { href: C.social.tiktok,    icon: <FaMusic size={22} /> },
  ];

  return (
    <>
      {toast && <ToastC msg={toast?.msg || toast} type={toast?.type || "success"} />}
      <div style={{ padding: "0 20px 44px", maxWidth: 430, width: "100%", margin: "0 auto" }}>

        {/* Header */}
        <Glass s={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", marginTop: 16 }} a="fadeUp 0.6s ease-out">
          <img src={imgLogo} alt={C.brandName} style={{ height: 28, width: "auto", objectFit: "contain" }} />
          <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, color: myPending ? D.yellow : myTickets > 0 ? D.orange : D.muted, textTransform: "uppercase" }}>
            {myPending ? "EM ANÁLISE" : `${myTickets} TICKET${myTickets !== 1 ? "S" : ""}`}
          </span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div onClick={() => go("dashboard")} className="ic-btn" style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>{IC.back("rgba(255,255,255,0.7)")}</div>
          </div>
        </Glass>

        <h1 style={{ fontFamily: D.sora, fontSize: 35, fontWeight: 800, lineHeight: 0.88, textTransform: "uppercase", letterSpacing: -2, wordBreak: "break-word", background: "linear-gradient(90deg, #646464 0%, #f0f0f0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", margin: "18px 0 8px 4px", animation: "fadeUp 0.6s ease-out 0.1s both" }} dangerouslySetInnerHTML={{ __html: C.raffle.title }} />

        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14, marginLeft: 4, animation: "fadeUp 0.6s ease-out 0.15s both" }}>
          <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 700, color: D.white, textTransform: "uppercase", letterSpacing: 0.5 }}>R$20 = 1 <span style={{ color: D.orange }}>TICKET</span></span>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 22, marginLeft: 4, animation: "fadeUp 0.6s ease-out 0.2s both" }}>
          {socialLinks.map(({ href, icon }, idx) => (
            <a key={idx} href={href} target="_blank" rel="noopener noreferrer" className="ic-btn" style={{ width: 42, height: 42, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.70)", textDecoration: "none" }}>{icon}</a>
          ))}
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: D.btnGrad, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, animation: "pulse 2.4s infinite" }}>
            {IC.ticket("black")}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 40, color: D.muted, fontFamily: D.sora, fontSize: 12, textTransform: "uppercase" }}>CARREGANDO...</div>
        ) : !raffle ? (
          <Glass s={{ padding: "36px 28px", textAlign: "center" }}>
            <p style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 700, color: D.muted, textTransform: "uppercase" }}>{C.raffle.empty}</p>
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
                <Btn onClick={() => { setFile(null); setValor(""); setModal(true); }} s={{ width: "auto", maxWidth: 200, background: "rgba(0,0,0,0.30)", border: "1.5px solid rgba(255,255,255,0.30)", backdropFilter: "none" }}>
                  COMPROVANTE
                </Btn>
                {raffle.link && (
                  <div onClick={() => window.open(raffle.link, "_blank")} className="ic-btn" style={{ width: 42, height: 42, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.30)", background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FaLink size={16} style={{ color: "rgba(255,255,255,0.60)" }} />
                  </div>
                )}
                {raffle.link2 && (
                  <div onClick={() => window.open(raffle.link2, "_blank")} className="ic-btn" style={{ width: 42, height: 42, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.30)", background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FaLink size={16} style={{ color: "rgba(255,255,255,0.60)" }} />
                  </div>
                )}
                <div onClick={() => setInfoModal(true)} className="ic-btn" style={{ width: 42, height: 42, borderRadius: "50%", background: D.btnGrad, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {IC.info("black", 16)}
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
                <div onClick={() => setModal(false)} className="ic-btn" style={{ width: 40, height: 40, borderRadius: "50%", border: `1.5px solid ${D.glassBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{IC.x(D.muted)}</div>
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
    { href: C.social.instagram, icon: <FaCamera size={22} /> },
    { href: C.social.telegram,  icon: <FaPaperPlane size={22} /> },
    { href: C.social.tiktok,    icon: <FaMusic size={22} /> },
  ];

  return (
    <>
      {toast && <ToastC msg={toast.msg} type={toast.type} />}
      <div style={{ padding: "0 20px 44px", maxWidth: 430, width: "100%" }}>

        {/* Header */}
        <Glass s={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", marginTop: 16 }} a="fadeUp 0.6s ease-out">
          <img src={imgLogo} alt={C.brandName} style={{ height: 28, width: "auto", objectFit: "contain" }} />
          <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, color: saldo >= 5 ? D.orange : D.muted, textTransform: "uppercase" }}>R$ {Number(saldo).toFixed(2).replace(".", ",")}</span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div onClick={() => go("withdrawal")} className="ic-btn" style={{ width: 40, height: 40, borderRadius: "50%", background: D.btnGrad, display: "flex", alignItems: "center", justifyContent: "center", animation: saldo > 0 ? "pulse 2.4s infinite" : "none" }}>{IC.wallet("black")}</div>
            <div onClick={onLogout} className="ic-btn" style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>{IC.logout("rgba(255,255,255,0.60)")}</div>
          </div>
        </Glass>

        <h1 style={{ fontFamily: D.sora, fontSize: 35, fontWeight: 800, lineHeight: 0.88, textTransform: "uppercase", letterSpacing: -2, wordBreak: "break-word", background: "linear-gradient(90deg, #646464 0%, #f0f0f0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", margin: "18px 0 8px 4px", animation: "fadeUp 0.6s ease-out 0.1s both" }} dangerouslySetInnerHTML={{ __html: C.dashboard.title }} />
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14, marginLeft: 4, animation: "fadeUp 0.6s ease-out 0.15s both" }}>
          <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 700, color: D.white, textTransform: "uppercase", letterSpacing: 0.5 }}>{C.dashboard.subtitle}</span>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 22, marginLeft: 4, animation: "fadeUp 0.6s ease-out 0.2s both" }}>
          {socialLinks.map(({ href, icon }, idx) => (
            <a key={idx} href={href} target="_blank" rel="noopener noreferrer" className="ic-btn" style={{ width: 42, height: 42, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.70)", textDecoration: "none" }}>{icon}</a>
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
                              ? <div style={{ padding: "10px 22px", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.35)", borderRadius: D.radius, fontFamily: D.sora, fontSize: 12, fontWeight: 800, letterSpacing: 0.5, color: D.orange, display: "flex", alignItems: "center", gap: 8, textTransform: "uppercase" }}>{IC.check(D.orange)} CONCLUÍDO</div>
                              : completed
                                ? <div style={{ padding: "10px 22px", background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: D.radius, fontFamily: D.sora, fontSize: 12, fontWeight: 800, letterSpacing: 0.5, color: D.yellow, display: "flex", alignItems: "center", gap: 8, textTransform: "uppercase" }}>{IC.clock(D.yellow)} EM ANÁLISE</div>
                                : <Btn onClick={() => { setFile(null); setObservacao(""); setModal(m.id); }} s={{ width: "auto", maxWidth: 200 }}>COMPROVANTE</Btn>}
                            {m.link && (
                              <div onClick={() => window.open(m.link, "_blank")} className="ic-btn" style={{ width: 42, height: 42, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <FaArrowUpRightFromSquare size={16} style={{ color: "rgba(255,255,255,0.60)" }} />
                              </div>
                            )}
                            <div onClick={() => setInfo(m)} className="ic-btn" style={{ width: 42, height: 42, borderRadius: "50%", background: D.btnGrad, border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              {IC.info("black", 16)}
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
                <div onClick={() => { setModal(null); setObservacao(""); }} className="ic-btn" style={{ width: 40, height: 40, borderRadius: "50%", border: `1.5px solid ${D.glassBorder}`, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.05)", flexShrink: 0 }}>{IC.x(D.muted)}</div>
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
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: D.btnGrad, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, animation: "popIn 0.6s ease-out" }}>{IC.check("black")}</div>
        <h2 style={{ fontFamily: D.sora, fontSize: 35, fontWeight: 800, textTransform: "uppercase", textAlign: "center", marginBottom: 14, letterSpacing: -2, lineHeight: 0.88, wordBreak: "break-word", background: "linear-gradient(90deg, #646464 0%, #f0f0f0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }} dangerouslySetInnerHTML={{ __html: C.success.title }} />
        <p style={{ fontFamily: D.sora, fontSize: 12, color: D.muted, textAlign: "center", marginBottom: 28, textTransform: "uppercase", fontWeight: 600 }}>Processamento em até 24h.</p>
        <div onClick={() => go("dashboard")} className="ic-btn" style={{ width: 40, height: 40, borderRadius: "50%", background: "transparent", border: "1.5px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>{IC.back("rgba(255,255,255,0.7)")}</div>
      </Glass>
    </div>
  );

  return (
    <><ToastC msg={toast?.msg} type={toast?.type} />
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 20px 44px", maxWidth: 430, width: "100%", margin: "0 auto" }}>
      <Glass s={{ padding: "34px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <img src={imgLogo} alt={C.brandName} style={{ height: 28, width: "auto", objectFit: "contain" }} />
          <div onClick={() => go("dashboard")} className="ic-btn" style={{ width: 40, height: 40, borderRadius: "50%", background: "transparent", border: "1.5px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{IC.back("rgba(255,255,255,0.7)")}</div>
        </div>
        <h1 style={{ fontFamily: D.sora, fontSize: 35, fontWeight: 800, lineHeight: 0.88, textTransform: "uppercase", letterSpacing: -2, wordBreak: "break-word", background: "linear-gradient(90deg, #646464 0%, #f0f0f0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: C.withdrawal.title }} />
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
