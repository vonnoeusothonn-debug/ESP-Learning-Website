import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'ESP32 Architecture',
    type: 'multiple-choice',
    question: 'ហេតុអ្វីបានជាអ្នកមិនគួរប្រើប្រាស់ជើង ADC2 សម្រាប់អាន Sensor អាណាឡូក នៅពេលដែលប្រព័ន្ធ Wi-Fi កំពុងដំណើរការ?',
    options: [
      'ADC2 គាំទ្រ Resolution ត្រឹមតែ 8-bit ប៉ុណ្ណោះ មិនដល់ 12-bit ដូច ADC1 ទេ',
      'Hardware SAR របស់ ADC2 ត្រូវបានប្រើប្រាស់រួមគ្នាជាមួយ Wi-Fi RF Driver ធ្វើឱ្យជាប់គាំង (Resource Conflict) ពេល Wi-Fi បើក',
      'ADC2 អាចវាស់តង់ស្យុងបានអតិបរមាត្រឹមតែ 1.1V ប៉ុណ្ណោះ',
      'ADC2 គ្មាន Internal Calibration eFuses ក្នុងបន្ទះឈីបឡើយ'
    ],
    correctIndex: 1,
    explanation: 'Hardware Peripheral របស់ ADC2 ត្រូវបានចែករំលែកជាមួយ Wi-Fi និង Bluetooth Subsystem។ នៅពេលដែល Wi-Fi Driver ចាប់ផ្តើមដំណើរការ ការហៅអនុគមន៍ analogRead() លើជើង ADC2 នឹងត្រឡប់តម្លៃខុស ឬបរាជ័យភ្លាមៗ។ ដូច្នេះរាល់សេនស័រអាណាឡូក (LDR, Potentiometer) ត្រូវតែភ្ជាប់ទៅកាន់ ADC1 ជានិច្ច!',
    relatedLessonId: 6
  },
  {
    id: 'q2',
    category: 'Electronics & Protection',
    type: 'circuit-debug',
    question: 'និស្សិតម្នាក់បានត Relay 24V ទៅកាន់ N-Channel MOSFET ដោយបញ្ជាចេញពី ESP32 GPIO។ សៀគ្វីដំណើរការបាន 3 វិនាទី រួច MOSFET ឆ្លងសៀគ្វីឆេះខូចជារៀងរហូត។ តើគ្រឿងបន្លាស់ការពារដ៏សំខាន់មួយណាដែលគាត់ភ្លេចដាក់?',
    circuitSnippet: `
         +24V Supply ──────────[ Relay Coil ]──────────┐
                                                       │ Drain
                      ESP32 GPIO ────[ 100Ω ]──────── Gate (MOSFET)
                                                       │ Source
                                                      GND
    `,
    options: [
      'Resistor 10kΩ តស៊េរីជាមួយខ្សែភ្លើង 24V',
      'Flyback Diode (ដូចជា 1N4007 ឬ Schottky SS34) ស្របបញ្ច្រាសនឹងបង្គោល Coil របស់ Relay',
      'Electrolytic Capacitor 100µF តស៊េរីជាមួយម៉ូទ័រ',
      'Pull-up Resistor ពី Drain ទៅ +24V'
    ],
    correctIndex: 1,
    explanation: 'នៅពេល MOSFET បិទ (OFF) ភ្លាមៗ ដែនម៉ាញេទិចក្នុង Relay Coil នឹងរលំរលាយ បង្កើតតង់ស្យុងបញ្ច្រាស Back-EMF យ៉ាងខ្លាំង ($V = -L \\cdot di/dt$) ឡើងដល់លើស 100V–200V។ បើគ្មាន Flyback Diode ស្របបញ្ច្រាសនឹង Coil ដើម្បីបន្សាបថាមពលនេះទេ តង់ស្យុងខ្ពស់នោះនឹងទម្លុះស្រទាប់ Oxide រវាង Drain និង Source របស់ MOSFET ឆេះភ្លាមៗ។',
    relatedLessonId: 5
  },
  {
    id: 'q3',
    category: 'PCB Design & KiCad',
    type: 'pcb-decision',
    question: 'នៅពេលរចនាប្លង់ PCB 2 ស្រទាប់លើ KiCad ដែលមានផ្នែក Motor Driver 24V 4A និងផ្នែក ESP32 Microcontroller 3.3V តើយុទ្ធសាស្ត្រតភ្ជាប់ Ground មួយណាដែលល្អបំផុត?',
    options: [
      'តខ្សែ Ground ជាសង្វាក់ (Daisy Chain) ពីម៉ូទ័រ កាត់តាម ESP32 ទើបទៅកាន់បង្គោលអាគុយ',
      'បំបែក Power Ground (PGND) និង Logic Ground (DGND) ដាច់ដោយឡែកពីគ្នា ហើយភ្ជាប់គ្នាត្រឹមតែចំណុចតែមួយគត់នៅជិត Terminal អាគុយ (Star Ground Topology)',
      'ទុកឱ្យ ESP32 គ្មាន Ground គ្រាន់តែតជើង VDD ទៅ 3.3V',
      'តភ្ជាប់តង់ស្យុង 24V ចូលទៅ Ground របស់ ESP32 ដោយផ្ទាល់'
    ],
    correctIndex: 1,
    explanation: 'Star Ground Topology ធានាថាចរន្តធំ 4A របស់ម៉ូទ័រដែលត្រឡប់ទៅអាគុយ នឹងមិនរត់កាត់ដានស្ពាន់ Logic Ground របស់ ESP32 ឡើយ។ ប្រសិនបើតជា Daisy Chain បាតុភូត Ground Bounce នឹងធ្វើឱ្យ Sensor អានតម្លៃលោតខុស និង ESP32 គាំងភ្លាមៗ។',
    relatedLessonId: 3
  },
  {
    id: 'q4',
    category: 'Embedded Firmware',
    type: 'code-debugging',
    question: 'ពិនិត្យមើលកូដ ISR ខាងក្រោមនេះ។ ហេតុអ្វីបានជា ESP32 កើតមានកំហុស Guru Meditation Panic Error រៀងរាល់ពេលចុចប៊ូតុង Emergency Stop?',
    codeSnippet: `void handleEStop() {
  Serial.println("EMERGENCY STOP TRIGGERED!");
  delay(500);
  digitalWrite(MOTOR_PIN, LOW);
}`,
    options: [
      'កូដបានភ្លេចប្រើប្រាស់ពាក្យ digitalWrite()',
      'ហាមប្រើ Serial.println() និង delay() នៅក្នុង ISR ដាច់ខាត ព្រោះវាជា Blocking Code និងប្រើ UART Interrupts ជាន់គ្នា',
      'ជើង MOTOR_PIN មិនអាចកំណត់ជា LOW ក្នុង ISR បានទេ',
      'ESP32 មិនគាំទ្រ External Interrupt លើ GPIO ឡើយ'
    ],
    correctIndex: 1,
    explanation: 'Interrupt Service Routine (ISR) ត្រូវតែដំណើរការរហ័សបំផុត (Nanoseconds/Microseconds)។ អនុគមន៍ Serial.println() ប្រើប្រាស់ UART Interrupts និង Memory Allocation ចំណែក delay() ដំណើរការដោយ SysTick Timer។ ការហៅអនុគមន៍ទាំងពីរនេះក្នុង ISR នឹងធ្វើឱ្យ CPU ជាប់គាំង (Deadlock) និង Trigger Interrupt Watchdog Timeout Panic ភ្លាមៗ!',
    relatedLessonId: 8
  },
  {
    id: 'q5',
    category: 'Communication Protocols',
    type: 'multiple-choice',
    question: 'នៅលើបណ្តាញ CAN Bus 2.0B (TWAI) រវាង Solar Tracker និង Main Gateway ហេតុអ្វីបានជាត្រូវមាន Termination Resistor 120Ω នៅចុងបញ្ចប់ទាំងសងខាងនៃខ្សែ?',
    options: [
      'ដើម្បីកំណត់កម្រិតតង់ស្យុងផ្គត់ផ្គង់ 12V ទៅឱ្យឧបករណ៍',
      'ដើម្បីផ្គូផ្គង Characteristic Impedance នៃខ្សែ Twisted Pair ការពាររលកសញ្ញាជះត្រឡប់ (Signal Reflections) និងបន្សាបចរន្តបញ្ច្រាស',
      'ដើម្បីបង្កើនល្បឿន Clock របស់ ESP32 ពី 80MHz ទៅ 240MHz',
      'ដើម្បីបំប្លែងទិន្នន័យពី CAN ទៅជា Wi-Fi ដោយស្វ័យប្រវត្ត'
    ],
    correctIndex: 1,
    explanation: 'ខ្សែ Twisted Pair CAN Bus មាន Characteristic Impedance ប្រហែល 120Ω។ ប្រសិនបើចុងបញ្ចប់នៃខ្សែមិនត្រូវបានបញ្ចប់ដោយ Resistor 120Ω ទេ រលកសញ្ញាអគ្គិសនីល្បឿនលឿន (High-Speed Edge) នឹងជះត្រឡប់មកវិញ (Signal Reflection) ជាន់លើកញ្ចប់ទិន្នន័យ បណ្តាលឱ្យកើតមានកំហុស CRC Error និង Bus-Off State។',
    relatedLessonId: 11
  },
  {
    id: 'q6',
    category: 'Solar Engineering',
    type: 'multiple-choice',
    question: 'ប្រព័ន្ធ Dual-Axis Solar Tracker បំពាក់បន្ទះសូឡា 250Wp។ បើធៀបនឹងបន្ទះសូឡានៅស្ងៀម (Fixed Tilt) តើប្រព័ន្ធ Dual-Axis អាចបង្កើតថាមពលបន្ថែមបានប៉ុន្មានភាគរយក្នុងមួយថ្ងៃ?',
    options: [
      'ប្រហែល 5% ទៅ 8%',
      'ប្រហែល 30% ទៅ 40% (ដោយរក្សាមុំពន្លឺកែង 90° ចាប់ពីព្រឹកដល់ល្ងាច)',
      'ច្រើនជាង 300%',
      'មិនកើនទាល់តែសោះ ដោយសារម៉ូទ័រស៊ីភ្លើងអស់'
    ],
    correctIndex: 1,
    explanation: 'តាមទិន្នន័យពិសោធន៍ជាក់ស្តែង ប្រព័ន្ធ Dual-Axis Solar Tracker បង្កើតថាមពលអគ្គិសនីកើនឡើងពី 30% ដល់ 40% បើធៀបនឹង Fixed Panel ពីព្រោះបន្ទះសូឡាតម្រង់កែង 90 ដឺក្រេចំកាំរស្មីព្រះអាទិត្យ ($Cos(0^{\\circ}) = 1.0$) ពេញមួយថ្ងៃ។ ម៉ូទ័រដំណើរការត្រឹមតែប៉ុន្មានវិនាទីម្តងប៉ុណ្ណោះ ដូច្នេះថាមពលដែលម៉ូទ័រស៊ីមានតិចជាង 2% នៃថាមពលដែលផលិតបាន។',
    relatedLessonId: 4
  },
  {
    id: 'q7',
    category: 'Power Systems',
    type: 'true-false',
    question: 'ពិត ឬមិនពិត៖ យើងអាចប្រើប្រាស់ Linear Voltage Regulator LM7805 ឬ AMS1117-5.0 ដើម្បីទម្លាក់តង់ស្យុងពីអាគុយ 24V មក 5V សម្រាប់ ESP32 (ស៊ីចរន្ត 300mA) បានដោយសុវត្ថិភាព និងមិនចាំបាច់មាន Heatsink ឡើយ។',
    options: [
      'ពិត (True)',
      'មិនពិត (False — កម្តៅភាយចេញដល់ទៅ 5.7 Watts នឹងធ្វើឱ្យ IC ក្តៅឆេះរលាយក្នុងពេលប៉ុន្មានវិនាទី!)'
    ],
    correctIndex: 1,
    explanation: 'មិនពិតដាច់ខាត! Linear Regulator ទម្លាក់តង់ស្យុងដោយដុតថាមពលលើសចោលជាកម្តៅ៖ $P = (Vin - Vout) \\times I = (24V - 5V) \\times 0.3A = 5.7 Watts$! បើគ្មាន Heatsink ធំស្មើបាតដៃទេ បន្ទះឈីបនឹងឡើងកម្តៅលើស 150°C និងឆេះភ្លាមៗ។ ដំណោះស្រាយត្រឹមត្រូវគឺត្រូវតែប្រើ Step-Down Buck Converter (ដូចជា MP1584 ឬ LM2596) ដែលមានប្រសិទ្ធភាព 92%។',
    relatedLessonId: 5
  },
  {
    id: 'q8',
    category: 'FreeRTOS & Embedded',
    type: 'code-debugging',
    question: 'ពេលបង្កើត FreeRTOS Task លើ ESP32 ដោយកូដខាងក្រោម ហេតុអ្វីបានជា CPU Core គាំងបោះសារ "Task Watchdog Reset (IDLE task didn\'t get to run)"?',
    codeSnippet: `void MotorLoopTask(void *pvParameters) {
  while(1) {
    readSensors();
    computePID();
    // ភ្លេចដាក់ vTaskDelay()!
  }
}`,
    options: [
      'ដោយសារ Task គ្មាន return 0;',
      'ដោយសារ Task រត់ Loop 100% ជាប់រហូត គ្មាន vTaskDelay() ធ្វើឱ្យ FreeRTOS IDLE Task មិនអាចដំណើរការដើម្បី Feed Watchdog Timer បាន',
      'ដោយសារ PID មិនអាចដំណើរការក្នុង FreeRTOS បាន',
      'ដោយសារ ESP32 គ្មាន Watchdog Timer'
    ],
    correctIndex: 1,
    explanation: 'ក្នុង FreeRTOS ប្រសិនបើ Task មួយមាន Priority ស្មើ ឬខ្ពស់ជាង IDLE Task (Priority 0) ហើយរត់ Infinite Loop ដោយគ្មានការផ្អាក (Non-yielding) នោះ IDLE Task នឹងមិនទទួលបាន CPU Cycles ដើម្បីដំណើរការឡើយ។ បន្ទាប់ពី 5 វិនាទី Task Watchdog Timer (TWDT) នឹងកេះធ្វើឱ្យ ESP32 Reset ភ្លាមៗ។ ត្រូវតែបន្ថែម vTaskDelay(pdMS_TO_TICKS(10)); ជានិច្ច!',
    relatedLessonId: 15
  }
];
