import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  HelpCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Compass, 
  Calculator, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { ELECTRONICS_TOPICS } from '../data/electronicsTopics';
import { ElectronicsTopic, NavSection } from '../types';

interface ElectronicsViewProps {
  setCurrentSection: (section: NavSection) => void;
}

export const ElectronicsView: React.FC<ElectronicsViewProps> = ({ setCurrentSection }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(ELECTRONICS_TOPICS[0].id);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Quick Mini Calculator for Electronics
  const [calcVoltage, setCalcVoltage] = useState(24);
  const [calcCurrent, setCalcCurrent] = useState(3.5);

  const categories = ['All', 'Fundamentals', 'Components', 'Protection & Noise', 'Power Systems'];

  const filteredTopics = ELECTRONICS_TOPICS.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.solarTrackerRelevance.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const activeTopic = ELECTRONICS_TOPICS.find(t => t.id === selectedTopicId) || ELECTRONICS_TOPICS[0];

  const calculatedPower = calcVoltage * calcCurrent;
  const calculatedResistance = calcCurrent > 0 ? (calcVoltage / calcCurrent) : 0;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <Zap className="w-4 h-4" />
            អេឡិចត្រូនិកគ្រឹះសម្រាប់វិស្វករ (Hardware Engineering)
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
            អេឡិចត្រូនិក, ប្រព័ន្ធថាមពល & ការការពារសៀគ្វី (Khmer First)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
            គោលការណ៍គ្រឹះអគ្គិសនី៖ Voltage Divider, Logic-Level MOSFET, Flyback Diode, Buck Converter និង Ground Loop Immunity សម្រាប់ Solar Tracker។
          </p>
        </div>

        <button
          onClick={() => setCurrentSection('calculators')}
          className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-sans text-xs font-semibold border border-amber-500/40 transition-all"
        >
          <Calculator className="w-4 h-4 text-amber-400" />
          <span>ម៉ាស៊ីនគិតលេខវិស្វកម្មពេញលេញ →</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="ស្វែងរកប្រធានបទអេឡិចត្រូនិក (ឧ. MOSFET, Buck, Divider, Fuse, TVS, Ground)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none font-sans">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat === 'All' ? 'ទាំងអស់ (All)' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Topic List (4 cols) */}
        <div className="lg:col-span-4 space-y-2 max-h-[700px] overflow-y-auto pr-1">
          {filteredTopics.map((topic) => {
            const isSelected = topic.id === activeTopic.id;
            return (
              <div
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all space-y-1 ${
                  isSelected
                    ? 'bg-slate-900 border-amber-500/60 shadow-md shadow-amber-950/30 ring-1 ring-amber-500/20'
                    : 'bg-slate-950/80 hover:bg-slate-900 border-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span className="text-amber-400 font-semibold">{topic.category}</span>
                </div>
                <h3 className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                  {topic.title}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-1 font-mono">
                  {topic.formula || topic.keyRule}
                </p>
              </div>
            );
          })}

          {/* Mini Ohm's Law Calculator Widget */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 mt-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              <span>ឧបករណ៍គណនារហ័សច្បាប់អូម (Ohm's Law)</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <label className="text-[10px] text-slate-400">តង់ស្យុង (V):</label>
                <input
                  type="number"
                  value={calcVoltage}
                  onChange={(e) => setCalcVoltage(Number(e.target.value))}
                  className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-100 font-mono mt-0.5"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400">ចរន្ត (A):</label>
                <input
                  type="number"
                  step="0.1"
                  value={calcCurrent}
                  onChange={(e) => setCalcCurrent(Number(e.target.value))}
                  className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-100 font-mono mt-0.5"
                />
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">អានុភាព (P = V·I):</span>
                <span className="text-amber-400 font-bold">{calculatedPower.toFixed(2)} Watts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ភាពធន់ (R = V/I):</span>
                <span className="text-cyan-400 font-bold">{calculatedResistance.toFixed(2)} Ω</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Detailed Reader (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
          
          {/* Header */}
          <div className="pb-4 border-b border-slate-800 space-y-1">
            <span className="text-xs font-mono font-bold text-amber-400">{activeTopic.category.toUpperCase()}</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-sans">
              {activeTopic.title}
            </h2>
            {activeTopic.formula && (
              <div className="inline-block px-3 py-1 rounded bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 font-semibold mt-1">
                រូបមន្ត (Formula): {activeTopic.formula}
              </div>
            )}
          </div>

          {/* Key Rule Warning */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/50 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wide">
                ច្បាប់មាសវិស្វកម្ម (Golden Rule for Hardware):
              </span>
              <p className="text-xs sm:text-sm text-slate-200 mt-0.5 font-sans leading-relaxed">
                {activeTopic.keyRule}
              </p>
            </div>
          </div>

          {/* In-depth theoretical explanation */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              ការពន្យល់លម្អិតបែបវិស្វកម្ម (Theoretical Foundation & Mechanics)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {activeTopic.explanation}
            </p>
          </div>

          {/* Schematic Diagram ASCII */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              ដ្យាក្រាមសៀគ្វីគំរូ (Circuit Schematic Diagram)
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300/90 overflow-x-auto whitespace-pre leading-tight">
              {activeTopic.schematicAscii.trim()}
            </div>
          </div>

          {/* Practical Relevance to Solar Tracker FYP */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-orange-950/30 to-slate-900 border border-amber-800/60 space-y-1.5">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wide">
                ការអនុវត្តជាក់ស្តែងក្នុង Solar Tracker FYP
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {activeTopic.solarTrackerRelevance}
            </p>
          </div>

          {/* Design tips & Common student mistakes side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Design Tips */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                គន្លឹះរចនា PCB & សៀគ្វី (Design Rules)
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside font-sans">
                {activeTopic.designTips.map((tip, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <span className="text-slate-200">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                កំហុសទូទៅដែលគួរជៀសវាង (Common Pitfalls)
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside font-sans">
                {activeTopic.commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <span className="text-slate-200">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
