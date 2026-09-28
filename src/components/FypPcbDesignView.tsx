import React, { useState } from 'react';
import { 
  CircuitBoard, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Radio, 
  Compass, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Info
} from 'lucide-react';
import { NavSection } from '../types';

interface FypPcbDesignViewProps {
  setCurrentSection: (section: NavSection) => void;
}

export const FypPcbDesignView: React.FC<FypPcbDesignViewProps> = ({ setCurrentSection }) => {
  const [activeTab, setActiveTab] = useState<'power' | 'mcu' | 'sensors' | 'motors' | 'can' | 'connectors'>('power');

  const tabs = [
    { id: 'power', label: '1. Power Section' },
    { id: 'mcu', label: '2. Controller Core' },
    { id: 'sensors', label: '3. Sensor Conditioning' },
    { id: 'motors', label: '4. Motor & Relays' },
    { id: 'can', label: '5. Industrial CAN' },
    { id: 'connectors', label: '6. Field Connectors' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <CircuitBoard className="w-4 h-4" />
            Project Specific Engineering Guide
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
            PCB Design for the Solar Tracker FYP
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Practical layout rules, copper weights, trace width sizing, and schematic considerations specifically tuned for the dual-axis tracker board.
          </p>
        </div>

        <button
          onClick={() => setCurrentSection('circuit-builder')}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono text-xs font-bold transition-all"
        >
          Open Circuit Builder Lab →
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Power Section */}
      {activeTab === 'power' && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white font-sans">
              Power Supply Section (24V Solar Input, Protection & Buck Regulators)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Guarantees clean, spike-free power for the ESP32 while routing up to 4.8A peak motor inrush without thermal issues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                1. Input Protection Components
              </h3>
              <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                <li><strong className="text-slate-200">Bourns MF-MSMF260 PTC Fuse:</strong> 2.6A hold current / 5.0A trip. Trips on dead short or actuator stall without blowing glass fuses in the field.</li>
                <li><strong className="text-slate-200">SMAJ28A TVS Diode:</strong> Clamps high-voltage inductive kickback and lightning pulses above 28V to ground.</li>
                <li><strong className="text-slate-200">P-MOSFET Reverse Protection:</strong> P-channel AO4407A with Gate tied to GND through 100kΩ and clamped with a 15V Zener diode. Voltage drop is only ~15mV (P = I²R = 0.05W).</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                2. DC/DC Step-Down Buck & LDO Cascade
              </h3>
              <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                <li><strong className="text-slate-200">MP1584 Switching Buck:</strong> Steps 24V nominal battery rail down to 5.0V with 91% efficiency. Provides up to 2.0A continuous.</li>
                <li><strong className="text-slate-200">AMS1117-3.3 Linear LDO:</strong> Fed by the 5.0V buck output to produce clean, low-ripple 3.3V for ESP32 and sensors (dropping only 1.7V, dissipating &lt;0.3W).</li>
                <li><strong className="text-slate-200">Bulk & Bypass Filtering:</strong> 100µF 50V Low-ESR electrolytic capacitor at 24V input; 220µF at 5V; 100µF + 4x 100nF ceramic capacitors at 3.3V rail.</li>
              </ul>
            </div>

          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              PCB Layout Directives for Power Section
            </h3>
            <div className="space-y-1.5 text-xs text-slate-300 font-sans">
              <p>• Place the 2-pin 5.08mm screw terminal right at the top-left edge of the PCB.</p>
              <p>• Route the high-current 24V motor traces with a minimum width of <strong>3.0 mm (120 mils)</strong> using 1 oz copper.</p>
              <p>• Keep the buck converter high-frequency switching loop (Input cap ➔ MP1584 pin 7 ➔ SW inductor ➔ Ground via) under 15mm total loop area to prevent RF noise from coupling into the CAN transceiver.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Controller Core */}
      {activeTab === 'mcu' && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white font-sans">
              Controller Section (ESP32-S3-WROOM-1, Reset, Boot & USB)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Core microcontroller layout, antenna keep-out, auto-reset circuitry, and diagnostic status LEDs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                1. Reset & Boot Mode Circuitry
              </h3>
              <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                <li><strong className="text-slate-200">EN Pin Reset RC Delay:</strong> 10kΩ pull-up resistor to 3.3V in parallel with a 1µF ceramic capacitor to GND provides the crucial 10ms boot delay.</li>
                <li><strong className="text-slate-200">Boot Button:</strong> Momentary tactile switch shorting GPIO 0 to GND when pressed for manual firmware flashing.</li>
                <li><strong className="text-slate-200">Native USB-C:</strong> Connected directly to GPIO 19 (D-) and GPIO 20 (D+) with USBLC6-2SC6 ESD protection diodes.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                2. Onboard Diagnostic Status LEDs
              </h3>
              <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                <li><strong className="text-emerald-400">Green LED (GPIO 4):</strong> System Heartbeat / Closed-Loop Sun Tracking Active.</li>
                <li><strong className="text-cyan-400">Blue LED (GPIO 5):</strong> CAN Bus Telemetry Packet TX/RX Activity.</li>
                <li><strong className="text-amber-400">Amber LED (GPIO 6):</strong> Night Stowed Mode / Low Light Sleep.</li>
                <li><strong className="text-rose-400">Red LED (GPIO 7):</strong> Endstop Limit Tripped / Motor Stall Overcurrent.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
              <AlertTriangle className="w-4 h-4" />
              CRITICAL PCB ANTENNA RULE:
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              The ESP32-S3 module MUST be positioned so that the onboard meandering inverted-F antenna (MIFA) hangs completely over the edge of the PCB. There must be <strong>NO copper ground plane, NO traces, and NO components</strong> on either the top or bottom layer within a 15mm zone beneath and around the antenna.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Sensors */}
      {activeTab === 'sensors' && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white font-sans">
              Sensor Conditioning Section (I2C Bus & 4-Quadrant ADC)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Low-noise analog conditioning for quadrant LDRs and shared 100kHz I2C bus for the BNO085 IMU and DS3231 RTC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                1. 4-Quadrant LDR Divider Stage
              </h3>
              <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                <li>Four cadmium-sulfide LDRs mounted in a 3D-printed cross vane on the tracking mast head.</li>
                <li>Each LDR forms a voltage divider with a 10kΩ 0.1% metal film resistor to GND.</li>
                <li>A 100nF ceramic capacitor across each resistor acts as an anti-aliasing low-pass filter (cutoff ≈ 160 Hz) to eliminate 50Hz mains hum and motor brush sparking.</li>
                <li>Connected strictly to <strong>ADC1 channels</strong> (GPIO 1, 2, 3, 7) to prevent Wi-Fi driver lockouts.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                2. I2C Astronomical Bus (BNO085 + DS3231)
              </h3>
              <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                <li>Shared bus: SDA on GPIO 21, SCL on GPIO 22.</li>
                <li>Hardware 4.7kΩ pull-up resistors to clean 3.3V on the PCB.</li>
                <li>DS3231 RTC includes an onboard CR2032 lithium coin cell socket for uninterrupted astronomical timekeeping during power outages.</li>
                <li>BNO085 INT pin connected to GPIO 14 to provide asynchronous data-ready interrupts whenever sensor fusion outputs a new quaternion vector.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Motors */}
      {activeTab === 'motors' && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white font-sans">
              Motor & Actuator Drive Section (H-Bridge, Relays & Endstops)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              High-current switching for continuous azimuth turntable rotation and heavy 24V linear elevation tilt with hardware interlocks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                1. Azimuth DC / Stepper Drive
              </h3>
              <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                <li>TB6612FNG dual channels paralleled to deliver 2.4A continuous to the worm-gear motor.</li>
                <li>Driven by ESP32 LEDC PWM on GPIO 9 (20 kHz inaudible frequency) and direction pins on GPIO 10, 11.</li>
                <li>0.1µF monolithic ceramic capacitors soldered directly across motor terminals to suppress brush arcing.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                2. Elevation Linear Actuator Relays
              </h3>
              <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                <li>Dual SPDT 10A automotive relays wired in an H-bridge polarity reversing configuration.</li>
                <li>Relay coils switched by low-side IRLZ44N logic MOSFETs driven by GPIO 18 and 19.</li>
                <li>SS34 Schottky flyback diodes across each relay coil clamp the inductive turn-off spike.</li>
                <li>Normally Closed (NC) physical limit switches placed in series with relay power for fail-safe physical cut-off.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: CAN Bus */}
      {activeTab === 'can' && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white font-sans">
              Industrial CAN Bus Subsystem (SN65HVD230 Transceiver & Termination)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Industrial-grade differential communication over 25+ meters of outdoor cable between the solar mast and indoor gateway.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
              CAN Bus Transceiver Circuit Specifications
            </h3>
            <div className="space-y-2 text-xs text-slate-300 font-sans">
              <p>• <strong className="text-slate-200">Transceiver IC:</strong> SN65HVD230 in SOIC-8 package powered directly from 3.3V.</p>
              <p>• <strong className="text-slate-200">TWAI Pins:</strong> TXD connected to GPIO 20; RXD connected to GPIO 21.</p>
              <p>• <strong className="text-slate-200">Split Termination Network:</strong> Two 60Ω 1% precision resistors in series with a 4.7nF capacitor to ground placed across CANH and CANL. This creates 120Ω differential termination while shunting common-mode electromagnetic noise to ground.</p>
              <p>• <strong className="text-slate-200">Jumper JP1:</strong> Allows disconnecting the 120Ω termination if the board is placed in the middle of a multi-drop CAN bus.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Connectors */}
      {activeTab === 'connectors' && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white font-sans">
              External Connectors & Mechanical Layout
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Clear silkscreen markings and heavy screw terminals for field installation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-cyan-400 font-bold">J1: POWER IN (2-Pin)</div>
              <div className="text-slate-300">Pin 1: +24V Battery In</div>
              <div className="text-slate-400">Pin 2: Power GND Return</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-purple-400 font-bold">J2: CAN BUS (3-Pin)</div>
              <div className="text-slate-300">Pin 1: CAN_H</div>
              <div className="text-slate-300">Pin 2: CAN_L</div>
              <div className="text-slate-400">Pin 3: Shield GND</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-emerald-400 font-bold">J3: AZIMUTH (2-Pin)</div>
              <div className="text-slate-300">Pin 1: MOT_AZ_A (PWM)</div>
              <div className="text-slate-300">Pin 2: MOT_AZ_B (PWM)</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-amber-400 font-bold">J4: ACTUATOR (2-Pin)</div>
              <div className="text-slate-300">Pin 1: ACT_EL_A (±24V)</div>
              <div className="text-slate-300">Pin 2: ACT_EL_B (±24V)</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-cyan-400 font-bold">J5: SENSORS (6-Pin JST)</div>
              <div className="text-slate-300">+3.3V, 4x LDRs, AGND</div>
              <div className="text-slate-400">Shielded Mast Cable</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-rose-400 font-bold">J6: LIMITS & E-STOP (5-Pin)</div>
              <div className="text-slate-300">4x Endstops + E-STOP</div>
              <div className="text-slate-400">Active LOW Interlocks</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
