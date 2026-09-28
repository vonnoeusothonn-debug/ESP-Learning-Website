import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Copy, 
  Check, 
  AlertTriangle, 
  Lightbulb, 
  Compass, 
  Terminal, 
  Code2, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Zap,
  Activity,
  Cable,
  Flame,
  ArrowRight,
  GraduationCap,
  Wrench,
  FileText,
  Sliders,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react';
import { Lesson, NavSection, LearningMode } from '../types';

export interface StandardLessonTemplateProps {
  lesson: Lesson;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onSelectNextLesson?: (id: number) => void;
  onSelectPrevLesson?: (id: number) => void;
  canGoNext?: boolean;
  canGoPrev?: boolean;
  totalLessons?: number;
  onOpenInPlayground?: (code: string) => void;
  initialMode?: LearningMode;
}

/**
 * Standardized 15-Section Lesson Template
 * Specifically engineered for Cambodian Electrical Engineering Students (Khmer First)
 * 
 * 15-Section Mandatory Structure:
 * 1. Learning Objectives (គោលបំណងសិក្សា)
 * 2. What is it? (តើវាជាអ្វី?)
 * 3. Why do we need it? (ហេតុអ្វីបានជាយើងត្រូវការវា?)
 * 4. How does it work? (តើវាដំណើរការយ៉ាងដូចម្តេច?)
 * 5. Hardware / Wiring (ការតភ្ជាប់ Hardware & Pinout)
 * 6. Example (ឧទាហរណ៍ជាក់ស្តែងក្នុងវិស្វកម្ម)
 * 7. Arduino IDE Code (កូដកម្មវិធី Arduino C++)
 * 8. Code Explanation in Khmer (ការពន្យល់កូដលម្អិតជាភាសាខ្មែរ)
 * 9. Testing Procedure (វិធីសាស្ត្រធ្វើតេស្ត & លទ្ធផលរំពឹងទុក)
 * 10. Common Problems (បញ្ហាប្រឈមញឹកញាប់ & មូលហេតុឫសគល់)
 * 11. Debugging (វិធីសាស្ត្រដោះស្រាយកំហុសមួយជំហានម្តងៗ)
 * 12. FYP Connection (ទំនាក់ទំនងផ្ទាល់ជាមួយគម្រោង FYP Solar Tracker)
 * 13. Mini Exercise (លំហាត់អនុវត្តខ្នាតតូច)
 * 14. Quiz (សំណួរត្រួតពិនិត្យការយល់ដឹងជាមួយភ្លាមៗ Feedback & Rationale)
 * 15. Next Lesson (មេរៀនបន្ទាប់ និងស្ពានចម្លងតក្កវិជ្ជា)
 */
export const StandardLessonTemplate: React.FC<StandardLessonTemplateProps> = ({
  lesson,
  isCompleted,
  onToggleComplete,
  onSelectNextLesson,
  onSelectPrevLesson,
  canGoNext = false,
  canGoPrev = false,
  totalLessons = 16,
  onOpenInPlayground,
  initialMode = 'engineering'
}) => {
  const [learningMode, setLearningMode] = useState<LearningMode>(initialMode);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [activeStepTab, setActiveStepTab] = useState<number>(0); // 0 = all 15 sections, 1-15 = single section
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [showQuizRationale, setShowQuizRationale] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(lesson.codeExample);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handlePlayground = () => {
    if (onOpenInPlayground) {
      onOpenInPlayground(lesson.codeExample);
    }
  };

  const teachingSteps = [
    { num: 1, titleKm: 'គោលបំណងសិក្សា', titleEn: 'Objectives' },
    { num: 2, titleKm: 'តើវាជាអ្វី?', titleEn: 'What is it?' },
    { num: 3, titleKm: 'ហេតុអ្វីបានជាត្រូវការ?', titleEn: 'Why need it?' },
    { num: 4, titleKm: 'តើវាដំណើរការដូចម្តេច?', titleEn: 'How it works' },
    { num: 5, titleKm: 'ការតភ្ជាប់ Hardware', titleEn: 'Wiring' },
    { num: 6, titleKm: 'ឧទាហរណ៍ជាក់ស្តែង', titleEn: 'Example' },
    { num: 7, titleKm: 'កូដ Arduino IDE', titleEn: 'Code' },
    { num: 8, titleKm: 'ការពន្យល់កូដជាភាសាខ្មែរ', titleEn: 'Code Explain' },
    { num: 9, titleKm: 'វិធីសាស្ត្រធ្វើតេស្ត', titleEn: 'Testing' },
    { num: 10, titleKm: 'បញ្ហាប្រឈមញឹកញាប់', titleEn: 'Common Errors' },
    { num: 11, titleKm: 'វិធីដោះស្រាយកំហុស', titleEn: 'Debugging' },
    { num: 12, titleKm: 'FYP Solar Connection', titleEn: 'FYP Connect' },
    { num: 13, titleKm: 'លំហាត់អនុវត្ត', titleEn: 'Exercise' },
    { num: 14, titleKm: 'សំណួរត្រួតពិនិត្យ Quiz', titleEn: 'Quiz' },
    { num: 15, titleKm: 'មេរៀនបន្ទាប់', titleEn: 'Next' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-cyan-400">មេរៀនទី {lesson.id}</span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs font-mono text-slate-400">{lesson.category}</span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
              Solar Tracker FYP Target
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-sans">
            {lesson.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-sans">
            {lesson.subtitle}
          </p>
        </div>

        <button
          onClick={onToggleComplete}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all self-start sm:self-auto border shrink-0 ${
            isCompleted
              ? 'bg-emerald-950 text-emerald-300 border-emerald-800 hover:bg-emerald-900'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
          }`}
        >
          <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : 'text-slate-500'}`} />
          <span>{isCompleted ? '✓ បានរៀនចប់ (Completed)' : 'សម្គាល់ថាបានចប់ (Mark Done)'}</span>
        </button>
      </div>

      {/* 3 Learning Modes Selector Bar */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          <span>របៀបនៃការសិក្សា (Learning Modes):</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-lg bg-slate-900 border border-slate-800/80 max-w-md w-full sm:w-auto">
          <button
            onClick={() => setLearningMode('beginner')}
            className={`px-3 py-1.5 rounded text-xs font-sans font-semibold transition-all flex items-center justify-center gap-1.5 ${
              learningMode === 'beginner'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>កម្រិតដំបូង (Beginner)</span>
          </button>

          <button
            onClick={() => setLearningMode('engineering')}
            className={`px-3 py-1.5 rounded text-xs font-sans font-semibold transition-all flex items-center justify-center gap-1.5 ${
              learningMode === 'engineering'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>វិស្វកម្ម (Engineering)</span>
          </button>

          <button
            onClick={() => setLearningMode('fyp')}
            className={`px-3 py-1.5 rounded text-xs font-sans font-semibold transition-all flex items-center justify-center gap-1.5 ${
              learningMode === 'fyp'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>គម្រោង FYP (Solar)</span>
          </button>
        </div>
      </div>

      {/* Dynamic Mode Content Banner */}
      {learningMode === 'beginner' && lesson.beginnerMode && (
        <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-800/60 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-sky-400 font-bold">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              BEGINNER MODE: ការពន្យល់សាមញ្ញ & រូបភាពប្រៀបធៀបក្នុងជីវិត
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
            {lesson.beginnerMode.simpleSummaryKm}
          </p>
          <div className="p-3 rounded-lg bg-slate-950 border border-sky-900/50 text-xs text-sky-300 font-sans leading-relaxed">
            💡 <strong className="text-white">ការប្រៀបធៀបក្នុងជីវិតរស់នៅ: </strong>
            {lesson.beginnerMode.analogyKm}
          </div>
          {lesson.beginnerMode.stepByStepGuideKm && (
            <div className="pt-2 border-t border-sky-900/40">
              <div className="text-[11px] font-mono text-sky-400 uppercase mb-1">ជំហានប្រតិបត្តិការដំបូង (Step-by-Step Guide):</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-slate-300">
                {lesson.beginnerMode.stepByStepGuideKm.map((step, idx) => (
                  <div key={idx} className="p-2 rounded bg-slate-950/70 border border-sky-900/30 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-sky-900 flex items-center justify-center text-[10px] text-sky-300 font-mono shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {learningMode === 'engineering' && lesson.engineeringMode && (
        <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/60 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-400 font-bold">
            <span className="flex items-center gap-1.5">
              <Wrench className="w-4 h-4" />
              ENGINEERING MODE: Datasheet Specifications & រូបមន្តគណនា
            </span>
          </div>

          {/* Datasheet Excerpt */}
          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="px-3 py-1.5">Electrical Parameter</th>
                  <th className="px-3 py-1.5">Datasheet Value</th>
                  <th className="px-3 py-1.5">Condition / Limit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/60 text-slate-300">
                {lesson.engineeringMode.datasheetSpecs.map((s, idx) => (
                  <tr key={idx}>
                    <td className="px-3 py-1.5 text-cyan-300">{s.parameter}</td>
                    <td className="px-3 py-1.5 font-bold text-white">{s.value}</td>
                    <td className="px-3 py-1.5 text-slate-400">{s.conditionOrLimit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Engineering Calculations */}
          {lesson.engineeringMode.calculations && (
            <div className="p-3 rounded-lg bg-slate-950 border border-cyan-900/40 text-xs space-y-1.5">
              <div className="font-mono text-cyan-400 font-bold">
                📐 {lesson.engineeringMode.calculations.title}
              </div>
              <div className="font-mono text-slate-200 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 inline-block">
                {lesson.engineeringMode.calculations.formula}
              </div>
              <div className="text-slate-400 font-sans text-[11px]">
                {lesson.engineeringMode.calculations.variablesKm}
              </div>
              <div className="text-emerald-400 font-sans text-xs">
                <strong>ឧទាហរណ៍ជាក់ស្តែង: </strong>{lesson.engineeringMode.calculations.workedExampleKm}
              </div>
            </div>
          )}

          {/* Engineering Design Trade-offs */}
          {lesson.engineeringMode.designTradeOffs && lesson.engineeringMode.designTradeOffs.length > 0 && (
            <div className="p-3 rounded-lg bg-slate-950 border border-cyan-900/30 text-xs space-y-1.5 font-sans">
              <div className="font-mono text-purple-400 font-bold text-[11px] uppercase">
                ⚖️ ការសម្រេចចិត្តវិស្វកម្ម & គុណសម្បត្តិ/គុណវិបត្តិ (Design Trade-offs):
              </div>
              {lesson.engineeringMode.designTradeOffs.map((dt, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="font-semibold text-slate-200">{dt.decision}</div>
                  <div className="text-slate-400 text-[11px]">
                    ជម្រើស A: <span className="text-slate-300">{dt.optionA}</span> vs ជម្រើស B: <span className="text-slate-300">{dt.optionB}</span>
                  </div>
                  <div className="text-emerald-400 text-[11px]">
                    <strong>ហេតុផលនៃការជ្រើសរើស: </strong>{dt.selectedReasonKm}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {learningMode === 'fyp' && lesson.fypModeData && (
        <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-amber-400 font-bold">
            <span className="flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              FYP MODE: ការអនុវត្តផ្ទាល់ក្នុង Solar Tracker & ការត្រៀមការពារសារណា
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
            {lesson.fypModeData.roleInSolarTrackerKm}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <strong className="text-amber-400 font-mono text-[11px] block">
                ការតភ្ជាប់គ្រឿងរឹង (Hardware Relationship):
              </strong>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {lesson.fypModeData.hardwareRelationshipKm}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <strong className="text-cyan-400 font-mono text-[11px] block">
                ការធ្វើតេស្តនៅការដ្ឋាន (On-site Testing on Mast):
              </strong>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {lesson.fypModeData.onSiteTestingKm}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-amber-900/40 text-xs space-y-1 font-sans">
            <div className="font-bold text-amber-300 font-mono">
              🎓 សំណួរការពារសារណាដែលគណៈកម្មការតែងតែសួរ (Thesis Defense Question):
            </div>
            <div className="text-slate-200 italic">
              "{lesson.fypModeData.thesisDefenseQuestionKm}"
            </div>
            <div className="text-emerald-400 pt-1.5 border-t border-slate-800/80">
              <strong className="text-emerald-300 font-mono">ចម្លើយគំរូកម្រិតវិស្វករ: </strong>
              {lesson.fypModeData.modelAnswerKm}
            </div>
          </div>
        </div>
      )}

      {/* 15-Step Navigator Filter Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>រចនាសម្ព័ន្ធបង្រៀន ១៥ ជំហាន (15-Step Pedagogy Navigator):</span>
          <button
            onClick={() => setActiveStepTab(0)}
            className="text-cyan-400 hover:underline"
          >
            {activeStepTab === 0 ? '✓ កំពុងបង្ហាញទាំងអស់' : 'បង្ហាញទាំងអស់ (Show All 15)'}
          </button>
        </div>
        
        <div className="flex flex-wrap gap-1 text-[11px]">
          <button
            onClick={() => setActiveStepTab(0)}
            className={`px-2 py-1 rounded font-mono transition-all ${
              activeStepTab === 0
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            ទាំងអស់ (All)
          </button>
          {teachingSteps.map(st => (
            <button
              key={st.num}
              onClick={() => setActiveStepTab(st.num)}
              className={`px-2 py-1 rounded font-mono transition-all ${
                activeStepTab === st.num
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              #{st.num} {st.titleEn}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. Learning Objectives */}
      {/* ========================================================================= */}
      {(activeStepTab === 0 || activeStepTab === 1) && (
        <div className="p-4 rounded-xl bg-slate-950 border border-cyan-900/40 space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-xs font-mono font-bold text-cyan-400">
              1
            </span>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              គោលបំណងសិក្សា (Learning Objectives)
            </h3>
          </div>
          <ul className="pl-8 space-y-1.5 text-xs sm:text-sm text-slate-300 list-disc list-inside font-sans">
            {lesson.learningObjectives?.map((obj, i) => (
              <li key={i} className="leading-relaxed">
                <span className="text-slate-200">{obj}</span>
              </li>
            )) || (
              <li>ស្វែងយល់ពីគោលការណ៍គ្រឹះវិស្វកម្មនៃ {lesson.title}</li>
            )}
          </ul>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. What is it? (តើវាជាអ្វី?) */}
      {/* ========================================================================= */}
      {(activeStepTab === 0 || activeStepTab === 2) && (
        <div className="p-4 rounded-xl bg-slate-950 border border-sky-900/40 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-sky-950 border border-sky-800 flex items-center justify-center text-xs font-mono font-bold text-sky-400">
              2
            </span>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              តើវាជាអ្វី? (What is it?)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans pl-8">
            {lesson.whatIsIt || lesson.concept}
          </p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. Why do we need it? (ហេតុអ្វីបានជាយើងត្រូវការវា?) */}
      {/* ========================================================================= */}
      {(activeStepTab === 0 || activeStepTab === 3) && (
        <div className="p-4 rounded-xl bg-slate-950 border border-indigo-900/40 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-950 border border-indigo-800 flex items-center justify-center text-xs font-mono font-bold text-indigo-400">
              3
            </span>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              ហេតុអ្វីបានជាយើងត្រូវការវា? (Why do we need it?)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans pl-8">
            {lesson.whyNeedIt || lesson.explanation[0]}
          </p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. How does it work? (តើវាដំណើរការយ៉ាងដូចម្តេច?) */}
      {/* ========================================================================= */}
      {(activeStepTab === 0 || activeStepTab === 4) && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-violet-950 border border-violet-800 flex items-center justify-center text-xs font-mono font-bold text-violet-400">
              4
            </span>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              តើវាដំណើរការយ៉ាងដូចម្តេច? (How does it work?)
            </h3>
          </div>

          {lesson.howItWorks && (
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans pl-8">
              {lesson.howItWorks}
            </p>
          )}

          {/* ASCII / Technical Diagram */}
          <div className="pl-8">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300/90 overflow-x-auto whitespace-pre leading-tight">
              {lesson.diagram.trim()}
            </div>
          </div>

          {/* Explanation Points */}
          <div className="pl-8 space-y-1.5">
            <div className="text-[11px] font-mono text-slate-400 uppercase">គោលការណ៍វិស្វកម្មសំខាន់ៗ (Key Principles):</div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300 list-disc list-inside font-sans">
              {lesson.explanation.map((pt, i) => (
                <li key={i} className="leading-relaxed">
                  <span className="text-slate-200">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. Hardware / Wiring */}
      {/* ========================================================================= */}
      {(activeStepTab === 0 || activeStepTab === 5) && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-950 border border-amber-800 flex items-center justify-center text-xs font-mono font-bold text-amber-400">
              5
            </span>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Cable className="w-3.5 h-3.5" />
              ការតភ្ជាប់ Hardware & Pinout (Hardware / Wiring)
            </h3>
          </div>

          <div className="pl-8">
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="px-3 py-2">ESP32 Pin</th>
                    <th className="px-3 py-2">Target Pin</th>
                    <th className="px-3 py-2">Component</th>
                    <th className="px-3 py-2">កំណត់ចំណាំវិស្វកម្ម (Engineering Note)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-900/60 text-slate-300">
                  {lesson.wiring.map((w, i) => (
                    <tr key={i} className="hover:bg-slate-900">
                      <td className="px-3 py-2 text-cyan-400 font-semibold">{w.pinFrom}</td>
                      <td className="px-3 py-2 text-slate-200">{w.pinTo}</td>
                      <td className="px-3 py-2 text-amber-300">{w.component}</td>
                      <td className="px-3 py-2 text-slate-400 text-[11px] font-sans">{w.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. Example (ឧទាហរណ៍ជាក់ស្តែង) */}
      {/* ========================================================================= */}
      {(activeStepTab === 0 || activeStepTab === 6) && lesson.realWorldExample && (
        <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-xs font-mono font-bold text-emerald-400">
              6
            </span>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              ឧទាហរណ៍ជាក់ស្តែងក្នុងវិស្វកម្ម (Real-World Engineering Example)
            </h3>
          </div>
          <div className="pl-8 space-y-2 font-sans text-xs sm:text-sm">
            <div className="font-bold text-emerald-300">
              {lesson.realWorldExample.title}
            </div>
            <p className="text-slate-300 leading-relaxed">
              {lesson.realWorldExample.scenario}
            </p>
            <div className="p-2.5 rounded bg-slate-900 border border-emerald-950 text-xs text-slate-300 leading-relaxed">
              <strong className="text-emerald-400 font-mono">ហេតុអ្វីសំខាន់ (Why it matters): </strong>
              {lesson.realWorldExample.whyItMatters}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. Arduino IDE Code */}
      {/* ========================================================================= */}
      {(activeStepTab === 0 || activeStepTab === 7) && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-950 border border-teal-800 flex items-center justify-center text-xs font-mono font-bold text-teal-400">
                7
              </span>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                កូដកម្មវិធី Arduino IDE (C++ Firmware)
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-300 border border-slate-700 transition-all"
              >
                {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copiedCode ? 'បានចម្លង!' : 'ចម្លងកូដ'}
              </button>
              {onOpenInPlayground && (
                <button
                  onClick={handlePlayground}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-[11px] font-mono text-cyan-300 border border-cyan-500/40 transition-all"
                >
                  <ExternalLink className="w-3 h-3" />
                  តេស្តក្នុង Code Lab
                </button>
              )}
            </div>
          </div>

          <div className="pl-8">
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#090d16]">
              <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>ESP32-S3 Firmware Code (main.cpp)</span>
                <span>Baud Rate: 115200</span>
              </div>
              <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                {lesson.codeExample}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. Code Explanation in Khmer */}
      {/* ========================================================================= */}
      {(activeStepTab === 0 || activeStepTab === 8) && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-xs font-mono font-bold text-cyan-400">
              8
            </span>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              ការពន្យល់កូដលម្អិតជាភាសាខ្មែរ (Code Explanation in Khmer)
            </h3>
          </div>

          <div className="pl-8 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {lesson.codeExplanation.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-mono text-cyan-400 font-semibold text-[11px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800/80 inline-block">
                  {item.token}
                </div>
                <div className="text-slate-300 text-[11px] font-sans leading-relaxed pt-1">
                  {item.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. Testing Procedure */}
      {/* ========================================================================= */}
      {(activeStepTab === 0 || activeStepTab === 9) && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-950 border border-blue-800 flex items-center justify-center text-xs font-mono font-bold text-blue-400">
              9
            </span>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              វិធីសាស្ត្រធ្វើតេស្ត & លទ្ធផលរំពឹងទុក (Testing Procedure)
            </h3>
          </div>

          <div className="pl-8 space-y-2">
            {lesson.howToTest && (
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                {lesson.howToTest}
              </p>
            )}
            <div className="text-[11px] font-mono text-slate-400 uppercase">លទ្ធផលលើ Serial Monitor (115200 Baud):</div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400/90 whitespace-pre overflow-x-auto">
              {lesson.expectedOutput}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 10. Common Problems */}
      {/* ========================================================================= */}
      {(activeStepTab === 0 || activeStepTab === 10) && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-rose-950 border border-rose-800 flex items-center justify-center text-xs font-mono font-bold text-rose-400">
              10
            </span>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              បញ្ហាប្រឈមញឹកញាប់ & មូលហេតុឫសគល់ (Common Problems & Root Causes)
            </h3>
          </div>

          <div className="pl-8 space-y-2">
            {lesson.commonErrors.map((err, i) => (
              <div key={i} className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs space-y-1.5">
                <div className="font-semibold text-rose-300 font-mono flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>រោគសញ្ញាកំហុស (Symptom): {err.error}</span>
                </div>
                <div className="text-slate-300 font-sans pl-5">
                  <strong className="text-slate-400 font-mono">មូលហេតុឫសគល់: </strong>{err.cause}
                </div>
                <div className="text-emerald-400 font-sans pl-5">
                  <strong className="text-emerald-300 font-mono">វិធីដោះស្រាយបែបវិស្វកម្ម: </strong>{err.fix}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 11. Debugging */}
      {/* ========================================================================= */}
      {(activeStepTab === 0 || activeStepTab === 11) && lesson.debuggingSteps && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-950 border border-amber-800 flex items-center justify-center text-xs font-mono font-bold text-amber-400">
              11
            </span>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              វិធីសាស្ត្រដោះស្រាយកំហុសមួយជំហានម្តងៗ (Step-by-Step Debugging Protocol)
            </h3>
          </div>

          <div className="pl-8 space-y-2">
            {lesson.debuggingSteps.map((dbg) => (
              <div key={dbg.step} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-mono font-bold text-cyan-400 shrink-0 text-[10px]">
                    {dbg.step}
                  </span>
                  <div className="space-y-0.5 font-sans">
                    <div className="text-slate-200 font-semibold">{dbg.action}</div>
                    <div className="text-slate-400 text-[11px]">
                      លទ្ធផលត្រូវផ្ទៀងផ្ទាត់: <span className="text-emerald-400 font-mono">{dbg.expectedCheck}</span>
                    </div>
                  </div>
                </div>
                {dbg.toolsUsed && (
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 font-mono text-[10px] border border-slate-800 shrink-0 self-start sm:self-auto">
                    🛠️ {dbg.toolsUsed}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 12. FYP Connection (Dedicated Interactive Card) */}
      {/* ========================================================================= */}
      {(activeStepTab === 0 || activeStepTab === 12) && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/60 flex items-center justify-center text-xs font-mono font-bold text-amber-400">
              12
            </span>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              ទំនាក់ទំនងផ្ទាល់ជាមួយគម្រោង FYP Solar Tracker (FYP Connection)
            </h3>
          </div>

          <div className="pl-8">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-900 border-2 border-amber-500/40 shadow-xl shadow-amber-950/30 space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-900/40 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                    {lesson.fypConnection?.subsystem || 'Dual-Axis Subsystem'}
                  </span>
                  <h4 className="text-base font-bold text-white font-sans mt-1">
                    {lesson.fypConnection?.title || lesson.fypApplication.title}
                  </h4>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  FYP Project Core
                </span>
              </div>

              {/* Architecture Tree ASCII */}
              {lesson.fypConnection?.architectureTree && (
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                    ដ្យាក្រាមស្ថាបត្យកម្មប្រព័ន្ធ (System Hardware Architecture Tree):
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300/90 whitespace-pre overflow-x-auto leading-snug">
                    {lesson.fypConnection.architectureTree}
                  </div>
                </div>
              )}

              {/* Purpose in Khmer */}
              <div className="space-y-1 text-xs font-sans">
                <strong className="text-amber-400 font-mono text-[11px] uppercase block">
                  ហេតុអ្វីត្រូវប្រើក្នុង FYP Solar Tracker (Purpose in Khmer):
                </strong>
                <p className="text-slate-300 leading-relaxed">
                  {lesson.fypConnection?.purposeKm || lesson.fypApplication.description}
                </p>
              </div>

              {/* Wiring & Trade-offs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                {lesson.fypConnection?.wiringDetailsKm && (
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <strong className="text-cyan-400 font-mono text-[11px] block">
                      ការតភ្ជាប់ខ្សែជាក់ស្តែងលើ Mast (Wiring Details):
                    </strong>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      {lesson.fypConnection.wiringDetailsKm}
                    </p>
                  </div>
                )}

                {lesson.fypConnection?.tradeOffsKm && (
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <strong className="text-purple-400 font-mono text-[11px] block">
                      ការសម្រេចចិត្តវិស្វកម្ម (Engineering Trade-offs):
                    </strong>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      {lesson.fypConnection.tradeOffsKm}
                    </p>
                  </div>
                )}
              </div>

              {/* Field Troubleshooting */}
              {lesson.fypConnection?.troubleshootingKm && (
                <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-900/40 text-xs space-y-1 font-sans">
                  <strong className="text-emerald-400 font-mono text-[11px] block">
                    ការដោះស្រាយបញ្ហានៅការដ្ឋានផ្ទាល់ (Field Troubleshooting):
                  </strong>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {lesson.fypConnection.troubleshootingKm}
                  </p>
                </div>
              )}

              {/* Hardware Chips List */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-[11px] font-mono">
                <span className="text-slate-400">គ្រឿងបង្គុំលើ PCB:</span>
                {(lesson.fypConnection?.hardwareComponents || [lesson.fypApplication.hardwareConnected]).map((hw, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-900 text-amber-300 border border-slate-800">
                    {hw}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 13. Mini Exercise */}
      {/* ========================================================================= */}
      {(activeStepTab === 0 || activeStepTab === 13) && (
        <div className="p-4 rounded-xl bg-slate-950 border border-purple-900/50 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center text-xs font-mono font-bold text-purple-400">
                13
              </span>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                លំហាត់អនុវត្តខ្នាតតូច (Mini Exercise)
              </h3>
            </div>
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-[11px] font-mono text-slate-400 hover:text-slate-200 flex items-center gap-1"
            >
              {showHint ? 'លាក់តម្រុយ' : 'បង្ហាញតម្រុយ (Hint)'}
              {showHint ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed pl-8">
            {lesson.miniExercise.prompt}
          </p>
          {showHint && (
            <div className="ml-8 p-2.5 rounded bg-purple-950/30 border border-purple-900/40 text-xs text-purple-300 font-mono">
              💡 តម្រុយ (Hint): {lesson.miniExercise.hint}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 14. Quiz (Interactive with Immediate Rationale) */}
      {/* ========================================================================= */}
      {(activeStepTab === 0 || activeStepTab === 14) && lesson.quiz && (
        <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-800/50 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-xs font-mono font-bold text-cyan-400">
                14
              </span>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                សំណួរត្រួតពិនិត្យការយល់ដឹង (Engineering Comprehension Quiz)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              {quizSelectedOption !== null ? 'បានឆ្លើយរួច' : 'សូមជ្រើសរើសចម្លើយត្រឹមត្រូវ'}
            </span>
          </div>

          <div className="pl-8 space-y-3 font-sans text-xs sm:text-sm">
            <div className="font-semibold text-slate-100">
              {lesson.quiz.question}
            </div>

            <div className="space-y-2">
              {lesson.quiz.options.map((opt, idx) => {
                const isSelected = quizSelectedOption === idx;
                const isCorrect = idx === lesson.quiz?.correctIndex;
                let optionStyle = 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700';

                if (quizSelectedOption !== null) {
                  if (isSelected) {
                    optionStyle = isCorrect 
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-500 text-rose-200';
                  } else if (isCorrect) {
                    optionStyle = 'bg-emerald-950/30 border-emerald-800 text-emerald-300';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuizSelectedOption(idx);
                      setShowQuizRationale(true);
                    }}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${optionStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center font-mono text-[10px] text-slate-300 shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt}</span>
                    {quizSelectedOption !== null && isSelected && (
                      isCorrect 
                        ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        : <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Rationale */}
            {showQuizRationale && (
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-900/50 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 uppercase">
                  <Info className="w-3.5 h-3.5" />
                  <span>ការពន្យល់បែបវិស្វកម្ម (Engineering Rationale):</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {lesson.quiz.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 15. Next Lesson */}
      {/* ========================================================================= */}
      {(activeStepTab === 0 || activeStepTab === 15) && lesson.nextLesson && onSelectNextLesson && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-slate-500 uppercase">មេរៀនបន្ទាប់ (Next Lesson):</div>
            <div className="text-xs font-semibold text-slate-200 font-sans">
              {lesson.nextLesson.title}
            </div>
            <div className="text-[11px] text-slate-400 font-sans">
              {lesson.nextLesson.bridgeKm}
            </div>
          </div>

          <button
            onClick={() => onSelectNextLesson(lesson.nextLesson!.id)}
            className="px-3.5 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-semibold transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
          >
            <span>ចូលរៀនមេរៀនបន្ទាប់</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Bottom Prev/Next Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          disabled={!canGoPrev || !onSelectPrevLesson}
          onClick={() => onSelectPrevLesson && onSelectPrevLesson(lesson.id - 1)}
          className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← មេរៀនមុន (Previous)
        </button>

        <span className="text-xs font-mono text-slate-500">
          មេរៀន {lesson.id} នៃ {totalLessons}
        </span>

        <button
          disabled={!canGoNext || !onSelectNextLesson}
          onClick={() => onSelectNextLesson && onSelectNextLesson(lesson.id + 1)}
          className="px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-xs font-mono text-cyan-300 hover:bg-cyan-500/30 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
        >
          <span>មេរៀនបន្ទាប់ (Next)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
