import { useState } from "react";

// ─────────────────────────────────────────────
// TYPES & INTERFACES
// ─────────────────────────────────────────────

// EQ კატეგორიის ტიპი
interface EQCategory {
  label: string;
  icon: string;
  color: string;
}

// კატეგორიების გასაღებების ტიპი — union type რომ მხოლოდ ნამდვილი გასაღებები გამოვიყენოთ
type CategoryKey =
  | "selfAwareness"
  | "selfManagement"
  | "socialAwareness"
  | "relationshipMgmt"
  | "empathy"
  | "motivation";

// კითხვის ტიპი
interface Question {
  id: number;
  category: CategoryKey; // string-ის ნაცვლად კონკრეტული union type
  text: string;
}

// სკალის ერთი ელემენტის ტიპი
interface ScaleItem {
  value: number;
  label: string;
}

// EQ დონის ტიპი — getLevel()-ის დაბრუნებული მნიშვნელობა
interface EQLevel {
  level: string;
  emoji: string;
  color: string;
}

// პასუხების ტიპი — კითხვის id → მნიშვნელობა
type AnswersMap = Record<number, number>;

// კატეგორიების ქულების ტიპი
type CategoryScores = Record<CategoryKey, number>;

// რეკომენდაციების ტიპი (high/low)
interface CategoryRecommendation {
  high: string;
  low: string;
}

// Quiz-ის step-ების ტიპი
type QuizStep = "intro" | "quiz" | "results";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

// Record<CategoryKey, EQCategory> — ყველა კატეგორია ტიპიზებული
const EQ_CATEGORIES = {
  selfAwareness: { 
    label: "თვითცნობიერება", 
    icon: "🪞",    // Mirror – სიმბოლურად თვით-რეფლექსია, თვითშემეცნება
    color: "#C9A87C" 
  },
  selfManagement: { 
    label: "თვითმართვა", 
    icon: "🧘",    // Person in Lotus Position – სიმშვიდე, თვითკონტროლი, ბალანსი
    color: "#8BBCAA" 
  },
  socialAwareness: { 
    label: "სოციალური ცნობიერება", 
    icon: "🌿",    // Eyes – დაკვირვება, სხვების ემოციების შემჩნევა
   
    color: "#A8B5D1" 
  },
  relationshipMgmt: { 
    label: "ურთიერთობების მართვა", 
    icon: "🤝",    // Handshake – ურთიერთობა, თანამშრომლობა (შენი ძველი კარგია)
    // ალტერნატივა თუ გინდა უფრო თბილი: "💞" ან "🫂"
    color: "#D4A5A5" 
  },
  empathy: { 
    label: "ემპათია", 
    icon: "💖",    // Sparkling Heart – თბილი, გულწრფელი ემპათია
    // ალტერნატივა: "🫶" (Heart Hands) – ძალიან პოპულარული და ლამაზი 2024-2025+
    color: "#E8C97A" 
  },
  motivation: { 
    label: "მოტივაცია", 
    icon: "✨",    // Sparkles – შთაგონება, შინაგანი ბრწყინვალება, ენერგია
    
    color: "#B5A8D1" 
  },
};
// Question[] — მასივი ტიპიზებული
const QUESTIONS: Question[] = [
  { id: 1,  category: "selfAwareness",    text: "შემიძლია ადვილად ამოვიცნო, რა ემოცია ვიგრძენი კონკრეტულ სიტუაციაში." },
  { id: 2,  category: "selfAwareness",    text: "ვიცი, რა სიტუაციები ან ადამიანები იწვევენ ჩემში ძლიერ ემოციურ რეაქციებს." },
  { id: 3,  category: "selfAwareness",    text: "ჩემი ფიზიკური შეგრძნებებიდან (მაგ. გულის ფრიალი, დაძაბულობა) ვიგრძნობ, რომ ემოციურად ვარ სტრესული." },
  { id: 4,  category: "selfManagement",   text: "სტრესულ სიტუაციებში ვახერხებ ემოციების კონტროლს და წონასწორობის შენარჩუნებას." },
  { id: 5,  category: "selfManagement",   text: "შეცდომის შემდეგ სწრაფად ვახერხებ გაუმჯობესებაზე ფოკუსირებას, ნაცვლად თავის დადანაშაულებისა." },
  { id: 6,  category: "selfManagement",   text: "შემიძლია გადადო სასიამოვნო, მაგრამ ნაკლებად მნიშვნელოვანი რამ, მიზნის მისაღწევად." },
  { id: 7,  category: "socialAwareness",  text: "სხვის ემოციებს ადვილად ვამჩნევ — სიტყვებამდეც კი, მათი ტონის ან მიმიკებიდან." },
  { id: 8,  category: "socialAwareness",  text: "ჯგუფური სიტუაციებში ვგრძნობ განწყობის ცვლილებებს." },
  { id: 9,  category: "socialAwareness",  text: "ვახერხებ სხვის პერსპექტივის გაგებას, მაშინაც კი, თუ ჩემი შეხედულება განსხვავებულია." },
  { id: 10, category: "relationshipMgmt", text: "კონფლიქტური სიტუაციების მოგვარებაში სხვებს ვეხმარები." },
  { id: 11, category: "relationshipMgmt", text: "ჩემი სიტყვები და ქმედებები სხვებს შთААაგონებს ან მოტივაციას აძლევს." },
  { id: 12, category: "relationshipMgmt", text: "ვახერხებ გულწრფელი და ღია ურთიერთობების დამყარებას." },
  { id: 13, category: "empathy",          text: "როდესაც ვინმე ჩემთვის ახლობელი ტანჯვაშია, ღრმად ვგრძნობ მის ტკივილს." },
  { id: 14, category: "empathy",          text: "სხვისი ამბის მოსმენისას ჩემი პირველი რეფლექსი კითხვა კი არ არის, არამედ — გაგება." },
  { id: 15, category: "empathy",          text: "შემიძლია ვიყო სხვასთან მხარდაჭერით, ჩემი ემოციური გადატვირთვის გარეშე." },
  { id: 16, category: "motivation",       text: "სიძნელეების მიუხედავად, ჩემი შინაგანი მიზნები ძლიერ მიგრძნობინებს მხარდაჭერილად." },
  { id: 17, category: "motivation",       text: "ოპტიმისტური ვარ მაშინაც კი, როდესაც გარემო მხარს არ უჭერს." },
  { id: 18, category: "motivation",       text: "ვმოქმედებ ჩემი ღირებულებების შესაბამისად, გარე წნეხის მიუხედავად." },
];

// ScaleItem[] — სკალა ტიპიზებული
const SCALE: ScaleItem[] = [
  { value: 1, label: "საერთოდ არ ვეთანხმები" },
  { value: 2, label: "ნაწილობრივ ვეთანხმები" },
  { value: 3, label: "ზომიერად ვეთანხმები" },
  { value: 4, label: "ვეთანხმები" },
  { value: 5, label: "სრულად ვეთანხმები" },
];

// score: number პარამეტრი, EQLevel დაბრუნება
const getLevel = (score: number): EQLevel => {
  if (score >= 85) return { level: "EQ ლიდერი",    emoji: "🌟", color: "#C9A87C" };
  if (score >= 70) return { level: "EQ ვარსკვლავი", emoji: "✨", color: "#8BBCAA" };
  if (score >= 55) return { level: "EQ მოყვარული",  emoji: "🌱", color: "#A8B5D1" };
  return              { level: "EQ დამწყები",    emoji: "🔆", color: "#D4A5A5" };
};

// score: number პარამეტრი, string დაბრუნება
const getCategoryLevel = (score: number): string => {
  if (score >= 85) return "ძლიერი";
  if (score >= 65) return "საშუალო";
  return "განვითარებადი";
};

// Record<CategoryKey, CategoryRecommendation> — ტიპიზებული რეკომენდაციები
const RECOMMENDATIONS: Record<CategoryKey, CategoryRecommendation> = {
  selfAwareness: {
    high: "შენი თვითცნობიერება გამორჩეულია. გააგრძელე დღიური პრაქტიკა — ემოციების ეტიკეტირება კიდევ უფრო გაღრმავებს ამ უნარს.",
    low:  "სცადე ყოველ საღამოს 5 წუთი ემოციების ჟურნალი: 'დღეს ვიგრძენი..., რადგან...'. ეს ნელ-ნელა შენი შინაგანი ენის ლექსიკას განავითარებს.",
  },
  selfManagement: {
    high: "შენ შესანიშნავად მართავ ემოციებს. შეგიძლია სხვებს ასწავლო ეს უნარი — ეს კიდევ უფრო განამტკიცებს შენსას.",
    low:  "სცადე STOP ტექნიკა: სტრესულ მომენტში — გაჩერდი, ჩაისუნთქე ღრმად, დააკვირდი ემოციას, მხოლოდ შემდეგ — მოიქეცი. 3 წამი ბევრ რამეს ცვლის.",
  },
  socialAwareness: {
    high: "სოციალური ცნობიერება შენი სუპერძალაა. ამ სიმახვილეს გუნდებში, კრიზისულ სიტუაციებში გამოიყენე.",
    low:  "შემდეგ საუბარში სცადე ფოკუსი სიტყვების ნაცვლად — ტონზე, სახის გამომეტყველებაზე. კითხე: 'რა ვიგრძენი ამ ადამიანში?'",
  },
  relationshipMgmt: {
    high: "ურთიერთობების მართვაში ძლიერი ხარ. ეს ლიდერის ნიჭია — იყო ის, ვინც ხიდებს აშენებს.",
    low:  "ყოველ კვირა ერთ ადამიანს გაუგზავნე გული — მადლობა, ყურადღება ან უბრალოდ 'შენზე ვფიქრობდი'. პატარა ქმედებები ბადეს ქმნის.",
  },
  empathy: {
    high: "შენი ემპათია ბუნებრივია და ღრმა. ეს ჩუქება — ისე გამოიყენე, რომ საკუთარ თავსაც მიცე.",
    low:  "ემპათია ივარჯიშება. მოუსმინე ვინმეს 3 წუთი — შეწყვეტის, გადამისამართების, ან გამოსავლის ძიების გარეშე. მხოლოდ — ყოფნა.",
  },
  motivation: {
    high: "შენი შინაგანი ცეცხლი ანათებს. ეს კი სხვებსაც ათბობს — გაიმეორე ეს ცოდნა, ჩაიწერე, გაუზიარე.",
    low:  "იპოვე შენი 'რატომ' — ის ღირებულება, რომელიც ყველაფრის სიღრმეშია. ხშირად სწორედ იქ ძევს ყველაზე ძლიერი მოტივაცია.",
  },
};

// string[] — ყოველდღიური რჩევები
const DAILY_TIPS: string[] = [
  "📔 დღიური: 3 ემოცია, 3 სიტყვა — ყოველ საღამოს 5 წუთი.",
  "🧘 სუნთქვა 4-7-8: ჩაისუნთქე 4 წამი, შეიკავე 7, ამოისუნთქე 8. გაიმეორე 3-ჯერ.",
  "🌿 ბუნებაში გასეირნება 15 წუთი — ტელეფონის გარეშე. სრული ყოფნა.",
  "💛 მადლიერების პრაქტიკა: 3 რამ, რისთვისაც დღეს მადლობელი ხარ.",
  "🤝 ერთ ადამიანს დაუძახე ან დაუწერე — მხოლოდ მის მოსასმენად.",
  "🔍 HALT შემოწმება: ხარ თუ არა მშიერი, გამართლებული, მარტოდ, დაღლილი? ეს ემოციებს მართავს.",
  "🎯 დღის ინტენცია: დილით 1 წინადადებით — 'დღეს ვიყოფი...' ან 'დღეს ვისწავლი...'",
];

// ─────────────────────────────────────────────
// PDF GENERATION
// ─────────────────────────────────────────────

// ყველა პარამეტრი ტიპიზებული, void დაბრუნება
const generatePDF = (
  userName: string,
  scores: CategoryScores,
  totalScore: number,
  recommendations: Record<CategoryKey, string>
): void => {
  const level = getLevel(totalScore);
  const dateStr = new Date().toLocaleDateString("ka-GE");

  const htmlContent = `<!DOCTYPE html>
<html lang="ka">
<head>
<meta charset="UTF-8">
<style>
 
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Lato', sans-serif; background: #FDFAF6; color: #2C2C2C; }
  .cover { background: linear-gradient(135deg, #2C2C2C 0%, #4A3728 100%); color: white; padding: 60px 50px; min-height: 280px; display: flex; flex-direction: column; justify-content: center; position: relative; overflow: hidden; }
  .cover::before { content: ''; position: absolute; top: -50px; right: -50px; width: 300px; height: 300px; border-radius: 50%; background: rgba(201,168,124,0.15); }
  .cover::after { content: ''; position: absolute; bottom: -80px; left: -80px; width: 400px; height: 400px; border-radius: 50%; background: rgba(201,168,124,0.08); }
  .logo-nb { font-family: 'Playfair Display', serif; font-size: 42px; font-weight: 700; color: #C9A87C; letter-spacing: 4px; margin-bottom: 8px; }
  .brand-name { font-size: 14px; color: rgba(255,255,255,0.7); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 30px; }
  .report-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 400; margin-bottom: 8px; }
  .report-sub { font-size: 13px; color: rgba(255,255,255,0.6); letter-spacing: 1px; }
  .meta { margin-top: 24px; font-size: 12px; color: rgba(255,255,255,0.5); }
  .section { padding: 40px 50px; }
  .result-box { background: linear-gradient(135deg, #2C2C2C, #4A3728); color: white; border-radius: 16px; padding: 35px; margin: 30px 50px; text-align: center; }
  .score-big { font-family: 'Playfair Display', serif; font-size: 72px; color: #C9A87C; line-height: 1; }
  .score-label { font-size: 13px; color: rgba(255,255,255,0.6); letter-spacing: 2px; text-transform: uppercase; margin-top: 8px; }
  .level-badge { display: inline-block; background: rgba(201,168,124,0.2); border: 1px solid #C9A87C; color: #C9A87C; padding: 8px 20px; border-radius: 20px; font-size: 16px; margin-top: 16px; }
  .h2 { font-family: 'Playfair Display', serif; font-size: 20px; color: #2C2C2C; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #C9A87C; }
  .cat-row { display: flex; align-items: center; margin-bottom: 16px; gap: 12px; }
  .cat-icon { font-size: 22px; width: 32px; }
  .cat-info { flex: 1; }
  .cat-name { font-size: 13px; font-weight: 700; color: #2C2C2C; margin-bottom: 4px; }
  .bar-track { background: #E8E0D5; border-radius: 6px; height: 8px; }
  .bar-fill { height: 8px; border-radius: 6px; background: linear-gradient(90deg, #C9A87C, #E8C97A); }
  .cat-score { font-size: 13px; font-weight: 700; color: #C9A87C; min-width: 50px; text-align: right; }
  .rec-box { background: #F7F3ED; border-left: 3px solid #C9A87C; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 14px; }
  .rec-title { font-size: 12px; font-weight: 700; color: #C9A87C; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
  .rec-text { font-size: 13px; color: #4A4A4A; line-height: 1.7; }
  .tips-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .tip-card { background: white; border: 1px solid #E8E0D5; border-radius: 10px; padding: 14px 16px; font-size: 12px; color: #4A4A4A; line-height: 1.6; }
  .footer { background: #2C2C2C; color: rgba(255,255,255,0.7); padding: 30px 50px; font-size: 11px; line-height: 1.8; margin-top: 40px; }
  .footer-logo { font-family: 'Playfair Display', serif; font-size: 24px; color: #C9A87C; margin-bottom: 8px; }
  .footer-links { color: rgba(255,255,255,0.5); margin-top: 12px; }
  .divider { height: 1px; background: #E8E0D5; margin: 10px 50px; }
</style>
</head>
<body>

<div class="cover">
  <div class="logo-nb">NB</div>
  <div class="brand-name">Nutsa Bakhtadze · EQ Coach</div>
  <div class="report-title">ემოციური ინტელექტის ანგარიში</div>
  <div class="report-sub">Emotional Intelligence Assessment Report</div>
  <div class="meta">${userName ? `${userName} · ` : ""}${dateStr}</div>
</div>

<div class="result-box">
  <div class="score-big">${totalScore}%</div>
  <div class="score-label">EQ ქულა</div>
  <div class="level-badge">${level.emoji} ${level.level}</div>
</div>

<div class="section">
  <div class="h2">კატეგორიების შეფასება</div>
  ${(Object.entries(scores) as [CategoryKey, number][]).map(([key, val]) => {
    const cat = EQ_CATEGORIES[key];
    return `<div class="cat-row">
      <div class="cat-icon">${cat.icon}</div>
      <div class="cat-info">
        <div class="cat-name">${cat.label}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${val}%"></div></div>
      </div>
      <div class="cat-score">${val}%</div>
    </div>`;
  }).join("")}
</div>

<div class="divider"></div>

<div class="section">
  <div class="h2">პერსონალური რეკომენდაციები</div>
  ${(Object.entries(recommendations) as [CategoryKey, string][]).map(([key, text]) => {
    const cat = EQ_CATEGORIES[key];
    return `<div class="rec-box">
      <div class="rec-title">${cat.icon} ${cat.label}</div>
      <div class="rec-text">${text}</div>
    </div>`;
  }).join("")}
</div>

<div class="divider"></div>

<div class="section">
  <div class="h2">ყოველდღიური EQ სავარჯიშოები</div>
  <div class="tips-grid">
    ${DAILY_TIPS.map((tip: string) => `<div class="tip-card">${tip}</div>`).join("")}
  </div>
</div>

<div class="footer">
  <div class="footer-logo">NB</div>
  <div><strong>ნუცა ბახტაძე</strong> — სერთიფიცირებული EQ ქოუჩი</div>
  <div>Global Sciences Foundation · Six Seconds — EQ ლიდერი საქართველოში</div>
  <div class="footer-links">🌐 nutsabakhtadze.com · Six Seconds: www.6seconds.org</div>
  <div style="margin-top:12px; font-size:10px; color:rgba(255,255,255,0.35)">ეს ანგარიში შეიქმნა NB EQ Assessment Platform-ის მიერ. ©${new Date().getFullYear()} Nutsa Bakhtadze</div>
</div>

</body>
</html>`;

  const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  // userName შეიძლება ცარიელი სტრინგი იყოს — fallback "my"
  a.download = `EQ_Report_${userName || "my"}_${Date.now()}.html`;
  a.click();
  URL.revokeObjectURL(url);
};

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

// Props interface ProgressBar-ისთვის — color optional, default value ქვემოთ
interface ProgressBarProps {
  value: number;
  color?: string; // optional — default "#C9A87C"
}

const ProgressBar = ({ value, color = "#C9A87C" }: ProgressBarProps) => (
  <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
    <div
      className="h-full rounded-full transition-all duration-1000"
      style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}, #E8C97A)` }}
    />
  </div>
);

// Props interface ScoreCircle-ისთვის
interface ScoreCircleProps {
  score: number;
}

const ScoreCircle = ({ score }: ScoreCircleProps) => {
  const level: EQLevel = getLevel(score);
  const circumference: number = 2 * Math.PI * 54;
  // offset: number — SVG strokeDashoffset-ისთვის
  const offset: number = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#E8E0D5" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="54" fill="none"
            stroke="#C9A87C" strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.5s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-stone-800" style={{ fontFamily: "Georgia, serif" }}>{score}%</span>
          <span className="text-xs text-stone-400">EQ</span>
        </div>
      </div>
      <div className="text-center">
        <span className="text-xl">{level.emoji}</span>
        <p className="text-sm font-semibold mt-1" style={{ color: level.color }}>{level.level}</p>
      </div>
    </div>
  );
};

export default function EQQuiz() {
  // step: QuizStep — მხოლოდ "intro" | "quiz" | "results" დასაშვებია
  const [step, setStep] = useState<QuizStep>("intro");

  // AnswersMap: Record<number, number> — კითხვის id → არჩეული ქულა
  const [answers, setAnswers] = useState<AnswersMap>({});

  // currentQ: number — მიმდინარე კითხვის ინდექსი
  const [currentQ, setCurrentQ] = useState<number>(0);

  // userName: string
  const [userName, setUserName] = useState<string>("");

  // showRec: boolean — რეკომენდაციების panel-ის ხილვადობა
  const [showRec, setShowRec] = useState<boolean>(false);

  // animateIn: boolean — კითხვის გადასვლის ანიმაცია
  const [animateIn, setAnimateIn] = useState<boolean>(true);

  const totalQuestions: number = QUESTIONS.length;
  const progress: number = (currentQ / totalQuestions) * 100;

  // handleAnswer: questionId და value ორივე number ტიპია
  const handleAnswer = (questionId: number, value: number): void => {
    const newAnswers: AnswersMap = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    if (currentQ < totalQuestions - 1) {
      setAnimateIn(false);
      setTimeout(() => {
        setCurrentQ(currentQ + 1);
        setAnimateIn(true);
      }, 200);
    } else {
      setStep("results");
    }
  };

  // calcScores: დაბრუნება { catScores: CategoryScores, total: number }
  const calcScores = (): { catScores: CategoryScores; total: number } => {
    // as CategoryScores — object-ს ვაძლევთ სწორ ტიპს forEach-ის შემდეგ
    const catScores = {} as CategoryScores;

    (Object.keys(EQ_CATEGORIES) as CategoryKey[]).forEach((cat) => {
      // catQuestions: Question[] — მხოლოდ ამ კატეგორიის კითხვები
      const catQuestions: Question[] = QUESTIONS.filter((q) => q.category === cat);
      // ?? 0 — undefined-ის ნაცვლად 0, || 0-ზე უფრო უსაფრთხო nullish coalescing
      const sum: number = catQuestions.reduce((acc, q) => acc + (answers[q.id] ?? 0), 0);
      const max: number = catQuestions.length * 5;
      catScores[cat] = Math.round((sum / max) * 100);
    });

    // total: number — ყველა კატეგორიის საშუალო
    const total: number = Math.round(
      Object.values(catScores).reduce((a, b) => a + b, 0) / Object.keys(catScores).length
    );
    return { catScores, total };
  };

  // getRecommendations: CategoryScores → Record<CategoryKey, string>
  const getRecommendations = (catScores: CategoryScores): Record<CategoryKey, string> => {
    const recs = {} as Record<CategoryKey, string>;
    // Object.entries-ს ვაძლევთ [CategoryKey, number][] ტიპს
    (Object.entries(catScores) as [CategoryKey, number][]).forEach(([key, score]) => {
      recs[key] = score >= 65 ? RECOMMENDATIONS[key].high : RECOMMENDATIONS[key].low;
    });
    return recs;
  };

  // ── INTRO ──────────────────────────────────
  if (step === "intro") {
    return (
      <div className=" flex items-center justify-center p-6"
        style={{ background: "linear-gradient(135deg, #FDFAF6 0%, #F0EBE3 100%)" }}>
        <div className="max-w-xl md:mb-20  mb-15 w-full">
          <div className="text-center mb-10">
            <div className="inline-block mb-3">
            <span className="font-serif text-[52px] text-[#C9A87C] font-bold tracking-[4px]">
              NB
            </span>
            </div>
            <p className="text-xs tracking-widest text-stone-400 uppercase">Nutsa Bakhtadze · EQ Coach</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-10 border border-stone-100">
            <h2  className="text-3xl text-stone-800 font-normal mb-3 text-center">
              ემოციური ინტელექტის
            </h2>
            <h2 className="text-3xl text-stone-800 font-normal mb-6 text-center">
              <span style={{ color: "#C9A87C" }}>ქვიზი</span>
            </h2>

            <p className="text-stone-500 text-sm leading-relaxed text-center mb-8">
              18 კითხვა · 6 EQ კომპეტენცია · პერსონალური გზამკვლევი
              <br />
              <span className="text-xs text-stone-400 mt-2 block">
                გულწრფელად უპასუხე — სწორი ან არასწორი პასუხი არ არსებობს
              </span>
            </p>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {/* Object.entries-ს ტიპი ვუთითებთ [CategoryKey, EQCategory][] */}
              {(Object.entries(EQ_CATEGORIES) as [CategoryKey, EQCategory][]).map(([key, cat]) => (
                <div key={key} className="text-center p-3 rounded-2xl bg-stone-50">
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <div className="text-xs text-stone-500 leading-tight">{cat.label}</div>
                </div>
              ))}
            </div>

            {/* onChange: React.ChangeEvent<HTMLInputElement> — e.target.value სტრინგია */}
            <input
              type="text"
              placeholder="შენი სახელი (არასავალდებულო)"
              value={userName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
              className="w-full border border-stone-200 rounded-2xl px-5 py-3 text-sm text-stone-700 mb-5 outline-none focus:border-amber-300 bg-stone-50"
            />

            <button
              onClick={() => setStep("quiz")}
              className="w-full py-4 rounded-2xl text-white text-sm font-semibold tracking-wider transition-all hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]"
              style={{ background: "linear-gradient(135deg, #2C2C2C, #4A3728)" }}
            >
              ქვიზის დაწყება →
            </button>
          </div>

         
        </div>
      </div>
    );
  }

  // ── QUIZ ───────────────────────────────────
  if (step === "quiz") {
    // q: Question — მიმდინარე კითხვა
    const q: Question = QUESTIONS[currentQ];
    // cat: EQCategory — კითხვის კატეგორია
    const cat: EQCategory = EQ_CATEGORIES[q.category];

    return (
      <div className=" flex items-center justify-center p-6"
        style={{ background: "linear-gradient(135deg, #FDFAF6 0%, #F0EBE3 100%)" }}>
        <div className="max-w-xl w-full">
          <div className="flex items-center justify-between mb-6">
            <span style={{ fontFamily: "Georgia, serif", fontSize: 22, color: "#C9A87C", fontWeight: 700 }}>NB</span>
            <span className="text-xs text-stone-400">{currentQ + 1} / {totalQuestions}</span>
          </div>

          <div className="mb-8">
            <ProgressBar value={progress} />
          </div>

          <div
            className="bg-white rounded-3xl shadow-xl p-8 border border-stone-100"
            style={{
              opacity: animateIn ? 1 : 0,
              transform: animateIn ? "translateY(0)" : "translateY(8px)",
              transition: "all 0.2s ease",
            }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-medium"
              style={{ background: `${cat.color}20`, color: cat.color }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </div>

            <p className="text-stone-700 text-lg leading-relaxed mb-8" style={{ fontFamily: "Georgia, serif" }}>
              {q.text}
            </p>

            <div className="space-y-3">
              {SCALE.map((s: ScaleItem) => (
                <button
                  key={s.value}
                  onClick={() => handleAnswer(q.id, s.value)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border transition-all hover:border-amber-300 hover:bg-amber-50 active:scale-[0.98] text-left"
                  style={{
                    // answers[q.id] შეიძლება undefined — strict === უსაფრთხოა
                    borderColor: answers[q.id] === s.value ? "#C9A87C" : "#E8E0D5",
                    background:  answers[q.id] === s.value ? "#FDF8F0" : "white",
                  }}
                >
                  <span
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ borderColor: "#C9A87C", color: "#C9A87C" }}
                  >
                    {s.value}
                  </span>
                  <span className="text-sm text-stone-600">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {currentQ > 0 && (
            <button
              onClick={() => setCurrentQ(currentQ - 1)}
              className="mt-4 text-xs text-stone-400 hover:text-stone-600 w-full text-center transition-colors"
            >
              ← წინა კითხვა
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── RESULTS ────────────────────────────────
  // calcScores და getRecommendations მხოლოდ results step-ზე გამოიძახება
  const { catScores, total } = calcScores();
  const recs: Record<CategoryKey, string> = getRecommendations(catScores);
  const level: EQLevel = getLevel(total);

  return (
    <div className=" p-6"
      style={{ background: "linear-gradient(135deg, #FDFAF6 0%, #F0EBE3 100%)" }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-8">
          <span style={{ fontFamily: "Georgia, serif", fontSize: 38, color: "#C9A87C", fontWeight: 700, letterSpacing: 4 }}>NB</span>
          <p className="text-xs text-stone-400 tracking-widest mt-1 uppercase">Nutsa Bakhtadze · EQ Coach</p>
        </div>

        {/* Overall Score */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-5 border border-stone-100">
          <h2 className="text-center text-stone-400 text-xs tracking-widest uppercase mb-6">შენი EQ შედეგი</h2>
          <div className="flex justify-center mb-6">
            <ScoreCircle score={total} />
          </div>
          <p className="text-center text-stone-500 text-sm leading-relaxed">
            {/* userName ცარიელი სტრინგი შეიძლება იყოს — falsy check სწორია */}
            {userName && <><strong className="text-stone-700">{userName}</strong>, </>}
            შენი ემოციური ინტელექტი <strong style={{ color: level.color }}>{level.level}</strong>-ის დონეშია.{" "}
            {total >= 70
              ? "შენ გაქვს ძლიერი საფუძველი. ნახე ქვემოთ, სად შეგიძლია კიდევ გაიზარდო."
              : "ეს ქვიზი — შენი ზრდის საწყისი წერტილია. ყოველი ნაბიჯი ითვლება."}
          </p>
        </div>

        {/* Category Scores */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-5 border border-stone-100">
          <h3 className="text-stone-700 font-semibold mb-6 text-sm tracking-wider uppercase">კომპეტენციების შეფასება</h3>
          <div className="space-y-5">
            {(Object.entries(catScores) as [CategoryKey, number][]).map(([key, score]) => {
              const cat: EQCategory = EQ_CATEGORIES[key];
              const lvl: string = getCategoryLevel(score);
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{cat.icon}</span>
                      <span className="text-sm text-stone-700">{cat.label}</span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: `${cat.color}20`, color: cat.color }}
                      >
                        {lvl}
                      </span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: cat.color }}>{score}%</span>
                  </div>
                  <ProgressBar value={score} color={cat.color} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendation Button */}
        <div className="mb-5">
          <button
            onClick={() => setShowRec(!showRec)}
            className="w-full py-4 rounded-2xl text-white text-sm font-semibold tracking-wider transition-all hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3"
            style={{ background: "linear-gradient(135deg, #C9A87C, #E8C97A)" }}
          >
            <span>💡</span>
            <span>რეკომენდაცია</span>
            {/* rotate(0deg) — "rotate(0)"-ის ნაცვლად სწორი CSS მნიშვნელობა */}
            <span style={{ transform: showRec ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>▼</span>
          </button>

          {showRec && (
            <div className="mt-4 bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden">
              <div className="p-6 border-b border-stone-100">
                <h3 className="text-stone-700 font-semibold text-sm tracking-wider uppercase">პერსონალური რეკომენდაციები</h3>
              </div>
              <div className="p-6 space-y-4">
                {(Object.entries(recs) as [CategoryKey, string][]).map(([key, text]) => {
                  const cat: EQCategory = EQ_CATEGORIES[key];
                  return (
                    <div
                      key={key}
                      className="flex gap-4 p-4 rounded-2xl"
                      style={{ background: `${cat.color}10`, borderLeft: `3px solid ${cat.color}` }}
                    >
                      <span className="text-xl flex-shrink-0 mt-0.5">{cat.icon}</span>
                      <div>
                        <p className="text-xs font-bold mb-1" style={{ color: cat.color }}>{cat.label}</p>
                        <p className="text-sm text-stone-600 leading-relaxed">{text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Daily Tips */}
              <div className="p-6 border-t border-stone-100">
                <h4 className="text-stone-700 font-semibold text-sm tracking-wider uppercase mb-4">ყოველდღიური EQ სავარჯიშოები</h4>
                <div className="grid grid-cols-1 gap-3">
                  {/* tip: string, i: number — ორივე ტიპიზებული */}
                  {DAILY_TIPS.map((tip: string, i: number) => (
                    <div key={i} className="p-3 rounded-xl bg-stone-50 text-sm text-stone-600 leading-relaxed">
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PDF Download */}
        <button
          onClick={() => generatePDF(userName, catScores, total, recs)}
          className="w-full py-4 rounded-2xl text-sm font-semibold tracking-wider transition-all hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 mb-5 border-2"
          style={{ borderColor: "#C9A87C", color: "#C9A87C", background: "white" }}
        >
          <span>📄</span>
          <span>PDF ანგარიშის ჩამოტვირთვა</span>
        </button>

        {/* Restart */}
        <button
          onClick={() => {
            setStep("intro");
            setAnswers({});    // AnswersMap-ს ვაბრუნებთ ცარიელ object-ში
            setCurrentQ(0);
            setShowRec(false);
          }}
          className="w-full py-3 rounded-2xl text-xs text-stone-400 hover:text-stone-600 transition-colors"
        >
          ← ხელახლა დაწყება
        </button>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-xs text-stone-400 leading-relaxed">
            Six Seconds Certified EQ Coach · Global Sciences Foundation
            <br />
            <a
              href="https://nutsabakhtadze.com"
              className="hover:text-amber-600 transition-colors"
              style={{ color: "#C9A87C" }}
            >
              nutsabakhtadze.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}