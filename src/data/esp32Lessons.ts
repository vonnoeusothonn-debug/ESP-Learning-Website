import { Lesson } from '../types';
import { getEnhancedLessonData } from './esp32LessonExtensions';

const RAW_ESP32_LESSONS: Lesson[] = [
  {
    id: 1,
    title: 'ESP32 គឺជាអ្វី? (What is ESP32?)',
    subtitle: 'ស្វែងយល់ពី Microcontroller ដ៏មានឥទ្ធិពលសម្រាប់ IoT និង Embedded Systems',
    category: 'Architecture',
    concept: 'ESP32 គឺជាបន្ទះឈីប System on a Chip (SoC) ដែលមានតម្លៃសមរម្យ ស៊ីថាមពលទាប និងមានភ្ជាប់មកជាមួយ Wi-Fi និង dual-mode Bluetooth (BLE) ស្រាប់។ បង្កើតឡើងដោយក្រុមហ៊ុន Espressif Systems វាបំពាក់នូវ Dual-Core 32-bit Xtensa LX7 ឬ RISC-V processor ដែលដំណើរការល្បឿនរហូតដល់ 240 MHz។',
    whatIsIt: 'ESP32 គឺជា Microcontroller ជំនាន់ថ្មីដែលរួមបញ្ចូល CPU, Memory (RAM/ROM), Wi-Fi, Bluetooth និង Peripherals ជាច្រើនលើបន្ទះឈីបតែមួយ (SoC)។ វាខុសពី Arduino Uno (ATmega328P 8-bit, 16MHz) ព្រោះវាជា 32-bit CPU ល្បឿនលឿន 240MHz និងមានភ្ជាប់ Wi-Fi/Bluetooth មកស្រាប់។',
    whyNeedIt: 'ក្នុងគម្រោង Final Year Project (FYP) ដូចជា Solar Tracker យើងត្រូវការគណនា Real-time (ទិន្នន័យពី BNO085 IMU, LDR, RTC) និងបញ្ជូនទិន្នន័យតាម Wi-Fi/MQTT ទៅ Node-RED Dashboard ក្នុងពេលតែមួយ។ Microcontroller តូចៗមិនអាចធ្វើការងារទាំងពីរនេះស្របគ្នាបានទេ ប៉ុន្តែ ESP32 អាចធ្វើបានយ៉ាងងាយស្រួល។',
    howItWorks: 'ESP32 មាន Core ពីរ (Core 0 និង Core 1)។ Core 0 អាចប្រើសម្រាប់គ្រប់គ្រង Wi-Fi, CAN Bus និង Communication Protocol រីឯ Core 1 អាចប្រើសម្រាប់រត់ Control Loop បញ្ជា Motor និងអាន Sensor ដោយប្រើប្រាស់ FreeRTOS។ Logic level របស់វាគឺ 3.3V។',
    diagram: `
┌────────────────────────────────────────────────────────┐
│                      ESP32-S3 SoC                      │
│ ┌─────────────────────────┐  ┌───────────────────────┐ │
│ │  Xtensa LX7 Dual-Core   │  │    512 KB SRAM        │ │
│ │     Up to 240 MHz       │  │    384 KB ROM         │ │
│ └─────────────────────────┘  └───────────────────────┘ │
│ ┌─────────────────────────┐  ┌───────────────────────┐ │
│ │   Wi-Fi 802.11 b/g/n    │  │  BLE 5.0 + Mesh       │ │
│ └─────────────────────────┘  └───────────────────────┘ │
│ ┌────────────────────────────────────────────────────┐ │
│ │ Peripherals: 45x GPIO, 2x 12-bit ADC, PWM, I2C,    │ │
│ │ SPI, UART, CAN (TWAI), USB-OTG, Capacitive Touch   │ │
│ └────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
    `,
    explanation: [
      'ESP32 ដំណើរការលើ CPU 32-bit ល្បឿន 240 MHz មាន SRAM ទំហំ 512KB និង Flash Memory ខាងក្រៅចាប់ពី 4MB ដល់ 16MB។',
      'មាន Hardware Cryptographic Acceleration (AES, SHA, RSA) សម្រាប់សុវត្ថិភាពការភ្ជាប់ Cloud IoT (TLS/HTTPS, MQTTS)។',
      'Logic Voltage គឺ 3.3V ដាច់ខាត! មិនត្រូវបញ្ចូលតង់ស្យុង 5V ទៅកាន់ GPIO ផ្ទាល់ឡើយ ព្រោះវានឹងធ្វើឱ្យខូចឈីបភ្លាមៗ។',
      'គាំទ្រ FreeRTOS ពីកំណើត អនុញ្ញាតឱ្យសរសេរ Multithreading Task ដំណើរការទន្ទឹមគ្នាបានយ៉ាងរលូន។'
    ],
    wiring: [
      { pinFrom: 'USB Port', pinTo: 'Type-C Cable', component: 'PC Host', note: 'ផ្តល់តង់ស្យុង 5V VBUS និងសម្រាប់ Flash Firmware តាម Serial' },
      { pinFrom: '3V3 Pin', pinTo: 'Multimeter V+', component: 'DMM', note: 'វាស់តេស្តមើលតង់ស្យុង Regulator ថាតើចេញ 3.28V - 3.32V ដែរឬទេ' },
      { pinFrom: 'GND Pin', pinTo: 'Multimeter COM', component: 'DMM', note: 'Ground យោងរួមសម្រាប់សៀគ្វីទាំងមូល' }
    ],
    codeExample: `void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("=== ESP32-S3 System Info ===");
  Serial.printf("Chip Model: %s\\n", ESP.getChipModel());
  Serial.printf("Chip Revision: %d\\n", ESP.getChipRevision());
  Serial.printf("CPU Cores: %d\\n", ESP.getChipCores());
  Serial.printf("CPU Freq: %d MHz\\n", ESP.getCpuFreqMHz());
  Serial.printf("Flash Size: %d MB\\n", ESP.getFlashChipSize() / (1024 * 1024));
  Serial.printf("Free Heap: %d bytes\\n", ESP.getFreeHeap());
}

void loop() {
  // មិនទាន់មានកិច្ចការក្នុង loop នៅឡើយ
  delay(5000);
}`,
    codeExplanation: [
      { token: 'Serial.begin(115200)', explanation: 'កំណត់ល្បឿនទំនាក់ទំនង UART0 ក្នុងកម្រិត 115200 Baud Rate សម្រាប់ Debug តាមកុំព្យូទ័រ' },
      { token: 'ESP.getChipModel()', explanation: 'ហៅ Register ខាងក្នុងរបស់បន្ទះឈីប ដើម្បីបង្ហាញឈ្មោះម៉ូដែល (ឧ. ESP32-S3)' },
      { token: 'ESP.getCpuFreqMHz()', explanation: 'បង្ហាញល្បឿននាឡិកា (Clock Frequency) បច្ចុប្បន្នរបស់ CPU (ជាទូទៅគឺ 240 MHz)' },
      { token: 'ESP.getFreeHeap()', explanation: 'អានទំហំ Free RAM (Heap Memory) ដែលនៅសល់សម្រាប់ Dynamic Allocation គិតជា Bytes' }
    ],
    howToTest: 'បើក Arduino IDE រួចជ្រើសរើស Board "ESP32S3 Dev Module" ហើយចុច Upload។ បន្ទាប់មកបើក Serial Monitor កំណត់ Baud Rate 115200 ដើម្បីពិនិត្យមើលលទ្ធផលព័ត៌មានប្រព័ន្ធ។',
    expectedOutput: `=== ESP32-S3 System Info ===
Chip Model: ESP32-S3
Chip Revision: 1
CPU Cores: 2
CPU Freq: 240 MHz
Flash Size: 8 MB
Free Heap: 388204 bytes`,
    commonErrors: [
      { error: 'A fatal error occurred: Failed to connect to ESP32', cause: 'ESP32 មិនបានចូល Bootloader Mode ឬខ្វះ Driver CH340 / CP2102', fix: 'ចុចប៊ូតុង BOOT ឱ្យជាប់ រួចចុចប៊ូតុង RESET មួយភ្លែត ហើយលែងប៊ូតុង BOOT មុនពេល Upload' },
      { error: 'Brownout detector was triggered', cause: 'ចរន្តផ្គត់ផ្គង់មិនគ្រប់គ្រាន់ (USB Port ផ្តល់ចរន្តតិចជាង 500mA ពេល Wi-Fi ចាប់ផ្តើមធ្វើការ)', fix: 'ប្រើប្រាស់ខ្សែ USB ដែលមានគុណភាពល្អ និងបន្ថែម Capacitor 10uF + 100nF នៅជិតជើង 3V3/GND' }
    ],
    miniExercise: {
      prompt: 'កែប្រែកូដខាងលើដើម្បីបង្ហាញម៉ោង Uptime របស់ ESP32 ដោយប្រើអនុគមន៍ millis() រៀងរាល់ 1 វិនាទីម្តងក្នុង void loop()។',
      hint: 'ប្រើ Serial.printf("Uptime: %lu ms\\n", millis()); រួច delay(1000); ក្នុង loop()'
    },
    fypApplication: {
      title: 'ការជ្រើសរើសខួរក្បាលបញ្ជា Solar Tracker',
      description: 'ESP32-S3 ត្រូវបានជ្រើសរើសជា Master Microcontroller នៃប្រព័ន្ធ Dual-Axis Solar Tracker ដោយសារវាមាន Core ពីរ អាចគណនា Sun Position Algorithm (SPA) ផង និងបញ្ជូនទិន្នន័យ Telemetry តាម Wi-Fi/CAN Bus ក្នុងពេលតែមួយដោយមិនកកស្ទះ។',
      hardwareConnected: 'ESP32-S3 WROOM-1 Module (N8R8 - 8MB Flash, 8MB PSRAM)'
    }
  },
  {
    id: 2,
    title: 'ស្ថាបត្យកម្ម ESP32-S3 (ESP32-S3 Architecture)',
    subtitle: 'សិក្សាពី Dual Xtensa LX7 Cores, Memory Map, Vector Instructions និង Pinout',
    category: 'Architecture',
    concept: 'ESP32-S3 គឺជា SoC ជំនាន់ថ្មីដែលត្រូវបានរចនាឡើងពិសេសសម្រាប់ AIoT និងប្រព័ន្ធគ្រប់គ្រងឧស្សាហកម្ម។ វាមាន Dual-core 32-bit Xtensa LX7 ល្បឿន 240 MHz ព្រមទាំងមាន Vector Instructions ជំនួយការគណនា Matrix និង Digital Signal Processing (DSP) យ៉ាងរហ័ស។',
    whatIsIt: 'ស្ថាបត្យកម្ម (Architecture) គឺជាគ្រោងឆ្អឹងខាងក្នុងរបស់ឈីប ដែលកំណត់អំពីរបៀបដែល CPU, Memory (SRAM, Flash, PSRAM), Bus Matrix និង Peripherals (GPIO, ADC, I2C, SPI) ភ្ជាប់ទំនាក់ទំនងគ្នា។',
    whyNeedIt: 'ការយល់ដឹងពី Architecture ជួយឱ្យយើងដឹងថា Core ណាត្រូវដំណើរការការងារអ្វី ជៀសវាងការប្រើ Pin ខុស (Strapping Pins) និងដឹងពីដែនកំណត់នៃ Memory ដើម្បីការពារកុំឱ្យ ESP32 គាំង (Crash) ពេលដំណើរការយូរ។',
    howItWorks: 'Core 0 (PRO_CPU) ដំណើរការប្រព័ន្ធ Protocol Stack ដូចជា Wi-Fi, Bluetooth, LwIP TCP/IP។ Core 1 (APP_CPU) ត្រូវបានទុកសម្រាប់អ្នកសរសេរកម្មវិធី (User Application Code) ដូចជា Sensor reading, Motor control និង Safety checking។',
    diagram: `
┌────────────────────────────────────────────────────────┐
│                   ESP32-S3 Bus Matrix                  │
│                                                        │
│  [Core 0: PRO CPU]         [Core 1: APP CPU]           │
│    (Wi-Fi / CAN)             (Motor / Sensor)          │
│          │                          │                  │
│          ▼                          ▼                  │
│   ═════════════════ Internal Bus ══════════════════    │
│          │                 │                │          │
│          ▼                 ▼                ▼          │
│     [512KB SRAM]      [384KB ROM]    [Octal PSRAM]     │
│          │                                             │
│          ▼                                             │
│   [Peripheral Bus] ──► GPIO / ADC / PWM / I2C / CAN    │
└────────────────────────────────────────────────────────┘
    `,
    explanation: [
      'មាន Vector Instructions (PIE) បង្កើនល្បឿនការគណនាត្រីកោណមាត្រ និង Kalman Filter សម្រាប់ IMU BNO085 ដល់ទៅ 3 ដង។',
      'បំពាក់ High-speed Octal SPI សម្រាប់ Flash និង PSRAM ផ្តល់ Bandwidth ខ្ពស់សម្រាប់ការផ្ទុកទិន្នន័យ Telemetry buffer។',
      'Native USB-OTG នៅលើ GPIO 19 (D-) និង GPIO 20 (D+) អាចប្រើសម្រាប់ Hardware JTAG Debugging និង Virtual COM Port ដោយមិនបាច់ប្រើបន្ទះឈីប USB-to-UART ក្រៅ។',
      'មាន Peripherals ពិសេសគឺ TWAI (Two-Wire Automotive Interface) ដែលត្រូវគ្នា 100% ជាមួយ CAN Bus 2.0B តាមស្តង់ដាររថយន្ត។'
    ],
    wiring: [
      { pinFrom: 'GPIO 19', pinTo: 'USB D-', component: 'Type-C Receptacle', note: 'ជើងសញ្ញា USB Data Minus សម្រាប់ Native USB CDC' },
      { pinFrom: 'GPIO 20', pinTo: 'USB D+', component: 'Type-C Receptacle', note: 'ជើងសញ្ញា USB Data Plus សម្រាប់ Native USB CDC' },
      { pinFrom: 'VDD_SPI', pinTo: '3.3V', component: 'Internal PSRAM', note: 'កុំភ្ជាប់បន្ទុកខាងក្រៅទៅជើងនេះ ព្រោះវាជាថាមពល Flash ខាងក្នុង' }
    ],
    codeExample: `void setup() {
  Serial.begin(115200);
  delay(500);

  Serial.printf("Setup running on Core: %d\\n", xPortGetCoreID());
  
  // បង្កើត Task មួយឱ្យរត់ដាច់ដោយឡែកនៅលើ Core 0
  xTaskCreatePinnedToCore(
    [](void* param) {
      while(1) {
        Serial.printf("[Core %d] Background Wi-Fi / CAN Task\\n", xPortGetCoreID());
        vTaskDelay(pdMS_TO_TICKS(2000));
      }
    },
    "CAN_Task",
    4096,
    NULL,
    1,
    NULL,
    0 // Pin ទៅ Core 0
  );
}

void loop() {
  Serial.printf("[Core %d] Main Motor Control Loop\\n", xPortGetCoreID());
  delay(1000);
}`,
    codeExplanation: [
      { token: 'xPortGetCoreID()', explanation: 'អនុគមន៍ FreeRTOS ដែលប្រាប់យើងថា Code ត្រង់កន្លែងនោះកំពុងរត់លើ Core ណា (0 ឬ 1)' },
      { token: 'xTaskCreatePinnedToCore()', explanation: 'បង្កើត Task ថ្មីមួយ ហើយចាក់សោ (Pin) ឱ្យរត់លើ CPU Core ជាក់លាក់មួយ' },
      { token: 'vTaskDelay()', explanation: 'បញ្ឈប់ Task ដោយមិនធ្វើឱ្យកកស្ទះ (Non-blocking) ដល់ Core ផ្សេងទៀត' }
    ],
    howToTest: 'Upload កូដទៅកាន់ ESP32-S3 ហើយសង្កេតមើល Serial Monitor។ អ្នកនឹងឃើញ Message មកពី Core 0 និង Core 1 ឆ្លាស់គ្នាដោយឯករាជ្យ។',
    expectedOutput: `Setup running on Core: 1
[Core 1] Main Motor Control Loop
[Core 0] Background Wi-Fi / CAN Task
[Core 1] Main Motor Control Loop`,
    commonErrors: [
      { error: 'Guru Meditation Error: Core 0 panic\'ed (StoreProhibited)', cause: 'សរសេរ Pointer ខុស ឬ Task Stack Size តូចពេក (Stack Overflow)', fix: 'បង្កើន Stack Size ពី 2048 ទៅ 4096 ឬ 8192 bytes និងត្រួតពិនិត្យ Null Pointer' },
      { error: 'ESP32 boots into download mode unexpectedly', cause: 'ជើង Strapping Pin GPIO 0 ឬ GPIO 46 ត្រូវបានទាញចុះ Ground ដោយសារសៀគ្វីខាងក្រៅ', fix: 'មិនត្រូវភ្ជាប់ Pull-down resistor ទៅជើង Strapping Pins នៅពេល boot ឡើយ' }
    ],
    miniExercise: {
      prompt: 'តេស្តមើលទំហំ PSRAM របស់ ESP32-S3 ដោយហៅអនុគមន៍ ESP.getPsramSize()។ តើវាបង្ហាញទំហំប៉ុន្មាន?',
      hint: 'សរសេរ Serial.printf("PSRAM: %d KB\\n", ESP.getPsramSize() / 1024); ក្នុង setup()'
    },
    fypApplication: {
      title: 'ការបែងចែកបន្ទុកការងារ Core 0 និង Core 1 ក្នុង Solar Tracker',
      description: 'នៅក្នុងប្រព័ន្ធ Solar Tracker យើងកំណត់ឱ្យ Core 1 រត់ PID Algorithm សម្រាប់បញ្ជា Elevation Actuator និង Azimuth Motor ដោយផ្អែកលើទិន្នន័យ IMU រៀងរាល់ 10ms ចំណែក Core 0 ទទួលបន្ទុកបញ្ជូនកញ្ចប់ទិន្នន័យ CAN Bus និង MQTT ទៅកាន់ Server។ វិធីនេះជួយឱ្យម៉ូទ័រដំណើរការយ៉ាងរលូន គ្មានការរអាក់រអួល។',
      hardwareConnected: 'Dual Core Processing Pipeline'
    }
  },
  {
    id: 3,
    title: 'GPIO គឺជាអ្វី? (General Purpose Input/Output)',
    subtitle: 'មូលដ្ឋានគ្រឹះនៃជើងបញ្ជា Digital Input/Output, Strapping Pins និងការការពារ',
    category: 'Hardware',
    concept: 'GPIO (General Purpose Input/Output) គឺជា pin របស់ ESP32 ដែលអាចប្រើសម្រាប់ទទួល Input (ដូចជា Sensor, Switch) ឬបញ្ជូន Output (ដូចជាបញ្ជា LED, Relay, Motor Driver)។ គ្រប់ GPIO ទាំងអស់ដំណើរការនៅ Logic 3.3V។',
    whatIsIt: 'GPIO គឺជាជើងទំនាក់ទំនងទូទៅដែលអាចកំណត់តាមរយៈកូដ Firmware ឱ្យដើរតួជា Input ឬ Output។ វាក៏អាចភ្ជាប់ទៅកាន់មុខងារពិសេស (Peripherals) ដូចជា PWM, I2C, SPI ឬ ADC តាមរយៈ GPIO Multiplexer ខាងក្នុងរបស់ ESP32។',
    whyNeedIt: 'បើគ្មាន GPIO ទេ ESP32 មិនអាចបញ្ជាឧបករណ៍ខាងក្រៅណាមួយបានឡើយ។ យើងត្រូវប្រើ GPIO ដើម្បីបញ្ជា Relay បើកចរន្តឱ្យ Linear Actuator, បញ្ជូនសញ្ញា Pulse ទៅ Stepper Driver និងអាន Limit Switch។',
    howItWorks: 'ពេលកំណត់ជា OUTPUT ជើង GPIO នឹងបញ្ចេញតង់ស្យុង 3.3V (HIGH) ឬ 0V (LOW)។ ចរន្តអតិបរមាដែលជើងនីមួយៗអាចផ្តល់បានគឺត្រឹម 20mA ដល់ 40mA ប៉ុណ្ណោះ។ ពេលកំណត់ជា INPUT វាមាន Internal Pull-up/Pull-down Resistor (ប្រហែល 45kΩ) ដែលអាចបើកបានតាមកូដ។',
    diagram: `
 ┌────────────────────────────────────────────────────────┐
 │                   ESP32-S3 GPIO Matrix                 │
 │                                                        │
 │                   ┌─── Internal Pull-up (45kΩ) ── 3.3V │
 │                   ├─── Internal Pull-down (45kΩ) ── GND│
 │   GPIO Pin ◄──────┼─── Input Buffer (Schmitt Trigger)  │
 │                   └─── Output Driver (Push-Pull/OD)    │
 │                             ▲                          │
 │                             │                          │
 │                 Firmware: HIGH(3.3V) / LOW(0V)         │
 └────────────────────────────────────────────────────────┘
    `,
    explanation: [
      'ESP32-S3 មាន GPIO ចំនួនរហូតដល់ 45 ជើង ប៉ុន្តែមិនមែនគ្រប់ជើងសុទ្ធតែអាចប្រើតាមចិត្តបាននោះទេ។',
      'ជើង Strapping Pins (ដូចជា GPIO 0, 3, 45, 46) កំណត់ទម្រង់ Booting (SPI Voltage, Download Mode) ដូច្នេះត្រូវប្រយ័ត្នក្នុងការភ្ជាប់សៀគ្វីខាងក្រៅ។',
      'ជើង Input-Only (នៅលើ ESP32 ធម្មតាគឺ GPIO 34-39) គ្មាន Output Driver ឬ Internal Pull-up ទេ (នៅលើ S3 ជើងភាគច្រើនអាចធ្វើ Input/Output បាន)។',
      'មិនត្រូវប្រើ GPIO បើកបរ Relay ឬ Motor ដោយផ្ទាល់ឡើយ! ត្រូវតែប្រើ Transistor, MOSFET ឬ Optocoupler ដើម្បីការពារ MCU។'
    ],
    wiring: [
      { pinFrom: 'GPIO 4', pinTo: 'Resistor 220Ω', component: 'LED Anode', note: 'ជើង Output សម្រាប់បញ្ជា LED ដោយមាន Resistor កាត់បន្ថយចរន្ត' },
      { pinFrom: 'LED Cathode', pinTo: 'GND', component: 'ESP32 GND', note: 'ត្រឡប់ទៅ Ground វិញ' },
      { pinFrom: 'GPIO 5', pinTo: 'Push Button', component: 'Switch', note: 'ជើង Input សម្រាប់អានប៊ូតុងដោយប្រើ INPUT_PULLUP' }
    ],
    codeExample: `// កំណត់ឈ្មោះជើង Pin
#define LED_PIN    4
#define BUTTON_PIN 5

void setup() {
  Serial.begin(115200);
  
  // កំណត់ GPIO 4 ជា OUTPUT ដើម្បីបញ្ជា LED
  pinMode(LED_PIN, OUTPUT);
  
  // កំណត់ GPIO 5 ជា INPUT_PULLUP ដើម្បីអានប៊ូតុងដោយមិនបាច់តរេស៊ីស្តង់ក្រៅ
  pinMode(BUTTON_PIN, INPUT_PULLUP);
}

void loop() {
  // អានស្ថានភាពពីប៊ូតុង (LOW មានន័យថាប៊ូតុងត្រូវបានចុច)
  int btnState = digitalRead(BUTTON_PIN);
  
  if (btnState == LOW) {
    digitalWrite(LED_PIN, HIGH); // បើក LED
    Serial.println("ប៊ូតុងត្រូវបានចុច -> LED ភ្លឺ!");
  } else {
    digitalWrite(LED_PIN, LOW);  // បិទ LED
  }
  
  delay(50); // Debounce delay បន្តិចបន្តួច
}`,
    codeExplanation: [
      { token: 'pinMode(pin, mode)', explanation: 'កំណត់មុខងាររបស់ GPIO ថាជា OUTPUT, INPUT ឬ INPUT_PULLUP' },
      { token: 'digitalWrite(pin, val)', explanation: 'បញ្ជាបញ្ចេញតង់ស្យុង 3.3V (HIGH) ឬ 0V (LOW) ទៅកាន់ជើងនោះ' },
      { token: 'digitalRead(pin)', explanation: 'អានកម្រិត Logic ពីជើង Input (ទទួលបានតម្លៃ HIGH=1 ឬ LOW=0)' },
      { token: 'INPUT_PULLUP', explanation: 'បើក Resistor 45kΩ ភ្ជាប់ទៅ 3.3V ខាងក្នុងឈីប ការពារកុំឱ្យជើង Input អណ្តែត (Floating)' }
    ],
    howToTest: 'តខ្សែ LED ជាមួយ Resistor 220Ω ទៅកាន់ GPIO 4 និងតប៊ូតុងទៅ GPIO 5 ភ្ជាប់ទៅ GND។ ចុចប៊ូតុងដើម្បីមើល LED ភ្លឺ និងពិនិត្យមើលข้อความលើ Serial Monitor។',
    expectedOutput: `ប៊ូតុងត្រូវបានចុច -> LED ភ្លឺ!
ប៊ូតុងត្រូវបានចុច -> LED ភ្លឺ!`,
    commonErrors: [
      { error: 'LED ភ្លឺខ្សោយខ្លាំង ឬមិនភ្លឺទាល់តែសោះ', cause: 'ភ្លេចដាក់ pinMode(LED_PIN, OUTPUT) ក្នុង setup() ធ្វើឱ្យ GPIO នៅជា Input', fix: 'បន្ថែម pinMode(LED_PIN, OUTPUT) ក្នុងអនុគមន៍ void setup()' },
      { error: 'ESP32 មិនព្រម Boot នៅពេលបើកភ្លើង', cause: 'បានតឧបករណ៍ដែលទាញជើង Strapping Pin (GPIO 0) ទៅ LOW ដោយស្វ័យប្រវត្តិ', fix: 'ប្តូរទៅប្រើ GPIO ផ្សេងទៀតដែលមិនមែនជា Strapping Pin (ឧ. GPIO 4, 5, 6, 7)' }
    ],
    miniExercise: {
      prompt: 'កែប្រែកូដដើម្បីឱ្យ LED ភ្លឹបភ្លែត (Blink) 3 ដងរាល់ពេលដែលចុចប៊ូតុងម្តង។',
      hint: 'ប្រើ for loop: for(int i=0; i<3; i++) { digitalWrite(LED_PIN, HIGH); delay(200); digitalWrite(LED_PIN, LOW); delay(200); }'
    },
    fypApplication: {
      title: 'ការប្រើប្រាស់ GPIO សម្រាប់ Emergency Stop និង Limit Switch',
      description: 'នៅក្នុង Solar Tracker ជើង GPIO ត្រូវបានប្រើសម្រាប់ភ្ជាប់ Limit Switch ចំនួន 4 (East, West, Upper, Lower) និងប៊ូតុង Emergency Stop ដោយប្រើ INPUT_PULLUP។ នៅពេល Tracker បង្វិលដល់កម្រិតកំណត់ វានឹងប៉ះ Switch ទាញ GPIO ទៅ LOW ដើម្បីកាត់ផ្តាច់ចរន្តម៉ូទ័រភ្លាមៗ។',
      hardwareConnected: 'Industrial Limit Switches & E-Stop Button'
    }
  },
  {
    id: 4,
    title: 'Digital Input & Debouncing',
    subtitle: 'ការអានសញ្ញាឌីជីថល Push Button, Limit Switch និងបច្ចេកទេស Hardware/Software Debouncing',
    category: 'Hardware',
    concept: 'Digital Input អនុញ្ញាតឱ្យ ESP32 ដឹងពីស្ថានភាពពីរគឺ HIGH (3.3V) ឬ LOW (0V)។ បញ្ហាធំបំផុតនៃ Mechanical Switch គឺ Switch Bouncing (ការលោតរំញ័រសញ្ញាអគ្គិសនីក្នុងរយៈពេលប៉ុន្មាន Milliseconds) ដែលតម្រូវឱ្យមានការ Debounce។',
    whatIsIt: 'Digital Input គឺជាវិធីអានសញ្ញាដែលដាច់ស្រឡះរវាង 0 និង 1។ Debouncing គឺជាបច្ចេកទេសលុបបំបាត់ Noise ឬរំញ័រមេកានិកដែលកើតឡើងនៅពេលទំនាក់ទំនងដែករបស់ Switch ប៉ះគ្នា។',
    whyNeedIt: 'បើគ្មាន Debounce ទេ ការចុចប៊ូតុងម្តងអាចធ្វើឱ្យ ESP32 យល់ច្រឡំថាអ្នកចុច 10 ទៅ 20 ដងក្នុងមួយប៉ព្រិចភ្នែក។ ក្នុង Solar Tracker ប្រសិនបើ Limit Switch មាន Bouncing ប្រព័ន្ធអាចគិតថាវាដំណើរការខុសប្រក្រតី។',
    howItWorks: 'យើងអាចដោះស្រាយបាន 2 របៀប៖ 1. Software Debounce (រង់ចាំពិនិត្យពេលវេលាតាម millis() ប្រមាណ 20-50ms) ឬ 2. Hardware Debounce (ប្រើ RC Low Pass Filter: Resistor 10kΩ + Capacitor 100nF)។',
    diagram: `
 Mechanical Switch Bounce (No Debounce):
 Signal: ──┐ ┌┐┌┐┌────────────────── (Spurious transitions trigger false clicks!)
           └─┘└┘└┘
 
 Clean Debounced Signal:
 Signal: ──┐                        (Clean single falling edge)
           └────────────────────────
    `,
    explanation: [
      'កុំប្រើអនុគមន៍ delay() យូរៗដើម្បី debounce ព្រោះវានឹងធ្វើឱ្យ CPU គាំងមិនអាចធ្វើការងារផ្សេងទៀតបាន (Blocking code)។',
      'បច្ចេកទេស Non-blocking debouncing ប្រើប្រាស់អនុគមន៍ millis() ដើម្បីវាស់ចន្លោះពេលចុងក្រោយដែលសញ្ញាបានផ្លាស់ប្តូរ។',
      'សម្រាប់ប្រព័ន្ធឧស្សាហកម្ម ការប្រើប្រាស់ Hardware Debounce (RC Filter + Schmitt Trigger) ផ្តល់សុវត្ថិភាពខ្ពស់បំផុតប្រឆាំងនឹង EMI Noise។',
      'ទាញយកប្រយោជន៍ពី Internal Pull-up resistor ដើម្បីសន្សំសំចៃគ្រឿងបន្លាស់លើ PCB។'
    ],
    wiring: [
      { pinFrom: 'GPIO 6', pinTo: 'Switch Terminal 1', component: 'Limit Switch NO', note: 'ជើង Signal Input របស់ ESP32' },
      { pinFrom: 'Switch Terminal 2', pinTo: 'GND', component: 'Common GND', note: 'ពេលចុច វានឹងទាញជើង GPIO 6 ទៅកាន់ GND (LOW)' }
    ],
    codeExample: `const int SWITCH_PIN = 6;
int lastButtonState = HIGH;
int buttonState = HIGH;
unsigned long lastDebounceTime = 0;
const unsigned long debounceDelay = 50; // 50 milliseconds

void setup() {
  Serial.begin(115200);
  pinMode(SWITCH_PIN, INPUT_PULLUP);
}

void loop() {
  int reading = digitalRead(SWITCH_PIN);

  // ប្រសិនបើសញ្ញាផ្លាស់ប្តូរ ចាប់ផ្តើមកត់ត្រាពេល
  if (reading != lastButtonState) {
    lastDebounceTime = millis();
  }

  // ប្រសិនបើកន្លងផុត 50ms ហើយសញ្ញានៅតែដដែល ទើបទទួលស្គាល់
  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (reading != buttonState) {
      buttonState = reading;
      if (buttonState == LOW) {
        Serial.println("[EVENT] Limit Switch ត្រូវបានប៉ះ (Activated)!");
      } else {
        Serial.println("[EVENT] Limit Switch បានលែងវិញ (Released)!");
      }
    }
  }

  lastButtonState = reading;
}`,
    codeExplanation: [
      { token: 'millis()', explanation: 'ត្រឡប់ចំនួន Milliseconds ដែលបានកន្លងផុតតាំងពី ESP32 ចាប់ផ្តើមដំណើរការ' },
      { token: 'lastDebounceTime', explanation: 'អថេរសម្រាប់រក្សាទុកពេលចុងក្រោយបំផុតដែលសញ្ញាមានការផ្លាស់ប្តូរ' },
      { token: 'debounceDelay = 50', explanation: 'រយៈពេលច្រោះរំញ័រមេកានិក (50ms គឺជាកម្រិតស្តង់ដារល្អបំផុត)' }
    ],
    howToTest: 'តភ្ជាប់ប៊ូតុងចុចទៅ GPIO 6 និង GND។ ចុចចុច-លែងយ៉ាងលឿន ហើយពិនិត្យមើល Serial Monitor។ អ្នកនឹងឃើញមាន Message តែមួយគត់ក្នុងមួយដងនៃការចុច។',
    expectedOutput: `[EVENT] Limit Switch ត្រូវបានប៉ះ (Activated)!
[EVENT] Limit Switch បានលែងវិញ (Released)!`,
    commonErrors: [
      { error: 'សញ្ញាលោតញាប់ស្អេកស្កះពេលយកដៃប៉ះខ្សែ', cause: 'ជើង GPIO អណ្តែត (Floating Input) ដោយសារភ្លេចបើក Internal Pull-up', fix: 'ប្តូរពី pinMode(pin, INPUT) ទៅជា pinMode(pin, INPUT_PULLUP)' }
    ],
    miniExercise: {
      prompt: 'បង្កើតអថេរ Counter មួយដើម្បីរាប់ចំនួនដងដែល Limit Switch ត្រូវបានប៉ះ ហើយបង្ហាញលើ Serial Monitor។',
      hint: 'ប្រកាស int hitCount = 0; រួចបន្ថែម hitCount++; Serial.printf("Total Hits: %d\\n", hitCount); នៅពេល buttonState == LOW'
    },
    fypApplication: {
      title: 'ការការពារយន្តការម៉ូទ័រ Solar Tracker ពីការបុកទង្គិច',
      description: 'Limit Switch ដើរតួជាសុវត្ថិភាពចុងក្រោយ (Hardware Interlock)។ នៅពេលដែល Elevation Actuator រុញបន្ទះសូឡាឡើងដល់មុំអតិបរមា 60 ដឺក្រេ កុងតាក់នឹងបិទសៀគ្វី។ Debounce algorithm ការពារកុំឱ្យម៉ូទ័រញ័រ ឬកន្ត្រាក់ដោយសារ Noise មកពីរន្ទះ ឬម៉ូទ័រធំៗនៅជិតនោះ។',
      hardwareConnected: 'IP67 Sealed Roller-lever Limit Switch'
    }
  },
  {
    id: 5,
    title: 'Digital Output & Relay/MOSFET Control',
    subtitle: 'ការបញ្ជាឧបករណ៍បន្ទុកខ្ពស់ (Inductive Loads), Flyback Diode និង Gate Driver',
    category: 'Electronics',
    concept: 'Digital Output អនុញ្ញាតឱ្យ ESP32 បញ្ចេញសញ្ញាបញ្ជាទៅកាន់ឧបករណ៍ខាងក្រៅ។ ដោយសារ GPIO អាចបញ្ចេញចរន្តត្រឹមតែ 20mA និងតង់ស្យុង 3.3V យើងត្រូវការ Switching Transistor, N-Channel MOSFET ឬ Relay Driver ដើម្បីបញ្ជាបន្ទុក DC 12V/24V ដូចជាម៉ូទ័រ និង Actuator។',
    whatIsIt: 'Digital Output គឺជាសមត្ថភាពរបស់ជើង GPIO ក្នុងការផ្តល់តង់ស្យុង Logic HIGH (3.3V) ឬ LOW (0V)។ ដើម្បីបើកឧបករណ៍ស៊ីភ្លើងធំ យើងប្រើវាជាសញ្ញាបញ្ជា (Trigger) ទៅកាន់ Gate របស់ MOSFET ឬ Coil របស់ Relay។',
    whyNeedIt: 'Linear Actuator នៃ Solar Tracker ដំណើរការនៅតង់ស្យុង 24V និងស៊ីចរន្តរហូតដល់ 3A ទៅ 5A ពេលផ្ទុកបន្ទុកខ្យល់បោកបក់។ បើយើងតវាទៅ ESP32 ដោយផ្ទាល់ ឈីបនឹងឆេះភ្លាមៗក្នុងពេល 1 មីលីវិនាទី! ដូច្នេះយើងត្រូវប្រើ MOSFET/H-Bridge Driver។',
    howItWorks: 'តង់ស្យុង 3.3V ពី GPIO នឹងបញ្ចូលទៅ Gate របស់ Logic-Level MOSFET (ដូចជា IRLZ44N ឬ AO4406) ដើម្បីឱ្យ Drain-Source បើកចរន្ត 24V ឆ្លងកាត់ម៉ូទ័រ។ ត្រូវតែមាន Flyback Diode (1N5819 ឬ SS34) ស្របបញ្ច្រាសនឹងម៉ូទ័រ ដើម្បីបន្សាប Inductive Kickback Voltage ពេលបិទម៉ូទ័រ។',
    diagram: `
              +24V DC Supply (Motor Power)
                  │
                  ├───[ Flyback Diode 1N5819 (Cathode) ]
                  │       ▲
            ┌─────┴───────┴─────┐
            │   Linear Actuator │ (Inductive DC Motor)
            └─────┬───────┬─────┘
                  │       ▼ (Anode)
                  ├───[ Flyback Diode ]
                  │
             Drain (D)
               │
 GPIO ──[100Ω]─┼── Gate (G) N-Channel MOSFET (IRLZ44N)
               │
             [10kΩ] (Gate-to-Source Pull-Down)
               │
            Source (S)
               │
              GND (Common Ground)
    `,
    explanation: [
      'Resistor 100Ω នៅ Gate ការពារកុំឱ្យមាន Inrush Current ធំចូលទៅ Gate Capacitance ដែលអាចធ្វើឱ្យខូចជើង GPIO របស់ ESP32។',
      'Resistor 10kΩ Pull-down ធានាថា MOSFET នឹងបិទ (OFF) ដាច់ខាតនៅពេល ESP32 កំពុង Reset ឬ Booting។',
      'Flyback Diode (Schottky) ការពារ MOSFET កុំឱ្យឆេះដោយសារតង់ស្យុងបញ្ច្រាសខ្ពស់ (Back-EMF) ដែលកើតចេញពី Motor Coil ពេលបិទចរន្ត។',
      'ត្រូវតែត Common Ground រវាង ESP32 GND (3.3V) និង Motor Supply GND (24V) ដើម្បីឱ្យ Gate Voltage មានចំណុចយោងត្រឹមត្រូវ។'
    ],
    wiring: [
      { pinFrom: 'GPIO 7', pinTo: 'Resistor 100Ω to Gate', component: 'IRLZ44N MOSFET', note: 'ជើងសញ្ញា PWM/Digital Output សម្រាប់បញ្ជាបើកបិទ' },
      { pinFrom: 'MOSFET Source', pinTo: 'GND', component: 'Common GND', note: 'ភ្ជាប់ទៅកាន់ Ground រួមនៃប្រព័ន្ធ' },
      { pinFrom: 'MOSFET Drain', pinTo: 'Motor Negative (-)', component: '24V Actuator', note: 'ខ្សែបន្ទុកដែលត្រូវបើកបិទចុះ Ground (Low-side switch)' }
    ],
    codeExample: `#define ACTUATOR_ENABLE_PIN 7

void setup() {
  Serial.begin(115200);
  pinMode(ACTUATOR_ENABLE_PIN, OUTPUT);
  digitalWrite(ACTUATOR_ENABLE_PIN, LOW); // បិទដំបូងដើម្បីសុវត្ថិភាព
  Serial.println("Actuator Controller Ready.");
}

void loop() {
  Serial.println("បើកដំណើរការ Linear Actuator រយៈពេល 3 វិនាទី...");
  digitalWrite(ACTUATOR_ENABLE_PIN, HIGH); // បើក MOSFET
  delay(3000);

  Serial.println("បញ្ឈប់ Actuator រយៈពេល 5 វិនាទី...");
  digitalWrite(ACTUATOR_ENABLE_PIN, LOW);  // បិទ MOSFET
  delay(5000);
}`,
    codeExplanation: [
      { token: 'pinMode(ACTUATOR_ENABLE_PIN, OUTPUT)', explanation: 'កំណត់ GPIO 7 ជា Output ដើម្បីបញ្ចេញសញ្ញាបញ្ជា Gate' },
      { token: 'digitalWrite(pin, HIGH)', explanation: 'បញ្ជូន 3.3V ទៅកាន់ Gate បើកច្រក Drain-Source ឱ្យម៉ូទ័រដើរ' },
      { token: 'digitalWrite(pin, LOW)', explanation: 'បញ្ជូន 0V ទៅ Gate បិទច្រក Drain-Source កាត់ផ្តាច់ចរន្តម៉ូទ័រ' }
    ],
    howToTest: 'ប្រើ Multimeter វាស់តង់ស្យុងនៅចន្លោះ Drain និង Source។ ពេល HIGH ត្រូវធ្លាក់មកជិត 0V (MOSFET ON) ហើយពេល LOW ត្រូវឡើងដល់ 24V (MOSFET OFF)។',
    expectedOutput: `Actuator Controller Ready.
បើកដំណើរការ Linear Actuator រយៈពេល 3 វិនាទី...
បញ្ឈប់ Actuator រយៈពេល 5 វិនាទី...`,
    commonErrors: [
      { error: 'MOSFET ក្តៅខ្លាំងរហូតដល់ផ្សែងហុយ', cause: 'ប្រើ MOSFET ដែលត្រូវការ Gate Voltage 10V (Standard MOSFET មិនមែន Logic-Level) ធ្វើឱ្យ Rds(on) ខ្ពស់', fix: 'ជ្រើសរើស Logic-Level N-MOSFET (Vgs(th) < 2V ដូចជា IRLZ44N, AO3400) ឬប្រើ Gate Driver IC' },
      { error: 'ESP32 ចេះតែ Reset ដោយខ្លួនឯងរាល់ពេលម៉ូទ័របិទ', cause: 'ខ្វះ Flyback Diode បណ្តាលឱ្យ Back-EMF ជ្រៀតចូលប្រព័ន្ធភ្លើង', fix: 'ដាក់ Schottky Diode (SS34 ឬ 1N5819) ស្របបញ្ច្រាសនឹងខ្សែ Motor' }
    ],
    miniExercise: {
      prompt: 'បង្កើតអនុគមន៍ void moveActuator(int durationMs) ដើម្បីបញ្ជាឱ្យ Actuator ដំណើរការតាមចំនួនម៉ោងដែលចង់បាន។',
      hint: 'សរសេរ void moveActuator(int ms) { digitalWrite(ACTUATOR_ENABLE_PIN, HIGH); delay(ms); digitalWrite(ACTUATOR_ENABLE_PIN, LOW); }'
    },
    fypApplication: {
      title: 'ការបញ្ជាទិសដៅនិងការលើកបន្ទះសូឡា',
      description: 'នៅក្នុង Solar Tracker សៀគ្វី H-Bridge (ដូចជា VNH5019 ឬ BTS7960) ត្រូវបានបញ្ជាដោយ Digital Outputs ចំនួន 4 ជើងពី ESP32 ដើម្បីប្តូរទិសដៅរុញទៅមុខ (Extend) និងទាញថយក្រោយ (Retract) នៃ Elevation Actuator តាមគន្លងព្រះអាទិត្យ។',
      hardwareConnected: 'Dual BTS7960 43A High-Power H-Bridge Module'
    }
  },
  {
    id: 6,
    title: 'ADC គឺជាអ្វី? (Analog to Digital Converter)',
    subtitle: 'ការអានតង់ស្យុងអាណាឡូក 12-bit Resolution, Attenuation, Non-Linearity និង Calibration',
    category: 'Peripherals',
    concept: 'ADC (Analog to Digital Converter) គឺជា Peripheral ខាងក្នុងរបស់ ESP32 ដែលបំប្លែងតង់ស្យុង Analog បន្ត (0V ដល់ 3.3V) ទៅជាលេខឌីជីថល (0 ដល់ 4095 ក្នុងកម្រិត 12-bit)។ វាត្រូវបានប្រើសម្រាប់អាន Sensor ដូចជា LDR, Potentiometer និង Current Sensor។',
    whatIsIt: 'ADC គឺជាអ្នកបកប្រែពីពិភពពិត (តង់ស្យុងអគ្គិសនី) ទៅជាលេខដែលកុំព្យូទ័រយល់។ ESP32-S3 មាន ADC ពីរគឺ ADC1 (ជើង GPIO 1-10) និង ADC2 (ជើង GPIO 11-20)។',
    whyNeedIt: 'ដើម្បីឱ្យ Solar Tracker ដឹងថាពន្លឺថ្ងៃនៅខាងកើត ឬខាងលិចខ្លាំងជាង យើងប្រើ LDR (Light Dependent Resistor) ចំនួន 4 គ្រាប់។ LDR ផ្តល់ទិន្នន័យជាកម្រិតតង់ស្យុង ដូច្នេះ ESP32 ត្រូវការ ADC ដើម្បីអាននិងប្រៀបធៀបកម្រិតពន្លឺ។',
    howItWorks: 'ADC របស់ ESP32 ប្រើបច្ចេកវិទ្យា Successive Approximation Register (SAR)។ តាមរយៈការកំណត់ Attenuation (កាត់បន្ថយតង់ស្យុងខាងក្នុង) យើងអាចវាស់តង់ស្យុងពេញលេញរហូតដល់ ~3.1V (នៅ 11dB attenuation)។ ត្រូវដឹងថា ADC2 មិនអាចប្រើបានទេនៅពេលដែល Wi-Fi កំពុងដំណើរការ ដូច្នេះត្រូវប្រើ ADC1 ជានិច្ច!',
    diagram: `
 LDR Sensor + Voltage Divider Circuit:
 
        +3.3V
          │
        ┌─┴─┐
        │   │ LDR (Resistance decreases when light increases)
        └─┬─┘
          ├────────► ESP32 GPIO 1 (ADC1_CH0)  ---> [ 12-bit ADC SAR ]
        ┌─┴─┐                                          │
        │   │ 10kΩ Fixed Resistor                      ▼
        └─┬─┘                                    Digital Value: 0 - 4095
          │
         GND
    `,
    explanation: [
      'Resolution 12-bit ផ្តល់តម្លៃចាប់ពី 0 ដល់ 4095 ($2^{12} - 1$) ស្មើនឹងជំហានតង់ស្យុងប្រហែល 0.8mV ក្នុងមួយជំហាន។',
      'ESP32 ADC មានបញ្ហា Non-Linearity នៅជិត 0V (ក្រោម 0.1V) និងជិត 3.3V (លើស 3.15V)។ ដូច្នេះត្រូវប្រើ esp_adc_cal APIs ដើម្បី Calibrate។',
      'ត្រូវតែប្រើជើង ADC1 (GPIO 1 ដល់ GPIO 10 នៅលើ ESP32-S3) សម្រាប់ Sensor ព្រោះ ADC2 ត្រូវបានប្រើប្រាស់ដោយ Wi-Fi Driver។',
      'ដើម្បីទទួលបានតម្លៃស្ងប់ល្អ គ្មាន Noise ត្រូវបន្ថែម Capacitor 100nF Ceramic ស្របនឹងជើង Analog Input ទៅកាន់ GND។'
    ],
    wiring: [
      { pinFrom: 'GPIO 1 (ADC1_CH0)', pinTo: 'Divider Junction', component: 'LDR + 10kΩ', note: 'ជើងអានតង់ស្យុងអាណាឡូកពី LDR Divider' },
      { pinFrom: 'LDR Top', pinTo: '3.3V', component: 'ESP32 3V3', note: 'ប្រភពតង់ស្យុងផ្គត់ផ្គង់ Sensor' },
      { pinFrom: '10k Resistor Bottom', pinTo: 'GND', component: 'ESP32 GND', note: 'Ground នៃ Voltage Divider' }
    ],
    codeExample: `// ប្រើជើង ADC1
#define LDR_EAST_PIN 1

void setup() {
  Serial.begin(115200);
  
  // កំណត់ Resolution 12-bit (0-4095)
  analogReadResolution(12);
  
  // កំណត់ Attenuation 11dB ដើម្បីអាចវាស់បានរហូតដល់ ~3.1V
  analogSetAttenuation(ADC_11db);
  
  Serial.println("LDR ADC Reader Initialized.");
}

void loop() {
  // អានមធ្យមភាគ 10 ដងដើម្បីកាត់បន្ថយ Noise (Oversampling)
  long sum = 0;
  for (int i = 0; i < 10; i++) {
    sum += analogRead(LDR_EAST_PIN);
    delay(2);
  }
  int rawADC = sum / 10;
  
  // គណនាជាតង់ស្យុងជាក់ស្តែង (mV)
  float voltage = (rawADC / 4095.0) * 3.3;

  Serial.printf("Raw ADC: %4d | Voltage: %.2f V | Lux Level: %s\\n", 
                rawADC, voltage, (rawADC > 2500) ? "ពន្លឺខ្លាំង (Sunny)" : "ម្លប់ (Shaded)");

  delay(500);
}`,
    codeExplanation: [
      { token: 'analogReadResolution(12)', explanation: 'កំណត់ទំហំ Resolution របស់ ADC ទៅជា 12-bit (តម្លៃ 0 ដល់ 4095)' },
      { token: 'analogSetAttenuation(ADC_11db)', explanation: 'កំណត់កម្រិត Attenuation 11dB ដើម្បីឱ្យវាស់តង់ស្យុងពេញលេញ 0V ដល់ 3.1V' },
      { token: 'analogRead(pin)', explanation: 'អានតម្លៃឌីជីថលផ្ទាល់ពីជើង ADC ជាក់លាក់' }
    ],
    howToTest: 'យកពិលទូរសព្ទមកបញ្ចាំងលើ LDR រួចយកដៃបាំង។ សង្កេតមើលតម្លៃ Raw ADC ប្រែប្រួលពី ~200 (ងងឹត) ឡើងដល់លើស 3500 (ពន្លឺថ្ងៃខ្លាំង)។',
    expectedOutput: `Raw ADC:  450 | Voltage: 0.36 V | Lux Level: ម្លប់ (Shaded)
Raw ADC: 3420 | Voltage: 2.76 V | Lux Level: ពន្លឺខ្លាំង (Sunny)`,
    commonErrors: [
      { error: 'analogRead() ត្រឡប់តម្លៃ 4095 រហូត ឬ 0 រហូត', cause: 'តខ្សែភ្លាត់ ឬប្រើជើង ADC2 ខណៈពេលដែល Wi-Fi កំពុងភ្ជាប់', fix: 'ប្តូរជើង Sensor មកកាន់ជើង ADC1 (GPIO 1-10) និងពិនិត្យការតសៀគ្វី Voltage Divider' },
      { error: 'តម្លៃអានបានលោតចុះឡើងញាប់ខ្លាំង (Noise)', cause: 'ខ្វះ Decoupling Capacitor និងខ្សែតភ្ជាប់វែងពេក', fix: 'ដាក់ Capacitor 100nF នៅចន្លោះជើង Analog Pin និង GND រួមទាំងប្រើកូដ Averaging Filter' }
    ],
    miniExercise: {
      prompt: 'តេស្តអាន LDR ពីរគ្រាប់ (East និង West) រួចគណនាផលដក (Difference = East - West) ដើម្បីដឹងថាតើត្រូវបង្វិលទៅទិសណា។',
      hint: 'int diff = analogRead(LDR_EAST) - analogRead(LDR_WEST); if (diff > 200) moveEast(); else if (diff < -200) moveWest();'
    },
    fypApplication: {
      title: 'ប្រព័ន្ធចាប់ពន្លឺព្រះអាទិត្យ 4-Quadrant LDR Sensor',
      description: 'ក្បាលសេនស័ររបស់ Solar Tracker ប្រើប្រាស់ LDR ចំនួន 4 គ្រាប់ (Top, Bottom, Left, Right) ញែកដោយបន្ទះខណ្ឌស្រមោល។ ESP32 ប្រើ ADC1 ចំនួន 4 ឆានែល ដើម្បីគណនាមុំលំអៀង azimuth error និង elevation error បញ្ជាឱ្យម៉ូទ័របង្វិលតម្រង់ចំកណ្តាលព្រះអាទិត្យដោយស្វ័យប្រវត្ត។',
      hardwareConnected: 'Custom 4-LDR Tracking Head with 0.1% Metal Film Resistors'
    }
  },
  {
    id: 7,
    title: 'PWM គឺជាអ្វី? (Pulse Width Modulation & LEDC)',
    subtitle: 'ការគ្រប់គ្រងល្បឿនម៉ូទ័រ, ពន្លឺ LED, Duty Cycle, Frequency និង LEDC Hardware Timer',
    category: 'Peripherals',
    concept: 'PWM (Pulse Width Modulation) គឺជាបច្ចេកទេសបង្កើតសញ្ញាឌីជីថលបែប Pulse រលកការ៉េ ដើម្បីធ្វើត្រាប់តាមតង់ស្យុង Analog តាមរយៈការផ្លាស់ប្តូរសមាមាត្ររវាងពេល ON និងពេល OFF (ហៅថា Duty Cycle)។ នៅក្នុង ESP32 វាត្រូវបានដំណើរការដោយ LEDC Peripheral។',
    whatIsIt: 'PWM គឺជាវិធីបញ្ជាកម្លាំងអគ្គិសនីជាមធ្យមទៅកាន់បន្ទុក ដោយការបើក-បិទកុងតាក់ក្នុងល្បឿនលឿនរាប់ពាន់ដងក្នុងមួយវិនាទី (Frequency)។ Duty Cycle 50% មានន័យថាតង់ស្យុងមធ្យមគឺពាក់កណ្តាល ($3.3V \\times 0.5 = 1.65V$)។',
    whyNeedIt: 'ប្រសិនបើយើងបើកម៉ូទ័រ Solar Tracker ឱ្យរត់ល្បឿនពេញ 100% ភ្លាមៗ យន្តការធ្មេញហ្គែរ (Gearbox) និងបន្ទះសូឡាអាចនឹងរងការកន្ត្រាក់ខូចខាត (Mechanical Shock)។ PWM អនុញ្ញាតឱ្យយើងធ្វើ Soft-Start (បង្កើនល្បឿនសន្សឹមៗ) និងគ្រប់គ្រងល្បឿនបង្វិលតាមតម្រូវការ។',
    howItWorks: 'ESP32-S3 មាន LEDC (LED Control) PWM Hardware ចំនួន 8 ឆានែលឯករាជ្យ។ យើងអាចកំណត់ Frequency (ឧ. 20kHz សម្រាប់ម៉ូទ័រដើម្បីកុំឱ្យឮសំឡេងរងំ) និង Resolution (ចាប់ពី 1-bit ដល់ 14-bit) លើគ្រប់ជើង GPIO ទាំងអស់។',
    diagram: `
 PWM Duty Cycle Waveforms:
 
 25% Duty Cycle (Average Voltage = 0.825V - Low Speed)
  ┌─┐       ┌─┐       ┌─┐
 ─┘ └───────┘ └───────┘ └───────
 
 50% Duty Cycle (Average Voltage = 1.65V - Medium Speed)
  ┌───┐     ┌───┐     ┌───┐
 ─┘   └─────┘   └─────┘   └─────
 
 75% Duty Cycle (Average Voltage = 2.475V - High Speed)
  ┌─────┐   ┌─────┐   ┌─────┐
 ─┘     └───┘     └───┘     └───
    `,
    explanation: [
      'Frequency សម្រាប់ម៉ូទ័រ DC គួរតែកំណត់នៅចន្លោះ 15kHz ដល់ 25kHz ដើម្បីជៀសវាងសំឡេងរំខាននៃប្រេកង់សោតទស្សន៍ (Audible Noise)។',
      'Resolution កាន់តែខ្ពស់ (ឧ. 10-bit = 1024 កម្រិត) ផ្តល់ការគ្រប់គ្រងកាន់តែម៉ដ្ឋល្អ ប៉ុន្តែដែនកំណត់ Frequency អតិបរមានឹងធ្លាក់ចុះ។',
      'ESP32 Arduino Core 3.0+ ប្រើប្រាស់ API សាមញ្ញថ្មីគឺ ledcAttach(pin, freq, resolution) និង ledcWrite(pin, duty)។',
      'កុំភ្លេចថា PWM ត្រឹមតែបញ្ជា Gate របស់ Driver ប៉ុណ្ណោះ ចរន្តជាក់ស្តែងផ្គត់ផ្គង់ពី Power Supply ធំខាងក្រៅ។'
    ],
    wiring: [
      { pinFrom: 'GPIO 8', pinTo: 'PWM IN (BTS7960)', component: 'H-Bridge Driver', note: 'ជើងសញ្ញាបញ្ជាល្បឿន Motor Speed' },
      { pinFrom: 'ESP32 GND', pinTo: 'Driver GND', component: 'Common GND', note: 'ដីរួមសម្រាប់សញ្ញា PWM' }
    ],
    codeExample: `#define MOTOR_PWM_PIN  8
#define PWM_FREQ       20000 // 20 kHz (ស្ងាត់គ្មានសំឡេងរងំ)
#define PWM_RESOLUTION 10    // 10-bit (Duty cycle: 0 ដល់ 1023)

void setup() {
  Serial.begin(115200);
  
  // កំណត់ PWM លើជើង GPIO 8
  ledcAttach(MOTOR_PWM_PIN, PWM_FREQ, PWM_RESOLUTION);
  
  Serial.println("LEDC Motor PWM Initialized at 20kHz.");
}

void loop() {
  // Soft-Start: បង្កើនល្បឿនសន្សឹមៗពី 0% ដល់ 100%
  Serial.println("Ramping Speed UP...");
  for (int duty = 0; duty <= 1023; duty += 20) {
    ledcWrite(MOTOR_PWM_PIN, duty);
    delay(30);
  }

  delay(2000); // រត់ល្បឿនពេញ 2 វិនាទី

  // Soft-Stop: បន្ថយល្បឿនសន្សឹមៗពី 100% មក 0%
  Serial.println("Ramping Speed DOWN...");
  for (int duty = 1023; duty >= 0; duty -= 20) {
    ledcWrite(MOTOR_PWM_PIN, duty);
    delay(30);
  }

  delay(3000); // ឈប់សម្រាក 3 វិនាទី
}`,
    codeExplanation: [
      { token: 'ledcAttach(pin, freq, res)', explanation: 'ភ្ជាប់ជើង GPIO ទៅនឹង hardware PWM generator ជាមួយប្រេកង់និង resolution ដែលចង់បាន' },
      { token: 'ledcWrite(pin, duty)', explanation: 'សរសេរបញ្ចូលតម្លៃ Duty Cycle (0 ដល់ 1023 សម្រាប់ 10-bit) ដើម្បីប្តូរល្បឿន' }
    ],
    howToTest: 'តភ្ជាប់ Oscilloscope ឬ Logic Analyzer ទៅកាន់ GPIO 8 ដើម្បីមើលរលក Pulse ការ៉េប្រែប្រួលទទឹង។ បើគ្មានទេ អាចត LED + 220Ω ដើម្បីមើលពន្លឺ LED ភ្លឺច្បាស់សន្សឹមៗ។',
    expectedOutput: `LEDC Motor PWM Initialized at 20kHz.
Ramping Speed UP...
Ramping Speed DOWN...`,
    commonErrors: [
      { error: 'ម៉ូទ័រឮសំឡេងស្រែកចាច (High-pitch Whining)', cause: 'ប្រេកង់ PWM ទាបពេក (ឧ. 1kHz ឬ 500Hz) ដែលត្រចៀកមនុស្សអាចឮបាន', fix: 'បង្កើន PWM Frequency ទៅ 20kHz ឬ 25kHz' }
    ],
    miniExercise: {
      prompt: 'បង្កើតអនុគមន៍ setMotorSpeedPercent(int percent) ដែលទទួលតម្លៃពី 0 ទៅ 100% ហើយបំប្លែងទៅជា 10-bit duty cycle (0-1023)។',
      hint: 'int duty = map(percent, 0, 100, 0, 1023); ledcWrite(MOTOR_PWM_PIN, duty);'
    },
    fypApplication: {
      title: 'ការគ្រប់គ្រងល្បឿន Azimuth Worm Gear Motor',
      description: 'ដើម្បីបង្វិលបន្ទះសូឡាទម្ងន់ 35kg តាមអ័ក្សផ្ដេក (Azimuth) ដោយរលូន យើងប្រើ PWM ដើម្បីអនុវត្ត S-Curve Acceleration Profile ការពារកុំឱ្យកន្ត្រាក់ខូចតួគ្រោងមេកានិក និងកាត់បន្ថយការប្រើប្រាស់ថាមពលថ្ម។',
      hardwareConnected: '24V DC High-Torque Planetary Worm Gear Motor'
    }
  },
  {
    id: 8,
    title: 'Interrupts គឺជាអ្វី? (Hardware Interrupts & ISR)',
    subtitle: 'ការឆ្លើយតបព្រឹត្តិការណ៍បន្ទាន់ Hardware Interrupts, ISR, IRAM_ATTR និង Volatile Variables',
    category: 'Embedded Systems',
    concept: 'Interrupt គឺជាយន្តការ Hardware របស់ CPU ដែលផ្អាកការដំណើរការកូដធម្មតាបណ្តោះអាសន្ន ដើម្បីទៅដំណើរការអនុគមន៍ពិសេសបន្ទាន់មួយហៅថា Interrupt Service Routine (ISR) នៅពេលដែលមានសញ្ញាប្រែប្រួលលើជើង GPIO (RISING, FALLING, CHANGE)។',
    whatIsIt: 'Interrupt ប្រៀបដូចជាកណ្តឹងទ្វារផ្ទះ។ អ្នកមិនចាំបាច់ដើរទៅមើលទ្វាររាល់ 5 វិនាទីម្តងទេ (Polling)។ អ្នកអាចធ្វើការងាររបស់អ្នកធម្មតា ហើយពេលមានភ្ញៀវចុចកណ្តឹង (Interrupt) អ្នកទើបក្រោកទៅបើកទ្វារ (ISR)។',
    whyNeedIt: 'ក្នុង Solar Tracker ប្រសិនបើមានខ្យល់ព្យុះខ្លាំង ឬមនុស្សចុចប៊ូតុង Emergency Stop (E-Stop) ប្រព័ន្ធត្រូវតែផ្តាច់ម៉ូទ័រភ្លាមៗក្នុងរយៈពេល Microseconds! ប្រសិនបើយើងប្រើកូដ polling ធម្មតា ហើយកូដកំពុងជាប់ delay() នោះម៉ូទ័រអាចនឹងបុកបាក់បែកមុនពេលកូដដឹងខ្លួន។',
    howItWorks: 'នៅពេលជើង GPIO មានការប្រែប្រួលកម្រិត Logic Hardware នឹងផ្ញើសញ្ញាទៅ Interrupt Controller របស់ CPU។ CPU រក្សាទុក Registers បច្ចុប្បន្ន រួចលោតទៅរត់កូដក្នុង ISR ដែលស្ថិតក្នុង IRAM (Internal RAM) ដើម្បីល្បឿនលឿនបំផុត។',
    diagram: `
 Normal Execution Loop:
 ══════► Task A ────► Task B ────► Delay ────► Task C ══════
                                    ▲
                   [ Hardware Event on GPIO 9 ] (E-Stop Triggered!)
                                    │
                                    ▼
 Interrupt Service Routine (ISR in IRAM):
 ┌────────────────────────────────────────────────────────┐
 │ 1. Immediately cut PWM output to 0%                    │
 │ 2. Set Emergency Flag = true                           │
 │ 3. Return to main execution in < 2 microseconds!       │
 └────────────────────────────────────────────────────────┘
    `,
    explanation: [
      'កូដនៅក្នុង ISR ត្រូវតែខ្លីបំផុតតាមដែលអាចធ្វើទៅបាន (Short and Fast)។',
      'ហាមប្រើ delay(), Serial.println(), ឬ allocate memory នៅក្នុង ISR ព្រោះវានឹងធ្វើឱ្យ ESP32 Crash (Guru Meditation) ភ្លាម។',
      'ត្រូវតែដាក់ Modifier IRAM_ATTR នៅមុខអនុគមន៍ ISR ដើម្បីឱ្យកូដត្រូវបានផ្ទុកក្នុង Fast Internal RAM មិនមែន Flash Memory ឡើយ។',
      'គ្រប់ Global Variable ណាដែលកែប្រែក្នុង ISR ហើយអានក្នុង loop() ត្រូវតែប្រកាសជា volatile ដើម្បីការពារ Compiler Optimization។'
    ],
    wiring: [
      { pinFrom: 'GPIO 9', pinTo: 'E-Stop Switch NC', component: 'Emergency Switch', note: 'ជើង Interrupt Input មាន Pull-up resistor' },
      { pinFrom: 'Switch Terminal 2', pinTo: 'GND', component: 'System GND', note: 'ពេលចុច E-Stop សៀគ្វីបើក ឬទាញចុះដី' }
    ],
    codeExample: `#define ESTOP_PIN 9
#define MOTOR_PIN 8

// អថេរដែលត្រូវប្រើក្នុង ISR ត្រូវតែមានពាក្យ volatile
volatile bool emergencyTriggered = false;
volatile unsigned long lastInterruptTime = 0;

// អនុគមន៍ ISR ត្រូវតែមាន IRAM_ATTR
void IRAM_ATTR handleEmergencyStop() {
  unsigned long currentTime = millis();
  // Debounce ក្នុង ISR
  if (currentTime - lastInterruptTime > 100) {
    emergencyTriggered = true;
    // ផ្តាច់សញ្ញាភ្លាមៗនៅកម្រិត Hardware
    digitalWrite(MOTOR_PIN, LOW);
    lastInterruptTime = currentTime;
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(MOTOR_PIN, OUTPUT);
  pinMode(ESTOP_PIN, INPUT_PULLUP);

  // ភ្ជាប់ Interrupt: ពេលចុចប៊ូតុង សញ្ញាធ្លាក់ចុះពី HIGH ទៅ LOW (FALLING)
  attachInterrupt(digitalPinToInterrupt(ESTOP_PIN), handleEmergencyStop, FALLING);
  
  Serial.println("E-Stop Hardware Interrupt Ready.");
}

void loop() {
  if (emergencyTriggered) {
    Serial.println("!!! សង្គ្រោះបន្ទាន់: EMERGENCY STOP ត្រូវបានកេះ! ប្រព័ន្ធត្រូវបានចាក់សោរ !!!");
    // ចាក់សោរប្រព័ន្ធរហូតដល់មានការដោះសោរដោយដៃ
    while(1) {
      delay(1000);
    }
  }

  // កិច្ចការធម្មតា
  Serial.println("ប្រព័ន្ធដំណើរការធម្មតា...");
  delay(1000);
}`,
    codeExplanation: [
      { token: 'IRAM_ATTR', explanation: 'បញ្ជាឱ្យ Compiler ដាក់កូដអនុគមន៍នេះក្នុង Internal RAM ដើម្បីឱ្យ CPU រត់បានល្បឿនលឿនបំផុតពេលមាន Interrupt' },
      { token: 'attachInterrupt(pin, isr, mode)', explanation: 'ភ្ជាប់ជើង GPIO ជាមួយអនុគមន៍ ISR ដោយជ្រើសរើស Mode (FALLING, RISING, CHANGE)' },
      { token: 'volatile bool', explanation: 'ប្រាប់ Compiler ថាតម្លៃនៃអថេរនេះអាចផ្លាស់ប្តូរគ្រប់ពេលដោយ Hardware មិនត្រូវ Optimize ចោលឡើយ' }
    ],
    howToTest: 'តខ្សែពី GPIO 9 ទៅប៊ូតុងភ្ជាប់ GND។ ពេលកំពុងឃើញข้อความ "ប្រព័ន្ធដំណើរការធម្មតា..." ចុចប៊ូតុងភ្លាម អ្នកនឹងឃើញข้อความ "EMERGENCY STOP" បង្ហាញឡើងភ្លាមៗដោយគ្មានការយឺតយ៉ាវ។',
    expectedOutput: `E-Stop Hardware Interrupt Ready.
ប្រព័ន្ធដំណើរការធម្មតា...
ប្រព័ន្ធដំណើរការធម្មតា...
!!! សង្គ្រោះបន្ទាន់: EMERGENCY STOP ត្រូវបានកេះ! ប្រព័ន្ធត្រូវបានចាក់សោរ !!!`,
    commonErrors: [
      { error: 'Guru Meditation Error: Core 1 panic\'ed (Interrupt wdt timeout on CPU1)', cause: 'សរសេរ Serial.print() ឬ delay() នៅខាងក្នុង ISR', fix: 'លុប Serial.print និង delay ចេញពី ISR ដោយគ្រាន់តែកំណត់ Flag = true រួចមក print ក្នុង void loop() វិញ' }
    ],
    miniExercise: {
      prompt: 'ប្រើ Interrupt ជាមួយ Optical Encoder ដើម្បីរាប់ចំនួនជំហានបង្វិលរបស់ម៉ូទ័រ (Pulse Counting)។',
      hint: 'បង្កើត volatile long pulseCount = 0; ក្នុង ISR: pulseCount++;'
    },
    fypApplication: {
      title: 'ប្រព័ន្ធការពារខ្យល់ព្យុះ និង E-Stop របស់ Solar Tracker',
      description: 'Anemometer (ឧបករណ៍វាស់ល្បឿនខ្យល់) ផ្ញើ Pulse មកកាន់ ESP32 តាមរយៈ Interrupt Pin។ ប្រសិនបើល្បឿនខ្យល់លើសពី 45 km/h (ខ្យល់ព្យុះខ្លាំង) ISR នឹងបញ្ជូន Flag ឱ្យប្រព័ន្ធបញ្ជាបង្វិលបន្ទះសូឡាទៅកាន់ទីតាំងផ្តេកសុវត្ថិភាព (Stow Position 0°) ជាបន្ទាន់ ដើម្បីការពារកុំឱ្យបាក់បែក។',
      hardwareConnected: 'Digital Pulse Anemometer & E-Stop Interlock Circuit'
    }
  },
  {
    id: 9,
    title: 'Hardware Timers & Periodic Tasks',
    subtitle: 'ការបង្កើតចង្វាក់ពេលវេលាច្បាស់លាស់ 64-bit Hardware Timer និង PID Sampling',
    category: 'Embedded Systems',
    concept: 'Hardware Timer គឺជា Counter Hardware ខាងក្នុងរបស់ ESP32 ដែលរាប់តាមល្បឿន Clock ឯករាជ្យពី CPU។ វាអាចបង្កើត Interrupt ទៀងទាត់ឥតខ្ចោះ (ឧទាហរណ៍ រៀងរាល់ 10.00ms ម្តង) សម្រាប់កិច្ចការ Control Loop ដូចជា PID Controller ដែលទាមទារពេលវេលាជាក់លាក់ (Deterministic Timing)។',
    whatIsIt: 'Timer គឺជាឧបករណ៍រាប់ពេលវេលាកម្រិត Hardware។ ខុសពី millis() ដែលអាចរអាក់រអួលដោយសារកូដផ្សេង Hardware Timer ដំណើរការជាមួយ Clock 80MHz ច្បាស់លាស់ដល់កម្រិត Microseconds។',
    whyNeedIt: 'ក្បួនគណនា PID (Proportional-Integral-Derivative) សម្រាប់គ្រប់គ្រងមុំផ្អៀងរបស់បន្ទះសូឡា ទាមទារឱ្យតម្លៃ Delta Time (dt) ថេរជានិច្ច។ ប្រសិនបើ dt ប្រែប្រួល តម្លៃ Derivative និង Integral នឹងគណនាខុស ធ្វើឱ្យប្រព័ន្ធរំញ័រមិនឈប់ (Oscillate)។',
    howItWorks: 'ESP32 មាន Hardware Timers ចំនួន 4 ក្រុម (64-bit)។ យើងប្រើ Prescaler ដើម្បីបែងចែក Clock 80MHz ឱ្យចុះមកត្រឹម 1MHz (1 tick = 1 microsecond) រួចកំណត់ចំនួន tick ដែលត្រូវរោទ៍រាល់វដ្តនីមួយៗ។',
    diagram: `
 80 MHz APB Clock ──► [ Prescaler: 80 ] ──► 1 MHz Timer Tick (1 µs)
                                                    │
                                                    ▼
 ┌────────────────────────────────────────────────────────┐
 │            64-Bit Hardware Timer Counter               │
 │    Counter matches 10,000 µs (10 ms Sampling Period)   │
 └──────────────────────────┬─────────────────────────────┘
                            │
                            ▼
           Hardware Timer Interrupt (PID Loop Callback)
    `,
    explanation: [
      'ESP32 Arduino Core 3.0+ ប្រើ Timer API ថ្មី៖ timerAttach(freq), timerAlarm(timer, interval, autoReload, 0)។',
      'ល្អឥតខ្ចោះសម្រាប់ការអាន Sensor អត្រាថេរ (Constant Sampling Rate) ដូចជា IMU Filter។',
      'ជៀសវាងការដាក់កូដធ្ងន់ៗក្នុង Timer ISR ដូចគ្នានឹង GPIO Interrupt ដែរ។ គ្រាន់តែ Set Flag ឬបញ្ជូន Semaphore ទៅកាន់ FreeRTOS Task។'
    ],
    wiring: [
      { pinFrom: 'Internal Timer', pinTo: 'CPU Core', component: 'Silicon Internal', note: 'មិនត្រូវការតខ្សែខាងក្រៅទេ ព្រោះជា Hardware ខាងក្នុង ESP32' }
    ],
    codeExample: `hw_timer_t *timer = NULL;
volatile bool timerFlag = false;

// ISR របស់ Timer
void IRAM_ATTR onTimer() {
  timerFlag = true;
}

void setup() {
  Serial.begin(115200);

  // កំណត់ Timer ដំណើរការនៅប្រេកង់ 1 MHz (1 tick = 1 microsecond)
  timer = timerBegin(1000000);

  // ភ្ជាប់ ISR ទៅ Timer
  timerAttachInterrupt(timer, &onTimer);

  // កំណត់ឱ្យរោទ៍រៀងរាល់ 100,000 µs (100 ms) ដោយបន្តរោទ៍ឡើងវិញស្វ័យប្រវត្ត (true)
  timerAlarm(timer, 100000, true, 0);

  Serial.println("100ms Hardware Timer Started.");
}

void loop() {
  if (timerFlag) {
    timerFlag = false;
    // កូដត្រួតពិនិត្យដំណើរការរៀងរាល់ 100ms ច្បាស់លាស់
    static unsigned long count = 0;
    count++;
    if (count % 10 == 0) {
      Serial.printf("[TIMER 1s] PID Sampling Loop Tick: %lu\\n", count);
    }
  }
}`,
    codeExplanation: [
      { token: 'timerBegin(1000000)', explanation: 'ចាប់ផ្តើមដំណើរការ Timer នៅប្រេកង់ 1MHz (1 microsecond ក្នុង 1 tick)' },
      { token: 'timerAlarm(timer, 100000, true, 0)', explanation: 'កំណត់ឱ្យបង្កើត Interrupt រៀងរាល់ 100,000 microseconds (100ms) ដោយ auto-reload' }
    ],
    howToTest: 'មើលពេលវេលារបស់ message លើ Serial Monitor ដោយបើក timestamp។ អ្នកនឹងឃើញข้อความបង្ហាញឡើងរៀងរាល់ 1000ms យ៉ាងទៀងទាត់ឥតលម្អៀង។',
    expectedOutput: `100ms Hardware Timer Started.
[TIMER 1s] PID Sampling Loop Tick: 10
[TIMER 1s] PID Sampling Loop Tick: 20
[TIMER 1s] PID Sampling Loop Tick: 30`,
    commonErrors: [
      { error: 'Guru Meditation Error: Core 0/1 panic\'ed (Cache disabled but cached memory region accessed)', cause: 'អនុគមន៍ដែលហៅក្នុង Timer ISR មិនបានដាក់ IRAM_ATTR', fix: 'ប្រាកដថាគ្រប់កូដ និងអថេរក្នុង ISR ស្ថិតក្នុង IRAM ទាំងអស់' }
    ],
    miniExercise: {
      prompt: 'ផ្លាស់ប្តូរ Timer ឱ្យដំណើរការនៅរៀងរាល់ 20ms (50Hz) ដូចទៅនឹងអត្រាគំរូនៃ IMU Attitude Filter។',
      hint: 'ប្តូរពី 100000 ទៅជា 20000 microseconds (20ms)'
    },
    fypApplication: {
      title: 'ការកំណត់ Sampling Time សម្រាប់ PID Solar Attitude Control',
      description: 'នៅក្នុងប្រព័ន្ធ Solar Tracker យើងប្រើប្រាស់ Hardware Timer មួយដើម្បីរត់ PID Loop ក្នុងចន្លោះពេលថេរ 20ms (50Hz)។ វានឹងអានមុំផ្អៀងជាក់ស្តែងពី BNO085 IMU រួចប្រៀបធៀបជាមួយមុំគោលដៅព្រះអាទិត្យ ដើម្បីបញ្ជាកម្លាំង PWM ទៅកាន់ Actuator ដោយច្បាស់លាស់បំផុត។',
      hardwareConnected: 'Closed-Loop PID Control Loop'
    }
  },
  {
    id: 10,
    title: 'I2C គឺជាអ្វី? (Inter-Integrated Circuit Protocol)',
    subtitle: 'ទំនាក់ទំនងខ្សែ 2 ខ្សែ (SDA, SCL), Pull-Up Resistors, Bus Scanner និងឧបករណ៍ច្រើនលើខ្សែតែមួយ',
    category: 'Communication',
    concept: 'I2C (Inter-Integrated Circuit) គឺជា Synchronous, Multi-device, Bidirectional Communication Protocol ដែលអនុញ្ញាតឱ្យ ESP32 ទំនាក់ទំនងជាមួយ Sensor និង Module ជាច្រើនតាមរយៈខ្សែសំខាន់តែ 2 ខ្សែប៉ុណ្ណោះ គឺ SDA (Serial Data) និង SCL (Serial Clock)។',
    whatIsIt: 'I2C គឺជាពិធីការទំនាក់ទំនងដែលបង្កើតឡើងដោយ Philips (NXP)។ វាប្រើខ្សែពីរខ្សែ៖ SDA សម្រាប់បញ្ជូនទិន្នន័យ និង SCL សម្រាប់ផ្តល់ចង្វាក់នាឡិកា (Clock)។ ឧបករណ៍នីមួយៗនៅលើខ្សែមាន Address 7-bit ផ្ទាល់ខ្លួន (ឧទាហរណ៍ 0x68 សម្រាប់ DS3231, 0x4A សម្រាប់ BNO085)។',
    whyNeedIt: 'បើយើងតខ្សែដាច់ដោយឡែកសម្រាប់គ្រប់ Sensor ទាំងអស់ យើងនឹងខ្វះជើង GPIO ប្រើប្រាស់។ តាមរយៈ I2C យើងអាចត BNO085 IMU, DS3231 RTC, OLED Display និង INA226 Power Monitor ស្របគ្នាទាំងអស់លើខ្សែតែ 2 ខ្សែប៉ុណ្ណោះ!',
    howItWorks: 'ESP32 ដើរតួជា Master បញ្ចេញ Clock លើ SCL (ល្បឿន 100kHz Standard ឬ 400kHz Fast Mode)។ ទាំង SDA និង SCL ជា Open-Drain lines ដូច្នេះចាំបាច់ត្រូវតែមាន Pull-up Resistor (ជាទូទៅ 2.2kΩ ដល់ 4.7kΩ) ភ្ជាប់ទៅ 3.3V។',
    diagram: `
 ESP32-S3 (I2C Master)
 ┌──────────────┐
 │ GPIO 11 (SDA)├───────┬──────────────┬──────────────┬──────► (Data)
 │ GPIO 12 (SCL)├──┐    │              │              │
 └──────────────┘  │    │ ┌──[4.7kΩ]───┼── 3.3V       │
                   │    │ └──[4.7kΩ]───┘ (Pull-Ups)   │
                   ▼    ▼              ▼              ▼
           ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
           │   DS3231 RTC │    │  BNO085 IMU  │    │  OLED 0.96"  │
           │(Address 0x68)│    │(Address 0x4A)│    │(Address 0x3C)│
           └──────────────┘    └──────────────┘    └──────────────┘
    `,
    explanation: [
      'SDA (Serial Data) ទទួលខុសត្រូវលើការបញ្ជូននិងទទួលទិន្នន័យតាមលំដាប់ Byte។',
      'SCL (Serial Clock) គ្រប់គ្រងចង្វាក់ពេលវេលាដែលបង្កើតឡើងដោយ Master។',
      'Pull-up Resistors 4.7kΩ មានសារៈសំខាន់ខ្លាំងណាស់! បើគ្មានវាទេ ខ្សែសញ្ញានឹងមិនអាចឡើងមកកម្រិត HIGH បានឡើយ ហើយ I2C Bus នឹងជាប់គាំង (Bus Hang)។',
      'នៅលើ ESP32-S3 យើងអាចកំណត់ជើង GPIO ណាធ្វើជា SDA/SCL ក៏បានតាមរយៈ Wire.begin(SDA_PIN, SCL_PIN)។'
    ],
    wiring: [
      { pinFrom: 'GPIO 11', pinTo: 'SDA', component: 'I2C Sensors', note: 'ខ្សែទិន្នន័យ Serial Data (មាន Pull-up 4.7kΩ ទៅ 3.3V)' },
      { pinFrom: 'GPIO 12', pinTo: 'SCL', component: 'I2C Sensors', note: 'ខ្សែនាឡិកា Serial Clock (មាន Pull-up 4.7kΩ ទៅ 3.3V)' },
      { pinFrom: '3.3V', pinTo: 'VCC', component: 'Sensors VCC', note: 'តង់ស្យុងផ្គត់ផ្គង់ Sensor 3.3V (កុំប្រើ 5V ព្រោះ I2C ត្រូវគ្នាជាមួយ 3.3V logic)' },
      { pinFrom: 'GND', pinTo: 'GND', component: 'Sensors GND', note: 'Ground រួម' }
    ],
    codeExample: `#include <Wire.h>

#define I2C_SDA_PIN 11
#define I2C_SCL_PIN 12

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  // ចាប់ផ្តើម I2C លើជើងដែលយើងកំណត់
  Wire.begin(I2C_SDA_PIN, I2C_SCL_PIN);
  Wire.setClock(400000); // 400 kHz Fast Mode
  
  Serial.println("=== ចាប់ផ្តើមស្កេន I2C Bus Scanner ===");
  int devicesFound = 0;
  
  for (byte address = 1; address < 127; address++) {
    Wire.beginTransmission(address);
    byte error = Wire.endTransmission();
    
    if (error == 0) {
      Serial.printf("រកឃើញឧបករណ៍ I2C នៅ Address: 0x%02X", address);
      if (address == 0x68) Serial.print(" -> (DS3231 RTC)");
      if (address == 0x4A || address == 0x4B) Serial.print(" -> (BNO085 IMU)");
      if (address == 0x3C || address == 0x3D) Serial.print(" -> (SSD1306 OLED)");
      if (address == 0x40) Serial.print(" -> (INA226 Power Monitor)");
      Serial.println();
      devicesFound++;
    }
  }
  
  if (devicesFound == 0) {
    Serial.println("មិនមានឧបករណ៍ I2C ណាមួយត្រូវបានរកឃើញទេ! សូមពិនិត្យខ្សែ និង Pull-up Resistor!");
  } else {
    Serial.printf("ការស្កេនចប់សព្វគ្រប់: រកឃើញឧបករណ៍សរុបចំនួន %d\\n", devicesFound);
  }
}

void loop() {
  // Idle
  delay(5000);
}`,
    codeExplanation: [
      { token: 'Wire.begin(SDA, SCL)', explanation: 'ចាប់ផ្តើម I2C bus នៅលើជើង GPIO ដែលយើងបានជ្រើសរើស' },
      { token: 'Wire.setClock(400000)', explanation: 'កំណត់ល្បឿន Bus ទៅ 400kHz (Fast Mode) ដើម្បីអាន Sensor លឿនជាងមុន' },
      { token: 'Wire.endTransmission()', explanation: 'បញ្ជូនទិន្នន័យ និងស្តាប់ការឆ្លើយតប ACK (Acknowledge) ពី Slave Device (0 = មានការឆ្លើយតប)' }
    ],
    howToTest: 'តភ្ជាប់ BNO085 ឬ DS3231 ទៅកាន់ GPIO 11 និង GPIO 12។ Upload កូដ I2C Scanner រួចបើក Serial Monitor ដើម្បីពិនិត្យមើល Address Hex របស់ឧបករណ៍ដែលបានរកឃើញ។',
    expectedOutput: `=== ចាប់ផ្តើមស្កេន I2C Bus Scanner ===
រកឃើញឧបករណ៍ I2C នៅ Address: 0x3C -> (SSD1306 OLED)
រកឃើញឧបករណ៍ I2C នៅ Address: 0x4A -> (BNO085 IMU)
រកឃើញឧបករណ៍ I2C នៅ Address: 0x68 -> (DS3231 RTC)
ការស្កេនចប់សព្វគ្រប់: រកឃើញឧបករណ៍សរុបចំនួន 3`,
    commonErrors: [
      { error: 'I2C Bus ជាប់គាំង (Wire.endTransmission មិនព្រមត្រឡប់មកវិញ)', cause: 'ខ្វះ Pull-up Resistors ឬខ្សែ SDA/SCL មួយដាច់ ឬឆ្លងទៅ GND', fix: 'បន្ថែម Resistor 4.7kΩ ពី SDA ទៅ 3.3V និង SCL ទៅ 3.3V និងពិនិត្យខ្សែតភ្ជាប់' },
      { error: 'Address Collision (ឧបករណ៍ពីរមាន Address ដូចគ្នា)', cause: 'ប្រើ Sensor ម៉ូដែលដូចគ្នា 2 គ្រាប់នៅលើ Bus តែមួយដោយមិនបានដូរ Address Pin', fix: 'ប្តូរជើង ADR/ADD របស់ Sensor មួយទៅ 3.3V ឬ GND ដើម្បីប្តូរ Address ឬប្រើ I2C Multiplexer (TCA9548A)' }
    ],
    miniExercise: {
      prompt: 'សរសេរកូដអានសីតុណ្ហភាពខាងក្នុងរបស់ DS3231 RTC តាម I2C Register 0x11 និង 0x12។',
      hint: 'Wire.beginTransmission(0x68); Wire.write(0x11); Wire.endTransmission(); Wire.requestFrom(0x68, 2); byte msb = Wire.read();'
    },
    fypApplication: {
      title: 'ឆ្អឹងខ្នង Sensor របស់ Solar Tracker',
      description: 'នៅលើ PCB របស់ Solar Tracker ខ្សែ I2C គឺជាឆ្អឹងខ្នងតភ្ជាប់ឧបករណ៍សំខាន់ៗចំនួន 3៖ 1. DS3231 RTC (ផ្តល់កាលបរិច្ឆេទនិងម៉ោងច្បាស់លាស់សម្រាប់គណនា Sun Position) 2. BNO085 9-DOF IMU (ផ្តល់មុំលំអៀង Pitch/Roll ច្បាស់លាស់) 3. INA226 (វាស់តង់ស្យុងនិងចរន្តចេញពីបន្ទះសូឡា)។',
      hardwareConnected: 'Multi-drop I2C Sensor Bus with EMI Shielding'
    }
  },
  {
    id: 11,
    title: 'SPI គឺជាអ្វី? (Serial Peripheral Interface)',
    subtitle: 'ទំនាក់ទំនងល្បឿនលឿន High-Speed Full-Duplex (MOSI, MISO, SCK, CS) សម្រាប់ MicroSD & Display',
    category: 'Communication',
    concept: 'SPI (Serial Peripheral Interface) គឺជា Synchronous, Full-Duplex Communication Protocol ដែលមានល្បឿនលឿនបំផុត (រហូតដល់ 40MHz - 80MHz លើ ESP32)។ វាប្រើប្រាស់ខ្សែ 4 ខ្សែគឺ MOSI, MISO, SCK និង CS (Chip Select)។',
    whatIsIt: 'SPI គឺជាពិធីការទំនាក់ទំនងដែលដំណើរការលឿនជាង I2C រាប់សិបដង។ វាស័ក្តិសមបំផុតសម្រាប់ឧបករណ៍ដែលត្រូវការបញ្ជូនទិន្នន័យធំៗក្នុងពេលឆាប់រហ័ស ដូចជា MicroSD Card (សម្រាប់ Datalogger) និងអេក្រង់ពណ៌ TFT LCD។',
    whyNeedIt: 'ក្នុង Solar Tracker យើងត្រូវកត់ត្រាទិន្នន័យអាកាសធាតុ កម្លាំងពន្លឺថ្ងៃ តង់ស្យុង និងចរន្តរៀងរាល់ 1 វិនាទីម្តងចូលទៅក្នុង SD Card។ I2C យឺតពេកមិនអាចសរសេរទិន្នន័យទំហំធំបានលឿនទេ ដូច្នេះយើងប្រើប្រាស់ SPI Bus។',
    howItWorks: 'MOSI (Master Out Slave In) បញ្ជូនទិន្នន័យពី ESP32 ទៅឧបករណ៍។ MISO (Master In Slave Out) ទទួលទិន្នន័យត្រឡប់មក ESP32 វិញ។ SCK ផ្តល់នាឡិកាល្បឿនលឿន។ CS ប្រើសម្រាប់ជ្រើសរើសឧបករណ៍ដែលត្រូវនិយាយជាមួយ (ទាញទៅ LOW ដើម្បីជ្រើសរើស)។',
    diagram: `
 ESP32-S3 (SPI Master)
 ┌──────────────────────┐
 │ GPIO 13 (SCK / Clock)├────────┬─────────────────────────┐
 │ GPIO 14 (MOSI / Data)├──────┬─┼───────────────────────┐ │
 │ GPIO 21 (MISO / Data)├───┬──┼─┼─────────────────────┐ │ │
 │ GPIO 10 (CS_SD)      ├───┼──┼─┼────────┐            │ │ │
 │ GPIO 47 (CS_TFT)     ├─┐ │  │ │        │            │ │ │
 └──────────────────────┘ │ │  │ │        ▼            ▼ ▼ ▼
                          │ │  │ │   ┌──────────┐ ┌──────────┐
                          │ │  │ └──►│ MicroSD  │ │ TFT LCD  │
                          │ └──┼────►│ Card     │ │ Display  │
                          └────┼────►│ Module   │ │ (ST7789) │
                               └─────┴──────────┘ └──────────┘
    `,
    explanation: [
      'Full-Duplex មានន័យថា ESP32 អាចបញ្ជូនទិន្នន័យ និងទទួលទិន្នន័យត្រឡប់មកវិញក្នុងពេលតែមួយបាន។',
      'ខុសពី I2C ដែលប្រើ Address ក្នុង SPI យើងប្រើខ្សែ CS (Chip Select) ដាច់ដោយឡែកសម្រាប់ឧបករណ៍នីមួយៗ។',
      'ESP32-S3 មាន SPI Controllers ខាងក្នុង (FSPI និង HSPI) ដែលអាចរត់ល្បឿនរហូតដល់ 80MHz។',
      'ខ្សែ SPI ត្រូវតែខ្លី (ក្រោម 10-15cm) ព្រោះប្រេកង់ខ្ពស់ងាយរងការរំខានដោយសារ Noise ឬ Stray Capacitance។'
    ],
    wiring: [
      { pinFrom: 'GPIO 13', pinTo: 'SCK', component: 'MicroSD Module', note: 'Serial Clock' },
      { pinFrom: 'GPIO 14', pinTo: 'MOSI', component: 'MicroSD Module', note: 'Master Out Slave In' },
      { pinFrom: 'GPIO 21', pinTo: 'MISO', component: 'MicroSD Module', note: 'Master In Slave Out' },
      { pinFrom: 'GPIO 10', pinTo: 'CS', component: 'MicroSD Module', note: 'Chip Select Pin' }
    ],
    codeExample: `#include <SPI.h>
#include <SD.h>

#define SD_CS_PIN   10
#define SPI_SCK_PIN 13
#define SPI_MOSI_PIN 14
#define SPI_MISO_PIN 21

void setup() {
  Serial.begin(115200);
  delay(1000);

  // កំណត់ជើង SPI ផ្ទាល់ខ្លួន
  SPI.begin(SPI_SCK_PIN, SPI_MISO_PIN, SPI_MOSI_PIN, SD_CS_PIN);

  Serial.println("កំពុងភ្ជាប់ទៅកាន់ MicroSD Card...");
  if (!SD.begin(SD_CS_PIN)) {
    Serial.println("បរាជ័យក្នុងការតភ្ជាប់ SD Card! សូមពិនិត្យខ្សែ និងទម្រង់ Format (FAT32)!");
    return;
  }

  Serial.printf("ជោគជ័យ! ទំហំ SD Card: %llu MB\\n", SD.cardSize() / (1024 * 1024));

  // សរសេរទិន្នន័យ Log សាកល្បង
  File file = SD.open("/solar_log.csv", FILE_APPEND);
  if (file) {
    file.println("Timestamp,Solar_Voltage,Solar_Current,Power_Watts");
    file.println("2026-09-28 12:00:00,24.3,4.12,100.1");
    file.close();
    Serial.println("បានកត់ត្រាទិន្នន័យចូល SD Card រួចរាល់!");
  }
}

void loop() {
  // Idle
  delay(5000);
}`,
    codeExplanation: [
      { token: 'SPI.begin(SCK, MISO, MOSI, SS)', explanation: 'ចាប់ផ្តើម SPI Controller និងកំណត់ជើង GPIO តាមប្លង់ PCB របស់យើង' },
      { token: 'SD.begin(CS_PIN)', explanation: 'ចាប់ផ្តើម File System របស់ SD Card តាមពិធីការ SPI' },
      { token: 'FILE_APPEND', explanation: 'បើក File សម្រាប់បន្ថែមទិន្នន័យនៅខាងចុងដោយមិនលុបទិន្នន័យចាស់ចោល' }
    ],
    howToTest: 'ដាក់ MicroSD Card ទំហំ 8GB-32GB (Format FAT32) ចូល Module រួច Upload កូដ។ ដក SD Card ទៅបើកក្នុងកុំព្យូទ័រ អ្នកនឹងឃើញ File "solar_log.csv" ជាមួយទិន្នន័យដែលបានសរសេរ។',
    expectedOutput: `កំពុងភ្ជាប់ទៅកាន់ MicroSD Card...
ជោគជ័យ! ទំហំ SD Card: 15193 MB
បានកត់ត្រាទិន្នន័យចូល SD Card រួចរាល់!`,
    commonErrors: [
      { error: 'SD.begin() failed', cause: 'SD Card មានទំហំធំជាង 32GB (Format ជា exFAT) ឬខ្សែ SPI វែងពេកធ្វើឱ្យបាត់បង់សញ្ញា', fix: 'ប្រើ SD Card ទំហំ 16GB/32GB ហើយ Format ជា FAT32 ព្រមទាំងបន្ថយល្បឿន SPI មកត្រឹម 10-20MHz' }
    ],
    miniExercise: {
      prompt: 'បង្កើតអនុគមន៍ logTelemetryToSD(float volt, float curr) ដើម្បីកត់ត្រាទិន្នន័យថ្មីចូល SD Card រៀងរាល់ 10 វិនាទី។',
      hint: 'ប្រើ file.printf("%lu,%.2f,%.2f\\n", millis(), volt, curr);'
    },
    fypApplication: {
      title: 'ប្រព័ន្ធ Blackbox Datalogger របស់ Solar Tracker',
      description: 'ប្រសិនបើប្រព័ន្ធបាត់បង់ការភ្ជាប់ Wi-Fi នៅទីវាល ទិន្នន័យទាំងអស់ (តង់ស្យុងសូឡា ចរន្តបញ្ចូលថ្ម មុំលំអៀង និងកូដកំហុស Error Codes) នឹងត្រូវបានកត់ត្រាចូលទៅក្នុង MicroSD Card តាមរយៈ SPI Bus ដោយមិនបាត់បង់ទិន្នន័យឡើយ។',
      hardwareConnected: 'Industrial Grade MicroSD SPI Storage Subsystem'
    }
  },
  {
    id: 12,
    title: 'UART គឺជាអ្វី? (Universal Asynchronous Receiver-Transmitter)',
    subtitle: 'ទំនាក់ទំនងសៀរៀល TX/RX, Baud Rates, Hardware Serial Ports និងការតភ្ជាប់ជាមួយ GPS/SIM Module',
    category: 'Communication',
    concept: 'UART (Universal Asynchronous Receiver-Transmitter) គឺជា Hardware Serial Protocol ដែលពេញនិយមបំផុតសម្រាប់ផ្ញើនិងទទួលទិន្នន័យជាលក្ខណៈ Asynchronous (គ្មានខ្សែ Clock រួម) តាមរយៈខ្សែ 2 ខ្សែគឺ TX (Transmit) និង RX (Receive)។',
    whatIsIt: 'UART គឺជាពិធីការសៀរៀលចម្បងដែលប្រើសម្រាប់ Debug សារទៅកុំព្យូទ័រ (តាមរយៈ Serial Monitor) និងប្រើសម្រាប់បញ្ជា Module ផ្សេងៗដូចជា GSM/4G SIM7600, GPS Module ឬ Nextion Display។',
    whyNeedIt: 'នៅក្នុង Solar Tracker ប្រសិនបើគម្រោងត្រូវដំឡើងនៅតំបន់ដាច់ស្រយាលដែលគ្មាន Wi-Fi យើងត្រូវភ្ជាប់ ESP32 ជាមួយ 4G LTE Module (SIM7600) តាមរយៈ UART ដើម្បីបញ្ជូនទិន្នន័យតាមបណ្តាញទូរសព្ទចល័ត។',
    howItWorks: 'ឧបករណ៍ទាំងពីរត្រូវតែកំណត់ Baud Rate ដូចគ្នា (ឧ. 115200 ឬ 9600)។ ខ្សែ TX របស់ ESP32 ត្រូវតែតខ្វែងទៅកាន់ RX របស់ឧបករណ៍ម្ខាងទៀត ហើយ RX របស់ ESP32 ត្រូវតទៅកាន់ TX របស់គេ (Cross Connection)។',
    diagram: `
 ESP32-S3 (Hardware Serial 1)              GPS / GSM Module
 ┌──────────────────────────┐             ┌─────────────────┐
 │ GPIO 17 (TX1) ───────────┼────────────►│ RXD             │
 │ GPIO 18 (RX1) ◄──────────┼─────────────┤ TXD             │
 │ GND           ───────────┼─────────────┤ GND (Common)    │
 └──────────────────────────┘             └─────────────────┘
    * ចំណាំ: TX ត្រូវតខ្វែងទៅ RX ជានិច្ច!
    `,
    explanation: [
      'ESP32-S3 មាន Hardware UART Controller ចំនួន 3 (UART0, UART1, UART2) ដែលអាចចាត់តាំងជើង GPIO ណាមួយក៏បាន។',
      'UART0 ត្រូវបានប្រើជាទូទៅសម្រាប់ Serial Monitor និង USB Flashing (Baud: 115200)។',
      'UART1 ឬ UART2 អាចប្រើសម្រាប់ទំនាក់ទំនងជាមួយ Module ខាងក្រៅដោយប្រើ HardwareSerial MySerial(1);។',
      'ត្រូវប្រយ័ត្នកម្រិត Voltage Logic! ប្រសិនបើឧបករណ៍ក្រៅប្រើ 5V UART (ដូចជា Arduino Uno) អ្នកត្រូវប្រើ Logic Level Shifter ឬ Voltage Divider ដើម្បីការពារកុំឱ្យឆេះជើង RX របស់ ESP32 (3.3V)។'
    ],
    wiring: [
      { pinFrom: 'GPIO 17 (TX1)', pinTo: 'RX Module', component: 'External UART Device', note: 'បញ្ជូនទិន្នន័យចេញ' },
      { pinFrom: 'GPIO 18 (RX1)', pinTo: 'TX Module', component: 'External UART Device', note: 'ទទួលទិន្នន័យចូល' },
      { pinFrom: 'GND', pinTo: 'GND Module', component: 'Common Ground', note: 'ដីរួមសម្រាប់ជាចំណុចយោងតង់ស្យុង' }
    ],
    codeExample: `// ប្រើ Hardware Serial 1 របស់ ESP32
HardwareSerial SerialGPS(1);

#define GPS_RX_PIN 18
#define GPS_TX_PIN 17

void setup() {
  // Serial0 សម្រាប់កុំព្យូទ័រ
  Serial.begin(115200);
  delay(500);
  
  // Serial1 សម្រាប់ឧបករណ៍ខាងក្រៅ (ឧ. GPS 9600 Baud)
  SerialGPS.begin(9600, SERIAL_8N1, GPS_RX_PIN, GPS_TX_PIN);

  Serial.println("UART1 Bridge Initialized. Ready for GPS/GSM communication.");
}

void loop() {
  // បើមានទិន្នន័យពី GPS បញ្ជូនបន្តទៅកុំព្យូទ័រ
  while (SerialGPS.available()) {
    char c = SerialGPS.read();
    Serial.write(c);
  }

  // បើអ្នកវាយអក្សរលើ Serial Monitor បញ្ជូនទៅ GPS
  while (Serial.available()) {
    char c = Serial.read();
    SerialGPS.write(c);
  }
}`,
    codeExplanation: [
      { token: 'HardwareSerial SerialGPS(1)', explanation: 'បង្កើត Instance នៃ Hardware Serial ចំនួនទី 2 (UART1)' },
      { token: 'SerialGPS.begin(baud, config, rx, tx)', explanation: 'ចាប់ផ្តើម UART កំណត់ Baud Rate និងជើង RX/TX ជាក់លាក់' },
      { token: 'SerialGPS.available()', explanation: 'ត្រឡប់ចំនួន Bytes ដែលកំពុងស្ថិតក្នុង Receive Buffer រង់ចាំការអាន' }
    ],
    howToTest: 'តភ្ជាប់ជើង TX1 (GPIO 17) ទៅ RX1 (GPIO 18) ផ្ទាល់ (Loopback Test)។ ពេលអ្នកផ្ញើសារតាម SerialGPS.println("TEST"); អ្នកនឹងទទួលបានសារនោះត្រឡប់មកវិញភ្លាមៗ។',
    expectedOutput: `UART1 Bridge Initialized. Ready for GPS/GSM communication.
$GPRMC,123519,A,4807.038,N,01131.000,E,022.4,084.4,230394,003.1,W*6A`,
    commonErrors: [
      { error: 'មិនទទួលបានទិន្នន័យទាល់តែសោះ (Data Silent)', cause: 'តខ្សែ TX ទៅ TX និង RX ទៅ RX ច្រឡំគ្នា ឬខ្វះ Common Ground', fix: 'ប្តូរខ្វែងខ្សែ៖ TX ទៅ RX និង RX ទៅ TX ព្រមទាំងតខ្សែ GND ភ្ជាប់គ្នា' },
      { error: 'អក្សរចេញមកជាសញ្ញាចម្លែកៗ (Garbage Characters )', cause: 'Baud Rate មិនត្រូវគ្នា (ឧទាហរណ៍ ឧបករណ៍រត់ 9600 ប៉ុន្តែកូដកំណត់ 115200)', fix: 'ពិនិត្យ Datasheet របស់ Module ដើម្បីកំណត់ Baud Rate ឱ្យដូចគ្នាទាំងស្រុង' }
    ],
    miniExercise: {
      prompt: 'សរសេរកូដបញ្ជូន AT Command ទៅកាន់ SIM Module រួចរង់ចាំស្តាប់ពាក្យ "OK" ត្រឡប់មកវិញ។',
      hint: 'SerialGPS.println("AT"); delay(100); while(SerialGPS.available()) Serial.write(SerialGPS.read());'
    },
    fypApplication: {
      title: 'ការទទួលកូអរដោនេពី GPS Module សម្រាប់ Sun Position Algorithm',
      description: 'Solar Tracker ប្រើប្រាស់ NEO-6M GPS Module តាមរយៈ UART ដើម្បីទាញយកទីតាំងភូមិសាស្ត្រ (Latitude, Longitude) និងម៉ោង UTC ពិតប្រាកដ។ ទិន្នន័យនេះត្រូវបានបញ្ចូលទៅក្នុងសមីការ PSA (Plataforma Solar de Almería) ដើម្បីគណនារកទីតាំងព្រះអាទិត្យដោយស្វ័យប្រវត្តិគ្រប់ទីកន្លែងលើផែនដី។',
      hardwareConnected: 'u-blox NEO-6M High-Precision GPS Receiver'
    }
  },
  {
    id: 13,
    title: 'Wi-Fi Networking & Web Server',
    subtitle: 'ការភ្ជាប់បណ្តាញឥតខ្សែ Station (STA) Mode, Access Point (AP), HTTP REST API & Web Dashboard',
    category: 'IoT',
    concept: 'Wi-Fi គឺជាសមត្ថភាពដ៏លេចធ្លោបំផុតរបស់ ESP32 ដែលអនុញ្ញាតឱ្យវាភ្ជាប់ទៅកាន់ Router ផ្ទះ (Station Mode) ឬបង្កើត Hotspot ផ្ទាល់ខ្លួន (Access Point Mode) ដើម្បីបង្កើត Web Server មើលទិន្នន័យ និងបញ្ជាឧបករណ៍តាមទូរសព្ទដៃ ឬកុំព្យូទ័រ។',
    whatIsIt: 'ESP32 មានបំពាក់នូវ 802.11 b/g/n 2.4GHz Wi-Fi Radio និង LwIP TCP/IP Stack ពេញលេញ។ វាអាចដំណើរការជា Client (ដើម្បីទាញទិន្នន័យពី Internet) ឬជា Server (ដើម្បីឱ្យគេចូលមកបញ្ជា)។',
    whyNeedIt: 'ជំនួសឱ្យការឡើងទៅមើលបន្ទះសូឡានៅលើដំបូលផ្ទះ វិស្វករអាចបើកទូរសព្ទដៃ ឬ Laptop ដើម្បីពិនិត្យមើលកម្លាំងអគ្គិសនីដែលផលិតបាន ព្រមទាំងអាចចុច Manual Override បញ្ជាបង្វិលសូឡាតាម Web Page បានយ៉ាងងាយស្រួល។',
    howItWorks: 'ESP32 ភ្ជាប់ទៅ Wi-Fi Router ហើយទទួលបានអាសយដ្ឋាន IP (ឧទាហរណ៍ 192.168.1.150)។ បន្ទាប់មក វារត់ HTTP Web Server នៅ Port 80។ នៅពេលអ្នកប្រើប្រាស់វាយ IP នេះក្នុង Browser, ESP32 នឹងបញ្ជូនកូដ HTML/JavaScript ទៅបង្ហាញជាផ្ទាំង Dashboard ភ្លាមៗ។',
    diagram: `
 ┌────────────────────────────────────────────────────────┐
 │                      ESP32-S3                          │
 │ ┌──────────────────┐            ┌────────────────────┐ │
 │ │ Wi-Fi Station    │◄───RF────► │ Local Wi-Fi Router │ │
 │ │ (IP: 192.168.1.x)│   2.4GHz   └─────────┬──────────┘ │
 │ └────────┬─────────┘                      │            │
 │          ▼                                │            │
 │ ┌──────────────────┐                      ▼            │
 │ │ HTTP Web Server  │             [Phone / PC Browser]  │
 │ │ (Port 80)        │◄──────────── Web Dashboard        │
 │ └──────────────────┘              (Monitor & Control)  │
 └────────────────────────────────────────────────────────┘
    `,
    explanation: [
      'Station (STA) Mode: ESP32 ភ្ជាប់ទៅ Wi-Fi Router ដូចទូរសព្ទដៃ ដើម្បីចូលលេងអ៊ីនធឺណិត។',
      'Access Point (AP) Mode: ESP32 បង្កើត Wi-Fi Hotspot ផ្ទាល់ខ្លួន ស័ក្តិសមសម្រាប់ពេលដំឡើងដំបូង (Provisioning) នៅកន្លែងដែលគ្មានអ៊ីនធឺណិត។',
      'ESP32 ដំណើរការលើប្រេកង់ 2.4GHz តែប៉ុណ្ណោះ មិនគាំទ្រ 5GHz Wi-Fi ឡើយ។',
      'ការប្រើប្រាស់ Wi-Fi ស៊ីចរន្តឡើងដល់ខ្ទង់ 150mA - 300mA ពេលបញ្ជូនទិន្នន័យ (TX Bursts) ដូច្នេះត្រូវប្រាកដថា Power Supply ផ្តល់ចរន្តគ្រប់គ្រាន់។'
    ],
    wiring: [
      { pinFrom: 'Onboard Antenna', pinTo: 'RF Transceiver', component: 'PCB Trace Antenna', note: 'អង់តែនលើបន្ទះសៀគ្វី 2.4GHz (ហាមដាក់ដែកគ្របពីលើ)' },
      { pinFrom: 'Power 3V3', pinTo: 'Decoupling Cap', component: '10uF + 100nF', note: 'ជួយទប់លំនឹងតង់ស្យុងពេល Wi-Fi ចាប់ផ្តើមបញ្ជូនទិន្នន័យខ្លាំង' }
    ],
    codeExample: `#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

WebServer server(80);

// អថេរក្លែងធ្វើទិន្នន័យ Solar
float solarVoltage = 24.2;
float solarCurrent = 3.85;

void handleRoot() {
  String html = "<!DOCTYPE html><html><head><meta charset='UTF-8'>";
  html += "<title>Solar Tracker Dashboard</title>";
  html += "<style>body{font-family:sans-serif;background:#0f172a;color:#fff;text-align:center;padding:40px;}";
  html += ".card{background:#1e293b;padding:20px;border-radius:12px;display:inline-block;margin:10px;}";
  html += "h1{color:#38bdf8;} .val{font-size:32px;color:#4ade80;font-weight:bold;}</style></head><body>";
  html += "<h1>☀️ Solar Tracker Remote Monitor</h1>";
  html += "<div class='card'><div>Solar Voltage</div><div class='val'>" + String(solarVoltage) + " V</div></div>";
  html += "<div class='card'><div>Solar Current</div><div class='val'>" + String(solarCurrent) + " A</div></div>";
  html += "<div class='card'><div>Generated Power</div><div class='val'>" + String(solarVoltage * solarCurrent) + " W</div></div>";
  html += "</body></html>";
  
  server.send(200, "text/html", html);
}

void setup() {
  Serial.begin(115200);
  
  WiFi.begin(ssid, password);
  Serial.print("កំពុងភ្ជាប់ Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\\nWi-Fi ត្រូវបានភ្ជាប់ជោគជ័យ!");
  Serial.print("អាសយដ្ឋាន IP របស់ ESP32: http://");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);
  server.begin();
  Serial.println("HTTP Web Server កំពុងដំណើរការ...");
}

void loop() {
  server.handleClient();
}`,
    codeExplanation: [
      { token: 'WiFi.begin(ssid, pass)', explanation: 'ចាប់ផ្តើមភ្ជាប់ទៅកាន់ Wi-Fi Access Point តាមរយៈឈ្មោះនិងលេខសម្ងាត់' },
      { token: 'server.on("/", handleRoot)', explanation: 'កំណត់ Routing ថាពេលមានគេចូលមកកាន់ Root URL ("/") ឱ្យហៅអនុគមន៍ handleRoot' },
      { token: 'server.handleClient()', explanation: 'ស្តាប់និងឆ្លើយតបសំណើ HTTP Request ពី Web Browser ក្នុង void loop()' }
    ],
    howToTest: 'បញ្ចូល SSID និង Password ផ្ទះរបស់អ្នក រួច Upload កូដ។ មើល IP Address ក្នុង Serial Monitor (ឧ. 192.168.1.45) ហើយបើក Browser លើទូរសព្ទវាយ IP នោះចូលដើម្បីមើល Dashboard។',
    expectedOutput: `កំពុងភ្ជាប់ Wi-Fi.....
Wi-Fi ត្រូវបានភ្ជាប់ជោគជ័យ!
អាសយដ្ឋាន IP របស់ ESP32: http://192.168.1.105
HTTP Web Server កំពុងដំណើរការ...`,
    commonErrors: [
      { error: 'Wi-Fi មិនព្រមភ្ជាប់ជាប់ (ចំណុច ... រហូតមិនឈប់)', cause: 'វាយឈ្មោះ SSID ឬ Password ខុស ឬព្យាយាមភ្ជាប់ទៅ Network 5GHz', fix: 'ពិនិត្យឈ្មោះ/លេខសម្ងាត់ឡើងវិញ និងប្រាកដថា Router បើកប្រេកង់ 2.4GHz' },
      { error: 'ESP32 ចេះតែ Reset ភ្លាមៗពេលភ្ជាប់ Wi-Fi', cause: 'បញ្ហា Brownout Reset ដោយសារខ្សែ USB ឬ Power Supply ផ្តល់ចរន្តមិនដល់ 500mA', fix: 'ប្រើដុំសាកទូរសព្ទ 5V 2A ល្អ និងបន្ថែម Capacitor 470uF នៅលើខ្សែភ្លើង 5V/3.3V' }
    ],
    miniExercise: {
      prompt: 'បន្ថែមប៊ូតុងលើ Web Page ដើម្បីបញ្ជាបើកបិទ LED ឬបញ្ជាបង្វិលម៉ូទ័រពីចម្ងាយ។',
      hint: 'បន្ថែម server.on("/motor_on", handleMotorOn); រួចបង្កើត hyperlink <a href="/motor_on">Move Motor</a>'
    },
    fypApplication: {
      title: 'Local Diagnostics Web Server',
      description: 'ក្រៅពីបញ្ជូនទិន្នន័យទៅ Cloud ESP32-S3 ក៏ដំណើរការ Internal Web Server ក្នុងស្រុកមួយផងដែរ។ ពេលវិស្វករចុះទៅត្រួតពិនិត្យផ្ទាល់នៅកន្លែងដំឡើង ពួកគាត់គ្រាន់តែភ្ជាប់ Wi-Fi របស់ ESP32 នោះពួកគាត់អាច Calibration សេនស័រ និង Test ម៉ូទ័របានភ្លាមៗដោយមិនបាច់ដោតខ្សែ USB។',
      hardwareConnected: 'Embedded Asynchronous Lightweight Web Server'
    }
  },
  {
    id: 14,
    title: 'Bluetooth Low Energy (BLE)',
    subtitle: 'ការទំនាក់ទំនងឥតខ្សែស៊ីថាមពលទាប BLE Server, GATT Services, Characteristics & Phone App',
    category: 'IoT',
    concept: 'Bluetooth Low Energy (BLE) គឺជាបច្ចេកវិទ្យាទំនាក់ទំនងឥតខ្សែចម្ងាយជិតដែលស៊ីថាមពលតិចបំផុត។ វាប្រើប្រាស់ស្ថាបត្យកម្ម Generic Attribute Profile (GATT) ដោយរៀបចំទិន្នន័យជា Services និង Characteristics ដើម្បីឱ្យទូរសព្ទដៃអាចអាន សរសេរ ឬទទួលការជូនដំណឹង (Notify)។',
    whatIsIt: 'BLE ខុសពី Bluetooth Classic (ដែលប្រើសម្រាប់ចាក់ចម្រៀង) ព្រោះវាត្រូវបានបង្កើតឡើងសម្រាប់បញ្ជូនកញ្ចប់ទិន្នន័យតូចៗក្នុងល្បឿនលឿន និងសន្សំសំចៃថ្មបំផុត (អាចប្រើថ្មគ្រាប់បានរាប់ខែ)។',
    whyNeedIt: 'នៅពេលដំឡើង Solar Tracker ដំបូង ប្រព័ន្ធមិនទាន់មាន Wi-Fi ទេ។ យើងប្រើ BLE ដើម្បីភ្ជាប់ជាមួយទូរសព្ទដៃ រួចបញ្ជូនឈ្មោះ Wi-Fi SSID និង Password ទៅឱ្យ ESP32 ដោយសុវត្ថិភាព (ហៅថា Wi-Fi Provisioning)។',
    howItWorks: 'ESP32 ដំណើរការជា BLE Peripheral (GATT Server) ហើយផ្សាយសញ្ញា (Advertising) ឈ្មោះរបស់វាចេញទៅក្រៅ។ កម្មវិធីទូរសព្ទ (ដូចជា nRF Connect) អាច Scan រកឃើញ រួច Connect ដើម្បីអានមុំលំអៀង ឬបញ្ជាកែសម្រួល Settings។',
    diagram: `
 ┌────────────────────────────────────────────────────────┐
 │                      ESP32-S3                          │
 │                 [ BLE GATT Server ]                    │
 │                          │                             │
 │      ┌───────────────────┴───────────────────┐         │
 │      ▼                                       ▼         │
 │  Service: SolarData (UUID)               Service: Config│
 │    ├── Char: Pitch/Roll (Read/Notify)      ├── Char: SSID│
 │    └── Char: PowerWatts (Read)             └── Char: Pass│
 └──────────────────────────┬─────────────────────────────┘
                            │ BLE 5.0 Wireless
                            ▼
               [ Mobile Phone / nRF Connect ]
    `,
    explanation: [
      'GATT Service: ជាបណ្តុំនៃទិន្នន័យដែលទាក់ទងគ្នា (សម្គាល់ដោយកូដ UUID 128-bit)។',
      'Characteristic: ជាចំណុចទិន្នន័យជាក់លាក់នីមួយៗ (ដូចជា អថេរ Value) ដែលអាចកំណត់សិទ្ធិ Read, Write, ឬ Notify។',
      'Notify: អនុញ្ញាតឱ្យ ESP32 រុញទិន្នន័យទៅទូរសព្ទដៃដោយស្វ័យប្រវត្តនៅពេលតម្លៃប្រែប្រួល ដោយទូរសព្ទមិនបាច់ចំណាយពេលសួរញឹកញាប់ឡើយ។',
      'BLE មិនត្រូវការ Router ទេ គឺទូរសព្ទដៃ និង ESP32 និយាយគ្នាផ្ទាល់តែម្តង (Point-to-Point)។'
    ],
    wiring: [
      { pinFrom: 'Onboard Antenna', pinTo: 'BLE Radio', component: 'ESP32-S3 RF', note: 'ប្រើប្រាស់អង់តែន 2.4GHz រួមគ្នាជាមួយ Wi-Fi' }
    ],
    codeExample: `#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

BLECharacteristic *pCharacteristic;
bool deviceConnected = false;
float trackerAngle = 45.0;

class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
      Serial.println("[BLE] ទូរសព្ទបានភ្ជាប់ជោគជ័យ!");
    };
    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
      Serial.println("[BLE] ទូរសព្ទបានផ្តាច់ការតភ្ជាប់!");
      // ផ្សាយសញ្ញាឡើងវិញ
      pServer->getAdvertising()->start();
    }
};

void setup() {
  Serial.begin(115200);

  // ចាប់ផ្តើម BLE Device
  BLEDevice::init("SolarTracker-ESP32");
  BLEServer *pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  BLEService *pService = pServer->createService(SERVICE_UUID);
  pCharacteristic = pService->createCharacteristic(
                      CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_READ   |
                      BLECharacteristic::PROPERTY_NOTIFY
                    );
  pCharacteristic->addDescriptor(new BLE2902());

  pService->start();
  pServer->getAdvertising()->start();
  Serial.println("BLE Server កំពុងផ្សាយសញ្ញា... សូមបើក App nRF Connect ដើម្បីភ្ជាប់!");
}

void loop() {
  if (deviceConnected) {
    // ធ្វើត្រាប់ការផ្លាស់ប្តូរមុំសូឡា
    trackerAngle += 0.5;
    if (trackerAngle > 80.0) trackerAngle = 10.0;

    String valStr = String(trackerAngle, 1) + " deg";
    pCharacteristic->setValue(valStr.c_str());
    pCharacteristic->notify(); // ផ្ញើ Notify ទៅទូរសព្ទភ្លាមៗ

    Serial.printf("[BLE Sent] Tracker Angle: %s\\n", valStr.c_str());
  }
  delay(1000);
}`,
    codeExplanation: [
      { token: 'BLEDevice::init("Name")', explanation: 'កំណត់ឈ្មោះរបស់ឧបករណ៍ដែលនឹងបង្ហាញនៅលើបញ្ជី Bluetooth របស់ទូរសព្ទ' },
      { token: 'createService(UUID)', explanation: 'បង្កើត Service មួយដែលមានលេខសម្គាល់ UUID ជាក់លាក់' },
      { token: 'pCharacteristic->notify()', explanation: 'រុញទិន្នន័យថ្មីទៅកាន់ទូរសព្ទដៃដែលកំពុង Connect ដោយស្វ័យប្រវត្ត' }
    ],
    howToTest: 'ទាញយកកម្មវិធី "nRF Connect for Mobile" លើ Android ឬ iOS។ បើក Bluetooth រួច Scan រក "SolarTracker-ESP32" ចុច Connect និងបើកប៊ូតុងរូបព្រួញ Notify ដើម្បីមើលមុំសូឡាផ្លាស់ប្តូរ Real-time។',
    expectedOutput: `BLE Server កំពុងផ្សាយសញ្ញា... សូមបើក App nRF Connect ដើម្បីភ្ជាប់!
[BLE] ទូរសព្ទបានភ្ជាប់ជោគជ័យ!
[BLE Sent] Tracker Angle: 45.5 deg
[BLE Sent] Tracker Angle: 46.0 deg`,
    commonErrors: [
      { error: 'រកមិនឃើញឈ្មោះ ESP32 ក្នុងបញ្ជី Bluetooth របស់ទូរសព្ទ', cause: 'មិនបាន Start Advertising ឬទូរសព្ទមិនបានបើក Location/Bluetooth Permissions', fix: 'ពិនិត្យកូដ pServer->getAdvertising()->start(); និងបើក Location permission លើទូរសព្ទ' }
    ],
    miniExercise: {
      prompt: 'បន្ថែម Characteristic មួយទៀតដែលមានសិទ្ធិ PROPERTY_WRITE ដើម្បីឱ្យទូរសព្ទអាចបញ្ជូនពាក្យបញ្ជា (Command) មកបញ្ជា Motor។',
      hint: 'ប្រើ class MyCallbacks: public BLECharacteristicCallbacks { void onWrite(BLECharacteristic *pChar) { ... } }'
    },
    fypApplication: {
      title: 'Wireless Field Calibration App',
      description: 'អ្នកបច្ចេកទេសអាចប្រើប្រាស់កម្មវិធីទូរសព្ទដៃឆ្លាតវៃភ្ជាប់តាម BLE ទៅកាន់ Solar Tracker ដើម្បីធ្វើការ Zero-Calibration ទៅលើ IMU Sensor និងកំណត់ដែនកំណត់មុំបង្វិល (Soft Limits) បានយ៉ាងរហ័សដោយមិនចាំបាច់មានបណ្តាញអ៊ីនធឺណិត។',
      hardwareConnected: 'Secure Bluetooth 5.0 Low Energy Wireless Interface'
    }
  },
  {
    id: 15,
    title: 'FreeRTOS មូលដ្ឋាន (Real-Time Operating System)',
    subtitle: 'ការគ្រប់គ្រងកិច្ចការច្រើន Task Creation, Task Priorities, Queues & Semaphores',
    category: 'Embedded Systems',
    concept: 'FreeRTOS គឺជា Real-Time Operating System ខ្នាតតូចដែលដំណើរការជាស្នូលក្នុង ESP32។ វាអនុញ្ញាតឱ្យយើងបំបែកប្រព័ន្ធស្មុគស្មាញទៅជា Task តូចៗជាច្រើនដែលរត់ទន្ទឹមគ្នា (Preemptive Multitasking) ដោយផ្អែកលើអាទិភាព (Priority) និងចាត់ចែងដោយ Scheduler។',
    whatIsIt: 'នៅក្នុង Arduino ធម្មតា កូដដំណើរការតែក្នុង loop() មួយគត់ពីលើចុះក្រោម។ បើមាន delay() កូដទាំងអស់នឹងគាំង។ FreeRTOS អនុញ្ញាតឱ្យអ្នកមាន loop() ច្រើន (ហៅថា Tasks) ដែលដំណើរការស្របគ្នាដោយមិនរំខានគ្នាឡើយ។',
    whyNeedIt: 'ក្នុង Solar Tracker យើងមានការងារជាច្រើន៖ 1. អាន Sensor មុំសូឡា (រៀងរាល់ 10ms) 2. គណនា PID បញ្ជាម៉ូទ័រ (រៀងរាល់ 20ms) 3. ផ្ញើទិន្នន័យ Wi-Fi/MQTT (រៀងរាល់ 2 វិនាទី) 4. ត្រួតពិនិត្យសុវត្ថិភាព E-Stop។ FreeRTOS ធានាថាការងារសំខាន់មិនត្រូវរង់ចាំការងារ Wi-Fi ឡើយ។',
    howItWorks: 'FreeRTOS Scheduler ប្តូរការដំណើរការ Task តាមពេលវេលា Tick (ជាទូទៅ 1ms)។ Task ណាដែលមាន Priority ខ្ពស់ជាង នឹងទទួលបានសិទ្ធិដំណើរការមុន។ ទំនាក់ទំនងរវាង Task ត្រូវបានធ្វើឡើងតាមរយៈ Queue (ជួររង់ចាំទិន្នន័យ) និង Semaphore/Mutex (សោរការពារធនធានរួម)។',
    diagram: `
 ┌────────────────────────────────────────────────────────┐
 │                 FreeRTOS Scheduler                     │
 │                                                        │
 │ [Task 1: Safety E-Stop]      Priority: 5 (ខ្ពស់បំផុត) ─► Core 1
 │ [Task 2: Motor PID Control]  Priority: 4 (ខ្ពស់)     ─► Core 1
 │ [Task 3: Sensor Fusion IMU]  Priority: 3 (មធ្យម)     ─► Core 1
 │                                                        │
 │ ────────────── Queue / Mutex Bridge ────────────────── │
 │                                                        │
 │ [Task 4: MQTT & Wi-Fi Client]Priority: 2 (ទាប)       ─► Core 0
 └────────────────────────────────────────────────────────┘
    `,
    explanation: [
      'xTaskCreatePinnedToCore() បង្កើត Task និងចាក់សោឱ្យរត់លើ Core 0 ឬ Core 1។',
      'Priority ចាប់ពី 0 (ទាបបំផុត) ដល់ 24 (ខ្ពស់បំផុត)។ កិច្ចការម៉ូទ័រ និងសុវត្ថិភាពត្រូវតែមាន Priority ខ្ពស់ជាងកិច្ចការ Wi-Fi/Display។',
      'vTaskDelay(pdMS_TO_TICKS(ms)) ប្រើសម្រាប់ពន្យារពេលដោយមិនធ្វើឱ្យ CPU គាំង (បោះសិទ្ធិឱ្យ Task ផ្សេងរត់)។',
      'Queue ធានាសុវត្ថិភាពនៃការបញ្ជូនទិន្នន័យរវាង Tasks (Thread-safe FIFO Data Structure)។'
    ],
    wiring: [
      { pinFrom: 'Dual CPU Cores', pinTo: 'Shared SRAM', component: 'Internal SoC', note: 'គ្រប់គ្រងដោយ FreeRTOS Memory Manager' }
    ],
    codeExample: `#include <Arduino.h>

// Queue សម្រាប់ផ្ញើតម្លៃពន្លឺពី Sensor Task ទៅ Motor Task
QueueHandle_t sensorQueue;

// Task ទី 1: អាន Sensor ពន្លឺ (រត់លើ Core 1)
void TaskSensor(void *pvParameters) {
  while (1) {
    int fakeLdrValue = random(1000, 3500);
    // បញ្ជូនទិន្នន័យចូល Queue
    xQueueSend(sensorQueue, &fakeLdrValue, portMAX_DELAY);
    Serial.printf("[Core %d - Sensor Task] អានបានពន្លឺ: %d\\n", xPortGetCoreID(), fakeLdrValue);
    
    vTaskDelay(pdMS_TO_TICKS(1000)); // រង់ចាំ 1 វិនាទី
  }
}

// Task ទី 2: ទទួលទិន្នន័យពី Queue ហើយបញ្ជាម៉ូទ័រ (រត់លើ Core 1)
void TaskMotor(void *pvParameters) {
  int receivedValue;
  while (1) {
    // រង់ចាំទទួលទិន្នន័យពី Queue
    if (xQueueReceive(sensorQueue, &receivedValue, portMAX_DELAY)) {
      Serial.printf("[Core %d - Motor Task] ទទួលបានពន្លឺ: %d -> កំពុងកែតម្រូវម៉ូទ័រ...\\n", 
                    xPortGetCoreID(), receivedValue);
    }
  }
}

void setup() {
  Serial.begin(115200);
  delay(1000);

  // បង្កើត Queue ដែលអាចផ្ទុកចំនួន 5 កញ្ចប់ (integer)
  sensorQueue = xQueueCreate(5, sizeof(int));

  // បង្កើត Tasks
  xTaskCreatePinnedToCore(TaskSensor, "SensorTask", 2048, NULL, 2, NULL, 1);
  xTaskCreatePinnedToCore(TaskMotor,  "MotorTask",  2048, NULL, 2, NULL, 1);

  Serial.println("FreeRTOS Tasks Initialized.");
}

void loop() {
  // loop ទុកទំនេរបានព្រោះ Tasks កំពុងដំណើរការដោយខ្លួនឯង
  vTaskDelay(pdMS_TO_TICKS(5000));
}`,
    codeExplanation: [
      { token: 'xQueueCreate(length, itemSize)', explanation: 'បង្កើត Queue សម្រាប់ផ្លាស់ប្តូរទិន្នន័យរវាង Tasks ដោយសុវត្ថិភាព' },
      { token: 'xQueueSend(queue, &data, timeout)', explanation: 'រុញទិន្នន័យចូលទៅក្នុងជួរ Queue' },
      { token: 'xQueueReceive(queue, &buf, timeout)', explanation: 'ទាញយកទិន្នន័យចេញពី Queue (Task នឹងដេករង់ចាំរហូតដល់មានទិន្នន័យ)' },
      { token: 'vTaskDelay(pdMS_TO_TICKS(ms))', explanation: 'បញ្ឈប់ Task បណ្តោះអាសន្នដោយមិនធ្វើឱ្យខាតបង់ CPU Cycles' }
    ],
    howToTest: 'Upload កូដទៅកាន់ ESP32 ហើយពិនិត្យមើល Serial Monitor។ អ្នកនឹងឃើញ TaskSensor បញ្ជូនតម្លៃពន្លឺ ហើយ TaskMotor ទទួលយកទៅដំណើរការភ្លាមៗយ៉ាងរលូន។',
    expectedOutput: `FreeRTOS Tasks Initialized.
[Core 1 - Sensor Task] អានបានពន្លឺ: 2840
[Core 1 - Motor Task] ទទួលបានពន្លឺ: 2840 -> កំពុងកែតម្រូវម៉ូទ័រ...`,
    commonErrors: [
      { error: 'Guru Meditation Error: Core 1 panic\'ed (Unhandled debug exception / Stack overflow)', cause: 'ទំហំ Stack Size របស់ Task តូចពេក (ឧ. ដាក់ត្រឹម 1024 bytes ខណៈពេលមានអថេរច្រើន)', fix: 'បង្កើន Stack Size ក្នុង xTaskCreate ពី 2048 ទៅជា 4096 ឬ 8192 bytes' }
    ],
    miniExercise: {
      prompt: 'បង្កើត Task ទី 3 មួយទៀតនៅលើ Core 0 ដែលធ្វើការព្រិច LED រៀងរាល់ 500ms ដើម្បីបង្ហាញថាប្រព័ន្ធនៅរស់ (Heartbeat LED)។',
      hint: 'xTaskCreatePinnedToCore(TaskHeartbeat, "Blink", 1024, NULL, 1, NULL, 0);'
    },
    fypApplication: {
      title: 'ស្ថាបត្យកម្ម Multitasking នៃ Solar Tracker Firmware',
      description: 'Firmware ទាំងមូលនៃគម្រោង Final Year Project ត្រូវបានរៀបចំជា 4 FreeRTOS Tasks ដាច់ដោយឡែក៖ 1. SensorTask (Core 1) 2. MotionControlTask (Core 1) 3. CANBusTask (Core 0) 4. MqttCloudTask (Core 0)។ ទោះបីជា Wi-Fi ដាច់ ឬកំពុងរង់ចាំ Network ក៏ដោយ ក៏ប្រព័ន្ធបញ្ជាម៉ូទ័រ និងប្រព័ន្ធសុវត្ថិភាពនៅតែដំណើរការយ៉ាងទៀងទាត់ 100%។',
      hardwareConnected: 'Preemptive Real-Time Operating Kernel'
    }
  },
  {
    id: 16,
    title: 'Power Management & Sleep Modes',
    subtitle: 'ការសន្សំសំចៃថាមពល Active Mode, Modem-sleep, Light-sleep, Deep-sleep & RTC Wakeup',
    category: 'Power Management',
    concept: 'ESP32 មានប្រព័ន្ធគ្រប់គ្រងថាមពលកម្រិតខ្ពស់។ ក្នុង Active Mode ធម្មតា វាស៊ីចរន្តប្រហែល 50mA ដល់ 240mA (ពេល Wi-Fi បើក)។ ប៉ុន្តែនៅក្នុង Deep-sleep Mode វាបិទ CPU, Wi-Fi, និង Peripherals ភាគច្រើន ដោយទុកឱ្យត្រឹមតែ RTC Controller ដំណើរការ ដែលស៊ីចរន្តត្រឹមតែ ~10µA ទៅ 15µA ប៉ុណ្ណោះ!',
    whatIsIt: 'Deep-sleep គឺជាទម្រង់សម្ងំដេករបស់ ESP32 ដើម្បីកុំឱ្យអស់ថ្ម។ នៅពេលដេក វាស៊ីភ្លើងតិចជាងពន្លឺភ្លើង LED មួយគ្រាប់រាប់រយដង។ នៅពេលដល់ម៉ោងកំណត់ ឬមាន Sensor ដាស់ វាភ្ញាក់ឡើងដំណើរការកូដ រួចចូលដេកវិញ។',
    whyNeedIt: 'នៅពេលយប់ គ្មានពន្លឺព្រះអាទិត្យទេ ដូច្នេះ Solar Tracker មិនបាច់ដើរតាមរកថ្ងៃឡើយ។ ប្រសិនបើ ESP32 នៅតែដំណើរការពេញកម្លាំង វាអាចនឹងបឺតស៊ីថាមពលថ្មបម្រុងចោលឥតប្រយោជន៍។ តាមរយៈ Deep-sleep ប្រព័ន្ធអាចចូលដេកពេញមួយយប់ ហើយភ្ញាក់ឡើងវិញនៅពេលព្រឹកព្រលឹម (ម៉ោង 6:00 ព្រឹក)។',
    howItWorks: 'មុនពេលចូល Deep-sleep យើងកំណត់លក្ខខណ្ឌដាស់ (Wakeup Source) ដូចជា RTC Timer (កំណត់រយៈពេល), External Wakeup (Ext0/Ext1 តាមជើង GPIO) ឬ ULP Coprocessor។ នៅពេលភ្ញាក់ឡើង ESP32 នឹងចាប់ផ្តើមដំណើរការឡើងវិញដូចចុចប៊ូតុង Reset ដែរ។ អថេរណាដែលចង់រក្សាទុកមិនឱ្យបាត់ ត្រូវប្រកាសជាមួយ RTC_DATA_ATTR។',
    diagram: `
 ESP32 Power Modes Comparison:
 
 ┌────────────────────────────────────────────────────────┐
 │ Active Mode (Wi-Fi ON)       : 160mA - 260mA           │
 │ Active Mode (No Radio)       : 30mA - 50mA             │
 │ Light-sleep Mode             : ~2mA (RAM preserved)    │
 │ Deep-sleep Mode              : ~10µA (RTC memory ONLY) │
 └────────────────────────────────────────────────────────┘
                            │
            Nighttime Triggered (No Sun)
                            ▼
 ┌────────────────────────────────────────────────────────┐
 │ Enter Deep-sleep: CPU, Wi-Fi, Peripherals Powered OFF! │
 │ Only Ultra-Low-Power RTC Timer ticks...               │
 │                                                        │
 │ ◄── Wake up after 30 mins / Morning RTC Alarm ──────── │
 └────────────────────────────────────────────────────────┘
    `,
    explanation: [
      'RTC_DATA_ATTR int bootCount = 0; រក្សាទុកតម្លៃអថេរនៅក្នុង 8KB RTC Slow Memory ទោះបី ESP32 ចូល Deep-sleep ក៏ដោយ។',
      'esp_sleep_enable_timer_wakeup(time_in_us) កំណត់ឱ្យភ្ញាក់ឡើងវិញតាមម៉ោង។',
      'esp_sleep_enable_ext0_wakeup(GPIO_NUM_x, LEVEL) កំណត់ឱ្យភ្ញាក់ពេលមានប៊ូតុង ឬ Sensor ខាងក្រៅផ្លាស់ប្តូរកម្រិត Logic។',
      'esp_deep_sleep_start() បញ្ជាឱ្យចូលដេកភ្លាមៗ។'
    ],
    wiring: [
      { pinFrom: 'RTC GPIO', pinTo: 'Push Button / Wakeup Switch', component: 'Ext Wakeup', note: 'ជើង RTC GPIO អាចដាស់ ESP32 ពី Deep-sleep បាន' },
      { pinFrom: 'Power Source', pinTo: 'LiFePO4 Battery / 3.3V LDO', component: 'Low Quiescent LDO', note: 'ប្រើ Regulator ដែលមានចរន្ត Iq ទាប (ដូចជា ME6211 ឬ AP2112)' }
    ],
    codeExample: `#define uS_TO_S_FACTOR 1000000ULL  // មេគុណបំប្លែង Microseconds ទៅជា Seconds
#define TIME_TO_SLEEP  10          // ចូលដេករយៈពេល 10 វិនាទី

// អថេរដែលរក្សាទុកក្នុង RTC Memory មិនបាត់បង់ទោះបី Deep-sleep ក៏ដោយ
RTC_DATA_ATTR int bootCount = 0;

void print_wakeup_reason() {
  esp_sleep_wakeup_cause_t wakeup_reason = esp_sleep_get_wakeup_cause();

  switch (wakeup_reason) {
    case ESP_SLEEP_WAKEUP_TIMER: 
      Serial.println("[WAKEUP] ភ្ញាក់ឡើងវិញដោយសារ: RTC Hardware Timer ដល់ម៉ោង!"); 
      break;
    default: 
      Serial.printf("[WAKEUP] ភ្ញាក់ឡើងដោយសារមូលហេតុផ្សេងទៀត: %d\\n", wakeup_reason); 
      break;
  }
}

void setup() {
  Serial.begin(115200);
  delay(500);

  bootCount++;
  Serial.printf("\\n=== ESP32 ភ្ញាក់ដំណើរការលើកទី: %d ===\\n", bootCount);

  // បង្ហាញមូលហេតុដែលដាស់វាឱ្យភ្ញាក់
  print_wakeup_reason();

  // ធ្វើការងារបន្ទាន់ (ឧទាហរណ៍ អាន Sensor ពន្លឺ)
  Serial.println("កំពុងពិនិត្យពន្លឺថ្ងៃ... រកឃើញថាពេលយប់ងងឹត (No Sun).");
  
  // កំណត់ឱ្យភ្ញាក់វិញក្រោយ 10 វិនាទី
  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);
  Serial.printf("កំពុងចូល Deep-sleep រយៈពេល %d វិនាទីដើម្បីសន្សំសំចៃថ្ម... រាត្រីសួស្តី!\\n", TIME_TO_SLEEP);
  Serial.flush(); // បញ្ជូន Buffer Serial ឱ្យអស់មុនពេលដេក

  // ចាប់ផ្តើមចូលដេក
  esp_deep_sleep_start();
}

void loop() {
  // មិនដែលមកដល់ត្រង់នេះទេ ព្រោះឈីបបានចូលដេកបាត់ទៅហើយ
}`,
    codeExplanation: [
      { token: 'RTC_DATA_ATTR', explanation: 'ប្រាប់ Compiler ឱ្យផ្ទុកអថេរនេះក្នុង RTC Slow Memory ដើម្បីរក្សាតម្លៃនៅពេល Deep-sleep' },
      { token: 'esp_sleep_enable_timer_wakeup()', explanation: 'កំណត់កម្មវិធីរោទ៍ដាស់ខាងក្នុង RTC គិតជា Microseconds' },
      { token: 'esp_deep_sleep_start()', explanation: 'បិទថាមពល CPU និង Peripherals ភាគច្រើន ហើយចូលទៅក្នុង Deep-sleep Mode ភ្លាមៗ' }
    ],
    howToTest: 'Upload កូដ រួចសង្កេតមើល Serial Monitor។ ESP32 នឹង print សារ រួចស្ងាត់រយៈពេល 10 វិនាទី ហើយភ្ញាក់មក print សារម្តងទៀតដោយតម្លៃ bootCount កើនឡើងជាលំដាប់ (1, 2, 3...)។',
    expectedOutput: `=== ESP32 ភ្ញាក់ដំណើរការលើកទី: 1 ===
[WAKEUP] ភ្ញាក់ឡើងដោយសារមូលហេតុផ្សេងទៀត: 0
កំពុងពិនិត្យពន្លឺថ្ងៃ... រកឃើញថាពេលយប់ងងឹត (No Sun).
កំពុងចូល Deep-sleep រយៈពេល 10 វិនាទីដើម្បីសន្សំសំចៃថ្ម... រាត្រីសួស្តី!

=== ESP32 ភ្ញាក់ដំណើរការលើកទី: 2 ===
[WAKEUP] ភ្ញាក់ឡើងវិញដោយសារ: RTC Hardware Timer ដល់ម៉ោង!
កំពុងពិនិត្យពន្លឺថ្ងៃ... រកឃើញថាពេលយប់ងងឹត (No Sun).`,
    commonErrors: [
      { error: 'អថេរត្រូវ Reset មក 0 វិញរាល់ពេលភ្ញាក់ពី Deep-sleep', cause: 'ភ្លេចដាក់ RTC_DATA_ATTR នៅមុខអថេរ បណ្តាលឱ្យអថេរធម្មតាត្រូវបានលុបចេញពី RAM', fix: 'ប្រកាស RTC_DATA_ATTR int myVar = 0; នៅខាងក្រៅ setup()' },
      { error: 'កូដមិនទាន់ print អស់ផង ស្រាប់តែដាច់បាត់', cause: 'មិនបានហៅ Serial.flush() មុនពេលចូល Deep-sleep ធ្វើឱ្យ UART Hardware បិទភ្លាមៗខណៈទិន្នន័យនៅសល់ក្នុង Buffer', fix: 'ដាក់ Serial.flush(); នៅបន្ទាត់មុនពេល esp_deep_sleep_start();' }
    ],
    miniExercise: {
      prompt: 'បន្ថែមការដាស់ពី Deep-sleep តាមរយៈប៊ូតុងចុចខាងក្រៅដោយប្រើអនុគមន៍ esp_sleep_enable_ext0_wakeup(GPIO_NUM_4, 0);។',
      hint: 'ពេលចុចប៊ូតុងទាញ GPIO 4 មក LOW ESP32 នឹងភ្ញាក់ឡើងភ្លាមៗទោះបីមិនទាន់ដល់ 10 វិនាទីក៏ដោយ'
    },
    fypApplication: {
      title: 'របៀបសន្សំសំចៃថាមពលពេលយប់ (Night Sleep & Park Mode)',
      description: 'នៅពេលថ្ងៃលិច (ផ្ទៀងផ្ទាត់ដោយ DS3231 RTC និង LDR Sensor < 50 lux) ESP32 នឹងបញ្ជា Actuator ឱ្យបង្វិលបន្ទះសូឡាទៅទិសខាងកើតរួចជាស្រេច (Sunrise Ready Position) រួចចូល Deep-sleep រយៈពេល 45 នាទីម្តងដើម្បីពិនិត្យស្ថានភាព។ យុទ្ធសាស្ត្រនេះកាត់បន្ថយការស៊ីភ្លើងរបស់ប្រព័ន្ធបញ្ជាបានដល់ទៅ 92% ក្នុងពេលយប់ ធានាថាថ្ម 24V មិនរីងស្ងួតឡើយ។',
      hardwareConnected: 'Ultra-Low Quiescent Power Management Circuitry'
    }
  }
];

export const ESP32_LESSONS: Lesson[] = RAW_ESP32_LESSONS.map(lesson => {
  const enhanced = getEnhancedLessonData(lesson.id);
  return {
    ...lesson,
    learningObjectives: enhanced.learningObjectives,
    realWorldExample: enhanced.realWorldExample,
    debuggingSteps: enhanced.debuggingSteps,
    fypConnection: enhanced.fypConnection,
    quiz: enhanced.quiz,
    nextLesson: enhanced.nextLesson,
    beginnerMode: enhanced.beginnerMode,
    engineeringMode: enhanced.engineeringMode,
    fypModeData: enhanced.fypModeData,
  };
});

