import React, { useState } from 'react';
import { 
  Code2, 
  Play, 
  Terminal, 
  Copy, 
  Check, 
  Download, 
  Save, 
  RotateCcw, 
  BookOpen, 
  Compass, 
  Sliders, 
  Zap,
  Sparkles
} from 'lucide-react';
import { NavSection } from '../types';

interface CodePlaygroundViewProps {
  initialCode?: string;
  setCurrentSection: (section: NavSection) => void;
}

interface CodeTemplate {
  name: string;
  category: string;
  code: string;
  explanations: { token: string; desc: string }[];
}

export const CodePlaygroundView: React.FC<CodePlaygroundViewProps> = ({ 
  initialCode, 
  setCurrentSection 
}) => {
  const defaultCode = `// ESP32-S3 Dual-Axis Solar Tracker: Core Kinematics Routine
#include <Arduino.h>
#include <Wire.h>

#define PIN_LDR_EAST   1   // ADC1 Channel 0
#define PIN_LDR_WEST   2   // ADC1 Channel 1
#define PIN_MOT_PWMA   9   // Azimuth Speed PWM
#define PIN_MOT_AIN1   10  // Azimuth Direction 1
#define PIN_MOT_AIN2   11  // Azimuth Direction 2

const int DEAD_BAND_LUX = 40; // Prevents motor hunting on minor fluctuations

void setup() {
  Serial.begin(115200);
  analogReadResolution(12); // 12-bit: 0 - 4095
  analogSetAttenuation(ADC_11db);
  
  pinMode(PIN_MOT_AIN1, OUTPUT);
  pinMode(PIN_MOT_AIN2, OUTPUT);
  ledcAttach(PIN_MOT_PWMA, 20000, 8); // 20 kHz, 8-bit
  
  Serial.println("[SYSTEM READY] Dual-Axis Solar Tracker Controller Initialized.");
}

void loop() {
  int rawEast = analogRead(PIN_LDR_EAST);
  int rawWest = analogRead(PIN_LDR_WEST);
  int delta = rawEast - rawWest;
  
  Serial.printf("East: %4d | West: %4d | Delta: %+4d | ", rawEast, rawWest, delta);
  
  if (abs(delta) > DEAD_BAND_LUX) {
    if (delta > 0) {
      // East is brighter -> Rotate East
      digitalWrite(PIN_MOT_AIN1, HIGH);
      digitalWrite(PIN_MOT_AIN2, LOW);
      ledcWrite(PIN_MOT_PWMA, 180);
      Serial.println("Action: TRACKING EAST (PWM: 180)");
    } else {
      // West is brighter -> Rotate West
      digitalWrite(PIN_MOT_AIN1, LOW);
      digitalWrite(PIN_MOT_AIN2, HIGH);
      ledcWrite(PIN_MOT_PWMA, 180);
      Serial.println("Action: TRACKING WEST (PWM: 180)");
    }
  } else {
    // Within acceptable focus dead-band -> Hold position
    digitalWrite(PIN_MOT_AIN1, HIGH);
    digitalWrite(PIN_MOT_AIN2, HIGH); // Brake
    ledcWrite(PIN_MOT_PWMA, 0);
    Serial.println("Action: ON SUN FOCUS (Motor Braked)");
  }
  
  delay(1000);
}`;

  const [code, setCode] = useState<string>(initialCode || defaultCode);
  const [copied, setCopied] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileSuccess, setCompileSuccess] = useState<boolean | null>(null);
  const [baudRate, setBaudRate] = useState('115200');
  const [serialOutput, setSerialOutput] = useState<string[]>([
    '[ESP32-S3 ROM] Booting from SPI Flash...',
    '[CHIP] ESP32-S3 (revision v0.2), 240MHz, 512KB SRAM',
    '[SYSTEM READY] Dual-Axis Solar Tracker Controller Initialized.',
    'East: 3240 | West: 1840 | Delta: +1400 | Action: TRACKING EAST (PWM: 180)',
    'East: 2890 | West: 2540 | Delta:  +350 | Action: TRACKING EAST (PWM: 180)',
    'East: 2605 | West: 2595 | Delta:   +10 | Action: ON SUN FOCUS (Motor Braked)'
  ]);

  const templates: CodeTemplate[] = [
    {
      name: 'Dual-Axis LDR Tracker Algorithm',
      category: 'Kinematics',
      code: defaultCode,
      explanations: [
        { token: 'analogReadResolution(12)', desc: 'Configures SAR ADC for 12-bit depth (0 to 4095 counts).' },
        { token: 'ledcAttach(pin, freq, res)', desc: 'Initializes hardware timer for 20 kHz motor speed regulation.' },
        { token: 'DEAD_BAND_LUX', desc: 'Threshold preventing continuous motor jitter when panel is nearly aligned.' },
        { token: 'ledcWrite(pin, duty)', desc: 'Sets output PWM duty cycle (0 to 255 for 8-bit).' }
      ]
    },
    {
      name: 'CAN Bus Telemetry Transmitter (TWAI)',
      category: 'Industrial Bus',
      code: `#include "driver/twai.h"

#define CAN_TX_PIN 20
#define CAN_RX_PIN 21

void setup() {
  Serial.begin(115200);
  twai_general_config_t g_config = TWAI_GENERAL_CONFIG_DEFAULT((gpio_num_t)CAN_TX_PIN, (gpio_num_t)CAN_RX_PIN, TWAI_MODE_NORMAL);
  twai_timing_config_t t_config = TWAI_TIMING_CONFIG_250KBITS();
  twai_filter_config_t f_config = TWAI_FILTER_CONFIG_ACCEPT_ALL();
  
  if (twai_driver_install(&g_config, &t_config, &f_config) == ESP_OK && twai_start() == ESP_OK) {
    Serial.println("[TWAI] CAN Driver online at 250 kbps.");
  }
}

void loop() {
  twai_message_t msg;
  msg.identifier = 0x101;
  msg.extd = 0;
  msg.data_length_code = 8;
  msg.data[0] = 0x05; // Azimuth MSB
  msg.data[1] = 0xAC; // Azimuth LSB (145.2 deg)
  msg.data[2] = 0x01; // Elevation MSB
  msg.data[3] = 0xAC; // Elevation LSB (42.8 deg)
  msg.data[4] = 0xAA; // Status byte OK
  msg.data[5] = 0x00;
  msg.data[6] = 0x00;
  msg.data[7] = 0x01;
  
  if (twai_transmit(&msg, pdMS_TO_TICKS(50)) == ESP_OK) {
    Serial.printf("[CAN TX] Sent telemetry frame ID: 0x%03X\\n", msg.identifier);
  }
  delay(1000);
}`,
      explanations: [
        { token: 'TWAI_TIMING_CONFIG_250KBITS()', desc: 'Sets baud rate to industrial standard 250 kbps.' },
        { token: 'twai_transmit(&msg, timeout)', desc: 'Loads 8-byte frame into hardware transmit buffer.' }
      ]
    },
    {
      name: 'Actuator Limit Switch Safety Interrupt',
      category: 'Safety',
      code: `const int LIMIT_TOP_PIN = 7;
const int LIMIT_BOT_PIN = 8;
volatile bool emergencyStop = false;

void IRAM_ATTR onLimitHit() {
  emergencyStop = true;
}

void setup() {
  Serial.begin(115200);
  pinMode(LIMIT_TOP_PIN, INPUT_PULLUP);
  pinMode(LIMIT_BOT_PIN, INPUT_PULLUP);
  
  attachInterrupt(digitalPinToInterrupt(LIMIT_TOP_PIN), onLimitHit, FALLING);
  attachInterrupt(digitalPinToInterrupt(LIMIT_BOT_PIN), onLimitHit, FALLING);
  Serial.println("[SAFETY] Endstop interrupts armed.");
}

void loop() {
  if (emergencyStop) {
    Serial.println("[CRITICAL] Endstop hit! Stopping actuator relays immediately.");
    // Hardware stop motors
    while(1) { delay(100); }
  }
  delay(100);
}`,
      explanations: [
        { token: 'IRAM_ATTR', desc: 'Executes interrupt handler from internal RAM with zero flash-cache latency.' },
        { token: 'INPUT_PULLUP', desc: 'Activates internal pull-up keeping pin at 3.3V until switch shorts to GND.' }
      ]
    }
  ];

  const currentTemplate = templates.find(t => t.code === code) || templates[0];

  const handleCompile = () => {
    setIsCompiling(true);
    setCompileSuccess(null);
    const timestamp = new Date().toLocaleTimeString();

    setTimeout(() => {
      setIsCompiling(false);
      setCompileSuccess(true);
      setSerialOutput(prev => [
        ...prev,
        `[${timestamp}] Compilation started: esp32:esp32:esp32s3`,
        `[${timestamp}] Sketch uses 284120 bytes (8%) of program storage space.`,
        `[${timestamp}] Global variables use 21450 bytes (6%) of dynamic memory.`,
        `[${timestamp}] Upload complete via Native USB-JTAG. System executing loop()...`
      ]);
    }, 1200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SolarTracker_ESP32.ino';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <Code2 className="w-4 h-4" />
            ESP-IDF & Arduino IDE Workbench
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
            Code Playground & Serial Monitor
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Write, compile, simulate, and debug C++ firmware for the ESP32-S3 dual-axis solar tracker.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCompile}
            disabled={isCompiling}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-mono text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isCompiling ? 'animate-spin' : ''}`} />
            {isCompiling ? 'Compiling Sketch...' : 'Run Simulation'}
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-slate-700 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-slate-700 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Export .ino
          </button>
        </div>
      </div>

      {/* Code Templates Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-mono text-slate-500 shrink-0">Templates:</span>
        {templates.map((tpl, i) => (
          <button
            key={i}
            onClick={() => setCode(tpl.code)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all border ${
              code === tpl.code
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            {tpl.name}
          </button>
        ))}
      </div>

      {/* Main Grid: Code Editor on Left, Serial Monitor + API tokens on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Code Editor Window (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#090d16] border border-slate-800 shadow-xl overflow-hidden flex flex-col h-[650px]">
          {/* Editor Tab Bar */}
          <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-300 font-semibold ml-2">SolarTracker_ESP32.ino</span>
            </div>
            <span className="text-[11px] text-slate-500">Board: ESP32-S3 Dev Module (240MHz)</span>
          </div>

          {/* Interactive Code Textarea */}
          <div className="flex-1 relative flex">
            {/* Simulated Line numbers */}
            <div className="w-12 bg-slate-950/80 border-r border-slate-800/80 p-4 font-mono text-xs text-slate-600 select-none text-right space-y-1">
              {Array.from({ length: 30 }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="flex-1 p-4 bg-transparent font-mono text-xs text-slate-200 resize-none focus:outline-none leading-relaxed selection:bg-cyan-500/20"
            />
          </div>

          {/* Bottom compile status bar */}
          <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">Lines: {code.split('\n').length} | Characters: {code.length}</span>
            {compileSuccess && (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Compiled with 0 Errors
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Serial Monitor & API Syntax Breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Serial Monitor */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                Live Serial Monitor
              </h3>
              <div className="flex items-center gap-2">
                <select
                  value={baudRate}
                  onChange={(e) => setBaudRate(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded px-2 py-0.5 text-[10px] font-mono text-slate-300"
                >
                  <option value="9600">9600 baud</option>
                  <option value="115200">115200 baud</option>
                  <option value="921600">921600 baud</option>
                </select>
                <button
                  onClick={() => setSerialOutput([`[LOG CLEARED at ${new Date().toLocaleTimeString()}]`])}
                  className="text-[10px] font-mono text-slate-500 hover:text-slate-300"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-black border border-slate-800 p-3.5 font-mono text-xs text-emerald-400 space-y-1 h-[260px] overflow-y-auto shadow-inner flex flex-col justify-end">
              {serialOutput.map((line, idx) => (
                <div key={idx} className="leading-snug break-all">
                  {line}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Send serial command (e.g. JOG_EAST, STOP)..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value) {
                    setSerialOutput(prev => [...prev, `>> ${e.currentTarget.value}`]);
                    e.currentTarget.value = '';
                  }
                }}
                className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => setSerialOutput(prev => [...prev, '>> PING_STATUS'])}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-slate-700"
              >
                Send
              </button>
            </div>
          </div>

          {/* Embedded C++ Syntax Explanation Panel */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              API Syntax Engineering Breakdown
            </h3>
            
            <div className="space-y-2">
              {currentTemplate.explanations.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
                  <div className="text-xs font-mono text-cyan-400 font-bold">{item.token}</div>
                  <div className="text-[11px] text-slate-300 font-sans">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
