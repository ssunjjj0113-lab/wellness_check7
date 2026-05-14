import { useState } from "react";

/* ── Google Fonts injected in index.html ── */

const T = {
  bg:      "#F5F0EB",
  card:    "#FFFFFF",
  rose:    "#E8A090",  roseL:  "#FAF0EC",  roseD:  "#B85040",
  blue:    "#A0C0D8",  blueL:  "#EAF2F8",  blueD:  "#4078A0",
  sage:    "#A8C8A0",  sageL:  "#EAF4E8",  sageD:  "#508848",
  yellow:  "#C8B870",  yellowL:"#F5EFD8",  yellowD:"#907830",
  text:    "#3A3535",
  sub:     "#888080",
  muted:   "#BBBBBB",
  stroke:  "#E8E0D8",
};

const MARKS = [
  { symbol:"○", label:"예",     score:2, color:T.sageD,  bg:T.sageL,   border:T.sage   },
  { symbol:"△", label:"보통",   score:1, color:T.yellowD,bg:T.yellowL, border:T.yellow },
  { symbol:"✕", label:"아니오", score:0, color:T.roseD,  bg:T.roseL,   border:T.rose   },
];

const categories = [
  { id:"physical", num:"01", emoji:"🌿", label:"신체적 웰니스", tag:"바디솔루션",
    en:"Physical", color:T.roseD, light:T.roseL, border:T.rose, accent:T.rose,
    desc:"몸의 건강을 능동적으로 관리하는 것",
    items:[
      {q:"하루 30분 이상 신체 활동(운동, 걷기 등)을 한다"},
      {q:"하루 7~8시간 수면을 취한다"},
      {q:"균형 잡힌 식사를 하루 3끼 한다"},
      {q:"물을 하루 1.5L 이상 마신다"},
      {q:"정기적인 건강검진을 받는다"},
      {q:"음주·흡연을 하지 않거나 절제하고 있다"},
      {q:"몸의 이상 신호(통증, 피로 등)를 무시하지 않고 대응한다"},
      {q:"하루 중 스트레칭이나 가벼운 움직임을 의식적으로 한다"},
    ],
  },
  { id:"mental", num:"02", emoji:"🕊️", label:"정신건강", tag:"마인드솔루션",
    en:"Mental", color:T.blueD, light:T.blueL, border:T.blue, accent:T.blue,
    desc:"감정·심리적 균형과 정신건강 전반을 점검하는 것",
    note:"역채점 항목은 전문가 진단이 아닙니다. 이상 신호가 다수일 경우 전문의 상담을 권장합니다.",
    items:[
      {q:"스트레스를 인식하고 건강하게 해소할 수 있다"},
      {q:"명상 또는 마음챙김을 실천한다"},
      {q:"부정적인 감정을 건강하게 표현할 수 있다"},
      {q:"취미나 즐거운 활동에 시간을 쓴다"},
      {q:"자기 자신에게 친절하다 (자기 비판을 줄인다)"},
      {q:"최근 2주간 대부분의 시간 기분이 가라앉거나 우울했다", reverse:true},
      {q:"최근 2주간 일상 활동에 대한 흥미나 즐거움이 줄었다", reverse:true},
      {q:"이유 없이 피로하거나 에너지가 부족하다고 느꼈다", reverse:true},
      {q:"수면에 문제가 있다 (너무 많이 자거나, 잘 못 잔다)", reverse:true},
      {q:"집중력이 떨어지거나 결정을 내리기 어렵다고 느꼈다", reverse:true},
      {q:"자신이 쓸모없다는 느낌이나 과도한 죄책감을 느꼈다", reverse:true},
      {q:"죽고 싶다거나 스스로를 해치고 싶다는 생각이 든 적 있다", reverse:true},
      {q:"평소보다 불안하거나 초조한 감정이 자주 든다", reverse:true},
      {q:"타인에게 피해를 준다는 생각이 자주 든다", reverse:true},
      {q:"현재 정신건강 전문가에게 상담·치료 중이다", neutral:true},
    ],
  },
  { id:"daily", num:"03", emoji:"☀️", label:"일상 계획", tag:"루틴솔루션",
    en:"Routine", color:T.sageD, light:T.sageL, border:T.sage, accent:T.sage,
    desc:"주간 루틴과 1년 이내 주요 생활 변화 계획 파악",
    note:"생활 계획 항목은 계획이 있으면 ○, 가능성 있으면 △, 없으면 ✕로 표시해 주세요.",
    items:[
      {q:"일반적으로 규칙적인 기상·취침 시간을 유지한다"},
      {q:"일반적으로 낮 시간 대부분을 생산적인 활동(학업·업무·운동 등)에 쓴다"},
      {q:"일반적으로 세끼 식사를 거르지 않고 규칙적으로 먹는다"},
      {q:"일반적으로 스마트폰·SNS 사용을 하루 3시간 이내로 조절한다"},
      {q:"일반적으로 나만의 여가·휴식 시간이 있다"},
      {q:"일반적으로 가족·친구·동거인과 긍정적인 교류가 있다"},
      {q:"일반적으로 하루 중 의미 있는 대화를 한 명 이상과 나눈다"},
      {q:"1년 이내 군 입대 계획이 있다", neutral:true},
      {q:"1년 이내 해외 유학 또는 어학연수 계획이 있다", neutral:true},
      {q:"1년 이내 이사 또는 독립 계획이 있다", neutral:true},
      {q:"1년 이내 취업 또는 이직 계획이 있다", neutral:true},
      {q:"1년 이내 결혼 또는 동거 계획이 있다", neutral:true},
      {q:"1년 이내 학업(입학·졸업 등) 관련 주요 변화가 있다", neutral:true},
    ],
  },
  { id:"social", num:"04", emoji:"🌸", label:"사회적 웰니스", tag:"커넥션솔루션",
    en:"Connection", color:T.yellowD, light:T.yellowL, border:T.yellow, accent:T.yellow,
    desc:"건강한 인간관계, 소속감, 일·학업의 의미를 통합적으로 점검",
    items:[
      {q:"힘들 때 솔직하게 털어놓을 수 있는 사람이 1명 이상 있다"},
      {q:"최근 한 달 내 친구 또는 가족과 의미 있는 시간을 보낸 적이 있다"},
      {q:"SNS가 아닌 직접 대화(전화·만남)로 소통하는 사람이 있다"},
      {q:"누군가에게 부탁하거나 도움을 요청하는 것이 어렵지 않다"},
      {q:"관계에서 불편할 때 'No'라고 말할 수 있다"},
      {q:"나를 있는 그대로 받아들여 주는 사람이 주변에 있다"},
      {q:"내 일(또는 학업)이 단순한 의무가 아닌 의미 있는 활동으로 느껴진다"},
      {q:"일·학업으로 인해 개인 시간이나 건강을 심각하게 희생하지 않는다"},
      {q:"나의 장점이나 강점이 현재 하는 일에 반영되고 있다"},
      {q:"6개월 전보다 지금 더 성장했다고 느낀다"},
      {q:"갈등이 생겼을 때 회피하지 않고 대화로 해결하려는 편이다"},
      {q:"가까운 관계에서 감사함이나 애정을 표현하는 편이다"},
      {q:"나의 감정 상태를 상대방에게 솔직하게 표현할 수 있다"},
      {q:"일방적으로 희생하거나 착취당하는 관계가 현재 없다"},
    ],
  },
];

const sectionBreaks = {
  mental:{ 5:"자가 점검 Checklist" },
  daily: { 7:"1년 이내 계획 Life Plan" },
  social:{ 5:"직업·학업 Career & Study" },
};

function getGrade(pct) {
  if (pct>=80) return {label:"Excellent", ko:"매우 좋음", color:T.sageD};
  if (pct>=60) return {label:"Good",      ko:"좋음",     color:T.blueD};
  if (pct>=40) return {label:"Fair",      ko:"보통",     color:T.yellowD};
  if (pct>=20) return {label:"Caution",   ko:"주의 필요", color:"#B07030"};
  return             {label:"Attention", ko:"집중 관리", color:T.roseD};
}

function ArcMeter({ pct, color, size=100 }) {
  const cx=size/2, cy=size/2, r=size*0.36;
  const s=Math.PI*0.8, e=Math.PI*2.2;
  const a=s+(pct/100)*(e-s);
  const x1=cx+r*Math.cos(s), y1=cy+r*Math.sin(s);
  const x2=cx+r*Math.cos(e), y2=cy+r*Math.sin(e);
  const ax=cx+r*Math.cos(a), ay=cy+r*Math.sin(a);
  const la=pct>55?1:0;
  return (
    <svg width={size} height={size} style={{overflow:"visible"}}>
      <path d={`M ${x1} ${y1} A ${r} ${r} 0 1 1 ${x2} ${y2}`} fill="none" stroke={T.stroke} strokeWidth={size*0.065} strokeLinecap="round"/>
      {pct>0&&<path d={`M ${x1} ${y1} A ${r} ${r} 0 ${la} 1 ${ax} ${ay}`} fill="none" stroke={color} strokeWidth={size*0.065} strokeLinecap="round" style={{transition:"all 0.7s ease"}}/>}
      <text x={cx} y={cy+5} textAnchor="middle" fontSize={size*0.2} fontWeight="600" fill={T.text} fontFamily="'Cormorant Garamond',serif">{pct}</text>
    </svg>
  );
}

export default function App() {
  const [answers, setAnswers] = useState({});
  const [activeTab, setActiveTab] = useState("intro");
  const [activeCat, setActiveCat] = useState("physical");
  const [aiResult, setAiResult] = useState(null);

  const setMark = (catId, idx, mIdx) => {
    const key=`${catId}-${idx}`;
    setAnswers(prev=>{
      if(prev[key]===mIdx){const n={...prev};delete n[key];return n;}
      return {...prev,[key]:mIdx};
    });
  };

  const catScore = (cat) => {
    const sc=cat.items.filter(it=>!it.neutral);
    const an=sc.filter(it=>answers[`${cat.id}-${cat.items.indexOf(it)}`]!==undefined);
    if(!an.length) return 0;
    const e=sc.reduce((s,it)=>{
      const m=answers[`${cat.id}-${cat.items.indexOf(it)}`];
      if(m===undefined) return s;
      return s+(it.reverse?2-MARKS[m].score:MARKS[m].score);
    },0);
    return Math.round((e/(an.length*2))*100);
  };

  const totalScore=Math.round(categories.reduce((s,c)=>s+catScore(c),0)/categories.length);
  const totalGrade=getGrade(totalScore);
  const totalAnswered=categories.reduce((s,c)=>s+c.items.filter((_,i)=>answers[`${c.id}-${i}`]!==undefined).length,0);
  const totalItems=categories.reduce((s,c)=>s+c.items.length,0);
  const pctDone=Math.round((totalAnswered/totalItems)*100);

  const current=categories.find(c=>c.id===activeCat);
  const currentIdx=categories.findIndex(c=>c.id===activeCat);

  const depAlert=categories.find(c=>c.id==="mental").items.filter((it,i)=>{
    if(!it.reverse) return false;
    const m=answers[`mental-${i}`];
    return m!==undefined&&MARKS[m].score===2; // ○(예) 선택 = 증상 있음
  }).length;

  const generateAnalysis = () => {
    const scores = categories.map(c => ({ id:c.id, label:c.label, en:c.en, score:catScore(c), grade:getGrade(catScore(c)).ko }));
    const sorted = [...scores].sort((a,b) => a.score - b.score);
    const lowest = sorted[0];
    const highest = sorted[sorted.length-1];
    const avg = Math.round(scores.reduce((s,c)=>s+c.score,0)/scores.length);

    const summaries = {
      high:   "전반적으로 웰니스 균형이 잘 잡혀 있어요. 꾸준히 유지해온 노력이 점수에 고스란히 드러나네요. 지금처럼 나를 잘 돌보는 습관을 이어가 보세요 🌿",
      mid:    "전체적으로 나쁘지 않지만, 좀 더 신경 써야 할 영역이 보여요. 작은 변화부터 시작하면 충분히 더 좋아질 수 있어요. 오늘의 나를 점검했다는 것 자체가 이미 대단한 시작이에요 ✦",
      low:    "지금 많이 지쳐있거나 균형이 무너진 구간일 수 있어요. 완벽하지 않아도 괜찮아요. 가장 힘든 영역 하나만 먼저 챙겨보는 것으로 시작해보세요 🕊️",
    };

    const adviceMap = {
      physical: "하루 10분 걷기나 스트레칭부터 시작해보세요. 작은 움직임이 몸 전체의 리듬을 바꿔줘요. 수면 시간도 조금씩 일정하게 맞춰보는 것이 큰 도움이 돼요.",
      mental:   "하루 5분, 조용히 자신의 감정을 들여다보는 시간을 가져보세요. 일기 쓰기나 짧은 명상이 감정 정리에 큰 도움이 될 수 있어요. 너무 스스로를 몰아붙이지 않아도 돼요.",
      daily:    "아침 루틴 하나만 정해보세요. 일어나서 물 한 잔, 5분 스트레칭처럼 아주 작은 것부터요. 루틴이 쌓이면 하루 전체가 훨씬 안정적으로 느껴질 거예요.",
      social:   "가까운 사람에게 짧은 메시지 하나 먼저 보내보세요. 관계는 거창한 것보다 작고 꾸준한 연결로 단단해져요. 나를 표현하는 연습도 천천히 해보세요.",
    };

    const quotes = [
      { text:""당신 자신을 사랑하는 것은 평생의 로맨스의 시작이다."", by:"— Oscar Wilde" },
      { text:""건강은 모든 것이 아니지만, 건강 없이는 모든 것이 아무것도 아니다."", by:"— Arthur Schopenhauer" },
      { text:""작은 것에 충실한 사람이 큰 것에도 충실하다."", by:"— 성경, 누가복음 16:10" },
      { text:""오늘 할 수 있는 일을 내일로 미루지 말라. 단, 오늘 쉬어야 한다면 내일로 미뤄도 된다."", by:"— Unknown" },
      { text:""나를 돌보는 것은 이기적인 게 아니다. 비어있는 컵으로는 누구도 채울 수 없다."", by:"— Unknown" },
      { text:""성장은 편안함 밖에서 일어난다."", by:"— Roy T. Bennett" },
    ];

    const messages = [
      "오늘 이 체크리스트를 완성한 것만으로도, 당신은 이미 자신을 사랑하고 있어요 ✦",
      "완벽하지 않아도 괜찮아요. 지금 이 순간의 나도 충분히 가치 있어요 ✦",
      "작은 변화가 쌓여 큰 흐름이 돼요. 오늘의 당신을 응원해요 ✦",
      "나를 돌보는 시간을 낸 당신, 정말 잘하고 있어요 ✦",
    ];

    const summary = avg >= 70 ? summaries.high : avg >= 45 ? summaries.mid : summaries.low;
    const advice = adviceMap[lowest.id] || adviceMap.mental;
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const message = messages[Math.floor(Math.random() * messages.length)];

    setAiResult({ summary, advice, quote: `${quote.text} ${quote.by}`, message, lowestLabel: lowest.label, highestLabel: highest.label });
  };

  const serif={fontFamily:"'Cormorant Garamond',serif"};
  const sans={fontFamily:"'Noto Sans KR',sans-serif"};

  return (
    <div style={{minHeight:"100vh",background:T.bg,color:T.text,...sans,paddingBottom:72}}>

      {/* ── HEADER ── */}
      <div style={{textAlign:"center",padding:"48px 24px 32px",borderBottom:`1px solid ${T.stroke}`}}>
        {/* dot nav */}
        <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:16}}>
          {categories.map(c=>(
            <div key={c.id} style={{width:10,height:10,borderRadius:"50%",background:c.accent,opacity:activeCat===c.id?1:0.35,transition:"opacity 0.3s",cursor:"pointer"}} onClick={()=>{setActiveTab("check");setActiveCat(c.id);}}/>
          ))}
        </div>
        <div style={{fontSize:10,letterSpacing:"0.25em",color:T.muted,fontWeight:500,marginBottom:14,...sans}}>BETTER ME, BETTER YOU</div>
        <h1 style={{...serif,fontSize:44,fontWeight:300,color:T.text,margin:"0 0 8px",lineHeight:1.1,letterSpacing:"0.04em"}}>
          CHECKLIST
        </h1>
        <p style={{fontSize:12,color:T.sub,margin:0,fontWeight:300}}>나를 이해하고, 나답게 살아가기</p>
        {/* progress */}
        <div style={{maxWidth:280,margin:"20px auto 0"}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:T.muted,marginBottom:6}}>
            <span style={{letterSpacing:"0.05em"}}>진행률</span>
            <span>{totalAnswered} / {totalItems}</span>
          </div>
          <div style={{height:2,background:T.stroke,borderRadius:2,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${pctDone}%`,background:`linear-gradient(90deg,${T.rose},${T.blue},${T.sage},${T.yellow})`,borderRadius:2,transition:"width 0.5s"}}/>
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{display:"flex",background:T.bg,borderBottom:`1px solid ${T.stroke}`,position:"sticky",top:0,zIndex:10}}>
        {["intro","check","result"].map((t,ti)=>{
          const labels=["소개","체크리스트","결과"];
          const ac=activeTab===t;
          return (
            <button key={t} onClick={()=>{ setActiveTab(t); if(t==="result") generateAnalysis(); }} style={{flex:1,padding:"14px 0",border:"none",background:"transparent",cursor:"pointer",fontSize:11,fontWeight:ac?600:400,color:ac?T.text:T.muted,borderBottom:`1.5px solid ${ac?T.text:"transparent"}`,letterSpacing:"0.08em",...sans,transition:"all 0.2s"}}>
              {labels[ti].toUpperCase()}
            </button>
          );
        })}
      </div>

      <div style={{maxWidth:540,margin:"0 auto",padding:"0 20px"}}>

        {/* ═══ INTRO ═══ */}
        {activeTab==="intro" && (
          <div style={{paddingTop:36}}>
            {/* About Wellness — 따뜻한 인트로 */}
            <div style={{marginBottom:28}}>
              <div style={{fontSize:10,letterSpacing:"0.2em",color:T.muted,fontWeight:500,marginBottom:14,...sans}}>ABOUT WELLNESS</div>
              <p style={{fontSize:13,color:T.sub,lineHeight:1.9,fontWeight:300,...sans,margin:0}}>
                웰니스는 단순히 <strong style={{color:T.text,fontWeight:500}}>병이 없는 상태</strong>를 넘어,
                몸과 마음이 조화롭게 균형을 이루며{" "}
                <strong style={{color:T.text,fontWeight:500}}>더 나은 하루를 능동적으로 설계</strong>하는 삶의 방식이에요.
              </p>
            </div>

            {/* 4영역 설명 — 카드 아닌 리스트 스트립 */}
            <div style={{background:T.card,borderRadius:14,padding:"4px 20px",marginBottom:24,border:`1px solid ${T.stroke}`}}>
              {categories.map((cat,i)=>(
                <div key={cat.id} style={{display:"flex",alignItems:"center",gap:14,padding:"16px 0",borderBottom:i<categories.length-1?`1px solid ${T.stroke}`:""}}>
                  <div style={{width:30,height:30,borderRadius:"50%",background:cat.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:cat.color,flexShrink:0,...sans}}>
                    {cat.num}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{...serif,fontSize:18,fontWeight:400,color:cat.color,fontStyle:"italic",lineHeight:1,marginBottom:3}}>{cat.en}</div>
                    <div style={{fontSize:12,fontWeight:600,color:T.text,...sans,marginBottom:2}}>{cat.label}</div>
                    <div style={{fontSize:10,color:T.sub,fontWeight:300,...sans,lineHeight:1.5}}>{cat.desc}</div>
                  </div>
                  <div style={{fontSize:10,color:T.muted,letterSpacing:"0.06em",fontWeight:500,...sans,whiteSpace:"nowrap"}}>{cat.items.length}개</div>
                </div>
              ))}
            </div>

            {/* HOW TO */}
            <div style={{background:T.card,borderRadius:14,padding:"20px",marginBottom:24,border:`1px solid ${T.stroke}`}}>
              <div style={{fontSize:10,letterSpacing:"0.18em",color:T.muted,fontWeight:500,marginBottom:14,...sans}}>HOW TO ANSWER</div>
              <div style={{display:"flex",gap:10}}>
                {MARKS.map(m=>(
                  <div key={m.symbol} style={{flex:1,textAlign:"center",padding:"14px 8px",background:m.bg,border:`1px solid ${m.border}`,borderRadius:10}}>
                    <div style={{...serif,fontSize:24,color:m.color,fontWeight:400,lineHeight:1}}>{m.symbol}</div>
                    <div style={{fontSize:10,color:m.color,marginTop:5,fontWeight:600,letterSpacing:"0.05em",...sans}}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={()=>setActiveTab("check")} style={{
              width:"100%",padding:"15px",background:T.text,color:"#fff",
              border:"none",borderRadius:10,fontSize:12,fontWeight:500,
              cursor:"pointer",letterSpacing:"0.1em",...sans,
            }}>
              CHECK LIST START
            </button>
          </div>
        )}

        {/* ═══ CHECK ═══ */}
        {activeTab==="check" && (
          <div style={{paddingTop:28}}>
            {/* cat selector */}
            <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:22,paddingBottom:2}}>
              {categories.map(cat=>{
                const done=cat.items.every((_,i)=>answers[`${cat.id}-${i}`]!==undefined);
                const ac=activeCat===cat.id;
                return (
                  <button key={cat.id} onClick={()=>setActiveCat(cat.id)} style={{
                    flexShrink:0,padding:"7px 14px",borderRadius:20,
                    border:`1px solid ${ac?cat.accent:T.stroke}`,
                    background:ac?cat.light:T.card,
                    color:ac?cat.color:done?cat.color:T.muted,
                    fontSize:11,fontWeight:600,cursor:"pointer",...sans,transition:"all 0.2s",
                  }}>
                    {cat.num}. {cat.en}{done?" ✓":""}
                  </button>
                );
              })}
            </div>

            {/* section header */}
            <div style={{marginBottom:22,paddingBottom:18,borderBottom:`1px solid ${T.stroke}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <div style={{fontSize:9,letterSpacing:"0.18em",color:T.muted,fontWeight:500,marginBottom:6,...sans}}>{current.tag.toUpperCase()}</div>
                  <div style={{...serif,fontSize:32,fontWeight:400,color:current.color,fontStyle:"italic",lineHeight:1,marginBottom:6}}>{current.en}</div>
                  <div style={{fontSize:14,fontWeight:600,color:T.text,...sans,marginBottom:4}}>{current.label}</div>
                  <div style={{fontSize:11,color:T.sub,fontWeight:300,...sans}}>{current.desc}</div>
                </div>
                <div style={{width:32,height:32,borderRadius:"50%",background:current.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:current.color,flexShrink:0,...sans}}>{current.num}</div>
              </div>
              {current.note&&(
                <div style={{marginTop:12,padding:"9px 12px",background:current.light,borderRadius:8,fontSize:11,color:T.sub,lineHeight:1.7,borderLeft:`2px solid ${current.accent}`}}>
                  ⚠ {current.note}
                </div>
              )}
            </div>

            {/* legend */}
            <div style={{display:"flex",justifyContent:"flex-end",gap:14,marginBottom:14}}>
              {MARKS.map(m=><span key={m.symbol} style={{fontSize:11,color:m.color,fontWeight:500,...sans}}>{m.symbol} {m.label}</span>)}
            </div>

            {/* items */}
            {current.items.map((item,i)=>{
              const k=`${current.id}-${i}`,sel=answers[k],selM=sel!==undefined?MARKS[sel]:null;
              const brk=sectionBreaks[current.id]?.[i];
              return (
                <div key={i}>
                  {brk&&(
                    <div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 14px"}}>
                      <div style={{flex:1,height:1,background:T.stroke}}/>
                      <span style={{fontSize:9,fontWeight:600,color:T.muted,letterSpacing:"0.12em",...sans}}>{brk.toUpperCase()}</span>
                      <div style={{flex:1,height:1,background:T.stroke}}/>
                    </div>
                  )}
                  <div style={{
                    background:selM?selM.bg:T.card,
                    border:`1px solid ${selM?selM.border:T.stroke}`,
                    borderRadius:12,padding:"14px 16px",marginBottom:8,
                    transition:"all 0.15s",
                    boxShadow:selM?"0 2px 12px rgba(0,0,0,0.05)":"none",
                  }}>
                    <div style={{fontSize:13,color:T.text,lineHeight:1.75,marginBottom:12,fontWeight:300,...sans,display:"flex",alignItems:"flex-start",gap:8}}>
                      {item.reverse&&<span style={{flexShrink:0,fontSize:9,fontWeight:600,color:T.roseD,background:T.roseL,borderRadius:4,padding:"2px 6px",marginTop:2,letterSpacing:"0.04em",...sans}}>역채점</span>}
                      {item.neutral&&<span style={{flexShrink:0,fontSize:9,fontWeight:600,color:T.yellowD,background:T.yellowL,borderRadius:4,padding:"2px 6px",marginTop:2,letterSpacing:"0.04em",...sans}}>참고</span>}
                      {item.q}
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      {MARKS.map((m,mIdx)=>(
                        <button key={mIdx} onClick={()=>setMark(current.id,i,mIdx)} style={{
                          flex:1,padding:"10px 0",borderRadius:8,cursor:"pointer",
                          border:`1px solid ${sel===mIdx?m.color:T.stroke}`,
                          background:sel===mIdx?m.bg:T.card,
                          color:sel===mIdx?m.color:T.muted,
                          ...serif,fontSize:20,fontWeight:400,transition:"all 0.12s",
                          transform:sel===mIdx?"scale(1.05)":"scale(1)",
                        }}>
                          {m.symbol}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* nav */}
            <div style={{display:"flex",gap:8,marginTop:14}}>
              {currentIdx>0&&(
                <button onClick={()=>{setActiveCat(categories[currentIdx-1].id);window.scrollTo(0,0);}} style={{flex:1,padding:"13px",background:T.card,border:`1px solid ${T.stroke}`,borderRadius:10,color:T.muted,fontSize:12,...sans,cursor:"pointer"}}>
                  ← 이전
                </button>
              )}
              {currentIdx<categories.length-1?(
                <button onClick={()=>{setActiveCat(categories[currentIdx+1].id);window.scrollTo(0,0);}} style={{flex:2,padding:"13px",background:T.text,border:"none",borderRadius:10,color:"#fff",fontSize:12,fontWeight:500,cursor:"pointer",letterSpacing:"0.05em",...sans}}>
                  다음 — {categories[currentIdx+1].en} →
                </button>
              ):(
                <button onClick={()=>{ setActiveTab("result"); generateAnalysis(); }} style={{flex:2,padding:"13px",background:T.text,border:"none",borderRadius:10,color:"#fff",fontSize:12,fontWeight:500,cursor:"pointer",letterSpacing:"0.05em",...sans}}>
                  결과 보기 →
                </button>
              )}
            </div>
          </div>
        )}

        {/* ═══ RESULT ═══ */}
        {activeTab==="result" && (
          <div style={{paddingTop:32}}>

            {/* total score */}
            <div style={{background:T.card,borderRadius:18,padding:"28px 24px",marginBottom:20,textAlign:"center",border:`1px solid ${T.stroke}`,boxShadow:"0 2px 16px rgba(0,0,0,0.04)"}}>
              <div style={{fontSize:10,letterSpacing:"0.2em",color:T.muted,fontWeight:500,marginBottom:16,...sans}}>MY WELLNESS SCORE</div>
              <ArcMeter pct={totalScore} color={totalGrade.color} size={120}/>
              <div style={{...serif,fontSize:11,letterSpacing:"0.2em",color:totalGrade.color,fontWeight:400,marginTop:12}}>{totalGrade.label.toUpperCase()}</div>
              <div style={{...serif,fontSize:28,fontWeight:400,color:T.text,marginTop:4,fontStyle:"italic"}}>{totalGrade.ko}</div>
              <div style={{fontSize:11,color:T.muted,marginTop:6,fontWeight:300,...sans}}>전체 웰니스 종합 점수</div>
            </div>

            {depAlert>=5&&(
              <div style={{background:T.roseL,border:`1px solid ${T.rose}`,borderRadius:12,padding:"16px 18px",marginBottom:16}}>
                <div style={{fontSize:10,fontWeight:600,color:T.roseD,letterSpacing:"0.12em",marginBottom:8,...sans}}>MENTAL HEALTH NOTICE</div>
                <p style={{fontSize:13,color:T.text,lineHeight:1.8,margin:0,fontWeight:300,...sans}}>정신건강 자가 점검에서 <strong style={{fontWeight:600}}>{depAlert}개</strong> 주의 신호가 감지되었어요. 전문가 상담을 권장드립니다.</p>
              </div>
            )}

            {/* 4 scores */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
              {categories.map(cat=>{
                const p=catScore(cat),g=getGrade(p);
                return (
                  <div key={cat.id} style={{background:T.card,borderRadius:14,padding:"18px 14px",border:`1px solid ${T.stroke}`,boxShadow:"0 1px 8px rgba(0,0,0,0.03)"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                      <div style={{width:24,height:24,borderRadius:"50%",background:cat.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:cat.color,...sans}}>{cat.num}</div>
                      <div style={{fontSize:9,color:T.muted,letterSpacing:"0.06em",...sans}}>{cat.tag}</div>
                    </div>
                    <div style={{...serif,fontSize:22,fontWeight:400,color:cat.color,fontStyle:"italic",marginBottom:4}}>{cat.en}</div>
                    <div style={{fontSize:12,fontWeight:600,color:T.text,...sans,marginBottom:10}}>{cat.label}</div>
                    <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:8}}>
                      <span style={{...serif,fontSize:32,fontWeight:400,color:g.color,lineHeight:1}}>{p}</span>
                      <span style={{fontSize:11,color:T.muted,...sans}}>/100</span>
                    </div>
                    <div style={{height:2,background:T.stroke,borderRadius:2,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${p}%`,background:cat.accent,borderRadius:2,transition:"width 0.7s"}}/>
                    </div>
                    <div style={{fontSize:10,color:g.color,marginTop:6,fontWeight:500,letterSpacing:"0.06em",...sans}}>{g.label.toUpperCase()}</div>
                  </div>
                );
              })}
            </div>

            {/* life plan */}
            <div style={{background:T.card,borderRadius:14,padding:"20px",marginBottom:16,border:`1px solid ${T.stroke}`}}>
              <div style={{fontSize:10,letterSpacing:"0.18em",color:T.muted,fontWeight:500,marginBottom:14,...sans}}>1-YEAR LIFE PLAN</div>
              {categories.find(c=>c.id==="daily").items.filter(it=>it.neutral).map((item,ni)=>{
                const i=categories.find(c=>c.id==="daily").items.indexOf(item);
                const mIdx=answers[`daily-${i}`];
                const m=mIdx!==undefined?MARKS[mIdx]:null;
                return (
                  <div key={ni} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:ni<5?`1px solid ${T.stroke}`:""}}>
                    <span style={{fontSize:12,color:T.sub,flex:1,paddingRight:12,fontWeight:300,...sans}}>{item.q}</span>
                    <span style={{...serif,fontSize:20,fontWeight:400,color:m?m.color:T.muted}}>{m?m.symbol:"—"}</span>
                  </div>
                );
              })}
            </div>

            {/* priority */}
            <div style={{background:T.card,borderRadius:14,padding:"20px",marginBottom:16,border:`1px solid ${T.stroke}`}}>
              <div style={{fontSize:10,letterSpacing:"0.18em",color:T.muted,fontWeight:500,marginBottom:16,...sans}}>IMPROVEMENT PRIORITY</div>
              {[...categories].sort((a,b)=>catScore(a)-catScore(b)).map((cat,i)=>{
                const p=catScore(cat),g=getGrade(p);
                return (
                  <div key={cat.id} style={{display:"flex",alignItems:"center",gap:14,paddingBottom:14,marginBottom:14,borderBottom:i<3?`1px solid ${T.stroke}`:""}}>
                    <div style={{...serif,fontSize:20,fontWeight:400,color:T.muted,width:20,textAlign:"right",flexShrink:0}}>{i+1}</div>
                    <div style={{flex:1}}>
                      <div style={{...serif,fontSize:16,fontWeight:400,color:cat.color,fontStyle:"italic"}}>{cat.en}</div>
                      <div style={{fontSize:12,color:T.sub,...sans,marginTop:2,marginBottom:8}}>{cat.label}</div>
                      <div style={{height:2,background:T.stroke,borderRadius:2,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${p}%`,background:cat.accent,borderRadius:2,transition:"width 0.7s"}}/>
                      </div>
                    </div>
                    <div style={{...serif,fontSize:22,fontWeight:400,color:g.color,minWidth:40,textAlign:"right"}}>{p}</div>
                  </div>
                );
              })}
            </div>

            {/* AI 분석 */}
            <div style={{background:T.card,borderRadius:14,padding:"20px",marginBottom:16,border:`1px solid ${T.stroke}`}}>
              <div style={{fontSize:10,letterSpacing:"0.18em",color:T.muted,fontWeight:500,marginBottom:14,...sans}}>AI WELLNESS ANALYSIS</div>
              {!aiResult&&(
                <div style={{textAlign:"center",padding:"8px 0"}}>
                  <button onClick={generateAnalysis} style={{padding:"11px 24px",background:T.text,color:"#fff",border:"none",borderRadius:8,fontSize:11,fontWeight:500,cursor:"pointer",letterSpacing:"0.08em",...sans}}>
                    분석 보기
                  </button>
                </div>
              )}
              {aiResult&&(
                <div>
                  <p style={{fontSize:13,color:T.text,lineHeight:1.9,margin:"0 0 18px",fontWeight:300,...sans}}>{aiResult.summary}</p>
                  <div style={{borderTop:`1px solid ${T.stroke}`,paddingTop:16}}>
                    <div style={{...serif,fontSize:16,fontStyle:"italic",color:T.roseD,marginBottom:12}}>Better you —</div>
                    <p style={{fontSize:13,color:T.text,lineHeight:1.85,margin:"0 0 14px",fontWeight:300,...sans}}>{aiResult.advice}</p>
                    <div style={{padding:"14px",background:T.yellowL,borderRadius:10,marginBottom:10,borderLeft:`2px solid ${T.yellow}`}}>
                      <div style={{fontSize:9,letterSpacing:"0.15em",color:T.yellowD,fontWeight:500,marginBottom:6,...sans}}>QUOTE</div>
                      <p style={{fontSize:12,color:T.text,lineHeight:1.75,margin:0,fontStyle:"italic",...serif}}>{aiResult.quote}</p>
                    </div>
                    <div style={{padding:"14px",background:T.roseL,borderRadius:10,borderLeft:`2px solid ${T.rose}`}}>
                      <div style={{fontSize:9,letterSpacing:"0.15em",color:T.roseD,fontWeight:500,marginBottom:6,...sans}}>한마디</div>
                      <p style={{fontSize:13,color:T.text,lineHeight:1.75,margin:0,fontWeight:400,...sans}}>{aiResult.message}</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            <button onClick={()=>{setAnswers({});setActiveTab("intro");setActiveCat("physical");setAiResult(null);window.scrollTo(0,0);}} style={{
              width:"100%",padding:"13px",background:"transparent",
              border:`1px solid ${T.stroke}`,borderRadius:10,
              color:T.muted,fontSize:11,fontWeight:500,cursor:"pointer",
              letterSpacing:"0.08em",...sans,
            }}>
              RESTART
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
