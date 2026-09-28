import { PcbComponent } from '../types';

export const PCB_COMPONENTS: PcbComponent[] = [
  {
    id: 'esp32-s3-wroom-1',
    name: 'ESP32-S3-WROOM-1',
    category: 'MCU',
    function: 'ខួរក្បាលបញ្ជាចម្បង Dual-Core 240MHz SoC ទទួលខុសត្រូវលើ Motor Kinematics, Sensor Fusion, CAN Bus និង Wi-Fi Telemetry។',
    voltage: '3.0V – 3.6V (Nominal 3.3V)',
    current: 'Active RF: 355mA peak; Deep Sleep: 15µA',
    packageType: 'Surface Mount Module with PCB Antenna',
    thtSmd: 'SMD',
    recommendedFootprint: 'RF_Module:ESP32-S3-WROOM-1',
    whyUsed: 'ផ្តល់នូវ CPU 32-bit Xtensa ចំនួនពីរដាច់ដោយឡែកពីគ្នា ដើម្បីញែក Control Loop របស់ម៉ូទ័រចេញពី Network Stack, មាន 44 GPIOs, Hardware CAN (TWAI), និង Native USB។',
    alternatives: ['ESP32-WROOM-32E (ជំនាន់ចាស់, GPIO តិចជាង)', 'Raspberry Pi Pico W (Single-core FreeRTOS, គ្មាន Hardware CAN)'],
    commonMistakes: [
      'ចាក់ដានស្ពាន់ Copper Pour នៅក្រោមអង់តែន PCB Antenna ធ្វើឱ្យបាត់បង់សញ្ញា Wi-Fi/BLE ទាំងស្រុង។',
      'បញ្ចូលសញ្ញា 5V ផ្ទាល់ទៅជើង GPIO ដោយគ្មាន Logic Level Shifter បណ្តាលឱ្យឆេះឈីបភ្លាមៗ។'
    ],
    solarTrackerRole: 'ខួរក្បាលបញ្ជាចម្បងនៅលើបន្ទះ PCB នៃបង្គោលសូឡា (Tracker Node) និងនៅលើ Base Station Gateway ក្នុងបន្ទប់បញ្ជា។'
  },
  {
    id: 'irlz44n-mosfet',
    name: 'IRLZ44N Logic-Level N-MOSFET',
    category: 'Drivers',
    function: 'កុងតាក់ Low-side Switching សម្រាប់បើក-បិទ Relay ម៉ូទ័រ 24V និងហ្វ្រាំងអគ្គិសនីរបស់ Actuator។',
    voltage: 'Vds = 55V Max',
    current: 'Id = 47A Max; Continuous Design: 5A',
    packageType: 'TO-220',
    thtSmd: 'THT',
    recommendedFootprint: 'Package_TO_SOT_THT:TO-220-3_Vertical',
    whyUsed: 'មាន Logic-Level Gate Threshold ទាប (Vgs(th) = 1.0V - 2.0V) ធានាថា MOSFET នឹងបើកចរន្តពេញលេញ (Saturation) ដោយផ្ទាល់ពីជើង 3.3V របស់ ESP32 ដោយមាន Rds(on) ត្រឹម 22mΩ។',
    alternatives: ['AO3400A (SMD SOT-23, 5.7A, ល្អសម្រាប់បន្ទះតូច)', 'FQP30N06L (TO-220 30A Logic Level)'],
    commonMistakes: [
      'ប្រើប្រាស់ IRF540N ជំនួស (ដែលត្រូវការ Vgs = 10V) ពេលបញ្ជាដោយ 3.3V វានឹងដំណើរការក្នុង Linear Region ក្តៅឆេះភ្លាមៗ។',
      'ភ្លេចដាក់ Pull-down Resistor 10kΩ នៅ Gate ធ្វើឱ្យម៉ូទ័រវិលដោយឯកឯងពេលកំពុង Flash កូដ ESP32។'
    ],
    solarTrackerRole: 'បញ្ជា Relay ប្តូរទិសដៅរុញ-ទាញរបស់ Linear Actuator 24V និងកាត់ផ្តាច់ចរន្តពេល E-Stop។'
  },
  {
    id: 'smaj28a-tvs',
    name: 'SMBJ28CA Bi-directional TVS Diode',
    category: 'Protection',
    function: 'ស្រូបទាញតង់ស្យុងលើស (Transient Voltage Suppression) ការពាររន្ទះបាញ់ប្រយោល និង Back-EMF Spikes លើខ្សែភ្លើង 24V។',
    voltage: 'Working Standoff: 28V; Clamping: 45.4V',
    current: 'Peak Pulse Current (Ipp): 13.2A (600W Pulse)',
    packageType: 'DO-214AA (SMB)',
    thtSmd: 'SMD',
    recommendedFootprint: 'Diode_SMD:D_SMB',
    whyUsed: 'មានល្បឿនកាត់តង់ស្យុងលឿនបំផុតកម្រិត Picoseconds និងស្រូបកម្លាំង Surge បានដល់ 600W ការពារគ្រឿងបន្លាស់លើ PCB ពីខ្យល់ព្យុះរន្ទះ។',
    alternatives: ['1.5KE33CA (THT Through-hole 1500W)', 'SMAJ28CA (ទំហំតូចជាង 400W)'],
    commonMistakes: [
      'ជ្រើសរើស TVS Diode ដែលមាន Standoff Voltage ទាបជាងតង់ស្យុងសាកពេញរបស់អាគុយ (ឧ. រើស 24V ពេលអាគុយសាកឡើង 29V ធ្វើឱ្យ TVS ឆេះខ្លោច)។'
    ],
    solarTrackerRole: 'ការពារខ្សែភ្លើងមេចូល 24V ពីបន្ទះសូឡា និងអាគុយនៅច្រកទ្វារដំបូងនៃបន្ទះ PCB។'
  },
  {
    id: 'mp1584-buck',
    name: 'MP1584 Step-Down Buck Converter IC',
    category: 'Power',
    function: 'ទម្លាក់តង់ស្យុងពី 24V DC មក 5V DC សម្រាប់ផ្គត់ផ្គង់ប្រព័ន្ធ Logic ដោយមានប្រសិទ្ធភាពខ្ពស់ 92%។',
    voltage: 'Input: 4.5V – 28V; Output: 5.0V Regulated',
    current: 'Output Current: 3.0A Max (1.5A Continuous)',
    packageType: 'SOIC-8 with Exposed Thermal Pad',
    thtSmd: 'SMD',
    recommendedFootprint: 'Package_SO:SOIC-8-1EP_3.9x4.9mm_P1.27mm_EP_2.41x3.3mm',
    whyUsed: 'ដំណើរការនៅ Switching Frequency ខ្ពស់រហូតដល់ 1.5MHz ធ្វើឱ្យប្រើប្រាស់ Inductor និង Capacitor ទំហំតូច ស៊ីផ្ទៃ PCB តិច និងមិនក្តៅដូច LDO។',
    alternatives: ['LM2596 (ទំហំធំជាង, ប្រេកង់ទាប 150kHz)', 'XL4015 (សម្រាប់ចរន្តធំ 5A)'],
    commonMistakes: [
      'ដានស្ពាន់ត្រង់ Switching Node (ជើង SW, Inductor, Diode) គូសវែងពេក បង្កើត EMI Radiation រំខានដល់ I2C Bus និង Wi-Fi។',
      'ភ្លេចផ្សារ Thermal Pad ខាងក្រោមបន្ទះឈីបចុះ Ground ធ្វើឱ្យ IC ឡើងកម្តៅកាត់បន្ថយចរន្ត (Thermal Throttling)។'
    ],
    solarTrackerRole: 'ទម្លាក់ថាមពលពីអាគុយ 24V មកបង្កើត 5V Rail សម្រាប់ចិញ្ចឹម 3.3V LDO, OLED Display, និង Relay Coils។'
  },
  {
    id: 'sn65hvd230-can',
    name: 'SN65HVD230 3.3V CAN Transceiver',
    category: 'Communication',
    function: 'បំប្លែងសញ្ញា Logic 3.3V របស់ ESP32 TWAI Controller ទៅជា Differential Signal CAN_H និង CAN_L កម្រិតឧស្សាហកម្ម។',
    voltage: '3.0V – 3.6V (ផ្គត់ផ្គង់ 3.3V ផ្ទាល់ មិនបាច់ប្រើ Level Shifter)',
    current: 'Standby: 370µA; Dominant Transmit: 50mA',
    packageType: 'SOIC-8',
    thtSmd: 'SMD',
    recommendedFootprint: 'Package_SO:SOIC-8_3.9x4.9mm_P1.27mm',
    whyUsed: 'ដំណើរការលើ 3.3V ត្រូវគ្នា 100% ជាមួយជើង GPIO របស់ ESP32-S3 ដោយមិនបាច់បន្ថែមសៀគ្វី Level Shifter ដូចឈីប TJA1050 (5V) ឡើយ។',
    alternatives: ['MCP2551 (5V Only, ត្រូវការ Level Shifter)', 'TCAN334 (Texas Instruments 3.3V CAN FD)'],
    commonMistakes: [
      'ភ្លេចដាក់ Resistor 120Ω នៅចុងបញ្ចប់ទាំងសងខាងនៃខ្សែ CAN Bus (Termination Resistor) ធ្វើឱ្យមានសញ្ញាជះត្រឡប់ (Reflections) បាត់បង់កញ្ចប់ទិន្នន័យ។'
    ],
    solarTrackerRole: 'បញ្ជូនទិន្នន័យ Telemetry ចម្ងាយ 50 ម៉ែត្រ ពីបង្គោលសូឡាខាងក្រៅ ចូលមកទូបញ្ជាក្នុងផ្ទះដោយសុវត្ថិភាព គ្មានការរំខានដោយរន្ទះ។'
  },
  {
    id: 'bno085-imu',
    name: 'BNO085 9-DOF IMU Sensor Module',
    category: 'Sensors',
    function: 'វាស់មុំផ្អៀងពិតប្រាកដ (Pitch, Roll, Heading) តាមរយៈ 32-bit ARM Cortex-M0+ Sensor Fusion Hub ខាងក្នុង។',
    voltage: '2.4V – 3.6V (3.3V Logic)',
    current: 'Active Fusion: 16.5mA',
    packageType: '28-pin LGA on Breakout PCB',
    thtSmd: 'Both',
    recommendedFootprint: 'Connector_PinHeader_2.54mm:PinHeader_1x06_P2.54mm_Vertical',
    whyUsed: 'មិនដូច MPU6050 ដែលមាន Gyro Drift ខ្លាំង BNO085 រត់ក្បួនគណនា Kalman Fusion កម្រិតខ្ពស់ខាងក្នុងឈីបផ្ទាល់ ផ្តល់នូវ Quaternion ដែលមានស្ថិរភាពដាច់ខាត គ្មាន Drift ឡើយ។',
    alternatives: ['MPU6050 (ថោក ប៉ុន្តែ Drift ខ្លាំង ត្រូវការគណនា DMP ស្មុគស្មាញ)', 'BNO055 (ជំនាន់មុន កម្រិត Sensor Fusion យឺតជាង)'],
    commonMistakes: [
      'ដាក់ BNO085 នៅជិតម៉ូទ័រ ឬដែកមេដែកខ្លាំង ធ្វើឱ្យ Magnetometer ចាប់ដែនម៉ាញេទិកខុស (Magnetic Distortion)។',
      'ខ្វះ Pull-up Resistor លើខ្សែ I2C SDA/SCL។'
    ],
    solarTrackerRole: 'ដើរតួជាភ្នែកវាស់មុំផ្អៀងរបស់បន្ទះសូឡា ផ្តល់ទិន្នន័យត្រឡប់មកកាន់ Closed-Loop PID Controller ដើម្បីតម្រង់ចំកណ្តាលព្រះអាទិត្យ។'
  }
];
