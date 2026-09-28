import React, { useState } from 'react';
import { 
  Compass, 
  Sun, 
  Wind, 
  Moon, 
  RotateCw, 
  Radio, 
  Gauge, 
  Battery, 
  Zap, 
  ShieldAlert, 
  CheckCircle2, 
  Cpu, 
  ArrowRight,
  Sliders,
  Layers,
  Activity
} from 'lucide-react';
import { NavSection } from '../types';

interface FypModeViewProps {
  setCurrentSection: (section: NavSection) => void;
}

export const FypModeView: React.FC<FypModeViewProps> = ({ setCurrentSection }) => {
  // Simulator Controls
  const [timeOfDay, setTimeOfDay] = useState<number>(12); // 12:00 PM
  const [cloudCover, setCloudCover] = useState<number>(15); // 15% clouds
  const [trackingMode, setTrackingMode] = useState<'hybrid' | 'optical' | 'astronomical' | 'stow'>('hybrid');
  const [windAlert, setWindAlert] = useState<boolean>(false);

  // Computed Solar Kinematics
  // Sun travels East (90°) at 06:00 -> South (180°) at 12:00 -> West (270°) at 18:00
  const sunAzimuth = Math.round(90 + ((timeOfDay - 6) / 12) * 180);
  // Elevation peaks at 12:00 at ~68 degrees, 0 degrees at 06:00 and 18:00
  const sunElevation = Math.max(5, Math.round(68 * Math.sin(((timeOfDay - 6) / 12) * Math.PI)));

  // Tracker angles (simulate PID following or stow mode)
  const isNight = timeOfDay < 6 || timeOfDay > 18;
  const trackerAzimuth = trackingMode === 'stow' || windAlert ? 180 : isNight ? 90 : sunAzimuth;
  const trackerElevation = trackingMode === 'stow' || windAlert ? 10 : isNight ? 15 : sunElevation;

  // Real-time Electrical Calculations
  const basePanelWatts = 250;
  const cosineEfficiency = Math.cos(((sunAzimuth - trackerAzimuth) * Math.PI) / 180) * 
                           Math.cos(((sunElevation - trackerElevation) * Math.PI) / 180);
  const cloudAttenuation = (100 - cloudCover * 0.7) / 100;
  const currentPvWatts = isNight ? 0 : Math.max(0, Math.round(basePanelWatts * (sunElevation / 68) * cosineEfficiency * cloudAttenuation));
  const pvVolts = isNight ? 2.1 : 32.4;
  const pvAmps = isNight ? 0.0 : +(currentPvWatts / pvVolts).toFixed(2);
  const batterySoc = 88;

  const mappingConnections = [
    {
      concept: 'មេរៀន GPIO',
      fypTarget: 'កុងតាក់កំណត់ Limit Switch & ប៊ូតុងសង្គ្រោះបន្ទាន់ E-STOP',
      detail: 'ចាប់ដែនកំណត់បង្វិល 0° ដល់ 180° ការពារកុំឱ្យរមួលដាច់ខ្សែភ្លើងខាងក្នុង។',
      section: 'esp32' as NavSection
    },
    {
      concept: 'មេរៀន ADC',
      fypTarget: 'ក្បាលសេនស័រ 4-Quadrant LDR Optical Shadow Tracking',
      detail: 'អានផលដកតង់ស្យុងអាណាឡូករវាង East/West និង North/South ដើម្បីតម្រង់ចំកណ្តាលថ្ងៃ។',
      section: 'labs' as NavSection
    },
    {
      concept: 'មេរៀន I2C',
      fypTarget: 'BNO085 9-DOF IMU + DS3231 Precision RTC',
      detail: 'ផ្តល់នូវមុំលំអៀង Pitch/Roll ពិតប្រាកដ និងម៉ោង UTC ច្បាស់លាស់សម្រាប់គណនាគន្លងព្រះអាទិត្យ។',
      section: 'labs' as NavSection
    },
    {
      concept: 'មេរៀន CAN Bus',
      fypTarget: 'ខ្សែបណ្តាញ 250 kbps រវាងបង្គោលសូឡា និង Main Gateway',
      detail: 'បញ្ជូនកញ្ចប់ទិន្នន័យ Telemetry ចម្ងាយ 25m ធន់នឹងរំញ័រ Noise របស់ម៉ូទ័រ។',
      section: 'labs' as NavSection
    },
    {
      concept: 'មេរៀន PWM',
      fypTarget: 'ការគ្រប់គ្រងល្បឿន Azimuth Motor & Soft-Start Ramp',
      detail: 'លុបបំបាត់ការកន្ត្រាក់មេកានិក និងការពារកុំឱ្យបាក់ធ្មេញហ្គែរ Gearbox។',
      section: 'esp32' as NavSection
    },
    {
      concept: 'មេរៀន MQTT',
      fypTarget: 'Node-RED Cloud Telemetry & SCADA Alerts',
      detail: 'រុញទិន្នន័យ JSON ទៅកាន់ Time-Series Database និង Dashboard លើទូរសព្ទដៃ។',
      section: 'labs' as NavSection
    },
    {
      concept: 'មេរៀន PCB Design',
      fypTarget: 'បន្ទះសៀគ្វី Solar Tracker Control Board Rev 1.2',
      detail: 'រួមបញ្ចូល 24V H-bridge, Buck Converter 92%, TVS Protection និង ESP32-S3។',
      section: 'fyp-pcb-arch' as NavSection
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/50 via-orange-950/30 to-slate-900 border border-amber-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <Compass className="w-4 h-4" />
            របៀបពិសេស (Special Engineering Mode)
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
            FYP MODE — ឧបករណ៍ក្លែងធ្វើប្រព័ន្ធ Dual-Axis Solar Tracker (Khmer First)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
            ភ្ជាប់រាល់គោលគំនិតប្រព័ន្ធបង្កប់ និងអេឡិចត្រូនិកទាំងអស់ទៅកាន់គំរូតួជាក់ស្តែងនៃគម្រោង Final Year Project។
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">ស្ថានភាពប្រព័ន្ធ:</span>
          <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${
            windAlert ? 'bg-rose-950 text-rose-300 border-rose-800 animate-pulse' :
            isNight ? 'bg-indigo-950 text-indigo-300 border-indigo-800' :
            'bg-emerald-950 text-emerald-300 border-emerald-800'
          }`}>
            {windAlert ? 'ខ្យល់ព្យុះខ្លាំង (10° STOW MODE)' : isNight ? 'ពេលយប់សម្ងំ (90° EAST PARK)' : 'កំពុងតាមថ្ងៃ (ACTIVE TRACKING)'}
          </span>
        </div>
      </div>

      {/* Interactive Dual-Axis Simulator Canvas */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
        
        {/* Controls Bar: Time of day, Cloud slider, Emergency Storm trigger */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
          
          {/* Time slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>ពេលវេលាក្នុងថ្ងៃ (Time of Day):</span>
              </span>
              <span className="text-amber-400 font-bold">
                {timeOfDay.toString().padStart(2, '0')}:00 {timeOfDay < 12 ? 'ព្រឹក (AM)' : 'រសៀល (PM)'}
              </span>
            </div>
            <input
              type="range"
              min="6"
              max="18"
              step="0.5"
              value={timeOfDay}
              onChange={(e) => setTimeOfDay(Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-800 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>06:00 (ថ្ងៃរះ East)</span>
              <span>12:00 (ថ្ងៃត្រង់ Solar Noon)</span>
              <span>18:00 (ថ្ងៃលិច West)</span>
            </div>
          </div>

          {/* Cloudiness slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <span>កម្រិតពពកបាំង (Cloud Cover):</span>
              <span className="text-cyan-400 font-bold">{cloudCover}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={cloudCover}
              onChange={(e) => setCloudCover(Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-800 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>មេឃស្រឡះ (0%)</span>
              <span>ពពកខ្លះៗ (50%)</span>
              <span>ពពកខ្មៅបាំងជិត (100%)</span>
            </div>
          </div>

          {/* Storm Stow Button */}
          <div className="flex flex-col justify-end">
            <button
              onClick={() => setWindAlert(!windAlert)}
              className={`w-full py-2.5 px-3 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                windAlert
                  ? 'bg-rose-500 text-slate-950 border-rose-400 shadow-lg shadow-rose-500/20'
                  : 'bg-slate-900 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
              }`}
            >
              <Wind className="w-4 h-4" />
              {windAlert ? 'ដោះលែង Storm Stow (ត្រឡប់ធម្មតា)' : 'ក្លែងធ្វើខ្យល់ព្យុះ 50 km/h (Storm Stow)'}
            </button>
          </div>

        </div>

        {/* Live Tracking Visualizer & Telemetry Dials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Visual Solar Tracker Assembly Graphic (7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-xl bg-slate-950 border border-slate-800 relative flex flex-col items-center justify-center min-h-[340px] overflow-hidden">
            
            {/* Celestial Sky Dome Arc */}
            <div className="absolute top-4 inset-x-8 h-40 border-t-2 border-dashed border-slate-800 rounded-t-full pointer-events-none" />

            {/* Sun Icon positioned dynamically */}
            <div 
              className="absolute transition-all duration-500 flex flex-col items-center gap-1 z-20"
              style={{
                left: `${((sunAzimuth - 90) / 180) * 80 + 10}%`,
                top: `${Math.max(10, 85 - (sunElevation / 70) * 65)}%`
              }}
            >
              <div className="w-8 h-8 rounded-full bg-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.9)] flex items-center justify-center animate-pulse">
                <Sun className="w-5 h-5 text-slate-950" />
              </div>
              <span className="text-[10px] font-mono text-amber-300 font-bold bg-slate-950/80 px-1 rounded border border-amber-900/60">
                ព្រះអាទិត្យ Sun ({sunAzimuth}°, {sunElevation}°)
              </span>
            </div>

            {/* Tracker Physical Mast & Panel Visual Representation */}
            <div className="relative mt-24 flex flex-col items-center z-10">
              
              {/* Rotating Solar Panel Bed */}
              <div 
                className="w-48 h-14 rounded-lg bg-gradient-to-r from-blue-900 via-sky-700 to-blue-950 border-2 border-cyan-400/80 shadow-xl transition-all duration-700 flex items-center justify-center relative"
                style={{
                  transform: `rotate(${trackerElevation - 45}deg)`
                }}
              >
                {/* Photovoltaic wafer grid lines */}
                <div className="w-full h-full grid grid-cols-6 divide-x divide-cyan-400/30">
                  <div /><div /><div /><div /><div /><div />
                </div>
                {/* 4-Quadrant LDR Sensor Head on Center */}
                <div className="absolute -top-3 w-5 h-5 rounded-full bg-amber-400 border border-slate-950 shadow-md flex items-center justify-center" title="4-Quadrant LDR Optical Cross-Vane">
                  <span className="text-[8px] font-bold text-slate-950">LDR</span>
                </div>
              </div>

              {/* Elevation Actuator Arm */}
              <div className="w-2 h-14 bg-slate-600 border border-slate-500 mt-1" />

              {/* Azimuth Turntable Turret */}
              <div className="w-20 h-6 bg-slate-800 rounded-full border-2 border-slate-700 flex items-center justify-center shadow-lg">
                <span className="text-[9px] font-mono text-slate-400">Azimuth: {trackerAzimuth}°</span>
              </div>

              {/* Heavy Steel Support Mast */}
              <div className="w-6 h-20 bg-gradient-to-b from-slate-700 to-slate-900 border-x border-slate-600" />

              {/* Ground Anchor Base Plate */}
              <div className="w-28 h-3 bg-slate-800 rounded-sm border border-slate-700" />
            </div>

            {/* Live Angle Labels Bottom */}
            <div className="absolute bottom-3 inset-x-4 flex justify-between text-xs font-mono text-slate-400">
              <span>មុំបង្វិលផ្តេក (Azimuth): <strong className="text-cyan-400">{trackerAzimuth}°</strong></span>
              <span>មុំងើបឈរ (Elevation Tilt): <strong className="text-emerald-400">{trackerElevation}°</strong></span>
            </div>
          </div>

          {/* Real-time Telemetry Readout Gauges (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-400" />
              ទិន្នន័យ Telemetry ភ្លាមៗ (Real-time Telemetry)
            </h3>

            <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase">ថាមពល PV ជាក់ស្តែង</span>
                <div className="text-lg font-bold text-emerald-400">{currentPvWatts} W</div>
                <div className="text-[10px] text-slate-500">Fixed Panel: {Math.round(currentPvWatts * 0.72)} W</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase">ថាមពលបន្ថែម (Tracking Gain)</span>
                <div className="text-lg font-bold text-cyan-400">+28.4%</div>
                <div className="text-[10px] text-slate-500">ធៀបនឹង Fixed Panel</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase">តង់ស្យុង & ចរន្ត PV</span>
                <div className="text-sm font-bold text-slate-200">{pvVolts}V • {pvAmps}A</div>
                <div className="text-[10px] text-slate-500">MPPT Max Point</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase">កម្រិតអាគុយ Battery (24V)</span>
                <div className="text-sm font-bold text-amber-400">{batterySoc}% (26.4V)</div>
                <div className="text-[10px] text-slate-500">LiFePO4 50Ah Bank</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>បណ្តាញ CAN Bus Telemetry:</span>
                <span className="text-emerald-400 font-bold">250 kbps (0 Errors)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>បន្ស៉ីទិន្នន័យ IMU Fusion:</span>
                <span className="text-cyan-400 font-bold">BNO085 Calibrated (Acc 3)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>នាឡិកា RTC ពេលវេលាជាក់ស្តែង:</span>
                <span className="text-slate-200 font-bold">DS3231 Synced</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Curriculum to FYP Hardware Mapping Matrix */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div>
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <Compass className="w-4 h-4" />
            ផែនទីតភ្ជាប់មេរៀន ➔ គ្រឿងបង្គុំជាក់ស្តែងក្នុង FYP Solar Tracker
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 font-sans">
            រាល់មេរៀនបច្ចេកទេសដែលអ្នករៀន គឺបង្កើតជាផ្នែកប្រតិបត្តិការជាក់ស្តែងនៃប្រព័ន្ធ Final Year Project។
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {mappingConnections.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentSection(item.section)}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all space-y-1.5 group"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold">{item.concept}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <h3 className="text-xs font-semibold text-white font-sans">
                {item.fypTarget}
              </h3>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
