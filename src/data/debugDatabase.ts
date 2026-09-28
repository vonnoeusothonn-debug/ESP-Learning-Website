import { DebugIssue } from '../types';

export const DEBUG_DATABASE: DebugIssue[] = [
  // ESP32 CATEGORY
  {
    id: 'esp32-not-detected',
    category: 'ESP32',
    title: 'ESP32 រកមិនឃើញ / បាត់ COM Port លើកុំព្យូទ័រ',
    symptoms: [
      'Arduino IDE ឬ PlatformIO បង្ហាញសារ "No serial port found" ឬ "Port not detected"។',
      'Device Manager ក្នុង Windows មិនឃើញឧបករណ៍ Silicon Labs CP210x ឬ CH340 ឡើយ។',
      'ពេលដោតខ្សែ USB ទៅកុំព្យូទ័រ គ្មានសំឡេងឆ្លើយតបអ្វីទាំងអស់។'
    ],
    possibleCauses: [
      'ប្រើប្រាស់ខ្សែ USB "Charge-Only" (ខ្សែសាកថោកៗដែលគ្មានខ្សែទិន្នន័យ D+ និង D- ខាងក្នុង)។',
      'ខ្វះ Driver USB-to-UART (CP2102 ឬ CH340 Driver) លើប្រព័ន្ធប្រតិបត្តិការ Windows/Mac។',
      'រលុង ឬដាច់ជើងស្ពាន់ត្រង់រន្ធ USB Type-C Connector (Cold Solder Joint)។',
      'ដាច់ USB Polyfuse នៅលើបន្ទះ Development Board ដោយសារឆ្លងចរន្ត។'
    ],
    testingMethod: '1) សាកល្បងប្តូរខ្សែ USB ដែលដឹងច្បាស់ថាអាចផ្ទេរទិន្នន័យទូរសព្ទបាន។ 2) បើកមើល Device Manager លើ Windows។ 3) ប្រើ Multimeter វាស់តង់ស្យុងចន្លោះជើង VBUS និង GND (ត្រូវតែចេញ 4.75V ដល់ 5.25V)។',
    solution: 'ដំឡើង Driver CP210x ឬ CH340 ចុងក្រោយបំផុតពី Website ផ្លូវការ។ ប្តូរទៅប្រើខ្សែ USB Data Cable ល្អ។ ប្រសិនបើជាបន្ទះ PCB ផ្ទាល់ខ្លួន ត្រូវប្រាកដថាជើង USB D+ (GPIO 20) និង D- (GPIO 19) រត់ត្រង់ដោយគ្មាន Capacitor តស៊េរីឡើយ។',
    preventionTip: 'យកស្កុតពណ៌ក្រហមបិទលើខ្សែ Charge-Only ក្នុងមន្ទីរពិសោធន៍ ដើម្បីកុំឱ្យច្រឡំយកមកប្រើក្នុងការ Program Microcontroller។'
  },
  {
    id: 'esp32-upload-failed-boot-mode',
    category: 'ESP32',
    title: 'Upload បរាជ័យ: "Failed to connect to ESP32: No serial data received"',
    symptoms: [
      'esptool បង្ហាញចំណុចរាប់មិនអស់៖ "Connecting........_____....._____....."។',
      'ដំណើរការ Upload ទទួលបរាជ័យ (Timeout) ក្រោយព្យាយាម 10 ដង។',
      'Serial Monitor បង្ហាញសារ Reset ផ្ទួនៗ "rst:0x10 (RTCWDT_RTC_RESET)"។'
    ],
    possibleCauses: [
      'ESP32 មិនបានចូល Download Bootloader Mode (ជើង GPIO 0 មិនត្រូវបានទាញទៅ LOW ពេល EN ឡើងពី LOW ទៅ HIGH)។',
      'ខ្វះ Capacitor 1µF នៅចន្លោះជើង EN (CHIP_PU) និង GND ដើម្បីបង្កើត RC Reset Delay។',
      'មានគ្រឿងបន្លាស់ខាងក្រៅតភ្ជាប់ទៅជើង Strapping Pins (GPIO 0, GPIO 2, GPIO 45, GPIO 46) ទាញកម្រិត Logic ខុសពេល Boot។'
    ],
    testingMethod: 'ចុចប៊ូតុង BOOT លើបន្ទះ ESP32 ឱ្យជាប់ -> ចុច Upload លើ Arduino IDE -> ពេលឃើញពាក្យ "Connecting..." លើ Console ទើបលែងដៃពីប៊ូតុង BOOT។ ប្រសិនបើ Upload ជោគជ័យ មានន័យថាសៀគ្វី Auto-Reset ខ្វះ Delay។',
    solution: 'ផ្សារ Capacitor SMD 1µF ទៅ 10µF នៅចន្លោះជើង EN និង GND លើបន្ទះ PCB។ វានឹងបង្កើត Timing Delay ឱ្យ Host PC ទាញ GPIO 0 ចុះ LOW បានទាន់ពេលមុនពេល EN ឡើង HIGH។ ដកខ្សែ Sensor ណាដែលតភ្ជាប់លើ GPIO 0 ចេញពេល Upload។',
    preventionTip: 'ដាក់ Resistor 10kΩ Pull-Up និង Capacitor 1µF នៅជើង EN ជានិច្ចក្នុងគ្រប់គំនូរបំព្រួញ KiCad Schematic។'
  },
  {
    id: 'esp32-brownout-reset',
    category: 'ESP32',
    title: 'Brownout Detector Triggered (ESP32 ចេះតែ Reset ញឹកញាប់)',
    symptoms: [
      'ESP32 ចាប់ផ្តើមដំណើរការបានបន្តិច ស្រាប់តែ Reset ឡើងវិញរៀងរាល់ពេល Wi-Fi ចាប់ផ្តើមភ្ជាប់។',
      'Serial Monitor បោះសារកំហុស៖ "Brownout detector was triggered"។',
      'ភ្លើង LED លើបន្ទះស្រអាប់ ឬព្រិចខ្សោយមួយភ្លែត។'
    ],
    possibleCauses: [
      'តង់ស្យុងផ្គត់ផ្គង់ 3.3V ធ្លាក់ចុះក្រោម 2.8V ដោយសារចរន្តមិនគ្រប់គ្រាន់ពេល Wi-Fi RF Synthesizer ដំណើរការ (ស៊ីចរន្តខ្ទង់ 350mA Bursts)។',
      'ប្រើខ្សែ USB វែងពេក ឬស្តើងពេក (ធ្វើឱ្យមាន Voltage Drop ធ្លាក់តង់ស្យុងលើខ្សែ)។',
      'បន្ទះ LDO Voltage Regulator (ដូចជា AMS1117-3.3V) ក្តៅខ្លាំង ឬខ្វះ Bulk Capacitor នៅជើង Output។'
    ],
    testingMethod: 'ប្រើ Oscilloscope ឬ Multimeter ចាប់មើលតង់ស្យុង 3.3V Rail ពេលកំពុងភ្ជាប់ Wi-Fi។ ប្រសិនបើតង់ស្យុងធ្លាក់ចុះក្រោម 3.0V បញ្ជាក់ថាប្រភពថាមពលខ្សោយ។',
    solution: 'បន្ថែម Electrolytic ឬ Tantalum Capacitor 220µF ទៅ 470µF នៅជិតជើង 3.3V និង GND របស់ ESP32។ ប្រើ Power Supply ខាងក្រៅដែលផ្តល់ចរន្តយ៉ាងតិច 5V 2A។',
    preventionTip: 'ហាមយកជើង 3.3V របស់ ESP32 ទៅចែកផ្គត់ផ្គង់ដល់ Motor Drivers ឬ Relays ជាដាច់ខាត! ត្រូវប្រើ Power Rail ដាច់ដោយឡែក។'
  },

  // PCB CATEGORY
  {
    id: 'pcb-i2c-bus-hang',
    category: 'PCB',
    title: 'I2C Bus ជាប់គាំង (Wire.endTransmission() មិនព្រមបញ្ចប់)',
    symptoms: [
      'កូដ ESP32 គាំងស្ងាត់ឈឹងត្រង់ Wire.endTransmission() ឬ Wire.requestFrom()។',
      'Serial Monitor លែងបង្ហាញទិន្នន័យ (Hangs completely)។',
      'ឧបករណ៍ I2C (BNO085 ឬ DS3231) មិនឆ្លើយតប ACK មកវិញ។'
    ],
    possibleCauses: [
      'ខ្វះ Pull-up Resistors លើខ្សែ SDA និង SCL (ខ្សែទាំងពីរស្ថិតក្នុង Floating State)។',
      'មានឧបករណ៍ Slave ណាមួយទាញខ្សែ SDA ជាប់ទៅ LOW ដោយសារ Power Supply របស់វាបាត់បង់ (I2C Bus Lockup)។',
      'ខ្សែ I2C រត់ជិតខ្សែម៉ូទ័រ 24V ពេក ធ្វើឱ្យ EMI Noise បង្កើត False Clock Pulses។'
    ],
    testingMethod: '1) ប្រើ Multimeter វាស់តង់ស្យុងលើជើង SDA និង SCL (ពេលទំនេរ ត្រូវតែចេញ 3.3V ទាំងសងខាង)។ ប្រសិនបើតង់ស្យុងចេញ 0V មានន័យថាខ្វះ Pull-up ឬមានជើងឆ្លងដី។ 2) រត់កូដ I2C Scanner មើលថាតើឧបករណ៍ណាខ្លះឆ្លើយតប។',
    solution: 'ដាក់ Resistor 2.2kΩ ដល់ 4.7kΩ Pull-Up ពី SDA ទៅ 3.3V និង SCL ទៅ 3.3V។ បន្ថែម I2C Bus Clear Routine ក្នុង setup() ដោយបញ្ចេញ Clock Pulses ចំនួន 9 ដងលើ SCL ដើម្បីដោះលែង SDA ពេលមានឧបករណ៍ជាប់គាំង។',
    preventionTip: 'ដាក់ Ground Guard Trace អមសងខាងខ្សែ SDA និង SCL នៅលើប្លង់ PCB និងរក្សាគម្លាតយ៉ាងតិច 10mm ពីដានស្ពាន់ម៉ូទ័រ 24V។'
  },
  {
    id: 'pcb-motor-driver-overheating',
    category: 'PCB',
    title: 'BTS7960 Motor Driver ក្តៅខ្លាំង ឬខូច MOSFET',
    symptoms: [
      'បន្ទះ BTS7960 ក្តៅខ្លាំងរហូតដល់មិនអាចយកដៃប៉ះបាន ទោះបីម៉ូទ័រដំណើរការត្រឹម 2A ក៏ដោយ។',
      'ម៉ូទ័រវិលបានតែម្ខាង បញ្ជាប្តូរទិសដៅមិនទៅ។',
      'មានក្លិនឈ្ងៀម ឬហុយផ្សែងចេញពីបន្ទះឈីប MOSFET។'
    ],
    possibleCauses: [
      'បញ្ហាកាត់សៀគ្វី Shoot-Through (High-side និង Low-side MOSFETs បើកដំណើរការក្នុងពេលតែមួយដោយគ្មាន Dead-time)។',
      'ខ្វះ Flyback Diode បណ្តាលឱ្យ Inductive Kickback Voltage ពីម៉ូទ័រលើសពីដែនកំណត់ 45V របស់បន្ទះឈីប។',
      'ដានស្ពាន់ PCB តូចចង្អៀតពេក បង្កើតកម្តៅ Resistance និងខ្វះផ្ទៃរំសាយកម្តៅ (Heatsink)។'
    ],
    testingMethod: 'វាស់ចរន្ត Quiescent Current ពេលម៉ូទ័រឈប់ស្ងៀម។ ប្រសិនបើស៊ីចរន្តលើសពី 50mA ទំនងជាមាន MOSFET ឆ្លងសៀគ្វីខាងក្នុង។',
    solution: 'បន្ថែម Dead-Time Delay ចំនួន 5µs ក្នុងកូដ Firmware មុនពេលប្តូរទិសដៅពី Forward ទៅ Reverse។ បន្ថែម Schottky Diodes SS54 (5A 40V) ស្របនឹងម៉ូទ័រ និងបំពាក់បន្ទះអាលុយមីញ៉ូម Heatsink លើ BTS7960។',
    preventionTip: 'ហាមបញ្ជាបញ្ច្រាសទិសដៅម៉ូទ័រភ្លាមៗពី 100% Forward ទៅ 100% Reverse! ត្រូវតែបញ្ចុះ PWM មក 0% រួចរង់ចាំ 500ms ទើបចាប់ផ្តើមបង្កើនល្បឿនទៅទិសដៅម្ខាងទៀត (Soft Reversal)។'
  },

  // CAN BUS CATEGORY
  {
    id: 'can-bus-off-error',
    category: 'CAN',
    title: 'CAN Bus Error: Bus-Off State & Transmission Failure',
    symptoms: [
      'twai_transmit() ត្រឡប់កូដកំហុស ESP_ERR_TIMEOUT ឬ ESP_FAIL។',
      'TWAI Controller ចូលទៅក្នុងស្ថានភាព "Bus-Off" ដោយសារ Transmit Error Counter (TEC) លើសពី 255។',
      'គ្មានកញ្ចប់ទិន្នន័យណាមួយទៅដល់ Master Gateway ឡើយ។'
    ],
    possibleCauses: [
      'ខ្វះ Termination Resistor 120Ω នៅខាងចុងខ្សែ Bus (ធ្វើឱ្យរលកសញ្ញាជះត្រឡប់ Signal Reflection)។',
      'តខ្សែ CAN_H និង CAN_L ច្រឡំគ្នា ឬមានជើងណាមួយដាច់។',
      'Baud Rate មិនដូចគ្នា (ឧទាហរណ៍ មួយកំណត់ 250kbps មួយទៀតកំណត់ 500kbps)។',
      'គ្មានឧបករណ៍ទទួលឆ្លើយតប ACK (Acknowledge Bit) លើបណ្តាញ។'
    ],
    testingMethod: 'វាស់ Resistance ចន្លោះខ្សែ CAN_H និង CAN_L ដោយបិទភ្លើងប្រព័ន្ធ (ត្រូវតែអានបានប្រហែល 60Ω ដោយសារ Resistor 120Ω ពីរគ្រាប់តស្របគ្នា)។ បើអានបាន 120Ω បញ្ជាក់ថាបាត់ Termination Resistor មួយគ្រាប់។ បើអានបាន Infinite បញ្ជាក់ថាគ្មាន Resistor ទាំងពីរ។',
    solution: 'ដាក់ Resistor 120Ω នៅចុងបញ្ចប់ទាំងសងខាងនៃខ្សែ CAN Bus។ ពិនិត្យកំណត់ Baud Rate 250kbps ឱ្យដូចគ្នា 100% លើគ្រប់ Node ទាំងអស់។',
    preventionTip: 'ប្រើប្រាស់ខ្សែ Twisted Pair Shielded Cable (ដូចជាខ្សែ Belden ឬ Cat6) សម្រាប់រត់ខ្សែ CAN Bus លើបង្គោលសូឡា។'
  },

  // MQTT CATEGORY
  {
    id: 'mqtt-disconnect-loop',
    category: 'MQTT',
    title: 'MQTT ផ្តាច់ការតភ្ជាប់រហូត (Disconnect / Reconnect Loop)',
    symptoms: [
      'Serial Monitor បង្ហាញ៖ "MQTT Disconnected, rc=-2" ឬ "rc=5" រៀងរាល់ 10 វិនាទីម្តង។',
      'Dashboard Node-RED លោតភ្លឹបភ្លែត បាត់បង់ទិន្នន័យ។',
      'ESP32 ចំណាយពេល Reconnect រហូត ធ្វើឱ្យ Control Loop របស់ម៉ូទ័ររអាក់រអួល។'
    ],
    possibleCauses: [
      'ប្រើប្រាស់ Client ID ដូចគ្នា 2 ឧបករណ៍ (ពេល ESP32 ទីពីរភ្ជាប់ Broker នឹងទាត់ ESP32 ទីមួយចេញភ្លាម)។',
      'កញ្ចប់ទិន្នន័យ JSON ផ្ញើចេញធំជាងទំហំ Buffer អតិបរមារបស់ PubSubClient (ស្តង់ដារគឺ 128 bytes ប៉ុណ្ណោះ)។',
      'ភ្លេចហៅអនុគមន៍ client.loop() ក្នុង void loop() ធ្វើឱ្យ Broker គិតថា Client បានងាប់ (Keep-Alive Timeout)។'
    ],
    testingMethod: 'ពិនិត្យមើល Return Code របស់ MQTT: rc=-2 (Connect Failed / Wi-Fi issue), rc=5 (Unauthorized / User & Pass error), rc=-4 (Connection Timeout)។',
    solution: 'បង្កើត Client ID ដោយប្រើ MAC Address របស់ ESP32៖ String clientId = "ESP32-" + WiFi.macAddress();។ បង្កើនទំហំ Buffer តាមរយៈ client.setBufferSize(512); មុនពេលភ្ជាប់។ ប្រាកដថាហៅ client.loop() ទៀងទាត់។',
    preventionTip: 'រត់ MQTT Task នៅលើ Core 0 ដាច់ដោយឡែកក្នុង FreeRTOS ដើម្បីកុំឱ្យការ Reconnect ប៉ះពាល់ដល់ការបញ្ជាម៉ូទ័រនៅលើ Core 1។'
  }
];
