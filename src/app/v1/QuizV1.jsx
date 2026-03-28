"use client";
import { useState, useEffect, useRef } from "react";

/* ═══ EXAMS with whyYou/whyPrevention ═══ */
const EXAMS = {
  telomeres: { id:"telomeres",name:"Ανάλυση Τελομερών",sub:"Υπολογισμός Βιολογικής Ηλικίας",icon:"🧬",color:"#a16207",
    shortDesc:"Μετράμε το μήκος τελομερών κάθε χρωμοσώματος — η πιο αξιόπιστη μέτρηση βιολογικής ηλικίας.",
    whyYou:"Ο τρόπος ζωής που περιγράψατε μπορεί να επηρεάζει τον ρυθμό γήρανσης των κυττάρων. Η ανάλυση τελομερών αποκαλύπτει αν γερνάτε πιο γρήγορα ή αργά απ' ό,τι δείχνει η χρονολογική σας ηλικία.",
    whyPrev:"Η μέτρηση τελομερών δημιουργεί baseline — σημείο αναφοράς. Αν αλλάξει κάτι στο μέλλον, θα το ξέρετε εγκαίρως." },
  metabolism: { id:"metabolism",name:"Εξετάσεις Μεταβολισμού",sub:"Ανάλυση Λιπαρών & Οργανικών Οξέων",icon:"⚡",color:"#16a34a",
    shortDesc:"Ανιχνεύουμε ελλείψεις σε βιταμίνες, αμινοξέα και ιχνοστοιχεία.",
    whyYou:"Κούραση, δυσκολία στο βάρος ή χαμηλή ενέργεια συχνά οφείλονται σε κρυφές ελλείψεις θρεπτικών. Αποκαλύπτουμε ακριβώς τι λείπει.",
    whyPrev:"Πολλές ελλείψεις δεν δίνουν συμπτώματα αλλά επιβραδύνουν κρυφά τον μεταβολισμό." },
  oxidation: { id:"oxidation",name:"Έλεγχος Οξειδωτικού Στρες",sub:"Αντιοξειδωτική Ικανότητα",icon:"🛡️",color:"#ef4444",
    shortDesc:"Αξιολογούμε ισορροπία ελεύθερων ριζών και αντιοξειδωτικών.",
    whyYou:"Στρες, κάπνισμα ή κακή διατροφή αυξάνουν τις ελεύθερες ρίζες. Καταστρέφουν κύτταρα, DNA, πρωτεΐνες.",
    whyPrev:"Το οξειδωτικό στρες είναι «σιωπηλός» παράγοντας — μπορεί να σας επηρεάζει χωρίς σύμπτωμα." },
  microbiome: { id:"microbiome",name:"Ανάλυση Μικροβιώματος",sub:"Χαρτογράφηση Εντερικής Χλωρίδας",icon:"🦠",color:"#2563eb",
    shortDesc:"Πλήρης χαρτογράφηση μικροοργανισμών εντέρου με εξατομικευμένα προβιοτικά.",
    whyYou:"Τα πεπτικά σας προβλήματα δείχνουν πιθανή δυσβίωση. Επηρεάζει πέψη, ανοσοποιητικό, διάθεση, βάρος.",
    whyPrev:"Το μικροβίωμα επηρεάζει τα πάντα — ανοσοποιητικό, ψυχική υγεία, μεταβολισμό. Baseline χαρτογράφηση." },
  ages: { id:"ages",name:"Εξέταση Γλυκοζυλίωσης (AGEs)",sub:"Τελικά Προϊόντα Γλυκοζυλίωσης",icon:"🍯",color:"#ca8a04",
    shortDesc:"Μετράμε τα AGEs που καταστρέφουν κολλαγόνο, ελαστίνη και αγγεία.",
    whyYou:"Η διατροφή σας και τα σημάδια γήρανσης δέρματος σχετίζονται με γλυκοζυλίωση. Τα AGEs καταστρέφουν κολλαγόνο.",
    whyPrev:"Τα AGEs συσσωρεύονται σταδιακά. Μια μέτρηση δείχνει αν υπάρχει κρυφή συσσώρευση." },
  inflammation: { id:"inflammation",name:"Έλεγχος Χρόνιας Φλεγμονής",sub:"Σιωπηλή Φλεγμονή",icon:"🔥",color:"#dc2626",
    shortDesc:"Εντοπίζουμε τη «σιωπηλή» χρόνια φλεγμονή — 70% σοβαρών παθήσεων.",
    whyYou:"Χρόνιες καταστάσεις, στρες ή αυτοάνοσα συνδέονται με χρόνια φλεγμονή χαμηλής έντασης.",
    whyPrev:"Η χρόνια φλεγμονή είναι αόρατη — δεν πονάει, δεν φαίνεται. Μόνο εργαστηριακά ανιχνεύεται." },
  hairloss: { id:"hairloss",name:"Γενετικό Test Τριχόπτωσης",sub:"48 Γενετικές Παραλλαγές",icon:"💇",color:"#7c3aed",
    shortDesc:"Αναλύουμε 48 γενετικές παραλλαγές σε 13 γονίδια για στοχευμένη θεραπεία.",
    whyYou:"Η τριχόπτωση που αναφέρατε μπορεί να οφείλεται σε γενετικούς παράγοντες. Βρίσκουμε ποια θεραπεία ταιριάζει στο DNA σας.",
    whyPrev:"Αν υπάρχει οικογενειακό ιστορικό, το test δείχνει προδιάθεση πριν εμφανιστεί σημαντική τριχόπτωση." },
};

/* ═══ QUESTIONS - branching, gender-specific ═══ */
const QS = [
  { id:"age", q:"Πόσο χρονών είστε;", type:"slider", min:25, max:70, step:1, unit:"ετών",
    scoring:v=>v>=55?{telomeres:3,inflammation:2,oxidation:1}:v>=45?{telomeres:2,inflammation:1}:v>=35?{telomeres:1}:{},
    next:"gender" },
  { id:"gender", q:"Φύλο", type:"visual", options:[
    {id:"female",emoji:"👩",label:"Γυναίκα",scores:{},next:"concern_f"},
    {id:"male",emoji:"👨",label:"Άνδρας",scores:{},next:"concern_m"}]},
  // FEMALE concerns
  { id:"concern_f", q:"Ποια είναι η κύρια ανησυχία σας;", sub:"Επιλέξτε αυτό που σας απασχολεί", type:"visual", options:[
    {id:"aging",emoji:"⏳",label:"Γήρανση & πρόληψη",scores:{},next:"skin"},
    {id:"energy",emoji:"🔋",label:"Κούραση & ενέργεια",scores:{metabolism:3},next:"symptoms"},
    {id:"weight",emoji:"⚖️",label:"Διαχείριση βάρους",scores:{metabolism:4,microbiome:1},next:"symptoms"},
    {id:"metabolic",emoji:"🔬",label:"Μεταβολικές διαταραχές",scores:{metabolism:4,inflammation:2},next:"symptoms"},
    {id:"autoimmune",emoji:"🔁",label:"Αυτοάνοσο / χρόνιο νόσημα",scores:{inflammation:5,microbiome:2,oxidation:2},next:"symptoms"},
    {id:"gi",emoji:"🫁",label:"Γαστρεντερικά",scores:{microbiome:4,inflammation:1},next:"gi_detail"},
    {id:"skin_hair",emoji:"✨",label:"Δέρμα & μαλλιά",scores:{},next:"skin_hair_detail"},
    {id:"menopause",emoji:"🌸",label:"Εμμηνόπαυση",scores:{metabolism:3,inflammation:2,oxidation:1,telomeres:1},next:"symptoms"},
    {id:"general",emoji:"🎯",label:"Γενική βελτίωση",scores:{},next:"skin"}]},
  // MALE concerns
  { id:"concern_m", q:"Ποια είναι η κύρια ανησυχία σας;", sub:"Επιλέξτε αυτό που σας απασχολεί", type:"visual", options:[
    {id:"aging",emoji:"⏳",label:"Γήρανση & πρόληψη",scores:{},next:"skin"},
    {id:"energy",emoji:"🔋",label:"Κούραση & ενέργεια",scores:{metabolism:3},next:"symptoms"},
    {id:"weight",emoji:"⚖️",label:"Διαχείριση βάρους",scores:{metabolism:4,microbiome:1},next:"symptoms"},
    {id:"metabolic",emoji:"🔬",label:"Μεταβολικές διαταραχές",scores:{metabolism:4,inflammation:2},next:"symptoms"},
    {id:"autoimmune",emoji:"🔁",label:"Αυτοάνοσο / χρόνιο νόσημα",scores:{inflammation:5,microbiome:2,oxidation:2},next:"symptoms"},
    {id:"gi",emoji:"🫁",label:"Γαστρεντερικά",scores:{microbiome:4,inflammation:1},next:"gi_detail"},
    {id:"skin_hair",emoji:"✨",label:"Δέρμα & μαλλιά",scores:{},next:"skin_hair_detail"},
    {id:"libido",emoji:"💪",label:"Λίμπιντο & σεξουαλική υγεία",scores:{metabolism:3,inflammation:1,telomeres:1},next:"symptoms"},
    {id:"general",emoji:"🎯",label:"Γενική βελτίωση",scores:{},next:"skin"}]},
  // SYMPTOMS
  { id:"symptoms", q:"Τι συμπτώματα αντιμετωπίζετε;", sub:"Επιλέξτε όσα ισχύουν", type:"multi", options:[
    {id:"fatigue",emoji:"😴",label:"Χρόνια κούραση",scores:{metabolism:3,inflammation:1}},
    {id:"brain_fog",emoji:"🧠",label:"Brain fog",scores:{metabolism:2,microbiome:1}},
    {id:"mood",emoji:"🎭",label:"Μεταπτώσεις διάθεσης",scores:{microbiome:2,inflammation:1}},
    {id:"joint",emoji:"🦴",label:"Πόνοι αρθρώσεων",scores:{inflammation:3,oxidation:1}},
    {id:"skin_iss",emoji:"🪞",label:"Προβλήματα δέρματος",scores:{ages:2,oxidation:1}},
    {id:"wt",emoji:"⚖️",label:"Αύξηση βάρους",scores:{metabolism:3,microbiome:1}},
    {id:"hormonal",emoji:"🔄",label:"Ορμονικές διαταραχές",scores:{metabolism:2,inflammation:2}},
    {id:"hair_t",emoji:"💇",label:"Αραίωση μαλλιών",scores:{hairloss:3}}], next:"skin" },
  // GI DETAIL
  { id:"gi_detail", q:"Τι γαστρεντερικά προβλήματα;", sub:"Επιλέξτε όσα ισχύουν", type:"multi", options:[
    {id:"bloating",emoji:"🫧",label:"Φούσκωμα",scores:{microbiome:3}},
    {id:"irregular",emoji:"🔄",label:"Ακανόνιστη κένωση",scores:{microbiome:2}},
    {id:"food_sens",emoji:"🚫",label:"Ευαισθησίες τροφών",scores:{microbiome:3,inflammation:2}},
    {id:"reflux",emoji:"🔥",label:"Καούρα",scores:{microbiome:2,inflammation:1}},
    {id:"ibs",emoji:"🚨",label:"ΣΕΕ",scores:{microbiome:5,inflammation:3}},
    {id:"crohn",emoji:"🔁",label:"Crohn/Colitis",scores:{microbiome:5,inflammation:4,oxidation:2}}], next:"skin" },
  // SKIN/HAIR DETAIL
  { id:"skin_hair_detail", q:"Τι σας απασχολεί;", type:"visual", options:[
    {id:"wrinkles",emoji:"〰️",label:"Ρυτίδες & γήρανση",scores:{ages:3,oxidation:2,telomeres:1},next:"skin"},
    {id:"hair_loss",emoji:"💇",label:"Τριχόπτωση",scores:{hairloss:4},next:"skin"},
    {id:"acne",emoji:"😣",label:"Ακμή / δερματίτιδα",scores:{microbiome:2,inflammation:2},next:"skin"},
    {id:"dull",emoji:"💧",label:"Θαμπό δέρμα",scores:{oxidation:2,ages:1},next:"skin"}]},
  // SKIN
  { id:"skin", q:"Γενικά πώς είναι το δέρμα σας;", type:"visual", options:[
    {id:"great",emoji:"✨",label:"Λαμπερό",scores:{}},
    {id:"ok",emoji:"🙂",label:"Μια χαρά",scores:{}},
    {id:"aging",emoji:"〰️",label:"Σημάδια γήρανσης",scores:{ages:2,oxidation:1,telomeres:1}},
    {id:"bad",emoji:"😔",label:"Με ανησυχεί",scores:{ages:3,oxidation:2,telomeres:1}}], next:"diet" },
  // DIET
  { id:"diet", q:"Η διατροφή σας;", type:"visual", options:[
    {id:"great",emoji:"🥗",label:"Ισορροπημένη",scores:{}},
    {id:"ok",emoji:"🍽️",label:"Αρκετά καλή",scores:{}},
    {id:"sugar",emoji:"🍰",label:"Πολλά γλυκά",scores:{ages:3,metabolism:1}},
    {id:"poor",emoji:"🍔",label:"Ακανόνιστη / fast food",scores:{metabolism:2,microbiome:1,inflammation:1}}], next:"exercise" },
  // EXERCISE
  { id:"exercise", q:"Άσκηση;", type:"visual", options:[
    {id:"daily",emoji:"🏃",label:"Τακτικά",sub:"3+/βδομάδα",scores:{}},
    {id:"some",emoji:"🚶",label:"Μέτρια",scores:{}},
    {id:"rare",emoji:"🛋️",label:"Σπάνια",scores:{metabolism:1,inflammation:1,telomeres:1}},
    {id:"never",emoji:"🪑",label:"Καθόλου",scores:{metabolism:2,inflammation:1,telomeres:1,oxidation:1}}], next:"sleep" },
  // SLEEP
  { id:"sleep", q:"Ποιότητα ύπνου;", type:"visual", options:[
    {id:"great",emoji:"😴",label:"Εξαιρετική",scores:{}},
    {id:"ok",emoji:"🛌",label:"Αρκετά καλή",scores:{}},
    {id:"poor",emoji:"🌙",label:"Προβληματική",scores:{oxidation:1,inflammation:1,metabolism:1}},
    {id:"terrible",emoji:"👁️",label:"Πολύ κακή",scores:{oxidation:2,inflammation:2,metabolism:2,telomeres:1}}], next:"alcohol" },
  // ALCOHOL
  { id:"alcohol", q:"Αλκοόλ;", type:"visual", options:[
    {id:"none",emoji:"🚫",label:"Καθόλου",scores:{}},
    {id:"social",emoji:"🥂",label:"Κοινωνικά",scores:{}},
    {id:"regular",emoji:"🍷",label:"Τακτικά",scores:{oxidation:2,metabolism:1}},
    {id:"daily",emoji:"🍺",label:"Καθημερινά",scores:{oxidation:3,metabolism:2,inflammation:1}}], next:"smoking" },
  // SMOKING
  { id:"smoking", q:"Κάπνισμα;", type:"visual", options:[
    {id:"no",emoji:"💚",label:"Όχι",scores:{}},
    {id:"occasional",emoji:"🚬",label:"Περιστασιακά",scores:{oxidation:2,inflammation:1}},
    {id:"regular",emoji:"😤",label:"Καθημερινά",scores:{oxidation:3,inflammation:2,telomeres:2}},
    {id:"heavy",emoji:"🏭",label:"Βαρύ",scores:{oxidation:5,inflammation:3,telomeres:3}}], next:"hair" },
  // HAIR
  { id:"hair", q:"Τριχόπτωση;", type:"visual", options:[
    {id:"no",emoji:"💇",label:"Όχι",scores:{}},
    {id:"mild",emoji:"🤏",label:"Ελαφρά",scores:{hairloss:2}},
    {id:"noticeable",emoji:"😟",label:"Αισθητή",scores:{hairloss:4}},
    {id:"family",emoji:"👨‍👩‍👧",label:"Κληρονομικό",scores:{hairloss:5}}], next:"stress" },
  // STRESS
  { id:"stress", q:"Στρες;", type:"visual", options:[
    {id:"zen",emoji:"🧘",label:"Ήρεμα",scores:{}},
    {id:"normal",emoji:"😐",label:"Κανονικά",scores:{}},
    {id:"high",emoji:"😰",label:"Υψηλό",scores:{telomeres:2,oxidation:1,inflammation:1}},
    {id:"extreme",emoji:"🤯",label:"Εκρηκτικό",scores:{telomeres:3,oxidation:2,inflammation:2}}], next:"goal" },
  // GOAL
  { id:"goal", q:"Ο στόχος σας;", type:"visual", options:[
    {id:"prevention",emoji:"🛡️",label:"Πρόληψη",scores:{}},
    {id:"appearance",emoji:"✨",label:"Εμφάνιση",scores:{}},
    {id:"energy_g",emoji:"⚡",label:"Ενέργεια",scores:{}},
    {id:"disease",emoji:"🏥",label:"Υγεία",scores:{}}], next:"contact" },
  // CONTACT
  { id:"contact", q:"Σχεδόν τελειώσαμε!", sub:"Συμπληρώστε τα στοιχεία σας", type:"contact", next:"results" },
];

function getQ(id){return QS.find(x=>x.id===id)}

/* ═══ SCORING → Top 3 exams ═══ */
function calcResults(answers) {
  const sc = {};
  Object.keys(EXAMS).forEach(k => sc[k] = 0);
  Object.values(answers).forEach(a => {
    if (!a) return;
    Object.entries(a.scores || {}).forEach(([k, v]) => {
      if (sc[k] !== undefined) sc[k] += v;
    });
  });
  const total = Object.values(sc).reduce((a, b) => a + b, 0);
  const isHealthy = total <= 3;
  const sorted = Object.entries(sc).filter(([_, s]) => s > 0).sort((a, b) => b[1] - a[1]);
  const max = sorted[0]?.[1] || 1;
  let results = sorted.map(([id, score]) => ({ ...EXAMS[id], score, pct: Math.round((score / max) * 100) })).slice(0, 3);
  // If healthy, suggest preventive exams
  if (isHealthy || results.length === 0) {
    results = [EXAMS.telomeres, EXAMS.metabolism, EXAMS.oxidation].map(e => ({ ...e, score: 0, pct: 100 }));
  }
  return { results, isHealthy, total };
}

/* ═══ CONTEXT-AWARE TIPS ═══ */
function getTips(answers) {
  const smokes = answers.smoking?.id === "regular" || answers.smoking?.id === "heavy";
  const drinks = answers.alcohol?.id === "regular" || answers.alcohol?.id === "daily";
  const noEx = answers.exercise?.id === "rare" || answers.exercise?.id === "never";
  const badSleep = answers.sleep?.id === "poor" || answers.sleep?.id === "terrible";
  const highStress = answers.stress?.id === "high" || answers.stress?.id === "extreme";
  const badDiet = answers.diet?.id === "sugar" || answers.diet?.id === "poor";
  const tips = [];
  if (smokes) tips.push("Μείωση ή διακοπή καπνίσματος — #1 παράγοντας οξειδωτικού στρες");
  if (drinks) tips.push("Μείωση κατανάλωσης αλκοόλ");
  if (noEx) tips.push("Τακτική σωματική άσκηση (έστω 30' περπάτημα/μέρα)");
  if (badSleep) tips.push("Βελτίωση ποιότητας ύπνου — κρίσιμο για κυτταρική ανανέωση");
  if (highStress) tips.push("Διαχείριση στρες (meditation, αναπνοές, φύση)");
  if (badDiet) tips.push("Βελτίωση διατροφής — μείωση επεξεργασμένων τροφίμων");
  if (tips.length === 0) tips.push("Συνεχίστε τον εξαιρετικό τρόπο ζωής σας", "Ετήσιος προληπτικός έλεγχος = γνώση & δύναμη");
  return tips.slice(0, 4);
}

/* ═══ UI COMPONENTS ═══ */
function Particles(){return(<div style={{position:"fixed",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0}}>{[...Array(5)].map((_,i)=>(<div key={i} style={{position:"absolute",width:180+i*70,height:180+i*70,borderRadius:"50%",background:`radial-gradient(circle,rgba(${i%2?'196,149,58':'139,105,20'},${0.03+i*0.008}),transparent 70%)`,left:`${(i*27)%80}%`,top:`${(i*33)%70}%`,animation:`f${i%3} ${16+i*3}s ease-in-out infinite`}}/>))}</div>)}
function Ring({pct,sz=48}){const r=(sz-6)/2,c=2*Math.PI*r;return(<svg width={sz} height={sz} style={{transform:"rotate(-90deg)"}}><circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke="rgba(139,105,20,0.08)" strokeWidth="5"/><circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke="url(#rg1)" strokeWidth="5" strokeDasharray={c} strokeDashoffset={c-(pct/100)*c} strokeLinecap="round" style={{transition:"stroke-dashoffset 0.6s ease"}}/><defs><linearGradient id="rg1"><stop offset="0%" stopColor="#8B6914"/><stop offset="100%" stopColor="#C4953A"/></linearGradient></defs></svg>)}
function Card({o,sel,onClick,i,n}){const w=n<=2;return(<button onClick={onClick} style={{display:"flex",flexDirection:w?"row":"column",alignItems:"center",gap:w?14:6,padding:w?"18px 24px":"16px 10px",flex:w?"1 1 100%":"1 1 calc(50% - 6px)",minWidth:w?"100%":130,background:sel?"rgba(196,149,58,0.12)":"rgba(255,255,255,0.45)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",border:sel?"2px solid rgba(196,149,58,0.6)":"1.5px solid rgba(255,255,255,0.3)",borderRadius:18,cursor:"pointer",textAlign:w?"left":"center",fontFamily:"'Outfit',sans-serif",transition:"all 0.3s cubic-bezier(0.4,0,0.2,1)",animation:`ci 0.4s cubic-bezier(0.16,1,0.3,1) ${i*0.04}s both`,boxShadow:sel?"0 8px 32px rgba(139,105,20,0.15),inset 0 1px rgba(255,255,255,0.4)":"0 2px 12px rgba(0,0,0,0.03),inset 0 1px rgba(255,255,255,0.5)",position:"relative"}}>{sel&&<div style={{position:"absolute",top:8,right:8,width:22,height:22,borderRadius:"50%",background:"linear-gradient(135deg,#8B6914,#C4953A)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700}}>✓</div>}<span style={{fontSize:w?32:28}}>{o.emoji}</span><div><div style={{fontSize:14,fontWeight:600,color:"#1a1207"}}>{o.label}</div>{o.sub&&<div style={{fontSize:11,color:"#8B7355",marginTop:2}}>{o.sub}</div>}</div></button>)}
function Sld({q,v,onChange}){const p=((v-q.min)/(q.max-q.min))*100;return(<div><div style={{textAlign:"center",fontSize:56,fontWeight:800,fontFamily:"'Playfair Display',serif",color:"#1a1207"}}>{v}</div><div style={{textAlign:"center",fontSize:14,color:"#8B7355",marginBottom:28}}>{q.unit}</div><input type="range" min={q.min} max={q.max} step={q.step} value={v} onChange={e=>onChange(+e.target.value)} style={{width:"100%",height:10,appearance:"none",borderRadius:5,cursor:"pointer",background:`linear-gradient(90deg,#C4953A ${p}%,rgba(139,105,20,0.1) ${p}%)`}}/><style>{`input[type="range"]::-webkit-slider-thumb{appearance:none;width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#8B6914,#C4953A);box-shadow:0 2px 12px rgba(139,105,20,0.35);cursor:pointer;border:3px solid #fff}`}</style></div>)}
function CF({onSubmit}){const[f,setF]=useState({name:"",phone:"",email:""});const[e,sE]=useState({});return(<div style={{display:"flex",flexDirection:"column",gap:12}}>{[["name","Ονοματεπώνυμο *"],["phone","Τηλέφωνο *"],["email","Email (προαιρετικό)"]].map(([k,ph])=>(<input key={k} placeholder={ph} value={f[k]} onChange={ev=>setF(p=>({...p,[k]:ev.target.value}))} style={{width:"100%",padding:"16px 20px",borderRadius:14,fontSize:15,border:e[k]?"2px solid #ef4444":"1.5px solid rgba(255,255,255,0.3)",background:"rgba(255,255,255,0.45)",backdropFilter:"blur(12px)",fontFamily:"'Outfit',sans-serif",color:"#1a1207",outline:"none",boxSizing:"border-box"}}/>))}<p style={{fontSize:11,color:"#a89274"}}>🔒 Τα στοιχεία σας είναι ασφαλή.</p><button onClick={()=>{const er={};if(!f.name.trim())er.name=1;if(!f.phone.trim())er.phone=1;sE(er);if(!Object.keys(er).length)onSubmit(f)}} style={{padding:"18px",border:"none",borderRadius:16,cursor:"pointer",background:"linear-gradient(135deg,#8B6914,#C4953A)",color:"#fff",fontSize:16,fontWeight:700,fontFamily:"'Outfit',sans-serif",boxShadow:"0 8px 32px rgba(139,105,20,0.3)"}}>Δείτε τα Αποτελέσματα →</button></div>)}

function ExamCard({exam, i, isHealthy}) {
  const why = isHealthy ? exam.whyPrev : exam.whyYou;
  return (
    <div style={{padding:i===0?"22px":"16px 18px",borderRadius:18,marginBottom:14,background:i===0?"rgba(255,255,255,0.5)":"rgba(255,255,255,0.35)",backdropFilter:"blur(12px)",border:i===0?"2px solid rgba(196,149,58,0.3)":"1px solid rgba(255,255,255,0.4)",animation:`fu .4s ${i*0.12}s both`,position:"relative"}}>
      {i===0&&<div style={{position:"absolute",top:0,right:0,background:isHealthy?"linear-gradient(135deg,#16a34a,#22d3ee)":"linear-gradient(135deg,#8B6914,#C4953A)",color:"#fff",fontSize:10,fontWeight:700,padding:"5px 14px",borderRadius:"0 16px 0 10px"}}>{isHealthy?"ΠΡΟΛΗΠΤΙΚΗ":"#1 ΠΡΟΤΕΙΝΟΜΕΝΗ"}</div>}
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
        <span style={{fontSize:i===0?32:24}}>{exam.icon}</span>
        <div><h3 style={{margin:0,fontSize:i===0?17:14,fontWeight:700,color:"#1a1207"}}>{exam.name}</h3><p style={{margin:"2px 0 0",fontSize:12,color:"#8B7355",fontStyle:"italic"}}>{exam.sub}</p></div>
      </div>
      {!isHealthy&&<div style={{height:5,borderRadius:3,background:"rgba(139,105,20,0.08)",marginBottom:10}}><div style={{width:`${exam.pct}%`,height:"100%",borderRadius:3,background:`linear-gradient(90deg,${exam.color}88,${exam.color})`,transition:"width 0.8s"}}/></div>}
      <p style={{fontSize:13,color:"#5C4510",lineHeight:1.5,marginBottom:10}}>{exam.shortDesc}</p>
      <div style={{padding:"12px 14px",borderRadius:10,background:isHealthy?"rgba(22,163,74,0.04)":"rgba(139,105,20,0.04)",border:isHealthy?"1px solid rgba(22,163,74,0.1)":"1px solid rgba(139,105,20,0.08)"}}>
        <div style={{fontSize:11,fontWeight:700,color:isHealthy?"#16a34a":"#8B6914",marginBottom:4}}>{isHealthy?"🛡️ Γιατί αξίζει προληπτικά:":"🎯 Γιατί σας αφορά:"}</div>
        <p style={{fontSize:12,color:"#5C4510",lineHeight:1.5,margin:0}}>{why}</p>
      </div>
    </div>
  );
}

/* ═══ MAIN ═══ */
export default function QuizV1(){
  const[cur,setCur]=useState("age");const[ans,setAns]=useState({});const[sv,setSv]=useState(40);const[ms,setMs]=useState([]);const[done,setDone]=useState(false);const[ct,setCt]=useState(null);const[hist,setHist]=useState(["age"]);const[sn,setSn]=useState(1);const ref=useRef(null);
  const q=getQ(cur),tot=14;
  useEffect(()=>{ref.current?.scrollTo({top:0,behavior:"smooth"})},[cur,done]);
  const go=(nx,a)=>{setAns(p=>({...p,[cur]:a}));setMs([]);if(nx==="results")setDone(true);else{setHist(h=>[...h,nx]);setCur(nx);setSn(s=>s+1)}};
  const back=()=>{if(hist.length>1){const h=[...hist];h.pop();setHist(h);setCur(h[h.length-1]);setSn(s=>Math.max(1,s-1));setDone(false)}};
  const {results,isHealthy}=done?calcResults(ans):{results:[],isHealthy:false};
  const tips=done?getTips(ans):[];
  const pct=Math.round((sn/tot)*100);

  return(<><style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap');@keyframes ci{from{opacity:0;transform:translateY(20px) scale(.96)}to{opacity:1;transform:none}}@keyframes fu{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}@keyframes f0{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,-40px)}}@keyframes f1{0%,100%{transform:translate(0,0)}50%{transform:translate(-20px,30px)}}@keyframes f2{0%,100%{transform:translate(0,0)}50%{transform:translate(40px,20px)}}*{box-sizing:border-box;margin:0;padding:0}button:active{transform:scale(.97)!important}input:focus{border-color:rgba(196,149,58,.5)!important;box-shadow:0 0 0 4px rgba(196,149,58,.1)}::-webkit-scrollbar{width:0}`}</style>
  <div ref={ref} style={{minHeight:"100vh",position:"relative",overflow:"hidden",background:"linear-gradient(170deg,#faf6ee 0%,#f0e8d6 35%,#e8dcc6 70%,#dfd2b8 100%)",fontFamily:"'Outfit',sans-serif"}}><Particles/>
  <div style={{position:"relative",zIndex:1,maxWidth:500,margin:"0 auto",padding:"24px 18px 48px"}}>

  {/* Header */}
  <div style={{textAlign:"center",marginBottom:28}}>
    <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"7px 18px",borderRadius:40,background:"rgba(255,255,255,0.4)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.5)",marginBottom:14}}><span style={{fontSize:16}}>🧬</span><span style={{fontSize:11,fontWeight:700,color:"#8B6914",letterSpacing:".08em",textTransform:"uppercase"}}>Dr. Μαρία Θανάσουλα</span></div>
    <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:done?24:22,fontWeight:800,color:"#1a1207",lineHeight:1.15}}>{done?(isHealthy?"Εξαιρετική Κατάσταση! 🌟":"Τα Αποτελέσματά σας"):"Ποια Εξέταση Ταιριάζει σε Εσάς;"}</h1>
    {!done&&<p style={{fontSize:13,color:"#8B7355",marginTop:8}}>Απαντήστε σε λίγες ερωτήσεις · 2 λεπτά</p>}
  </div>

  {/* Progress */}
  {!done&&<div style={{display:"flex",alignItems:"center",gap:14,marginBottom:28,padding:"12px 18px",borderRadius:16,background:"rgba(255,255,255,0.35)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.4)"}}><Ring pct={pct}/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:"#1a1207"}}>Ερώτηση {sn}/{tot}</div><div style={{height:4,borderRadius:2,background:"rgba(139,105,20,0.08)",marginTop:6}}><div style={{height:"100%",borderRadius:2,background:"linear-gradient(90deg,#8B6914,#C4953A)",width:`${pct}%`,transition:"width .5s"}}/></div></div><span style={{fontSize:13,fontWeight:700,color:"#C4953A"}}>{pct}%</span></div>}
  {!done&&hist.length>1&&<button onClick={back} style={{background:"rgba(255,255,255,0.3)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.4)",borderRadius:10,padding:"6px 14px",cursor:"pointer",color:"#8B7355",fontSize:13,marginBottom:16}}>← Πίσω</button>}

  {/* Questions */}
  {!done&&q&&q.type!=="contact"?(<div key={cur} style={{animation:"fu .4s both"}}>
    <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:"#1a1207",marginBottom:q.sub?4:18}}>{q.q}</h2>
    {q.sub&&<p style={{fontSize:13,color:"#8B7355",marginBottom:18}}>{q.sub}</p>}
    {q.type==="slider"&&<><Sld q={q} v={sv} onChange={setSv}/><button onClick={()=>go(q.next,{value:sv,scores:q.scoring(sv)})} style={{width:"100%",padding:"18px",marginTop:20,border:"none",borderRadius:16,background:"linear-gradient(135deg,#8B6914,#C4953A)",color:"#fff",fontSize:16,fontWeight:700,cursor:"pointer",boxShadow:"0 8px 32px rgba(139,105,20,0.25)"}}>Συνέχεια →</button></>}
    {q.type==="visual"&&<div style={{display:"flex",flexWrap:"wrap",gap:10}}>{q.options.map((o,i)=><Card key={o.id} o={o} i={i} n={q.options.length} sel={false} onClick={()=>go(o.next||q.next,o)}/>)}</div>}
    {q.type==="multi"&&<><div style={{display:"flex",flexWrap:"wrap",gap:10}}>{q.options.map((o,i)=><Card key={o.id} o={o} i={i} n={q.options.length} sel={ms.some(x=>x.id===o.id)} onClick={()=>setMs(p=>p.some(x=>x.id===o.id)?p.filter(x=>x.id!==o.id):[...p,o])}/>)}</div>{ms.length>0&&<button onClick={()=>{const m={};ms.forEach(o=>Object.entries(o.scores||{}).forEach(([k,v])=>{m[k]=(m[k]||0)+v}));go(q.next,{scores:m,ids:ms.map(o=>o.id)})}} style={{width:"100%",padding:"16px",marginTop:14,border:"none",borderRadius:16,background:"linear-gradient(135deg,#8B6914,#C4953A)",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer"}}>Συνέχεια ({ms.length}) →</button>}</>}
  </div>):!done&&q?.type==="contact"?(<div style={{animation:"fu .4s both"}}><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:"#1a1207",marginBottom:6}}>{q.q}</h2><p style={{fontSize:13,color:"#8B7355",marginBottom:20}}>{q.sub}</p><CF onSubmit={i=>{setCt(i);setDone(true)}}/></div>):done&&(
  /* ═══ RESULTS ═══ */
  <div>
    {/* Healthy banner */}
    {isHealthy&&<div style={{padding:"24px",borderRadius:22,marginBottom:18,textAlign:"center",background:"rgba(22,163,74,0.06)",border:"2px solid rgba(22,163,74,0.12)",backdropFilter:"blur(12px)",animation:"fu .5s both"}}>
      <img src="https://api.dicebear.com/9.x/adventurer?seed=healthy&backgroundColor=bbf7d0" alt="" width="100" height="100" style={{borderRadius:"50%",border:"3px solid rgba(255,255,255,0.6)",marginBottom:12}}/>
      <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:"#16a34a",margin:"8px 0"}}>Εξαιρετική Κατάσταση!</h3>
      <p style={{fontSize:13,color:"#5C4510",lineHeight:1.5}}>Οι συνήθειές σας δείχνουν ότι φροντίζετε τον οργανισμό σας. Ωστόσο, πολλοί παράγοντες γήρανσης — γενετική, κρυφές ελλείψεις, σιωπηλή φλεγμονή — δεν εκδηλώνονται με συμπτώματα. <strong>Τώρα που είστε καλά = ιδανική στιγμή για baseline.</strong></p>
    </div>}

    {ct&&!isHealthy&&<p style={{fontSize:14,color:"#5C4510",marginBottom:18,textAlign:"center",animation:"fu .4s both"}}>{ct.name?.split(" ")[0]}, με βάση τις απαντήσεις σας:</p>}

    {/* Exam cards with why explanations */}
    {results.map((ex,i)=><ExamCard key={ex.id} exam={ex} i={i} isHealthy={isHealthy}/>)}

    {/* Context-aware tips */}
    <div style={{padding:"20px",borderRadius:20,marginBottom:24,background:"rgba(22,163,74,0.04)",border:"1.5px solid rgba(22,163,74,0.1)",animation:"fu .5s .5s both"}}><h4 style={{fontSize:15,fontWeight:700,color:"#16a34a",marginBottom:12,fontFamily:"'Playfair Display',serif"}}>💡 Τι Μπορείτε να Κάνετε</h4>{tips.map((t,i)=>(<div key={i} style={{display:"flex",gap:10,marginBottom:8}}><span style={{color:"#16a34a",fontWeight:700}}>✓</span><span style={{fontSize:13,color:"#1a1207",lineHeight:1.5}}>{t}</span></div>))}</div>

    {/* CTA */}
    <div style={{textAlign:"center",padding:"28px 24px",borderRadius:24,background:"rgba(255,255,255,0.4)",backdropFilter:"blur(16px)",border:"1.5px solid rgba(255,255,255,0.5)",animation:"fu .5s .6s both"}}><p style={{fontFamily:"'Playfair Display',serif",fontSize:19,fontWeight:700,color:"#1a1207",marginBottom:8}}>{isHealthy?"Επιβεβαιώστε το εργαστηριακά":"Κλείστε ραντεβού"}</p><p style={{fontSize:13,color:"#8B7355",marginBottom:18}}>{isHealthy?"Η ιδανική στιγμή για baseline check-up":"Η Dr. Θανάσουλα θα σας καθοδηγήσει"}</p><a href="tel:+306973961749" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"16px 30px",borderRadius:16,textDecoration:"none",background:"linear-gradient(135deg,#8B6914,#C4953A)",color:"#fff",fontSize:17,fontWeight:700,boxShadow:"0 8px 32px rgba(139,105,20,0.3)"}}>📞 697 39 61 749</a><p style={{fontSize:11,color:"#a89274",marginTop:10}}>Ηρώδου Αττικού 7, Κηφισιά</p></div>

    <button onClick={()=>{setCur("age");setAns({});setSv(40);setMs([]);setDone(false);setCt(null);setHist(["age"]);setSn(1)}} style={{display:"block",margin:"20px auto 0",padding:"10px 20px",background:"rgba(255,255,255,0.3)",border:"1px solid rgba(255,255,255,0.4)",borderRadius:12,color:"#8B7355",fontSize:13,cursor:"pointer"}}>↺ Ξεκινήστε ξανά</button>
    <div style={{display:"flex",justifyContent:"center",gap:12,marginTop:22,flexWrap:"wrap"}}>{["🎓 Oxford PhD","🔬 18 Publications","🏥 Κηφισιά"].map(b=>(<span key={b} style={{fontSize:11,color:"#8B7355",padding:"5px 12px",borderRadius:16,background:"rgba(255,255,255,0.3)"}}>{b}</span>))}</div>
  </div>)}

  <div style={{textAlign:"center",marginTop:36,paddingTop:16,borderTop:"1px solid rgba(139,105,20,0.06)"}}><p style={{fontSize:10,color:"#a89274"}}>© {new Date().getFullYear()} Dr. Μαρία Θανάσουλα<br/>Ενδεικτικά αποτελέσματα — τελική αξιολόγηση από τον ειδικό.</p></div>
  </div></div></>);
}
