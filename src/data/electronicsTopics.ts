import { ElectronicsTopic } from '../types';

export const ELECTRONICS_TOPICS: ElectronicsTopic[] = [
  {
    id: 'ohms-law-power',
    title: "Voltage, Current, Resistance & Ohm's Law (ច្បាប់អូម និងកម្លាំងអគ្គិសនី)",
    category: 'Fundamentals',
    formula: 'V = I · R  |  P = V · I = I² · R = V² / R',
    keyRule: 'ត្រូវតែគណនាការបញ្ចេញកម្តៅ Thermal Dissipation (P = I²R) លើ Shunt Resistor និងខ្សែស្ពាន់ PCB Motor Trace ជានិច្ច ដើម្បីការពារកុំឱ្យឆេះដានសៀគ្វី។',
    explanation: 'Voltage (តង់ស្យុង) គឺជាកម្លាំងរុញច្រានបន្ទុកអគ្គិសនី។ Current (ចរន្ត) គឺជាអត្រានៃការហូរនៃបន្ទុកអគ្គិសនីតាមរយៈចំហាយ។ Resistance (ភាពធន់) គឺជាកម្លាំងរារាំងការហូរនោះ។ ថាមពលដែលបាត់បង់ (Power) នឹងបំប្លែងទៅជាកម្តៅដោយផ្ទាល់។',
    solarTrackerRelevance: 'Linear Actuator 24V ស៊ីចរន្តជាមធ្យម 2.5A និងឡើងដល់ 4.2A ពេលជាប់គាំង (Stall Current)។ នៅកម្រិត 4.2A ទោះបីដានស្ពាន់លើ PCB មានភាពធន់ត្រឹម 0.2Ω ក៏វាធ្វើឱ្យធ្លាក់ចុះតង់ស្យុង 0.84V និងបង្កើតកម្តៅដល់ទៅ 3.53 Watts លើ PCB ដែរ!',
    schematicAscii: `
      +24V Supply ──────────[ Motor / Load ]──────────► To Ground
                                 ▲
                          Current I = V / R
    `,
    designTips: [
      'គណនាទទឹងដានស្ពាន់ PCB (Trace Width) សម្រាប់ខ្សែម៉ូទ័រដើម្បីកុំឱ្យកម្តៅកើនលើស 10°C (ប្រើ Trace Width > 2.5mm សម្រាប់ 4A)។',
      'ត្រូវយកចរន្តអតិបរមាពេលជាប់គាំង (Stall Current) មកគណនាជានិច្ច មិនមែនយកតែចរន្តពេលរត់ធម្មតាឡើយ។',
      'ប្រើ Resistor ប្រភេទ Metal Film កម្រិតលម្អៀង 1% សម្រាប់សៀគ្វីវាស់វែង។'
    ],
    commonMistakes: [
      'យល់ច្រឡំថា Power Supply 24V 10A នឹងបាញ់ចរន្ត 10A ចូលម៉ូទ័រគ្រប់ពេល (តាមពិតបន្ទុកស៊ីចរន្តប៉ុន្មាន Power Supply ផ្តល់ឱ្យតែប៉ុណ្ណឹងទេ)។',
      'ភ្លេចគិតពីអានុភាព Watt របស់ Resistor (ឧ. ប្រើ Resistor 1/4W លើចរន្ត 1A បណ្តាលឱ្យឆេះហុយផ្សែងភ្លាម)។'
    ]
  },
  {
    id: 'voltage-divider',
    title: 'Voltage Divider & ADC Scaling (សៀគ្វីបែងចែកតង់ស្យុង)',
    category: 'Fundamentals',
    formula: 'Vout = Vin · [ R2 / (R1 + R2) ]',
    keyRule: 'ជ្រើសរើស Resistance សរុបចន្លោះ 10kΩ ដល់ 100kΩ៖ បើតូចពេកស៊ីភ្លើងចោលឥតប្រយោជន៍ បើធំពេកនឹងធ្វើឱ្យ ADC អានខុសដោយសារ Sampling Impedance។',
    explanation: 'Voltage Divider ប្រើប្រាស់ Resistor ពីរតជាស៊េរីដើម្បីកាត់បន្ថយតង់ស្យុងខ្ពស់ឱ្យមកនៅទាប។ ក្នុងប្រព័ន្ធ ESP32 យើងប្រើវាដើម្បីបន្ថយតង់ស្យុង 24V ពីបន្ទះសូឡា ឬអាគុយ ឱ្យធ្លាក់មកនៅក្រោម 3.3V ដើម្បីអាចវាស់តាម ADC បានដោយសុវត្ថិភាព។',
    solarTrackerRelevance: 'អាគុយ LiFePO4 24V ពេលសាកពេញឡើងដល់ 29.2V។ ដើម្បីវាស់ដោយសុវត្ថិភាពលើ ESP32 ADC (អតិបរមា 3.3V) យើងជ្រើសរើស R1 = 100kΩ និង R2 = 10kΩ (សមាមាត្រ 10/110 = 0.0909)។ ពេលតង់ស្យុង 29.2V វានឹងចេញមកត្រឹម 2.65V ដែលមានសុវត្ថិភាព 100% សម្រាប់ ESP32។',
    schematicAscii: `
     V_Solar (+29.2V Max) ───[ R1 = 100kΩ ]───┬───► V_ADC ទៅ ESP32 (0 - 3.1V Max)
                                              │
                                      [ R2 = 10kΩ ]
                                              │
                                             GND
    `,
    designTips: [
      'ដាក់ Ceramic Capacitor 100nF ស្របនឹងជើង R2 ទៅកាន់ GND ដើម្បីច្រោះ High-Frequency Noise និងផ្តល់បន្ទុកដល់ SAR ADC។',
      'ប្រើ Precision Resistor កម្រិត 0.1% ឬ 1% ដើម្បីកុំឱ្យតម្លៃលម្អៀងពេលសីតុណ្ហភាពក្តៅត្រជាក់នៅទីវាល។',
      'បន្ថែម Zener Diode 3.3V ឬ TVS Diode ស្របនឹងជើង ADC ដើម្បីការពារ ESP32 ពេលមានរន្ទះបាញ់ ឬ Voltage Spike។'
    ],
    commonMistakes: [
      'ប្រើ Resistor តូចពេក (ដូចជា 100Ω + 10Ω) ធ្វើឱ្យមានចរន្តហូរកាត់ធំ ក្តៅឆេះ Resistor និងអស់ភ្លើងអាគុយចោល។',
      'ភ្លេចភ្ជាប់ Common Ground រវាងអាគុយ និង ESP32 GND ធ្វើឱ្យ ADC អានបានតម្លៃ 4095 ឬ 0 រហូត។'
    ]
  },
  {
    id: 'pullup-pulldown',
    title: 'Pull-Up & Pull-Down Resistors (រេស៊ីស្តង់ទប់កម្រិត Logic)',
    category: 'Components',
    formula: 'R_pull = 4.7kΩ to 10kΩ (Standard Digital) | 2.2kΩ to 4.7kΩ (I2C Bus)',
    keyRule: 'ហាមទុកជើង Input ឱ្យនៅអណ្តែត (Floating) ជាដាច់ខាត! ត្រូវតែមាន Pull-up ឬ Pull-down ជានិច្ចដើម្បីកំណត់ស្ថានភាព Logic ច្បាស់លាស់។',
    explanation: 'ជើង Digital Input របស់ CMOS Microcontroller មាន Impedance ខ្ពស់ខ្លាំង។ ប្រសិនបើគ្មាន Resistor ទាញទៅ HIGH ឬ LOW ទេ ជើងនោះនឹងដើរតួដូចអង់តែន ចាប់យក Noise ក្នុងខ្យល់ ធ្វើឱ្យកម្រិត Logic លោតចុះឡើង 0 និង 1 មិនឈប់។',
    solarTrackerRelevance: 'នៅលើ I2C Bus ដែលត BNO085 IMU និង DS3231 RTC យើងប្រើ Resistor 4.7kΩ Pull-Up ទៅ 3.3V។ ចំណែកនៅលើ Gate របស់ MOSFET បញ្ជា Motor យើងប្រើ Resistor 10kΩ Pull-Down ទៅ GND ដើម្បីធានាថាម៉ូទ័រនឹងមិនដើរដោយឯកឯងពេលកំពុងបើកភ្លើងប្រព័ន្ធឡើយ។',
    schematicAscii: `
      Pull-Up (Active LOW Switch):          Pull-Down (MOSFET Gate):
            +3.3V                                    GPIO Output
              │                                           │
          [ 10kΩ ]                                  [ 100Ω Gate ]
              │                                           │
  GPIO ───────┼───[ Push Button ]───► GND     MOSFET Gate ┼───[ 10kΩ ]───► GND
    `,
    designTips: [
      'សម្រាប់ I2C Bus ដែលមានខ្សែវែង (លើសពី 20cm) ត្រូវបន្ថយ Pull-up មកត្រឹម 2.2kΩ ដើម្បីឱ្យ Rising Edge នៃរលក Clock ឡើងមកលឿន។',
      'សម្រាប់ប៊ូតុងចុចទូទៅ អាចប្រើ Internal Pull-Up (INPUT_PULLUP) របស់ ESP32 បានដើម្បីសន្សំគ្រឿងបន្លាស់លើ PCB។'
    ],
    commonMistakes: [
      'ភ្លេចដាក់ Pull-down resistor នៅ Gate របស់ MOSFET ធ្វើឱ្យម៉ូទ័រកន្ត្រាក់ដើរខុសប្រក្រតីនៅពេល ESP32 កំពុង Booting។'
    ]
  },
  {
    id: 'capacitors-decoupling',
    title: 'Capacitors: Decoupling, Bulk & Filtering (កាប៉ាស៊ីទ័រច្រោះចរន្ត)',
    category: 'Components',
    formula: 'C_bulk = I_load · Δt / ΔV  |  f_cutoff = 1 / (2π · R · C)',
    keyRule: 'ដាក់ Decoupling Capacitor 100nF ឱ្យនៅជិតបំផុត (ចម្ងាយក្រោម 3mm) ពីជើង VDD របស់បន្ទះឈីបនីមួយៗនៅលើ PCB។',
    explanation: 'Capacitor ផ្ទុកនិងបញ្ចេញបន្ទុកអគ្គិសនីក្នុងល្បឿនលឿន។ ក្នុងប្រព័ន្ធបង្កប់ យើងបែងចែកជាពីរ៖ Bulk Capacitor (Electrolytic/Tantalum 10µF–470µF) សម្រាប់ផ្គត់ផ្គង់ចរន្តពេលបន្ទុកធ្លាក់ចុះភ្លាមៗ និង Decoupling Capacitor (Ceramic SMD 100nF) សម្រាប់បន្សាប High-Frequency Noise។',
    solarTrackerRelevance: 'នៅពេលម៉ូទ័រ 24V ចាប់ផ្តើមវិល ឬ Wi-Fi របស់ ESP32 ចាប់ផ្តើមបញ្ជូនទិន្នន័យ (Transmit Burst) ចរន្តកើនឡើងភ្លាមៗ 2A អាចធ្វើឱ្យតង់ស្យុងធ្លាក់ចុះ (Voltage Sag) បណ្តាលឱ្យ ESP32 Brownout Reset។ Bulk Capacitor 470µF នៅលើ Rail 24V និង 22µF នៅជើង 3.3V ការពារបញ្ហានេះបានទាំងស្រុង។',
    schematicAscii: `
  +3.3V Rail ─────┬──────────────────┬──────────────► ជើង VDD របស់ ESP32
                  │                  │
           [ 10µF Ceramic ]   [ 100nF Ceramic ]
                  │                  │
     GND ─────────┴──────────────────┴──────────────► ជើង GND
    `,
    designTips: [
      'ប្រើប្រាស់ Ceramic Capacitor ប្រភេទ X7R ឬ X5R (SMD 0805 ឬ 0603) ដោយសារវាមាន ESR (Equivalent Series Resistance) ទាបបំផុត។',
      'នៅលើដានភ្លើងរបស់ Motor Driver ត្រូវដាក់ Electrolytic Capacitor 1000µF 50V ដើម្បីស្រូបយក Back-EMF Spikes។'
    ],
    commonMistakes: [
      'ដាក់ Decoupling Capacitor នៅឆ្ងាយពីជើងបន្ទះឈីប ធ្វើឱ្យ Inductance របស់ដានស្ពាន់បាត់បង់ប្រសិទ្ធភាពនៃការច្រោះ Noise។'
    ]
  },
  {
    id: 'mosfet-hbridge',
    title: 'MOSFETs & H-Bridge Motor Control (ការបញ្ជាម៉ូទ័រកម្លាំងធំ)',
    category: 'Power Systems',
    formula: 'P_loss = I_drain² · Rds(on) + P_switching',
    keyRule: 'ត្រូវតែជ្រើសរើស Logic-Level MOSFET (Vgs(th) < 2.0V) នៅពេលបញ្ជាចេញពី ESP32 (3.3V Logic) ដោយគ្មាន Gate Driver ខាងក្រៅ។',
    explanation: 'MOSFET គឺជាកុងតាក់អេឡិចត្រូនិកដែលបញ្ជាដោយតង់ស្យុង (Voltage-controlled switch)។ សម្រាប់ការបញ្ជាម៉ូទ័រឱ្យបង្វិលបានទាំងសងខាង (CW/CCW) យើងរៀបចំ MOSFET ចំនួន 4 គ្រាប់ជាទម្រង់ស្ពាន H-Bridge (High-Side 2 គ្រាប់ និង Low-Side 2 គ្រាប់)។',
    solarTrackerRelevance: 'Elevation Linear Actuator ត្រូវការចរន្ត 3A នៅ 24V។ យើងប្រើប្រាស់ Dual H-Bridge BTS7960 ដែលមាន Rds(on) ត្រឹមតែ 16mΩ។ ការបាត់បង់ថាមពលកម្តៅលើ MOSFET គឺត្រឹមតែ $P = 3^2 \\times 0.016 = 0.144W$ ប៉ុណ្ណោះ ធ្វើឱ្យ Driver ត្រជាក់ល្អដោយមិនបាច់ប្រើកង្ហារ។',
    schematicAscii: `
                  +24V Motor Supply
                          │
              ┌───────────┴───────────┐
              │                       │
         [ Q1 High-Side ]        [ Q3 High-Side ]
              │                       │
              ├──────[ MOTOR ]────────┤
              │                       │
         [ Q2 Low-Side ]         [ Q4 Low-Side ]
              │                       │
              └───────────┬───────────┘
                          │
                         GND
    `,
    designTips: [
      'ហាមបើក Q1 និង Q2 ក្នុងពេលតែមួយជាដាច់ខាត (Shoot-Through Short Circuit) ព្រោះវានឹងធ្វើឱ្យកាត់សៀគ្វីផ្ទាល់ពី 24V ទៅ GND ឆេះ MOSFET ភ្លាមៗ។ ត្រូវតែមាន Dead-Time ចន្លោះពី 1µs ដល់ 5µs។',
      'ដាក់ Resistor 100Ω នៅ Gate ដើម្បីការពារការលំយោលប្រេកង់ខ្ពស់ (Parasitic Ringing)។'
    ],
    commonMistakes: [
      'ប្រើ Standard MOSFET (ដូចជា IRF540N ដែលត្រូវការ Vgs = 10V) ជាមួយ ESP32 3.3V ធ្វើឱ្យ MOSFET បើកមិនពេញលេញ ក្តៅខ្លាំងរហូតដល់ផ្ទុះ។'
    ]
  },
  {
    id: 'diodes-flyback',
    title: 'Diodes: Flyback, Schottky & Protection (ដាយអូតការពារ Back-EMF)',
    category: 'Protection & Noise',
    formula: 'V_kickback = -L · (di / dt)  (អាចឡើងដល់រាប់រយវ៉ុលបើតង់ស្យុងមិនត្រូវបានកាត់!)',
    keyRule: 'ម៉ូទ័រ Relay ឬ Inductor ទាំងអស់ត្រូវតែមាន Flyback Diode ស្របបញ្ច្រាសជានិច្ច ដើម្បីការពារ Back-EMF កុំឱ្យឆេះ Transistor/MOSFET។',
    explanation: 'នៅពេលដែលចរន្តដែលហូរកាត់ Motor Coil ត្រូវបានកាត់ផ្តាច់ភ្លាមៗ ដែនម៉ាញេទិចដែលរលំរលាយនឹងបង្កើតតង់ស្យុងបញ្ច្រាសដ៏ធំ (Inductive Kickback) ឡើងដល់រាប់រយវ៉ុល។ Flyback Diode (Freewheeling Diode) បង្កើតផ្លូវឱ្យចរន្តនោះរត់រលត់ទៅវិញដោយសុវត្ថិភាព។',
    solarTrackerRelevance: 'Linear Actuator 24V មាន Inductance ខ្ពស់។ នៅពេលកុងតាក់ផ្តាច់ភ្លាម Kickback Voltage អាចឡើងដល់លើស 80V ឆេះ Driver ភ្លាមៗ។ យើងប្រើ Schottky Diode SS34 (3A 40V) ដែលមានល្បឿនបិទបើកលឿនបំផុត (Nanoseconds) និង Forward Drop ទាប (0.4V) ដើម្បីការពារ។',
    schematicAscii: `
         +24V ────────────┬────────────────────────┐
                          │                        │
                      [ Cathode - ឆ្នូតស ]         │
                          │                    [ Motor Coil ]
                      [ SS34 Schottky Diode ]      │
                          │                        │
       Drain ─────────────┴── [ Anode ] ───────────┘
    `,
    designTips: [
      'ប្រើ Schottky Diode (ដូចជា 1N5819, SS34, SS54) ជំនួស Diode ធម្មតា (1N4007) ព្រោះ Schottky មាន Switching Speed លឿនជាង 1000 ដង។',
      'ដាក់ Diode ឱ្យនៅជិតបំផុតទៅនឹងបង្គោលរបស់ម៉ូទ័រ ឬនៅលើបន្ទះ Driver ផ្ទាល់។'
    ],
    commonMistakes: [
      'តបញ្ច្រាសប៉ូល Diode (ដាក់ Anode ទៅ 24V និង Cathode ទៅ GND) ធ្វើឱ្យឆេះ Diode ភ្លាមៗពេលបើកភ្លើង។'
    ]
  },
  {
    id: 'buck-converter',
    title: 'Buck Converter vs Linear LDO (ការបញ្ចុះតង់ស្យុងប្រកបដោយប្រសិទ្ធភាព)',
    category: 'Power Systems',
    formula: 'η_LDO = Vout / Vin  (24V ទៅ 3.3V មានប្រសិទ្ធភាពតែ 13.7%! បាត់បង់ជាកម្តៅ 86.3%)',
    keyRule: 'ដើម្បីទម្លាក់ពី 24V មក 5V ឬ 3.3V ត្រូវតែប្រើ Step-Down Buck Converter (Switching) ដាច់ខាត! ហាមប្រើ Linear Regulator (LM7805/AMS1117) ផ្ទាល់ពី 24V។',
    explanation: 'Linear Regulator (LDO) ទម្លាក់តង់ស្យុងដោយដុតថាមពលលើសចោលជាកម្តៅ ($P = (Vin - Vout) \\times I$)។ ចំណែកឯ Buck Converter ប្រើបច្ចេកវិទ្យា Switching ប្រេកង់ខ្ពស់ (PWM + Inductor + Capacitor) ដើម្បីបំប្លែងថាមពលដោយមានប្រសិទ្ធភាពខ្ពស់រហូតដល់ 90%–95% ដោយមិនសូវក្តៅឡើយ។',
    solarTrackerRelevance: 'ប្រព័ន្ធ Solar Tracker ដំណើរការលើអាគុយ 24V។ បើយើងប្រើ Linear Regulator ទម្លាក់មក 5V សម្រាប់ ESP32 (ស៊ី 300mA) កម្តៅដែលភាយចេញគឺ $P = (24 - 5) \\times 0.3 = 5.7 Watts$ (ក្តៅដូចចុងដែកផ្សារ!)។ ផ្ទុយទៅវិញ ការប្រើ Buck Converter LM2596 ឬ MP1584 ស៊ីថាមពលត្រឹមតែ 1.6W ប៉ុណ្ណោះ និងសន្សំសំចៃថ្មបានយ៉ាងច្រើន។',
    schematicAscii: `
   +24V Solar Battery ──► [ DC-DC Buck Converter MP1584 ] ──► +5V Rail (Efficiency: 92%)
                                                                 │
                                                      [ LDO ME6211 3.3V ]
                                                                 │
                                                       +3.3V ទៅកាន់ ESP32-S3
    `,
    designTips: [
      'ស្ថាបត្យកម្ម 2 ដំណាក់កាលល្អបំផុត៖ 24V ទម្លាក់មក 5V តាមរយៈ Buck Converter រួច 5V ទម្លាក់មក 3.3V តាមរយៈ Low-Noise LDO (ME6211) សម្រាប់ MCU និង Sensor។',
      'នៅលើប្លង់ PCB ដានស្ពាន់ Switching Node (SW pin, Inductor, Diode) ត្រូវតែខ្លីបំផុតដើម្បីកាត់បន្ថយ EMI Radiation។'
    ],
    commonMistakes: [
      'ប្រើខ្សែតូច និងខ្វះ Capacitor នៅ Input របស់ Buck Converter ធ្វើឱ្យមាន High Voltage Ringing បណ្តាលឱ្យឆេះបន្ទះឈីប Converter។'
    ]
  },
  {
    id: 'tvs-esd-protection',
    title: 'Circuit Protection: TVS Diodes, Fuses & Reverse Polarity',
    category: 'Protection & Noise',
    formula: 'I_fuse = 1.5 · I_max_continuous  |  V_TVS_breakdown > 1.2 · V_bus_max',
    keyRule: 'ត្រូវតែមាន Fuse ការពារ Overcurrent, P-MOSFET ការពារច្រឡំប៉ូល និង TVS Diode ការពាររន្ទះបាញ់ នៅច្រកចូលភ្លើង 24V ជានិច្ច។',
    explanation: 'ឧបករណ៍អេឡិចត្រូនិចដែលដំឡើងនៅទីវាលដូចជា Solar Tracker ងាយរងគ្រោះបំផុតដោយសារ៖ 1. ការតច្រឡំប៉ូល (+/-) 2. ការឆ្លងចរន្តកាត់សៀគ្វី (Short circuit) 3. រន្ទះបាញ់ប្រយោល និង Static ESD។ ប្រព័ន្ធការពារកម្រិតឧស្សាហកម្មរួមបញ្ចូល Auto-Recovery Fuse (PTC), TVS Diode, និង Reverse Polarity Protection។',
    solarTrackerRelevance: 'ពេលតភ្ជាប់អាគុយ 24V ប្រសិនបើអ្នកបច្ចេកទេសច្រឡំខ្សែបូកនិងដក សៀគ្វី P-Channel MOSFET (AO4407) នឹងបិទសៀគ្វីភ្លាមៗក្នុងពេល Microseconds ការពារមិនឱ្យភ្លើងបញ្ច្រាសចូល PCB ឡើយ។ TVS Diode (SMBJ28CA) នឹងស្រូបកម្លាំង Surge ពីខ្យល់ព្យុះរន្ទះ។',
    schematicAscii: `
  +24V Input ──► [ Fuse 5A ] ──► [ P-MOSFET Reverse Protection ] ──► +24V Protected Rail
                                            │
                                    [ TVS Diode SMBJ28CA ]
                                            │
   GND Input ───────────────────────────────┴────────────────────────► GND Rail
    `,
    designTips: [
      'ប្រើប្រាស់ P-Channel MOSFET សម្រាប់ Reverse Polarity Protection ល្អជាង Diode ព្រោះវាគ្មាន Forward Voltage Drop (បាត់បង់តង់ស្យុងតិចជាង 0.05V)។',
      'ប្រើ TVS Diode ប្រភេទ Bi-directional (CA suffix ដូចជា SMBJ28CA) សម្រាប់ការពារទាំងសងខាង។'
    ],
    commonMistakes: [
      'មិនដាក់ Fuse នៅជិតបង្គោលអាគុយ ពេលឆ្លងខ្សែអាចធ្វើឱ្យខ្សែភ្លើងឆេះរលាយបង្កជាអគ្គិភ័យ។'
    ]
  },
  {
    id: 'common-ground-planes',
    title: 'Grounding: Common Ground, Star Topology & Ground Planes',
    category: 'Protection & Noise',
    formula: 'V_noise = L_trace · (di / dt)  (កាត់បន្ថយ Loop Area ដើម្បីកាត់បន្ថយ Noise)',
    keyRule: 'ត្រូវតែភ្ជាប់ Ground រួម (Common Ground) រវាងប្រព័ន្ធតង់ស្យុងខ្ពស់ (24V Motor) និងប្រព័ន្ធ Logic (3.3V ESP32) ប៉ុន្តែត្រូវបំបែកតាមបែប Star Ground Topology។',
    explanation: 'Ground មិនមែនគ្រាន់តែជាកន្លែងចាក់ចោលនៃអគ្គិសនីនោះទេ វាជាផ្លូវត្រឡប់នៃចរន្ត (Return Path)។ ប្រសិនបើចរន្តម៉ូទ័រធំ (3A) រត់កាត់ដានស្ពាន់រួមគ្នាជាមួយ Sensor នោះតង់ស្យុងធ្លាក់ចុះលើដានស្ពាន់ (Ground Bounce) នឹងធ្វើឱ្យ Sensor អានតម្លៃខុស និង ESP32 គាំង។',
    solarTrackerRelevance: 'នៅលើ PCB 2 ស្រទាប់របស់ Solar Tracker យើងបែងចែកដាច់ស្រឡះរវាង Power Ground (PGND សម្រាប់ម៉ូទ័រ) និង Signal Ground (AGND/DGND សម្រាប់ ESP32 និង BNO085 IMU) ហើយភ្ជាប់គ្នាត្រឹមចំណុចតែមួយគត់នៅក្បែរ Terminal អាគុយ (Star Ground Point)។',
    schematicAscii: `
    [ 24V Motor Driver PGND ] ────────┐
                                      ├───► [ STAR GROUND POINT ] ◄─── Battery Negative (-)
    [ ESP32 Logic & IMU DGND ] ───────┘
          (Never daisy-chain high current motor return through MCU ground!)
    `,
    designTips: [
      'ស្រទាប់ខាងក្រោម (Bottom Layer) នៃ PCB គួរតែជា Solid Ground Copper Pour ឱ្យបានច្រើនបំផុត (Ground Plane)។',
      'ប្រើ Via ច្រើនគ្រាប់ (Stitching Vias) ដើម្បីភ្ជាប់ Ground ស្រទាប់លើនិងក្រោម បន្ថយ Inductance។'
    ],
    commonMistakes: [
      'តខ្សែ Ground ជាសង្វាក់ (Daisy Chain) ពីម៉ូទ័រមកកាត់ ESP32 ទើបទៅអាគុយ ធ្វើឱ្យចរន្តម៉ូទ័រជ្រៀតចូលរំខានដល់ MCU ទាំងស្រុង។'
    ]
  },
  {
    id: 'emi-noise-mitigation',
    title: 'Noise & EMI/EMC Mitigation in Solar Trackers (ការកាត់បន្ថយការរំខាន)',
    category: 'Protection & Noise',
    formula: 'V_induced = - dΦ / dt  (Twisted Pair កាត់បន្ថយ Magnetic Loop Area មកស្ទើរតែ 0)',
    keyRule: 'ប្រើខ្សែរមួល (Twisted Pair) សម្រាប់ខ្សែម៉ូទ័រ និងខ្សែ CAN Bus ព្រមទាំងដាក់ Snubber Circuit ស្របនឹងម៉ូទ័រជានិច្ច។',
    explanation: 'ម៉ូទ័រ DC មានជក់កាបូន (Brushed DC Motor) បង្កើតផ្កាភ្លើងតូចៗរាប់ពាន់ដងក្នុងមួយវិនាទីនៅពេលបង្វិល។ ផ្កាភ្លើងនេះបញ្ចេញរលកវិទ្យុរំខាន (Electromagnetic Interference - EMI) ឆ្លងកាត់ខ្សែភ្លើង និងតាមអាកាស អាចធ្វើឱ្យ I2C Bus ជាប់គាំង និង Wi-Fi ធ្លាក់ល្បឿន។',
    solarTrackerRelevance: 'ខ្សែដែលរត់ឡើងទៅម៉ូទ័រនៅលើបង្គោលសូឡាមានប្រវែង 2 ទៅ 3 ម៉ែត្រ ដែលដើរតួដូចអង់តែនបញ្ចេញ EMI យ៉ាងខ្លាំង។ យើងដោះស្រាយដោយ៖ 1. ប្រើខ្សែ Twisted Pair 2. ដាក់ Ferrite Bead នៅក្បាលខ្សែ 3. ដាក់ RC Snubber (100nF + 10Ω) ស្របនឹងបង្គោលម៉ូទ័រ។',
    schematicAscii: `
      Motor Driver Out+ ─────═══( Twisted Pair )═══─────┬──► Motor Terminal +
                                                         │
                                                  [ RC Snubber: 10Ω + 100nF ]
                                                         │
      Motor Driver Out- ─────═══( Twisted Pair )═══─────┴──► Motor Terminal -
    `,
    designTips: [
      'កុំដាក់ខ្សែសញ្ញា I2C/SPI រត់ស្របគ្នាទន្ទឹមនឹងខ្សែភ្លើងម៉ូទ័រ 24V ឡើយ។ ប្រសិនបើត្រូវកាត់គ្នា ត្រូវឱ្យកាត់កែង 90 ដឺក្រេ។',
      'ដាក់ប្រអប់ដែក ឬស្រទាប់ការពារ (Shielding) គ្របពីលើ BNO085 IMU និង ESP32-S3។'
    ],
    commonMistakes: [
      'ទុកខ្សែម៉ូទ័ររញ៉េរញ៉ៃមិនរមួលចូលគ្នា ធ្វើឱ្យ I2C Bus បាត់បង់ទិន្នន័យ (I2C Bus Error) រាល់ពេលម៉ូទ័រចាប់ផ្តើមវិល។'
    ]
  }
];
