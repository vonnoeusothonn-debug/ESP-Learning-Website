import React, { useState } from 'react';
import { 
  Bug, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle, 
  Activity,
  Wrench,
  ChevronRight,
  Info
} from 'lucide-react';
import { DEBUG_DATABASE } from '../data/debugDatabase';
import { DebugIssue, NavSection } from '../types';

interface DebugCenterViewProps {
  setCurrentSection: (section: NavSection) => void;
}

export const DebugCenterView: React.FC<DebugCenterViewProps> = ({ setCurrentSection }) => {
  const [selectedIssueId, setSelectedIssueId] = useState<string>(DEBUG_DATABASE[0].id);
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'ESP32' | 'PCB' | 'CAN' | 'MQTT'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'ESP32', 'PCB', 'CAN', 'MQTT'];

  const filteredIssues = DEBUG_DATABASE.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          issue.solution.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          issue.testingMethod.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || issue.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const activeIssue = DEBUG_DATABASE.find(i => i.id === selectedIssueId) || DEBUG_DATABASE[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <Bug className="w-4 h-4" />
            Engineering Diagnostic Knowledge Base
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
            Hardware & Firmware Debugging Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Systematic troubleshooting database for ESP32 boot loops, PCB short circuits, CAN bus errors, and MQTT timeouts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
          <span className="text-slate-400">Database Records:</span>
          <span className="text-rose-400 font-bold">{DEBUG_DATABASE.length} Common Failures</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search symptoms, causes or error logs (e.g. brownout, COM port, short circuit, BUS_OFF, 120 ohm)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Issue List (5 cols), Right Diagnostic Resolution (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Issue Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-2 max-h-[720px] overflow-y-auto pr-1">
          {filteredIssues.map((issue) => {
            const isSelected = issue.id === activeIssue.id;
            return (
              <div
                key={issue.id}
                onClick={() => setSelectedIssueId(issue.id)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all space-y-1.5 ${
                  isSelected
                    ? 'bg-slate-900 border-rose-500/60 shadow-md shadow-rose-950/30 ring-1 ring-rose-500/20'
                    : 'bg-slate-950/80 hover:bg-slate-900 border-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className={`px-1.5 py-0.2 rounded font-semibold ${
                    issue.category === 'ESP32' ? 'text-cyan-400 bg-cyan-950/40' :
                    issue.category === 'PCB' ? 'text-amber-400 bg-amber-950/40' :
                    issue.category === 'CAN' ? 'text-purple-400 bg-purple-950/40' :
                    'text-emerald-400 bg-emerald-950/40'
                  }`}>
                    {issue.category}
                  </span>
                </div>
                <h3 className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                  {issue.title}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-1">
                  {issue.symptoms[0]}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Resolution Reader (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
          
          {/* Header */}
          <div className="pb-4 border-b border-slate-800 space-y-1">
            <span className="text-xs font-mono font-bold text-rose-400">
              CATEGORY: {activeIssue.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-sans">
              {activeIssue.title}
            </h2>
          </div>

          {/* Observable Symptoms */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Observable Symptoms
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
              {activeIssue.symptoms.map((sym, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span className="text-slate-200">{sym}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Root Causes */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              Possible Root Causes
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
              {activeIssue.possibleCauses.map((cause, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span className="text-slate-200">{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Multimeter / Scope Testing Method */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              Laboratory Testing & Measurement Method
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {activeIssue.testingMethod}
            </p>
          </div>

          {/* Step-by-Step Engineering Solution */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/60 space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Step-by-Step Engineering Solution
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line">
              {activeIssue.solution}
            </p>
          </div>

          {/* Design Prevention Tip */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-purple-400 font-mono text-xs font-bold uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              Design Prevention Tip for Next PCB Revision:
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {activeIssue.preventionTip}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
