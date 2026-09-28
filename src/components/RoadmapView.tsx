import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Cpu, 
  Zap, 
  Layers, 
  Radio, 
  Compass, 
  FlaskConical, 
  CircuitBoard, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  MapPin
} from 'lucide-react';
import { NavSection } from '../types';

interface RoadmapViewProps {
  setCurrentSection: (section: NavSection) => void;
  completedLessons: number[];
}

interface RoadmapStage {
  id: number;
  stageName: string;
  category: string;
  milestoneTitle: string;
  milestoneTitleKm: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  topics: string[];
  fypDeliverable: string;
  targetSection: NavSection;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  setCurrentSection,
  completedLessons
}) => {
  const roadmapStages: RoadmapStage[] = [
    {
      id: 1,
      stageName: 'ដំណាក់កាលទី 1',
      category: 'Foundation',
      milestoneTitle: 'ESP32 Fundamentals & Silicon Architecture',
      milestoneTitleKm: 'មូលដ្ឋានគ្រឹះ ESP32-S3 & ស្ថាបត្យកម្ម CPU',
      description: 'ស្វែងយល់ពីដំណើរការ Dual-Core Xtensa 240MHz, FreeRTOS Tasks, GPIO Multiplexer, Digital Input/Debounce, 12-bit ADC, PWM LEDC, និង Deep-Sleep Mode។',
      icon: Cpu,
      color: 'from-cyan-500 to-blue-600',
      topics: ['ESP32 គឺជាអ្វី?', 'ស្ថាបត្យកម្ម ESP32-S3', 'GPIO Input/Output', 'Digital Input & Debounce', 'ADC 12-bit & Attenuation', 'PWM LEDC Motor Speed'],
      fypDeliverable: 'ការធ្វើតេស្ត ESP32-S3 លើតុពិសោធន៍, ការអាន Limit Switch, និងការអានតង់ស្យុងពន្លឺពី LDR សងខាង។',
      targetSection: 'esp32'
    },
    {
      id: 2,
      stageName: 'ដំណាក់កាលទី 2',
      category: 'Electronics',
      milestoneTitle: 'Electronics, Power & Circuit Protection',
      milestoneTitleKm: 'អេឡិចត្រូនិកគ្រឹះ, ប្រព័ន្ធថាមពល & ការការពារសៀគ្វី',
      description: 'រៀនពីច្បាប់អូម និងការបញ្ចេញកម្តៅ P=I²R, Voltage Divider សម្រាប់អានអាគុយ 24V, Logic-Level N-MOSFET, Flyback Diode ការពារ Back-EMF, Buck Converter និង TVS Diode។',
      icon: Zap,
      color: 'from-amber-500 to-orange-600',
      topics: ['ច្បាប់អូម & Power', 'Voltage Divider 24V->3.3V', 'MOSFET H-Bridge Switching', 'Flyback Diode SS34', 'MP1584 Buck Converter 92%', 'TVS Diode & P-MOSFET Protection'],
      fypDeliverable: 'សៀគ្វីបែងចែកតង់ស្យុងអាគុយ, ប្រព័ន្ធការពារច្រឡំប៉ូល Reverse Polarity, និង Driver បញ្ជាម៉ូទ័រ 24V។',
      targetSection: 'electronics'
    },
    {
      id: 3,
      stageName: 'ដំណាក់កាលទី 3',
      category: 'Sensors & Bus',
      milestoneTitle: 'Sensors Fusion & Industrial Communication',
      milestoneTitleKm: 'សេនស័រវាស់វែង & ទំនាក់ទំនងឧស្សាហកម្ម CAN Bus',
      description: 'ភ្ជាប់ទំនាក់ទំនង Sensor តាម I2C (BNO085 IMU 9-DOF, DS3231 RTC), សរសេរកូដ PSA Sun Tracking Algorithm និងរត់ប្រព័ន្ធ CAN Bus 250kbps (TWAI) ទៅកាន់ Gateway។',
      icon: Radio,
      color: 'from-purple-500 to-indigo-600',
      topics: ['I2C Multi-device Bus', 'DS3231 Precision RTC', 'BNO085 Sensor Fusion Pitch/Roll', 'CAN Bus (TWAI) 250kbps', 'Termination Resistor 120Ω', 'Closed-Loop PID Tracking'],
      fypDeliverable: 'ប្រព័ន្ធអានមុំពិតប្រាកដនៃបន្ទះសូឡា ±0.5° និងការផ្ញើកញ្ចប់ទិន្នន័យ Telemetry ចម្ងាយ 50 ម៉ែត្រតាមខ្សែ Twisted Pair។',
      targetSection: 'labs'
    },
    {
      id: 4,
      stageName: 'ដំណាក់កាលទី 4',
      category: 'PCB Engineering',
      milestoneTitle: 'Custom 2-Layer PCB Design in KiCad 8.0',
      milestoneTitleKm: 'ការរចនាប្លង់បន្ទះ PCB 2 ស្រទាប់លើ KiCad 8.0',
      description: 'គូរ Schematic ពេញលេញលើ KiCad, ជ្រើសរើស Footprints ត្រឹមត្រូវ, រៀបចំទីតាំង Floorplanning (ញែកតំបន់ Power/Digital), រត់ខ្សែ Traces និងចាក់ Ground Plane បញ្ជូនទៅរោងចក្រផលិត។',
      icon: Layers,
      color: 'from-emerald-500 to-teal-600',
      topics: ['KiCad Schematic Capture', 'Footprint Assignment (0805 SMD & Screw)', 'High-Current Trace Width (2.5mm)', 'Ground Plane & Via Arrays', 'Design Rules Check (DRC)', 'Gerber & Drill Files Export'],
      fypDeliverable: 'បន្ទះ PCB 2-Layer ផលិតពីរោងចក្រ ទំហំ 100mm x 80mm រួមបញ្ចូល ESP32-S3, CAN, Buck Converter និង Screw Terminals។',
      targetSection: 'pcb-course'
    },
    {
      id: 5,
      stageName: 'ដំណាក់កាលទី 5',
      category: 'IoT & System',
      milestoneTitle: 'Full-Stack Integration, SCADA & FYP Defense',
      milestoneTitleKm: 'ការរួមបញ្ចូលប្រព័ន្ធពេញលេញ, Cloud SCADA & ការពារនិក្ខេបបទ',
      description: 'ដំឡើងគ្រឿងបង្គុំលើតួដែកសូឡា 250Wp, ភ្ជាប់ MQTT Telemetry ទៅកាន់ Node-RED Dashboard, រៀបចំរបាយការណ៍ និងអនុវត្តសេណារីយ៉ូតេស្តបង្ហាញគណៈកម្មការ។',
      icon: Compass,
      color: 'from-amber-400 via-orange-500 to-red-500',
      topics: ['Dual-Axis Mechanical Assembly', 'Node-RED Dashboard Metrics', 'Energy Yield Comparison (+35%)', 'System Fault Injection Testing', 'Thesis Documentation & PPT', 'Live Prototype Demo'],
      fypDeliverable: 'ប្រព័ន្ធ Dual-Axis Solar Tracker ពេញលេញដំណើរការដោយស្វ័យប្រវត្ត 100% ត្រៀមការពារនិក្ខេបបទបញ្ចប់ការសិក្សាទទួលបានជោគជ័យ។',
      targetSection: 'fyp-mode'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Roadmap Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-mono">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span>ផែនទីមាគ៌ាសិក្សាវិស្វកម្ម ៥ ដំណាក់កាល (Engineering Learning Roadmap)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-sans">
          មាគ៌ាពីអ្នកចាប់ផ្តើមដំបូង រហូតដល់បង្កើតបាន FYP Solar Tracker សម្រេច
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl font-sans leading-relaxed">
          ផែនទីនេះតម្រង់ទិសនិស្សិតវិស្វកម្មអគ្គិសនីជាជំហានៗ ដោយធានាថារាល់មេរៀនដែលបានរៀនសុទ្ធតែបម្រើឱ្យការសាងសង់ និងផលិតបន្ទះ PCB ពិតប្រាកដនៃគម្រោង Final Year Project។
        </p>
      </div>

      {/* Vertical Stages Flow */}
      <div className="space-y-4">
        {roadmapStages.map((stage, index) => {
          const Icon = stage.icon;
          const isCurrentActive = index === 1; // Stage 2 active

          return (
            <div 
              key={stage.id}
              className={`p-6 rounded-2xl border transition-all ${
                isCurrentActive
                  ? 'bg-slate-900/90 border-cyan-500/50 shadow-lg shadow-cyan-950/40 relative'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {isCurrentActive && (
                <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-bold text-[10px] font-mono uppercase tracking-wider shadow">
                  ដំណាក់កាលកំពុងដំណើរការ (Current Phase)
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Left Stage Details */}
                <div className="space-y-3 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                      {stage.stageName}
                    </span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs font-mono text-slate-400 uppercase">
                      {stage.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stage.color} text-slate-950 shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-white font-sans">
                        {stage.milestoneTitleKm}
                      </h2>
                      <div className="text-xs font-mono text-slate-400">
                        {stage.milestoneTitle}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                    {stage.description}
                  </p>

                  {/* Topic Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {stage.topics.map((t, i) => (
                      <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* FYP Deliverable Box */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-sans space-y-0.5">
                    <span className="font-mono text-amber-400 font-semibold text-[11px]">លទ្ធផលជាក់ស្តែងសម្រាប់ FYP (Deliverable): </span>
                    <span className="text-slate-300">{stage.fypDeliverable}</span>
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="shrink-0 flex items-center lg:flex-col justify-end gap-3 pt-2 lg:pt-0">
                  <button
                    onClick={() => setCurrentSection(stage.targetSection)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-cyan-500/50 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all group"
                  >
                    <span>ចូលសិក្សាផ្នែកនេះ</span>
                    <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
