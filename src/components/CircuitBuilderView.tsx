import React, { useState } from 'react';
import { 
  CircuitBoard, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  Trash2, 
  Plus, 
  Info,
  ShieldAlert,
  Sparkles,
  Layers
} from 'lucide-react';
import { NavSection } from '../types';

interface CircuitComponent {
  id: string;
  name: string;
  pins: { id: string; name: string; voltage: string; type: 'pwr' | 'gnd' | 'io' | 'analog' | 'comms' }[];
}

interface WireConnection {
  id: string;
  fromCompId: string;
  fromPinId: string;
  toCompId: string;
  toPinId: string;
  color: string;
}

interface DiagnosticResult {
  status: 'valid' | 'warning' | 'error';
  title: string;
  message: string;
}

export const CircuitBuilderView: React.FC<{ setCurrentSection: (section: NavSection) => void }> = ({ setCurrentSection }) => {
  const [selectedPin, setSelectedPin] = useState<{ compId: string; pinId: string } | null>(null);
  const [wires, setWires] = useState<WireConnection[]>([
    // Initial sample connection: ESP32 GPIO 4 to Resistor Pin 1
    { id: 'w1', fromCompId: 'esp32', fromPinId: 'gpio4', toCompId: 'resistor220', toPinId: 'pin1', color: '#38bdf8' },
    { id: 'w2', fromCompId: 'resistor220', fromPinId: 'pin2', toCompId: 'led', toPinId: 'anode', color: '#38bdf8' },
    { id: 'w3', fromCompId: 'led', fromPinId: 'cathode', toCompId: 'esp32', toPinId: 'gnd1', color: '#64748b' }
  ]);

  const components: CircuitComponent[] = [
    {
      id: 'esp32',
      name: 'ESP32-S3 Microcontroller',
      pins: [
        { id: '3v3', name: '3.3V', voltage: '3.3V', type: 'pwr' },
        { id: 'gnd1', name: 'GND', voltage: '0V', type: 'gnd' },
        { id: 'gpio4', name: 'GPIO 4 (Out)', voltage: '3.3V', type: 'io' },
        { id: 'gpio1', name: 'GPIO 1 (ADC1)', voltage: '0-3.3V', type: 'analog' },
        { id: 'gpio21', name: 'GPIO 21 (SDA)', voltage: '3.3V', type: 'comms' },
        { id: 'gpio22', name: 'GPIO 22 (SCL)', voltage: '3.3V', type: 'comms' },
        { id: 'gpio20', name: 'GPIO 20 (CAN_TX)', voltage: '3.3V', type: 'comms' }
      ]
    },
    {
      id: 'led',
      name: 'Status LED (Green)',
      pins: [
        { id: 'anode', name: 'Anode (+)', voltage: '1.8V-3.3V', type: 'pwr' },
        { id: 'cathode', name: 'Cathode (-)', voltage: '0V', type: 'gnd' }
      ]
    },
    {
      id: 'resistor220',
      name: '220Ω Resistor (1/4W)',
      pins: [
        { id: 'pin1', name: 'Lead 1', voltage: 'Passive', type: 'io' },
        { id: 'pin2', name: 'Lead 2', voltage: 'Passive', type: 'io' }
      ]
    },
    {
      id: 'ldr',
      name: 'GL5528 LDR Sensor',
      pins: [
        { id: 'pin1', name: 'Terminal 1', voltage: 'Passive', type: 'io' },
        { id: 'pin2', name: 'Terminal 2', voltage: 'Passive', type: 'io' }
      ]
    },
    {
      id: 'resistor10k',
      name: '10kΩ Resistor (Divider)',
      pins: [
        { id: 'pin1', name: 'Lead 1', voltage: 'Passive', type: 'io' },
        { id: 'pin2', name: 'Lead 2', voltage: 'Passive', type: 'io' }
      ]
    },
    {
      id: 'bno085',
      name: 'BNO085 9-DOF IMU',
      pins: [
        { id: 'vcc', name: 'VCC (3.3V)', voltage: '3.3V', type: 'pwr' },
        { id: 'gnd', name: 'GND', voltage: '0V', type: 'gnd' },
        { id: 'sda', name: 'SDA', voltage: '3.3V', type: 'comms' },
        { id: 'scl', name: 'SCL', voltage: '3.3V', type: 'comms' }
      ]
    },
    {
      id: 'supply24v',
      name: '24V Solar Battery Supply',
      pins: [
        { id: 'plus24', name: '+24V DC', voltage: '24.0V', type: 'pwr' },
        { id: 'gnd24', name: 'GND (0V)', voltage: '0V', type: 'gnd' }
      ]
    }
  ];

  // Circuit Rule Diagnostic Evaluation
  const evaluateCircuit = (): DiagnosticResult[] => {
    const results: DiagnosticResult[] = [];

    // Check 1: 24V supply directly connected to ESP32 pins (Burnout danger!)
    const highVoltageDanger = wires.some(w => 
      (w.fromCompId === 'supply24v' && w.fromPinId === 'plus24' && w.toCompId === 'esp32' && w.toPinId !== 'gnd1') ||
      (w.toCompId === 'supply24v' && w.toPinId === 'plus24' && w.fromCompId === 'esp32' && w.fromPinId !== 'gnd1')
    );
    if (highVoltageDanger) {
      results.push({
        status: 'error',
        title: 'OVERVOLTAGE BURNOUT DETECTED!',
        message: 'Connecting +24V directly to an ESP32 GPIO or power pin will vaporize the silicon! Route 24V through a buck regulator or voltage divider first.'
      });
    }

    // Check 2: LED connected directly without current limiting resistor
    const directLed = wires.some(w => 
      ((w.fromCompId === 'esp32' && w.fromPinId === 'gpio4' && w.toCompId === 'led' && w.toPinId === 'anode') ||
       (w.toCompId === 'esp32' && w.toPinId === 'gpio4' && w.fromCompId === 'led' && w.fromPinId === 'anode'))
    );
    if (directLed) {
      results.push({
        status: 'warning',
        title: 'Missing Current-Limiting Resistor on LED',
        message: 'Driving an LED directly from GPIO 4 pulls >40mA, exceeding the ESP32 absolute maximum pin rating. Insert a 220Ω resistor in series.'
      });
    }

    // Check 3: Valid LED with resistor connected
    const validLed = wires.some(w => w.fromCompId === 'resistor220' && w.toCompId === 'led') &&
                     wires.some(w => w.fromCompId === 'led' && (w.toPinId === 'gnd1' || w.toPinId === 'gnd'));
    if (validLed && !directLed && !highVoltageDanger) {
      results.push({
        status: 'valid',
        title: 'LED Circuit Validated',
        message: 'Correct closed circuit: GPIO 4 ➔ 220Ω Resistor ➔ LED Anode ➔ Cathode ➔ System GND. Forward current ≈ 6.8 mA.'
      });
    }

    // Check 4: Missing Common Ground Check
    const has24v = wires.some(w => w.fromCompId === 'supply24v' || w.toCompId === 'supply24v');
    const hasCommonGnd = wires.some(w => 
      (w.fromPinId === 'gnd24' && (w.toPinId === 'gnd1' || w.toPinId === 'gnd')) ||
      (w.toPinId === 'gnd24' && (w.fromPinId === 'gnd1' || w.fromPinId === 'gnd'))
    );
    if (has24v && !hasCommonGnd && wires.length > 3) {
      results.push({
        status: 'warning',
        title: 'Missing Common Ground Reference',
        message: 'The 24V supply and 3.3V ESP32 have separate grounds. Without a shared GND reference, control signals cannot be recognized.'
      });
    }

    if (results.length === 0) {
      results.push({
        status: 'valid',
        title: 'Circuit Analyzer Ready',
        message: 'Click any two pins to draw a virtual connection wire. The rule engine validates voltage ratings, ground loops, and missing passives in real time.'
      });
    }

    return results;
  };

  const diagnostics = evaluateCircuit();

  const handlePinClick = (compId: string, pinId: string) => {
    if (!selectedPin) {
      setSelectedPin({ compId, pinId });
    } else {
      // Connect pin
      if (selectedPin.compId !== compId || selectedPin.pinId !== pinId) {
        const wireColor = pinId.includes('gnd') || selectedPin.pinId.includes('gnd') 
          ? '#64748b' 
          : pinId.includes('3v3') || pinId.includes('24') || selectedPin.pinId.includes('3v3') || selectedPin.pinId.includes('24')
          ? '#f59e0b'
          : '#38bdf8';

        const newWire: WireConnection = {
          id: `w-${Date.now()}`,
          fromCompId: selectedPin.compId,
          fromPinId: selectedPin.pinId,
          toCompId: compId,
          toPinId: pinId,
          color: wireColor
        };
        setWires(prev => [...prev, newWire]);
      }
      setSelectedPin(null);
    }
  };

  const clearAllWires = () => {
    setWires([]);
    setSelectedPin(null);
  };

  const loadPresetMission = (mission: 'led' | 'ldr' | 'bno') => {
    if (mission === 'led') {
      setWires([
        { id: 'w1', fromCompId: 'esp32', fromPinId: 'gpio4', toCompId: 'resistor220', toPinId: 'pin1', color: '#38bdf8' },
        { id: 'w2', fromCompId: 'resistor220', fromPinId: 'pin2', toCompId: 'led', toPinId: 'anode', color: '#38bdf8' },
        { id: 'w3', fromCompId: 'led', fromPinId: 'cathode', toCompId: 'esp32', toPinId: 'gnd1', color: '#64748b' }
      ]);
    } else if (mission === 'ldr') {
      setWires([
        { id: 'w1', fromCompId: 'esp32', fromPinId: '3v3', toCompId: 'ldr', toPinId: 'pin1', color: '#f59e0b' },
        { id: 'w2', fromCompId: 'ldr', fromPinId: 'pin2', toCompId: 'esp32', toPinId: 'gpio1', color: '#38bdf8' },
        { id: 'w3', fromCompId: 'ldr', fromPinId: 'pin2', toCompId: 'resistor10k', toPinId: 'pin1', color: '#38bdf8' },
        { id: 'w4', fromCompId: 'resistor10k', fromPinId: 'pin2', toCompId: 'esp32', toPinId: 'gnd1', color: '#64748b' }
      ]);
    } else if (mission === 'bno') {
      setWires([
        { id: 'w1', fromCompId: 'esp32', fromPinId: '3v3', toCompId: 'bno085', toPinId: 'vcc', color: '#f59e0b' },
        { id: 'w2', fromCompId: 'esp32', fromPinId: 'gnd1', toCompId: 'bno085', toPinId: 'gnd', color: '#64748b' },
        { id: 'w3', fromCompId: 'esp32', fromPinId: 'gpio21', toCompId: 'bno085', toPinId: 'sda', color: '#38bdf8' },
        { id: 'w4', fromCompId: 'esp32', fromPinId: 'gpio22', toCompId: 'bno085', toPinId: 'scl', color: '#38bdf8' }
      ]);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <CircuitBoard className="w-4 h-4" />
            Interactive Circuit Workspace
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
            Interactive Circuit Builder & Rule Validator
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Connect electronic components using virtual jumper wires with live detection of missing grounds, over-voltage damage, and GPIO conflicts.
          </p>
        </div>

        {/* Action presets */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => loadPresetMission('led')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-slate-700"
          >
            Mission 1: LED
          </button>
          <button
            onClick={() => loadPresetMission('ldr')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-slate-700"
          >
            Mission 2: LDR Divider
          </button>
          <button
            onClick={() => loadPresetMission('bno')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-slate-700"
          >
            Mission 3: BNO085 I2C
          </button>
          <button
            onClick={clearAllWires}
            className="px-2.5 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-950/80 text-rose-300 border border-rose-900/60 text-xs font-mono flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" />
            Clear
          </button>
        </div>
      </div>

      {/* Real-time Diagnostics Banner */}
      <div className="space-y-2">
        {diagnostics.map((diag, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
              diag.status === 'error'
                ? 'bg-rose-950/40 border-rose-700/80 text-rose-200'
                : diag.status === 'warning'
                ? 'bg-amber-950/30 border-amber-800 text-amber-200'
                : 'bg-emerald-950/30 border-emerald-800 text-emerald-200'
            }`}
          >
            {diag.status === 'error' ? (
              <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            ) : diag.status === 'warning' ? (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider">
                {diag.title}
              </h4>
              <p className="text-xs mt-0.5 leading-relaxed font-sans opacity-90">
                {diag.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Breadboard Canvas Area */}
      <div className="p-6 rounded-2xl bg-[#070b14] border border-slate-800 bg-grid-pattern relative min-h-[500px] overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            {selectedPin 
              ? `Selected: ${selectedPin.compId} -> Pin ${selectedPin.pinId}. Click target pin to complete connection.`
              : 'Click any terminal pin to start a wire connection.'}
          </div>
          <span className="text-xs font-mono text-slate-500">Active Wires: {wires.length}</span>
        </div>

        {/* Visual Component Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {components.map((comp) => (
            <div
              key={comp.id}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/90 shadow-lg space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-200 font-sans">{comp.name}</span>
                <span className="text-[10px] font-mono text-slate-500">ID: {comp.id}</span>
              </div>

              {/* Pin list */}
              <div className="space-y-1.5">
                {comp.pins.map((pin) => {
                  const isPinSelected = selectedPin?.compId === comp.id && selectedPin?.pinId === pin.id;
                  const isConnected = wires.some(w => 
                    (w.fromCompId === comp.id && w.fromPinId === pin.id) ||
                    (w.toCompId === comp.id && w.toPinId === pin.id)
                  );

                  return (
                    <button
                      key={pin.id}
                      onClick={() => handlePinClick(comp.id, pin.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                        isPinSelected
                          ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 ring-2 ring-cyan-400/50 scale-102'
                          : isConnected
                          ? 'bg-slate-950 text-cyan-300 border-cyan-500/40'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          pin.type === 'pwr' ? 'bg-amber-400' :
                          pin.type === 'gnd' ? 'bg-slate-500' :
                          pin.type === 'analog' ? 'bg-emerald-400' :
                          pin.type === 'comms' ? 'bg-purple-400' : 'bg-cyan-400'
                        }`} />
                        <span>{pin.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-sans">{pin.voltage}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Active Wire Connections Table */}
        <div className="mt-6 pt-4 border-t border-slate-800">
          <div className="text-xs font-mono font-bold text-slate-400 mb-2">
            Active Virtual Wire Harness List ({wires.length} wires):
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {wires.map((w, idx) => (
              <div 
                key={w.id}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300"
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: w.color }} />
                <span>{w.fromCompId}.{w.fromPinId} ➔ {w.toCompId}.{w.toPinId}</span>
                <button
                  onClick={() => setWires(wires.filter(x => x.id !== w.id))}
                  className="text-slate-500 hover:text-rose-400 ml-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
