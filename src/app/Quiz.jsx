import { useState, useEffect, useRef } from "react";

/*
 * SCIENTIFIC BASIS:
 * Archetypes are derived from the 12 Hallmarks of Aging (López-Otín et al., Cell 2023):
 * genomic instability, telomere attrition, epigenetic alterations, loss of proteostasis,
 * disabled macroautophagy, deregulated nutrient-sensing, mitochondrial dysfunction,
 * cellular senescence, stem cell exhaustion, altered intercellular communication,
 * chronic inflammation, and dysbiosis.
 *
 * Each archetype represents a dominant aging pathway cluster that maps to
 * Dr. Thanasoula's available examinations.
 */

const ARCHETYPES = {
  inflammager: {
    id: "inflammager",
    name: "Ο Σιωπηλός Φλεγμονιστής",
    nameEn: "The Silent Inflammager",
    emoji: "🔥",
    color: "#C62828",
    gradient: "linear-gradient(135deg, #C62828, #E53935)",
    hallmarks: "Χρόνια Φλεγμονή · Μεταβολισμένη Διακυτταρική Επικοινωνία",
    description: "Ο οργανισμός σας βρίσκεται σε κατάσταση «σιωπηλής φλεγμονής» — χαμηλής έντασης αλλά μόνιμης. Αυτό το inflammaging επιταχύνει τη γήρανση χωρίς εμφανή συμπτώματα, αυξάνοντας τον κίνδυνο καρδιαγγειακών, αυτοάνοσων και νευροεκφυλιστικών παθήσεων.",
    risk: "Η χρόνια φλεγμονή χαμηλής έντασης συμβάλλει σε 7 από τις 10 κυριότερες αιτίες θανάτου στον δυτικό κόσμο.",
    exams: ["Έλεγχος Χρόνιας Φλεγμονής", "Εξετάσεις Μεταβολισμού", "Έλεγχος Οξειδωτικού Στρες"],
    tips: ["Αντιφλεγμονώδης διατροφή (ωμέγα-3, κουρκουμάς)", "Μείωση επεξεργασμένων τροφίμων", "Διαχείριση στρες & βελτίωση ύπνου"],
    url: "https://drthanasoula.gr/%ce%ad%ce%bb%ce%b5%ce%b3%cf%87%ce%bf%cf%82-%cf%87%cf%81%cf%8c%ce%bd%ce%b9%ce%b1%cf%82-%cf%86%ce%bb%ce%b5%ce%b3%ce%bc%ce%bf%ce%bd%ce%ae%cf%82/"
  },
  oxidizer: {
    id: "oxidizer",
    name: "Ο Οξειδωμένος Μαχητής",
    nameEn: "The Oxidized Warrior",
    emoji: "⚔️",
    color: "#E65100",
    gradient: "linear-gradient(135deg, #E65100, #FF8F00)",
    hallmarks: "Μιτοχονδριακή Δυσλειτουργία · Οξειδωτικό Στρες",
    description: "Τα κύτταρά σας δέχονται βομβαρδισμό από ελεύθερες ρίζες χωρίς επαρκή αντιοξειδωτική προστασία. Αυτή η ανισορροπία καταστρέφει DNA, πρωτεΐνες και λιπίδια, επιταχύνοντας τη φθορά κάθε ιστού — από το δέρμα ως τον εγκέφαλο.",
    risk: "Το οξειδωτικό στρες συνδέεται άμεσα με πρόωρη γήρανση δέρματος, καρδιαγγειακά νοσήματα, νευροεκφυλιστικές παθήσεις και καρκίνο.",
    exams: ["Έλεγχος Οξειδωτικού Στρες & Αντιοξειδωτικής Ικανότητας", "Ανάλυση Τελομερών", "Εξέταση AGEs"],
    tips: ["Αύξηση αντιοξειδωτικών (βιταμίνες A, C, E)", "Μείωση κατανάλωσης αλκοόλ & καπνίσματος", "Τακτική σωματική άσκηση μέτριας έντασης"],
    url: "https://drthanasoula.gr/%ce%ad%ce%bb%ce%b5%ce%b3%cf%87%ce%bf%cf%82-%ce%bf%ce%be%ce%b5%ce%af%ce%b4%cf%89%cf%83%ce%b7%cf%82/"
  },
  metabolic: {
    id: "metabolic",
    name: "Ο Μεταβολικός Κοιμώμενος",
    nameEn: "The Metabolic Sleeper",
    emoji: "🔋",
    color: "#2E7D32",
    gradient: "linear-gradient(135deg, #2E7D32, #43A047)",
    hallmarks: "Απορρύθμιση Θρεπτικής Αίσθησης · Μιτοχονδριακή Δυσλειτουργία",
    description: "Ο μεταβολισμός σας λειτουργεί κάτω από τις δυνατότητές του. Ελλείψεις σε βιταμίνες, αμινοξέα και ιχνοστοιχεία μπλοκάρουν τις αντιδράσεις-κλειδιά του μεταβολισμού, οδηγώντας σε κούραση, δυσκολία στο βάρος και μειωμένη κυτταρική ανανέωση.",
    risk: "Η μεταβολική δυσλειτουργία συνδέεται με διαβήτη τύπου 2, παχυσαρκία, καρδιαγγειακά και σαρκοπενία.",
    exams: ["Εξετάσεις Μεταβολισμού", "Ανάλυση Τελομερών", "Ανάλυση Μικροβιώματος"],
    tips: ["Εξατομικευμένο πλάνο συμπληρωμάτων", "Σταθερό πρόγραμμα γευμάτων", "Αύξηση πρωτεΐνης & σύνθετων υδατανθράκων"],
    url: "https://drthanasoula.gr/1132-2/"
  },
  glycator: {
    id: "glycator",
    name: "Ο Γλυκός Καταστροφέας",
    nameEn: "The Sweet Destroyer",
    emoji: "🍯",
    color: "#F57F17",
    gradient: "linear-gradient(135deg, #F57F17, #FFB300)",
    hallmarks: "Γλυκοζυλίωση (AGEs) · Απώλεια Πρωτεοστασίας",
    description: "Τα σάκχαρα στον οργανισμό σας αντιδρούν με πρωτεΐνες δημιουργώντας AGEs — μόρια που καταστρέφουν κολλαγόνο και ελαστίνη. Το αποτέλεσμα: ρυτίδες, χαλάρωση δέρματος, σκλήρυνση αγγείων και αυξημένος κίνδυνος χρόνιων παθήσεων.",
    risk: "Τα AGEs συνδέονται με πρόωρη γήρανση δέρματος, διαβήτη, αθηροσκλήρωση, καρδιοπάθειες και νόσο Alzheimer.",
    exams: ["Εξέταση Γλυκοζυλίωσης (AGEs)", "Έλεγχος Οξειδωτικού Στρες", "Εξετάσεις Μεταβολισμού"],
    tips: ["Διατροφή χαμηλού γλυκαιμικού δείκτη", "Αποφυγή τηγανίσματος & ψησίματος σε υψηλή θερμοκρασία", "Ενίσχυση αντιοξειδωτικής προστασίας"],
    url: "https://drthanasoula.gr/%ce%b3%ce%bb%cf%85%ce%ba%ce%bf%ce%b6%cf%85%ce%bb%ce%af%cf%89%cf%83%ce%b7/"
  },
  gutager: {
    id: "gutager",
    name: "Ο Εντερικός Αναρχικός",
    nameEn: "The Gut Anarchist",
    emoji: "🦠",
    color: "#1565C0",
    gradient: "linear-gradient(135deg, #1565C0, #1E88E5)",
    hallmarks: "Δυσβίωση · Χρόνια Φλεγμονή · Μεταβολική Δυσλειτουργία",
    description: "Το εντερικό σας μικροβίωμα έχει χάσει την ισορροπία του. Η δυσβίωση — ένα από τα νεότερα hallmarks of aging — επηρεάζει ανοσοποιητικό, διάθεση, ενέργεια, βάρος και ακόμη και τη γήρανση του δέρματός σας.",
    risk: "Η εντερική δυσβίωση συνδέεται με αυτοάνοσα, κατάθλιψη, παχυσαρκία, ΣΕΕ και ακόμη και νευροεκφυλιστικές παθήσεις μέσω του άξονα εντέρου-εγκεφάλου.",
    exams: ["Ανάλυση Εντερικού Μικροβιώματος", "Έλεγχος Χρόνιας Φλεγμονής", "Εξετάσεις Μεταβολισμού"],
    tips: ["Αύξηση φυτικών ινών & ζυμωμένων τροφίμων", "Εξατομικευμένα προβιοτικά/πρεβιοτικά", "Μείωση αντιβιοτικών & επεξεργασμένων τροφών"],
    url: "https://drthanasoula.gr/%ce%b1%ce%bd%ce%ac%ce%bb%cf%85%cf%83%ce%b7-%ce%bc%ce%b9%ce%ba%cf%81%ce%bf%ce%b2%ce%b9%cf%8e%ce%bc%ce%b1%cf%84%ce%bf%cf%82/"
  },
  chrono: {
    id: "chrono",
    name: "Ο Χρονο-Ταξιδιώτης",
    nameEn: "The Chrono-Traveler",
    emoji: "⏳",
    color: "#8B6914",
    gradient: "linear-gradient(135deg, #8B6914, #C4953A)",
    hallmarks: "Βράχυνση Τελομερών · Κυτταρική Γήρανση · Γονιδιακή Αστάθεια",
    description: "Τα τελομερή σας — οι «βιολογικοί δείκτες νεότητας» — μικραίνουν ταχύτερα από ό,τι θα έπρεπε. Αυτό σημαίνει ότι η βιολογική σας ηλικία πιθανώς ξεπερνά τη χρονολογική σας. Η κυτταρική ανανέωση επιβραδύνεται.",
    risk: "Η επιτάχυνση της βράχυνσης τελομερών συνδέεται με κάθε χρόνιο νόσημα που σχετίζεται με τη γήρανση.",
    exams: ["Ανάλυση Τελομερών (Βιολογική Ηλικία)", "Εξετάσεις Μεταβολισμού", "Έλεγχος Οξειδωτικού Στρες"],
    tips: ["Διαχείριση χρόνιου στρες", "Μεσογειακή διατροφή πλούσια σε αντιοξειδωτικά", "Τακτική αερόβια άσκηση"],
    url: "https://drthanasoula.gr/pages/procedures/"
  }
};

// ── SCORING DIMENSIONS (map to hallmarks → archetypes) ──
const DIMS = {
  inflammation: { archetypes: { inflammager: 1.0, oxidizer: 0.3, gutager: 0.4 } },
  oxidation:    { archetypes: { oxidizer: 1.0, inflammager: 0.3, chrono: 0.3, glycator: 0.3 } },
  metabolism:   { archetypes: { metabolic: 1.0, gutager: 0.3, glycator: 0.2 } },
  glycation:    { archetypes: { glycator: 1.0, oxidizer: 0.2, chrono: 0.2 } },
  gut:          { archetypes: { gutager: 1.0, inflammager: 0.3, metabolic: 0.3 } },
  telomere:     { archetypes: { chrono: 1.0, oxidizer: 0.2, inflammager: 0.2 } },
};

// ── QUESTIONS (branching by ID) ──
const QUESTIONS = [
  {
    id: "age",
    q: "Πόσο χρονών είστε;",
    sub: "Η χρονολογική σας ηλικία",
    type: "slider",
    min: 25, max: 70, step: 1, unit: "ετών", default: 40,
    scoring: (v) => {
      if (v >= 55) return { telomere: 3, inflammation: 2, oxidation: 2 };
      if (v >= 45) return { telomere: 2, inflammation: 1, oxidation: 1 };
      if (v >= 35) return { telomere: 1 };
      return {};
    },
    next: "gender"
  },
  {
    id: "gender",
    q: "Φύλο",
    type: "visual",
    options: [
      { id: "female", emoji: "👩", label: "Γυναίκα", scores: {}, next: "concern_female" },
      { id: "male", emoji: "👨", label: "Άνδρας", scores: {}, next: "concern_male" },
    ]
  },
  // ── CONCERNS: FEMALE ──
  {
    id: "concern_female",
    q: "Ποια είναι η κύρια ανησυχία σας;",
    sub: "Επιλέξτε αυτό που σας απασχολεί περισσότερο",
    type: "visual",
    options: [
      { id: "aging", emoji: "⏳", label: "Γήρανση & πρόληψη", sub: "Θέλω να μάθω πώς γερνάω", scores: {}, next: "skin" },
      { id: "energy", emoji: "🔋", label: "Κούραση & ενέργεια", sub: "Νιώθω εξαντλημένη", scores: { metabolism: 2 }, next: "symptoms" },
      { id: "weight", emoji: "⚖️", label: "Διαχείριση βάρους", sub: "Δυσκολία στο αδυνάτισμα", scores: { metabolism: 3, gut: 1 }, next: "symptoms" },
      { id: "metabolic", emoji: "🔬", label: "Μεταβολικές διαταραχές", sub: "Θυρεοειδής, ινσουλίνη κ.ά.", scores: { metabolism: 3, inflammation: 2 }, next: "symptoms" },
      { id: "autoimmune", emoji: "🔁", label: "Αυτοάνοσο / χρόνιο νόσημα", sub: "Χρόνια πάθηση", scores: { inflammation: 4, gut: 2, oxidation: 2 }, next: "symptoms" },
      { id: "gi", emoji: "🫁", label: "Γαστρεντερικά προβλήματα", sub: "Φούσκωμα, δυσπεψία, ευαισθησίες", scores: { gut: 3, inflammation: 1 }, next: "gi_detail" },
      { id: "skin_hair", emoji: "✨", label: "Δέρμα & μαλλιά", sub: "Ρυτίδες, τριχόπτωση, ακμή", scores: {}, next: "skin_hair_detail" },
      { id: "menopause", emoji: "🌸", label: "Εμμηνόπαυση", sub: "Συμπτώματα / περιεμμηνόπαυση", scores: { metabolism: 2, inflammation: 2, oxidation: 1, telomere: 1 }, next: "symptoms" },
      { id: "general", emoji: "🎯", label: "Γενική βελτίωση υγείας", sub: "Check-up & πρόληψη", scores: {}, next: "skin" },
    ]
  },
  // ── CONCERNS: MALE ──
  {
    id: "concern_male",
    q: "Ποια είναι η κύρια ανησυχία σας;",
    sub: "Επιλέξτε αυτό που σας απασχολεί περισσότερο",
    type: "visual",
    options: [
      { id: "aging", emoji: "⏳", label: "Γήρανση & πρόληψη", sub: "Θέλω να μάθω πώς γερνάω", scores: {}, next: "skin" },
      { id: "energy", emoji: "🔋", label: "Κούραση & ενέργεια", sub: "Νιώθω εξαντλημένος", scores: { metabolism: 2 }, next: "symptoms" },
      { id: "weight", emoji: "⚖️", label: "Διαχείριση βάρους", sub: "Δυσκολία στο αδυνάτισμα", scores: { metabolism: 3, gut: 1 }, next: "symptoms" },
      { id: "metabolic", emoji: "🔬", label: "Μεταβολικές διαταραχές", sub: "Θυρεοειδής, ινσουλίνη κ.ά.", scores: { metabolism: 3, inflammation: 2 }, next: "symptoms" },
      { id: "autoimmune", emoji: "🔁", label: "Αυτοάνοσο / χρόνιο νόσημα", sub: "Χρόνια πάθηση", scores: { inflammation: 4, gut: 2, oxidation: 2 }, next: "symptoms" },
      { id: "gi", emoji: "🫁", label: "Γαστρεντερικά προβλήματα", sub: "Φούσκωμα, δυσπεψία, ευαισθησίες", scores: { gut: 3, inflammation: 1 }, next: "gi_detail" },
      { id: "skin_hair", emoji: "✨", label: "Δέρμα & μαλλιά", sub: "Γήρανση δέρματος, τριχόπτωση", scores: {}, next: "skin_hair_detail" },
      { id: "libido", emoji: "💪", label: "Λίμπιντο & σεξουαλική υγεία", sub: "Ενέργεια, ορμόνες, απόδοση", scores: { metabolism: 2, inflammation: 1, telomere: 1 }, next: "symptoms" },
      { id: "general", emoji: "🎯", label: "Γενική βελτίωση υγείας", sub: "Check-up & πρόληψη", scores: {}, next: "skin" },
    ]
  },
  // ── SYMPTOM DETAILS ──
  {
    id: "symptoms",
    q: "Τι είδους συμπτώματα αντιμετωπίζετε;",
    sub: "Επιλέξτε όσα ισχύουν",
    type: "multi",
    options: [
      { id: "fatigue", emoji: "😴", label: "Χρόνια κούραση", scores: { metabolism: 3, inflammation: 1 } },
      { id: "brain_fog", emoji: "🧠", label: "Brain fog / δυσκολία συγκέντρωσης", scores: { metabolism: 2, gut: 1 } },
      { id: "mood", emoji: "🎭", label: "Μεταπτώσεις διάθεσης", scores: { gut: 2, inflammation: 1 } },
      { id: "joint_pain", emoji: "🦴", label: "Πόνοι σε αρθρώσεις / μύες", scores: { inflammation: 3, oxidation: 1 } },
      { id: "skin_issues", emoji: "🪞", label: "Προβλήματα δέρματος", scores: { glycation: 2, oxidation: 1 } },
      { id: "weight_gain", emoji: "⚖️", label: "Αύξηση βάρους χωρίς λόγο", scores: { metabolism: 3, gut: 1 } },
      { id: "hormonal", emoji: "🔄", label: "Ορμονικές διαταραχές", scores: { metabolism: 2, inflammation: 2 } },
      { id: "hair_thin", emoji: "💇", label: "Αραίωση μαλλιών", scores: { hairloss: 3 } },
    ],
    next: "skin"
  },
  // ── GI DETAIL ──
  {
    id: "gi_detail",
    q: "Τι γαστρεντερικά προβλήματα αντιμετωπίζετε;",
    sub: "Επιλέξτε όσα ισχύουν",
    type: "multi",
    options: [
      { id: "bloating", emoji: "🫧", label: "Φούσκωμα & αέρια", scores: { gut: 3 } },
      { id: "irregular", emoji: "🔄", label: "Ακανόνιστη κένωση", scores: { gut: 2 } },
      { id: "food_sens", emoji: "🚫", label: "Ευαισθησίες σε τροφές", scores: { gut: 3, inflammation: 2 } },
      { id: "reflux", emoji: "🔥", label: "Καούρα / παλινδρόμηση", scores: { gut: 2, inflammation: 1 } },
      { id: "ibs", emoji: "🚨", label: "Ευερέθιστο έντερο (ΣΕΕ)", scores: { gut: 5, inflammation: 3 } },
      { id: "autoimmune_gi", emoji: "🔁", label: "Αυτοάνοσο εντέρου (Crohn/Colitis)", scores: { gut: 5, inflammation: 4, oxidation: 2 } },
    ],
    next: "skin"
  },
  // ── SKIN/HAIR DETAIL ──
  {
    id: "skin_hair_detail",
    q: "Τι σας απασχολεί με δέρμα ή μαλλιά;",
    type: "visual",
    options: [
      { id: "wrinkles", emoji: "〰️", label: "Ρυτίδες & γήρανση δέρματος", sub: "Χαλάρωση, κηλίδες, γραμμές", scores: { glycation: 3, oxidation: 2, telomere: 1 }, next: "skin" },
      { id: "hair_loss", emoji: "💇", label: "Τριχόπτωση / αραίωση", sub: "Χάνω μαλλιά ή αραίωση", scores: { hairloss: 4 }, next: "skin" },
      { id: "acne", emoji: "😣", label: "Ακμή / δερματίτιδα", sub: "Σπυράκια, ερεθισμοί", scores: { gut: 2, inflammation: 2 }, next: "skin" },
      { id: "dull", emoji: "💧", label: "Θαμπό / ξηρό δέρμα", sub: "Αφυδάτωση, έλλειψη λάμψης", scores: { oxidation: 2, glycation: 1 }, next: "skin" },
    ]
  },
  // ── SKIN (general) ──
  {
    id: "skin",
    q: "Πώς θα περιγράφατε γενικά το δέρμα σας;",
    type: "visual",
    options: [
      { id: "great", emoji: "✨", label: "Λαμπερό", sub: "Σφριγηλό, ελαστικό, υγιές", scores: {} },
      { id: "ok", emoji: "🙂", label: "Μια χαρά", sub: "Μικρά σημάδια αλλά ΟΚ", scores: {} },
      { id: "aging", emoji: "〰️", label: "Σημάδια γήρανσης", sub: "Ρυτίδες, κηλίδες ή χαλάρωση", scores: { glycation: 3, oxidation: 2, telomere: 1 } },
      { id: "bad", emoji: "😔", label: "Με ανησυχεί", sub: "Φαίνομαι μεγαλύτερη/ος", scores: { glycation: 4, oxidation: 3, telomere: 2 } },
    ],
    next: "diet"
  },
  // ── DIET ──
  {
    id: "diet",
    q: "Πώς θα χαρακτηρίζατε τη διατροφή σας;",
    type: "visual",
    options: [
      { id: "excellent", emoji: "🥗", label: "Ισορροπημένη & υγιεινή", sub: "Φρούτα, λαχανικά, σωστές αναλογίες", scores: {} },
      { id: "ok", emoji: "🍽️", label: "Αρκετά καλή", sub: "Κάποιες παρεκκλίσεις αλλά ΟΚ", scores: {} },
      { id: "sugar_heavy", emoji: "🍰", label: "Πολλά γλυκά & επεξεργασμένα", sub: "Ζάχαρη, σνακ, αναψυκτικά", scores: { glycation: 3, metabolism: 1, inflammation: 1 } },
      { id: "poor", emoji: "🍔", label: "Ακανόνιστη / fast food", sub: "Πρόχειρα γεύματα, παραλείψεις", scores: { metabolism: 2, gut: 1, inflammation: 1 } },
    ],
    next: "exercise"
  },
  // ── EXERCISE ──
  {
    id: "exercise",
    q: "Πόσο γυμνάζεστε;",
    type: "visual",
    options: [
      { id: "daily", emoji: "🏃", label: "Τακτικά", sub: "3+ φορές τη βδομάδα", scores: {} },
      { id: "some", emoji: "🚶", label: "Μέτρια", sub: "1-2 φορές τη βδομάδα", scores: {} },
      { id: "rare", emoji: "🛋️", label: "Σπάνια", sub: "Λίγες φορές τον μήνα", scores: { metabolism: 2, inflammation: 1, telomere: 1 } },
      { id: "never", emoji: "🪑", label: "Καθόλου", sub: "Καθιστική ζωή", scores: { metabolism: 3, inflammation: 2, telomere: 2, oxidation: 1 } },
    ],
    next: "sleep"
  },
  // ── SLEEP ──
  {
    id: "sleep",
    q: "Πώς είναι η ποιότητα του ύπνου σας;",
    type: "visual",
    options: [
      { id: "great", emoji: "😴", label: "Εξαιρετική", sub: "7-9 ώρες, ξυπνάω ξεκούραστα", scores: {} },
      { id: "ok", emoji: "🛌", label: "Αρκετά καλή", sub: "Μερικές φορές ξυπνάω κουρασμένα", scores: {} },
      { id: "poor", emoji: "🌙", label: "Προβληματική", sub: "Δυσκολία ύπνου / αφυπνίσεις", scores: { oxidation: 2, inflammation: 2, metabolism: 2, telomere: 1 } },
      { id: "terrible", emoji: "👁️", label: "Πολύ κακή", sub: "Χρόνια αϋπνία / <5 ώρες", scores: { oxidation: 3, inflammation: 3, metabolism: 3, telomere: 2 } },
    ],
    next: "alcohol"
  },
  // ── ALCOHOL ──
  {
    id: "alcohol",
    q: "Πόσο αλκοόλ καταναλώνετε;",
    type: "visual",
    options: [
      { id: "none", emoji: "🚫", label: "Καθόλου", sub: "Δεν πίνω αλκοόλ", scores: {} },
      { id: "social", emoji: "🥂", label: "Κοινωνικά", sub: "1-2 φορές το μήνα", scores: {} },
      { id: "regular", emoji: "🍷", label: "Τακτικά", sub: "2-3 φορές τη βδομάδα", scores: { oxidation: 2, metabolism: 1, inflammation: 1 } },
      { id: "daily", emoji: "🍺", label: "Καθημερινά", sub: "Σχεδόν κάθε μέρα", scores: { oxidation: 3, metabolism: 2, inflammation: 2, telomere: 1 } },
    ],
    next: "smoking"
  },
  // ── SMOKING ──
  {
    id: "smoking",
    q: "Καπνίζετε;",
    type: "visual",
    options: [
      { id: "no", emoji: "💚", label: "Όχι", sub: "Δεν κάπνισα ποτέ ή έκοψα", scores: {} },
      { id: "occasional", emoji: "🚬", label: "Περιστασιακά", sub: "Κοινωνικό κάπνισμα", scores: { oxidation: 2, inflammation: 1 } },
      { id: "regular", emoji: "😤", label: "Τακτικά", sub: "Καθημερινά", scores: { oxidation: 4, inflammation: 2, telomere: 2 } },
      { id: "heavy", emoji: "🏭", label: "Βαρύ κάπνισμα", sub: "Πάνω από 1 πακέτο/μέρα", scores: { oxidation: 5, inflammation: 3, telomere: 3, metabolism: 1 } },
    ],
    next: "hair"
  },
  // ── HAIR ──
  {
    id: "hair",
    q: "Αντιμετωπίζετε τριχόπτωση;",
    type: "visual",
    options: [
      { id: "no", emoji: "💇", label: "Όχι", sub: "Τα μαλλιά μου είναι μια χαρά", scores: {} },
      { id: "mild", emoji: "🤏", label: "Ελαφρά", sub: "Κάποια αραίωση τελευταία", scores: { hairloss: 2 } },
      { id: "noticeable", emoji: "😟", label: "Αισθητή", sub: "Χάνω μαλλιά εδώ κι ένα διάστημα", scores: { hairloss: 4 } },
      { id: "family", emoji: "👨‍👩‍👧", label: "Οικογενειακό ιστορικό", sub: "Κληρονομική τριχόπτωση", scores: { hairloss: 5 } },
    ],
    next: "stress"
  },
  // ── STRESS ──
  {
    id: "stress",
    q: "Πόσο στρεσαρισμένη/ος νιώθετε;",
    type: "visual",
    options: [
      { id: "zen", emoji: "🧘", label: "Ήρεμα", sub: "Διαχειρίζομαι καλά το στρες", scores: {} },
      { id: "normal", emoji: "😐", label: "Κανονικά", sub: "Λίγο στρες αλλά ΟΚ", scores: {} },
      { id: "high", emoji: "😰", label: "Υψηλό", sub: "Νιώθω πίεση συχνά", scores: { telomere: 2, oxidation: 2, inflammation: 2 } },
      { id: "extreme", emoji: "🤯", label: "Εκρηκτικό", sub: "Μόνιμη ένταση", scores: { telomere: 4, oxidation: 3, inflammation: 3, gut: 1 } },
    ],
    next: "goal"
  },
  // ── GOAL ──
  {
    id: "goal",
    q: "Ποιος είναι ο στόχος σας;",
    type: "visual",
    options: [
      { id: "prevention", emoji: "🛡️", label: "Πρόληψη", sub: "Θέλω να μάθω πριν είναι αργά", scores: {} },
      { id: "appearance", emoji: "✨", label: "Εμφάνιση", sub: "Να φαίνομαι νεότερη/ος", scores: {} },
      { id: "energy_goal", emoji: "⚡", label: "Ενέργεια & Απόδοση", sub: "Να νιώθω καλύτερα", scores: {} },
      { id: "disease", emoji: "🏥", label: "Υγεία", sub: "Αντιμετώπιση προβλήματος", scores: {} },
    ],
    next: "contact"
  },
  // ── CONTACT ──
  {
    id: "contact",
    q: "Σχεδόν τελειώσαμε!",
    sub: "Συμπληρώστε τα στοιχεία σας για τα εξατομικευμένα αποτελέσματά σας",
    type: "contact",
    next: "results"
  }
];

function calculateArchetype(answers) {
  const dimScores = { inflammation: 0, oxidation: 0, metabolism: 0, glycation: 0, gut: 0, telomere: 0 };
  let hairlossScore = 0;

  Object.values(answers).forEach(a => {
    if (!a) return;
    const scores = a.scores || {};
    Object.entries(scores).forEach(([dim, val]) => {
      if (dim === "hairloss") { hairlossScore += val; return; }
      if (dimScores[dim] !== undefined) dimScores[dim] += val;
    });
  });

  // Convert dim scores → archetype scores
  const archScores = {};
  Object.keys(ARCHETYPES).forEach(a => archScores[a] = 0);
  Object.entries(dimScores).forEach(([dim, score]) => {
    const mapping = DIMS[dim];
    if (!mapping) return;
    Object.entries(mapping.archetypes).forEach(([arch, weight]) => {
      archScores[arch] += score * weight;
    });
  });

  // Sort and get winner
  const sorted = Object.entries(archScores).sort((a, b) => b[1] - a[1]);
  const maxScore = sorted[0][1] || 1;

  // Calculate estimated bio-age offset
  const age = answers.age?.value || 40;
  const totalDamage = Object.values(dimScores).reduce((a, b) => a + b, 0);
  const maxPossibleDamage = 60;
  // Healthy (0-5): -3 to -1 years younger
  // Mild (6-15): 0 to +3
  // Moderate (16-30): +3 to +8
  // High (31+): +8 to +15
  let bioAgeOffset;
  if (totalDamage <= 5) {
    bioAgeOffset = -Math.max(1, Math.round(3 - (totalDamage / 5) * 2));
  } else if (totalDamage <= 15) {
    bioAgeOffset = Math.round(((totalDamage - 5) / 10) * 3);
  } else if (totalDamage <= 30) {
    bioAgeOffset = Math.round(3 + ((totalDamage - 15) / 15) * 5);
  } else {
    bioAgeOffset = Math.round(8 + ((Math.min(totalDamage, maxPossibleDamage) - 30) / 30) * 7);
  }
  const bioAge = Math.max(age - 5, Math.min(age + 15, age + bioAgeOffset));

  // Determine if user is healthy (low total damage)
  const isHealthy = totalDamage <= 5;

  return {
    archetype: isHealthy ? {
      id: "healthy",
      name: "Ο Ακμαίος Οργανισμός",
      nameEn: "The Thriving Body",
      emoji: "🌟",
      color: "#2E7D32",
      gradient: "linear-gradient(135deg, #2E7D32, #66BB6A)",
      hallmarks: "Ισορροπημένοι Δείκτες · Υγιής Γήρανση",
      description: "Συγχαρητήρια! Οι συνήθειές σας δείχνουν ότι φροντίζετε εξαιρετικά τον οργανισμό σας. Ωστόσο, πολλοί παράγοντες γήρανσης — όπως η γενετική προδιάθεση, οι κρυφές ελλείψεις θρεπτικών ή η σιωπηλή φλεγμονή — δεν εκδηλώνονται με συμπτώματα. Μόνο εργαστηριακές εξετάσεις μπορούν να τους αποκαλύψουν.",
      risk: "Το 60% των παραγόντων γήρανσης είναι «σιωπηλοί» — δεν δίνουν συμπτώματα μέχρι να είναι αργά. Η γενετική σας προδιάθεση, το πραγματικό μήκος των τελομερών σας, και τα κρυφά επίπεδα οξειδωτικού στρες δεν φαίνονται από τις συνήθειες — φαίνονται μόνο στο εργαστήριο. Ο προληπτικός έλεγχος σας δίνει μια baseline εικόνα τώρα που είστε καλά, ώστε να μπορείτε να παρακολουθείτε τυχόν αλλαγές στο μέλλον.",
      exams: ["Ανάλυση Τελομερών — Μάθετε την πραγματική βιολογική σας ηλικία και αποκτήστε baseline για το μέλλον", "Εξετάσεις Μεταβολισμού — Ανιχνεύστε κρυφές ελλείψεις πριν γίνουν πρόβλημα", "Έλεγχος Οξειδωτικού Στρες — Εντοπίστε αν υπάρχει ανισορροπία που δεν δίνει ακόμα συμπτώματα"],
      tips: ["Συνεχίστε τον εξαιρετικό τρόπο ζωής σας — αποτελεί ισχυρή βάση", "Ένας ετήσιος προληπτικός έλεγχος δίνει ξεκάθαρη εικόνα εσωτερικά", "Η γνώση της βιολογικής σας ηλικίας μπορεί να αποκαλύψει κρυφή γενετική προδιάθεση"],
      url: "https://drthanasoula.gr/pages/procedures/"
    } : ARCHETYPES[sorted[0][0]],
    secondaryArchetype: isHealthy ? null : ARCHETYPES[sorted[1][0]],
    bioAge,
    chronoAge: age,
    bioAgeDiff: bioAge - age,
    dimScores,
    hairlossScore,
    isHealthy,
    topDims: Object.entries(dimScores).sort((a, b) => b[1] - a[1]).slice(0, 3),
  };
}

// ── COMPONENTS ──

function SliderQ({ question, value, onChange }) {
  const pct = ((value - question.min) / (question.max - question.min)) * 100;
  return (
    <div style={{ padding: "10px 0" }}>
      <div style={{
        textAlign: "center", fontSize: 48, fontWeight: 800,
        fontFamily: "'Playfair Display', serif", color: "#3E2E1C",
        marginBottom: 4
      }}>
        {value}
      </div>
      <div style={{ textAlign: "center", fontSize: 14, color: "#8B7355", marginBottom: 24 }}>
        {question.unit}
      </div>
      <div style={{ position: "relative", padding: "0 8px" }}>
        <input
          type="range" min={question.min} max={question.max} step={question.step}
          value={value}
          onChange={e => onChange(parseInt(e.target.value))}
          style={{
            width: "100%", height: 8, appearance: "none", borderRadius: 4,
            background: `linear-gradient(90deg, #C4953A ${pct}%, rgba(139,105,20,0.12) ${pct}%)`,
            outline: "none", cursor: "pointer"
          }}
        />
        <style>{`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none; width: 28px; height: 28px; border-radius: 50%;
            background: linear-gradient(135deg, #8B6914, #C4953A);
            box-shadow: 0 2px 8px rgba(139,105,20,0.3); cursor: pointer;
          }
        `}</style>
      </div>
      <div style={{
        display: "flex", justifyContent: "space-between",
        fontSize: 12, color: "#B0A08A", marginTop: 8, padding: "0 4px"
      }}>
        <span>{question.min}</span><span>{question.max}</span>
      </div>
    </div>
  );
}

function VisualOptionCard({ option, selected, onClick, index }) {
  return (
    <button onClick={onClick} style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "18px 12px", flex: "1 1 calc(50% - 6px)", minWidth: 140,
      background: selected
        ? "linear-gradient(135deg, rgba(139,105,20,0.12), rgba(196,149,58,0.08))"
        : "rgba(255,255,255,0.65)",
      border: selected ? "2.5px solid #C4953A" : "2px solid rgba(139,105,20,0.08)",
      borderRadius: 16, cursor: "pointer",
      transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
      animation: `fadeSlideUp 0.35s cubic-bezier(0.4,0,0.2,1) ${index * 0.05}s both`,
      boxShadow: selected ? "0 4px 16px rgba(139,105,20,0.12)" : "0 1px 4px rgba(0,0,0,0.03)",
      position: "relative", overflow: "hidden"
    }}>
      {selected && <div style={{
        position: "absolute", top: 8, right: 8, width: 20, height: 20,
        borderRadius: "50%", background: "#C4953A", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, fontWeight: 700
      }}>✓</div>}
      <span style={{ fontSize: 32, marginBottom: 8 }}>{option.emoji}</span>
      <span style={{
        fontSize: 14, fontWeight: 600, color: "#3E2E1C", textAlign: "center",
        fontFamily: "'DM Sans', sans-serif", lineHeight: 1.3
      }}>{option.label}</span>
      {option.sub && <span style={{
        fontSize: 11, color: "#8B7355", textAlign: "center", marginTop: 4,
        fontFamily: "'DM Sans', sans-serif", lineHeight: 1.3
      }}>{option.sub}</span>}
    </button>
  );
}

function BioAgeMeter({ bioAge, chronoAge, diff }) {
  const isOlder = diff > 0;
  const isSame = diff === 0;
  return (
    <div style={{
      textAlign: "center", padding: "32px 24px",
      background: isOlder
        ? "linear-gradient(135deg, rgba(198,40,40,0.06), rgba(230,81,0,0.04))"
        : "linear-gradient(135deg, rgba(46,125,50,0.06), rgba(67,160,71,0.04))",
      borderRadius: 24, marginBottom: 20,
      border: `2px solid ${isOlder ? "rgba(198,40,40,0.15)" : "rgba(46,125,50,0.15)"}`,
      animation: "fadeSlideUp 0.5s both"
    }}>
      <div style={{ fontSize: 13, color: "#8B7355", fontFamily: "'DM Sans', sans-serif", marginBottom: 8 }}>
        Εκτιμώμενη Βιολογική Ηλικία
      </div>
      <div style={{
        fontSize: 64, fontWeight: 800, fontFamily: "'Playfair Display', serif",
        color: isOlder ? "#C62828" : "#2E7D32", lineHeight: 1
      }}>
        {bioAge}
      </div>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "6px 16px", borderRadius: 20, marginTop: 12,
        background: isOlder ? "rgba(198,40,40,0.1)" : isSame ? "rgba(139,105,20,0.1)" : "rgba(46,125,50,0.1)",
        fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
        color: isOlder ? "#C62828" : isSame ? "#8B6914" : "#2E7D32"
      }}>
        {isOlder ? "↑" : isSame ? "=" : "↓"} {Math.abs(diff)} χρόνια {isOlder ? "μεγαλύτερη" : isSame ? "ίδια" : "νεότερη"} από τη χρονολογική ({chronoAge})
      </div>
      <p style={{
        fontSize: 11, color: "#B0A08A", marginTop: 12, fontStyle: "italic",
        fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4
      }}>
        * Ενδεικτική εκτίμηση βάσει lifestyle factors. Για ακριβή μέτρηση απαιτείται ανάλυση τελομερών.
      </p>
    </div>
  );
}

function DimBar({ label, value, maxVal, color, index }) {
  const pct = Math.min(100, Math.round((value / maxVal) * 100));
  const riskLevel = value === 0 ? "Εξαιρετικό" : pct > 66 ? "Υψηλός" : pct > 33 ? "Μέτριος" : "Χαμηλός";
  const riskColor = value === 0 ? "#2E7D32" : pct > 66 ? "#C62828" : pct > 33 ? "#E65100" : "#8B7355";
  return (
    <div style={{
      marginBottom: 12, animation: `fadeSlideUp 0.4s ${0.3 + index * 0.1}s both`
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 4, fontSize: 13, fontFamily: "'DM Sans', sans-serif"
      }}>
        <span style={{ color: "#3E2E1C", fontWeight: 600 }}>{label}</span>
        <span style={{ color: riskColor, fontWeight: 700, fontSize: 11 }}>{riskLevel}</span>
      </div>
      <div style={{ height: 8, borderRadius: 4, background: "rgba(139,105,20,0.08)" }}>
        <div style={{
          height: "100%", borderRadius: 4,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          width: `${pct}%`, transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
          animation: `barGrow 1s cubic-bezier(0.4,0,0.2,1) ${0.5 + index * 0.1}s both`
        }} />
      </div>
    </div>
  );
}

function ContactForm({ onSubmit }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState({});
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.phone.trim()) e.phone = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, animation: "fadeSlideUp 0.4s both" }}>
      {[
        { key: "name", ph: "Ονοματεπώνυμο *", type: "text" },
        { key: "phone", ph: "Τηλέφωνο *", type: "tel" },
        { key: "email", ph: "Email (προαιρετικό)", type: "email" },
      ].map(f => (
        <input key={f.key} placeholder={f.ph} type={f.type}
          value={form[f.key]}
          onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
          style={{
            width: "100%", padding: "14px 18px", borderRadius: 12, fontSize: 15,
            border: errors[f.key] ? "2px solid #C62828" : "2px solid rgba(139,105,20,0.1)",
            background: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif",
            color: "#3E2E1C", outline: "none", boxSizing: "border-box"
          }}
        />
      ))}
      <p style={{ fontSize: 11, color: "#B0A08A", fontFamily: "'DM Sans', sans-serif" }}>
        🔒 Τα στοιχεία σας είναι ασφαλή και δεν κοινοποιούνται σε τρίτους.
      </p>
      <button onClick={() => validate() && onSubmit(form)} style={{
        padding: "16px", border: "none", borderRadius: 14, cursor: "pointer",
        background: "linear-gradient(135deg, #8B6914, #C4953A)",
        color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
        boxShadow: "0 4px 20px rgba(139,105,20,0.3)"
      }}>
        Αποκαλύψτε τον Τύπο Γήρανσής σας →
      </button>
    </div>
  );
}

// ── MAIN APP ──
export default function AgingQuizV2() {
  const [curId, setCurId] = useState("age");
  const [answers, setAnswers] = useState({});
  const [sliderVal, setSliderVal] = useState(40);
  const [multiSel, setMultiSel] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [contact, setContact] = useState(null);
  const [history, setHistory] = useState(["age"]);
  const [stepNum, setStepNum] = useState(1);
  const ref = useRef(null);

  const q = QUESTIONS.find(x => x.id === curId);
  const totalSteps = 12;

  useEffect(() => {
    ref.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [curId, showResults]);

  const goNext = (nextId, answer) => {
    const updated = { ...answers, [curId]: answer };
    setAnswers(updated);
    setMultiSel([]);
    if (nextId === "results") {
      setShowResults(true);
    } else {
      setHistory(h => [...h, nextId]);
      setCurId(nextId);
      setStepNum(s => s + 1);
    }
  };

  const goBack = () => {
    if (history.length > 1) {
      const h = [...history]; h.pop();
      setHistory(h); setCurId(h[h.length - 1]);
      setStepNum(s => Math.max(1, s - 1));
      setShowResults(false);
    }
  };

  const handleVisual = (opt) => {
    const nextId = opt.next || q.next;
    goNext(nextId, opt);
  };

  const handleMulti = () => {
    if (multiSel.length === 0) return;
    const merged = {};
    multiSel.forEach(o => {
      Object.entries(o.scores || {}).forEach(([k, v]) => {
        merged[k] = (merged[k] || 0) + v;
      });
    });
    goNext(q.next, { scores: merged, ids: multiSel.map(o => o.id) });
  };

  const handleSlider = () => {
    const scores = q.scoring(sliderVal);
    goNext(q.next, { value: sliderVal, scores });
  };

  const handleContact = (info) => {
    setContact(info);
    setShowResults(true);
  };

  const restart = () => {
    setCurId("age"); setAnswers({}); setSliderVal(40);
    setMultiSel([]); setShowResults(false); setContact(null);
    setHistory(["age"]); setStepNum(1);
  };

  const result = showResults ? calculateArchetype(answers) : null;

  const DIM_LABELS = {
    inflammation: { label: "Φλεγμονή", color: "#C62828" },
    oxidation: { label: "Οξειδωτικό Στρες", color: "#E65100" },
    metabolism: { label: "Μεταβολισμός", color: "#2E7D32" },
    glycation: { label: "Γλυκοζυλίωση", color: "#F57F17" },
    gut: { label: "Εντερική Υγεία", color: "#1565C0" },
    telomere: { label: "Κυτταρική Γήρανση", color: "#8B6914" },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:wght@600;700;800&display=swap');
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes barGrow { from { width:0; } }
        * { box-sizing: border-box; margin:0; padding:0; }
        button:hover { filter: brightness(1.03); }
        button:active { transform: scale(0.98); }
        input:focus { border-color: #C4953A !important; box-shadow: 0 0 0 3px rgba(196,149,58,0.15); }
      `}</style>

      <div ref={ref} style={{
        minHeight: "100vh",
        background: "linear-gradient(165deg, #FDF8F0 0%, #F5EDE0 40%, #EDE3D2 100%)",
        fontFamily: "'DM Sans', sans-serif", overflowY: "auto"
      }}>
        <div style={{ maxWidth: 520, margin: "0 auto", padding: "20px 16px 40px" }}>

          {/* HEADER */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 16px", borderRadius: 30,
              background: "rgba(139,105,20,0.06)", border: "1px solid rgba(139,105,20,0.1)",
              marginBottom: 12
            }}>
              <span style={{ fontSize: 16 }}>🧬</span>
              <span style={{
                fontSize: 11, fontWeight: 600, color: "#8B6914",
                letterSpacing: "0.06em", textTransform: "uppercase"
              }}>Dr. Μαρία Θανάσουλα</span>
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: showResults ? 24 : 22, fontWeight: 700,
              color: "#3E2E1C", lineHeight: 1.2, marginBottom: 6
            }}>
              {showResults ? `${contact?.name?.split(" ")[0] || ""}, Αυτός Είναι ο Τύπος Γήρανσής σας` : "Τι Τύπος Γήρανσης Είστε;"}
            </h1>
            {!showResults && (
              <p style={{ fontSize: 13, color: "#8B7355", lineHeight: 1.4 }}>
                {curId !== "contact"
                  ? "Βασισμένο στα 12 Hallmarks of Aging (Cell, 2023)"
                  : "Ένα βήμα ακόμη για τα αποτελέσματά σας"
                }
              </p>
            )}
          </div>

          {/* PROGRESS */}
          {!showResults && (
            <div style={{ marginBottom: 24 }}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                fontSize: 12, color: "#8B7355", marginBottom: 6
              }}>
                <span>{stepNum} / {totalSteps}</span>
                <span>{Math.round((stepNum / totalSteps) * 100)}%</span>
              </div>
              <div style={{ height: 5, borderRadius: 3, background: "rgba(139,105,20,0.1)" }}>
                <div style={{
                  height: "100%", borderRadius: 3,
                  background: "linear-gradient(90deg, #8B6914, #C4953A)",
                  width: `${(stepNum / totalSteps) * 100}%`,
                  transition: "width 0.4s ease"
                }} />
              </div>
            </div>
          )}

          {/* BACK */}
          {!showResults && history.length > 1 && (
            <button onClick={goBack} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#8B7355", fontSize: 13, marginBottom: 12, padding: "2px 0",
              fontFamily: "'DM Sans', sans-serif"
            }}>← Πίσω</button>
          )}

          {!showResults && q && q.type !== "contact" ? (
            <div key={curId} style={{ animation: "fadeSlideUp 0.35s both" }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700,
                color: "#3E2E1C", marginBottom: q.sub ? 4 : 16, lineHeight: 1.3
              }}>{q.q}</h2>
              {q.sub && <p style={{ fontSize: 13, color: "#8B7355", marginBottom: 16 }}>{q.sub}</p>}

              {q.type === "slider" && (
                <>
                  <SliderQ question={q} value={sliderVal} onChange={setSliderVal} />
                  <button onClick={handleSlider} style={{
                    width: "100%", padding: "16px", marginTop: 16, border: "none",
                    borderRadius: 14, cursor: "pointer",
                    background: "linear-gradient(135deg, #8B6914, #C4953A)",
                    color: "#fff", fontSize: 15, fontWeight: 700,
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: "0 4px 16px rgba(139,105,20,0.25)"
                  }}>Συνέχεια →</button>
                </>
              )}

              {q.type === "visual" && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {q.options.map((opt, i) => (
                    <VisualOptionCard key={opt.id} option={opt} index={i}
                      selected={false} onClick={() => handleVisual(opt)} />
                  ))}
                </div>
              )}

              {q.type === "multi" && (
                <>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {q.options.map((opt, i) => (
                      <VisualOptionCard key={opt.id} option={opt} index={i}
                        selected={multiSel.some(o => o.id === opt.id)}
                        onClick={() => {
                          if (opt.id === "neither" || opt.id === "none") {
                            goNext(q.next, { scores: {}, ids: [opt.id] });
                            return;
                          }
                          setMultiSel(prev =>
                            prev.some(o => o.id === opt.id)
                              ? prev.filter(o => o.id !== opt.id)
                              : [...prev.filter(o => o.id !== "neither" && o.id !== "none"), opt]
                          );
                        }}
                      />
                    ))}
                  </div>
                  {multiSel.length > 0 && (
                    <button onClick={handleMulti} style={{
                      width: "100%", padding: "14px", marginTop: 14, border: "none",
                      borderRadius: 14, cursor: "pointer",
                      background: "linear-gradient(135deg, #8B6914, #C4953A)",
                      color: "#fff", fontSize: 15, fontWeight: 700,
                      fontFamily: "'DM Sans', sans-serif",
                      boxShadow: "0 4px 16px rgba(139,105,20,0.25)"
                    }}>Συνέχεια ({multiSel.length}) →</button>
                  )}
                </>
              )}
            </div>

          ) : !showResults && q && q.type === "contact" ? (
            /* CONTACT FORM */
            <div style={{ animation: "fadeSlideUp 0.4s both" }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700,
                color: "#3E2E1C", marginBottom: 6
              }}>Σχεδόν έτοιμο!</h2>
              <p style={{ fontSize: 13, color: "#8B7355", marginBottom: 20, lineHeight: 1.5 }}>
                Συμπληρώστε τα στοιχεία σας για να λάβετε τα εξατομικευμένα αποτελέσματά σας
              </p>
              <ContactForm onSubmit={handleContact} />
            </div>

          ) : result && (
            /* ── RESULTS ── */
            <div>
              <BioAgeMeter bioAge={result.bioAge} chronoAge={result.chronoAge} diff={result.bioAgeDiff} />

              {/* ARCHETYPE CARD */}
              <div style={{
                padding: "28px 24px", borderRadius: 24, marginBottom: 20,
                background: result.archetype.gradient, color: "#fff",
                position: "relative", overflow: "hidden",
                animation: "fadeSlideUp 0.5s 0.2s both"
              }}>
                <div style={{
                  position: "absolute", top: -30, right: -30, width: 120, height: 120,
                  borderRadius: "50%", background: "rgba(255,255,255,0.08)"
                }} />
                <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 4 }}>Ο τύπος γήρανσής σας:</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 44 }}>{result.archetype.emoji}</span>
                  <div>
                    <h3 style={{
                      fontSize: 22, fontWeight: 800, fontFamily: "'Playfair Display', serif",
                      margin: 0, lineHeight: 1.2
                    }}>{result.archetype.name}</h3>
                    <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>
                      {result.archetype.nameEn}
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: 11, opacity: 0.7, padding: "4px 10px",
                  background: "rgba(255,255,255,0.15)", borderRadius: 8,
                  display: "inline-block", marginBottom: 14
                }}>
                  Hallmarks: {result.archetype.hallmarks}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.95 }}>
                  {result.archetype.description}
                </p>
              </div>

              {/* RISK / PREVENTION INFO */}
              <div style={{
                padding: "16px 20px", borderRadius: 14, marginBottom: 20,
                background: result.isHealthy
                  ? "rgba(139,105,20,0.05)"
                  : "rgba(198,40,40,0.05)",
                border: result.isHealthy
                  ? "1.5px solid rgba(139,105,20,0.12)"
                  : "1.5px solid rgba(198,40,40,0.1)",
                animation: "fadeSlideUp 0.5s 0.3s both"
              }}>
                <div style={{
                  fontSize: 13, fontWeight: 700, marginBottom: 6,
                  color: result.isHealthy ? "#8B6914" : "#C62828"
                }}>
                  {result.isHealthy ? "🔍 Γιατί αξίζει ο προληπτικός έλεγχος" : "⚠️ Γιατί είναι σημαντικό"}
                </div>
                <p style={{ fontSize: 13, color: "#5C4510", lineHeight: 1.5 }}>
                  {result.archetype.risk}
                </p>
              </div>

              {/* DIMENSION SCORES */}
              <div style={{
                padding: "20px", borderRadius: 18, marginBottom: 20,
                background: "rgba(255,255,255,0.5)", border: "1.5px solid rgba(139,105,20,0.08)",
                animation: "fadeSlideUp 0.5s 0.4s both"
              }}>
                <h4 style={{
                  fontSize: 15, fontWeight: 700, color: "#3E2E1C", marginBottom: 14,
                  fontFamily: "'Playfair Display', serif"
                }}>Ανάλυση Παραγόντων Γήρανσης</h4>
                {Object.entries(DIM_LABELS).map(([dim, info], i) => (
                  <DimBar key={dim} label={info.label} value={result.dimScores[dim]}
                    maxVal={20} color={info.color} index={i} />
                ))}
              </div>

              {/* RECOMMENDED EXAMS */}
              <div style={{
                padding: "20px", borderRadius: 18, marginBottom: 20,
                background: "linear-gradient(135deg, rgba(139,105,20,0.06), rgba(196,149,58,0.03))",
                border: "1.5px solid rgba(139,105,20,0.1)",
                animation: "fadeSlideUp 0.5s 0.5s both"
              }}>
                <h4 style={{
                  fontSize: 15, fontWeight: 700, color: "#3E2E1C", marginBottom: 14,
                  fontFamily: "'Playfair Display', serif"
                }}>{result.isHealthy ? "🛡️ Προληπτικές Εξετάσεις" : "🔬 Προτεινόμενες Εξετάσεις"}</h4>
                {result.archetype.exams.map((exam, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 14px", marginBottom: 8,
                    background: "rgba(255,255,255,0.6)", borderRadius: 10,
                    border: i === 0 ? "1.5px solid rgba(196,149,58,0.3)" : "1px solid rgba(139,105,20,0.06)"
                  }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, color: "#fff",
                      background: i === 0 ? "#C4953A" : "#B0A08A",
                      padding: "2px 8px", borderRadius: 6, flexShrink: 0
                    }}>#{i + 1}</span>
                    <span style={{
                      fontSize: 14, fontWeight: i === 0 ? 700 : 500, color: "#3E2E1C",
                      fontFamily: "'DM Sans', sans-serif"
                    }}>{exam}</span>
                  </div>
                ))}
              </div>

              {/* TIPS */}
              <div style={{
                padding: "20px", borderRadius: 18, marginBottom: 24,
                background: "rgba(46,125,50,0.04)", border: "1.5px solid rgba(46,125,50,0.1)",
                animation: "fadeSlideUp 0.5s 0.6s both"
              }}>
                <h4 style={{
                  fontSize: 15, fontWeight: 700, color: "#2E7D32", marginBottom: 12,
                  fontFamily: "'Playfair Display', serif"
                }}>💡 Τι Μπορείτε να Κάνετε Τώρα</h4>
                {result.archetype.tips.map((tip, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start"
                  }}>
                    <span style={{ color: "#2E7D32", fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 13, color: "#3E2E1C", lineHeight: 1.5 }}>{tip}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{
                textAlign: "center", padding: "28px 24px", borderRadius: 24,
                background: "linear-gradient(135deg, rgba(139,105,20,0.08), rgba(196,149,58,0.04))",
                border: "2px solid rgba(139,105,20,0.12)",
                animation: "fadeSlideUp 0.5s 0.7s both"
              }}>
                <p style={{
                  fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700,
                  color: "#3E2E1C", marginBottom: 8
                }}>{result.isHealthy
                  ? "Επιβεβαιώστε το με εργαστηριακή ανάλυση"
                  : "Θέλετε ακριβή αποτελέσματα;"
                }</p>
                <p style={{ fontSize: 13, color: "#8B7355", marginBottom: 18, lineHeight: 1.5 }}>
                  {result.isHealthy
                    ? "Τώρα που είστε καλά είναι η ιδανική στιγμή για ένα baseline check-up — αποκτήστε σημείο αναφοράς για το μέλλον"
                    : "Κλείστε ραντεβού με τη Dr. Θανάσουλα για εργαστηριακή ανάλυση"
                  }
                </p>
                <a href="tel:+306973961749" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "16px 28px", borderRadius: 14, textDecoration: "none",
                  background: "linear-gradient(135deg, #8B6914, #C4953A)",
                  color: "#fff", fontSize: 16, fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: "0 4px 20px rgba(139,105,20,0.3)"
                }}>📞 697 39 61 749</a>
                <p style={{ fontSize: 11, color: "#B0A08A", marginTop: 12 }}>
                  Ηρώδου Αττικού 7, Κηφισιά · Δευ-Παρ 11:00-19:00
                </p>
              </div>

              <button onClick={restart} style={{
                display: "block", margin: "20px auto 0", padding: "10px 20px",
                background: "none", border: "1.5px solid rgba(139,105,20,0.15)",
                borderRadius: 10, color: "#8B7355", fontSize: 13, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif"
              }}>↺ Ξεκινήστε ξανά</button>

              {/* Trust */}
              <div style={{
                display: "flex", justifyContent: "center", gap: 16, marginTop: 24, flexWrap: "wrap"
              }}>
                {["🎓 Oxford PhD", "🔬 18 Publications", "🏥 Κηφισιά"].map(b => (
                  <span key={b} style={{
                    fontSize: 11, color: "#8B7355", padding: "5px 10px", borderRadius: 16,
                    background: "rgba(139,105,20,0.04)", fontFamily: "'DM Sans', sans-serif"
                  }}>{b}</span>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div style={{ textAlign: "center", marginTop: 36, paddingTop: 16, borderTop: "1px solid rgba(139,105,20,0.06)" }}>
            <p style={{ fontSize: 10, color: "#C4B8A4", lineHeight: 1.5 }}>
              © {new Date().getFullYear()} Dr. Μαρία Θανάσουλα<br />
              Βασισμένο στα 12 Hallmarks of Aging (López-Otín et al., Cell 2023).<br />
              Τα αποτελέσματα είναι ενδεικτικά — η τελική αξιολόγηση γίνεται από τον ειδικό.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
