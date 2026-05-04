import { useState } from "react";

/* ── Design tokens ── */
const T = {
  cream:   "#FAF6EF",
  paper:   "#F3EDE3",
  card:    "#FFFFFF",
  stroke:  "#E8DDD0",
  muted:   "#B8AA9A",
  text:    "#2A1F18",
  sub:     "#7A6A5A",
  sage:    "#8B9E7A",
  rose:    "#C4856A",
  amber:   "#B8966A",
  taupe:   "#9E8A7A",
  sageL:   "#EDF2EA",
  roseL:   "#F9EDE8",
  amberL:  "#F5EFE4",
  taupeL:  "#F2ECE8",
};

const MARKS = [
  { symbol: "○", label: "예",     score: 2, color: T.sage,  bg: T.sageL,  border: "#B5CAAC" },
  { symbol: "△", label: "보통",   score: 1, color: T.amber, bg: T.amberL, border: "#CDB990" },
  { symbol: "✕", label: "아니오", score: 0, color: T.rose,  bg: T.roseL,  border: "#D9A898" },
];

const categories = [
  {
    id: "physical", emoji: "🌿", label: "신체적 웰니스", en: "Physical Wellness",
    color: T.sage, light: T.sageL, border: "#B5CAAC",
    desc: "몸의 건강을 능동적으로 관리하는 것",
    items: [
      { q: "하루 30분 이상 신체 활동(운동, 걷기 등)을 한다" },
      { q: "하루 7~8시간 수면을 취한다" },
      { q: "균형 잡힌 식사를 하루 3끼 한다" },
      { q: "물을 하루 1.5L 이상 마신다" },
      { q: "정기적인 건강검진을 받는다" },
      { q: "음주·흡연을 하지 않거나 절제하고 있다" },
      { q: "몸의 이상 신호(통증, 피로 등)를 무시하지 않고 대응한다" },
      { q: "하루 중 스트레칭이나 가벼운 움직임을 의식적으로 한다" },
    ],
  },
  {
    id: "mental", emoji: "🕊️", label: "정신건강", en: "Mental Wellness",
    color: T.rose, light: T.roseL, border: "#D9A898",
    desc: "감정·심리적 균형과 정신건강 전반을 점검하는 것",
    note: "아래 역채점 항목은 전문가 진단이 아닙니다. 이상 신호가 다수일 경우 전문의 상담을 권장합니다.",
    items: [
      { q: "스트레스를 인식하고 건강하게 해소할 수 있다" },
      { q: "명상 또는 마음챙김을 실천한다" },
      { q: "부정적인 감정을 건강하게 표현할 수 있다" },
      { q: "취미나 즐거운 활동에 시간을 쓴다" },
      { q: "자기 자신에게 친절하다 (자기 비판을 줄인다)" },
      { q: "최근 2주간 대부분의 시간 기분이 가라앉거나 우울했다", reverse: true },
      { q: "최근 2주간 일상 활동에 대한 흥미나 즐거움이 줄었다", reverse: true },
      { q: "이유 없이 피로하거나 에너지가 부족하다고 느꼈다", reverse: true },
      { q: "수면에 문제가 있다 (너무 많이 자거나, 잘 못 잔다)", reverse: true },
      { q: "집중력이 떨어지거나 결정을 내리기 어렵다고 느꼈다", reverse: true },
      { q: "자신이 쓸모없다는 느낌이나 과도한 죄책감을 느꼈다", reverse: true },
      { q: "죽고 싶다거나 스스로를 해치고 싶다는 생각이 든 적 있다", reverse: true },
      { q: "평소보다 불안하거나 초조한 감정이 자주 든다", reverse: true },
      { q: "타인에게 피해를 준다는 생각이 자주 든다", reverse: true },
      { q: "현재 정신건강 전문가에게 상담·치료 중이다", neutral: true },
    ],
  },
  {
    id: "daily", emoji: "☀️", label: "일상 계획", en: "Daily Routine",
    color: T.amber, light: T.amberL, border: "#CDB990",
    desc: "평일 루틴과 1년 이내 주요 생활 변화 계획 파악",
    note: "생활 계획 항목은 계획이 있으면 ○, 가능성 있으면 △, 없으면 ✕로 표시해 주세요.",
    items: [
      { q: "평일에 규칙적인 기상·취침 시간을 유지한다" },
      { q: "평일 낮 시간 대부분을 생산적인 활동에 쓴다" },
      { q: "평일 식사를 거르지 않고 규칙적으로 먹는다" },
      { q: "평일 스마트폰·SNS 사용이 하루 3시간 이내이다" },
      { q: "평일에도 나만의 여가·휴식 시간이 있다" },
      { q: "평일 귀가 후 가족·동거인 등과 긍정적인 교류가 있다" },
      { q: "평일 동안 의미 있는 대화를 한 명 이상과 나눈다" },
      { q: "1년 이내 군 입대 계획이 있다", neutral: true },
      { q: "1년 이내 해외 유학 또는 어학연수 계획이 있다", neutral: true },
      { q: "1년 이내 이사 또는 독립 계획이 있다", neutral: true },
      { q: "1년 이내 취업 또는 이직 계획이 있다", neutral: true },
      { q: "1년 이내 결혼 또는 동거 계획이 있다", neutral: true },
      { q: "1년 이내 학업(입학·졸업 등) 관련 주요 변화가 있다", neutral: true },
    ],
  },
  {
    id: "social", emoji: "🌸", label: "사회적 웰니스", en: "Social Wellness",
    color: T.taupe, light: T.taupeL, border: "#C4B2A8",
    desc: "건강한 인간관계, 소속감, 일·학업의 의미를 통합적으로 점검",
    items: [
      { q: "신뢰할 수 있는 가족이나 친구가 있다" },
      { q: "타인과 의미 있는 대화를 나눈다" },
      { q: "도움이 필요할 때 요청할 수 있다" },
      { q: "공동체 활동 또는 모임에 참여한다" },
      { q: "건강한 경계를 유지하며 관계를 맺는다" },
      { q: "내 일(또는 학업)에서 의미나 보람을 느낀다" },
      { q: "일·학업과 개인 생활의 균형을 유지한다" },
      { q: "나의 강점을 발휘할 기회가 있다" },
      { q: "번아웃 없이 지속적으로 활동한다" },
      { q: "성장과 배움의 기회가 있다" },
    ],
  },
];

const sectionBreaks = {
  mental: { 5: "자가 점검 Checklist" },
  daily:  { 7: "1년 이내 계획 Life Plan" },
  social: { 5: "직업·학업 Career & Study" },
};

function getGrade(pct) {
  if (pct >= 80) return { label: "Very Good", ko: "매우 좋음",      color: T.sage };
  if (pct >= 60) return { label: "Good",      ko: "좋음",           color: "#9AAD88" };
  if (pct >= 40) return { label: "Fair",       ko: "보통",           color: T.amber };
  if (pct >= 20) return { label: "Caution",    ko: "주의 필요",      color: T.rose };
  return             { label: "Attention",    ko: "집중 관리 필요", color: "#C06050" };
}

function ArcMeter({ pct, color, size = 100 }) {
  const cx = size / 2, cy = size / 2;
  const r = size * 0.38;
  const start = Math.PI * 0.8, end = Math.PI * 2.2;
  const range = end - start;
  const angle = start + (pct / 100) * range;
  const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start);
  const x2 = cx + r * Math.cos(end),   y2 = cy + r * Math.sin(end);
  const ax = cx + r * Math.cos(angle), ay = cy + r * Math.sin(angle);
  const la = pct > 55 ? 1 : 0;
  const trackD = `M ${x1} ${y1} A ${r} ${r} 0 1 1 ${x2} ${y2}`;
  const arcD   = pct < 1 ? "" : `M ${x1} ${y1} A ${r} ${r} 0 ${la} 1 ${ax} ${ay}`;
  return (
    <svg width={size} height={size} style={{ overflow: "visible" }}>
      <path d={trackD} fill="none" stroke={T.stroke} strokeWidth={size * 0.08} strokeLinecap="round" />
      {arcD && (
        <path d={arcD} fill="none" stroke={color} strokeWidth={size * 0.08} strokeLinecap="round"
          style={{ transition: "all 0.7s ease" }} />
      )}
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={size * 0.22} fontWeight="300"
        fill={T.text} fontFamily="'Cormorant Garamond', serif">{pct}</text>
    </svg>
  );
}

export default function App() {
  const [answers, setAnswers] = useState({});
  const [activeTab, setActiveTab] = useState("intro");
  const [activeCat, setActiveCat] = useState("physical");

  const setMark = (catId, idx, mIdx) => {
    const key = `${catId}-${idx}`;
    setAnswers(prev => {
      if (prev[key] === mIdx) { const n = { ...prev }; delete n[key]; return n; }
      return { ...prev, [key]: mIdx };
    });
  };

  const catScore = (cat) => {
    const scorable = cat.items.filter(it => !it.neutral);
    const answered = scorable.filter(it => answers[`${cat.id}-${cat.items.indexOf(it)}`] !== undefined);
    if (!answered.length) return 0;
    const earned = scorable.reduce((s, it) => {
      const mIdx = answers[`${cat.id}-${cat.items.indexOf(it)}`];
      if (mIdx === undefined) return s;
      return s + (it.reverse ? 2 - MARKS[mIdx].score : MARKS[mIdx].score);
    }, 0);
    return Math.round((earned / (answered.length * 2)) * 100);
  };

  const totalScore = Math.round(categories.reduce((s, c) => s + catScore(c), 0) / categories.length);
  const totalGrade = getGrade(totalScore);
  const totalAnswered = categories.reduce((s, c) => s + c.items.filter((_, i) => answers[`${c.id}-${i}`] !== undefined).length, 0);
  const totalItems = categories.reduce((s, c) => s + c.items.length, 0);
  const pctDone = Math.round((totalAnswered / totalItems) * 100);

  const current = categories.find(c => c.id === activeCat);
  const currentIdx = categories.findIndex(c => c.id === activeCat);

  const depAlert = categories.find(c => c.id === "mental").items.filter((it, i) => {
    if (!it.reverse) return false;
    const m = answers[`mental-${i}`];
    return m !== undefined && MARKS[m].score <= 1;
  }).length;

  const S = {
    wrap: { minHeight: "100vh", background: T.cream, color: T.text, fontFamily: "'DM Sans', sans-serif", paddingBottom: 72 },
    serif: { fontFamily: "'Cormorant Garamond', serif" },
    card: { background: T.card, borderRadius: 16, border: `1px solid ${T.stroke}`, boxShadow: "0 2px 16px rgba(42,31,24,0.06)" },
    btn: (bg, color = "#fff") => ({ padding: "15px 24px", borderRadius: 12, border: "none", background: bg, color, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.02em" }),
  };

  return (
    <div style={S.wrap}>

      {/* Header */}
      <div style={{ background: T.paper, borderBottom: `1px solid ${T.stroke}`, padding: "40px 24px 28px", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.18em", color: T.muted, marginBottom: 10, fontWeight: 500 }}>WELLNESS CHECKLIST</div>
        <h1 style={{ ...S.serif, margin: 0, fontSize: 34, fontWeight: 300, color: T.text, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
          나를 이해하고,<br /><em>나답게 살아가기</em>
        </h1>
        <p style={{ margin: "12px 0 0", color: T.sub, fontSize: 13, fontWeight: 300 }}>지속 가능한 웰니스를 설계하세요</p>
        <div style={{ maxWidth: 320, margin: "20px auto 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 11, color: T.muted }}>
            <span>진행률</span><span>{totalAnswered} / {totalItems}</span>
          </div>
          <div style={{ height: 3, background: T.stroke, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pctDone}%`, background: `linear-gradient(90deg,${T.sage},${T.amber})`, borderRadius: 3, transition: "width 0.5s ease" }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: T.paper, borderBottom: `1px solid ${T.stroke}`, position: "sticky", top: 0, zIndex: 20 }}>
        {["intro", "check", "result"].map(tab => {
          const labels = { intro: "웰니스란?", check: "체크리스트", result: "분석 결과" };
          const active = activeTab === tab;
          return (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: "14px 0", border: "none", background: "transparent", cursor: "pointer", fontSize: 12, fontWeight: active ? 500 : 400, color: active ? T.text : T.muted, borderBottom: active ? `2px solid ${T.text}` : "2px solid transparent", letterSpacing: "0.05em", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }}>
              {labels[tab].toUpperCase()}
            </button>
          );
        })}
      </div>

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 20px" }}>

        {/* ── INTRO ── */}
        {activeTab === "intro" && (
          <div style={{ paddingTop: 36 }}>
            <div style={{ ...S.card, padding: "28px 24px", marginBottom: 20, background: T.paper }}>
              <div style={{ fontSize: 10, letterSpacing: "0.15em", color: T.muted, marginBottom: 10 }}>ABOUT WELLNESS</div>
              <h2 style={{ ...S.serif, margin: "0 0 14px", fontSize: 22, fontWeight: 400, color: T.text, lineHeight: 1.4 }}>
                "단 한 시간,<br />당신의 하루를 바꾸는 경험"
              </h2>
              <p style={{ margin: 0, lineHeight: 1.9, color: T.sub, fontSize: 13, fontWeight: 300 }}>
                웰니스는 단순히 <strong style={{ color: T.text, fontWeight: 500 }}>병이 없는 상태</strong>를 넘어,
                몸과 마음이 조화롭게 균형을 이루며{" "}
                <strong style={{ color: T.text, fontWeight: 500 }}>더 나은 하루를 능동적으로 설계</strong>하는 삶의 방식입니다.
              </p>
            </div>

            <div style={{ ...S.card, padding: "20px 24px", marginBottom: 20 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.15em", color: T.muted, marginBottom: 14 }}>HOW TO ANSWER</div>
              <div style={{ display: "flex", gap: 10 }}>
                {MARKS.map(m => (
                  <div key={m.symbol} style={{ flex: 1, textAlign: "center", padding: "16px 8px", background: m.bg, border: `1px solid ${m.border}`, borderRadius: 12 }}>
                    <div style={{ ...S.serif, fontSize: 28, fontWeight: 400, color: m.color, lineHeight: 1 }}>{m.symbol}</div>
                    <div style={{ fontSize: 11, color: m.color, marginTop: 6, fontWeight: 500, letterSpacing: "0.05em" }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {categories.map(cat => (
              <div key={cat.id} style={{ ...S.card, padding: "18px 20px", marginBottom: 10, display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: cat.light, border: `1px solid ${cat.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                  {cat.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.15em", color: cat.color, marginBottom: 3, fontWeight: 500 }}>{cat.en.toUpperCase()}</div>
                  <div style={{ ...S.serif, fontSize: 17, fontWeight: 400, color: T.text, marginBottom: 3 }}>{cat.label}</div>
                  <div style={{ fontSize: 11, color: T.muted, fontWeight: 300 }}>{cat.items.length}개 항목</div>
                </div>
              </div>
            ))}

            <button onClick={() => setActiveTab("check")} style={{ ...S.btn(`linear-gradient(135deg,${T.sage},#7A9068)`), width: "100%", marginTop: 12 }}>
              체크리스트 시작하기
            </button>
          </div>
        )}

        {/* ── CHECK ── */}
        {activeTab === "check" && (
          <div style={{ paddingTop: 24 }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 20, overflowX: "auto", paddingBottom: 2 }}>
              {categories.map(cat => {
                const done = cat.items.every((_, i) => answers[`${cat.id}-${i}`] !== undefined);
                const active = activeCat === cat.id;
                return (
                  <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{ flexShrink: 0, padding: "8px 14px", borderRadius: 20, border: `1px solid ${active ? cat.color : done ? cat.border : T.stroke}`, background: active ? cat.light : done ? cat.light + "88" : "transparent", color: active ? cat.color : done ? cat.color : T.muted, fontSize: 11, fontWeight: 500, cursor: "pointer", transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.03em" }}>
                    {cat.emoji} {cat.en}{done ? " ✓" : ""}
                  </button>
                );
              })}
            </div>

            <div style={{ background: current.light, border: `1px solid ${current.border}`, borderRadius: 16, padding: "20px", marginBottom: 18 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", color: current.color, marginBottom: 6, fontWeight: 500 }}>{current.en.toUpperCase()}</div>
              <div style={{ ...S.serif, fontSize: 22, fontWeight: 400, color: T.text, marginBottom: 6 }}>{current.label}</div>
              <div style={{ fontSize: 12, color: T.sub, fontWeight: 300 }}>{current.desc}</div>
              {current.note && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${current.border}`, fontSize: 11, color: T.sub, fontWeight: 300, lineHeight: 1.7 }}>
                  ⚠ {current.note}
                </div>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 14, marginBottom: 14 }}>
              {MARKS.map(m => <span key={m.symbol} style={{ fontSize: 11, color: m.color, fontWeight: 500 }}>{m.symbol} {m.label}</span>)}
            </div>

            {current.items.map((item, i) => {
              const key = `${current.id}-${i}`;
              const sel = answers[key];
              const selM = sel !== undefined ? MARKS[sel] : null;
              const brk = sectionBreaks[current.id]?.[i];
              return (
                <div key={i}>
                  {brk && (
                    <div style={{ margin: "22px 0 12px", display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ flex: 1, height: 1, background: T.stroke }} />
                      <span style={{ fontSize: 10, letterSpacing: "0.14em", color: T.muted, fontWeight: 500, whiteSpace: "nowrap" }}>{brk.toUpperCase()}</span>
                      <div style={{ flex: 1, height: 1, background: T.stroke }} />
                    </div>
                  )}
                  <div style={{ ...S.card, padding: "16px 18px", marginBottom: 10, background: selM ? selM.bg : T.card, border: `1px solid ${selM ? selM.border : T.stroke}` }}>
                    <div style={{ fontSize: 13, color: T.text, lineHeight: 1.7, marginBottom: 13, fontWeight: 300, display: "flex", alignItems: "flex-start", gap: 8 }}>
                      {item.reverse && <span style={{ flexShrink: 0, fontSize: 9, letterSpacing: "0.1em", color: T.rose, border: `1px solid ${T.rose}40`, borderRadius: 4, padding: "2px 5px", marginTop: 2 }}>역채점</span>}
                      {item.neutral && <span style={{ flexShrink: 0, fontSize: 9, letterSpacing: "0.1em", color: T.amber, border: `1px solid ${T.amber}40`, borderRadius: 4, padding: "2px 5px", marginTop: 2 }}>참고</span>}
                      {item.q}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {MARKS.map((m, mIdx) => (
                        <button key={mIdx} onClick={() => setMark(current.id, i, mIdx)} style={{ flex: 1, padding: "12px 0", borderRadius: 10, cursor: "pointer", border: `1.5px solid ${sel === mIdx ? m.color : T.stroke}`, background: sel === mIdx ? m.bg : "transparent", color: sel === mIdx ? m.color : T.stroke, fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, transition: "all 0.18s", transform: sel === mIdx ? "scale(1.06)" : "scale(1)" }}>
                          {m.symbol}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              {currentIdx > 0 && (
                <button onClick={() => { setActiveCat(categories[currentIdx - 1].id); window.scrollTo(0, 0); }}
                  style={{ ...S.btn("transparent", T.muted), flex: 1, border: `1px solid ${T.stroke}` }}>
                  ← 이전
                </button>
              )}
              {currentIdx < categories.length - 1 ? (
                <button onClick={() => { setActiveCat(categories[currentIdx + 1].id); window.scrollTo(0, 0); }}
                  style={{ ...S.btn(current.color), flex: 2 }}>
                  다음 — {categories[currentIdx + 1].label} →
                </button>
              ) : (
                <button onClick={() => setActiveTab("result")}
                  style={{ ...S.btn(`linear-gradient(135deg,${T.sage},#7A9068)`), flex: 2 }}>
                  결과 분석 보기 →
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {activeTab === "result" && (
          <div style={{ paddingTop: 32 }}>
            <div style={{ ...S.card, padding: "32px 24px", marginBottom: 24, textAlign: "center", background: T.paper }}>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", color: T.muted, marginBottom: 16 }}>MY WELLNESS SCORE</div>
              <ArcMeter pct={totalScore} color={totalGrade.color} size={130} />
              <div style={{ marginTop: 16 }}>
                <div style={{ ...S.serif, fontSize: 11, letterSpacing: "0.2em", color: totalGrade.color, fontWeight: 400 }}>{totalGrade.label.toUpperCase()}</div>
                <div style={{ ...S.serif, fontSize: 26, fontWeight: 300, color: T.text, marginTop: 4 }}>{totalGrade.ko}</div>
                <div style={{ fontSize: 12, color: T.muted, marginTop: 6, fontWeight: 300 }}>전체 웰니스 종합 점수</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              {categories.map(cat => {
                const pct = catScore(cat);
                const g = getGrade(pct);
                return (
                  <div key={cat.id} style={{ ...S.card, padding: "20px 16px", textAlign: "center", background: cat.light, border: `1px solid ${cat.border}` }}>
                    <div style={{ fontSize: 20, marginBottom: 8 }}>{cat.emoji}</div>
                    <ArcMeter pct={pct} color={cat.color} size={80} />
                    <div style={{ fontSize: 10, letterSpacing: "0.12em", color: cat.color, marginTop: 10, fontWeight: 500 }}>{cat.en.toUpperCase()}</div>
                    <div style={{ ...S.serif, fontSize: 15, color: T.text, marginTop: 3 }}>{cat.label}</div>
                    <div style={{ fontSize: 11, color: g.color, marginTop: 4, fontWeight: 500 }}>{g.ko}</div>
                  </div>
                );
              })}
            </div>

            {depAlert >= 3 && (
              <div style={{ ...S.card, padding: "20px", marginBottom: 20, border: `1px solid ${T.rose}60`, background: T.roseL }}>
                <div style={{ fontSize: 10, letterSpacing: "0.15em", color: T.rose, marginBottom: 8, fontWeight: 500 }}>MENTAL HEALTH NOTICE</div>
                <p style={{ ...S.serif, margin: 0, fontSize: 15, color: T.text, lineHeight: 1.8, fontWeight: 400 }}>
                  정신건강 자가 점검에서 <strong>{depAlert}개</strong> 주의 신호가 감지되었습니다.<br />
                  정확한 판단을 위해 <strong>전문가 상담</strong>을 권장드립니다.
                </p>
              </div>
            )}

            <div style={{ ...S.card, padding: "22px 20px", marginBottom: 20, background: T.amberL, border: `1px solid ${T.amber}60` }}>
              <div style={{ fontSize: 10, letterSpacing: "0.15em", color: T.amber, marginBottom: 14, fontWeight: 500 }}>1-YEAR LIFE PLAN</div>
              {categories.find(c => c.id === "daily").items.filter(it => it.neutral).map((item, ni) => {
                const i = categories.find(c => c.id === "daily").items.indexOf(item);
                const mIdx = answers[`daily-${i}`];
                const mark = mIdx !== undefined ? MARKS[mIdx] : null;
                return (
                  <div key={ni} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: ni < 5 ? `1px solid ${T.amber}30` : "none" }}>
                    <span style={{ fontSize: 12, color: T.sub, flex: 1, paddingRight: 12, fontWeight: 300 }}>{item.q}</span>
                    <span style={{ ...S.serif, fontSize: 20, fontWeight: 400, color: mark ? mark.color : T.stroke, minWidth: 24, textAlign: "center" }}>
                      {mark ? mark.symbol : "—"}
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ ...S.card, padding: "22px 20px", marginBottom: 20 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.15em", color: T.muted, marginBottom: 16, fontWeight: 500 }}>IMPROVEMENT PRIORITY</div>
              {[...categories].sort((a, b) => catScore(a) - catScore(b)).map((cat, i) => {
                const pct = catScore(cat);
                const g = getGrade(pct);
                return (
                  <div key={cat.id} style={{ display: "flex", alignItems: "center", gap: 14, paddingBottom: 14, marginBottom: 14, borderBottom: i < 3 ? `1px solid ${T.stroke}` : "none" }}>
                    <div style={{ ...S.serif, fontSize: 22, fontWeight: 300, color: T.muted, width: 22, textAlign: "right", flexShrink: 0 }}>{i + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, color: cat.color, letterSpacing: "0.1em", fontWeight: 500 }}>{cat.en.toUpperCase()}</div>
                      <div style={{ ...S.serif, fontSize: 16, color: T.text, marginTop: 2 }}>{cat.label}</div>
                      <div style={{ height: 3, background: T.stroke, borderRadius: 3, marginTop: 8, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: cat.color, borderRadius: 3, transition: "width 0.7s ease" }} />
                      </div>
                    </div>
                    <div style={{ ...S.serif, fontSize: 20, fontWeight: 300, color: g.color, minWidth: 40, textAlign: "right" }}>{pct}</div>
                  </div>
                );
              })}
            </div>

            <button onClick={() => { setAnswers({}); setActiveTab("check"); setActiveCat("physical"); window.scrollTo(0, 0); }}
              style={{ ...S.btn("transparent", T.muted), width: "100%", border: `1px solid ${T.stroke}` }}>
              다시 체크하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
