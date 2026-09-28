import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Trash2, 
  Download, 
  Calendar, 
  Cpu, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  X
} from 'lucide-react';
import { NotebookEntry, NavSection } from '../types';

interface NotebookViewProps {
  entries: NotebookEntry[];
  setEntries: React.Dispatch<React.SetStateAction<NotebookEntry[]>>;
  setCurrentSection: (section: NavSection) => void;
}

export const NotebookView: React.FC<NotebookViewProps> = ({
  entries,
  setEntries,
  setCurrentSection
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Entry Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Hardware' | 'Firmware' | 'PCB' | 'Testing' | 'System'>('Hardware');
  const [newHardware, setNewHardware] = useState('');
  const [newCodeVersion, setNewCodeVersion] = useState('v1.0.0');
  const [newMeasurements, setNewMeasurements] = useState('');
  const [newProblem, setNewProblem] = useState('');
  const [newSolution, setNewSolution] = useState('');
  const [newConclusion, setNewConclusion] = useState('');

  const categories = ['All', 'Hardware', 'Firmware', 'PCB', 'Testing', 'System'];

  const filteredEntries = entries.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.solution.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.hardware.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || e.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCreateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newEntry: NotebookEntry = {
      id: `note-${Date.now()}`,
      title: newTitle,
      date: new Date().toISOString().split('T')[0],
      category: newCategory,
      hardware: newHardware || 'ESP32-S3 DevKit',
      codeVersion: newCodeVersion || 'v1.0.0',
      measurements: newMeasurements || 'None recorded',
      problem: newProblem || 'None observed',
      solution: newSolution || 'Verified normal operation',
      conclusion: newConclusion || 'Test passed successfully'
    };

    setEntries(prev => [newEntry, ...prev]);
    setIsAddModalOpen(false);

    // Reset Form
    setNewTitle('');
    setNewHardware('');
    setNewMeasurements('');
    setNewProblem('');
    setNewSolution('');
    setNewConclusion('');
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SolarTracker_Lab_Notebook_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <BookOpen className="w-4 h-4" />
            កំណត់ហេតុពិសោធន៍វិស្វកម្មផ្ទាល់ខ្លួន (Personal Journal)
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
            សៀវភៅកំណត់ហេតុពិសោធន៍ FYP (Lab Notebook)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
            កត់ត្រាការវាស់វែងលើតុ LAB, ការឡើងកម្តៅ, បញ្ហាប្រឈមក្នុង Firmware និងដំណោះស្រាយបច្ចេកទេសសម្រាប់ការពារបញ្ចប់។
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto font-sans">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-slate-950 font-sans text-xs font-bold transition-all shadow-md shadow-purple-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>+ បន្ថែមកំណត់ត្រាថ្មី</span>
          </button>
          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-sans text-slate-300 border border-slate-700 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ទាញយក JSON</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="ស្វែងរកកំណត់ហេតុ (Search title, problem, solution, hardware...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none font-sans">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat === 'All' ? 'ទាំងអស់ (All)' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.map((entry) => (
          <div
            key={entry.id}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-purple-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                  {entry.category}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {entry.date}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-slate-500">Firmware: {entry.codeVersion}</span>
                <button
                  onClick={() => handleDeleteEntry(entry.id)}
                  className="text-slate-600 hover:text-rose-400 transition-colors p-1"
                  title="Delete entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h3 className="text-base font-bold text-white font-sans">
              {entry.title}
            </h3>

            <div className="text-xs font-mono text-slate-400">
              Hardware Tested: <span className="text-slate-300">{entry.hardware}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-mono text-cyan-400 font-semibold block">Oscilloscope & DMM Readings:</span>
                <p className="text-slate-300 font-sans leading-relaxed">{entry.measurements}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-mono text-amber-400 font-semibold block">Observed Problem:</span>
                <p className="text-slate-300 font-sans leading-relaxed">{entry.problem}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-xs space-y-1">
              <span className="font-mono text-emerald-400 font-bold block">Engineered Solution & Root Cause:</span>
              <p className="text-slate-200 font-sans leading-relaxed">{entry.solution}</p>
            </div>

            <div className="text-xs font-mono text-slate-400 pt-1 border-t border-slate-800/80">
              Conclusion: <span className="text-slate-300 font-sans">{entry.conclusion}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Entry Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-mono font-bold text-white uppercase flex items-center gap-2">
                <Plus className="w-4 h-4 text-purple-400" />
                New FYP Lab Experiment Entry
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateEntry} className="p-5 space-y-3 overflow-y-auto flex-1 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">Experiment Title:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lab Test 04: BNO085 I2C Bus Noise Mitigation"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-sans text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Category:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                  >
                    <option value="Hardware">Hardware</option>
                    <option value="Firmware">Firmware</option>
                    <option value="PCB">PCB</option>
                    <option value="Testing">Testing</option>
                    <option value="System">System</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Firmware Version:</label>
                  <input
                    type="text"
                    value={newCodeVersion}
                    onChange={(e) => setNewCodeVersion(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Hardware / Instruments Used:</label>
                <input
                  type="text"
                  placeholder="e.g. Rigol DS1054Z Scope, ESP32-S3, TB6612 Motor Driver"
                  value={newHardware}
                  onChange={(e) => setNewHardware(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Oscilloscope & Electrical Measurements:</label>
                <textarea
                  rows={2}
                  placeholder="e.g. 3.28V rail ripple: 15mV peak-to-peak. Motor stall current: 4.1A."
                  value={newMeasurements}
                  onChange={(e) => setNewMeasurements(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-sans text-xs"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Problem Observed:</label>
                <textarea
                  rows={2}
                  placeholder="e.g. ESP32 triggered brownout reset when relay energized."
                  value={newProblem}
                  onChange={(e) => setNewProblem(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-sans text-xs"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Engineered Solution:</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Added 220uF low-ESR electrolytic capacitor across 3.3V rail."
                  value={newSolution}
                  onChange={(e) => setNewSolution(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-sans text-xs"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Engineering Conclusion:</label>
                <input
                  type="text"
                  placeholder="e.g. Power rail stabilized; verified 50 consecutive relay cycles."
                  value={newConclusion}
                  onChange={(e) => setNewConclusion(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-sans text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-slate-950 font-bold text-xs"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
