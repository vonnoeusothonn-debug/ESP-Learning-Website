import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  Circle, 
  FileText, 
  Compass, 
  ShieldCheck, 
  Download, 
  Box, 
  CircuitBoard, 
  Check, 
  AlertCircle,
  Eye,
  Sliders
} from 'lucide-react';
import { PCB_COURSE_STEPS } from '../data/pcbCourseData';
import { NavSection } from '../types';

interface PcbCourseViewProps {
  setCurrentSection: (section: NavSection) => void;
}

export const PcbCourseView: React.FC<PcbCourseViewProps> = ({ setCurrentSection }) => {
  const [selectedStepId, setSelectedStepId] = useState<string>(PCB_COURSE_STEPS[0].id);
  const [activeLevel, setActiveLevel] = useState<1 | 2>(1);
  const [completedSteps, setCompletedSteps] = useState<string[]>(['pcb-what-is', 'schematic-symbols-footprints']);
  
  // Interactive Gerber Exporter Simulator State
  const [gerberExported, setGerberExported] = useState(false);

  const activeStep = PCB_COURSE_STEPS.find(s => s.id === selectedStepId) || PCB_COURSE_STEPS[0];

  const filteredSteps = PCB_COURSE_STEPS.filter(s => s.level === activeLevel);

  const toggleStepCompleted = (id: string) => {
    setCompletedSteps(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <Layers className="w-4 h-4" />
            ការរចនា និងផលិតបន្ទះសៀគ្វី (Hardware Fabrication)
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
            វគ្គសិក្សារចនាប្លង់ PCB & KiCad 8.0 (Khmer First)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
            ចាប់ពីមូលដ្ឋានគ្រឹះស្រទាប់ស្ពាន់ FR-4 និងការគណនាទទឹងដានស្ពាន់ រហូតដល់ការគូរ Schematic, ការរៀបចំ Layout និងការ Export ឯកសារ Gerbers។
          </p>
        </div>

        {/* Level Toggle Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 self-start sm:self-auto font-sans">
          <button
            onClick={() => {
              setActiveLevel(1);
              setSelectedStepId(PCB_COURSE_STEPS[0].id);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all ${
              activeLevel === 1
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            កម្រិត 1: មូលដ្ឋានគ្រឹះ (Fundamentals)
          </button>
          <button
            onClick={() => {
              setActiveLevel(2);
              const firstLevel2 = PCB_COURSE_STEPS.find(s => s.level === 2);
              if (firstLevel2) setSelectedStepId(firstLevel2.id);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all ${
              activeLevel === 2
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            កម្រិត 2: ជំហាន KiCad 8.0
          </button>
        </div>
      </div>

      {/* Main Two-Column View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Step Index (4 cols) */}
        <div className="lg:col-span-4 space-y-2 max-h-[720px] overflow-y-auto pr-1">
          {filteredSteps.map((step) => {
            const isSelected = step.id === activeStep.id;
            const isDone = completedSteps.includes(step.id);

            return (
              <div
                key={step.id}
                onClick={() => setSelectedStepId(step.id)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-500/60 shadow-md shadow-emerald-950/30 ring-1 ring-emerald-500/20'
                    : 'bg-slate-950/80 hover:bg-slate-900 border-slate-800/80'
                }`}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-900 text-emerald-400 font-semibold border border-slate-800">
                      {step.tag}
                    </span>
                  </div>
                  <h3 className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {step.summary}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStepCompleted(step.id);
                  }}
                  className="mt-0.5 text-slate-600 hover:text-emerald-400"
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-700" />
                  )}
                </button>
              </div>
            );
          })}

          {/* Gerber Package Generator Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 mt-4">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-400">
              <span className="flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" />
                CAM Gerber Simulator
              </span>
              <span className="text-[10px] text-slate-500">JLCPCB / PCBWay</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Generate the complete production zip archive containing all 7 copper, mask, silkscreen, and drill layers for the Solar Tracker PCB.
            </p>
            <button
              onClick={() => {
                setGerberExported(true);
                setTimeout(() => setGerberExported(false), 3500);
              }}
              className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              {gerberExported ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              {gerberExported ? 'Gerber Archive Generated (Rev 1.2.zip)' : 'Generate Production Gerber Archive'}
            </button>
          </div>
        </div>

        {/* Right Step Detailed Reader (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400">{activeStep.tag.toUpperCase()}</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
                {activeStep.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {activeStep.summary}
              </p>
            </div>

            <button
              onClick={() => toggleStepCompleted(activeStep.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all self-start sm:self-auto border ${
                completedSteps.includes(activeStep.id)
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{completedSteps.includes(activeStep.id) ? '✓ បានរៀនចប់' : 'សម្គាល់ថាបានចប់'}</span>
            </button>
          </div>

          {/* Explanatory points */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              គោលការណ៍បច្ចេកទេស និងក្បួនរចនា (Technical Principles & Design Rules)
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside font-sans">
              {activeStep.content.map((point, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span className="text-slate-200">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual Diagram */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              ដ្យាក្រាមស្រទាប់ស្ពាន់ PCB & ធរណីមាត្រ (Layer Stackup Diagram)
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300/90 overflow-x-auto whitespace-pre leading-tight">
              {activeStep.visualDiagram.trim()}
            </div>
          </div>

          {/* Engineering Checklist */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              បញ្ជីផ្ទៀងផ្ទាត់វិស្វកម្មមុនពេលផលិត (Pre-Fabrication Checklist)
            </h3>
            <div className="space-y-1.5 text-xs text-slate-300 font-sans">
              {activeStep.checklist.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <span className="text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solar Tracker FYP Application */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-orange-950/30 to-slate-900 border border-amber-800/60 space-y-1.5">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wide">
                ការអនុវត្តជាក់ស្តែងលើបន្ទះ PCB នៃ Solar Tracker FYP
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {activeStep.solarTrackerApplication}
            </p>
          </div>

          {/* Quick jump to component selection */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => setCurrentSection('components')}
              className="flex items-center gap-1.5 text-xs font-sans text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              <span>ស្វែងយល់ពីមគ្គុទ្ទេសក៍ជ្រើសរើសគ្រឿងបន្លាស់ PCB →</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
