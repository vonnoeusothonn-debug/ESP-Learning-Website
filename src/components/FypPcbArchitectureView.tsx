import React, { useState } from 'react';
import { 
  Binary, 
  Sun, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Compass, 
  Radio, 
  Server, 
  Monitor, 
  ArrowDown, 
  ArrowRight,
  ExternalLink,
  Zap,
  Info
} from 'lucide-react';
import { FYP_PCB_SUBSYSTEMS, EXTERNAL_CONNECTORS, SubsystemBlock } from '../data/fypPcbData';
import { NavSection } from '../types';

interface FypPcbArchitectureViewProps {
  setCurrentSection: (section: NavSection) => void;
}

export const FypPcbArchitectureView: React.FC<FypPcbArchitectureViewProps> = ({ setCurrentSection }) => {
  const [selectedBlockId, setSelectedBlockId] = useState<string>('power-section');
  const [selectedConnector, setSelectedConnector] = useState<number>(0);

  const activeBlock: SubsystemBlock = FYP_PCB_SUBSYSTEMS.find(b => b.id === selectedBlockId) || FYP_PCB_SUBSYSTEMS[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <Binary className="w-4 h-4" />
            Hardware System Architecture
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
            Solar Tracker Control PCB Architecture
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Interactive block diagram connecting power conditioning, ESP32-S3 supervisor core, sensor fusion, dual-axis motor drivers, and industrial CAN telemetry.
          </p>
        </div>

        <button
          onClick={() => setCurrentSection('fyp-pcb-design')}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-mono text-xs font-semibold border border-amber-500/40 transition-all flex items-center gap-2"
        >
          <Compass className="w-4 h-4" />
          FYP PCB Design Guide →
        </button>
      </div>

      {/* Interactive Architecture Flow Diagram */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div>
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Interactive Hardware Flow: Click Any Block to Inspect Circuit Design
          </h2>
          <p className="text-xs text-slate-500">
            Shows high-voltage power paths (24V), low-voltage logic (3.3V/5V), and industrial CAN/MQTT data pipelines.
          </p>
        </div>

        {/* Visual Block Diagram Grid */}
        <div className="space-y-6">
          
          {/* Row 1: Power & Actuator Pipeline */}
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2 font-semibold">
              HIGH-CURRENT POWER & MOTOR DRIVE CHAIN (24V DC)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              {/* Block 1: Solar / Battery In */}
              <div 
                onClick={() => setSelectedBlockId('power-section')}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all space-y-2 ${
                  selectedBlockId === 'power-section'
                    ? 'bg-slate-950 border-amber-500 ring-1 ring-amber-500/30 shadow-lg shadow-amber-950/20'
                    : 'bg-slate-950/70 hover:bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-400 font-bold flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5" />
                    24V Solar Input
                  </span>
                  <span className="text-[10px] text-slate-500">250W Panel</span>
                </div>
                <div className="text-xs text-slate-300 font-medium">Power Protection</div>
                <div className="text-[11px] text-slate-500 font-mono">5A Fuse • TVS • P-FET</div>
              </div>

              {/* Block 2: Buck Converter */}
              <div 
                onClick={() => setSelectedBlockId('power-section')}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all space-y-2 ${
                  selectedBlockId === 'power-section'
                    ? 'bg-slate-950 border-amber-500 ring-1 ring-amber-500/30 shadow-lg shadow-amber-950/20'
                    : 'bg-slate-950/70 hover:bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-400 font-bold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    DC/DC Buck
                  </span>
                  <span className="text-[10px] text-slate-500">92% Eff.</span>
                </div>
                <div className="text-xs text-slate-300 font-medium">MP1584 Switching</div>
                <div className="text-[11px] text-slate-500 font-mono">24V ➔ 5.0V / 3.3V Rails</div>
              </div>

              {/* Block 3: Motor Drivers */}
              <div 
                onClick={() => setSelectedBlockId('motor-section')}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all space-y-2 ${
                  selectedBlockId === 'motor-section'
                    ? 'bg-slate-950 border-cyan-500 ring-1 ring-cyan-500/30 shadow-lg shadow-cyan-950/20'
                    : 'bg-slate-950/70 hover:bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    Dual Drivers
                  </span>
                  <span className="text-[10px] text-slate-500">Peak 4.8A</span>
                </div>
                <div className="text-xs text-slate-300 font-medium">H-Bridge & Dual Relays</div>
                <div className="text-[11px] text-slate-500 font-mono">TB6612 + 10A Relays</div>
              </div>

              {/* Block 4: Actuators */}
              <div 
                onClick={() => setSelectedBlockId('motor-section')}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all space-y-2 ${
                  selectedBlockId === 'motor-section'
                    ? 'bg-slate-950 border-cyan-500 ring-1 ring-cyan-500/30 shadow-lg shadow-cyan-950/20'
                    : 'bg-slate-950/70 hover:bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    Dual-Axis Actuators
                  </span>
                  <span className="text-[10px] text-slate-500">Dual Axis</span>
                </div>
                <div className="text-xs text-slate-300 font-medium">Turntable & Linear Ram</div>
                <div className="text-[11px] text-slate-500 font-mono">Azimuth + Elevation</div>
              </div>

            </div>
          </div>

          {/* Row 2: Digital Supervisor & Sensor Pipeline */}
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2 font-semibold">
              LOW-VOLTAGE SUPERVISOR CORE & PRECISION SENSORS (3.3V LOGIC)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              
              {/* Controller */}
              <div 
                onClick={() => setSelectedBlockId('controller-section')}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all space-y-2 ${
                  selectedBlockId === 'controller-section'
                    ? 'bg-slate-950 border-cyan-500 ring-1 ring-cyan-500/30 shadow-lg shadow-cyan-950/20'
                    : 'bg-slate-950/70 hover:bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    ESP32-S3 Master MCU
                  </span>
                  <span className="text-[10px] text-slate-500">240 MHz</span>
                </div>
                <div className="text-xs text-slate-300 font-medium">Xtensa LX7 Dual-Core</div>
                <div className="text-[11px] text-slate-500 font-mono">FreeRTOS • Kinematics PID</div>
              </div>

              {/* Sensors */}
              <div 
                onClick={() => setSelectedBlockId('sensor-section')}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all space-y-2 ${
                  selectedBlockId === 'sensor-section'
                    ? 'bg-slate-950 border-emerald-500 ring-1 ring-emerald-500/30 shadow-lg shadow-emerald-950/20'
                    : 'bg-slate-950/70 hover:bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5" />
                    Sensors (I2C + ADC)
                  </span>
                  <span className="text-[10px] text-slate-500">Hybrid Fusion</span>
                </div>
                <div className="text-xs text-slate-300 font-medium">BNO085 IMU + DS3231 RTC</div>
                <div className="text-[11px] text-slate-500 font-mono">4x Quadrant LDRs • 12-bit</div>
              </div>

              {/* CAN Telemetry */}
              <div 
                onClick={() => setSelectedBlockId('communication-section')}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all space-y-2 ${
                  selectedBlockId === 'communication-section'
                    ? 'bg-slate-950 border-purple-500 ring-1 ring-purple-500/30 shadow-lg shadow-purple-950/20'
                    : 'bg-slate-950/70 hover:bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-purple-400 font-bold flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5" />
                    Industrial CAN Bus
                  </span>
                  <span className="text-[10px] text-slate-500">250 kbps</span>
                </div>
                <div className="text-xs text-slate-300 font-medium">SN65HVD230 Transceiver</div>
                <div className="text-[11px] text-slate-500 font-mono">TWAI • 120Ω Terminated</div>
              </div>

            </div>
          </div>

          {/* Row 3: End-to-End Cloud Telemetry Path */}
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2 font-semibold">
              COMMUNICATION TOPOLOGY: SOLAR MAST TO CLOUD WEB DASHBOARD
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-cyan-300">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Solar-side ESP32</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden sm:block" />

              <div className="flex items-center gap-2 text-purple-300">
                <Radio className="w-4 h-4 text-purple-400" />
                <span>CAN Bus (250k)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden sm:block" />

              <div className="flex items-center gap-2 text-cyan-300">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Main Gateway ESP32</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden sm:block" />

              <div className="flex items-center gap-2 text-amber-300">
                <Radio className="w-4 h-4 text-amber-400" />
                <span>Wi-Fi / MQTT</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden sm:block" />

              <div className="flex items-center gap-2 text-rose-300">
                <Server className="w-4 h-4 text-rose-400" />
                <span>Node-RED SCADA</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden sm:block" />

              <div className="flex items-center gap-2 text-emerald-300">
                <Monitor className="w-4 h-4 text-emerald-400" />
                <span>Web Dashboard</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Selected Subsystem Inspector Details */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400">{activeBlock.category.toUpperCase()}</span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs font-mono text-emerald-400 font-semibold">{activeBlock.status}</span>
            </div>
            <h3 className="text-xl font-bold text-white font-sans mt-0.5">
              {activeBlock.name}
            </h3>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 self-start sm:self-auto">
            <div>
              <span className="text-slate-500 block text-[10px]">Voltage Rails:</span>
              <span className="text-cyan-300 font-bold">{activeBlock.voltageRail}</span>
            </div>
            <div className="border-l border-slate-800 pl-3">
              <span className="text-slate-500 block text-[10px]">Current Draw:</span>
              <span className="text-amber-300 font-bold">{activeBlock.currentConsumption}</span>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          {activeBlock.description}
        </p>

        {/* Circuit details */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Circuit Engineering Architecture & Protections
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
            {activeBlock.circuitDetails.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                <span className="text-slate-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Schematic Block Diagram */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Subsystem Schematic Net Interconnect
          </h4>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300/90 overflow-x-auto whitespace-pre leading-relaxed">
            {activeBlock.schematicSummary.trim()}
          </div>
        </div>

        {/* PCB Layout Guidelines */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            Mandatory PCB Layout Rules for this Block
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
            {activeBlock.pcbLayoutGuidelines.map((rule, idx) => (
              <li key={idx} className="leading-relaxed">
                <span className="text-slate-200">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* External Connectors Reference Table (J1 - J7) */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-300">
              External PCB Terminal Block Pinout Assignments (J1 - J7)
            </h3>
            <p className="text-xs text-slate-500">
              Field wiring interface specifications for 24V power, CAN bus, motors, limit switches, and sensor heads.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {EXTERNAL_CONNECTORS.map((conn, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedConnector(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                  selectedConnector === idx
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {conn.connectorName.split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Connector Detail Table */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
            <span className="text-cyan-400 font-bold text-sm">
              {EXTERNAL_CONNECTORS[selectedConnector].connectorName}
            </span>
            <span className="text-slate-400">
              Type: {EXTERNAL_CONNECTORS[selectedConnector].terminalType}
            </span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900 text-slate-400 text-[10px] uppercase border-b border-slate-800">
                <tr>
                  <th className="px-3 py-2">Pin #</th>
                  <th className="px-3 py-2">Net Label</th>
                  <th className="px-3 py-2">Voltage Spec</th>
                  <th className="px-3 py-2">Functional Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-950 text-slate-300">
                {EXTERNAL_CONNECTORS[selectedConnector].pins.map((pin, i) => (
                  <tr key={i} className="hover:bg-slate-900">
                    <td className="px-3 py-2 text-cyan-400 font-bold">Pin {pin.pinNumber}</td>
                    <td className="px-3 py-2 text-slate-100 font-semibold">{pin.label}</td>
                    <td className="px-3 py-2 text-amber-300">{pin.voltage}</td>
                    <td className="px-3 py-2 text-slate-400 font-sans text-[11px]">{pin.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};
