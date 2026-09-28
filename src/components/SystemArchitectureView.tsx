import React, { useState } from 'react';
import { 
  Network, 
  Sun, 
  Battery, 
  Cpu, 
  Radio, 
  Server, 
  Database, 
  Monitor, 
  ArrowRight, 
  ArrowDown, 
  Info, 
  Layers,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { NavSection } from '../types';

interface SystemNode {
  id: string;
  name: string;
  category: 'Power Generation' | 'Solar Mast Subsystem' | 'Industrial Link' | 'Base Gateway' | 'Cloud SCADA' | 'User Interface';
  role: string;
  hardware: string;
  protocol: string;
  payloadExample?: string;
  electricalSpec: string;
  keyResponsibilities: string[];
}

export const SystemArchitectureView: React.FC<{ setCurrentSection: (section: NavSection) => void }> = ({ setCurrentSection }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('mast-controller');

  const systemNodes: SystemNode[] = [
    {
      id: 'solar-power',
      name: '1. Solar Generation & Battery Storage',
      category: 'Power Generation',
      role: 'Generates clean DC electricity and provides uninterrupted 24V power storage.',
      hardware: '250W Monocrystalline PV Panel, 24V 50Ah LiFePO4 Battery Bank, 20A MPPT Charge Controller',
      protocol: 'DC Analog Bus (18V - 32V)',
      electricalSpec: 'Vmp = 31.2V, Imp = 8.01A; Battery float voltage: 27.2V',
      keyResponsibilities: [
        'Converts solar irradiance into electrical power via Maximum Power Point Tracking (MPPT).',
        'Powers the motor turntable, linear actuators, and electronics directly from battery reserve.',
        'Provides telemetry signals (battery voltage, PV current) to the analog conditioning circuits.'
      ]
    },
    {
      id: 'mast-controller',
      name: '2. Solar-Side Controller (Outdoor Mast)',
      category: 'Solar Mast Subsystem',
      role: 'Executes closed-loop dual-axis motor control, sensor fusion, and endstop interlocks directly at the mast.',
      hardware: 'ESP32-S3-WROOM-1, 4x LDRs, BNO085 IMU, DS3231 RTC, TB6612 H-Bridge, Dual 10A Relays, SN65HVD230',
      protocol: 'Internal: I2C (100kHz) + 12-bit ADC | External: CAN Bus 2.0B (250 kbps)',
      payloadExample: 'CAN ID 0x101: [0x05, 0xAC, 0x01, 0xAC, 0xAA, 0x00, 0x00, 0x01] (Az=145.2°, El=42.8°)',
      electricalSpec: 'Powered by 24V bus stepped down to 5.0V (MP1584 buck) and 3.3V (AMS1117)',
      keyResponsibilities: [
        'Samples 4 quadrant LDRs at 10Hz and extracts differential tracking error vector.',
        'Queries BNO085 IMU over I2C at 50Hz for real-time elevation pitch and azimuth yaw.',
        'Runs FreeRTOS motor task driving Azimuth PWM and linear actuator relays.',
        'Packs orientation, solar yield, and diagnostic status into 8-byte CAN frames.'
      ]
    },
    {
      id: 'can-bus-link',
      name: '3. Industrial CAN Bus Transmission Line',
      category: 'Industrial Link',
      role: 'High-speed noise-immune differential physical link connecting the mast to the indoor base-station.',
      hardware: 'Belden 9841 Shielded Twisted Pair (120Ω characteristic impedance) + 2x 120Ω split terminations',
      protocol: 'CAN 2.0B Differential Signaling (CAN_H: 2.5V-3.5V, CAN_L: 1.5V-2.5V)',
      electricalSpec: 'Baud rate: 250 kbps, Max length: 250 meters, Common-mode rejection: ±16V',
      keyResponsibilities: [
        'Eliminates inductive noise glitches caused by motor relay arcing over long cable runs.',
        'Ensures deterministic packet delivery with hardware CRC and automatic retransmission.',
        'Carries CAN_H, CAN_L, and isolated Ground reference.'
      ]
    },
    {
      id: 'gateway-controller',
      name: '4. Main Gateway Controller (Indoor Station)',
      category: 'Base Gateway',
      role: 'Translates industrial CAN telemetry into Wi-Fi MQTT messages and manages network reconnection.',
      hardware: 'ESP32-S3-DevKit, SN65HVD230 Transceiver, 2.4GHz Wi-Fi Radio',
      protocol: 'CAN Bus ➔ TCP/IP ➔ MQTT Protocol (Port 1883)',
      payloadExample: '{"az":145.2,"el":42.8,"pv_w":245.6,"vbat":26.2,"status":"TRACKING"}',
      electricalSpec: 'Powered by indoor 5V 2A USB-C supply',
      keyResponsibilities: [
        'Receives 250 kbps CAN frames from the outdoor mast.',
        'Formats telemetry data into structured JSON strings.',
        'Publishes to topic: "solar/tracker/telemetry" on the local Mosquitto / cloud broker.',
        'Subscribes to "solar/tracker/command" to forward remote manual jog commands to the mast.'
      ]
    },
    {
      id: 'nodered-scada',
      name: '5. Node-RED Supervisory Automation (SCADA)',
      category: 'Cloud SCADA',
      role: 'Visual dataflow engine for automated rule evaluation, database persistence, and emergency alerts.',
      hardware: 'Raspberry Pi 4 / Cloud Virtual Machine running Node.js + Mosquitto + Node-RED',
      protocol: 'MQTT In ➔ JavaScript Function Node ➔ InfluxDB / PostgreSQL ➔ REST WebSocket',
      electricalSpec: 'Standard Linux Server Environment',
      keyResponsibilities: [
        'Monitors wind speed sensor; triggers automatic EMERGENCY_STOW when wind exceeds 45 km/h.',
        'Stores historical minute-by-minute energy generation in InfluxDB time-series database.',
        'Dispatches Telegram / Email alerts on motor stall or battery low-voltage warnings.'
      ]
    },
    {
      id: 'web-dashboard',
      name: '6. Web Application & Operations Center',
      category: 'User Interface',
      role: 'Student & operator dashboard displaying real-time tracking orientation dials, yield curves, and controls.',
      hardware: 'React + TypeScript + Tailwind CSS Web Application running on modern browser',
      protocol: 'WebSockets / REST API JSON Telemetry Streaming',
      payloadExample: 'WebSocket ws://gateway.local:1880/ws/solar_live',
      electricalSpec: 'Desktop & Mobile responsive interface',
      keyResponsibilities: [
        'Renders animated 3D/2D solar angle dials, current PV power, and daily cumulative kWh harvest.',
        'Provides technician buttons for manual Azimuth/Elevation calibration jogs.',
        'Displays historical harvest comparison graphs between the dual-axis tracker and a fixed panel.'
      ]
    }
  ];

  const activeNode = systemNodes.find(n => n.id === selectedNodeId) || systemNodes[1];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <Network className="w-4 h-4" />
            End-to-End System Topology
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
            FYP System Architecture & Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Complete data, power, and communications pipeline from the physical solar cells to the cloud web dashboard.
          </p>
        </div>

        <button
          onClick={() => setCurrentSection('fyp-mode')}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-mono text-xs font-semibold border border-amber-500/40 transition-all flex items-center gap-1.5"
        >
          Open Live Tracker Simulator →
        </button>
      </div>

      {/* Visual Pipeline Block Map */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400">
          Click Any Node Along the Data Pipeline to Inspect Specifications
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {systemNodes.map((node) => {
            const isSelected = node.id === activeNode.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all space-y-2 ${
                  isSelected
                    ? 'bg-slate-950 border-cyan-500 ring-1 ring-cyan-500/30 shadow-lg shadow-cyan-950/30'
                    : 'bg-slate-950/70 hover:bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-cyan-400 font-semibold px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800">
                    {node.category}
                  </span>
                </div>
                <h3 className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                  {node.name}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {node.role}
                </p>
                <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800/80">
                  Protocol: {node.protocol.split('|')[0]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Node Inspector Panel */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400">{activeNode.category.toUpperCase()}</span>
            <h3 className="text-xl font-bold text-white font-sans mt-0.5">
              {activeNode.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {activeNode.role}
            </p>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase">Hardware Realization</span>
            <div className="text-slate-200 font-sans font-medium">{activeNode.hardware}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase">Communications Protocol & Timing</span>
            <div className="text-cyan-300 font-sans font-medium">{activeNode.protocol}</div>
          </div>
        </div>

        {/* Payload Example */}
        {activeNode.payloadExample && (
          <div className="space-y-1.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Live Wire Packet Payload Format
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400">
              {activeNode.payloadExample}
            </div>
          </div>
        )}

        {/* Key Responsibilities */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Subsystem Operational Responsibilities
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
            {activeNode.keyResponsibilities.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                <span className="text-slate-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
};
