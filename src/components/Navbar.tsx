import React from 'react';
import { 
  Sun, 
  Cpu, 
  Layers, 
  Radio, 
  Compass, 
  Code2, 
  Calculator, 
  Wrench, 
  CheckCircle2, 
  Zap, 
  Sparkles,
  BookOpen,
  Languages
} from 'lucide-react';
import { NavSection, Language } from '../types';

interface NavbarProps {
  currentSection: NavSection;
  setCurrentSection: (section: NavSection) => void;
  fypModeActive: boolean;
  setFypModeActive: (active: boolean) => void;
  overallProgress: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  setCurrentSection,
  fypModeActive,
  setFypModeActive,
  overallProgress
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-6 py-2.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        
        {/* Brand & Target Project Title */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCurrentSection('dashboard')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-600 via-sky-500 to-amber-400 p-[1.5px] shadow-lg shadow-cyan-950/50 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm tracking-wide text-slate-100 flex items-center gap-1.5">
                  SolarTrack<span className="text-cyan-400">EE</span>
                  <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                    ESP32 + PCB FYP
                  </span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block truncate max-w-[320px] xl:max-w-md font-sans">
                មន្ទីរពិសោធន៍វិស្វកម្ម & ជំនួយការគម្រោងបញ្ចប់ការសិក្សា (FYP)
              </p>
            </div>
          </button>
        </div>

        {/* Global FYP Mode Switcher & Quick Shortcuts */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          
          {/* Language Flag Badge - Khmer First */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 font-sans">
            <span className="text-sm">🇰🇭</span>
            <span className="text-[11px] font-medium text-cyan-300">ភាសាខ្មែរ (Khmer First)</span>
          </div>

          {/* Progress bar pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 font-sans">វឌ្ឍនភាព FYP:</span>
            <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-500" 
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">{overallProgress}%</span>
          </div>

          {/* Quick Jump Buttons */}
          <div className="hidden lg:flex items-center gap-1.5">
            <button
              onClick={() => setCurrentSection('circuit-builder')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-sans flex items-center gap-1.5 transition-all ${
                currentSection === 'circuit-builder'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              Circuit Lab
            </button>

            <button
              onClick={() => setCurrentSection('code-playground')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-sans flex items-center gap-1.5 transition-all ${
                currentSection === 'code-playground'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              Code Lab
            </button>

            <button
              onClick={() => setCurrentSection('solar-calculator')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-sans flex items-center gap-1.5 transition-all ${
                currentSection === 'solar-calculator'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              Solar Calc
            </button>
          </div>

          {/* Special FYP Mode Button */}
          <button
            onClick={() => {
              setFypModeActive(!fypModeActive);
              if (!fypModeActive) {
                setCurrentSection('fyp-mode');
              }
            }}
            className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-sans font-semibold transition-all shadow-md ${
              fypModeActive
                ? 'bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/10 text-amber-300 border-amber-500/60 shadow-amber-500/10'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-amber-500/50 hover:text-amber-300'
            }`}
          >
            <span className="relative flex h-2 w-2">
              {fypModeActive && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${fypModeActive ? 'bg-amber-400' : 'bg-slate-600'}`} />
            </span>
            <Compass className={`w-3.5 h-3.5 ${fypModeActive ? 'text-amber-400' : 'text-slate-400'}`} />
            <span>FYP MODE</span>
            {fypModeActive && (
              <span className="hidden sm:inline-block px-1 rounded bg-amber-500/30 text-[9px] uppercase tracking-wider text-amber-200">
                ដំណើរការ
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
