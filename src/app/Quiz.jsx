"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════
   ARCHETYPES - Based on 12 Hallmarks of Aging (Cell, 2023)
   ═══════════════════════════════════════════════════ */
const ARCHETYPES = {
  inflammager: {
    id: "inflammager", name: "Ο Σιωπηλός Φλεγμονιστής", nameEn: "The Silent Inflammager",
    emoji: "🔥", color: "#ef4444", gradient: "linear-gradient(135deg, #dc2626, #f97316)",
    hallmarks: "Χρόνια Φλεγμονή · Διακυτταρική Επικοινωνία",
    description: "Ο οργανισμός σας βρίσκεται σε «σιωπηλή φλεγμονή» — χαμηλής έντασης αλλά μόνιμη. Επιταχύνει τη γήρανση χωρίς εμφανή συμπτώματα.",
    risk: "Η χρόνια φλεγμονή συμβάλλει σε 7/10 κυριότερες αιτίες θανάτου στον δυτικό κόσμο.",
    exams: ["Έλεγχος Χρόνιας Φλεγμονής", "Εξετάσεις Μεταβολισμού", "Έλεγχος Οξειδωτικού Στρες"],
    tips: ["Αντιφλεγμονώδης διατροφή (ωμέγα-3, κουρκουμάς)", "Μείωση επεξεργασμένων τροφίμων", "Διαχείριση στρες & βελτίωση ύπνου"],
  },
  oxidizer: {
    id: "oxidizer", name: "Ο Οξειδωμένος Μαχητής", nameEn: "The Oxidized Warrior",
    emoji: "⚔️", color: "#ea580c", gradient: "linear-gradient(135deg, #ea580c, #eab308)",
    hallmarks: "Μιτοχονδριακή Δυσλειτουργία · Οξειδωτικό Στρες",
    description: "Ελεύθερες ρίζες βομβαρδίζουν τα κύτταρά σας χωρίς επαρκή αντιοξειδωτική προστασία.",
    risk: "Συνδέεται με πρόωρη γήρανση δέρματος, καρδιαγγειακά και νευροεκφυλιστικές παθήσεις.",
    exams: ["Έλεγχος Οξειδωτικού Στρες", "Ανάλυση Τελομερών", "Εξέταση AGEs"],
    tips: ["Αύξηση αντιοξειδωτικών (A, C, E)", "Μείωση αλκοόλ & καπνίσματος", "Τακτική άσκηση μέτριας έντασης"],
  },
  metabolic: {
    id: "metabolic", name: "Ο Μεταβολικός Κοιμώμενος", nameEn: "The Metabolic Sleeper",
    emoji: "🔋", color: "#16a34a", gradient: "linear-gradient(135deg, #16a34a, #22d3ee)",
    hallmarks: "Απορρύθμιση Θρεπτικής Αίσθησης · Μιτοχονδριακή Δυσλειτουργία",
    description: "Ο μεταβολισμός σας λειτουργεί κάτω από τις δυνατότητές του. Κρυφές ελλείψεις μπλοκάρουν κυτταρική ανανέωση.",
    risk: "Συνδέεται με διαβήτη τύπου 2, παχυσαρκία, καρδιαγγειακά και σαρκοπενία.",
    exams: ["Εξετάσεις Μεταβολισμού", "Ανάλυση Τελομερών", "Ανάλυση Μικροβιώματος"],
    tips: ["Εξατομικευμένο πλάνο συμπληρωμάτων", "Σταθερό πρόγραμμα γευμάτων", "Αύξηση πρωτεΐνης"],
  },
  glycator: {
    id: "glycator", name: "Ο Γλυκός Καταστροφέας", nameEn: "The Sweet Destroyer",
    emoji: "🍯", color: "#ca8a04", gradient: "linear-gradient(135deg, #ca8a04, #f97316)",
    hallmarks: "Γλυκοζυλίωση (AGEs) · Απώλεια Πρωτεοστασίας",
    description: "Σάκχαρα + πρωτεΐνες = AGEs που καταστρέφουν κολλαγόνο, ελαστίνη και αγγεία.",
    risk: "AGEs → πρόωρη γήρανση δέρματος, διαβήτης, αθηροσκλήρωση, Alzheimer.",
    exams: ["Εξέταση Γλυκοζυλίωσης (AGEs)", "Έλεγχος Οξειδωτικού Στρες", "Εξετάσεις Μεταβολισμού"],
    tips: ["Διατροφή χαμηλού γλυκαιμικού δείκτη", "Αποφυγή τηγανίσματος σε υψηλή θερμοκρασία", "Αντιοξειδωτική ενίσχυση"],
  },
  gutager: {
    id: "gutager", name: "Ο Εντερικός Αναρχικός", nameEn: "The Gut Anarchist",
    emoji: "🦠", color: "#2563eb", gradient: "linear-gradient(135deg, #2563eb, #7c3aed)",
    hallmarks: "Δυσβίωση · Χρόνια Φλεγμονή",
    description: "Το εντερικό μικροβίωμα έχει χάσει την ισορροπία. Επηρεάζει ανοσοποιητικό, διάθεση, ενέργεια, βάρος.",
    risk: "Δυσβίωση → αυτοάνοσα, κατάθλιψη, παχυσαρκία, νευροεκφυλιστικές μέσω άξονα εντέρου-εγκεφάλου.",
    exams: ["Ανάλυση Εντερικού Μικροβιώματος", "Έλεγχος Χρόνιας Φλεγμονής", "Εξετάσεις Μεταβολισμού"],
    tips: ["Αύξηση φυτικών ινών & ζυμωμένων τροφίμων", "Εξατομικευμένα προβιοτικά", "Μείωση επεξεργασμένων τροφών"],
  },
  chrono: {
    id: "chrono", name: "Ο Χρονο-Ταξιδιώτης", nameEn: "The Chrono-Traveler",
    emoji: "⏳", color: "#a16207", gradient: "linear-gradient(135deg, #92400e, #d97706)",
    hallmarks: "Βράχυνση Τελομερών · Κυτταρική Γήρανση",
    description: "Τα τελομερή σας μικραίνουν ταχύτερα. Η βιολογική ηλικία πιθανώς ξεπερνά τη χρονολογική.",
    risk: "Επιταχυνόμενη βράχυνση τελομερών → κάθε χρόνιο νόσημα γήρανσης.",
    exams: ["Ανάλυση Τελομερών (Βιολογική Ηλικία)", "Εξετάσεις Μεταβολισμού", "Έλεγχος Οξειδωτικού Στρες"],
    tips: ["Διαχείριση χρόνιου στρες", "Μεσογειακή διατροφή", "Τακτική αερόβια άσκηση"],
  }
};

const DIMS = {
  inflammation: { archetypes: { inflammager: 1.0, oxidizer: 0.3, gutager: 0.4 } },
  oxidation: { archetypes: { oxidizer: 1.0, inflammager: 0.3, chrono: 0.3, glycator: 0.3 } },
  metabolism: { archetypes: { metabolic: 1.0, gutager: 0.3, glycator: 0.2 } },
  glycation: { archetypes: { glycator: 1.0, oxidizer: 0.2, chrono: 0.2 } },
  gut: { archetypes: { gutager: 1.0, inflammager: 0.3, metabolic: 0.3 } },
  telomere: { archetypes: { chrono: 1.0, oxidizer: 0.2, inflammager: 0.2 } },
};

/* ═══════════════════════════════════════════════════
   QUESTIONS — Branching, gender-specific, weighted 0-100
   Heavy (8-12): chronic/autoimmune/smoking  Medium (4-6): lifestyle  Light (2-4): habits
   ═══════════════════════════════════════════════════ */
const QS = [
  { id:"age", q:"Πόσο χρονών είστε;", type:"slider", min:25, max:70, step:1, unit:"ετών",
    scoring: v => v>=55?{telomere:6,inflammation:4,oxidation:4}:v>=45?{telomere:4,inflammation:2,oxidation:2}:v>=35?{telomere:2}:{},
    next:"gender" },
  { id:"gender", q:"Φύλο", type:"visual", options:[
    {id:"female",emoji:"👩",label:"Γυναίκα",scores:{},next:"concern_f"},
    {id:"male",emoji:"👨",label:"Άνδρας",scores:{},next:"concern_m"},
  ]},
  { id:"concern_f", q:"Ποια είναι η κύρια ανησυχία σας;", sub:"Επιλέξτε αυτό που σας απασχολεί περισσότερο", type:"visual", options:[
    {id:"aging",emoji:"⏳",label:"Γήρανση & πρόληψη",scores:{},next:"skin"},
    {id:"energy",emoji:"🔋",label:"Κούραση & ενέργεια",scores:{metabolism:6},next:"symptoms"},
    {id:"weight",emoji:"⚖️",label:"Διαχείριση βάρους",scores:{metabolism:8,gut:3},next:"symptoms"},
    {id:"metabolic",emoji:"🔬",label:"Μεταβολικές διαταραχές",scores:{metabolism:8,inflammation:4},next:"symptoms"},
    {id:"autoimmune",emoji:"🔁",label:"Αυτοάνοσο / χρόνιο νόσημα",scores:{inflammation:10,gut:5,oxidation:4},next:"symptoms"},
    {id:"gi",emoji:"🫁",label:"Γαστρεντερικά",scores:{gut:8,inflammation:3},next:"gi_detail"},
    {id:"skin_hair",emoji:"✨",label:"Δέρμα & μαλλιά",scores:{},next:"skin_hair_detail"},
    {id:"menopause",emoji:"🌸",label:"Εμμηνόπαυση",scores:{metabolism:6,inflammation:4,oxidation:3,telomere:3},next:"symptoms"},
    {id:"general",emoji:"🎯",label:"Γενική βελτίωση υγείας",scores:{},next:"skin"},
  ]},
  { id:"concern_m", q:"Ποια είναι η κύρια ανησυχία σας;", sub:"Επιλέξτε αυτό που σας απασχολεί περισσότερο", type:"visual", options:[
    {id:"aging",emoji:"⏳",label:"Γήρανση & πρόληψη",scores:{},next:"skin"},
    {id:"energy",emoji:"🔋",label:"Κούραση & ενέργεια",scores:{metabolism:6},next:"symptoms"},
    {id:"weight",emoji:"⚖️",label:"Διαχείριση βάρους",scores:{metabolism:8,gut:3},next:"symptoms"},
    {id:"metabolic",emoji:"🔬",label:"Μεταβολικές διαταραχές",scores:{metabolism:8,inflammation:4},next:"symptoms"},
    {id:"autoimmune",emoji:"🔁",label:"Αυτοάνοσο / χρόνιο νόσημα",scores:{inflammation:10,gut:5,oxidation:4},next:"symptoms"},
    {id:"gi",emoji:"🫁",label:"Γαστρεντερικά",scores:{gut:8,inflammation:3},next:"gi_detail"},
    {id:"skin_hair",emoji:"✨",label:"Δέρμα & μαλλιά",scores:{},next:"skin_hair_detail"},
    {id:"libido",emoji:"💪",label:"Λίμπιντο & σεξουαλική υγεία",scores:{metabolism:6,inflammation:3,telomere:3},next:"symptoms"},
    {id:"general",emoji:"🎯",label:"Γενική βελτίωση υγείας",scores:{},next:"skin"},
  ]},
  { id:"symptoms", q:"Τι είδους συμπτώματα αντιμετωπίζετε;", sub:"Επιλέξτε όσα ισχύουν", type:"multi", options:[
    {id:"fatigue",emoji:"😴",label:"Χρόνια κούραση",scores:{metabolism:6,inflammation:2}},
    {id:"brain_fog",emoji:"🧠",label:"Brain fog",scores:{metabolism:4,gut:2}},
    {id:"mood",emoji:"🎭",label:"Μεταπτώσεις διάθεσης",scores:{gut:4,inflammation:2}},
    {id:"joint",emoji:"🦴",label:"Πόνοι αρθρώσεων",scores:{inflammation:6,oxidation:2}},
    {id:"skin_issues",emoji:"🪞",label:"Προβλήματα δέρματος",scores:{glycation:4,oxidation:2}},
    {id:"weight_gain",emoji:"⚖️",label:"Αύξηση βάρους",scores:{metabolism:6,gut:2}},
    {id:"hormonal",emoji:"🔄",label:"Ορμονικές διαταραχές",scores:{metabolism:4,inflammation:4}},
    {id:"hair_thin",emoji:"💇",label:"Αραίωση μαλλιών",scores:{hairloss:6}},
  ], next:"skin" },
  { id:"gi_detail", q:"Τι γαστρεντερικά προβλήματα;", sub:"Επιλέξτε όσα ισχύουν", type:"multi", options:[
    {id:"bloating",emoji:"🫧",label:"Φούσκωμα & αέρια",scores:{gut:6}},
    {id:"irregular",emoji:"🔄",label:"Ακανόνιστη κένωση",scores:{gut:4}},
    {id:"food_sens",emoji:"🚫",label:"Ευαισθησίες τροφών",scores:{gut:6,inflammation:4}},
    {id:"reflux",emoji:"🔥",label:"Καούρα / παλινδρόμηση",scores:{gut:4,inflammation:2}},
    {id:"ibs",emoji:"🚨",label:"ΣΕΕ",scores:{gut:10,inflammation:6}},
    {id:"autoimmune_gi",emoji:"🔁",label:"Crohn / Colitis",scores:{gut:10,inflammation:8,oxidation:4}},
  ], next:"skin" },
  { id:"skin_hair_detail", q:"Τι σας απασχολεί;", type:"visual", options:[
    {id:"wrinkles",emoji:"〰️",label:"Ρυτίδες & γήρανση",sub:"Χαλάρωση, κηλίδες",scores:{glycation:6,oxidation:4,telomere:2},next:"skin"},
    {id:"hair_loss",emoji:"💇",label:"Τριχόπτωση",sub:"Αραίωση μαλλιών",scores:{hairloss:8},next:"skin"},
    {id:"acne",emoji:"😣",label:"Ακμή / δερματίτιδα",scores:{gut:4,inflammation:4},next:"skin"},
    {id:"dull",emoji:"💧",label:"Θαμπό δέρμα",sub:"Αφυδάτωση",scores:{oxidation:4,glycation:2},next:"skin"},
  ]},
  { id:"skin", q:"Γενικά πώς είναι το δέρμα σας;", type:"visual", options:[
    {id:"great",emoji:"✨",label:"Λαμπερό",sub:"Σφριγηλό & υγιές",scores:{}},
    {id:"ok",emoji:"🙂",label:"Μια χαρά",sub:"Μικρά σημάδια",scores:{}},
    {id:"aging",emoji:"〰️",label:"Σημάδια γήρανσης",scores:{glycation:5,oxidation:3,telomere:2}},
    {id:"bad",emoji:"😔",label:"Με ανησυχεί",sub:"Φαίνομαι μεγαλύτερη/ος",scores:{glycation:7,oxidation:5,telomere:3}},
  ], next:"diet" },
  { id:"diet", q:"Πώς είναι η διατροφή σας;", type:"visual", options:[
    {id:"great",emoji:"🥗",label:"Ισορροπημένη",sub:"Φρούτα, λαχανικά, σωστές αναλογίες",scores:{}},
    {id:"ok",emoji:"🍽️",label:"Αρκετά καλή",sub:"Κάποιες παρεκκλίσεις",scores:{}},
    {id:"sugar",emoji:"🍰",label:"Πολλά γλυκά",sub:"Ζάχαρη, σνακ, αναψυκτικά",scores:{glycation:5,metabolism:2,inflammation:2}},
    {id:"poor",emoji:"🍔",label:"Ακανόνιστη / fast food",scores:{metabolism:4,gut:2,inflammation:2}},
  ], next:"exercise" },
  { id:"exercise", q:"Πόσο γυμνάζεστε;", type:"visual", options:[
    {id:"daily",emoji:"🏃",label:"Τακτικά",sub:"3+ φορές/βδομάδα",scores:{}},
    {id:"some",emoji:"🚶",label:"Μέτρια",sub:"1-2 φορές/βδομάδα",scores:{}},
    {id:"rare",emoji:"🛋️",label:"Σπάνια",scores:{metabolism:3,inflammation:2,telomere:2}},
    {id:"never",emoji:"🪑",label:"Καθόλου",sub:"Καθιστική ζωή",scores:{metabolism:5,inflammation:3,telomere:3,oxidation:2}},
  ], next:"sleep" },
  { id:"sleep", q:"Ποιότητα ύπνου;", type:"visual", options:[
    {id:"great",emoji:"😴",label:"Εξαιρετική",sub:"7-9 ώρες",scores:{}},
    {id:"ok",emoji:"🛌",label:"Αρκετά καλή",scores:{}},
    {id:"poor",emoji:"🌙",label:"Προβληματική",sub:"Δυσκολία / αφυπνίσεις",scores:{oxidation:3,inflammation:3,metabolism:3,telomere:2}},
    {id:"terrible",emoji:"👁️",label:"Πολύ κακή",sub:"Χρόνια αϋπνία",scores:{oxidation:5,inflammation:5,metabolism:4,telomere:3}},
  ], next:"alcohol" },
  { id:"alcohol", q:"Αλκοόλ;", type:"visual", options:[
    {id:"none",emoji:"🚫",label:"Καθόλου",scores:{}},
    {id:"social",emoji:"🥂",label:"Κοινωνικά",sub:"1-2/μήνα",scores:{}},
    {id:"regular",emoji:"🍷",label:"Τακτικά",sub:"2-3/βδομάδα",scores:{oxidation:3,metabolism:2,inflammation:2}},
    {id:"daily",emoji:"🍺",label:"Καθημερινά",scores:{oxidation:5,metabolism:3,inflammation:3,telomere:2}},
  ], next:"smoking" },
  { id:"smoking", q:"Κάπνισμα;", type:"visual", options:[
    {id:"no",emoji:"💚",label:"Όχι",scores:{}},
    {id:"occasional",emoji:"🚬",label:"Περιστασιακά",scores:{oxidation:3,inflammation:2}},
    {id:"regular",emoji:"😤",label:"Καθημερινά",scores:{oxidation:7,inflammation:4,telomere:4}},
    {id:"heavy",emoji:"🏭",label:"Βαρύ",sub:"1+ πακέτο/μέρα",scores:{oxidation:10,inflammation:6,telomere:6,metabolism:2}},
  ], next:"hair" },
  { id:"hair", q:"Τριχόπτωση;", type:"visual", options:[
    {id:"no",emoji:"💇",label:"Όχι",scores:{}},
    {id:"mild",emoji:"🤏",label:"Ελαφρά",scores:{hairloss:3}},
    {id:"noticeable",emoji:"😟",label:"Αισθητή",scores:{hairloss:7}},
    {id:"family",emoji:"👨‍👩‍👧",label:"Κληρονομικό",scores:{hairloss:9}},
  ], next:"stress" },
  { id:"stress", q:"Επίπεδα στρες;", type:"visual", options:[
    {id:"zen",emoji:"🧘",label:"Ήρεμα",scores:{}},
    {id:"normal",emoji:"😐",label:"Κανονικά",scores:{}},
    {id:"high",emoji:"😰",label:"Υψηλό",scores:{telomere:4,oxidation:3,inflammation:3}},
    {id:"extreme",emoji:"🤯",label:"Εκρηκτικό",scores:{telomere:7,oxidation:5,inflammation:5,gut:2}},
  ], next:"goal" },
  { id:"goal", q:"Ποιος είναι ο στόχος σας;", type:"visual", options:[
    {id:"prevention",emoji:"🛡️",label:"Πρόληψη",scores:{}},
    {id:"appearance",emoji:"✨",label:"Εμφάνιση",scores:{}},
    {id:"energy_goal",emoji:"⚡",label:"Ενέργεια",scores:{}},
    {id:"disease",emoji:"🏥",label:"Υγεία",scores:{}},
  ], next:"contact" },
  { id:"contact", q:"Σχεδόν τελειώσαμε!", sub:"Συμπληρώστε τα στοιχεία σας", type:"contact", next:"results" },
];

function getQ(id){return QS.find(x=>x.id===id)}

/* ═══ SCORING 0-100 ═══ */
function calc(answers){
  const dim={inflammation:0,oxidation:0,metabolism:0,glycation:0,gut:0,telomere:0};let hl=0;
  Object.values(answers).forEach(a=>{if(!a)return;Object.entries(a.scores||{}).forEach(([k,v])=>{if(k==="hairloss"){hl+=v;return}if(dim[k]!==undefined)dim[k]+=v;});});
  const raw=Object.values(dim).reduce((a,b)=>a+b,0);
  const score100=Math.min(100,Math.round((raw/120)*100));
  const isHealthy=score100<=8;
  const arch={};Object.keys(ARCHETYPES).forEach(a=>arch[a]=0);
  Object.entries(dim).forEach(([d,s])=>{const m=DIMS[d];if(!m)return;Object.entries(m.archetypes).forEach(([a,w])=>{arch[a]+=s*w;});});
  const sorted=Object.entries(arch).sort((a,b)=>b[1]-a[1]);
  const age=answers.age?.value||40;
  let off;if(score100<=8)off=-Math.max(1,Math.round(4-score100/3));else if(score100<=25)off=Math.round((score100-8)/17*3);else if(score100<=55)off=Math.round(3+(score100-25)/30*5);else off=Math.round(8+(score100-55)/45*7);
  const bioAge=Math.max(age-5,Math.min(age+15,age+off));
  return{
    archetype:isHealthy?{id:"healthy",name:"Ο Ακμαίος Οργανισμός",nameEn:"The Thriving Body",emoji:"🌟",color:"#16a34a",gradient:"linear-gradient(135deg,#16a34a,#22d3ee)",hallmarks:"Ισορροπημένοι Δείκτες",description:"Συγχαρητήρια! Φροντίζετε εξαιρετικά τον οργανισμό σας. Ωστόσο πολλοί παράγοντες γήρανσης — γενετική προδιάθεση, κρυφές ελλείψεις, σιωπηλή φλεγμονή — δεν εκδηλώνονται με συμπτώματα.",risk:"Το 60% των παραγόντων γήρανσης είναι «σιωπηλοί». Τώρα που είστε καλά είναι η ιδανική στιγμή για baseline check-up.",exams:["Ανάλυση Τελομερών — Baseline βιολογική ηλικία","Εξετάσεις Μεταβολισμού — Κρυφές ελλείψεις","Έλεγχος Οξειδωτικού Στρες — Σιωπηλή ανισορροπία"],tips:["Συνεχίστε τον εξαιρετικό τρόπο ζωής","Ετήσιος προληπτικός έλεγχος","Γνώση βιολογικής ηλικίας = κίνητρο"]}:ARCHETYPES[sorted[0][0]],
    bioAge,chronoAge:age,bioAgeDiff:bioAge-age,dim,hl,isHealthy,score100,
  };
}

/* ═══ PARTICLES ═══ */
function Particles(){return(<div style={{position:"fixed",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0}}>{[...Array(6)].map((_,i)=>(<div key={i} style={{position:"absolute",width:200+i*80,height:200+i*80,borderRadius:"50%",background:`radial-gradient(circle,rgba(${i%2?'196,149,58':'139,105,20'},${0.04+i*0.01}),transparent 70%)`,left:`${(i*23)%80}%`,top:`${(i*31)%70}%`,animation:`float${i%3} ${15+i*3}s ease-in-out infinite`}}/>))}</div>)}

/* ═══ PROGRESS RING ═══ */
function Ring({pct,size=48}){const r=(size-6)/2,c=2*Math.PI*r;return(<svg width={size} height={size} style={{transform:"rotate(-90deg)"}}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(139,105,20,0.08)" strokeWidth="5"/><circle cx={size/2} cy={size/2} r={r} fill="none" stroke="url(#rg)" strokeWidth="5" strokeDasharray={c} strokeDashoffset={c-(pct/100)*c} strokeLinecap="round" style={{transition:"stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1)"}}/><defs><linearGradient id="rg"><stop offset="0%" stopColor="#8B6914"/><stop offset="100%" stopColor="#C4953A"/></linearGradient></defs></svg>)}

/* ═══ OPTION CARD ═══ */
function Card({opt,sel,onClick,idx,total}){const wide=total<=2;return(<button onClick={onClick} style={{display:"flex",flexDirection:wide?"row":"column",alignItems:"center",gap:wide?14:6,padding:wide?"18px 24px":"16px 10px",flex:wide?"1 1 100%":"1 1 calc(50% - 6px)",minWidth:wide?"100%":130,background:sel?"rgba(196,149,58,0.12)":"rgba(255,255,255,0.45)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",border:sel?"2px solid rgba(196,149,58,0.6)":"1.5px solid rgba(255,255,255,0.3)",borderRadius:18,cursor:"pointer",textAlign:wide?"left":"center",fontFamily:"'Outfit',sans-serif",transition:"all 0.3s cubic-bezier(0.4,0,0.2,1)",animation:`cardIn 0.4s cubic-bezier(0.16,1,0.3,1) ${idx*0.04}s both`,boxShadow:sel?"0 8px 32px rgba(139,105,20,0.15),inset 0 1px 0 rgba(255,255,255,0.4)":"0 2px 12px rgba(0,0,0,0.03),inset 0 1px 0 rgba(255,255,255,0.5)",position:"relative",overflow:"hidden"}}>{sel&&<div style={{position:"absolute",top:8,right:8,width:22,height:22,borderRadius:"50%",background:"linear-gradient(135deg,#8B6914,#C4953A)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700}}>✓</div>}<span style={{fontSize:wide?32:28,lineHeight:1}}>{opt.emoji}</span><div><div style={{fontSize:14,fontWeight:600,color:"#1a1207",lineHeight:1.3}}>{opt.label}</div>{opt.sub&&<div style={{fontSize:11,color:"#8B7355",marginTop:2,lineHeight:1.3}}>{opt.sub}</div>}</div></button>)}

/* ═══ SLIDER ═══ */
function Sld({q,value,onChange}){const pct=((value-q.min)/(q.max-q.min))*100;return(<div style={{padding:"8px 0"}}><div style={{textAlign:"center",fontSize:56,fontWeight:800,fontFamily:"'Playfair Display',serif",color:"#1a1207",letterSpacing:"-2px"}}>{value}</div><div style={{textAlign:"center",fontSize:14,color:"#8B7355",marginBottom:28,fontFamily:"'Outfit',sans-serif"}}>{q.unit}</div><input type="range" min={q.min} max={q.max} step={q.step} value={value} onChange={e=>onChange(+e.target.value)} style={{width:"100%",height:10,appearance:"none",borderRadius:5,outline:"none",cursor:"pointer",background:`linear-gradient(90deg,#C4953A ${pct}%,rgba(139,105,20,0.1) ${pct}%)`}}/><style>{`input[type="range"]::-webkit-slider-thumb{appearance:none;width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#8B6914,#C4953A);box-shadow:0 2px 12px rgba(139,105,20,0.35);cursor:pointer;border:3px solid #fff}`}</style></div>)}

/* ═══ CONTACT ═══ */
function CForm({onSubmit}){const[f,setF]=useState({name:"",phone:"",email:""});const[err,setErr]=useState({});const ok=()=>{const e={};if(!f.name.trim())e.name=1;if(!f.phone.trim())e.phone=1;setErr(e);return!Object.keys(e).length};return(<div style={{display:"flex",flexDirection:"column",gap:12}}>{[["name","Ονοματεπώνυμο *","text"],["phone","Τηλέφωνο *","tel"],["email","Email (προαιρετικό)","email"]].map(([k,ph,ty])=>(<input key={k} placeholder={ph} type={ty} value={f[k]} onChange={e=>setF(p=>({...p,[k]:e.target.value}))} style={{width:"100%",padding:"16px 20px",borderRadius:14,fontSize:15,border:err[k]?"2px solid #ef4444":"1.5px solid rgba(255,255,255,0.3)",background:"rgba(255,255,255,0.45)",backdropFilter:"blur(12px)",fontFamily:"'Outfit',sans-serif",color:"#1a1207",outline:"none",boxSizing:"border-box"}}/>))}<p style={{fontSize:11,color:"#a89274"}}>🔒 Τα στοιχεία σας είναι ασφαλή.</p><button onClick={()=>ok()&&onSubmit(f)} style={{padding:"18px",border:"none",borderRadius:16,cursor:"pointer",background:"linear-gradient(135deg,#8B6914,#C4953A)",color:"#fff",fontSize:16,fontWeight:700,fontFamily:"'Outfit',sans-serif",boxShadow:"0 8px 32px rgba(139,105,20,0.3)"}}>Αποκαλύψτε τον Τύπο Γήρανσής σας →</button></div>)}

/* ═══ MAIN ═══ */
export default function Quiz(){
  const[curId,setCurId]=useState("age");const[answers,setAnswers]=useState({});const[sliderVal,setSliderVal]=useState(40);const[multiSel,setMultiSel]=useState([]);const[showResults,setShowResults]=useState(false);const[contact,setContact]=useState(null);const[history,setHistory]=useState(["age"]);const[stepNum,setStepNum]=useState(1);const ref=useRef(null);
  const q=getQ(curId);const totalSteps=14;
  useEffect(()=>{ref.current?.scrollTo({top:0,behavior:"smooth"})},[curId,showResults]);
  const goNext=(nxt,ans)=>{setAnswers(a=>({...a,[curId]:ans}));setMultiSel([]);if(nxt==="results")setShowResults(true);else{setHistory(h=>[...h,nxt]);setCurId(nxt);setStepNum(s=>s+1)}};
  const goBack=()=>{if(history.length>1){const h=[...history];h.pop();setHistory(h);setCurId(h[h.length-1]);setStepNum(s=>Math.max(1,s-1));setShowResults(false)}};
  const result=showResults?calc(answers):null;const pct=Math.round((stepNum/totalSteps)*100);
  const DL={inflammation:{l:"Φλεγμονή",c:"#ef4444"},oxidation:{l:"Οξειδωτικό Στρες",c:"#ea580c"},metabolism:{l:"Μεταβολισμός",c:"#16a34a"},glycation:{l:"Γλυκοζυλίωση",c:"#ca8a04"},gut:{l:"Εντερική Υγεία",c:"#2563eb"},telomere:{l:"Κυτταρική Γήρανση",c:"#92400e"}};

  return(<><style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap');@keyframes cardIn{from{opacity:0;transform:translateY(20px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}@keyframes float0{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,-40px)}}@keyframes float1{0%,100%{transform:translate(0,0)}50%{transform:translate(-20px,30px)}}@keyframes float2{0%,100%{transform:translate(0,0)}50%{transform:translate(40px,20px)}}*{box-sizing:border-box;margin:0;padding:0}button:active{transform:scale(0.97)!important}input:focus{border-color:rgba(196,149,58,0.5)!important;box-shadow:0 0 0 4px rgba(196,149,58,0.1)}::-webkit-scrollbar{width:0}`}</style>
  <div ref={ref} style={{minHeight:"100vh",position:"relative",overflow:"hidden",background:"linear-gradient(170deg,#faf6ee 0%,#f0e8d6 35%,#e8dcc6 70%,#dfd2b8 100%)",fontFamily:"'Outfit',sans-serif"}}>
  <Particles/>
  <div style={{position:"relative",zIndex:1,maxWidth:500,margin:"0 auto",padding:"24px 18px 48px"}}>

  {/* HEADER */}
  <div style={{textAlign:"center",marginBottom:28}}>
    <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"7px 18px",borderRadius:40,background:"rgba(255,255,255,0.4)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.5)",marginBottom:14}}><span style={{fontSize:16}}>🧬</span><span style={{fontSize:11,fontWeight:700,color:"#8B6914",letterSpacing:"0.08em",textTransform:"uppercase"}}>Dr. Μαρία Θανάσουλα</span></div>
    <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:showResults?26:24,fontWeight:800,color:"#1a1207",lineHeight:1.15,letterSpacing:"-0.5px"}}>{showResults?(result?.isHealthy?"Εξαιρετική Κατάσταση! 🌟":`${contact?.name?.split(" ")[0]||""}, Ο Τύπος Γήρανσής σας`):<>Τι Τύπος Γήρανσης<br/>Είστε;</>}</h1>
    {!showResults&&<p style={{fontSize:13,color:"#8B7355",marginTop:8}}>Βασισμένο στα 12 Hallmarks of Aging · 2 λεπτά</p>}
  </div>

  {/* PROGRESS */}
  {!showResults&&<div style={{display:"flex",alignItems:"center",gap:14,marginBottom:28,padding:"12px 18px",borderRadius:16,background:"rgba(255,255,255,0.35)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.4)"}}><Ring pct={pct}/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:"#1a1207"}}>Ερώτηση {stepNum}/{totalSteps}</div><div style={{height:4,borderRadius:2,background:"rgba(139,105,20,0.08)",marginTop:6}}><div style={{height:"100%",borderRadius:2,background:"linear-gradient(90deg,#8B6914,#C4953A)",width:`${pct}%`,transition:"width 0.5s ease"}}/></div></div><span style={{fontSize:13,fontWeight:700,color:"#C4953A"}}>{pct}%</span></div>}

  {/* BACK */}
  {!showResults&&history.length>1&&<button onClick={goBack} style={{background:"rgba(255,255,255,0.3)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.4)",borderRadius:10,padding:"6px 14px",cursor:"pointer",color:"#8B7355",fontSize:13,marginBottom:16}}>← Πίσω</button>}

  {/* QUESTIONS */}
  {!showResults&&q&&q.type!=="contact"?(<div key={curId} style={{animation:"fadeUp 0.4s both"}}>
    <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:"#1a1207",marginBottom:q.sub?4:18,lineHeight:1.3}}>{q.q}</h2>
    {q.sub&&<p style={{fontSize:13,color:"#8B7355",marginBottom:18}}>{q.sub}</p>}
    {q.type==="slider"&&<><Sld q={q} value={sliderVal} onChange={setSliderVal}/><button onClick={()=>goNext(q.next,{value:sliderVal,scores:q.scoring(sliderVal)})} style={{width:"100%",padding:"18px",marginTop:20,border:"none",borderRadius:16,background:"linear-gradient(135deg,#8B6914,#C4953A)",color:"#fff",fontSize:16,fontWeight:700,cursor:"pointer",boxShadow:"0 8px 32px rgba(139,105,20,0.25)"}}>Συνέχεια →</button></>}
    {q.type==="visual"&&<div style={{display:"flex",flexWrap:"wrap",gap:10}}>{q.options.map((o,i)=><Card key={o.id} opt={o} idx={i} total={q.options.length} sel={false} onClick={()=>goNext(o.next||q.next,o)}/>)}</div>}
    {q.type==="multi"&&<><div style={{display:"flex",flexWrap:"wrap",gap:10}}>{q.options.map((o,i)=><Card key={o.id} opt={o} idx={i} total={q.options.length} sel={multiSel.some(x=>x.id===o.id)} onClick={()=>setMultiSel(p=>p.some(x=>x.id===o.id)?p.filter(x=>x.id!==o.id):[...p,o])}/>)}</div>{multiSel.length>0&&<button onClick={()=>{const m={};multiSel.forEach(o=>Object.entries(o.scores||{}).forEach(([k,v])=>{m[k]=(m[k]||0)+v}));goNext(q.next,{scores:m,ids:multiSel.map(o=>o.id)})}} style={{width:"100%",padding:"16px",marginTop:14,border:"none",borderRadius:16,background:"linear-gradient(135deg,#8B6914,#C4953A)",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:"0 8px 24px rgba(139,105,20,0.2)"}}>Συνέχεια ({multiSel.length}) →</button>}</>}
  </div>):!showResults&&q?.type==="contact"?(<div style={{animation:"fadeUp 0.4s both"}}><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:"#1a1207",marginBottom:6}}>{q.q}</h2><p style={{fontSize:13,color:"#8B7355",marginBottom:20}}>{q.sub}</p><CForm onSubmit={info=>{setContact(info);setShowResults(true)}}/></div>):result&&(
  /* ═══ RESULTS ═══ */
  <div>
    {/* Score Gauge */}
    <div style={{textAlign:"center",marginBottom:20,animation:"fadeUp 0.6s both"}}><div style={{position:"relative",display:"inline-block",width:140,height:140}}><svg width="140" height="140" style={{transform:"rotate(-90deg)"}}><circle cx="70" cy="70" r="60" fill="none" stroke="rgba(139,105,20,0.06)" strokeWidth="10"/><circle cx="70" cy="70" r="60" fill="none" stroke={result.isHealthy?"#16a34a":result.score100>60?"#ef4444":result.score100>30?"#f59e0b":"#22c55e"} strokeWidth="10" strokeDasharray="377" strokeDashoffset={377-(result.score100/100)*377} strokeLinecap="round" style={{transition:"stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:36,fontWeight:800,fontFamily:"'Playfair Display',serif",color:"#1a1207"}}>{result.score100}</span><span style={{fontSize:11,color:"#8B7355"}}>/100</span></div></div><div style={{fontSize:14,fontWeight:700,color:result.isHealthy?"#16a34a":result.score100>60?"#ef4444":result.score100>30?"#f59e0b":"#22c55e",marginTop:8}}>{result.isHealthy?"Εξαιρετικό":result.score100>60?"Υψηλός Κίνδυνος":result.score100>30?"Μέτριος":"Χαμηλός"}</div><div style={{fontSize:12,color:"#8B7355"}}>Aging Risk Score</div></div>

    {/* Bio Age */}
    <div style={{textAlign:"center",padding:"24px",borderRadius:22,marginBottom:18,background:result.bioAgeDiff>0?"rgba(239,68,68,0.06)":"rgba(22,163,74,0.06)",border:`1.5px solid ${result.bioAgeDiff>0?"rgba(239,68,68,0.12)":"rgba(22,163,74,0.12)"}`,backdropFilter:"blur(12px)",animation:"fadeUp 0.5s 0.1s both"}}><div style={{fontSize:12,color:"#8B7355"}}>Εκτιμώμενη Βιολογική Ηλικία</div><div style={{fontSize:52,fontWeight:800,fontFamily:"'Playfair Display',serif",color:result.bioAgeDiff>0?"#dc2626":"#16a34a",lineHeight:1}}>{result.bioAge}</div><div style={{display:"inline-flex",padding:"5px 14px",borderRadius:20,marginTop:8,background:result.bioAgeDiff>0?"rgba(239,68,68,0.08)":"rgba(22,163,74,0.08)",fontSize:13,fontWeight:700,color:result.bioAgeDiff>0?"#dc2626":result.bioAgeDiff===0?"#8B6914":"#16a34a"}}>{result.bioAgeDiff>0?"↑":result.bioAgeDiff===0?"=":"↓"} {Math.abs(result.bioAgeDiff)} χρόνια</div><p style={{fontSize:10,color:"#a89274",marginTop:8,fontStyle:"italic"}}>* Ενδεικτικό. Ακριβής μέτρηση μόνο με ανάλυση τελομερών.</p></div>

    {/* Archetype */}
    <div style={{padding:"28px 24px",borderRadius:24,marginBottom:18,color:"#fff",background:result.archetype.gradient,position:"relative",overflow:"hidden",animation:"fadeUp 0.5s 0.2s both",boxShadow:`0 12px 40px ${result.archetype.color}33`}}><div style={{position:"absolute",top:-40,right:-40,width:140,height:140,borderRadius:"50%",background:"rgba(255,255,255,0.07)"}}/><div style={{fontSize:12,opacity:0.8,marginBottom:6}}>Ο τύπος γήρανσής σας:</div><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}><span style={{fontSize:44}}>{result.archetype.emoji}</span><div><h3 style={{fontSize:22,fontWeight:800,fontFamily:"'Playfair Display',serif",margin:0}}>{result.archetype.name}</h3><div style={{fontSize:11,opacity:0.65}}>{result.archetype.nameEn}</div></div></div><div style={{fontSize:11,opacity:0.6,padding:"4px 10px",background:"rgba(255,255,255,0.12)",borderRadius:8,display:"inline-block",marginBottom:14}}>{result.archetype.hallmarks}</div><p style={{fontSize:14,lineHeight:1.6,opacity:0.92}}>{result.archetype.description}</p></div>

    {/* Risk */}
    <div style={{padding:"16px 20px",borderRadius:16,marginBottom:18,background:result.isHealthy?"rgba(139,105,20,0.04)":"rgba(239,68,68,0.04)",border:`1.5px solid ${result.isHealthy?"rgba(139,105,20,0.1)":"rgba(239,68,68,0.1)"}`,animation:"fadeUp 0.5s 0.3s both"}}><div style={{fontSize:13,fontWeight:700,color:result.isHealthy?"#8B6914":"#dc2626",marginBottom:6}}>{result.isHealthy?"🔍 Γιατί αξίζει ο προληπτικός έλεγχος":"⚠️ Γιατί είναι σημαντικό"}</div><p style={{fontSize:13,color:"#5C4510",lineHeight:1.55}}>{result.archetype.risk}</p></div>

    {/* Dims */}
    <div style={{padding:"20px",borderRadius:20,marginBottom:18,background:"rgba(255,255,255,0.35)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.4)",animation:"fadeUp 0.5s 0.4s both"}}><h4 style={{fontSize:15,fontWeight:700,color:"#1a1207",marginBottom:14,fontFamily:"'Playfair Display',serif"}}>Ανάλυση Παραγόντων</h4>{Object.entries(DL).map(([d,{l,c}],i)=>{const v=result.dim[d],p=Math.min(100,Math.round((v/30)*100)),lv=v===0?"Εξαιρετικό":p>60?"Υψηλός":p>25?"Μέτριος":"Χαμηλός",lc2=v===0?"#16a34a":p>60?"#ef4444":p>25?"#f59e0b":"#8B7355";return(<div key={d} style={{marginBottom:10,animation:`fadeUp 0.4s ${0.3+i*0.08}s both`}}><div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}><span style={{color:"#1a1207",fontWeight:600}}>{l}</span><span style={{color:lc2,fontWeight:700,fontSize:11}}>{lv}</span></div><div style={{height:6,borderRadius:3,background:"rgba(139,105,20,0.06)"}}><div style={{height:"100%",borderRadius:3,background:`linear-gradient(90deg,${c}66,${c})`,width:`${p}%`,transition:"width 1s cubic-bezier(0.4,0,0.2,1)"}}/></div></div>)})}</div>

    {/* Exams */}
    <div style={{padding:"20px",borderRadius:20,marginBottom:18,background:"rgba(255,255,255,0.35)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.4)",animation:"fadeUp 0.5s 0.5s both"}}><h4 style={{fontSize:15,fontWeight:700,color:"#1a1207",marginBottom:14,fontFamily:"'Playfair Display',serif"}}>{result.isHealthy?"🛡️ Προληπτικές Εξετάσεις":"🔬 Προτεινόμενες Εξετάσεις"}</h4>{result.archetype.exams.map((ex,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",marginBottom:8,background:"rgba(255,255,255,0.5)",borderRadius:12,border:i===0?"1.5px solid rgba(196,149,58,0.3)":"1px solid rgba(255,255,255,0.4)"}}><span style={{fontSize:11,fontWeight:700,color:"#fff",background:i===0?"#C4953A":"#a89274",padding:"3px 9px",borderRadius:6}}>#{i+1}</span><span style={{fontSize:13,fontWeight:i===0?700:500,color:"#1a1207"}}>{ex}</span></div>))}</div>

    {/* Tips */}
    <div style={{padding:"20px",borderRadius:20,marginBottom:24,background:"rgba(22,163,74,0.04)",border:"1.5px solid rgba(22,163,74,0.1)",animation:"fadeUp 0.5s 0.6s both"}}><h4 style={{fontSize:15,fontWeight:700,color:"#16a34a",marginBottom:12,fontFamily:"'Playfair Display',serif"}}>💡 Τι Μπορείτε να Κάνετε Τώρα</h4>{result.archetype.tips.map((t,i)=>(<div key={i} style={{display:"flex",gap:10,marginBottom:8}}><span style={{color:"#16a34a",fontWeight:700}}>✓</span><span style={{fontSize:13,color:"#1a1207",lineHeight:1.5}}>{t}</span></div>))}</div>

    {/* CTA */}
    <div style={{textAlign:"center",padding:"28px 24px",borderRadius:24,background:"rgba(255,255,255,0.4)",backdropFilter:"blur(16px)",border:"1.5px solid rgba(255,255,255,0.5)",boxShadow:"0 8px 32px rgba(0,0,0,0.04)",animation:"fadeUp 0.5s 0.7s both"}}><p style={{fontFamily:"'Playfair Display',serif",fontSize:19,fontWeight:700,color:"#1a1207",marginBottom:8}}>{result.isHealthy?"Επιβεβαιώστε το εργαστηριακά":"Κλείστε ραντεβού"}</p><p style={{fontSize:13,color:"#8B7355",marginBottom:18,lineHeight:1.5}}>{result.isHealthy?"Η ιδανική στιγμή για baseline check-up":"Η Dr. Θανάσουλα θα σας καθοδηγήσει"}</p><a href="tel:+306973961749" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"16px 30px",borderRadius:16,textDecoration:"none",background:"linear-gradient(135deg,#8B6914,#C4953A)",color:"#fff",fontSize:17,fontWeight:700,boxShadow:"0 8px 32px rgba(139,105,20,0.3)"}}>📞 697 39 61 749</a><p style={{fontSize:11,color:"#a89274",marginTop:10}}>Ηρώδου Αττικού 7, Κηφισιά</p></div>

    <button onClick={()=>{setCurId("age");setAnswers({});setSliderVal(40);setMultiSel([]);setShowResults(false);setContact(null);setHistory(["age"]);setStepNum(1)}} style={{display:"block",margin:"20px auto 0",padding:"10px 20px",background:"rgba(255,255,255,0.3)",border:"1px solid rgba(255,255,255,0.4)",borderRadius:12,color:"#8B7355",fontSize:13,cursor:"pointer",backdropFilter:"blur(8px)"}}>↺ Ξεκινήστε ξανά</button>
    <div style={{display:"flex",justifyContent:"center",gap:12,marginTop:22,flexWrap:"wrap"}}>{["🎓 Oxford PhD","🔬 18 Publications","🏥 Κηφισιά"].map(b=>(<span key={b} style={{fontSize:11,color:"#8B7355",padding:"5px 12px",borderRadius:16,background:"rgba(255,255,255,0.3)"}}>{b}</span>))}</div>
  </div>)}

  {/* Footer */}
  <div style={{textAlign:"center",marginTop:36,paddingTop:16,borderTop:"1px solid rgba(139,105,20,0.06)"}}><p style={{fontSize:10,color:"#a89274",lineHeight:1.5}}>© {new Date().getFullYear()} Dr. Μαρία Θανάσουλα · Hallmarks of Aging (Cell, 2023)<br/>Ενδεικτικά αποτελέσματα — τελική αξιολόγηση από τον ειδικό.</p></div>
  </div></div></>);
}
