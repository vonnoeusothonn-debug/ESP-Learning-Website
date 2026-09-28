import React, { useState } from 'react';
import { 
  Box, 
  Search, 
  Sliders, 
  AlertTriangle, 
  Compass, 
  Cpu, 
  Zap, 
  Radio, 
  Layers, 
  ChevronRight,
  Info
} from 'lucide-react';
import { PCB_COMPONENTS } from '../data/componentsData';
import { PcbComponent, NavSection } from '../types';

interface ComponentGuideViewProps {
  setCurrentSection: (section: NavSection) => void;
}

export const ComponentGuideView: React.FC<ComponentGuideViewProps> = ({ setCurrentSection }) => {
  const [selectedCompId, setSelectedCompId] = useState<string>(PCB_COMPONENTS[0].id);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [packageFilter, setPackageFilter] = useState<'All' | 'SMD' | 'THT' | 'Both'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'MCU', 'Power', 'Protection', 'Drivers', 'Communication', 'Sensors', 'Passive', 'Connectors'];

  const filteredComponents = PCB_COMPONENTS.filter(comp => {
    const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          comp.function.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          comp.whyUsed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || comp.category === categoryFilter;
    const matchesPackage = packageFilter === 'All' || comp.thtSmd === packageFilter || comp.thtSmd === 'Both';
    return matchesSearch && matchesCategory && matchesPackage;
  });

  const activeComp = PCB_COMPONENTS.find(c => c.id === selectedCompId) || PCB_COMPONENTS[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <Box className="w-4 h-4" />
            Hardware Bill of Materials
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
            PCB Component Selection & Engineering Rationale
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Why each semiconductor, passives, and connector was chosen for the Solar Tracker PCB with voltage ratings, footprints, and alternatives.
          </p>
        </div>

        <button
          onClick={() => setCurrentSection('fyp-pcb-arch')}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono text-xs font-bold transition-all"
        >
          View Full PCB Architecture →
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search components (e.g. ESP32, MOSFET, TVS, fuse, buck, CAN, relay)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Category Pill Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Component Card List (5 cols) */}
        <div className="lg:col-span-5 space-y-2 max-h-[720px] overflow-y-auto pr-1">
          {filteredComponents.map((comp) => {
            const isSelected = comp.id === activeComp.id;
            return (
              <div
                key={comp.id}
                onClick={() => setSelectedCompId(comp.id)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all space-y-1.5 ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500/60 shadow-md shadow-cyan-950/30 ring-1 ring-cyan-500/20'
                    : 'bg-slate-950/80 hover:bg-slate-900 border-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-cyan-400 font-semibold px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800">
                    {comp.category}
                  </span>
                  <span className={`px-1.5 py-0.2 rounded ${
                    comp.thtSmd === 'SMD' ? 'text-purple-400 bg-purple-950/40' :
                    comp.thtSmd === 'THT' ? 'text-amber-400 bg-amber-950/40' :
                    'text-emerald-400 bg-emerald-950/40'
                  }`}>
                    {comp.thtSmd}
                  </span>
                </div>
                <h3 className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                  {comp.name}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-1">
                  {comp.function}
                </p>
                <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 pt-0.5">
                  <span>{comp.voltage}</span>
                  <span>•</span>
                  <span>{comp.current}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Detailed Component Inspector (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
          
          {/* Header */}
          <div className="pb-4 border-b border-slate-800 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400">{activeComp.category}</span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs font-mono text-purple-400">{activeComp.thtSmd} MOUNT</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-sans">
              {activeComp.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {activeComp.function}
            </p>
          </div>

          {/* Quick Electrical & Physical Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
              <span className="text-[10px] text-slate-500 uppercase">Operating Voltage</span>
              <div className="text-cyan-300 font-bold truncate">{activeComp.voltage}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
              <span className="text-[10px] text-slate-500 uppercase">Max Current</span>
              <div className="text-amber-300 font-bold truncate">{activeComp.current}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
              <span className="text-[10px] text-slate-500 uppercase">Package Type</span>
              <div className="text-slate-200 font-bold truncate">{activeComp.packageType}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
              <span className="text-[10px] text-slate-500 uppercase">Recommended Footprint</span>
              <div className="text-emerald-400 font-bold truncate" title={activeComp.recommendedFootprint}>
                {activeComp.recommendedFootprint.split(':').pop() || activeComp.recommendedFootprint}
              </div>
            </div>
          </div>

          {/* Why It Is Used */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              Engineering Selection Rationale (Why this exact part?)
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {activeComp.whyUsed}
            </p>
          </div>

          {/* Direct Role in Solar Tracker FYP */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-orange-950/30 to-slate-900 border border-amber-800/60 space-y-1.5">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wide">
                Role in the Dual-Axis Solar Tracker FYP
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {activeComp.solarTrackerRole}
            </p>
          </div>

          {/* Alternatives & Common Mistakes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Alternatives */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                Alternative Parts & Tradeoffs
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                {activeComp.alternatives.map((alt, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <span className="text-slate-200">{alt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mistakes */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Common Student Sizing Mistakes
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                {activeComp.commonMistakes.map((mistake, idx) => (
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
