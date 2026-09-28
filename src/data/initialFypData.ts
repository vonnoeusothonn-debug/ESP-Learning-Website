import { KanbanTask, NotebookEntry } from '../types';

export const INITIAL_KANBAN_TASKS: KanbanTask[] = [
  {
    id: 'task-1',
    title: 'ESP32-S3 DevKit Bringup & Native USB Testing',
    description: 'Flash កូដតេស្ត Blink និងព័ត៌មានប្រព័ន្ធតាម Serial Monitor ដើម្បីផ្ទៀងផ្ទាត់ការតភ្ជាប់ USB, CPU Frequency 240MHz និងទំហំ Flash Memory 8MB។',
    status: 'completed',
    category: 'Firmware',
    priority: 'High',
    milestone: 'ដំណាក់កាលទី 1: ការធ្វើតេស្ត Subsystems លើតុពិសោធន៍',
    deliverable: 'បន្ទះ ESP32-S3 ដំណើរការប្រក្រតីជាមួយ UART 115200 Baud។'
  },
  {
    id: 'task-2',
    title: 'ការធ្វើ Calibration ក្បាលសេនស័រ 4-Quadrant LDR',
    description: 'តេស្តសៀគ្វី Voltage Divider ជាមួយ LDR GL5528 ចំនួន 4 គ្រាប់ និង Resistor 10kΩ។ វាស់តម្លៃ ADC Voltage ក្រោមពន្លឺថ្ងៃ និងក្រោមស្រមោល ដើម្បីកំណត់ Dead-band 150 counts។',
    status: 'completed',
    category: 'Hardware',
    priority: 'High',
    milestone: 'ដំណាក់កាលទី 1: ការធ្វើតេស្ត Subsystems លើតុពិសោធន៍',
    deliverable: 'ម៉ាទ្រីសកម្រិតពន្លឺ East-West និង North-South ច្បាស់លាស់។'
  },
  {
    id: 'task-3',
    title: 'BNO085 9-DOF IMU Sensor Fusion Driver',
    description: 'តភ្ជាប់ BNO085 តាម I2C (Address 0x4A)។ ទាញយកទិន្នន័យ Rotation Vector Quaternion រួចបំប្លែងទៅជាមុំ Pitch (Elevation) និង Roll (Azimuth) Real-time។',
    status: 'completed',
    category: 'Firmware',
    priority: 'High',
    milestone: 'ដំណាក់កាលទី 1: ការធ្វើតេស្ត Subsystems លើតុពិសោធន៍',
    deliverable: 'ទិន្នន័យមុំលំអៀងត្រឹមត្រូវ ±0.5° សម្រាប់បញ្ជា Closed-Loop PID។'
  },
  {
    id: 'task-4',
    title: 'DS3231 RTC & Sun Position Algorithm (SPA)',
    description: 'អនុវត្តក្បួនគណនា Astronomical PSA Algorithm ដោយប្រើកូអរដោនេភូមិសាស្ត្រ GPS (Lat/Long) និងម៉ោង UTC ពី DS3231 ដើម្បីគណនារកទីតាំងព្រះអាទិត្យពេលមេឃស្រទុំ។',
    status: 'testing',
    category: 'Firmware',
    priority: 'Medium',
    milestone: 'ដំណាក់កាលទី 2: ការរួមបញ្ចូលក្បួនគណនា Closed-Loop',
    deliverable: 'ប្រព័ន្ធបង្វិលសូឡាស្វ័យប្រវត្តទោះបីមេឃមានពពកបាំងថ្ងៃ (Open-loop Tracking)។'
  },
  {
    id: 'task-5',
    title: 'CAN Bus (TWAI) 250kbps Industrial Transceiver',
    description: 'តភ្ជាប់ ESP32 TWAI Controller ទៅកាន់ SN65HVD230 Transceiver ជាមួយ Termination Resistor 120Ω។ ធ្វើតេស្តបញ្ជូនកញ្ចប់ទិន្នន័យ Telemetry ចម្ងាយ 25 ម៉ែត្រ។',
    status: 'in-progress',
    category: 'Firmware',
    priority: 'High',
    milestone: 'ដំណាក់កាលទី 2: ការរួមបញ្ចូលក្បួនគណនា Closed-Loop',
    deliverable: 'ការបញ្ជូនទិន្នន័យគ្មានការបាត់បង់ (Zero Packet Loss) តាមខ្សែ Twisted Pair។'
  },
  {
    id: 'task-6',
    title: 'Dual H-Bridge Motor Driver & Actuator Interlocks',
    description: 'តភ្ជាប់ BTS7960 Driver សម្រាប់ម៉ូទ័រ Azimuth 24V និង Relay SPDT សម្រាប់ Linear Actuator។ អនុវត្តកូដ Soft-Start PWM និង Limit Switch Interlocks។',
    status: 'in-progress',
    category: 'Hardware',
    priority: 'High',
    milestone: 'ដំណាក់កាលទី 2: ការរួមបញ្ចូលក្បួនគណនា Closed-Loop',
    deliverable: 'ម៉ូទ័របង្វិលរលូនគ្មានកន្ត្រាក់ និងកាត់ផ្តាច់ភ្លាមៗពេលប៉ះ Limit Switch។'
  },
  {
    id: 'task-7',
    title: 'រចនាប្លង់ PCB 2 ស្រទាប់លើ KiCad 8.0',
    description: 'គូរ Schematic និងប្លង់ PCB សម្រាប់បន្ទះ Solar Tracker Controller ដោយបញ្ចូល TVS Diode, Reverse Polarity Protection, Buck Converter, ESP32-S3 និង Screw Terminals។',
    status: 'in-progress',
    category: 'PCB',
    priority: 'High',
    milestone: 'ដំណាក់កាលទី 3: ការរចនា និងផលិតបន្ទះ PCB',
    deliverable: 'ឯកសារ Gerber Files, Drill Files, និង BOM ផ្ញើទៅរោងចក្រផលិត។'
  },
  {
    id: 'task-8',
    title: 'Node-RED Dashboard & MQTT Telemetry Integration',
    description: 'រៀបចំ Node-RED Flow ដើម្បីទទួលកញ្ចប់ MQTT JSON ពី ESP32 បង្ហាញជាក្រាហ្វ Power Output, Daily Solar Yield (kWh) និងប៊ូតុង Manual Override។',
    status: 'backlog',
    category: 'IoT',
    priority: 'Medium',
    milestone: 'ដំណាក់កាលទី 4: ប្រព័ន្ធ Cloud SCADA & Defense Preparation',
    deliverable: 'ផ្ទាំងគ្រប់គ្រង Web Dashboard ទំនើបសម្រាប់បង្ហាញជូនគណៈកម្មការការពារនិក្ខេបបទ FYP។'
  }
];

export const INITIAL_NOTEBOOK_ENTRIES: NotebookEntry[] = [
  {
    id: 'note-1',
    title: 'ការធ្វើតេស្ត LDR Voltage Divider ក្រោមពន្លឺថ្ងៃធម្មជាតិ',
    date: '2026-09-15',
    hardware: 'ESP32-S3, 2x GL5528 LDRs, 10kΩ Metal Film 1% Resistors',
    codeVersion: 'v0.2.1-ldr-cal',
    category: 'Testing',
    measurements: 'East LDR: 3.12V (Direct Sun, 85k lux) | West LDR: 0.42V (Full Shadow) | Difference = +2.70V (ADC Delta = 3350 counts)',
    problem: 'នៅពេលពពករសាត់កាត់ ពន្លឺធ្លាក់ចុះទាំងសងខាង ធ្វើឱ្យម៉ូទ័ររំញ័រញាប់ដោយសារតែ noise លោតជុំវិញ threshold 50 counts។',
    solution: 'បានបង្កើន Dead-band Threshold ពី 50 ទៅ 150 counts និងបន្ថែម Moving Average Filter (មធ្យមភាគ 16 samples) ក្នុងកូដ ADC។',
    conclusion: 'ការរំញ័ររបស់ម៉ូទ័រត្រូវបានលុបបំបាត់ទាំងស្រុង។ ប្រព័ន្ធមិនកម្រើកទេពេលពពកបាំង ប៉ុន្តែឆ្លើយតបបានយ៉ាងល្អពេលព្រះអាទិត្យផ្លាស់ទីលើស 2 ដឺក្រេ។'
  },
  {
    id: 'note-2',
    title: 'ការវាស់កម្តៅ Thermal Runaway លើ Linear Actuator 24V',
    date: '2026-09-20',
    hardware: '24V 300mm Linear Actuator, BTS7960 43A H-Bridge, UNI-T Thermal Imager',
    codeVersion: 'v0.3.0-motor-drive',
    category: 'Hardware',
    measurements: 'No-load current: 0.85A | Full load (30kg panel pushed): 2.45A | Stall Current: 4.10A | MOSFET Temp: 42°C',
    problem: 'នៅពេល Actuator រុញដល់ចំណុចចុងបំផុត ចរន្តកើនឡើងដល់ 4.1A ភ្លាមៗ ហើយ Relay ក្តៅឡើងដល់ 58°C ក្នុងរយៈពេល 10 វិនាទី។',
    solution: 'បានបំពាក់ Limit Switch ប្រភេទ Roller Lever NC (Normally Closed) ដាច់ដោយឡែកនៅចុង Stroke ដើម្បីផ្តាច់សញ្ញា PWM ភ្លាមៗនៅកម្រិត Hardware Interrupt។',
    conclusion: 'ម៉ូទ័រត្រូវបានកាត់ផ្តាច់ក្នុងរយៈពេល 2.4 microseconds ពេលប៉ះ Switch ធានាថាមិនមានការឡើងកម្តៅលើសកម្រិតសុវត្ថិភាពឡើយ។'
  },
  {
    id: 'note-3',
    title: 'ការកែសម្រួលដានស្ពាន់ PCB KiCad សម្រាប់សៀគ្វី Buck Converter',
    date: '2026-09-25',
    hardware: 'KiCad 8.0.4, MP1584 Switching Regulator Sub-circuit',
    codeVersion: 'PCB Rev 1.1 Gerber',
    category: 'PCB',
    measurements: 'Input: 24V DC | Output: 5.02V DC | Ripple Voltage: 28mV peak-to-peak នៅចរន្ត 1.2A',
    problem: 'ការរត់ដានស្ពាន់ពីជើង SW pin ទៅ Inductor វែងពេក (12mm) បណ្តាលឱ្យមាន EMI Ringing Spike 2.4V រំខានដល់ជើង I2C SDA។',
    solution: 'បានបង្រួមដានស្ពាន់ Switching Loop ឱ្យនៅសល់ត្រឹម 2.5mm ដាក់ Diode និង Inductor ផ្ទាល់ក្បែរជើង IC និងបន្ថែម Ceramic Cap 22µF X7R នៅជើង Vout។',
    conclusion: 'Ripple Voltage ធ្លាក់ចុះពី 85mV មកនៅត្រឹម 28mV ដែលជាកម្រិតស្អាតល្អបំផុតសម្រាប់ផ្គត់ផ្គង់ដល់ ESP32-S3 និង Sensor នានា។'
  }
];
