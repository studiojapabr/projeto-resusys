import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaArrowUpRightFromSquare, FaArrowsRotate, FaBan, FaBolt, FaBorderAll, FaCamera, FaChevronDown, FaChevronLeft, FaChevronUp, FaCircleCheck, FaCircleExclamation, FaCircleInfo, FaCircleXmark, FaClock, FaCloudArrowUp, FaDownload, FaEllipsisVertical, FaEye, FaGear, FaLink, FaMagnifyingGlass, FaMusic, FaPaintbrush, FaPaperPlane, FaPencil, FaRightFromBracket, FaSackDollar, FaSliders, FaTicket, FaTrash, FaTrophy, FaUsers, FaWallet, FaXmark } from "./Icons";
import { createClient } from "@supabase/supabase-js";
import imgBgMobile from "./assets/bg-mobile.png";
import imgBgDesktop from "./assets/bg-desktop.png";
import imgLogo from "./assets/logo-t.png";
import imgIconePrincipal from "./assets/icone-task.png";

// ═══════════════════════════════════════════
// SUPABASE
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
export const updateSettings = (s) => { _S = { ..._S, ...s }; _SL.forEach((f) => f()); };
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
  bg1: "#050505", bg2: "#111111",
  glass: "rgba(255,255,255,0.05)", glassBorder: "rgba(255,255,255,0.10)", blur: "blur(18px)",
  radius: "999px", radiusSm: "20px",
  red: "#232323", redDark: "rgba(35,35,35,0.75)", orange: "#efefef", redGlow: "rgba(35,35,35,0.25)", orangeGlow: "rgba(239,239,239,0.18)",
  green: "#efefef", greenGlow: "rgba(239,239,239,0.18)",
  yellow: "#F59E0B", blue: "#3B82F6", purple: "#8B5CF6",
  white: "#FFFFFF", muted: "rgba(255,255,255,0.62)", dim: "rgba(255,255,255,0.40)", faint: "rgba(255,255,255,0.10)",
  btnGrad: "linear-gradient(90deg, #232323 0%, #efefef 100%)", cardGrad: "rgba(35,35,35,0.07)",
  btnGlow: "0 0 10px rgba(35,35,35,0.30), 0 0 20px rgba(239,239,239,0.12)", btnGlowSm: "0 0 8px rgba(35,35,35,0.25), 0 0 18px rgba(239,239,239,0.10)",
  titleGrad: "linear-gradient(90deg, #3b3b3b 0%, #ffffff 100%)",
  sora: "'Sora', sans-serif", maver: "'Maver', sans-serif",
};

// ═══════════════════════════════════════════
// ICON SYSTEM — Lucide React (filled/solid)
// ═══════════════════════════════════════════
const solidIC = (Icon, c, s) => <Icon size={s} color={c} />;
const boldIC  = (Icon, c, s) => <Icon size={s} color={c} />;

const IC = {
  check:   (c, s = 10) => solidIC(FaCircleCheck,       c ?? _S.iconColor, s),
  x:       (c, s = 10) => solidIC(FaCircleXmark,           c ?? _S.iconColor, s),
  info:    (c, s = 10) => solidIC(FaCircleInfo,               c ?? _S.iconColor, s),
  alert:   (c, s = 10) => solidIC(FaCircleExclamation,        c ?? _S.iconColor, s),
  dollar:  (c, s = 10) => solidIC(FaSackDollar,  c ?? _S.iconColor, s),
  pix:     (c, s = 10) => solidIC(FaBolt,               c ?? _S.iconColor, s),
  ban:     (c, s = 10) => solidIC(FaBan,               c ?? _S.iconColor, s),
  clock:   (c, s = 10) => boldIC(FaClock,              c ?? _S.iconColor, s),
  wallet:  (c, s = 10) => boldIC(FaWallet,             c ?? _S.iconColor, s),
  logout:  (c, s = 10) => boldIC(FaRightFromBracket,             c ?? _S.iconColor, s),
  back:    (c, s = 10) => boldIC(FaChevronLeft,        c ?? _S.iconColor, s),
  eye:     (c, s = 10) => boldIC(FaEye,                c ?? _S.iconColor, s),
  search:  (c, s = 10) => boldIC(FaMagnifyingGlass,             c ?? _S.iconColor, s),
  users:   (c, s = 10) => boldIC(FaUsers,              c ?? _S.iconColor, s),
  edit:    (c, s = 10) => boldIC(FaPencil,             c ?? _S.iconColor, s),
  trash:   (c, s = 10) => boldIC(FaTrash,             c ?? _S.iconColor, s),
  grip:    (c, s = 10) => boldIC(FaEllipsisVertical,       c ?? _S.iconColor, s),
  arrowUp: (c, s = 10) => boldIC(FaChevronUp,          c ?? _S.iconColor, s),
  arrowDn: (c, s = 10) => boldIC(FaChevronDown,        c ?? _S.iconColor, s),
  link:    (c, s = 10) => boldIC(FaLink,               c ?? _S.iconColor, s),
  extLink: (c, s = 10) => boldIC(FaArrowUpRightFromSquare,       c ?? _S.iconColor, s),
  grid:    (c, s = 10) => boldIC(FaBorderAll,         c ?? _S.iconColor, s),
};

// ── SVG Icons customizados ──────────────────
const SvgBack = ({ size = 18, color = "currentColor" }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill={color} style={{ transform: "rotate(180deg)" }}><path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"/></svg>;

// ─── Styles ────────────────────────────────
const Styles = () => <style>{"
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
  body, html, #root { background: ${D.bg1}; color: ${D.white}; font-family: ${D.sora}; overflow-x: hidden; min-height: 100dvh; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-thumb { background: rgba(35,35,35,0.25); border-radius: 10px; }
  input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.34); font-family: ${D.sora}; font-weight: 600; font-size: 13px; letter-spacing: 0.5px; }
  input, textarea, button { transition: all 0.2s ease; outline: none; } button { border: none; appearance: none; -webkit-appearance: none; }
  input:focus, textarea:focus { outline: none; border-color: #232323 !important; }
  @keyframes fadeUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
  @keyframes slideUp   { from{opacity:0;transform:translateY(50px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes scaleIn   { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
  @keyframes pulse     { 0%,100%{box-shadow:0 0 10px rgba(35,35,35,0.22)} 50%{box-shadow:0 0 24px rgba(35,35,35,0.35)} }
  @keyframes pulseDot  { 0%{transform:scale(1);opacity:0.65} 100%{transform:scale(2.1);opacity:0} }
  @keyframes glowPulse { 0%,100%{opacity:0.18} 50%{opacity:0.35} }
  @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
  @keyframes shake     { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-3px)} 75%{transform:translateX(3px)} }
  @keyframes countUp   { from{opacity:0;transform:scale(0.8)} to{opacity:1;transform:scale(1)} }
  @keyframes popIn     { 0%{opacity:0;transform:scale(0.45)} 60%{transform:scale(1.02)} 100%{opacity:1;transform:scale(1)} }
  @keyframes slideRight{ from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
  @keyframes spin      { to { transform: rotate(360deg); } }
  .premium-glass { transition: all 0.2s ease; box-shadow: 0 14px 34px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.06); }
  .btn-hover-grad:hover { filter: brightness(0.55); transform: scale(1.01); }
  .ic-btn:hover { filter: brightness(0.55); }
  .ic-btn { transition: filter 0.18s ease, transform 0.18s ease; cursor: pointer; }
  .ic-btn:active { transform: scale(0.94); filter: brightness(0.45); }
  .txt-link:hover { filter: brightness(0.55); }
  .txt-link { transition: filter 0.18s ease; cursor: pointer; }
  input[type=range] { -webkit-appearance: none; width: 100%; height: 4px; border-radius: 4px; background: rgba(255,255,255,0.12); outline: none; }
  input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #232323; cursor: pointer; }
  input[type=color] { -webkit-appearance: none; padding: 0; border: none; cursor: pointer; background: transparent; }
  input[type=color]::-webkit-color-swatch-wrapper { padding: 0; }
  input[type=color]::-webkit-color-swatch { border: none; border-radius: 10px; }
"}</style>;

const Spotlight = () => {
  const ref = useRef(null);
  const hm = (e) => { const el = ref.current; if (!el) return; const r = el.parentElement.getBoundingClientRect(); el.style.opacity = "1"; el.style.left = (e.clientX - r.left) + "px"; el.style.top = (e.clientY - r.top) + "px"; };
  const hl = () => { if (ref.current) ref.current.style.opacity = "0"; };
  useEffect(() => { const p = ref.current?.parentElement; if (!p) return; p.addEventListener("mousemove", hm); p.addEventListener("mouseleave", hl); return () => { p.removeEventListener("mousemove", hm); p.removeEventListener("mouseleave", hl); }; }, []);
  return null;
};

const Glass = ({ children, s = {}, a = "", onClick }) => (
  <div className="premium-glass" onClick={onClick} style={{ background: D.glass, backdropFilter: D.blur, WebkitBackdropFilter: D.blur, border: `1px solid ${D.glassBorder}`, borderRadius: D.radiusSm, position: "relative", animation: a, ...s }}>
    <Spotlight />{children}
  </div>
);

const BadgeC = ({ l, c = D.red }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 14px", borderRadius: 30, background: `${c}20`, color: c, fontSize: 12, fontFamily: D.sora, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase", whiteSpace: "nowrap" }}>
    <span style={{ width: 5, height: 5, borderRadius: "50%", background: c }} />{l}
  </span>
);

const SB = ({ status }) => {
  const m = { pendente: { l: "PENDENTE", c: "#F59E0B" }, aprovado: { l: "APROVADO", c: "#22C55E" }, recusado: { l: "RECUSADO", c: "#EF4444" }, pago: { l: "PAGO", c: "#22C55E" }, ativo: { l: "ATIVO", c: "#22C55E" }, bloqueado: { l: "BLOQ.", c: "#EF4444" } };
  const s = m[status] || m.pendente;
  return <BadgeC l={s.l} c={s.c} />;
};

const Av = ({ ini, sz = 40 }) => (
  <div style={{ width: sz, height: sz, borderRadius: "50%", background: D.btnGrad, boxShadow: D.btnGlowSm, color: "#000000", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: D.sora, fontSize: sz * 0.34, fontWeight: 800, flexShrink: 0, textTransform: "uppercase" }}>{ini}</div>
);

const Btn = ({ children, onClick, v = "primary", disabled = false, s = {} }) => {
  const vs = { primary: { background: D.btnGrad, boxShadow: D.btnGlowSm, color: "#000000", border: "1px solid rgba(35,35,35,0.25)" }, success: { background: D.btnGrad, boxShadow: D.btnGlowSm, color: "#000000", border: "1px solid rgba(35,35,35,0.25)" }, danger: { background: "transparent", color: "#EF4444", border: "1px solid rgba(239,68,68,0.30)" }, outline: { background: "transparent", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.12)" }, ghost: { background: D.faint, color: "rgba(255,255,255,0.6)", border: `1px solid ${D.glassBorder}` } };
  return <button className="btn-hover-grad" onClick={disabled ? undefined : onClick} style={{ padding: "10px 22px", borderRadius: D.radius, minHeight: 40, width: "100%", justifyContent: "center", cursor: disabled ? "not-allowed" : "pointer", fontFamily: D.sora, fontSize: 12, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase", transition: "all 0.2s ease", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 10, opacity: disabled ? 0.35 : 1, boxShadow: "none", ...vs[v], ...s }}>{children}</button>;
};

const Inp = ({ label, placeholder, type = "text", value, onChange, s = {}, multi = false }) => (
  <div style={{ marginBottom: 16, ...s }}>
    {label && <label style={{ display: "block", fontFamily: D.sora, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: D.dim, marginBottom: 8, paddingLeft: 20 }}>{label}</label>}
    {multi
      ? <textarea placeholder={placeholder} value={value} onChange={onChange} rows={2} style={{ width: "100%", padding: "12px 18px", background: D.glass, border: `1px solid ${D.glassBorder}`, borderRadius: D.radiusSm, color: D.white, fontFamily: D.sora, fontSize: 12, fontWeight: 500, resize: "none", backdropFilter: D.blur, WebkitBackdropFilter: D.blur, minHeight: 40, textAlign: "left" }} />
      : <input type={type} placeholder={placeholder} value={value} onChange={onChange} style={{ width: "100%", padding: "12px 18px", background: D.glass, border: `1px solid ${D.glassBorder}`, borderRadius: D.radiusSm, color: D.white, fontFamily: D.sora, fontSize: 12, fontWeight: 500, backdropFilter: D.blur, WebkitBackdropFilter: D.blur, textAlign: "left", minHeight: 40 }} />}
  </div>
);

const Tog = ({ active, onToggle }) => (
  <div onClick={onToggle} style={{ width: 48, height: 24, borderRadius: 12, cursor: "pointer", background: active ? "rgba(35,35,35,0.07)" : D.faint, border: `1px solid ${active ? "rgba(35,35,35,0.25)" : "rgba(255,255,255,0.10)"}`, position: "relative", transition: "all 0.2s ease", flexShrink: 0 }}>
    <div style={{ width: 18, height: 18, borderRadius: "50%", background: active ? "#ffffff" : "rgba(255,255,255,0.25)", position: "absolute", top: 1.5, left: active ? 25 : 2, transition: "all 0.2s ease" }} />
  </div>
);

const ToastC = ({ msg, type }) => msg ? (
  <div style={{ position: "fixed", top: 28, left: "50%", transform: "translateX(-50%)", zIndex: 300, animation: "slideDown 0.35s cubic-bezier(0.34,1.56,0.64,1)", maxWidth: 340, width: "calc(100% - 40px)", background: D.glass, backdropFilter: D.blur, WebkitBackdropFilter: D.blur, border: `1px solid ${D.glassBorder}`, borderRadius: D.radiusSm, boxShadow: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 20px" }}>
    <div style={{ background: D.btnGrad, boxShadow: D.btnGlowSm, borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {IC.check("white")}
    </div>
    <span style={{ fontFamily: D.sora, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "rgba(255,255,255,0.92)", lineHeight: 1.4, textAlign: "center" }}>{msg}</span>
  </div>
) : null;

const BG_IMG = typeof window !== "undefined" && window.innerWidth >= 768 ? imgBgDesktop : imgBgMobile;
const BG = ({ children }) => (
  <div style={{ minHeight: "100dvh", background: D.bg1, position: "relative", overflow: "hidden" }}>
    {BG_IMG && <div style={{ position: "fixed", inset: 0, zIndex: 0, backgroundImage: `linear-gradient(rgba(0,0,0,0.40), rgba(0,0,0,0.40)), url(${BG_IMG})`, backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat", opacity: 1, pointerEvents: "none" }} />}
    <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)", pointerEvents: "none" }} />
    <div style={{ position: "relative", zIndex: 1, minHeight: "100dvh", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>{children}</div>
  </div>
);

const StatC = ({ icon, val, label, d = 0 }) => (
  <Glass s={{ padding: "22px 18px", flex: 1, minWidth: 0 }} a={`fadeUp 0.6s ease-out ${d}s both`}>
    <div style={{ marginBottom: 8 }}>{icon}</div>
    <div style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, textTransform: "uppercase", animation: `countUp 0.5s ease-out ${d + 0.15}s both` }}>{val}</div>
    <div style={{ fontFamily: D.sora, fontSize: 12, color: D.muted, fontWeight: 600, marginTop: 3, textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</div>
  </Glass>
);

// ═══════════════════════════════════════════
// ABA: OVERVIEW
// ═══════════════════════════════════════════
const AOverview = ({ subs, withs, usrs }) => (
  <div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 22 }}>
      <StatC icon={IC.alert("#F59E0B")} val={subs.filter(s => s.status === "pendente").length} label="Comprovantes" d={0} />
      <StatC icon={IC.wallet("#EF4444")} val={withs.filter(w => w.status === "pendente").length} label="Saques pend." d={0.05} />
      <StatC icon={IC.users("#6B8EAD")} val={usrs.length} label="Usuários" d={0.1} />
      <StatC icon={IC.dollar("#22C55E")} val={`R$${withs.reduce((s, w) => s + Number(w.valor), 0).toFixed(0)}`} label="Total saques" d={0.15} />
    </div>
    <Glass s={{ padding: "28px 24px" }} a="fadeUp 0.6s ease-out 0.2s both">
      <div style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, letterSpacing: 0.3, textTransform: "uppercase", marginBottom: 14 }}>ATIVIDADE RECENTE</div>
      {subs.slice(0, 4).map((s, i) => (
        <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "20px 18px", borderRadius: D.radius, background: D.glass, border: `1px solid ${D.glassBorder}`, marginBottom: 12, animation: `slideRight 0.35s ease-out ${0.25 + i * 0.04}s both` }}>
          <Av ini={s.user_initials} sz={32} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 700, textTransform: "uppercase" }}>{s.user_name}</div>
            <div style={{ fontFamily: D.sora, fontSize: 12, color: D.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textTransform: "uppercase" }}>{s.mission_title} — R${s.valor}</div>
          </div>
          <SB status={s.status} />
        </div>
      ))}
    </Glass>
  </div>
);

// ═══════════════════════════════════════════
// ABA: COMPROVANTES
// ═══════════════════════════════════════════
const ASubs = ({ subs, setSubs }) => {
  const [filtro, setFiltro] = useState("pendente");
  const [sel, setSel] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [toast, setToast] = useState(null);
  const show = (m, t = "success") => { setToast({ m, t }); setTimeout(() => setToast(null), 2e3); };

  useEffect(() => {
    if (!sel?.file_name) { setImgUrl(null); return; }
    supabase.storage.from("comprovantes").createSignedUrl(sel.file_name, 60).then(({ data, error }) => {
      if (!error && data?.signedUrl) setImgUrl(data.signedUrl); else setImgUrl(null);
    });
  }, [sel]);

  const approve = async (id) => {
    const { error } = await supabase.from("submissions").update({ status: "aprovado" }).eq("id", id);
    if (error) { show("ERRO: " + error.message, "danger"); return; }
    setSubs(p => p.map(s => s.id === id ? { ...s, status: "aprovado" } : s));
    setSel(null); show("APROVADO! SALDO CREDITADO.");
  };

  const reject = async (id) => {
    const { error } = await supabase.from("submissions").update({ status: "recusado" }).eq("id", id);
    if (error) { show("ERRO: " + error.message, "danger"); return; }
    setSubs(p => p.map(s => s.id === id ? { ...s, status: "recusado" } : s));
    setSel(null); show("COMPROVANTE RECUSADO.", "danger");
  };

  const f = subs.filter(s => s.status === filtro);

  return (
    <div>
      <ToastC msg={toast?.m} type={toast?.t} />
      <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
        {[{ k: "pendente", l: "Pendentes" }, { k: "aprovado", l: "Aprovados" }, { k: "recusado", l: "Recusados" }].map(x => (
          <button key={x.k} onClick={() => setFiltro(x.k)} style={{ padding: "10px 6px", borderRadius: D.radius, border: filtro === x.k ? "none" : `1px solid ${D.glassBorder}`, minHeight: 40, flex: 1, minWidth: 0, background: filtro === x.k ? D.btnGrad : D.glass, color: filtro === x.k ? "#000000" : D.muted, fontFamily: D.sora, fontSize: 12, fontWeight: 700, cursor: "pointer", textTransform: "uppercase", boxShadow: "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{x.l}</button>
        ))}
      </div>
      {f.length === 0 && <div style={{ textAlign: "center", padding: "40px", color: D.muted, fontFamily: D.sora, fontSize: 12, textTransform: "uppercase" }}>Nenhuma submissão.</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {f.map((s, i) => (
          <Glass key={s.id} s={{ padding: "28px 24px" }} a={`slideUp 0.35s ease-out ${i * 0.04}s both`}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Av ini={s.user_initials} sz={38} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                  <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 700, textTransform: "uppercase" }}>{s.user_name}</span>
                  <SB status={s.status} />
                </div>
                <div style={{ fontFamily: D.sora, fontSize: 12, color: D.muted, textTransform: "uppercase" }}>{s.mission_title} — <span style={{ color: D.white, fontWeight: 700 }}>R${s.valor}</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 3 }}>{IC.clock(D.dim)}<span style={{ fontFamily: D.sora, fontSize: 12, color: D.dim, textTransform: "uppercase" }}>{new Date(s.created_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span></div>
              </div>
              <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                <div onClick={() => setSel(s)} className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", background: D.glass, border: `1px solid ${D.glassBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{IC.eye(D.muted)}</div>
                {s.status === "pendente" && (
                  <>
                    <div onClick={() => approve(s.id)} className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>{IC.check("#22C55E")}</div>
                    <div onClick={() => reject(s.id)} className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>{IC.x("#EF4444")}</div>
                  </>
                )}
              </div>
            </div>
          </Glass>
        ))}
      </div>
      {sel && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(5,5,5,0.70)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, animation: "fadeIn 0.24s" }} onClick={() => setSel(null)}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 400, animation: "scaleIn 0.35s ease-out" }}>
            <Glass s={{ padding: "24px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Av ini={sel.user_initials} sz={40} />
                  <div>
                    <div style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, textTransform: "uppercase" }}>{sel.user_name}</div>
                    <div style={{ fontFamily: D.sora, fontSize: 12, color: D.muted, textTransform: "uppercase" }}>{sel.mission_title}</div>
                  </div>
                </div>
                <div onClick={() => setSel(null)} className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>{<SvgBack size={10} color={D.muted} />}</div>
              </div>
              <div style={{ marginBottom: 14 }}><BadgeC l={`R$ ${sel.valor}`} c={"#22C55E"} /></div>
              {sel.observacao && (
                <div style={{ marginBottom: 14, padding: "12px 14px", background: D.glass, border: `1px solid ${D.glassBorder}`, borderRadius: D.radiusSm }}>
                  <p style={{ fontFamily: D.sora, fontSize: 10, fontWeight: 700, color: D.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 5 }}>OBSERVAÇÃO DO USUÁRIO</p>
                  <p style={{ fontFamily: D.sora, fontSize: 12, color: D.white, lineHeight: 1.5, textTransform: "uppercase" }}>{sel.observacao}</p>
                </div>
              )}
              <div style={{ width: "100%", borderRadius: D.radiusSm, background: D.glass, border: `1px solid ${D.glassBorder}`, overflow: "hidden", marginBottom: 14, minHeight: 120 }}>
                {imgUrl ? <img src={imgUrl} alt="Comprovante" style={{ width: "100%", height: "auto", display: "block", objectFit: "contain", maxHeight: 420 }} onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} /> : null}
                <div style={{ display: imgUrl ? "none" : "flex", padding: 30, alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: D.sora, fontSize: 12, color: D.muted, textTransform: "uppercase" }}>Imagem não encontrada</span>
                </div>
              </div>
              {sel.status === "pendente" && (
                <div style={{ display: "flex", gap: 10 }}>
                  <Btn v="success" onClick={() => approve(sel.id)} s={{ flex: 1 }}>{IC.check("black")} APROVAR</Btn>
                  <Btn v="danger" onClick={() => reject(sel.id)} s={{ flex: 1 }}>{IC.x("#EF4444")} RECUSAR</Btn>
                </div>
              )}
            </Glass>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════
// ABA: SAQUES
// ═══════════════════════════════════════════
const AWiths = ({ withs, setWiths }) => {
  const [toast, setToast] = useState(null);
  const show = (m, t = "success") => { setToast({ m, t }); setTimeout(() => setToast(null), 2e3); };

  const pay = async (id) => {
    const { error } = await supabase.from("withdrawals").update({ status: "pago" }).eq("id", id);
    if (error) { show("ERRO: " + error.message, "danger"); return; }
    setWiths(p => p.map(w => w.id === id ? { ...w, status: "pago" } : w));
    show("PIX ENVIADO COM SUCESSO!");
  };

  const rej = async (id) => {
    const { error } = await supabase.from("withdrawals").update({ status: "recusado" }).eq("id", id);
    if (error) { show("ERRO: " + error.message, "danger"); return; }
    setWiths(p => p.map(w => w.id === id ? { ...w, status: "recusado" } : w));
    show("SAQUE RECUSADO.", "danger");
  };

  return (
    <div>
      <ToastC msg={toast?.m} type={toast?.t} />
      {withs.length === 0 && <div style={{ textAlign: "center", padding: "40px", color: D.muted, fontFamily: D.sora, textTransform: "uppercase" }}>Nenhum saque.</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {withs.map((w, i) => (
          <Glass key={w.id} s={{ padding: "28px 24px" }} a={`slideUp 0.45s ease-out ${i * 0.06}s both`}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <div style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, textTransform: "uppercase" }}>{w.user_name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 4 }}>{IC.clock(D.dim)}<span style={{ fontFamily: D.sora, fontSize: 12, color: D.dim, textTransform: "uppercase" }}>{new Date(w.created_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span></div>
              </div>
              <SB status={w.status} />
            </div>
            <div style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, color: D.orange, marginBottom: 12, textTransform: "uppercase" }}>R$ {Number(w.valor).toFixed(2).replace(".", ",")}</div>
            <Glass s={{ padding: "12px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              {IC.pix(D.muted)}
              <div>
                <div style={{ fontFamily: D.sora, fontSize: 12, color: D.muted, fontWeight: 800, letterSpacing: 0.3, textTransform: "uppercase" }}>CHAVE PIX ({w.pix_tipo})</div>
                <div style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 700, marginTop: 2 }}>{w.pix_key}</div>
              </div>
            </Glass>
            {w.status === "pendente" && (
              <div style={{ display: "flex", gap: 10 }}>
                <Btn v="success" onClick={() => pay(w.id)} s={{ flex: 1 }}>{IC.check("black")} PIX ENVIADO</Btn>
                <Btn v="danger" onClick={() => rej(w.id)} s={{ flex: 1 }}>RECUSAR</Btn>
              </div>
            )}
          </Glass>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// ABA: USUÁRIOS
// ═══════════════════════════════════════════
const AUsers = ({ usrs, setUsrs }) => {
  const [q, setQ] = useState("");
  const f = usrs.filter(u => u.name?.toLowerCase().includes(q.toLowerCase()) || u.email?.toLowerCase().includes(q.toLowerCase()));

  const toggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "bloqueado" ? "ativo" : "bloqueado";
    const { error } = await supabase.from("profiles").update({ status: newStatus }).eq("id", id);
    if (!error) setUsrs(p => p.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  return (
    <div>
      <Glass s={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 22px", marginBottom: 18, minHeight: 40 }}>
        {IC.search(D.dim)}
        <input placeholder="Buscar nome ou email..." value={q} onChange={e => setQ(e.target.value)} style={{ flex: 1, background: "transparent", border: "none", color: D.white, fontFamily: D.sora, fontSize: 12, outline: "none", textTransform: "uppercase", fontWeight: 600 }} />
      </Glass>
      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
        <BadgeC l={`${usrs.filter(u => u.status === "ativo").length} ativos`} c={"#22C55E"} />
        <BadgeC l={`${usrs.filter(u => u.status === "bloqueado").length} bloq.`} c="#EF4444" />
        <BadgeC l={`R$ ${usrs.reduce((s, u) => s + Number(u.saldo || 0), 0).toFixed(0)} saldos`} c={D.purple} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {f.map((u, i) => (
          <Glass key={u.id} s={{ padding: "28px 24px" }} a={`slideUp 0.35s ease-out ${i * 0.04}s both`}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Av ini={(u.name || "U").split(" ").map(w => w[0]).join("").slice(0, 2)} sz={38} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 2 }}>
                  <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 700, opacity: u.status === "bloqueado" ? 0.45 : 1, textTransform: "uppercase" }}>{u.name}</span>
                  <SB status={u.status} />
                </div>
                <div style={{ fontFamily: D.sora, fontSize: 12, color: D.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textTransform: "uppercase" }}>{u.email}</div>
                <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                  <span style={{ fontFamily: D.sora, fontSize: 12, color: D.muted, textTransform: "uppercase" }}>Saldo: <span style={{ color: D.white, fontWeight: 700 }}>R${Number(u.saldo || 0).toFixed(0)}</span></span>
                  <span style={{ fontFamily: D.sora, fontSize: 12, color: D.muted, textTransform: "uppercase" }}>Missões: <span style={{ fontWeight: 700, color: "rgba(255,255,255,0.65)" }}>{u.missoes_cnt || 0}</span></span>
                </div>
              </div>
              <div onClick={() => toggle(u.id, u.status)} className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", background: u.status === "bloqueado" ? "rgba(192,192,192,0.08)" : "rgba(239,68,68,0.06)", border: `1px solid ${u.status === "bloqueado" ? "rgba(192,192,192,0.22)" : "rgba(239,68,68,0.12)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {u.status === "bloqueado" ? IC.check(D.white) : IC.ban("#EF4444")}
              </div>
            </div>
          </Glass>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// ABA: MISSÕES
// ═══════════════════════════════════════════
const AMissions = ({ missions, setMissions }) => {
  const [view, setView] = useState("list");
  const [editing, setEditing] = useState(null);
  const [del, setDel] = useState(null);
  const [toast, setToast] = useState(null);
  const show = (m, t = "success") => { setToast({ m, t }); setTimeout(() => setToast(null), 2e3); };

  const create = async (d) => {
    const { data, error } = await supabase.from("missions").insert({ titulo: d.titulo, descricao: d.desc, valor: Number(d.valor), tipo: d.tipo, link: d.link || null, ativa: d.ativa, ordem: missions.length, max_sub: d.max ? Number(d.max) : null }).select().single();
    if (error) { show("ERRO: " + error.message, "danger"); return; }
    setMissions(p => [...p, data]); setView("list"); show("Missão criada!");
  };

  const edit = async (d) => {
    const { data, error } = await supabase.from("missions").update({ titulo: d.titulo, descricao: d.desc, valor: Number(d.valor), tipo: d.tipo, link: d.link || null, max_sub: d.max ? Number(d.max) : null }).eq("id", editing.id).select().single();
    if (error) { show("ERRO: " + error.message, "danger"); return; }
    setMissions(p => p.map(m => m.id === editing.id ? data : m)); setView("list"); setEditing(null); show("Atualizada!");
  };

  const remove = async (id) => {
    const { error } = await supabase.from("missions").delete().eq("id", id);
    if (error) { show("ERRO: " + error.message, "danger"); return; }
    setMissions(p => p.filter(m => m.id !== id)); setDel(null); show("Removida.", "danger");
  };

  const toggle = async (id, currentAtiva) => {
    const { error } = await supabase.from("missions").update({ ativa: !currentAtiva }).eq("id", id);
    if (!error) setMissions(p => p.map(m => m.id === id ? { ...m, ativa: !currentAtiva } : m));
  };

  const move = async (id, dir) => {
    const idx = missions.findIndex(m => m.id === id);
    if ((dir === "up" && idx === 0) || (dir === "down" && idx === missions.length - 1)) return;
    const newMissions = [...missions];
    const j = dir === "up" ? idx - 1 : idx + 1;
    [newMissions[idx], newMissions[j]] = [newMissions[j], newMissions[idx]];
    setMissions(newMissions);
    await supabase.from("missions").update({ ordem: j }).eq("id", newMissions[j].id);
    await supabase.from("missions").update({ ordem: idx }).eq("id", newMissions[idx].id);
  };

  const MissionForm = ({ mission, onSave, isEdit }) => {
    const [f, setF] = useState(mission || { titulo: "", desc: "", valor: "", tipo: "deposito", link: "", ativa: true, max: "" });
    const set = (k, v) => setF(p => ({ ...p, [k]: v }));
    return (
      <div style={{ animation: "fadeUp 0.45s ease-out" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <h2 style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5 }}>{isEdit ? "EDITAR" : "NOVA"} MISSÃO</h2>
          <div onClick={() => { setView("list"); setEditing(null); }} className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>{<SvgBack size={10} color={D.muted} />}</div>
        </div>
        <Glass s={{ padding: "22px 18px", marginBottom: 14 }}>
          <Inp label="TÍTULO" placeholder="Ex: Deposite R$50" value={f.titulo} onChange={e => set("titulo", e.target.value)} />
          <Inp label="DESCRIÇÃO" placeholder="Instruções..." value={f.desc} onChange={e => set("desc", e.target.value)} multi />
          <Inp label="VALOR (R$)" placeholder="20" type="number" value={f.valor} onChange={e => set("valor", e.target.value)} />
          <Inp label="LINK (OPCIONAL)" placeholder="https://..." value={f.link} onChange={e => set("link", e.target.value)} />
        </Glass>
        <Glass s={{ padding: "18px", marginBottom: 18 }}>
          <div style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, letterSpacing: 0.5, color: D.dim, marginBottom: 12, textTransform: "uppercase" }}>PREVIEW</div>
          <Glass s={{ padding: "20px 18px", background: D.cardGrad }}>
            <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, color: D.muted, textTransform: "uppercase" }}><span style={{ color: D.red }}>|</span> TAREFA</span>
            <h3 style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, textTransform: "uppercase", margin: "6px 0 8px" }}>{f.titulo || "TÍTULO"}</h3>
            <p style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, color: D.muted, textTransform: "uppercase" }}>VALOR: {f.valor || "0"}R$</p>
          </Glass>
        </Glass>
        <div style={{ display: "flex", gap: 12 }}>
          <Btn v="outline" onClick={() => { setView("list"); setEditing(null); }} s={{ flex: 1 }}>CANCELAR</Btn>
          <Btn onClick={() => onSave(f)} disabled={!f.titulo || !f.valor} s={{ flex: 1 }}>{isEdit ? "SALVAR" : "CRIAR"}</Btn>
        </div>
      </div>
    );
  };

  if (view === "create") return <><ToastC msg={toast?.m} type={toast?.t} /><MissionForm onSave={create} /></>;
  if (view === "edit" && editing) return <><ToastC msg={toast?.m} type={toast?.t} /><MissionForm mission={{ ...editing, desc: editing.descricao, valor: String(editing.valor), max: editing.max_sub ? String(editing.max_sub) : "" }} onSave={edit} isEdit /></>;

  return (
    <div>
      <ToastC msg={toast?.m} type={toast?.t} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 8, flex: 1 }}>
          <BadgeC l={`${missions.filter(m => m.ativa).length} ativas`} c={"#22C55E"} />
          <BadgeC l={`R$ ${missions.filter(m => m.ativa).reduce((s, m) => s + Number(m.valor), 0)} total`} c={D.yellow} />
        </div>
        <Btn onClick={() => setView("create")} s={{ padding: "10px 22px", flexShrink: 0 }}>NOVA</Btn>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {missions.map((m, i) => (
          <Glass key={m.id} s={{ padding: "28px 24px", opacity: m.ativa ? 1 : 0.45, transition: "opacity 0.3s" }} a={`slideUp 0.45s ease-out ${i * 0.05}s both`}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, paddingTop: 2 }}>
                {IC.grip("rgba(255,255,255,0.10)")}
                <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.08)" }}>{String(i + 1).padStart(2, "0")}</span>
                <div onClick={() => move(m.id, "up")} style={{ cursor: i === 0 ? "default" : "pointer", opacity: i === 0 ? 0.12 : 0.35, padding: 1 }}>{IC.arrowUp()}</div>
                <div onClick={() => move(m.id, "down")} style={{ cursor: i === missions.length - 1 ? "default" : "pointer", opacity: i === missions.length - 1 ? 0.12 : 0.35, padding: 1 }}>{IC.arrowDn()}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: 5 }}>
                  <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, textTransform: "uppercase", textDecoration: m.ativa ? "none" : "line-through", textDecorationColor: "rgba(239,68,68,0.4)" }}>{m.titulo}</span>
                  <div onClick={() => { setEditing(m); setView("edit"); }} className="ic-btn" style={{ width: 35, height: 35, borderRadius: "50%", background: D.glass, border: `1px solid ${D.glassBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{IC.edit(D.muted)}</div>
                  <div onClick={() => setDel(m)} style={{ width: 35, height: 35, borderRadius: "50%", background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.10)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>{IC.trash("#EF4444")}</div>
                </div>
                {m.descricao && <p style={{ fontFamily: D.sora, fontSize: 12, color: D.dim, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textTransform: "uppercase" }}>{m.descricao}</p>}
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, color: D.white }}>R$ {Number(m.valor).toFixed(2).replace(".", ",")}</span>
                  {m.max_sub && <span style={{ fontFamily: D.sora, fontSize: 12, color: D.muted, textTransform: "uppercase" }}>Máx: {m.max_sub}</span>}
                </div>
                {m.link && (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 16, background: D.glass, border: `1px solid ${D.glassBorder}`, marginBottom: 8, maxWidth: "100%" }}>
                    {IC.link(D.dim)}<span style={{ fontFamily: D.sora, fontSize: 12, color: D.dim, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textTransform: "uppercase" }}>{m.link}</span>
                  </div>
                )}
                <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                  <Tog active={m.ativa} onToggle={() => toggle(m.id, m.ativa)} />
                  <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, letterSpacing: 0.3, color: m.ativa ? D.red : "rgba(239,68,68,0.6)", textTransform: "uppercase" }}>{m.ativa ? "ATIVA" : "OFF"}</span>
                </div>
              </div>
            </div>
          </Glass>
        ))}
      </div>
      {del && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(5,5,5,0.70)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, animation: "fadeIn 0.24s" }} onClick={() => setDel(null)}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 370, animation: "scaleIn 0.35s" }}>
            <Glass s={{ padding: "28px 24px", textAlign: "center" }}>
              <div style={{ width: 54, height: 54, borderRadius: "50%", margin: "0 auto 14px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.20)", display: "flex", alignItems: "center", justifyContent: "center", animation: "shake 0.4s ease-out" }}>{IC.trash("#EF4444")}</div>
              <h3 style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, textTransform: "uppercase", marginBottom: 8 }}>DELETAR?</h3>
              <p style={{ fontFamily: D.sora, fontSize: 12, color: D.muted, marginBottom: 20, textTransform: "uppercase" }}>"{del.titulo}"</p>
              <div style={{ display: "flex", gap: 10 }}>
                <Btn v="outline" onClick={() => setDel(null)} s={{ flex: 1 }}>CANCELAR</Btn>
                <Btn v="danger" onClick={() => remove(del.id)} s={{ flex: 1, background: "rgba(239,68,68,0.08)" }}>{IC.trash("#EF4444")} DELETAR</Btn>
              </div>
            </Glass>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════
// ABA: CONFIGURAÇÕES  ✦  NOVA
// ═══════════════════════════════════════════
/*
  IMPORTANTE: Crie esta tabela no Supabase antes de usar:
  
  CREATE TABLE IF NOT EXISTS settings (
    key        TEXT PRIMARY KEY,
    value      TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
  );
*/

// Helper: hex → rgb array
const hexToRGB = (hex) => {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
  return [parseInt(full.slice(0, 2), 16), parseInt(full.slice(2, 4), 16), parseInt(full.slice(4, 6), 16)];
};

// Helper: rgba string → hex (#rrggbb)
const rgbaToHex = (rgba) => {
  const m = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return "#232323";
  return "#" + [m[1], m[2], m[3]].map(n => parseInt(n).toString(16).padStart(2, "0")).join("");
};

// Helper: rgba string → alpha
const rgbaToAlpha = (rgba) => {
  const m = rgba.match(/rgba?\(\d+,\s*\d+,\s*\d+,?\s*([\d.]+)?\)/);
  return m ? parseFloat(m[1] ?? "1") : 1;
};

// Color Picker row
const ColorRow = ({ label, value, onChange, hint }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
      <span style={{ fontFamily: D.sora, fontSize: 11, fontWeight: 700, color: D.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</span>
      {hint && <span style={{ fontFamily: D.sora, fontSize: 10, color: D.dim, textTransform: "uppercase" }}>{hint}</span>}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {/* Color swatch picker */}
      <div style={{ width: 44, height: 44, borderRadius: 12, background: value, border: `1px solid rgba(255,255,255,0.15)`, flexShrink: 0, overflow: "hidden", position: "relative" }}>
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
        />
      </div>
      {/* Hex text input */}
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ flex: 1, background: D.glass, border: `1px solid ${D.glassBorder}`, borderRadius: D.radiusSm, color: D.white, fontFamily: D.sora, fontSize: 12, fontWeight: 700, padding: "10px 16px", textTransform: "uppercase", letterSpacing: 1, minHeight: 40 }}
      />
      {/* Live preview swatch */}
      <div style={{ width: 44, height: 44, borderRadius: 12, background: value, boxShadow: `0 0 18px ${value}88`, border: `1px solid ${D.glassBorder}`, flexShrink: 0, transition: "all 0.3s ease" }} />
    </div>
  </div>
);

// Slider row
const SliderRow = ({ label, value, min, max, step = 1, onChange, unit = "" }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
      <span style={{ fontFamily: D.sora, fontSize: 11, fontWeight: 700, color: D.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</span>
      <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, color: D.white }}>{value}{unit}</span>
    </div>
    <input
      type="range"
      min={min} max={max} step={step}
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      style={{ width: "100%" }}
    />
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
      <span style={{ fontFamily: D.sora, fontSize: 10, color: D.dim }}>{min}{unit}</span>
      <span style={{ fontFamily: D.sora, fontSize: 10, color: D.dim }}>{max}{unit}</span>
    </div>
  </div>
);

const AConfig = () => {
  const [cfg, setCfg] = useState({
    iconColor:     "#ffffff",      // #ffffff
    coinGlowHex:   "#232323",        // cor base do glow
    coinGlowAlpha: 0.90,             // opacidade central
    coinGlowBlur:  22,   // 22
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const show = (m, t = "success") => { setToast({ m, t }); setTimeout(() => setToast(null), 2500); };

  // Carrega configurações salvas
  useEffect(() => {
    supabase.from("settings").select("value").eq("key", "app_config").maybeSingle()
      .then(({ data, error }) => {
        setLoading(false);
        if (data?.value) {
          try {
            const s = JSON.parse(data.value);
            setCfg({
              iconColor:     s.iconColor    ?? "#ffffff",
              coinGlowHex:   s.coinGlowHex  ?? rgbaToHex("rgba(35,35,35,0.90)"),
              coinGlowAlpha: s.coinGlowAlpha ?? rgbaToAlpha("rgba(35,35,35,0.90)"),
              coinGlowBlur:  s.coinGlowBlur  ?? 22,
            });
          } catch {}
        }
      });
  }, []);

  // Deriva os valores rgba finais
  const derivedCoinGlow = () => {
    const [r, g, b] = hexToRGB(cfg.coinGlowHex);
    return {
      coinGlow:    `rgba(${r},${g},${b},${cfg.coinGlowAlpha})`,
      coinGlowMid: `rgba(${r},${g},${b},${(cfg.coinGlowAlpha * 0.55).toFixed(2)})`,
    };
  };

  const handleSave = async () => {
    setSaving(true);
    const { coinGlow, coinGlowMid } = derivedCoinGlow();
    const toSave = {
      iconColor:     cfg.iconColor,
      coinGlowHex:   cfg.coinGlowHex,
      coinGlowAlpha: cfg.coinGlowAlpha,
      coinGlowBlur:  cfg.coinGlowBlur,
      // Valores finais usados pelo App.jsx
      coinGlow,
      coinGlowMid,
    };
    const { error } = await supabase.from("settings").upsert({ key: "app_config", value: JSON.stringify(toSave), updated_at: new Date().toISOString() });
    setSaving(false);
    if (error) {
      if (error.code === "42P01") {
        show("CRIE A TABELA 'settings' NO SUPABASE! (SQL no código)", "danger");
      } else {
        show("ERRO: " + error.message, "danger");
      }
      return;
    }
    // Aplica imediatamente no runtime
    const { coinGlow: cg, coinGlowMid: cgm } = derivedCoinGlow();
    updateSettings({ iconColor: cfg.iconColor, coinGlow: cg, coinGlowMid: cgm, coinGlowBlur: cfg.coinGlowBlur });
    show("CONFIGURAÇÕES SALVAS E APLICADAS!");
  };

  const handleReset = () => {
    setCfg({
      iconColor:     "#ffffff",
      coinGlowHex:   rgbaToHex("rgba(35,35,35,0.90)"),
      coinGlowAlpha: rgbaToAlpha("rgba(35,35,35,0.90)"),
      coinGlowBlur:  22,
    });
    show("PADRÕES RESTAURADOS.");
  };

  // Preview ao vivo do glow
  const { coinGlow, coinGlowMid } = derivedCoinGlow();

  if (loading) return (
    <div style={{ textAlign: "center", padding: 40, color: D.muted, fontFamily: D.sora, fontSize: 12, textTransform: "uppercase" }}>CARREGANDO...</div>
  );

  return (
    <div>
      <ToastC msg={toast?.m} type={toast?.t} />

      {/* ── Seção: Ícones ── */}
      <Glass s={{ padding: "24px 20px", marginBottom: 16 }} a="fadeUp 0.4s ease-out">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ width: 35, height: 35, borderRadius: "50%", background: D.btnGrad, boxShadow: D.btnGlowSm, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FaPaintbrush size={10}  color="#000" />
          </div>
          <div>
            <div style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5 }}>COR DOS ÍCONES</div>
            <div style={{ fontFamily: D.sora, fontSize: 11, color: D.muted, textTransform: "uppercase", marginTop: 2 }}>Aplicado em todos os ícones do sistema</div>
          </div>
        </div>
        <ColorRow
          label="Cor principal dos ícones"
          value={cfg.iconColor}
          onChange={v => setCfg(p => ({ ...p, iconColor: v }))}
          hint="Padrão: #ffffff"
        />
        {/* Preview de ícones */}
        <div style={{ padding: "14px 16px", background: "rgba(0,0,0,0.30)", borderRadius: D.radiusSm, border: `1px solid ${D.glassBorder}`, marginTop: 4 }}>
          <div style={{ fontFamily: D.sora, fontSize: 10, color: D.dim, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>PREVIEW DOS ÍCONES</div>
          <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
            {[
              boldIC(FaWallet,       cfg.iconColor, 22),
              boldIC(FaRightFromBracket,       cfg.iconColor, 22),
              boldIC(FaClock,        cfg.iconColor, 22),
              solidIC(FaCircleCheck, cfg.iconColor, 22),
              solidIC(FaCircleXmark,     cfg.iconColor, 22),
              boldIC(FaTrophy,       cfg.iconColor, 22),
              boldIC(FaTicket,       cfg.iconColor, 22),
              solidIC(FaCircleInfo,        cfg.iconColor, 22),
              boldIC(FaArrowUpRightFromSquare, cfg.iconColor, 22),
              solidIC(FaBolt,         cfg.iconColor, 22),
            ].map((icon, i) => (
              <div key={i} style={{ width: 36, height: 36, borderRadius: 10, background: D.glass, border: `1px solid ${D.glassBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {icon}
              </div>
            ))}
          </div>
        </div>
      </Glass>

      {/* ── Seção: Glow da Moeda ── */}
      <Glass s={{ padding: "24px 20px", marginBottom: 16 }} a="fadeUp 0.4s ease-out 0.08s both">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ width: 35, height: 35, borderRadius: "50%", background: D.btnGrad, boxShadow: D.btnGlowSm, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FaSliders size={10}  color="#000" />
          </div>
          <div>
            <div style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5 }}>GLOW DA MOEDA</div>
            <div style={{ fontFamily: D.sora, fontSize: 11, color: D.muted, textTransform: "uppercase", marginTop: 2 }}>Halo luminoso ao redor da moeda</div>
          </div>
        </div>

        <ColorRow
          label="Cor base do glow"
          value={cfg.coinGlowHex}
          onChange={v => setCfg(p => ({ ...p, coinGlowHex: v }))}
          hint={`Atual: ${coinGlow}`}
        />

        <SliderRow
          label="Intensidade do brilho"
          value={Math.round(cfg.coinGlowAlpha * 100)}
          min={0} max={100} step={1} unit="%"
          onChange={v => setCfg(p => ({ ...p, coinGlowAlpha: v / 100 }))}
        />

        <SliderRow
          label="Raio do blur"
          value={cfg.coinGlowBlur}
          min={0} max={60} step={1} unit="px"
          onChange={v => setCfg(p => ({ ...p, coinGlowBlur: v }))}
        />

        {/* Preview ao vivo do glow */}
        <div style={{ padding: "28px 20px", background: "rgba(0,0,0,0.40)", borderRadius: D.radiusSm, border: `1px solid ${D.glassBorder}`, marginTop: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: D.sora, fontSize: 10, color: D.dim, textTransform: "uppercase", letterSpacing: 0.5 }}>PREVIEW AO VIVO</span>
          <div style={{ position: "relative", width: 110, height: 110, display: "flex", alignItems: "center", justifyContent: "center", animation: "float 3.5s ease-in-out infinite" }}>
            <div style={{ position: "absolute", inset: -40, background: "radial-gradient(circle, ${coinGlow} 0%, ${coinGlowMid} 35%, rgba(35,35,35,0.15) 60%, transparent 78%)", borderRadius: "50%", filter: `blur(${cfg.coinGlowBlur}px)`, pointerEvents: "none" }} />
            <img src={imgIconePrincipal} alt="Moeda" style={{ width: "100%", height: "100%", objectFit: "contain", position: "relative", zIndex: 1 }} />
          </div>
        </div>
      </Glass>

      {/* ── Botões de ação ── */}
      <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
        <Btn v="outline" onClick={handleReset} s={{ flex: 1 }}>
          <FaArrowsRotate size={10} /> RESTAURAR PADRÃO
        </Btn>
        <Btn onClick={handleSave} disabled={saving} s={{ flex: 1 }}>
          <FaDownload size={10} />{saving ? "SALVANDO..." : "SALVAR TUDO"}
        </Btn>
      </div>

      <div style={{ padding: "12px 16px", background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.18)", borderRadius: D.radiusSm, marginTop: 8 }}>
        <p style={{ fontFamily: D.sora, fontSize: 11, color: "#F59E0B", textTransform: "uppercase", letterSpacing: 0.3, lineHeight: 1.5 }}>
          ⚡ As alterações são aplicadas em tempo real ao salvar.<br />
          O App.jsx carrega automaticamente as configs ao iniciar.
        </p>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// APP ADMIN PRINCIPAL
// ═══════════════════════════════════════════
export default function AdminApp() {
  const [session, setSession] = useState(undefined);
  const [profile, setProfile] = useState(null);
  const [adminTab, setAdminTab] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [subs, setSubs] = useState([]);
  const [withs, setWiths] = useState([]);
  const [usrs, setUsrs] = useState([]);
  const [missions, setMissions] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) loadProfile(session.user.id);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) setProfile(null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId) => {
    const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
    setProfile(data);
  };

  // Carrega dados + settings
  useEffect(() => {
    if (!profile || profile.role !== "admin") return;
    const loadAll = async () => {
      setLoadingData(true);
      const [subsRes, withsRes, usrsRes, missionsRes] = await Promise.all([
        supabase.from("submissions").select("*").order("created_at", { ascending: false }),
        supabase.from("withdrawals").select("*").order("created_at", { ascending: false }),
        supabase.from("profiles").select("*").neq("role", "admin").order("created_at", { ascending: false }),
        supabase.from("missions").select("*").order("ordem", { ascending: true }),
      ]);
      if (!subsRes.error) setSubs(subsRes.data || []);
      if (!withsRes.error) setWiths(withsRes.data || []);
      if (!usrsRes.error) setUsrs(usrsRes.data || []);
      if (!missionsRes.error) setMissions(missionsRes.data || []);
      setLoadingData(false);
    };
    loadAll();

    // Carrega settings para aplicar ao runtime do admin
    supabase.from("settings").select("value").eq("key", "app_config").maybeSingle()
      .then(({ data }) => {
        if (data?.value) {
          try { updateSettings(JSON.parse(data.value)); } catch {}
        }
      });

    const subChannel = supabase.channel("submissions-changes").on("postgres_changes", { event: "*", schema: "public", table: "submissions" }, () => loadAll()).subscribe();
    const withChannel = supabase.channel("withdrawals-changes").on("postgres_changes", { event: "*", schema: "public", table: "withdrawals" }, () => loadAll()).subscribe();
    return () => { supabase.removeChannel(subChannel); supabase.removeChannel(withChannel); };
  }, [profile]);

  const handleLogout = async () => { await supabase.auth.signOut(); setProfile(null); setSession(null); };

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close, { passive: true });
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("touchstart", close); };
  }, [menuOpen]);

  if (session === undefined) return (
    <><Styles /><div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", background: D.bg1 }}>
      <div style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(35,35,35,0.15)", borderTopColor: D.red, animation: "spin 0.8s linear infinite" }} />
    </div></>
  );

  if (!session || profile?.role !== "admin") {
    return (
      <><Styles /><BG>
        <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", padding: "0 20px 44px" }}>
          <Glass s={{ padding: "36px 30px", textAlign: "center", maxWidth: 360 }}>
            <img src={imgLogo} alt="ADMIN" style={{ height: 28, width: "auto", objectFit: "contain", marginBottom: 16 }} />
            <p style={{ fontFamily: D.sora, fontSize: 12, color: D.muted, textTransform: "uppercase", marginBottom: 24 }}>ACESSO RESTRITO AO ADMINISTRADOR.</p>
            <Btn onClick={() => window.location.href = "/"}>IR PARA O LOGIN</Btn>
          </Glass>
        </div>
      </BG></>
    );
  }

  const TAB_LABELS = {
    overview:    "PAINEL DA BANCA",
    submissions: "COMPROVANTES",
    withdrawals: "FILA DE SAQUES",
    users:       "USUÁRIOS",
    missions:    "GERENCIAR TAREFAS",
    config:      "CONFIGURAÇÕES",
  };

  const pendSubs  = subs.filter(s => s.status === "pendente").length;
  const pendWith  = withs.filter(w => w.status === "pendente").length;
  const pendTotal = pendSubs + pendWith;

  const menuItems = [
    { k: "overview",    label: "Painel da banca" },
    { k: "submissions", label: "Comprovantes",      badge: pendSubs },
    { k: "withdrawals", label: "Fila de saques",    badge: pendWith },
    { k: "users",       label: "Usuários" },
    { k: "missions",    label: "Gerenciar tarefas" },
    { k: "logout",      label: "Sair" },
  ];

  return (
    <><Styles /><BG>
      <div style={{ maxWidth: 430, width: "100%", padding: "0 20px 44px", boxSizing: "border-box", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", marginTop: 16, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: D.radiusSm, position: "relative", zIndex: 100, animation: "fadeUp 0.6s ease-out" }}>
          <img src={imgLogo} alt={"TASKY"} style={{ height: 28, width: "auto", objectFit: "contain" }} />
          <span style={{ fontFamily: D.sora, fontSize: 12, fontWeight: 800, color: pendTotal > 0 ? D.yellow : D.muted, textTransform: "uppercase" }}>
            {pendTotal > 0 ? `${pendTotal} PENDENTE${pendTotal !== 1 ? "S" : ""}` : "SINCRONIZADO"}
          </span>
          <div ref={menuRef} style={{ position: "relative" }}>
            <div onClick={() => setMenuOpen(o => !o)} style={{ width: 35, height: 35, borderRadius: "50%", background: menuOpen ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s ease", position: "relative" }}>
              {IC.grid(menuOpen ? "white" : "rgba(255,255,255,0.70)")}
              {pendTotal > 0 && !menuOpen && (
                <div style={{ position: "absolute", top: -2, right: -2, minWidth: 14, height: 14, borderRadius: "50%", background: D.red, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800, fontFamily: D.sora, color: "white", padding: "0 3px" }}>{pendTotal > 9 ? "9+" : pendTotal}</div>
              )}
            </div>
            {menuOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 10px)", right: 0, minWidth: 220, zIndex: 9999, background: "rgba(8,8,8,0.98)", border: `1px solid ${D.glassBorder}`, borderRadius: D.radiusSm, padding: "8px 0", animation: "slideDown 0.28s cubic-bezier(0.34,1.56,0.64,1)", boxShadow: "0 20px 60px rgba(0,0,0,0.9)" }}>
                {menuItems.map(item => {
                  if (item.k === "logout") {
                    return (
                      <div key="logout" onClick={() => { setMenuOpen(false); handleLogout(); }} style={{ display: "flex", alignItems: "center", padding: "12px 18px", cursor: "pointer", fontFamily: D.sora, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4, color: "rgba(255,255,255,0.55)", borderTop: `1px solid ${D.glassBorder}`, marginTop: 4 }}>
                        Sair
                      </div>
                    );
                  }
                  const active = adminTab === item.k;
                  return (
                    <div key={item.k} onClick={() => { setAdminTab(item.k); setMenuOpen(false); window.scrollTo(0, 0); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "11px 18px", cursor: "pointer", fontFamily: D.sora, fontSize: 12, fontWeight: active ? 800 : 700, textTransform: "uppercase", letterSpacing: 0.4, color: active ? "#232323" : "rgba(255,255,255,0.72)", background: active ? "rgba(35,35,35,0.07)" : "transparent", borderLeft: active ? "1px solid #232323" : "1px solid transparent" }}>
                      <span style={{ flex: 1, minWidth: 0 }}>{item.label}</span>
                      {item.badge > 0 && (
                        <span style={{ minWidth: 18, height: 18, borderRadius: "50%", background: D.red, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: "white", flexShrink: 0 }}>{item.badge}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Tab title */}
        <div style={{ margin: "18px 0 8px 4px" }}>
          <h1 style={{ fontFamily: D.sora, fontSize: 35, fontWeight: 800, textTransform: "uppercase", lineHeight: 0.88, letterSpacing: -2, wordBreak: "break-word", background: "linear-gradient(90deg, #3b3b3b 0%, #ffffff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }} dangerouslySetInnerHTML={{ __html: TAB_LABELS[adminTab] }} />
        </div>

        {/* Content */}
        {loadingData && adminTab !== "config"
          ? <div style={{ textAlign: "center", padding: 40, color: D.muted, fontFamily: D.sora, fontSize: 12, textTransform: "uppercase" }}>CARREGANDO...</div>
          : (
            <div key={adminTab} style={{ animation: "fadeIn 0.3s ease-out" }}>
              {adminTab === "overview"    && <AOverview subs={subs} withs={withs} usrs={usrs} />}
              {adminTab === "submissions" && <ASubs subs={subs} setSubs={setSubs} />}
              {adminTab === "withdrawals" && <AWiths withs={withs} setWiths={setWiths} />}
              {adminTab === "users"       && <AUsers usrs={usrs} setUsrs={setUsrs} />}
              {adminTab === "missions"    && <AMissions missions={missions} setMissions={setMissions} />}
              {adminTab === "config"      && <AConfig />}
            </div>
          )
        }
      </div>
    </BG></>
  );
}
