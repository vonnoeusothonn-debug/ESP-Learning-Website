import React from 'react';
import {
  LayoutDashboard,
  Map,
  Cpu,
  FlaskConical,
  Zap,
  Layers,
  Box,
  Binary,
  Code2,
  Compass,
  Network,
  Bug,
  Calculator,
  SunMedium,
  HelpCircle,
  BookOpen,
  Kanban,
  CircuitBoard,
  ChevronRight
} from 'lucide-react';
import { NavSection } from '../types';

interface SidebarProps {
  currentSection: NavSection;
  setCurrentSection: (section: NavSection) => void;
  fypModeActive: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface NavGroup {
  label: string;
  items: {
    id: NavSection;
    label: string;
    sublabel?: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    fypHighlight?: boolean;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  setCurrentSection,
  fypModeActive,
  isOpen,
  setIsOpen
}) => {
  const navGroups: NavGroup[] = [
    {
      label: 'ទិដ្ឋភាពទូទៅ (MAIN OVERVIEW)',
      items: [
        { id: 'dashboard', label: 'ផ្ទាំងគ្រប់គ្រង (Dashboard)', icon: LayoutDashboard },
        { id: 'roadmap', label: 'ផែនទីសិក្សា (Roadmap)', icon: Map, badge: 'កម្រិត 1-5' },
        { id: 'fyp-mode', label: 'FYP Mode (Solar Tracker)', icon: Compass, badge: 'Dual-Axis', fypHighlight: true }
      ]
    },
    {
      label: 'ប្រព័ន្ធបង្កប់ & ESP32 (EMBEDDED)',
      items: [
        { id: 'esp32', label: 'មេរៀន ESP32 (Lessons)', icon: Cpu, badge: '16 មេរៀន' },
        { id: 'labs', label: 'មន្ទីរពិសោធន៍ (Labs)', icon: FlaskConical, badge: '14 Labs' },
        { id: 'code-playground', label: 'កន្លែងសរសេរកូដ (Code IDE)', icon: Code2, badge: 'Editor' }
      ]
    },
    {
      label: 'អេឡិចត្រូនិក & សៀគ្វី (CIRCUITS)',
      items: [
        { id: 'electronics', label: 'អេឡិចត្រូនិកគ្រឹះ (Electronics)', icon: Zap },
        { id: 'circuit-builder', label: 'តេស្តសៀគ្វី (Circuit Builder)', icon: CircuitBoard, badge: 'Interactive' },
        { id: 'components', label: 'ជ្រើសរើសគ្រឿងបន្លាស់ (Parts)', icon: Box }
      ]
    },
    {
      label: 'រចនា PCB & KICAD (PCB DESIGN)',
      items: [
        { id: 'pcb-course', label: 'វគ្គសិក្សា PCB & KiCad', icon: Layers, badge: '12 ជំហាន' },
        { id: 'fyp-pcb-arch', label: 'ស្ថាបត្យកម្ម PCB (Architecture)', icon: Binary, fypHighlight: true },
        { id: 'fyp-pcb-design', label: 'មគ្គុទ្ទេសក៍រចនា PCB Guide', icon: CircuitBoard, fypHighlight: true }
      ]
    },
    {
      label: 'ប្រព័ន្ធ & CLOUD IOT (SYSTEM)',
      items: [
        { id: 'system-arch', label: 'ស្ថាបត្យកម្មប្រព័ន្ធ (System Arch)', icon: Network },
        { id: 'debug-center', label: 'ដោះស្រាយបញ្ហា (Debug Center)', icon: Bug, badge: 'Database' }
      ]
    },
    {
      label: 'ឧបករណ៍គណនា & តេស្ត (TOOLS)',
      items: [
        { id: 'calculators', label: 'ឧបករណ៍គណនាវិស្វកម្ម', icon: Calculator, badge: '8 Tools' },
        { id: 'solar-calculator', label: 'គណនាទំហំបន្ទះសូឡា (Sizing)', icon: SunMedium, fypHighlight: true },
        { id: 'quizzes', label: 'តេស្តសមត្ថភាព (Quizzes)', icon: HelpCircle }
      ]
    },
    {
      label: 'ការគ្រប់គ្រងគម្រោង (PROJECT)',
      items: [
        { id: 'notebook', label: 'កំណត់ហេតុពិសោធន៍ (Notebook)', icon: BookOpen, badge: 'Lab Log' },
        { id: 'kanban', label: 'កិច្ចការ FYP (Kanban Tasks)', icon: Kanban, badge: 'Active' }
      ]
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside className={`
        fixed top-[53px] bottom-0 left-0 z-40 w-64 bg-slate-950/95 border-r border-slate-800/80 
        flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              <div className="px-3 text-[10px] font-mono font-semibold tracking-wider text-slate-500 uppercase truncate">
                {group.label}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentSection === item.id;
                  const isFypTarget = item.fypHighlight && fypModeActive;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentSection(item.id);
                        setIsOpen(false);
                      }}
                      className={`
                        w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-sans 
                        transition-all group relative text-left
                        ${isActive
                          ? isFypTarget
                            ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm font-semibold'
                            : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm font-semibold'
                          : isFypTarget
                            ? 'text-amber-300/80 hover:bg-amber-500/10 hover:text-amber-200 border border-transparent'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive 
                            ? isFypTarget ? 'text-amber-400' : 'text-cyan-400'
                            : isFypTarget ? 'text-amber-400/80' : 'text-slate-500 group-hover:text-slate-300'
                        }`} />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded shrink-0 ml-1 ${
                          isActive
                            ? 'bg-slate-900 text-cyan-300'
                            : 'bg-slate-900/80 text-slate-500 group-hover:text-slate-400'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info card */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/50">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-sans">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="font-mono text-[10px]">គោលដៅ PCB នៃ FYP</span>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold">REV 1.2</span>
            </div>
            <p className="text-slate-200 font-medium truncate">Solar Dual-Axis Controller</p>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">ESP32-S3 + CAN + 24V H-Bridge</p>
          </div>
        </div>
      </aside>
    </>
  );
};
