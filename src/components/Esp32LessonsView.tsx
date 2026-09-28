import React, { useState } from 'react';
import { 
  Cpu, 
  Search, 
  Sliders
} from 'lucide-react';
import { NavSection, LearningMode } from '../types';
import { ESP32_LESSONS } from '../data/esp32Lessons';
import { StandardLessonTemplate } from './StandardLessonTemplate';

interface Esp32LessonsViewProps {
  completedLessons: number[];
  toggleLessonCompletion: (id: number) => void;
  setCurrentSection: (section: NavSection) => void;
  setSelectedCodeSnippet?: (code: string) => void;
}

export const Esp32LessonsView: React.FC<Esp32LessonsViewProps> = ({
  completedLessons,
  toggleLessonCompletion,
  setCurrentSection,
  setSelectedCodeSnippet
}) => {
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLearningMode, setActiveLearningMode] = useState<LearningMode>('engineering');

  const categories = [
    { id: 'All', labelKm: 'ទាំងអស់ (All)' },
    { id: 'Architecture', labelKm: 'ស្ថាបត្យកម្ម (Architecture)' },
    { id: 'Hardware', labelKm: 'គ្រឿងរឹង (Hardware)' },
    { id: 'Peripherals', labelKm: 'Peripherals (ADC/PWM)' },
    { id: 'Communication', labelKm: 'ពិធីការ (I2C/SPI/UART)' },
    { id: 'Embedded Systems', labelKm: 'ប្រព័ន្ធបង្កប់ (RTOS/Timers)' },
    { id: 'IoT', labelKm: 'បណ្តាញ IoT (Wi-Fi/CAN)' }
  ];

  const filteredLessons = ESP32_LESSONS.filter(l => {
    const matchesSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          l.concept.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || l.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeLesson = ESP32_LESSONS.find(l => l.id === selectedLessonId) || ESP32_LESSONS[0];
  const isCompleted = completedLessons.includes(activeLesson.id);

  const handleOpenInPlayground = (code: string) => {
    if (setSelectedCodeSnippet) {
      setSelectedCodeSnippet(code);
    }
    setCurrentSection('code-playground');
  };

  const handleSelectLesson = (id: number) => {
    if (id >= 1 && id <= ESP32_LESSONS.length) {
      setSelectedLessonId(id);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner - Khmer First Engineering Platform */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-slate-900 border border-cyan-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-mono">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>ប្រព័ន្ធសិក្សាវិស្វកម្មអគ្គិសនី & ប្រព័ន្ធបង្កប់ (Khmer First)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-sans">
              កម្មវិធីសិក្សា ESP32-S3, PCB & Smart Dual-Axis Solar Tracker FYP
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-sans">
              បង្រៀនជាភាសាខ្មែរជាមួយពាក្យបច្ចេកទេសវិស្វកម្មជាភាសាអង់គ្លេស។ រាល់មេរៀនអនុវត្តតាមរចនាសម្ព័ន្ធ <strong className="text-cyan-400">១៥ ជំហានពេញលេញ (Standardized 15-Section Pedagogy)</strong> និងភ្ជាប់ទៅកាន់គម្រោងបញ្ចប់ការសិក្សាពិតប្រាកដជានិច្ច។
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-[11px] text-slate-400 font-sans">បានបញ្ចប់</div>
              <div className="text-lg font-bold text-emerald-400 font-mono">
                {completedLessons.length} / {ESP32_LESSONS.length}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-[11px] text-slate-400 font-sans">វឌ្ឍនភាព</div>
              <div className="text-lg font-bold text-cyan-400 font-mono">
                {Math.round((completedLessons.length / ESP32_LESSONS.length) * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar List (4 cols) & Standardized Lesson Viewer (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Lesson Navigation List (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Search & Filters */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ស្វែងរកមេរៀន (Search GPIO, I2C, CAN, PCB...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex flex-wrap gap-1">
              {categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-2 py-1 rounded text-[11px] font-sans transition-all ${
                    selectedCategory === c.id
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {c.labelKm}
                </button>
              ))}
            </div>
          </div>

          {/* Lessons Scrollable List */}
          <div className="space-y-1.5 max-h-[820px] overflow-y-auto pr-1">
            {filteredLessons.map((lesson) => {
              const isSelected = lesson.id === selectedLessonId;
              const completed = completedLessons.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  onClick={() => handleSelectLesson(lesson.id)}
                  className={`w-full p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-500/50 shadow-md shadow-cyan-950/50'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800">
                        #{lesson.id.toString().padStart(2, '0')}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase truncate">
                        {lesson.category}
                      </span>
                    </div>
                    <h3 className={`text-xs font-semibold line-clamp-1 ${
                      isSelected ? 'text-white' : 'text-slate-300'
                    }`}>
                      {lesson.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-1 font-sans">
                      {lesson.subtitle}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLessonCompletion(lesson.id);
                    }}
                    className="mt-1 text-slate-500 hover:text-emerald-400 transition-colors shrink-0"
                    title={completed ? 'សម្គាល់ថាមិនទាន់ចប់' : 'សម្គាល់ថាបានរៀនចប់'}
                  >
                    {completed ? (
                      <span className="text-emerald-400 text-sm">✓</span>
                    ) : (
                      <span className="text-slate-700 text-sm">○</span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Lesson Rendered via Standardized 15-Section Template (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
          <StandardLessonTemplate
            lesson={activeLesson}
            isCompleted={isCompleted}
            onToggleComplete={() => toggleLessonCompletion(activeLesson.id)}
            onSelectNextLesson={handleSelectLesson}
            onSelectPrevLesson={handleSelectLesson}
            canGoNext={activeLesson.id < ESP32_LESSONS.length}
            canGoPrev={activeLesson.id > 1}
            totalLessons={ESP32_LESSONS.length}
            onOpenInPlayground={handleOpenInPlayground}
            initialMode={activeLearningMode}
          />
        </div>

      </div>

    </div>
  );
};
