import { useState } from "react";

/* ── Google Fonts injected in index.html ── */

const T = {
  bg:      "#F5F0EB",
  card:    "#FFFFFF",
  rose:    "#E8A090",  roseL:  "#FAF0EC",  roseD:  "#B85040",
  blue:    "#A0C0D8",  blueL:  "#EAF2F8",  blueD:  "#4078A0",
  sage:    "#A8C8A0",  sageL:  "#EAF4E8",  sageD:  "#508848",
  yellow:  "#C8B870",  yellowL:"#F5EFD8",  yellowD:"#907830",
  lav:     "#B8A8C8",  lavL:   "#EFE7F2",  lavD:   "#6858A0",
  gray:    "#C8C0BB",  grayL:  "#EFECE8",  grayD:  "#6F6660",
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
      {q:"주 3회 이상, 하루 30분 이상의 규칙적인 신체 활동(운동, 산책 등)을 하고 있다"},
      {q:"매일 7~8시간 정도의 양질의 수면을 취하고, 기상 시 개운하다"},
      {q:"인스턴트를 줄이고 영양을 골고루 갖춘 식사를 규칙적으로 한다"},
      {q:"음주·흡연을 하지 않거나, 스스로 정한 기준 내에서 절제하고 있다"},
      {q:"몸의 이상 신호(통증, 만성 피로 등)가 올 때 휴식을 취하거나 병원을 찾는다"},
      {q:"일상 속에서 스트레칭이나 가벼운 움직임을 의식적으로 실천한다"},
    ],
  },
  { id:"mental", num:"02", emoji:"🕊️", label:"정신·정서적 웰니스", tag:"마인드솔루션",
    en:"Mental", color:T.blueD, light:T.blueL, border:T.blue, accent:T.blue,
    desc:"감정·심리적 균형과 정신건강 전반을 점검하는 것",
    note:"역채점 항목은 전문가 진단이 아닙니다. 이상 신호가 많을 경우 전문의 상담을 권장합니다.",
    items:[
      {q:"외부의 자극에서 벗어나, 내 감정과 생각을 정리하는 혼자만의 시간을 가지는 편이다"},
      {q:"부정적인 마음이 정리되면 삶의 의미나 긍정적인 방향성을 찾아내는 편이다"},
      {q:"마음이 힘들 때 내가 느끼는 감정이 무엇이고 원인이 무엇인지 명확하게 표현할 수 있다"},
      {q:"행동이나 중요한 결정을 감정에 휩쓸리지 않고 이성적으로 선택한다"},
      {q:"마음 놓고 온전히 쉬거나 여가를 즐기는 동안에도 마음 한편이 불안하거나 죄책감이 든다", reverse:true},
      {q:"취미나 여가 활동을 할 때는 즐겁지만, 끝나고 나면 금방 공허함이나 무기력함이 밀려온다", reverse:true},
      {q:"현재 혹은 과거에 정신건강 및 심리 안정을 위해 전문가의 도움(상담·치료)을 받아본 적이 있다", neutral:true},
    ],
  },
  { id:"routine", num:"03", emoji:"☀️", label:"일상 루틴 및 점검", tag:"루틴솔루션",
    en:"Routine", color:T.sageD, light:T.sageL, border:T.sage, accent:T.sage,
    desc:"일상 리듬과 자기 시간 관리 점검",
    items:[
      {q:"평일과 주말 모두 규칙적인 기상 및 취침 시간을 유지하는 편이다"},
      {q:"하루 중 대부분의 시간을 나에게 생산적이거나 의미 있는 활동으로 채운다"},
      {q:"타인이나 환경에 휘둘리지 않고, 오롯이 나만을 위해 쓰는 고정적인 시간이 있다"},
      {q:"운동, 자격증, 동아리, 알바 등 나를 위해 주 3회 이상 고정적으로 시간을 내는 활동이 있다"},
      {q:"최근 스마트폰, 늦잠 등 여러 이유로 생활 리듬이 깨졌다고 느낀다", reverse:true},
      {q:"하루를 마무리지을 때 오늘 하루 보낸 시간에 대해 대체로 만족한다"},
    ],
  },
  { id:"social", num:"04", emoji:"🌸", label:"사회적 관계", tag:"커넥션솔루션",
    en:"Social", color:T.yellowD, light:T.yellowL, border:T.yellow, accent:T.yellow,
    desc:"건강한 인간관계와 소속감 점검",
    items:[
      {q:"내가 힘들거나 위기에 처했을 때 솔직하게 털어놓고 도움을 요청할 사람이 있다"},
      {q:"최근 가족, 친구, 동료 등 소중한 사람들과 온전히 몰입하는 질 높은 시간을 보냈다"},
      {q:"텍스트(메시지, SNS) 소통 외에 목소리를 듣거나 직접 만나 소통하는 사람들이 충분히 있다"},
      {q:"가까운 관계에서 고마움, 미안함, 애정 등의 감정을 인색하지 않게 표현한다"},
      {q:"누군가와 갈등이 생겼을 때, 감정적으로 대하거나 회피하지 않고 대화로 풀려고 노력한다"},
      {q:"타인의 시선에 맞추기보다, 내 모습 그대로를 편안하게 보여줄 수 있는 관계가 충분히 있다"},
    ],
  },
  { id:"career", num:"05", emoji:"✨", label:"일과 성장", tag:"그로스솔루션",
    en:"Growth", color:T.lavD, light:T.lavL, border:T.lav, accent:T.lav,
    desc:"일·학업의 의미와 성장 점검",
    items:[
      {q:"현재 내가 하고 있는 일(또는 학업)은 나에게 단순한 의무를 넘어 의미가 있다"},
      {q:"일(또는 학업) 때문에 개인의 삶, 수면, 건강 등을 과도하게 희생하지 않는다 (워라밸)"},
      {q:"나의 장점이나 강점이 현재 하고 있는 일(역할)에 잘 반영되고 있다고 느낀다"},
      {q:"과거(예: 6개월 전)와 비교했을 때, 내가 조금 더 성장하거나 성숙해졌다고 느낀다"},
      {q:"새로운 것을 배우거나 당면한 문제를 해결하는 과정에서 성취감을 느낀다"},
      {q:"내가 속한 집단(학교, 직장, 공동체 등)에서 내 역할이 존중받고 있다고 느낀다"},
    ],
  },
  { id:"extra", num:"06", emoji:"📅", label:"배경 정보 및 계획", tag:"인포",
    en:"Background", color:T.grayD, light:T.grayL, border:T.gray, accent:T.gray,
    desc:"점수에 반영되지 않는 참고 정보",
    note:"이 항목은 점수에 포함되지 않는 참고용입니다.",
    items:[
      {q:"최근 1년 이내에 일상의 큰 변화(결혼, 입대, 독립 등)가 있었다", neutral:true},
      {q:"향후 1년 이내에 학업/커리어의 변화(취업, 이직, 퇴사, 진학 등) 계획이 있다", neutral:true},
      {q:"향후 1년 이내에 장기 해외 체류(여행, 유학, 어학연수 등) 계획이 있다", neutral:true},
    ],
  },
];

const sectionBreaks = {
  mental: { 4:"자가 점검 (역채점)", 6:"참고 항목" },
  routine:{ 4:"리듬 점검 (역채점)" },
};

function getGrade(pct) {
  if (pct>=80) return {label:"Excellent", ko:"매우 좋음", color:T.sageD};
  if (pct>=60) return {label:"Good",      ko:"좋음",     color:T.blueD};
  if (pct>=40) return {label:"Fair",      ko:"보통",     color:T.yellowD};
  if (pct>=20) return {label:"Caution",   ko:"주의 필요", color:"#B07030"};
  return             {label:"Attention", ko:"집중 관리", color:T.roseD};
}

function RadarChart({ data, size=280 }) {
  const cx=size/2, cy=size/2, maxR=size*0.32;
  const n=data.length;
  const angles=data.map((_,i)=> -Math.PI/2 + (Math.PI*2*i)/n);
  const points=data.map((d,i)=>{
    const r=(d.value/100)*maxR;
    return { x:cx+r*Math.cos(angles[i]), y:cy+r*Math.sin(angles[i]),
             ax:cx+maxR*Math.cos(angles[i]), ay:cy+maxR*Math.sin(angles[i]),
             lx:cx+(maxR+30)*Math.cos(angles[i]), ly:cy+(maxR+30)*Math.sin(angles[i]),
             ...d };
  });
  const polyPts = points.map(p=>p.x+","+p.y).join(" ");
  const rings = [0.25,0.5,0.75,1].map(scale=>
    angles.map(a=>(cx+scale*maxR*Math.cos(a))+","+(cy+scale*maxR*Math.sin(a))).join(" ")
  );
  return (
    <svg viewBox={"0 0 "+size+" "+size} width="100%" style={{overflow:"visible"}}>
      {rings.map((pts,i)=>(
        <polygon key={i} points={pts} fill={i===3?"#FAF8F4":"none"} stroke="#E8E0D8" strokeWidth="0.6"/>
      ))}
      {points.map((p,i)=>(
        <line key={i} x1={cx} y1={cy} x2={p.ax} y2={p.ay} stroke="#E8E0D8" strokeWidth="0.6"/>
      ))}
      <polygon points={polyPts} fill="rgba(80,136,72,0.18)" stroke="#508848" strokeWidth="1.6" strokeLinejoin="round"/>
      {points.map((p,i)=>(
        <circle key={i} cx={p.x} cy={p.y} r="4" fill={p.color} stroke="#fff" strokeWidth="1.5"/>
      ))}
      {points.map((p,i)=>{
        let anchor="middle";
        if(p.lx<cx-8) anchor="end";
        else if(p.lx>cx+8) anchor="start";
        return (
          <g key={i}>
            <text x={p.lx} y={p.ly-3} textAnchor={anchor} fontSize="10" fontWeight="600" fill={p.color} fontFamily="'Cormorant Garamond',serif" fontStyle="italic">{p.en}</text>
            <text x={p.lx} y={p.ly+11} textAnchor={anchor} fontSize="13" fontWeight="700" fill="#3A3535" fontFamily="'Noto Sans KR',sans-serif">{p.value}</text>
          </g>
        );
      })}
    </svg>
  );
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
  const today = new Date().toISOString().split("T")[0];
  const [userName, setUserName] = useState("");
  const [checkDate, setCheckDate] = useState(today);

  const setMark = (catId, idx, mIdx) => {
    const key=catId + "-" + idx;
    setAnswers(prev=>{
      if(prev[key]===mIdx){const n={...prev};delete n[key];return n;}
      return {...prev,[key]:mIdx};
    });
  };

  const catScore = (cat) => {
    const sc=cat.items.filter(it=>!it.neutral);
    const an=sc.filter(it=>answers[cat.id + "-" + cat.items.indexOf(it)]!==undefined);
    if(!an.length) return 0;
    const e=sc.reduce((s,it)=>{
      const m=answers[cat.id + "-" + cat.items.indexOf(it)];
      if(m===undefined) return s;
      return s+(it.reverse?2-MARKS[m].score:MARKS[m].score);
    },0);
    return Math.round((e/(an.length*2))*100);
  };

  const totalScore=Math.round(categories.reduce((s,c)=>s+catScore(c),0)/categories.length);
  const totalGrade=getGrade(totalScore);

  const catRatio = (cat) => {
    const items = cat.items.filter(it=>!it.neutral);
    const answered = items.filter(it=>answers[cat.id+"-"+cat.items.indexOf(it)]!==undefined);
    if(!answered.length) return {o:0,t:0,x:0,total:0};
    let o=0,t=0,x=0;
    answered.forEach(it=>{
      const m=answers[cat.id+"-"+cat.items.indexOf(it)];
      if(MARKS[m].score===2) o++;
      else if(MARKS[m].score===1) t++;
      else x++;
    });
    const total=answered.length;
    return {o:Math.round(o/total*100),t:Math.round(t/total*100),x:Math.round(x/total*100),oN:o,tN:t,xN:x,total};
  };

  const totalRatio = () => {
    let o=0,t=0,x=0,total=0;
    categories.forEach(cat=>{
      const r=catRatio(cat);
      o+=r.oN; t+=r.tN; x+=r.xN; total+=r.total;
    });
    if(!total) return {o:0,t:0,x:0,total:0};
    return {o:Math.round(o/total*100),t:Math.round(t/total*100),x:Math.round(x/total*100),oN:o,tN:t,xN:x,total};
  };
  const totalAnswered=categories.reduce((s,c)=>s+c.items.filter((_,i)=>answers[c.id + "-" + i]!==undefined).length,0);
  const totalItems=categories.reduce((s,c)=>s+c.items.length,0);
  const pctDone=Math.round((totalAnswered/totalItems)*100);

  const current=categories.find(c=>c.id===activeCat);
  const currentIdx=categories.findIndex(c=>c.id===activeCat);

  const depAlert=categories.find(c=>c.id==="mental").items.filter((it,i)=>{
    if(!it.reverse) return false;
    const m=answers["mental-" + i];
    return m!==undefined&&MARKS[m].score===2; // ○(예) 선택 = 증상 있음
  }).length;

  const generateAnalysis = () => {
    const scores = categories.filter(c=>c.id!=="extra").map(c => ({ id:c.id, label:c.label, en:c.en, score:catScore(c), grade:getGrade(catScore(c)).ko }));
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
      routine:  "아침 루틴 하나만 정해보세요. 일어나서 물 한 잔, 5분 스트레칭처럼 아주 작은 것부터요. 루틴이 쌓이면 하루 전체가 훨씬 안정적으로 느껴질 거예요.",
      social:   "가까운 사람에게 짧은 메시지 하나 먼저 보내보세요. 관계는 거창한 것보다 작고 꾸준한 연결로 단단해져요. 나를 표현하는 연습도 천천히 해보세요.",
      career:   "내가 지금 하는 일의 작은 의미를 찾아보세요. 매일 일과 후 '오늘 잘한 한 가지'를 떠올리는 습관이 성장감을 높여줘요. 너무 큰 변화보다 작은 성취에 집중해보세요.",
    };

    const quotes = [
      { text:'당신 자신을 사랑하는 것은 평생의 로맨스의 시작이다.', by:'— Oscar Wilde' },
      { text:'건강은 모든 것이 아니지만, 건강 없이는 모든 것이 아무것도 아니다.', by:'— Arthur Schopenhauer' },
      { text:'작은 것에 충실한 사람이 큰 것에도 충실하다.', by:'— 성경, 누가복음 16:10' },
      { text:'오늘 할 수 있는 일을 내일로 미루지 말라. 단, 오늘 쉬어야 한다면 내일로 미뤄도 된다.', by:'— Unknown' },
      { text:'나를 돌보는 것은 이기적인 게 아니다. 비어있는 컵으로는 누구도 채울 수 없다.', by:'— Unknown' },
      { text:'성장은 편안함 밖에서 일어난다.', by:'— Roy T. Bennett' },
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

    setAiResult({ summary, advice, quote: quote.text + " " + quote.by, message, lowestLabel: lowest.label, highestLabel: highest.label });
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
            {/* 이름 & 날짜 입력 */}
            <div style={{background:T.card,borderRadius:14,padding:"18px 20px",marginBottom:20,border:`1px solid ${T.stroke}`}}>
              <div style={{fontSize:10,letterSpacing:"0.18em",color:T.muted,fontWeight:500,marginBottom:14,...sans}}>MY INFO</div>
              <div style={{marginBottom:12}}>
                <div style={{fontSize:11,color:T.sub,fontWeight:500,marginBottom:6,...sans}}>이름</div>
                <input
                  type="text"
                  value={userName}
                  onChange={e=>setUserName(e.target.value)}
                  placeholder="이름을 입력해주세요"
                  style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.stroke}`,borderRadius:8,fontSize:13,color:T.text,background:T.bg,outline:"none",...sans}}
                />
              </div>
              <div>
                <div style={{fontSize:11,color:T.sub,fontWeight:500,marginBottom:6,...sans}}>날짜</div>
                <input
                  type="date"
                  value={checkDate}
                  onChange={e=>setCheckDate(e.target.value)}
                  style={{width:"100%",padding:"10px 14px",border:`1px solid ${T.stroke}`,borderRadius:8,fontSize:13,color:T.text,background:T.bg,outline:"none",...sans}}
                />
              </div>
            </div>

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
                const done=cat.items.every((_,i)=>answers[cat.id + "-" + i]!==undefined);
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

            {/* 이름/날짜 표시 */}
            {(userName||checkDate)&&(
              <div style={{background:T.card,borderRadius:12,padding:"14px 18px",marginBottom:14,border:`1px solid ${T.stroke}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                {userName&&<div>
                  <div style={{fontSize:9,letterSpacing:"0.15em",color:T.muted,fontWeight:500,marginBottom:3,...sans}}>NAME</div>
                  <div style={{...serif,fontSize:18,fontWeight:400,color:T.text,fontStyle:"italic"}}>{userName}</div>
                </div>}
                {checkDate&&<div style={{textAlign:"right"}}>
                  <div style={{fontSize:9,letterSpacing:"0.15em",color:T.muted,fontWeight:500,marginBottom:3,...sans}}>DATE</div>
                  <div style={{fontSize:12,color:T.sub,fontWeight:400,...sans}}>{checkDate}</div>
                </div>}
              </div>
            )}

            {/* 레이더 차트 — 5영역 종합 점수 */}
            <div style={{background:T.card,borderRadius:18,padding:"24px 20px",marginBottom:16,border:`1px solid ${T.stroke}`,textAlign:"center"}}>
              <div style={{fontSize:10,letterSpacing:"0.2em",color:T.muted,fontWeight:500,marginBottom:6,...sans}}>MY WELLNESS RADAR</div>
              <div style={{...serif,fontSize:22,fontWeight:400,color:T.text,fontStyle:"italic",marginBottom:16}}>웰니스 균형 지도</div>
              <RadarChart size={300} data={categories.filter(c=>c.id!=="extra").map(c=>({
                en:c.en, label:c.label, color:c.color, value:catScore(c)
              }))}/>
              <div style={{fontSize:11,color:T.sub,marginTop:12,fontWeight:300,...sans,lineHeight:1.6}}>
                각 영역의 점수가 균형 잡힐수록 안쪽 도형이 정오각형에 가까워져요
              </div>
            </div>

            {depAlert>=2&&(
              <div style={{background:T.roseL,border:`1px solid ${T.rose}`,borderRadius:12,padding:"16px 18px",marginBottom:16}}>
                <div style={{fontSize:10,fontWeight:600,color:T.roseD,letterSpacing:"0.12em",marginBottom:8,...sans}}>MENTAL HEALTH NOTICE</div>
                <p style={{fontSize:13,color:T.text,lineHeight:1.8,margin:0,fontWeight:300,...sans}}>정신건강 자가 점검 항목 중 <strong style={{fontWeight:600}}>{depAlert}개</strong>에서 주의 신호가 감지되었어요. 전문가 상담을 권장드립니다.</p>
              </div>
            )}

            {/* 영역별 점수 */}
            <div style={{background:T.card,borderRadius:14,padding:"18px 20px",marginBottom:16,border:`1px solid ${T.stroke}`}}>
              <div style={{fontSize:10,letterSpacing:"0.18em",color:T.muted,fontWeight:500,marginBottom:14,...sans}}>영역별 점수</div>
              {categories.filter(c=>c.id!=="extra").map(cat=>{
                const p=catScore(cat);
                return (
                  <div key={cat.id} style={{marginBottom:16}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <div style={{width:22,height:22,borderRadius:"50%",background:cat.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:cat.color,...sans}}>{cat.num}</div>
                        <span style={{...serif,fontSize:15,fontWeight:400,color:cat.color,fontStyle:"italic"}}>{cat.en}</span>
                        <span style={{fontSize:11,color:T.sub,...sans}}>{cat.label}</span>
                      </div>
                      <span style={{...serif,fontSize:18,fontWeight:500,color:cat.color}}>{p}</span>
                    </div>
                    <div style={{height:6,background:T.stroke,borderRadius:3,overflow:"hidden"}}>
                      <div style={{height:"100%",width:p+"%",background:cat.accent,borderRadius:3,transition:"width 0.7s"}}/>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 배경 정보 & 계획 */}
            <div style={{background:T.card,borderRadius:14,padding:"20px",marginBottom:16,border:`1px solid ${T.stroke}`}}>
              <div style={{fontSize:10,letterSpacing:"0.18em",color:T.muted,fontWeight:500,marginBottom:14,...sans}}>BACKGROUND & PLANS</div>
              {categories.find(c=>c.id==="extra").items.map((item,ni)=>{
                const mIdx=answers["extra-" + ni];
                const m=mIdx!==undefined?MARKS[mIdx]:null;
                const cnt=categories.find(c=>c.id==="extra").items.length;
                return (
                  <div key={ni} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:ni<cnt-1?`1px solid ${T.stroke}`:""}}>
                    <span style={{fontSize:12,color:T.sub,flex:1,paddingRight:12,fontWeight:300,...sans,lineHeight:1.5}}>{item.q}</span>
                    <span style={{...serif,fontSize:20,fontWeight:400,color:m?m.color:T.muted}}>{m?m.symbol:"—"}</span>
                  </div>
                );
              })}
            </div>

            {/* 집중 필요 영역 (점수 낮은 순) */}
            <div style={{background:T.card,borderRadius:14,padding:"20px",marginBottom:16,border:`1px solid ${T.stroke}`}}>
              <div style={{fontSize:10,letterSpacing:"0.18em",color:T.muted,fontWeight:500,marginBottom:16,...sans}}>집중이 필요한 영역</div>
              {[...categories].filter(c=>c.id!=="extra").sort((a,b)=>catScore(a)-catScore(b)).map((cat,i,arr)=>{
                const p=catScore(cat);
                return (
                  <div key={cat.id} style={{display:"flex",alignItems:"center",gap:12,paddingBottom:12,marginBottom:12,borderBottom:i<arr.length-1?`1px solid ${T.stroke}`:""}}>
                    <div style={{...serif,fontSize:18,fontWeight:400,color:T.muted,width:18,flexShrink:0}}>{i+1}</div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                        <span style={{...serif,fontSize:15,fontWeight:400,color:cat.color,fontStyle:"italic"}}>{cat.en}</span>
                        <span style={{fontSize:11,color:T.sub,...sans}}>{cat.label}</span>
                      </div>
                      <div style={{height:4,background:T.stroke,borderRadius:2,overflow:"hidden"}}>
                        <div style={{height:"100%",width:p+"%",background:cat.accent,borderRadius:2,transition:"width 0.7s"}}/>
                      </div>
                    </div>
                    <div style={{textAlign:"right",flexShrink:0,...serif,fontSize:18,fontWeight:500,color:cat.color}}>{p}</div>
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
