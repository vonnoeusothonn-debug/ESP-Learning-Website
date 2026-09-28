import React from 'react';
import { 
  Cpu, 
  Zap, 
  Layers, 
  Radio, 
  Compass, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Flame, 
  Sun, 
  Terminal, 
  CircuitBoard, 
  Activity,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  FileText,
  Hammer,
  Sparkles,
  Wrench
} from 'lucide-react';
import { NavSection, KanbanTask, NotebookEntry } from '../types';

interface DashboardViewProps {
  setCurrentSection: (section: NavSection) => void;
  fypModeActive: boolean;
  setFypModeActive: (active: boolean) => void;
  progress: {
    esp32: number;
    electronics: number;
    pcb: number;
    iot: number;
    fyp: number;
  };
  tasks: KanbanTask[];
  notebookEntries: NotebookEntry[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  setCurrentSection,
  fypModeActive,
  setFypModeActive,
  progress,
  tasks,
  notebookEntries
}) => {
  const pendingTasks = tasks.filter(t => t.status !== 'completed');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  const progressCards = [
    {
      title: 'ESP32 Firmware',
      titleKm: 'កម្មវិធីបង្កប់ ESP32',
      value: progress.esp32,
      targetSection: 'esp32' as NavSection,
      icon: Cpu,
      color: 'from-cyan-500 to-blue-600',
      textColor: 'text-cyan-400',
      badge: '16 មេរៀន',
      detail: 'ស្ថាបត្យកម្ម CPU, FreeRTOS & Peripherals'
    },
    {
      title: 'Electronics',
      titleKm: 'អេឡិចត្រូនិកគ្រឹះ',
      value: progress.electronics,
      targetSection: 'electronics' as NavSection,
      icon: Zap,
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-400',
      badge: '10 ប្រធានបទ',
      detail: 'ច្បាប់អូម, MOSFETs, Buck & ការការពារ TVS'
    },
    {
      title: 'PCB Design',
      titleKm: 'រចនាប្លង់ PCB & KiCad',
      value: progress.pcb,
      targetSection: 'pcb-course' as NavSection,
      icon: Layers,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-400',
      badge: '12 ជំហាន',
      detail: 'Schematic, Footprints, Routing & DRC'
    },
    {
      title: 'IoT & Telemetry',
      titleKm: 'បណ្តាញ IoT & Cloud',
      value: progress.iot,
      targetSection: 'labs' as NavSection,
      icon: Radio,
      color: 'from-purple-500 to-indigo-600',
      textColor: 'text-purple-400',
      badge: 'CAN + MQTT',
      detail: 'CAN Bus, Wi-Fi, Node-RED & Cloud SCADA'
    },
    {
      title: 'Overall FYP Project',
      titleKm: 'វឌ្ឍនភាព FYP សរុប',
      value: progress.fyp,
      targetSection: 'fyp-mode' as NavSection,
      icon: Compass,
      color: 'from-amber-400 via-orange-500 to-red-500',
      textColor: 'text-amber-300',
      badge: 'Dual-Axis',
      detail: 'ការរួមបញ្ចូលគ្រឿងរឹង & ការរៀបចំការពារបញ្ចប់'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Hero Engineering Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-mono">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>មន្ទីរពិសោធន៍វិស្វកម្មអគ្គិសនី (Khmer First Engineering Lab)</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              SolarTrack EE — ជំនួយការគម្រោងបញ្ចប់ការសិក្សា
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              វេទិការៀនសូត្រពីមូលដ្ឋានគ្រឹះ ESP32, អេឡិចត្រូនិក, ការរចនា PCB លើ KiCad 8.0 រហូតដល់ការផលិតបានសម្រេចនូវប្រព័ន្ធ <strong className="text-amber-400 font-semibold">“Smart Dual-Axis Solar Tracking System with Remote Monitoring and Control”</strong> ពេញលេញមួយ។
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950 border border-slate-800">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                បន្ទះសូឡា 250Wp + MPPT
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950 border border-slate-800">
                <CircuitBoard className="w-3.5 h-3.5 text-cyan-400" />
                PCB 2 ស្រទាប់ Custom
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950 border border-slate-800">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                CAN Bus 250kbps + MQTT
              </span>
            </div>
          </div>

          {/* Quick Target Switch & Target Stats */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => setCurrentSection('fyp-mode')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
            >
              <Compass className="w-4 h-4 text-slate-950" />
              <span>បើកមើលផ្ទាំង FYP Solar Tracker</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentSection('esp32')}
              className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs font-mono flex items-center justify-center gap-2 transition-all"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>បន្តការរៀនមេរៀន ESP32</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Cards Grid (ESP32, Electronics, PCB, IoT, FYP) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2 font-semibold">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>វឌ្ឍនភាពនៃការរៀនសូត្រ និងការអភិវឌ្ឍ (Engineering Progress Metrics)</span>
          </h2>
          <span className="text-xs font-mono text-slate-500">គិតជាភាគរយជាក់ស្តែង %</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {progressCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                onClick={() => setCurrentSection(card.targetSection)}
                className="group p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 group-hover:scale-110 transition-transform">
                      <Icon className={`w-4 h-4 ${card.textColor}`} />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                      {card.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-slate-200 font-sans group-hover:text-white transition-colors">
                      {card.titleKm}
                    </h3>
                    <div className="text-[10px] font-mono text-slate-400">
                      {card.title}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-extrabold font-mono text-white">
                      {card.value}%
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1 group-hover:text-slate-300">
                      <span>ចូលមើល</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>

                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className={`bg-gradient-to-r ${card.color} h-full rounded-full transition-all duration-700`}
                      style={{ width: `${card.value}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-400 font-sans line-clamp-1 pt-1">
                    {card.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3 Learning Modes & 15-Section Engineering Pedagogy Showcase */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
              <Sparkles className="w-4 h-4" />
              ប្រព័ន្ធបង្រៀន ១៥ ជំហាន & របៀបសិក្សា ៣ កម្រិត (15-Step Pedagogy & 3 Modes)
            </div>
            <h3 className="text-base font-bold text-white font-sans mt-0.5">
              រចនាឡើងពិសេសសម្រាប់និស្សិតវិស្វកម្មអគ្គិសនីកម្ពុជា (Khmer First)
            </h3>
          </div>
          <button
            onClick={() => setCurrentSection('esp32')}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-semibold transition-all flex items-center gap-1.5"
          >
            <span>ចូលរៀនមេរៀន ESP32</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
          {/* Beginner Mode Card */}
          <div 
            onClick={() => setCurrentSection('esp32')}
            className="p-4 rounded-xl bg-slate-950/80 border border-sky-900/40 hover:border-sky-500/50 cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between text-sky-400 font-mono font-bold">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                BEGINNER MODE
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-950 border border-sky-800 text-sky-300">កម្រិតដំបូង</span>
            </div>
            <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
              ការពន្យល់ជាភាសាខ្មែរសាមញ្ញ ឧទាហរណ៍ប្រៀបធៀបក្នុងជីវិតប្រចាំថ្ងៃ ដ្យាក្រាមរូបភាព និងការណែនាំមួយជំហានម្តងៗ។
            </p>
          </div>

          {/* Engineering Mode Card */}
          <div 
            onClick={() => setCurrentSection('esp32')}
            className="p-4 rounded-xl bg-slate-950/80 border border-cyan-900/40 hover:border-cyan-500/50 cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between text-cyan-400 font-mono font-bold">
              <span className="flex items-center gap-1.5">
                <Wrench className="w-4 h-4" />
                ENGINEERING MODE
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">កម្រិតវិស្វករ</span>
            </div>
            <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
              ដកស្រង់ Datasheet, រូបមន្តគណនាចរន្ត/តង់ស្យុង, ការសម្រេចចិត្តវិស្វកម្ម (Trade-offs) និងវិធីសាស្ត្រធ្វើតេស្តក្នុង Lab។
            </p>
          </div>

          {/* FYP Mode Card */}
          <div 
            onClick={() => setCurrentSection('esp32')}
            className="p-4 rounded-xl bg-slate-950/80 border border-amber-900/40 hover:border-amber-500/50 cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between text-amber-400 font-mono font-bold">
              <span className="flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                FYP MODE
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300">Solar Tracker</span>
            </div>
            <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
              ភ្ជាប់រាល់គោលគំនិតទៅកាន់ Dual-Axis Solar Tracker, ប្លង់ Hardware, ការតេស្តនៅការដ្ឋាន និងការត្រៀមឆ្លើយការពារសារណា។
            </p>
          </div>
        </div>
      </div>

      {/* 2-Column Section: Active Tasks / Milestones & Recent Notebook Experiments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: FYP Milestones & Pending Tasks (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2 font-semibold">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>កិច្ចការ និងដំណាក់កាល FYP សំខាន់ៗ (Active FYP Milestones)</span>
            </h2>
            <button
              onClick={() => setCurrentSection('kanban')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>គ្រប់គ្រងលើ Kanban</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            
            {/* Milestone Summary Ribbon */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase">ដំណាក់កាលបច្ចុប្បន្ន (Current Phase)</div>
                <div className="text-xs sm:text-sm font-bold text-amber-300 font-sans mt-0.5">
                  ដំណាក់កាលទី 2: ការរួមបញ្ចូលក្បួនគណនា Closed-Loop & CAN Bus
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs font-mono font-bold text-emerald-400">
                  {completedTasks.length} / {tasks.length} បានបញ្ចប់
                </div>
                <div className="text-[10px] font-mono text-slate-500">កិច្ចការវិស្វកម្ម</div>
              </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-2">
              {pendingTasks.slice(0, 4).map((task) => (
                <div 
                  key={task.id}
                  onClick={() => setCurrentSection('kanban')}
                  className="p-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-all cursor-pointer flex items-start justify-between gap-3 group"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase ${
                        task.priority === 'High' 
                          ? 'bg-rose-950 text-rose-300 border border-rose-800/60'
                          : 'bg-amber-950 text-amber-300 border border-amber-800/60'
                      }`}>
                        {task.priority} Priority
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400">
                        {task.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 truncate">
                        • {task.milestone}
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors truncate">
                      {task.title}
                    </h4>

                    <p className="text-[11px] text-slate-400 line-clamp-1 font-sans">
                      {task.description}
                    </p>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 uppercase ${
                    task.status === 'in-progress' 
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60'
                      : task.status === 'testing'
                        ? 'bg-purple-950 text-purple-300 border border-purple-800/60'
                        : 'bg-slate-900 text-slate-400'
                  }`}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Column: Lab Experiments & Target Hardware Specs (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2 font-semibold">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>កំណត់ហេតុពិសោធន៍ (Recent Lab Notebook)</span>
            </h2>
            <button
              onClick={() => setCurrentSection('notebook')}
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>មើលទាំងអស់</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            
            {notebookEntries.slice(0, 2).map((entry) => (
              <div 
                key={entry.id}
                onClick={() => setCurrentSection('notebook')}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="text-emerald-400 font-semibold">{entry.date}</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {entry.category}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-200 group-hover:text-emerald-300 transition-colors font-sans">
                  {entry.title}
                </h4>

                <div className="text-[11px] font-sans text-slate-400 line-clamp-2">
                  <strong className="text-slate-300 font-mono">ការវាស់វែង: </strong>
                  {entry.measurements}
                </div>

                <div className="text-[11px] font-sans text-emerald-400/90 line-clamp-1 border-t border-slate-900 pt-1.5">
                  ✓ {entry.conclusion}
                </div>
              </div>
            ))}

            {/* Quick PCB Hardware Spec Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950 to-cyan-950/30 border border-cyan-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  លក្ខណៈបច្ចេកទេស PCB គោលដៅ (Target Specs)
                </span>
                <span className="text-[10px] font-mono text-cyan-400">KiCad Rev 1.2</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300 pt-1">
                <div>• MCU: ESP32-S3 Dual-Core</div>
                <div>• Motor: 24V H-Bridge BTS7960</div>
                <div>• IMU: BNO085 (9-DOF I2C)</div>
                <div>• Bus: CAN TWAI 250kbps</div>
                <div>• Protection: TVS + P-MOSFET</div>
                <div>• Power: 24V to 5V MP1584 Buck</div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
