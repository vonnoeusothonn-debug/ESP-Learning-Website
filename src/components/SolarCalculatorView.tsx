import React, { useState } from 'react';
import { 
  Sun, 
  Battery, 
  RotateCw, 
  TrendingUp, 
  Compass, 
  AlertTriangle, 
  CheckCircle2, 
  Layers,
  Zap,
  Info
} from 'lucide-react';
import { NavSection } from '../types';

export const SolarCalculatorView: React.FC<{ setCurrentSection: (section: NavSection) => void }> = ({ setCurrentSection }) => {
  // Inputs
  const [panelWatts, setPanelWatts] = useState<number>(250);
  const [systemVoltage, setSystemVoltage] = useState<number>(24);
  const [peakSunHours, setPeakSunHours] = useState<number>(5.2);
  const [trackingGainPct, setTrackingGainPct] = useState<number>(28); // 28% gain
  const [batteryAh, setBatteryAh] = useState<number>(50); // 50Ah
  const [batteryDod, setBatteryDod] = useState<number>(80); // 80% depth of discharge
  
  // Consumption Inputs
  const [motorWatts, setMotorWatts] = useState<number>(35); // 35W motor run
  const [motorRunMinsDay, setMotorRunMinsDay] = useState<number>(24); // 24 minutes total motor run time per day
  const [electronicsWatts, setElectronicsWatts] = useState<number>(1.5); // ESP32 + sensors

  // Calculations
  // Theoretical vs Realistic Deratings
  // Real world derating factor: Dust (-4%), Thermal derating at 45°C (-8%), MPPT efficiency (97%), Wiring (-2%)
  const realWorldDerating = 0.96 * 0.92 * 0.97 * 0.98; // ~0.839 (83.9%)

  // Energy generation
  const fixedDailyWhTheoretical = panelWatts * peakSunHours;
  const fixedDailyWhUsable = fixedDailyWhTheoretical * realWorldDerating;

  const trackingDailyWhTheoretical = fixedDailyWhTheoretical * (1 + trackingGainPct / 100);
  const trackingDailyWhUsable = trackingDailyWhTheoretical * realWorldDerating;
  const netGainWh = trackingDailyWhUsable - fixedDailyWhUsable;

  // Energy consumption
  const motorDailyWh = motorWatts * (motorRunMinsDay / 60);
  const electronicsDailyWh = electronicsWatts * 24;
  const totalParasiticWh = motorDailyWh + electronicsDailyWh;

  // Net Energy balance
  const netDailyEnergyWh = trackingDailyWhUsable - totalParasiticWh;
  const parasiticPercentage = (totalParasiticWh / trackingDailyWhUsable) * 100;

  // Battery metrics
  const batteryNominalWh = batteryAh * systemVoltage;
  const batteryUsableWh = batteryNominalWh * (batteryDod / 100);
  const cloudyAutonomyDays = +(batteryUsableWh / (totalParasiticWh + 120)).toFixed(1); // Assuming 120Wh critical loads

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-orange-950/20 to-slate-900 border border-amber-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <Sun className="w-4 h-4" />
            ការគណនាទំហំថាមពលវិស្វកម្ម (Engineering Sizing)
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
            ម៉ាស៊ីនគិតលេខថាមពល Dual-Axis Solar Tracker & ទំហំអាគុយ Battery
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
            គណនាទិន្នផលថាមពលប្រចាំថ្ងៃ ផ្ទៀងផ្ទាត់ថាការស៊ីភ្លើងរបស់ម៉ូទ័រមិនលើសថាមពលដែលប្រមូលបាន និងគណនាទំហំអាគុយបម្រុងពេលមេឃស្រអាប់។
          </p>
        </div>

        <button
          onClick={() => setCurrentSection('fyp-mode')}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-sans text-xs font-bold transition-all shadow-md shadow-amber-500/20 flex items-center gap-2"
        >
          <span>មើលក្នុង FYP Simulator</span>
          <span>→</span>
        </button>
      </div>

      {/* Inputs Form Grid */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
        <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400">
          ១. ប៉ារ៉ាម៉ែត្ររចនាប្រព័ន្ធ & លក្ខខណ្ឌបរិស្ថាន (System & Environment Parameters)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <label className="text-slate-400 font-sans">កម្លាំងបន្ទះសូឡា (Solar Panel Rating Wp):</label>
            <input
              type="number"
              value={panelWatts}
              onChange={(e) => setPanelWatts(Number(e.target.value))}
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm"
            />
            <span className="text-[10px] text-slate-500 block font-sans">គោលដៅ FYP: បន្ទះ 250W</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <label className="text-slate-400 font-sans">តង់ស្យុងប្រព័ន្ធ (System Voltage V):</label>
            <select
              value={systemVoltage}
              onChange={(e) => setSystemVoltage(Number(e.target.value))}
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm"
            >
              <option value={12}>ប្រព័ន្ធ 12V</option>
              <option value={24}>ប្រព័ន្ធ 24V (ណែនាំសម្រាប់ FYP)</option>
              <option value={48}>ប្រព័ន្ធ 48V</option>
            </select>
            <span className="text-[10px] text-slate-500 block font-sans">24V កាត់បន្ថយទំហំខ្សែ និងចរន្តម៉ូទ័រ</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <label className="text-slate-400 font-sans">ម៉ោងពន្លឺថ្ងៃពេញ (Peak Sun Hours / day):</label>
            <input
              type="number"
              step="0.1"
              value={peakSunHours}
              onChange={(e) => setPeakSunHours(Number(e.target.value))}
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm"
            />
            <span className="text-[10px] text-slate-500 block font-sans">មធ្យមនៅកម្ពុជា: 4.8 - 5.5 h</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <label className="text-slate-400 font-sans">ភាគរយថាមពលបន្ថែម (Tracking Gain %):</label>
            <input
              type="number"
              value={trackingGainPct}
              onChange={(e) => setTrackingGainPct(Number(e.target.value))}
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm"
            />
            <span className="text-[10px] text-slate-500 block font-sans">ស្តង់ដារវាស់ជាក់ស្តែង: 25% - 35%</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <label className="text-slate-400 font-sans">ចំណុះអាគុយ (Battery Capacity Ah):</label>
            <input
              type="number"
              value={batteryAh}
              onChange={(e) => setBatteryAh(Number(e.target.value))}
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm"
            />
            <span className="text-[10px] text-slate-500 block font-sans">អាគុយ LiFePO4 50Ah (24V)</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <label className="text-slate-400 font-sans">អានុភាពម៉ូទ័រពេលដំណើរការ (Motor Active Watts):</label>
            <input
              type="number"
              value={motorWatts}
              onChange={(e) => setMotorWatts(Number(e.target.value))}
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm"
            />
            <span className="text-[10px] text-slate-500 block font-sans">Azimuth + Elevation Actuator</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <label className="text-slate-400 font-sans">រយៈពេលម៉ូទ័រដើរ (Run Time Mins / day):</label>
            <input
              type="number"
              value={motorRunMinsDay}
              onChange={(e) => setMotorRunMinsDay(Number(e.target.value))}
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm"
            />
            <span className="text-[10px] text-slate-500 block font-sans">ដើរ 20 វិនាទីរៀងរាល់ 10 នាទី = 24 នាទី</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <label className="text-slate-400 font-sans">ភ្លើងស៊ីប្រចាំ (Quiescent Power Watts):</label>
            <input
              type="number"
              step="0.1"
              value={electronicsWatts}
              onChange={(e) => setElectronicsWatts(Number(e.target.value))}
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm"
            />
            <span className="text-[10px] text-slate-500 block font-sans">ESP32 + CAN + Sensors: ~1.5W</span>
          </div>

        </div>
      </div>

      {/* Comparison Results Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Fixed Panel Card */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 font-sans">បន្ទះសូឡានៅនឹងថ្កល់ (Fixed Tilt Panel)</span>
            <span className="text-slate-500 font-sans">ស្តង់ដារប្រៀបធៀប</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-200">
            {(fixedDailyWhUsable / 1000).toFixed(2)} kWh / ថ្ងៃ
          </div>
          <div className="text-xs font-mono text-slate-400 space-y-1 pt-2 border-t border-slate-800 font-sans">
            <div>ទ្រឹស្តី (Theoretical): {(fixedDailyWhTheoretical / 1000).toFixed(2)} kWh</div>
            <div>ប្រើប្រាស់ជាក់ស្តែង (Usable): {fixedDailyWhUsable.toFixed(0)} Wh</div>
          </div>
        </div>

        {/* Dual-Axis Tracker Card */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/50 shadow-lg shadow-amber-950/20 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-amber-400 font-bold flex items-center gap-1.5 font-sans">
              <Sun className="w-3.5 h-3.5" />
              Smart Dual-Axis Solar Tracker
            </span>
            <span className="text-emerald-400 font-bold">+{trackingGainPct}% ផលចំណេញ</span>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {(trackingDailyWhUsable / 1000).toFixed(2)} kWh / ថ្ងៃ
          </div>
          <div className="text-xs font-mono text-slate-300 space-y-1 pt-2 border-t border-slate-800 font-sans">
            <div>ថាមពលប្រមូលបានបន្ថែម: <strong className="text-emerald-400">+{netGainWh.toFixed(0)} Wh / ថ្ងៃ</strong></div>
            <div>ស៊ីភ្លើងម៉ូទ័រ & ESP32: <strong className="text-rose-400">-{totalParasiticWh.toFixed(0)} Wh / ថ្ងៃ</strong></div>
          </div>
        </div>

        {/* Net Energy Balance */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/50 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 font-bold font-sans">ថាមពលចំណេញសុទ្ធ (Net Energy Surplus)</span>
            <span className="text-cyan-400 font-bold">{(parasiticPercentage).toFixed(1)}% ស៊ីលើខ្លួនឯង</span>
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-400">
            {(netDailyEnergyWh / 1000).toFixed(2)} kWh / ថ្ងៃ
          </div>
          <div className="text-xs font-mono text-slate-300 space-y-1 pt-2 border-t border-slate-800 font-sans">
            <div>ស្តុកទុកក្នុងអាគុយ: <strong className="text-slate-200">{batteryUsableWh.toFixed(0)} Wh</strong></div>
            <div>ស្វ័យភាពពេលមេឃស្រអាប់ (Autonomy): <strong className="text-cyan-300">{cloudyAutonomyDays} ថ្ងៃ</strong></div>
          </div>
        </div>

      </div>

      {/* Engineering Derating Analysis Table */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400" />
          កត្តាកាត់បន្ថយថាមពលពិតក្នុងវិស្វកម្ម (Derating Factors — ផលសរុប 83.9% Usable)
        </h3>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800 font-sans">
              <tr>
                <th className="px-3 py-2">កត្តាបាត់បង់ (Derating Factor)</th>
                <th className="px-3 py-2">ភាគរយបាត់បង់ %</th>
                <th className="px-3 py-2">មូលហេតុវិស្វកម្ម & ដំណោះស្រាយ (Rationale & Mitigation)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-slate-950 text-slate-300">
              <tr>
                <td className="px-3 py-2 text-amber-400 font-bold font-sans">ធូលីដី & ក្អែលកខ្វក់ (Dust & Soiling)</td>
                <td className="px-3 py-2">-4.0%</td>
                <td className="px-3 py-2 text-slate-400 font-sans text-[11px]">ធូលីដីហុយទំលើកញ្ចក់កាត់បន្ថយពន្លឺ។ ដោះស្រាយដោយកំណត់មុខងារបង្វិលបញ្ឈរពេលភ្លៀងដើម្បីលាងសម្អាតដោយស្វ័យប្រវត្តិ។</td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-amber-400 font-bold font-sans">កម្តៅឡើងខ្ពស់លើបន្ទះ (Temperature Coefficient)</td>
                <td className="px-3 py-2">-8.0%</td>
                <td className="px-3 py-2 text-slate-400 font-sans text-[11px]">កោសិកាស៊ីលីកូនបាត់បង់ប្រសិទ្ធភាព ~0.4% រាល់កម្តៅកើន 1°C លើសពី 25°C។ នៅរដូវក្តៅ បន្ទះអាចឡើងដល់ 65°C។</td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-emerald-400 font-bold font-sans">ប្រសិទ្ធភាព MPPT Charge Controller</td>
                <td className="px-3 py-2">-3.0%</td>
                <td className="px-3 py-2 text-slate-400 font-sans text-[11px]">ឧបករណ៍បញ្ជាសាក MPPT បែប Synchronous Buck ដំណើរការនៅប្រសិទ្ធភាពខ្ពស់បំផុត 97%។</td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-amber-400 font-bold font-sans">ការធ្លាក់តង់ស្យុងលើខ្សែ (Cable Resistance Drop)</td>
                <td className="px-3 py-2">-2.0%</td>
                <td className="px-3 py-2 text-slate-400 font-sans text-[11px]">ភាពធន់រវាងបង្គោលសូឡានិងទូអាគុយ។ ដោះស្រាយដោយប្រើប្រព័ន្ធតង់ស្យុង 24V ជំនួសឱ្យ 12V ដើម្បីកាត់បន្ថយចរន្តជាពាក់កណ្តាល។</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
