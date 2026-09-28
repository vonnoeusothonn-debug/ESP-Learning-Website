import React, { useState } from 'react';
import { 
  Kanban, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft,
  X,
  Compass,
  Filter
} from 'lucide-react';
import { KanbanTask, NavSection } from '../types';

interface KanbanViewProps {
  tasks: KanbanTask[];
  setTasks: React.Dispatch<React.SetStateAction<KanbanTask[]>>;
  setCurrentSection: (section: NavSection) => void;
}

export const KanbanView: React.FC<KanbanViewProps> = ({
  tasks,
  setTasks,
  setCurrentSection
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState<'Hardware' | 'Firmware' | 'PCB' | 'IoT' | 'Integration'>('Firmware');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [newMilestone, setNewMilestone] = useState('Milestone 2: Closed-Loop Algorithm Integration');
  const [newDeliverable, setNewDeliverable] = useState('');

  const columns: { id: KanbanTask['status']; label: string; color: string }[] = [
    { id: 'backlog', label: 'ជួររង់ចាំ (BACKLOG)', color: 'border-slate-700 text-slate-400' },
    { id: 'in-progress', label: 'កំពុងអនុវត្ត (IN PROGRESS)', color: 'border-amber-500/60 text-amber-400' },
    { id: 'testing', label: 'កំពុងធ្វើតេស្ត (TESTING)', color: 'border-cyan-500/60 text-cyan-400' },
    { id: 'completed', label: 'បានបញ្ចប់ (COMPLETED)', color: 'border-emerald-500/60 text-emerald-400' }
  ];

  const moveTask = (taskId: string, direction: 'prev' | 'next') => {
    const statusOrder: KanbanTask['status'][] = ['backlog', 'in-progress', 'testing', 'completed'];
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      const curIdx = statusOrder.indexOf(t.status);
      const nextIdx = direction === 'next' ? Math.min(3, curIdx + 1) : Math.max(0, curIdx - 1);
      return { ...t, status: statusOrder[nextIdx] };
    }));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newTask: KanbanTask = {
      id: `task-${Date.now()}`,
      title: newTitle,
      description: newDescription || 'Standard engineering deliverable.',
      status: 'backlog',
      category: newCategory,
      priority: newPriority,
      milestone: newMilestone,
      deliverable: newDeliverable || 'Working hardware/firmware subsystem.'
    };

    setTasks(prev => [newTask, ...prev]);
    setIsAddModalOpen(false);

    setNewTitle('');
    setNewDescription('');
    setNewDeliverable('');
  };

  const filteredTasks = tasks.filter(t => 
    selectedCategory === 'All' || t.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <Kanban className="w-4 h-4" />
            ការគ្រប់គ្រងកិច្ចការគម្រោង FYP (Milestone Management)
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
            FYP Task Manager & Kanban Board (Khmer First)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
            តាមដានវឌ្ឍនភាពចាប់ពីការតេស្តគ្រឿងរឹងលើតុ ដល់ការផលិតបន្ទះ PCB, ការ Calibrate សូឡា និងការការពារបញ្ចប់។
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto font-sans">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-sans text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>+ បន្ថែមកិច្ចការថ្មី</span>
          </button>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-mono text-slate-500 flex items-center gap-1 shrink-0">
          <Filter className="w-3.5 h-3.5" />
          Filter:
        </span>
        {['All', 'Hardware', 'Firmware', 'PCB', 'IoT', 'Integration'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all border ${
              selectedCategory === cat
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 4-Column Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter(t => t.status === col.id);

          return (
            <div
              key={col.id}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 min-h-[500px] flex flex-col justify-between"
            >
              <div>
                {/* Column Header */}
                <div className={`flex items-center justify-between pb-3 border-b ${col.color}`}>
                  <span className="font-mono text-xs font-bold tracking-wider">
                    {col.label}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-mono font-bold text-slate-300">
                    {colTasks.length}
                  </span>
                </div>

                {/* Task Cards */}
                <div className="space-y-3 mt-3">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-2 shadow-sm"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-cyan-400 font-semibold px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800">
                          {task.category}
                        </span>
                        <span className={`px-1.5 py-0.2 rounded font-bold ${
                          task.priority === 'High' ? 'text-rose-400 bg-rose-950/40' :
                          task.priority === 'Medium' ? 'text-amber-400 bg-amber-950/40' :
                          'text-slate-400 bg-slate-900'
                        }`}>
                          {task.priority}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-100 font-sans leading-snug">
                        {task.title}
                      </h4>

                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans line-clamp-2">
                        {task.description}
                      </p>

                      <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800/80">
                        Deliverable: <span className="text-slate-300">{task.deliverable}</span>
                      </div>

                      {/* Move left / right controls & delete */}
                      <div className="flex items-center justify-between pt-1 text-slate-500">
                        <button
                          onClick={() => moveTask(task.id, 'prev')}
                          disabled={col.id === 'backlog'}
                          className="p-1 hover:text-cyan-400 disabled:opacity-20"
                          title="Move to previous stage"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-[10px] font-mono hover:text-rose-400"
                        >
                          Remove
                        </button>

                        <button
                          onClick={() => moveTask(task.id, 'next')}
                          disabled={col.id === 'completed'}
                          className="p-1 hover:text-cyan-400 disabled:opacity-20"
                          title="Move to next stage"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {colTasks.length === 0 && (
                    <div className="text-center py-8 text-xs font-mono text-slate-600">
                      No tasks in this stage.
                    </div>
                  )}
                </div>
              </div>

              {col.id === 'backlog' && (
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="w-full mt-3 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-400 hover:text-slate-200 transition-all flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3 h-3" />
                  Add Task
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-mono font-bold text-white uppercase flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-400" />
                Add New FYP Development Task
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="p-5 space-y-3 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">Task Title:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Calibrate Quadrant LDR Lux Thresholds"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-sans text-xs focus:outline-none focus:border-cyan-500"
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
                    <option value="IoT">IoT</option>
                    <option value="Integration">Integration</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Priority:</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Target Milestone:</label>
                <select
                  value={newMilestone}
                  onChange={(e) => setNewMilestone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                >
                  <option value="Milestone 1: Subsystem Bench Testing">Milestone 1: Subsystem Bench Testing</option>
                  <option value="Milestone 2: Closed-Loop Algorithm Integration">Milestone 2: Closed-Loop Algorithm Integration</option>
                  <option value="Milestone 3: Custom PCB Design & Fabrication">Milestone 3: Custom PCB Design & Fabrication</option>
                  <option value="Milestone 4: Prototype Commissioning">Milestone 4: Prototype Commissioning</option>
                  <option value="Milestone 5: Project Defense & Thesis">Milestone 5: Project Defense & Thesis</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Deliverable / Acceptance Criteria:</label>
                <input
                  type="text"
                  placeholder="e.g. Solder continuity check 0 errors before initial power-on"
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-sans text-xs"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Technical Description:</label>
                <textarea
                  rows={2}
                  placeholder="Describe hardware test methods, pin assignments, or firmware changes..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
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
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs"
                >
                  Add to Backlog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
