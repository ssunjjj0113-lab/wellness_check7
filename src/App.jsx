import { useState } from "react";

/* ── Pastel Design tokens ── */
const T = {
  bg:       "#FAFAFA",
  mint:     "#90C0D8",  mintL: "#DFF0F8",  mintD: "#3A88A8",
  pink:     "#E8A0B0",  pinkL: "#FCEAF0",  pinkD: "#C05070",
  yellow:   "#D8D090",  yellowL: "#F5F2D8", yellowD: "#888040",
  lav:      "#E8C0C0",  lavL:  "#F8E8E8",  lavD:  "#A06060",
  text:     "#3A3A3A",
  sub:      "#707070",
  muted:    "#BBBBBB",
  stroke:   "#EBEBEB",
  card:     "#FFFFFF",
};

const MARKS = [
  { symbol: "○", label: "예",     score: 2, color: T.mintD,   bg: T.mintL,   border: T.mint },
  { symbol: "△", label: "보통",   score: 1, color: T.yellowD, bg: T.yellowL, border: T.yellow },
  { symbol: "✕", label: "아니오", score: 0, color: T.pink,    bg: T.pinkL,   border: T.pink },
];

const categories = [
  {
    id: "physical", emoji: "🌿", label: "신체적 웰니스", en: "Physical Wellness",
    color: T.mintD, light: T.mintL, border: T.mint, bg: T.mintL,
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
    color: T.lavD, light: T.lavL, border: T.lav, bg: T.lavL,
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
    color: T.yellowD, light: T.yellowL, border: T.yellow, bg: T.yellowL,
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
    color: T.pinkD, light: T.pinkL, border: T.pink, bg: T.pinkL,
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
  mental: { 5: "자가 점검 checklist ✦" },
  daily:  { 7: "1년 이내 계획 life plan ✦" },
  social: { 5: "직업·학업 career & study ✦" },
};

function getGrade(pct) {
  if (pct >= 80) return { label: "Very Good", ko: "매우 좋음 ✦", color: T.mintD };
  if (pct >= 60) return { label: "Good",      ko: "좋음 ✦",     color: T.lavD };
  if (pct >= 40) return { label: "Fair",       ko: "보통",        color: T.yellowD };
  if (pct >= 20) return { label: "Caution",    ko: "주의 필요",   color: T.pink };
  return             { label: "Attention",    ko: "집중 관리",   color: T.pinkD };
}

/* ── Wavy SVG decoration ── */
function WavyDeco({ color, flip = false }) {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" style={{ position:"absolute", [flip?"right":"left"]: 0, top: 0, opacity: 0.35 }}>
      <path d="M0,0 Q15,10 30,0 Q45,-10 60,0 L60,20 Q45,30 30,20 Q15,10 0,20 Z" fill={color}/>
    </svg>
  );
}

function ArcMeter({ pct, color, size = 100 }) {
  const cx = size/2, cy = size/2, r = size*0.36;
  const start = Math.PI*0.8, end = Math.PI*2.2;
  const range = end - start;
  const angle = start + (pct/100)*range;
  const x1 = cx+r*Math.cos(start), y1 = cy+r*Math.sin(start);
  const x2 = cx+r*Math.cos(end),   y2 = cy+r*Math.sin(end);
  const ax = cx+r*Math.cos(angle), ay = cy+r*Math.sin(angle);
  const la = pct > 55 ? 1 : 0;
  const trackD = `M ${x1} ${y1} A ${r} ${r} 0 1 1 ${x2} ${y2}`;
  const arcD   = pct < 1 ? "" : `M ${x1} ${y1} A ${r} ${r} 0 ${la} 1 ${ax} ${ay}`;
  return (
    <svg width={size} height={size} style={{ overflow:"visible" }}>
      <path d={trackD} fill="none" stroke="#E8E0F0" strokeWidth={size*0.07} strokeLinecap="round"/>
      {arcD && <path d={arcD} fill="none" stroke={color} strokeWidth={size*0.07} strokeLinecap="round" style={{ transition:"all 0.7s ease" }}/>}
      <text x={cx} y={cy+5} textAnchor="middle" fontSize={size*0.22} fontWeight="700" fill={color} fontFamily="'Nunito', sans-serif">{pct}</text>
    </svg>
  );
}

export default function App() {
  const [answers, setAnswers]   = useState({});
  const [activeTab, setActiveTab] = useState("intro");
  const [activeCat, setActiveCat] = useState("physical");

  const setMark = (catId, idx, mIdx) => {
    const key = `${catId}-${idx}`;
    setAnswers(prev => {
      if (prev[key] === mIdx) { const n={...prev}; delete n[key]; return n; }
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

  const totalScore = Math.round(categories.reduce((s,c) => s+catScore(c), 0) / categories.length);
  const totalGrade = getGrade(totalScore);
  const totalAnswered = categories.reduce((s,c) => s+c.items.filter((_,i) => answers[`${c.id}-${i}`] !== undefined).length, 0);
  const totalItems = categories.reduce((s,c) => s+c.items.length, 0);
  const pctDone = Math.round((totalAnswered/totalItems)*100);

  const current = categories.find(c => c.id === activeCat);
  const currentIdx = categories.findIndex(c => c.id === activeCat);

  const depAlert = categories.find(c=>c.id==="mental").items.filter((it,i) => {
    if (!it.reverse) return false;
    const m = answers[`mental-${i}`];
    return m !== undefined && MARKS[m].score <= 1;
  }).length;

  const hand = { fontFamily: "'Noto Sans KR', sans-serif" };
  const sans = { fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 400 };

  const Btn = ({ onClick, bg, color="#fff", children, style={} }) => (
    <button onClick={onClick} style={{ padding:"14px 20px", borderRadius:50, border:"none", background:bg, color, fontSize:14, fontWeight:700, cursor:"pointer", ...sans, ...style }}>
      {children}
    </button>
  );

  return (
    <div style={{ minHeight:"100vh", background:T.bg, color:T.text, ...sans, paddingBottom:72 }}>

      {/* ── Header ── */}
      <div style={{ background:`linear-gradient(160deg, ${T.mintL} 0%, ${T.lavL} 50%, ${T.pinkL} 100%)`, padding:"40px 24px 28px", textAlign:"center", position:"relative", overflow:"hidden", borderBottom:`2px solid ${T.stroke}` }}>
        <WavyDeco color={T.mint}/>
        <WavyDeco color={T.pink} flip={true}/>
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ ...hand, fontSize:13, letterSpacing:"0.1em", color:T.lavD, marginBottom:4 }}>✦ Better Hour ✦</div>
          <h1 style={{ ...hand, margin:0, fontSize:38, fontWeight:700, color:T.text, lineHeight:1.2, marginBottom:4 }}>
            <span style={{ ...(() => {
              const palette=[T.mintD,T.lavD,T.pinkD,T.yellowD,T.mintD,T.lavD,T.pinkD,T.yellowD,T.mintD,T.lavD,T.pinkD,T.yellowD,T.mintD,T.lavD,T.pinkD,T.yellowD,T.mintD,T.lavD,T.mintD];
              return {};
            })() }}>
              {[...'CHECKLIST'].map((ch,i)=>{
                const p=[T.mintD,T.lavD,T.pinkD,T.yellowD];
                return ch===' ' ? <span key={i}>&nbsp;</span> : <span key={i} style={{color:p[i%4]}}>{ch}</span>;
              })}
            </span>
          </h1>
          <p style={{ margin:"8px 0 0", color:T.sub, fontSize:13, fontWeight:400 }}>나를 이해하고, 나답게 살아가기 🌸</p>
          <div style={{ maxWidth:280, margin:"16px auto 0" }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:T.muted, marginBottom:5 }}>
              <span>진행률</span><span>{totalAnswered} / {totalItems}</span>
            </div>
            <div style={{ height:6, background:"rgba(255,255,255,0.5)", borderRadius:10, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${pctDone}%`, background:`linear-gradient(90deg,${T.mint},${T.lav},${T.pink})`, borderRadius:10, transition:"width 0.5s" }}/>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display:"flex", background:"#fff", borderBottom:`2px solid ${T.stroke}`, position:"sticky", top:0, zIndex:20 }}>
        {["intro","check","result"].map((tab,ti) => {
          const labels=["웰니스란?","체크리스트","분석 결과"];
          const tabColors=[T.mintD, T.lavD, T.pinkD];
          const active = activeTab===tab;
          return (
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{ flex:1, padding:"13px 0", border:"none", background:"transparent", cursor:"pointer", ...hand, fontSize:16, fontWeight:active?700:400, color:active?tabColors[ti]:T.muted, borderBottom:active?`3px solid ${tabColors[ti]}`:"3px solid transparent", transition:"all 0.2s" }}>
              {labels[ti]}
            </button>
          );
        })}
      </div>

      <div style={{ maxWidth:520, margin:"0 auto", padding:"0 16px" }}>

        {/* ════ INTRO ════ */}
        {activeTab==="intro" && (
          <div style={{ paddingTop:28 }}>
            {/* About card */}
            <div style={{ background:`linear-gradient(135deg,${T.mintL},${T.lavL})`, borderRadius:20, padding:"24px 22px", marginBottom:16, border:`2px solid ${T.mint}`, position:"relative", overflow:"hidden" }}>
              <div style={{ ...hand, fontSize:22, color:T.lavD, marginBottom:10 }}>wellness 란? ✦</div>
              <p style={{ margin:0, lineHeight:1.9, color:T.text, fontSize:13, fontWeight:400 }}>
                단순히 <strong style={{ color:T.mintD }}>병이 없는 상태</strong>를 넘어, 몸과 마음이 조화롭게 균형을 이루며{" "}
                <strong style={{ color:T.lavD }}>더 나은 하루를 능동적으로 설계</strong>하는 삶의 방식이에요 🌿
              </p>
            </div>

            {/* Mark guide */}
            <div style={{ background:"#fff", borderRadius:20, padding:"18px 20px", marginBottom:16, border:`2px solid ${T.stroke}` }}>
              <div style={{ ...hand, fontSize:18, color:T.text, marginBottom:12 }}>how to answer ✦</div>
              <div style={{ display:"flex", gap:10 }}>
                {MARKS.map(m=>(
                  <div key={m.symbol} style={{ flex:1, textAlign:"center", padding:"14px 8px", background:m.bg, border:`2px solid ${m.border}`, borderRadius:14 }}>
                    <div style={{ fontSize:28, color:m.color, lineHeight:1 }}>{m.symbol}</div>
                    <div style={{ fontSize:11, color:m.color, marginTop:6, fontWeight:700 }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category cards */}
            {categories.map(cat=>(
              <div key={cat.id} style={{ background:cat.light, border:`2px solid ${cat.border}`, borderRadius:18, padding:"14px 18px", marginBottom:10, display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ fontSize:26 }}>{cat.emoji}</div>
                <div style={{ flex:1 }}>
                  <div style={{ ...hand, fontSize:18, color:cat.color, marginBottom:2 }}>{cat.label}</div>
                  <div style={{ fontSize:12, color:T.sub }}>{cat.desc}</div>
                  <div style={{ fontSize:11, color:T.muted, marginTop:2 }}>{cat.items.length}개 항목</div>
                </div>
                <div style={{ width:8, height:8, borderRadius:"50%", background:cat.color }}/>
              </div>
            ))}

            <Btn onClick={()=>setActiveTab("check")} bg={`linear-gradient(135deg,${T.mint},${T.lav})`} style={{ width:"100%", marginTop:8 }}>
              체크리스트 시작하기 ✦
            </Btn>
          </div>
        )}

        {/* ════ CHECK ════ */}
        {activeTab==="check" && (
          <div style={{ paddingTop:20 }}>
            {/* Category pills */}
            <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4, marginBottom:16 }}>
              {categories.map(cat=>{
                const done = cat.items.every((_,i)=>answers[`${cat.id}-${i}`]!==undefined);
                const active = activeCat===cat.id;
                return (
                  <button key={cat.id} onClick={()=>setActiveCat(cat.id)} style={{ flexShrink:0, padding:"8px 16px", borderRadius:50, border:`2px solid ${active?cat.color:T.stroke}`, background:active?cat.light:"#fff", color:active?cat.color:T.muted, ...hand, fontSize:12, cursor:"pointer", transition:"all 0.2s" }}>
                    {cat.emoji} {cat.label}{done?" ✓":""}
                  </button>
                );
              })}
            </div>

            {/* Cat header */}
            <div style={{ background:current.light, border:`2px solid ${current.border}`, borderRadius:20, padding:"18px 20px", marginBottom:16, position:"relative", overflow:"hidden" }}>
              <WavyDeco color={current.color}/>
              <div style={{ position:"relative", zIndex:1 }}>
                <div style={{ ...hand, fontSize:24, color:current.color, marginBottom:4 }}>{current.emoji} {current.label}</div>
                <div style={{ fontSize:12, color:T.pinkD, fontWeight:500 }}>{current.desc}</div>
                {current.note && (
                  <div style={{ marginTop:10, padding:"8px 12px", background:"rgba(255,255,255,0.6)", borderRadius:10, fontSize:11, color:T.sub, lineHeight:1.7 }}>
                    ⚠ {current.note}
                  </div>
                )}
              </div>
            </div>

            {/* Legend */}
            <div style={{ display:"flex", justifyContent:"flex-end", gap:14, marginBottom:12 }}>
              {MARKS.map(m=><span key={m.symbol} style={{ fontSize:12, color:m.color, fontWeight:700 }}>{m.symbol} {m.label}</span>)}
            </div>

            {/* Items */}
            {current.items.map((item,i)=>{
              const key=`${current.id}-${i}`;
              const sel=answers[key];
              const selM=sel!==undefined?MARKS[sel]:null;
              const brk=sectionBreaks[current.id]?.[i];
              return (
                <div key={i}>
                  {brk && (
                    <div style={{ margin:"20px 0 12px", display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ flex:1, height:2, background:T.stroke, borderRadius:2 }}/>
                      <span style={{ ...hand, fontSize:14, color:T.muted }}>{brk}</span>
                      <div style={{ flex:1, height:2, background:T.stroke, borderRadius:2 }}/>
                    </div>
                  )}
                  <div style={{ background:selM?selM.bg:"#fff", border:`2px solid ${selM?selM.border:T.stroke}`, borderRadius:16, padding:"14px 16px", marginBottom:10, transition:"all 0.15s" }}>
                    <div style={{ fontSize:13, color:T.text, lineHeight:1.75, marginBottom:12, fontWeight:400, display:"flex", alignItems:"flex-start", gap:8 }}>
                      {item.reverse && <span style={{ flexShrink:0, fontSize:9, color:T.pinkD, border:`1px solid ${T.pink}`, borderRadius:6, padding:"2px 6px", marginTop:3, fontWeight:700 }}>역채점</span>}
                      {item.neutral && <span style={{ flexShrink:0, fontSize:9, color:T.lavD, border:`1px solid ${T.lav}`, borderRadius:6, padding:"2px 6px", marginTop:3, fontWeight:700 }}>참고</span>}
                      {item.q}
                    </div>
                    <div style={{ display:"flex", gap:8 }}>
                      {MARKS.map((m,mIdx)=>(
                        <button key={mIdx} onClick={()=>setMark(current.id,i,mIdx)} style={{ flex:1, padding:"11px 0", borderRadius:12, cursor:"pointer", border:`2px solid ${sel===mIdx?m.color:T.stroke}`, background:sel===mIdx?m.bg:"#fff", color:sel===mIdx?m.color:T.muted, fontSize:22, fontWeight:700, transition:"all 0.15s", transform:sel===mIdx?"scale(1.07)":"scale(1)" }}>
                          {m.symbol}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Nav */}
            <div style={{ display:"flex", gap:10, marginTop:10 }}>
              {currentIdx>0 && (
                <Btn onClick={()=>{setActiveCat(categories[currentIdx-1].id);window.scrollTo(0,0);}} bg="#fff" color={T.muted} style={{ flex:1, border:`2px solid ${T.stroke}` }}>← 이전</Btn>
              )}
              {currentIdx<categories.length-1 ? (
                <Btn onClick={()=>{setActiveCat(categories[currentIdx+1].id);window.scrollTo(0,0);}} bg={current.color} style={{ flex:2 }}>
                  다음 — {categories[currentIdx+1].label} →
                </Btn>
              ) : (
                <Btn onClick={()=>setActiveTab("result")} bg={`linear-gradient(135deg,${T.mint},${T.pink})`} style={{ flex:2 }}>
                  결과 보기 ✦
                </Btn>
              )}
            </div>
          </div>
        )}

        {/* ════ RESULT ════ */}
        {activeTab==="result" && (
          <div style={{ paddingTop:28 }}>
            {/* Total */}
            <div style={{ background:`linear-gradient(135deg,${T.mintL},${T.lavL},${T.pinkL})`, borderRadius:24, padding:"30px 24px", marginBottom:20, textAlign:"center", border:`2px solid ${T.stroke}`, position:"relative", overflow:"hidden" }}>
              <WavyDeco color={T.mint}/>
              <WavyDeco color={T.pink} flip={true}/>
              <div style={{ position:"relative", zIndex:1 }}>
                <div style={{ ...hand, fontSize:18, color:T.lavD, marginBottom:14 }}>my wellness score ✦</div>
                <ArcMeter pct={totalScore} color={totalGrade.color} size={130}/>
                <div style={{ ...hand, fontSize:28, color:totalGrade.color, marginTop:10 }}>{totalGrade.ko}</div>
                <div style={{ fontSize:12, color:T.sub, marginTop:4 }}>전체 웰니스 종합 점수</div>
              </div>
            </div>

            {/* 4 grid */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
              {categories.map(cat=>{
                const pct=catScore(cat); const g=getGrade(pct);
                return (
                  <div key={cat.id} style={{ background:cat.light, border:`2px solid ${cat.border}`, borderRadius:20, padding:"18px 14px", textAlign:"center" }}>
                    <div style={{ fontSize:22, marginBottom:6 }}>{cat.emoji}</div>
                    <ArcMeter pct={pct} color={cat.color} size={80}/>
                    <div style={{ ...hand, fontSize:16, color:cat.color, marginTop:8 }}>{cat.label}</div>
                    <div style={{ fontSize:11, color:g.color, marginTop:3, fontWeight:700 }}>{g.ko}</div>
                  </div>
                );
              })}
            </div>

            {/* Depression alert */}
            {depAlert>=3 && (
              <div style={{ background:T.pinkL, border:`2px solid ${T.pink}`, borderRadius:16, padding:"16px 18px", marginBottom:16 }}>
                <div style={{ ...hand, fontSize:17, color:T.pinkD, marginBottom:8 }}>mental health notice ⚠</div>
                <p style={{ margin:0, fontSize:13, color:T.text, lineHeight:1.8 }}>
                  정신건강 자가 점검에서 <strong style={{color:T.pinkD}}>{depAlert}개</strong> 주의 신호가 감지되었어요. 전문가 상담을 권장드립니다 🕊️
                </p>
              </div>
            )}

            {/* Life plan */}
            <div style={{ background:T.yellowL, border:`2px solid ${T.yellow}`, borderRadius:16, padding:"18px", marginBottom:16 }}>
              <div style={{ ...hand, fontSize:18, color:T.yellowD, marginBottom:12 }}>1-year life plan ✦</div>
              {categories.find(c=>c.id==="daily").items.filter(it=>it.neutral).map((item,ni)=>{
                const i=categories.find(c=>c.id==="daily").items.indexOf(item);
                const mIdx=answers[`daily-${i}`];
                const mark=mIdx!==undefined?MARKS[mIdx]:null;
                return (
                  <div key={ni} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:ni<5?`1px dashed ${T.yellow}`:""  }}>
                    <span style={{ fontSize:12, color:T.text, flex:1, paddingRight:12 }}>{item.q}</span>
                    <span style={{ fontSize:20, fontWeight:700, color:mark?mark.color:T.muted, minWidth:24, textAlign:"center" }}>{mark?mark.symbol:"—"}</span>
                  </div>
                );
              })}
            </div>

            {/* Priority */}
            <div style={{ background:"#fff", border:`2px solid ${T.stroke}`, borderRadius:16, padding:"18px", marginBottom:16 }}>
              <div style={{ ...hand, fontSize:18, color:T.lavD, marginBottom:14 }}>improvement priority ✦</div>
              {[...categories].sort((a,b)=>catScore(a)-catScore(b)).map((cat,i)=>{
                const pct=catScore(cat); const g=getGrade(pct);
                return (
                  <div key={cat.id} style={{ display:"flex", alignItems:"center", gap:12, paddingBottom:12, marginBottom:12, borderBottom:i<3?`1px dashed ${T.stroke}`:"" }}>
                    <div style={{ width:28, height:28, borderRadius:"50%", background:cat.light, border:`2px solid ${cat.border}`, display:"flex", alignItems:"center", justifyContent:"center", ...hand, fontSize:16, color:cat.color, flexShrink:0 }}>{i+1}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ ...hand, fontSize:16, color:cat.color }}>{cat.emoji} {cat.label}</div>
                      <div style={{ height:5, background:T.stroke, borderRadius:5, marginTop:6, overflow:"hidden" }}>
                        <div style={{ height:"100%", width:`${pct}%`, background:cat.color, borderRadius:5, transition:"width 0.7s" }}/>
                      </div>
                    </div>
                    <div style={{ ...hand, fontSize:20, color:g.color, minWidth:36, textAlign:"right" }}>{pct}</div>
                  </div>
                );
              })}
            </div>

            <Btn onClick={()=>{setAnswers({});setActiveTab("check");setActiveCat("physical");window.scrollTo(0,0);}} bg="#fff" color={T.muted} style={{ width:"100%", border:`2px solid ${T.stroke}` }}>
              🔄 다시 체크하기
            </Btn>
          </div>
        )}
      </div>
    </div>
  );
}
