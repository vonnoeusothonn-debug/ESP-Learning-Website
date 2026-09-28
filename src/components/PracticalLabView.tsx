import React, { useState } from 'react';
import { 
  FlaskConical, 
  Terminal, 
  Code2, 
  Copy, 
  Check, 
  Compass, 
  RotateCw, 
  Play, 
  Square, 
  Sliders, 
  Send, 
  Radio, 
  Sun, 
  Gauge, 
  Activity,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Power
} from 'lucide-react';
import { Lab, NavSection } from '../types';
import { PRACTICAL_LABS } from '../data/practicalLabs';

interface PracticalLabViewProps {
  setCurrentSection: (section: NavSection) => void;
  setSelectedCodeSnippet?: (code: string) => void;
}

export const PracticalLabView: React.FC<PracticalLabViewProps> = ({
  setCurrentSection,
  setSelectedCodeSnippet
}) => {
  const [selectedLabId, setSelectedLabId] = useState<number>(1);
  const [copiedCode, setCopiedCode] = useState(false);
  
  // Interactive Simulation States
  const [ledState, setLedState] = useState(false);
  const [buttonCount, setButtonCount] = useState(0);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [potValue, setPotValue] = useState(2048);
  const [sunLux, setSunLux] = useState(850);
  const [imuPitch, setImuPitch] = useState(42.5);
  const [imuYaw, setImuYaw] = useState(148.2);
  const [motorPwm, setMotorPwm] = useState(180);
  const [motorDir, setMotorDir] = useState<'CW' | 'CCW' | 'STOP'>('CW');
  const [stepperSteps, setStepperSteps] = useState(800);
  const [actuatorStroke, setActuatorStroke] = useState(150);
  const [canPacketsCount, setCanPacketsCount] = useState(12);
  const [mqttStatus, setMqttStatus] = useState('Connected to broker.hivemq.com:1883');
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    '[INIT] System started.',
    '[READY] Lab hardware connected.'
  ]);

  const activeLab = PRACTICAL_LABS.find(l => l.id === selectedLabId) || PRACTICAL_LABS[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeLab.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const addSerialLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setTelemetryLogs(prev => [...prev.slice(-15), `[${timestamp}] ${msg}`]);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <FlaskConical className="w-4 h-4" />
            មន្ទីរពិសោធន៍អនុវត្តជាក់ស្តែង (Hands-On Lab)
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
            ESP32 Practical Labs & Hardware Simulator (Khmer First)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
            រាល់មន្ទីរពិសោធន៍នីមួយៗរួមបញ្ចូល៖ ESP32 → ម៉ូឌុល/សេនស័រ → ការតខ្សែ → កូដ Firmware → Serial Monitor → ការធ្វើតេស្តក្លែងធ្វើ និងការភ្ជាប់ទៅកាន់ Solar Tracker FYP។
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">មន្ទីរពិសោធន៍សរុប:</span>
          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono font-bold text-xs border border-cyan-800">
            14 Complete Labs
          </span>
        </div>
      </div>

      {/* Lab Selector Horizontal Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {PRACTICAL_LABS.map((lab) => {
          const isSelected = lab.id === activeLab.id;
          return (
            <button
              key={lab.id}
              onClick={() => {
                setSelectedLabId(lab.id);
                setTelemetryLogs([`[LAB ${lab.id.toString().padStart(2, '0')}] ${lab.moduleName} initialized.`]);
              }}
              className={`px-3.5 py-2.5 rounded-xl border text-left shrink-0 transition-all font-mono text-xs flex flex-col gap-0.5 ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-3 text-[10px]">
                <span className="font-bold text-cyan-400">LAB {lab.id.toString().padStart(2, '0')}</span>
                <span className={`text-[9px] px-1 py-0.2 rounded ${
                  lab.difficulty === 'Beginner' ? 'text-emerald-400 bg-emerald-950/60' :
                  lab.difficulty === 'Intermediate' ? 'text-amber-400 bg-amber-950/60' :
                  'text-purple-400 bg-purple-950/60'
                }`}>
                  {lab.difficulty}
                </span>
              </div>
              <span className="font-medium text-slate-200 truncate max-w-[150px]">
                {lab.moduleName}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Lab Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Lab Overview, Wiring, and Interactive Simulator (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Lab Title Card */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400">
                ការពិសោធន៍ជាក់ស្តែងលើតុ LAB (BENCH EXPERIMENT)
              </span>
              <span className="text-xs font-mono text-slate-500">រយៈពេលប៉ាន់ស្មាន: {activeLab.estimatedTime}</span>
            </div>

            <h2 className="text-xl font-bold text-white font-sans">
              {activeLab.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {activeLab.description}
            </p>

            {/* Bill of materials */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="text-[11px] font-mono text-slate-400 mb-1.5 font-medium">គ្រឿងបន្លាស់ចាំបាច់ (Required Hardware):</div>
              <div className="flex flex-wrap gap-1.5">
                {activeLab.hardware.map((item, i) => (
                  <span key={i} className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Hardware Simulator Bench */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-lg shadow-cyan-950/20 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                តុពិសោធន៍ក្លែងធ្វើអន្តរកម្ម (Virtual Test Bench)
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                LIVE SIMULATION
              </span>
            </div>

            <p className="text-xs text-slate-400">
              {activeLab.interactiveSim.prompt}
            </p>

            {/* Dynamic Controls based on lab type */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              
              {/* Lab 01: LED */}
              {activeLab.id === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-300">ESP32 GPIO 4 Output:</span>
                    <button
                      onClick={() => {
                        const next = !ledState;
                        setLedState(next);
                        addSerialLog(`LED State toggled: ${next ? 'HIGH (3.3V)' : 'LOW (0.0V)'}`);
                      }}
                      className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-2 ${
                        ledState
                          ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      <Power className="w-4 h-4" />
                      {ledState ? 'LED POWER: ON' : 'LED POWER: OFF'}
                    </button>
                  </div>

                  <div className="flex items-center justify-center p-6 bg-slate-900/80 rounded-xl border border-slate-800/80">
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-16 h-16 rounded-full border-2 transition-all flex items-center justify-center ${
                        ledState
                          ? 'bg-emerald-400 border-emerald-300 shadow-[0_0_35px_rgba(52,211,153,0.8)] scale-105'
                          : 'bg-emerald-950/20 border-emerald-900/40 opacity-40'
                      }`}>
                        <Lightbulb className={`w-8 h-8 ${ledState ? 'text-slate-950' : 'text-emerald-900'}`} />
                      </div>
                      <div className="font-mono text-xs text-slate-400">
                        {ledState ? 'Forward Current: 6.8 mA | V_f = 1.8V' : 'Current: 0.0 mA | Open State'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Lab 02: Button */}
              {activeLab.id === 2 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-300">Tactile Switch on GPIO 5:</span>
                    <span className="text-xs font-mono text-cyan-400 font-bold">Total Presses: {buttonCount}</span>
                  </div>
                  <div className="flex justify-center p-4">
                    <button
                      onMouseDown={() => {
                        setButtonPressed(true);
                        setButtonCount(c => c + 1);
                        addSerialLog(`[BUTTON PRESS] GPIO 5 pulled LOW to GND. Trigger count: ${buttonCount + 1}`);
                      }}
                      onMouseUp={() => setButtonPressed(false)}
                      className={`px-8 py-5 rounded-2xl font-mono text-sm font-bold border-2 transition-all active:scale-95 shadow-lg ${
                        buttonPressed
                          ? 'bg-cyan-500 border-cyan-300 text-slate-950 scale-95 shadow-cyan-500/40'
                          : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-cyan-500/50'
                      }`}
                    >
                      {buttonPressed ? 'BUTTON PRESSED (0V)' : 'CLICK & HOLD BUTTON (3.3V)'}
                    </button>
                  </div>
                </div>
              )}

              {/* Lab 03: Potentiometer */}
              {activeLab.id === 3 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Wiper Position:</span>
                    <span className="text-cyan-400 font-bold">
                      {potValue} / 4095 ({((potValue / 4095) * 3.3).toFixed(2)} V) → {((potValue / 4095) * 270).toFixed(1)}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="4095"
                    value={potValue}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setPotValue(v);
                      addSerialLog(`ADC Raw: ${v} | Volts: ${((v/4095)*3.3).toFixed(2)}V | Angle: ${((v/4095)*270).toFixed(1)}°`);
                    }}
                    className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>0° (0V / Raw 0)</span>
                    <span>135° (1.65V / Raw 2048)</span>
                    <span>270° (3.3V / Raw 4095)</span>
                  </div>
                </div>
              )}

              {/* Lab 04: LDR */}
              {activeLab.id === 4 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Sun className="w-4 h-4 text-amber-400" />
                      Ambient Solar Irradiance:
                    </span>
                    <span className="text-amber-400 font-bold">{sunLux} Lux ({sunLux > 500 ? 'BRIGHT SUN' : 'SHADOW'})</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="2000"
                    value={sunLux}
                    onChange={(e) => {
                      const lux = Number(e.target.value);
                      setSunLux(lux);
                      const rLdr = Math.round(500000 / (lux + 10));
                      const vOut = (3.3 * 10000) / (rLdr + 10000);
                      addSerialLog(`Sun Lux: ${lux} | R_LDR: ${rLdr}Ω | ADC Vout: ${vOut.toFixed(2)}V`);
                    }}
                    className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono flex items-center justify-between">
                    <span className="text-slate-400">LDR Resistance:</span>
                    <span className="text-emerald-400 font-bold">{Math.round(500000 / (sunLux + 10))} Ω</span>
                    <span className="text-slate-400">Divider Vout:</span>
                    <span className="text-cyan-400 font-bold">{((3.3 * 10000) / (Math.round(500000 / (sunLux + 10)) + 10000)).toFixed(2)} V</span>
                  </div>
                </div>
              )}

              {/* Lab 05: OLED */}
              {activeLab.id === 5 && (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-64 h-32 bg-black border-4 border-slate-700 rounded-lg p-3 font-mono text-[11px] text-cyan-300 shadow-inner space-y-1">
                    <div className="border-b border-cyan-800 pb-0.5 text-center font-bold tracking-wider">
                      SOLAR TRACKER EE
                    </div>
                    <div className="flex justify-between">
                      <span>Azimuth  :</span> <span className="text-white font-bold">145.2°</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Elevation:</span> <span className="text-white font-bold">42.8°</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PV Power :</span> <span className="text-emerald-400 font-bold">218.4 W</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Battery  :</span> <span className="text-amber-400 font-bold">26.4 V</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">SSD1306 128x64 Monochrome Pixel Buffer</span>
                </div>
              )}

              {/* Lab 07: BNO085 IMU */}
              {activeLab.id === 7 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span>Pitch (Elevation):</span>
                        <span className="text-cyan-400 font-bold">{imuPitch}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="90"
                        value={imuPitch}
                        onChange={(e) => {
                          const p = Number(e.target.value);
                          setImuPitch(p);
                          addSerialLog(`BNO085 Pitch (Elevation): ${p}° | Accuracy: 3 (High)`);
                        }}
                        className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span>Yaw (Azimuth):</span>
                        <span className="text-amber-400 font-bold">{imuYaw}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={imuYaw}
                        onChange={(e) => {
                          const y = Number(e.target.value);
                          setImuYaw(y);
                          addSerialLog(`BNO085 Yaw (Azimuth): ${y}° | Accuracy: 3 (High)`);
                        }}
                        className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Lab 08: Motor Driver */}
              {activeLab.id === 8 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Motor PWM Speed (0-255):</span>
                    <span className="text-cyan-400 font-bold">{motorPwm} ({(motorPwm / 2.55).toFixed(0)}%)</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={motorPwm}
                    onChange={(e) => {
                      setMotorPwm(Number(e.target.value));
                      addSerialLog(`PWM duty set to ${e.target.value} on TB6612 PWMA.`);
                    }}
                    className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setMotorDir('CW');
                        addSerialLog(`Motor rotating CW (Tracking West) at PWM ${motorPwm}`);
                      }}
                      className={`flex-1 py-1.5 rounded-lg font-mono text-xs font-bold border ${
                        motorDir === 'CW' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      CW (West)
                    </button>
                    <button
                      onClick={() => {
                        setMotorDir('STOP');
                        addSerialLog('Motor Brake Applied (IN1=HIGH, IN2=HIGH)');
                      }}
                      className={`flex-1 py-1.5 rounded-lg font-mono text-xs font-bold border ${
                        motorDir === 'STOP' ? 'bg-rose-500/20 text-rose-300 border-rose-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      BRAKE
                    </button>
                    <button
                      onClick={() => {
                        setMotorDir('CCW');
                        addSerialLog(`Motor rotating CCW (Resetting East) at PWM ${motorPwm}`);
                      }}
                      className={`flex-1 py-1.5 rounded-lg font-mono text-xs font-bold border ${
                        motorDir === 'CCW' ? 'bg-amber-500/20 text-amber-300 border-amber-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      CCW (East)
                    </button>
                  </div>
                </div>
              )}

              {/* Lab 10: Linear Actuator */}
              {activeLab.id === 10 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Actuator Stroke Extension:</span>
                    <span className="text-emerald-400 font-bold">{actuatorStroke} mm / 300 mm</span>
                  </div>
                  <div className="w-full bg-slate-900 h-4 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-300"
                      style={{ width: `${(actuatorStroke / 300) * 100}%` }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (actuatorStroke < 300) {
                          const next = Math.min(300, actuatorStroke + 25);
                          setActuatorStroke(next);
                          addSerialLog(`Actuator Extended +25mm. Current: ${next}mm. Elevation increasing.`);
                        } else {
                          addSerialLog('[INTERLOCK] Upper limit switch triggered! Actuator halted.');
                        }
                      }}
                      className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-mono text-xs font-bold transition-all"
                    >
                      Extend (Tilt Up)
                    </button>
                    <button
                      onClick={() => {
                        if (actuatorStroke > 0) {
                          const next = Math.max(0, actuatorStroke - 25);
                          setActuatorStroke(next);
                          addSerialLog(`Actuator Retracted -25mm. Current: ${next}mm. Elevation decreasing.`);
                        } else {
                          addSerialLog('[INTERLOCK] Lower limit switch triggered! Actuator halted.');
                        }
                      }}
                      className="flex-1 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-mono text-xs font-bold transition-all"
                    >
                      Retract (Tilt Down)
                    </button>
                  </div>
                </div>
              )}

              {/* Lab 11: CAN Bus */}
              {activeLab.id === 11 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">TWAI 250kbps Status:</span>
                    <span className="text-emerald-400 font-bold">120Ω Terminated | Bus Active</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
                    <div className="text-cyan-400">Frame ID: 0x101 (SOLAR_TELEMETRY)</div>
                    <div className="text-slate-400">Payload: [ 0x05, 0xAC, 0x01, 0xAC, 0xAA, 0x00, 0x00, 0x0C ]</div>
                    <div className="text-slate-500 text-[10px]">Differential: Vdiff = 2.15V Dominant | 0.02V Recessive</div>
                  </div>
                  <button
                    onClick={() => {
                      setCanPacketsCount(c => c + 1);
                      addSerialLog(`[CAN TX] Frame ID 0x101 Transmitted. DLC=8. ACK received from Base Station.`);
                    }}
                    className="w-full py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono text-xs font-bold transition-all"
                  >
                    Transmit CAN Frame (Packet #{canPacketsCount + 1})
                  </button>
                </div>
              )}

              {/* General default for other labs */}
              {![1, 2, 3, 4, 5, 7, 8, 10, 11].includes(activeLab.id) && (
                <div className="space-y-3 text-center py-4">
                  <p className="text-xs text-slate-300 font-mono">
                    Module ready for real-time telemetry testing.
                  </p>
                  <button
                    onClick={() => addSerialLog(`[TEST EVENT] Executed ${activeLab.moduleName} routine.`)}
                    className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono text-xs font-bold transition-all"
                  >
                    Trigger Diagnostic Test Pulse
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* Wiring Pinout Table */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              តារាងតភ្ជាប់ខ្សែសៀគ្វី (Hardware Wiring Table)
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="px-3 py-2">ជើង ESP32</th>
                    <th className="px-3 py-2">ជើងឧបករណ៍ (Module Pin)</th>
                    <th className="px-3 py-2">មុខងារសញ្ញា និងកំណត់ចំណាំ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-900/60 text-slate-300">
                  {activeLab.wiringTable.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-900">
                      <td className="px-3 py-2 text-cyan-400 font-semibold">{row.esp32Pin}</td>
                      <td className="px-3 py-2 text-slate-200">{row.modulePin}</td>
                      <td className="px-3 py-2 text-slate-400 font-sans text-[11px]">{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FYP Application Spotlight */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-orange-950/30 to-slate-900 border border-amber-800/60 space-y-1">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wide">
                ការតភ្ជាប់ផ្ទាល់ក្នុង Solar Tracker FYP
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {activeLab.fypApplication}
            </p>
          </div>

        </div>

        {/* Right Column: Code & Interactive Serial Monitor (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Arduino Code Card */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                កូដ Firmware (Arduino C++ / ESP-IDF)
              </h3>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-300 border border-slate-700 transition-all"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedCode ? 'បានចម្លង!' : 'ចម្លងកូដ'}
                </button>
                <button
                  onClick={() => {
                    if (setSelectedCodeSnippet) {
                      setSelectedCodeSnippet(activeLab.code);
                    }
                    setCurrentSection('code-playground');
                  }}
                  className="px-2.5 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-[11px] font-mono text-cyan-300 border border-cyan-500/40 transition-all"
                >
                  តេស្តក្នុង Code Lab
                </button>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#090d16]">
              <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto max-h-[340px] leading-relaxed">
                {activeLab.code}
              </pre>
            </div>
          </div>

          {/* Interactive Serial Monitor */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                Serial Monitor អន្តរកម្ម (115200 Baud)
              </h3>
              <button
                onClick={() => setTelemetryLogs([`[CLEAR] កំណត់ឡើងវិញនៅម៉ោង ${new Date().toLocaleTimeString()}`])}
                className="text-[10px] font-mono text-slate-500 hover:text-slate-300"
              >
                លុប Log ចោល
              </button>
            </div>

            <div className="rounded-xl bg-black border border-slate-800 p-3.5 font-mono text-xs text-emerald-400 space-y-1 h-[280px] overflow-y-auto shadow-inner flex flex-col justify-end">
              {telemetryLogs.map((log, idx) => (
                <div key={idx} className="leading-snug break-all">
                  {log}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="វាយពាក្យបញ្ជា Serial ទៅ ESP32 (ឧ. PING, STATUS)..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value) {
                    addSerialLog(`[SERIAL IN] >> ${e.currentTarget.value}`);
                    e.currentTarget.value = '';
                  }
                }}
                className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => addSerialLog('[SERIAL IN] >> PING')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-slate-700"
              >
                ផ្ញើ
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
