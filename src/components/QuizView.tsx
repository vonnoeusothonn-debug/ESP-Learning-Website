import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  BookOpen, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { QuizQuestion, NavSection } from '../types';

interface QuizViewProps {
  setCurrentSection: (section: NavSection) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ setCurrentSection }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const activeQuestion: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (optIndex: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [activeQuestion.id]: optIndex
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();
  const totalQuestions = QUIZ_QUESTIONS.length;
  const pct = Math.round((score / totalQuestions) * 100);

  const handleSubmitQuiz = () => {
    setSubmitted(true);
    if (score >= 6) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback
      }
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  // Weak topics detection
  const incorrectQuestions = QUIZ_QUESTIONS.filter(q => selectedAnswers[q.id] !== q.correctIndex);
  const weakCategories = Array.from(new Set(incorrectQuestions.map(q => q.category)));

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <HelpCircle className="w-4 h-4" />
            ប្រព័ន្ធតេស្តសមត្ថភាពវិស្វកម្ម (Assessment System)
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
            តេស្តសមត្ថភាពប្រព័ន្ធបង្កប់ & Hardware (Khmer First)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
            វាស់ស្ទង់ការយល់ដឹងលើ ESP32 Registers, ការការពារសៀគ្វី, ប្លង់ដី PCB Grounding និង CAN Bus Protocols។
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800">
          <span className="text-slate-400">សំណួរទី:</span>
          <span className="text-cyan-400 font-bold">{currentQuestionIndex + 1} នៃ {totalQuestions}</span>
        </div>
      </div>

      {/* Quiz Body */}
      {!submitted ? (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
          
          {/* Question Category & Type */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
            <span className="text-cyan-400 font-semibold px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
              {activeQuestion.category}
            </span>
            <span className="text-slate-500 uppercase text-[10px]">
              ប្រភេទសំណួរ: {activeQuestion.type.replace('-', ' ')}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-base sm:text-lg font-bold text-white font-sans leading-relaxed">
            {activeQuestion.question}
          </h2>

          {/* Optional Code Snippet */}
          {activeQuestion.codeSnippet && (
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#090d16]">
              <div className="px-3 py-1 bg-slate-950 text-[10px] font-mono text-slate-500">
                កូដដែលត្រូវត្រួតពិនិត្យ (Code Snippet Under Review):
              </div>
              <pre className="p-3 text-xs font-mono text-amber-300/90 overflow-x-auto leading-relaxed">
                {activeQuestion.codeSnippet}
              </pre>
            </div>
          )}

          {/* Optional Circuit Snippet */}
          {activeQuestion.circuitSnippet && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300/90 overflow-x-auto whitespace-pre leading-relaxed">
              {activeQuestion.circuitSnippet.trim()}
            </div>
          )}

          {/* Options */}
          <div className="space-y-2.5">
            {activeQuestion.options.map((opt, i) => {
              const isSelected = selectedAnswers[activeQuestion.id] === i;
              return (
                <button
                  key={i}
                  onClick={() => handleSelectOption(i)}
                  className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm font-sans transition-all border flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-cyan-500/20 text-white border-cyan-400 ring-1 ring-cyan-400/50 shadow-md shadow-cyan-950/20'
                      : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <span className="leading-relaxed">{opt}</span>
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-cyan-400 bg-cyan-500' : 'border-slate-700'
                  }`}>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom navigation buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-sans text-slate-300 border border-slate-700 disabled:opacity-40"
            >
              ← សំណួរមុន (Previous)
            </button>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-sans text-xs font-bold transition-all"
              >
                សំណួរបន្ទាប់ (Next) →
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-sans text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all"
              >
                បញ្ជូនចម្លើយ & កាត់ពិន្ទុ (Submit)
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-sans">
                លទ្ធផលតេស្តសមត្ថភាពវិស្វកម្ម (Quiz Results)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
                អ្នកឆ្លើយត្រូវ {score} នៃ {totalQuestions} សំណួរ ({pct}%)
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleResetQuiz}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-sans font-semibold flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>ធ្វើតេស្តម្តងទៀត (Retake)</span>
              </button>
              <button
                onClick={() => setCurrentSection('esp32')}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-sans font-bold flex items-center gap-2"
              >
                <span>ត្រឡប់ទៅរៀនមេរៀន</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400">
              ការពិនិត្យចម្លើយ និងការពន្យល់លម្អិត (Question Explanations & Rationale):
            </h3>

            {QUIZ_QUESTIONS.map((q, idx) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctIndex;

              return (
                <div key={q.id} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 font-bold">សំណួរទី {idx + 1}: {q.category}</span>
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      isCorrect ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}>
                      {isCorrect ? '✓ ត្រឹមត្រូវ' : '✗ មិនត្រឹមត្រូវ'}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-white font-sans">
                    {q.question}
                  </p>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-sans space-y-1">
                    <div className="font-mono text-emerald-400 font-bold">
                      ចម្លើយត្រឹមត្រូវ: {q.options[q.correctIndex]}
                    </div>
                    <div className="text-slate-300 leading-relaxed pt-1">
                      <strong className="text-cyan-400 font-mono">ការពន្យល់វិស្វកម្ម: </strong>
                      {q.explanation}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
