import React, { useState } from 'react';
import { 
  Calculator, 
  Zap, 
  Layers, 
  Battery, 
  RotateCw, 
  ShieldCheck, 
  Sun, 
  Info,
  ChevronRight
} from 'lucide-react';
import { NavSection } from '../types';

export const CalculatorsView: React.FC<{ setCurrentSection: (section: NavSection) => void }> = ({ setCurrentSection }) => {
  const [activeCalc, setActiveCalc] = useState<'ohms' | 'divider' | 'led' | 'trace' | 'fuse' | 'wire' | 'battery' | 'motor'>('trace');

  // Calculator 1: Ohm's Law & Power
  const [ohmsV, setOhmsV] = useState(24);
  const [ohmsI, setOhmsI] = useState(3.5);
  const ohmsR = ohmsI > 0 ? (ohmsV / ohmsI) : 0;
  const ohmsP = ohmsV * ohmsI;

  // Calculator 2: Voltage Divider
  const [divVin, setDivVin] = useState(29.2); // 24V nominal bulk charge
  const [divR1, setDivR1] = useState(100); // 100k
  const [divR2, setDivR2] = useState(10);  // 10k
  const divVout = (divVin * divR2) / (divR1 + divR2);
  const divCurrentMa = (divVin / ((divR1 + divR2) * 1000)) * 1000;

  // Calculator 3: LED Resistor
  const [ledVsupply, setLedVsupply] = useState(3.3);
  const [ledVf, setLedVf] = useState(1.8); // Red/Green LED
  const [ledCurrentMa, setLedCurrentMa] = useState(10);
  const ledRes = ledCurrentMa > 0 ? ((ledVsupply - ledVf) / (ledCurrentMa / 1000)) : 0;
  const ledWattage = ((ledVsupply - ledVf) * (ledCurrentMa / 1000));

  // Calculator 4: IPC-2221 PCB Trace Width
  const [traceCurrent, setTraceCurrent] = useState(4.2); // Motor stall
  const [traceTempRise, setTraceTempRise] = useState(10); // 10 deg C rise
  const [copperOz, setCopperOz] = useState<1 | 2>(1); // 1 oz = 35um
  // IPC-2221 External trace formula: Area [sq mils] = (I / (0.048 * dT^0.44))^(1 / 0.725)
  const traceAreaSqMils = Math.pow(traceCurrent / (0.048 * Math.pow(traceTempRise, 0.44)), 1 / 0.725);
  const copperThicknessMils = copperOz === 1 ? 1.378 : 2.756;
  const traceWidthMils = traceAreaSqMils / copperThicknessMils;
  const traceWidthMm = traceWidthMils * 0.0254;

  // Calculator 5: Fuse Sizing
  const [fuseContinuousAmps, setFuseContinuousAmps] = useState(2.5);
  const [fuseAmbientTemp, setFuseAmbientTemp] = useState(40); // 40 C outdoor
  const recommendedFuse = +(fuseContinuousAmps * 1.5 * (fuseAmbientTemp > 25 ? 1.15 : 1.0)).toFixed(1);

  // Calculator 6: Wire Gauge & Voltage Drop
  const [wireLengthMeters, setWireLengthMeters] = useState(20); // 20m mast
  const [wireCurrentAmps, setWireCurrentAmps] = useState(3.0);
  const [wireAwg, setWireAwg] = useState(18); // 18 AWG
  // 18 AWG is ~21 mΩ/m; 16 AWG is ~13.2 mΩ/m; 14 AWG is ~8.3 mΩ/m; 12 AWG is ~5.2 mΩ/m
  const awgResistanceMap: Record<number, number> = { 12: 0.0052, 14: 0.0083, 16: 0.0132, 18: 0.0210, 20: 0.0333 };
  const wireResistanceOneWay = wireLengthMeters * (awgResistanceMap[wireAwg] || 0.021);
  const wireRoundTripDrop = wireCurrentAmps * (wireResistanceOneWay * 2);
  const wireDropPercent = (wireRoundTripDrop / 24) * 100;

  // Calculator 7: Battery Sizing
  const [batAh, setBatAh] = useState(50);
  const [batVolts, setBatVolts] = useState(25.6); // 8S LiFePO4
  const [batDod, setBatDod] = useState(80); // 80% DoD
  const batWhNominal = batAh * batVolts;
  const batWhUsable = batWhNominal * (batDod / 100);

  // Calculator 8: Motor Power & Torque
  const [motorTorqueNm, setMotorTorqueNm] = useState(1.8);
  const [motorRpm, setMotorRpm] = useState(60);
  const [gearboxRatio, setGearboxRatio] = useState(30); // 30:1 reduction
  const motorMechanicalWatts = +(motorTorqueNm * ((motorRpm * 2 * Math.PI) / 60)).toFixed(1);
  const outputTurntableTorque = +(motorTorqueNm * gearboxRatio * 0.85).toFixed(1); // 85% worm efficiency
  const outputTurntableRpm = +(motorRpm / gearboxRatio).toFixed(1);

  const calcTabs = [
    { id: 'trace', label: '១. ទំហំគន្លង PCB (IPC-2221 Trace)' },
    { id: 'divider', label: '២. សៀគ្វីចែកវ៉ុល (Voltage Divider & ADC)' },
    { id: 'fuse', label: '៣. គណនាទំហំហ្វុយស៊ីប (Fuse Sizing)' },
    { id: 'wire', label: '៤. ទំហំខ្សែ & ធ្លាក់វ៉ុល (Wire Drop & AWG)' },
    { id: 'ohms', label: "៥. ច្បាប់អូម & កម្តៅ (Ohm's Law & Heat)" },
    { id: 'led', label: '៦. រេស៊ីស្តង់ទប់ LED (Series Resistor)' },
    { id: 'battery', label: '៧. ចំណុះអាគុយ (Battery Wh & DoD)' },
    { id: 'motor', label: '៨. កម្លាំងម៉ូទ័រ (Motor Torque & Power)' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <Calculator className="w-4 h-4" />
            ម៉ាស៊ីនគណនាវិស្វកម្ម (Engineering Calculators)
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
            ម៉ាស៊ីនគិតលេខវិស្វកម្មសម្រាប់ ESP32, PCB & ប្រព័ន្ធសូឡា
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
            រូបមន្តគណនាជាក់ស្តែង កម្រិតសុវត្ថិភាព និងការកាត់បន្ថយតាមលក្ខខណ្ឌបរិស្ថានសម្រាប់ការគូសប្លង់ PCB និងគ្រឿងបង្គុំ Dual-Axis Solar Tracker។
          </p>
        </div>

        <button
          onClick={() => setCurrentSection('solar-calculator')}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-sans text-xs font-semibold border border-amber-500/40 transition-all flex items-center gap-2"
        >
          <span>ម៉ាស៊ីនគិតលេខថាមពលសូឡា</span>
          <span>→</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {calcTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCalc(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all border ${
              activeCalc === tab.id
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-950/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Calculator Body */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
        
        {/* Trace Width IPC-2221 */}
        {activeCalc === 'trace' && (
          <div className="space-y-6">
            <div className="pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-cyan-400">IPC-2221 STANDARD</span>
              <h2 className="text-xl font-bold text-white font-sans mt-0.5">
                PCB Copper Trace Width & Thermal Capacity Calculator
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Calculates minimum external copper width to keep motor driver traces within thermal limits.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
              Formula: Area [mils²] = (I / [0.048 · ΔT^0.44])^(1 / 0.725) | Width = Area / Copper Thickness
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Continuous Current (Amps):</label>
                <input
                  type="number"
                  step="0.5"
                  value={traceCurrent}
                  onChange={(e) => setTraceCurrent(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm"
                />
                <span className="text-[10px] text-slate-500 block">Linear actuator stall: ~4.2A</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Allowed Temp Rise (ΔT °C):</label>
                <input
                  type="number"
                  value={traceTempRise}
                  onChange={(e) => setTraceTempRise(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm"
                />
                <span className="text-[10px] text-slate-500 block">Standard rule: 10°C rise</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Copper Foil Weight:</label>
                <select
                  value={copperOz}
                  onChange={(e) => setCopperOz(Number(e.target.value) as 1 | 2)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm"
                >
                  <option value={1}>1 oz/ft² (35 µm thickness)</option>
                  <option value={2}>2 oz/ft² (70 µm heavy copper)</option>
                </select>
                <span className="text-[10px] text-slate-500 block">1 oz is standard fab pricing</span>
              </div>
            </div>

            {/* Result Box */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/30 to-slate-950 border border-emerald-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Recommended Trace Width</span>
                <div className="text-2xl font-bold font-mono text-emerald-400">
                  {traceWidthMm.toFixed(2)} mm <span className="text-sm text-slate-400 font-normal">({traceWidthMils.toFixed(0)} mils)</span>
                </div>
              </div>
              <div className="text-xs font-sans text-slate-300 max-w-md">
                <strong>Engineering Recommendation:</strong> In KiCad, round up to <strong>{Math.ceil(traceWidthMm * 2) / 2} mm</strong> or use a solid copper polygon fill for the 24V motor H-bridge tracks.
              </div>
            </div>
          </div>
        )}

        {/* Voltage Divider */}
        {activeCalc === 'divider' && (
          <div className="space-y-6">
            <div className="pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-cyan-400">VOLTAGE SCALING</span>
              <h2 className="text-xl font-bold text-white font-sans mt-0.5">
                Resistive Voltage Divider & ESP32 ADC Sizing
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Scale high battery and solar voltages down to the safe 0V - 3.3V range for the ESP32 ADC.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Input Voltage (Vin Max):</label>
                <input
                  type="number"
                  step="0.5"
                  value={divVin}
                  onChange={(e) => setDivVin(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm"
                />
                <span className="text-[10px] text-slate-500 block">Peak 24V battery charge: 29.2V</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Top Resistor R1 (kΩ):</label>
                <input
                  type="number"
                  value={divR1}
                  onChange={(e) => setDivR1(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Bottom Resistor R2 (kΩ):</label>
                <input
                  type="number"
                  value={divR2}
                  onChange={(e) => setDivR2(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm"
                />
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-r from-cyan-950/30 to-slate-950 border border-cyan-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">ADC Pin Voltage (Vout)</span>
                <div className={`text-2xl font-bold font-mono ${divVout > 3.3 ? 'text-rose-400' : 'text-cyan-400'}`}>
                  {divVout.toFixed(2)} Volts
                </div>
                <span className="text-[11px] font-mono text-slate-400">Divider Current: {divCurrentMa.toFixed(3)} mA</span>
              </div>
              <div className="text-xs font-sans text-slate-300 max-w-md">
                {divVout > 3.3 ? (
                  <strong className="text-rose-400">DANGER: Exceeds ESP32 3.3V maximum! Increase R1 or reduce R2.</strong>
                ) : (
                  <span className="text-emerald-400 font-semibold">SAFE: Well within 3.3V ADC full-scale. Add a 100nF capacitor across R2 to ground for sampling stability.</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Fuse Sizing */}
        {activeCalc === 'fuse' && (
          <div className="space-y-6">
            <div className="pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-amber-400">CIRCUIT PROTECTION</span>
              <h2 className="text-xl font-bold text-white font-sans mt-0.5">
                Resettable PTC & Blade Fuse Sizing
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Sizes the primary overcurrent protection fuse accounting for outdoor high-temperature derating.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Normal Continuous Current (Amps):</label>
                <input
                  type="number"
                  step="0.2"
                  value={fuseContinuousAmps}
                  onChange={(e) => setFuseContinuousAmps(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Outdoor Enclosure Temp (°C):</label>
                <input
                  type="number"
                  value={fuseAmbientTemp}
                  onChange={(e) => setFuseAmbientTemp(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm"
                />
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-r from-amber-950/30 to-slate-950 border border-amber-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Recommended Fuse Rating</span>
                <div className="text-2xl font-bold font-mono text-amber-400">
                  {recommendedFuse} Amps (Standard: 5.0A)
                </div>
              </div>
              <div className="text-xs font-sans text-slate-300 max-w-md">
                <strong>Engineering Note:</strong> PTC fuses derate significantly above 25°C. In an outdoor solar enclosure reaching 45°C, a 5A fuse has an effective hold current of ~3.8A.
              </div>
            </div>
          </div>
        )}

        {/* Wire Gauge */}
        {activeCalc === 'wire' && (
          <div className="space-y-6">
            <div className="pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-cyan-400">CABLE LOSSES</span>
              <h2 className="text-xl font-bold text-white font-sans mt-0.5">
                Wire Gauge (AWG) & Voltage Drop Calculator
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Computes I·R voltage drops across the long mast cable between battery and actuator.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <label className="text-xs font-mono text-slate-400">One-Way Cable Length (Meters):</label>
                <input
                  type="number"
                  value={wireLengthMeters}
                  onChange={(e) => setWireLengthMeters(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Motor Current (Amps):</label>
                <input
                  type="number"
                  step="0.5"
                  value={wireCurrentAmps}
                  onChange={(e) => setWireCurrentAmps(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Conductor Size (AWG):</label>
                <select
                  value={wireAwg}
                  onChange={(e) => setWireAwg(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm"
                >
                  <option value={12}>12 AWG (3.31 mm² - Heavy power)</option>
                  <option value={14}>14 AWG (2.08 mm²)</option>
                  <option value={16}>16 AWG (1.31 mm²)</option>
                  <option value={18}>18 AWG (0.82 mm² - Standard)</option>
                  <option value={20}>20 AWG (0.52 mm² - Light duty)</option>
                </select>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Round-Trip Voltage Drop (24V Bus)</span>
                <div className={`text-2xl font-bold font-mono ${wireDropPercent > 5 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {wireRoundTripDrop.toFixed(2)} V ({wireDropPercent.toFixed(1)}%)
                </div>
              </div>
              <div className="text-xs font-sans text-slate-300 max-w-md">
                {wireDropPercent > 5 ? (
                  <span className="text-rose-400 font-semibold">Drop exceeds 5%! Switch to heavier 14 AWG or 12 AWG wire to avoid actuator stalling under load.</span>
                ) : (
                  <span className="text-emerald-400 font-semibold">Acceptable drop (&lt;5%). The linear actuator will receive { (24 - wireRoundTripDrop).toFixed(1) }V at full load.</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Other Calculators */}
        {['ohms', 'led', 'battery', 'motor'].includes(activeCalc) && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-mono font-bold text-cyan-400">CALCULATOR ENGINE</span>
              <h3 className="text-lg font-bold text-white font-sans mt-0.5">
                {calcTabs.find(t => t.id === activeCalc)?.label}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Interactive real-time parameter tuning for solar tracker electrical components.
              </p>
            </div>

            {activeCalc === 'ohms' && (
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <label className="text-slate-400">Voltage (V):</label>
                    <input type="number" value={ohmsV} onChange={e => setOhmsV(Number(e.target.value))} className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-white" />
                  </div>
                  <div>
                    <label className="text-slate-400">Current (A):</label>
                    <input type="number" value={ohmsI} onChange={e => setOhmsI(Number(e.target.value))} className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-white" />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 text-xs font-mono flex justify-between">
                  <span>Resistance: <strong className="text-cyan-400">{ohmsR.toFixed(2)} Ω</strong></span>
                  <span>Power Dissipation: <strong className="text-amber-400">{ohmsP.toFixed(2)} W</strong></span>
                </div>
              </div>
            )}

            {activeCalc === 'led' && (
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                  <div>
                    <label className="text-slate-400">Supply (V):</label>
                    <input type="number" value={ledVsupply} onChange={e => setLedVsupply(Number(e.target.value))} className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-white" />
                  </div>
                  <div>
                    <label className="text-slate-400">Forward Drop Vf (V):</label>
                    <input type="number" value={ledVf} onChange={e => setLedVf(Number(e.target.value))} className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-white" />
                  </div>
                  <div>
                    <label className="text-slate-400">Current (mA):</label>
                    <input type="number" value={ledCurrentMa} onChange={e => setLedCurrentMa(Number(e.target.value))} className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-white" />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 text-xs font-mono flex justify-between">
                  <span>Required Resistor: <strong className="text-cyan-400">{ledRes.toFixed(0)} Ω</strong> (Standard: 150Ω or 220Ω)</span>
                  <span>Resistor Power: <strong className="text-amber-400">{(ledWattage * 1000).toFixed(1)} mW</strong></span>
                </div>
              </div>
            )}

            {activeCalc === 'battery' && (
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                  <div>
                    <label className="text-slate-400">Capacity (Ah):</label>
                    <input type="number" value={batAh} onChange={e => setBatAh(Number(e.target.value))} className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-white" />
                  </div>
                  <div>
                    <label className="text-slate-400">Voltage (V):</label>
                    <input type="number" value={batVolts} onChange={e => setBatVolts(Number(e.target.value))} className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-white" />
                  </div>
                  <div>
                    <label className="text-slate-400">Max DoD (%):</label>
                    <input type="number" value={batDod} onChange={e => setBatDod(Number(e.target.value))} className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-white" />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 text-xs font-mono flex justify-between">
                  <span>Nominal Energy: <strong className="text-slate-200">{batWhNominal.toFixed(0)} Wh</strong></span>
                  <span>Usable Energy: <strong className="text-emerald-400">{batWhUsable.toFixed(0)} Wh</strong></span>
                </div>
              </div>
            )}

            {activeCalc === 'motor' && (
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                  <div>
                    <label className="text-slate-400">Motor Torque (N·m):</label>
                    <input type="number" step="0.1" value={motorTorqueNm} onChange={e => setMotorTorqueNm(Number(e.target.value))} className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-white" />
                  </div>
                  <div>
                    <label className="text-slate-400">Motor RPM:</label>
                    <input type="number" value={motorRpm} onChange={e => setMotorRpm(Number(e.target.value))} className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-white" />
                  </div>
                  <div>
                    <label className="text-slate-400">Gearbox Ratio (X:1):</label>
                    <input type="number" value={gearboxRatio} onChange={e => setGearboxRatio(Number(e.target.value))} className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-white" />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 text-xs font-mono flex justify-between">
                  <span>Output Turntable Torque: <strong className="text-amber-400">{outputTurntableTorque} N·m</strong></span>
                  <span>Turntable Speed: <strong className="text-cyan-400">{outputTurntableRpm} RPM</strong></span>
                  <span>Mechanical Power: <strong className="text-emerald-400">{motorMechanicalWatts} W</strong></span>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
