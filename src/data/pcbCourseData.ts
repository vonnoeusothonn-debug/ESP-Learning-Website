export interface PcbCourseStep {
  id: string;
  level: 1 | 2;
  title: string;
  tag: string;
  summary: string;
  content: string[];
  visualDiagram: string;
  checklist: string[];
  solarTrackerApplication: string;
}

export const PCB_COURSE_STEPS: PcbCourseStep[] = [
  // LEVEL 1: FUNDAMENTALS (កម្រិតទី ១: មូលដ្ឋានគ្រឹះ PCB)
  {
    id: 'pcb-what-is',
    level: 1,
    title: '1. PCB គឺជាអ្វី? (What is a PCB? — ស្រទាប់ និងរចនាសម្ព័ន្ធ)',
    tag: 'Fundamentals',
    summary: 'ស្វែងយល់ពីរចនាសម្ព័ន្ធស្រទាប់មេកានិក និងអគ្គិសនីនៃបន្ទះសៀគ្វីបោះពុម្ព (Printed Circuit Board)។',
    content: [
      'PCB (Printed Circuit Board) គឺជាបន្ទះដែលទ្រទ្រង់គ្រឿងបន្លាស់មេកានិក និងភ្ជាប់ចរន្តអគ្គិសនីរវាងគ្រឿងអេឡិចត្រូនិចនានា តាមរយៈដានស្ពាន់ចម្លង (Copper Traces) ដែលត្រូវបានបិទភ្ជាប់លើស្រទាប់មិនចម្លងអគ្គិសនី (Dielectric Substrate)។',
      'សម្ភារៈស្តង់ដារឧស្សាហកម្មគឺ FR-4 (Flame Retardant 4) ដែលជាសរសៃកញ្ចក់ត្បាញ (Woven Fiberglass) លាយជ័រ Epoxy ដែលមានភាពរឹងមាំ និងធន់នឹងកម្តៅខ្ពស់។',
      'លក្ខណៈបច្ចេកទេសស្តង់ដារ PCB៖ កម្រាស់បន្ទះសរុប 1.6mm, កម្រាស់ស្ពាន់ 1 oz/ft² (35µm) ឬ 2 oz/ft² (70µm) សម្រាប់ខ្សែម៉ូទ័រ, និង Surface Finish ប្រភេទ Lead-Free HASL ឬ ENIG (ស្រោបមាសការពារច្រែះ)។'
    ],
    visualDiagram: `
┌────────────────────────────────────────────────────────┐
│ Silkscreen (អក្សរ, សញ្ញាសម្គាល់ជើង Pin 1, តម្លៃ R/C)    │ Top Silkscreen
├────────────────────────────────────────────────────────┤
│ Solder Mask (ស្រទាប់ថ្នាំពណ៌បៃតង/ខ្មៅ ការពារឆ្លងចរន្ត)  │ F.Mask
├────────────────────────────────────────────────────────┤
│ Top Copper Layer (ដានស្ពាន់ស្រទាប់លើ កម្រាស់ 35 µm)     │ F.Cu
├────────────────────────────────────────────────────────┤
│                                                        │
│ FR-4 Dielectric Core Substrate (កម្រាស់ ~1.4 mm)       │ Core
│                                                        │
├────────────────────────────────────────────────────────┤
│ Bottom Copper Layer (ដានស្ពាន់ស្រទាប់ក្រោម / Ground)   │ B.Cu
├────────────────────────────────────────────────────────┤
│ Bottom Solder Mask & Bottom Silkscreen                 │ B.Mask
└────────────────────────────────────────────────────────┘
    `,
    checklist: [
      'ជ្រើសរើសប្រភេទ 2-layer FR-4 Board សម្រាប់ការផលិត Prototype គម្រោង FYP ដែលមានតម្លៃសមរម្យ។',
      'កំណត់កម្រាស់បន្ទះ 1.6mm និងទម្ងន់ស្ពាន់ 1 oz (35µm) សម្រាប់ Signal Board ឬ 2 oz (70µm) សម្រាប់ Motor Driver Board។',
      'ជ្រើសរើស Surface Finish ប្រភេទ Lead-Free HASL (ងាយផ្សារដោយដៃ) ឬ ENIG (រាបស្មើល្អសម្រាប់ជើងឈីបតូចៗ)។'
    ],
    solarTrackerApplication: 'បន្ទះ PCB របស់ Solar Tracker ប្រើប្រាស់បន្ទះ 2 ស្រទាប់ (2-Layer FR-4) ទំហំ 100mm x 80mm ដើម្បីបំពាក់ ESP32-S3, CAN Transceiver, និង Power Protection ក្នុងប្រអប់ការពារទឹក IP65។'
  },
  {
    id: 'pcb-schematic-symbols',
    level: 1,
    title: '2. Schematic, Symbols & Footprints (គំនូរបំព្រួញ និងជើងទម្រ)',
    tag: 'Design Flow',
    summary: 'ទំនាក់ទំនងរវាងនិមិត្តសញ្ញាអគ្គិសនី (Symbol) លើ Schematic និងជើងទម្រជាក់ស្តែង (Footprint) លើ PCB។',
    content: [
      'Schematic (គំនូរបំព្រួញ) បង្ហាញពីរបៀបតភ្ជាប់គ្នានៃសៀគ្វីអគ្គិសនីជាលក្ខណៈតក្កវិទ្យា (Logical Connections) ដោយប្រើប្រាស់ Symbols (ដូចជា និមិត្តសញ្ញា Resistor, Capacitor, IC)។',
      'Footprint គឺជាគំរូទំហំជាក់ស្តែងនៃបន្ទះស្ពាន់ (Copper Pads) និងរន្ធខួង (Holes) នៅលើ PCB ដែលត្រូវនឹងជើងដែកនៃគ្រឿងបន្លាស់រូបវន្ត។',
      'កំហុសធំបំផុតរបស់និស្សិតគឺការជ្រើសរើស Footprint ខុស! ឧទាហរណ៍៖ ជ្រើសរើស Symbol Resistor ត្រឹមត្រូវ ប៉ុន្តែរើស Footprint 0402 (តូចដូចគ្រាប់ខ្សាច់ពិបាកផ្សារដោយដៃ) ជំនួសឱ្យ 0805 ឬ Through-Hole។'
    ],
    visualDiagram: `
 [ SCHEMATIC DOMAIN ]                  [ PCB PHYSICAL DOMAIN ]
   Schematic Symbol                         Physical Footprint
      ┌───┐                                      ┌───┐   ┌───┐
 1 ───┤   ├─── 2     ──(Netlist Mapping)──►     1│PAD│   │PAD│2
      └───┘                                      └───┘   └───┘
  (Logical 10kΩ)                               (SMD 0805 Package)
    `,
    checklist: [
      'ផ្ទៀងផ្ទាត់ Pinout របស់ Symbol ជាមួយ Datasheet របស់ក្រុមហ៊ុនផលិតបន្ទះឈីបជានិច្ច។',
      'សម្រាប់គម្រោង FYP ផ្សារដោយដៃ គួរជ្រើសរើស Passive Components ទំហំ SMD 0805 (2.0mm x 1.25mm) ឬ 1206។',
      'បោះពុម្ពប្លង់ Footprint លើក្រដាស A4 ទំហំ 1:1 ដើម្បីយកគ្រឿងបន្លាស់ពិតប្រាកដមកសាកដាក់ផ្ទៀងផ្ទាត់ទំហំមុនពេលបញ្ជាទិញរោងចក្រ។'
    ],
    solarTrackerApplication: 'Footprint របស់ ESP32-S3 WROOM-1 Module ត្រូវតែមាន Thermal Ground Pad ធំនៅខាងក្រោម ដើម្បីជួយបញ្ចេញកម្តៅពី CPU ទៅកាន់បន្ទះ PCB។'
  },
  {
    id: 'pcb-nets-labels',
    level: 1,
    title: '3. Nets, Net Labels & Bus Architecture (ការដាក់ឈ្មោះខ្សែ)',
    tag: 'Schematic',
    summary: 'ការរៀបចំខ្សែតភ្ជាប់ និង Net Labels ដើម្បីឱ្យ Schematic មានសណ្តាប់ធ្នាប់ ងាយយល់ និងងាយស្រួល Debug។',
    content: [
      'Net គឺជាខ្សែភ្ជាប់អគ្គិសនីរវាងជើង Pins ពីរ ឬច្រើន។ ប្រសិនបើគូសខ្សែខ្វែងខ្វាត់កាត់ពេញ Schematic នោះប្លង់នឹងមើលទៅរញ៉េរញ៉ៃពិបាកយល់។',
      'Net Labels (ដូចជា +3V3, +24V, GND, I2C_SDA, CAN_H) អនុញ្ញាតឱ្យតភ្ជាប់ជើងពីរដោយមើលមិនឃើញខ្សែ (Invisible Connection) គ្រាន់តែដាក់ឈ្មោះដូចគ្នា។',
      'Global Power Ports (ដូចជា VCC, 3V3, GND) តភ្ជាប់គ្រប់ទំព័រនៃ Schematic ទាំងអស់ដោយស្វ័យប្រវត្តិ។'
    ],
    visualDiagram: `
 Schematic Net Labeling:
   ESP32 Pin 11 ──[ Net Label: I2C_SDA ]         BNO085 Pin 4 ──[ Net Label: I2C_SDA ]
   ESP32 Pin 12 ──[ Net Label: I2C_SCL ]         BNO085 Pin 5 ──[ Net Label: I2C_SCL ]
   (Automatically connected together by KiCad during Netlist compilation!)
    `,
    checklist: [
      'ប្រើប្រាស់ Net Labels សម្រាប់គ្រប់ខ្សែសញ្ញាសំខាន់ៗទាំងអស់ (SPI, I2C, UART, PWM)។',
      'រក្សាទុកខ្សែ Power Rails ឱ្យច្បាស់លាស់៖ +24V_RAW, +24V_PROT, +5V, +3V3, GND, PGND។',
      'ដំណើរការ Electrical Rules Check (ERC) លើ Schematic ជានិច្ច ដើម្បីរកមើលជើង Pin អណ្តែត ឬជើង Input គ្មានប្រភពផ្គត់ផ្គង់។'
    ],
    solarTrackerApplication: 'ការបំបែក Net ដាច់ដោយឡែករវាង PGND (Power Ground សម្រាប់ Motor) និង GND (Logic Ground សម្រាប់ ESP32) ការពារកុំឱ្យ KiCad ច្រឡំភ្ជាប់ Ground ទាំងពីរចូលគ្នានៅលើគ្រប់ទីកន្លែង។'
  },
  {
    id: 'pcb-tht-vs-smd',
    level: 1,
    title: '4. Through-Hole vs SMD Components (ការជ្រើសរើសកញ្ចប់)',
    tag: 'Components',
    summary: 'ការប្រៀបធៀបរវាងគ្រឿងបន្លាស់ជើងដោតរន្ធ (Through-Hole Technology - THT) និងជើងបិទលើផ្ទៃ (Surface Mount - SMD)។',
    content: [
      'THT (Through-Hole Technology): មានជើងដែកវែងស៊កកាត់តាមរន្ធបន្ទះ PCB រួចផ្សារនៅផ្នែកម្ខាងទៀត។ មានភាពរឹងមាំខាងមេកានិកខ្ពស់ ស័ក្តិសមសម្រាប់ Screw Terminals, Connectors ធំៗ, និង Fuse Holder។',
      'SMD (Surface Mount Device): ផ្សារផ្ទាល់លើបន្ទះស្ពាន់លើផ្ទៃ PCB។ មានទំហំតូច ស៊ីផ្ទៃតិច គ្មាន Parasitic Inductance ខ្ពស់ និងស័ក្តិសមសម្រាប់គ្រឿង Microcontroller, Resistor, Capacitor, និង ICs ទំនើប។',
      'យុទ្ធសាស្ត្រល្អបំផុតសម្រាប់ FYP: ប្រើ SMD 0805 សម្រាប់ Resistor/Capacitor និងប្រើ THT Screw Terminals (5.08mm Pitch) សម្រាប់ខ្សែភ្លើង 24V និងខ្សែម៉ូទ័រ។'
    ],
    visualDiagram: `
 Through-Hole (THT):                         Surface Mount (SMD):
 ┌───────────────┐                            ┌───────────┐
 │   Component   │                            │ Component │
 └──┬─────────┬──┘                            └─[PAD]─[PAD]─
────┼─────────┼──── PCB Top ────────────────────██─────██── PCB Surface
    │  Holes  │                                 (Solder Fillet)
────┴─────────┴──── PCB Bottom
   (Solder Joint)
    `,
    checklist: [
      'ជ្រើសរើស THT Screw Terminal Blocks (កម្រាស់ជើងធំ) សម្រាប់ខ្សែភ្លើងចូល 24V និងខ្សែចេញទៅម៉ូទ័រ។',
      'ជ្រើសរើស SMD 0805 សម្រាប់ Resistors/Capacitors (ផ្សារដោយដៃស្រួល មិនងាយរអិល)។',
      'ប្រើ SMD SOT-23 ឬ SOIC-8 សម្រាប់ Transistors/MOSFETs ជំនួសកញ្ចប់ QFN តូចៗដែលគ្មានជើង។'
    ],
    solarTrackerApplication: 'Terminal ភ្ជាប់ទៅកាន់ Linear Actuator ត្រូវតែប្រើប្រាស់ THT Screw Terminal Block ប្រភេទ 15A 5.08mm pitch ដើម្បីទប់កម្លាំងទាញខ្សែនៅពេលបន្ទះសូឡាបង្វិល។'
  },
  {
    id: 'pcb-trace-width-current',
    level: 1,
    title: '5. Trace Width & Current Capacity (ទទឹងដានស្ពាន់ និងចរន្ត)',
    tag: 'Calculations',
    summary: 'ការគណនាទទឹងដានស្ពាន់តាមស្តង់ដារ IPC-2152 ដើម្បីការពារកុំឱ្យឡើងកម្តៅលើសកម្រិតកំណត់។',
    content: [
      'ដានស្ពាន់ (Copper Trace) ដើរតួដូចជារេស៊ីស្តង់មួយ។ ប្រសិនបើចរន្តហូរកាត់ធំលើដានស្ពាន់តូចចង្អៀត វានឹងឡើងកម្តៅខ្លាំងរហូតដល់រលាយដាច់ដានស្ពាន់ចេញពីបន្ទះ FR-4។',
      'ស្តង់ដារ IPC-2152 កំណត់៖ សម្រាប់បន្ទះស្ពាន់ 1 oz (35µm) ដានស្ពាន់ទទឹង 0.25mm (10 mils) អាចទ្រាំចរន្តបានប្រហែល 0.8A (កម្តៅឡើង 10°C)។ ប៉ុន្តែសម្រាប់ចរន្ត 4A របស់ម៉ូទ័រ យើងត្រូវការទទឹងដានស្ពាន់យ៉ាងតិច 2.5mm ដល់ 3.0mm!',
      'ដំណោះស្រាយចំពោះចរន្តធំ៖ បង្កើនទម្ងន់ស្ពាន់ទៅ 2 oz (70µm), ចាក់ស្រោបសំណប៉ាហាំងបន្ថែមលើដានស្ពាន់ (Exposed Copper), ឬចាក់ Polygon Copper Pour ធំ។'
    ],
    visualDiagram: `
 Trace Width vs Current Capacity (1 oz Copper, ΔT = 10°C):
 ┌──────────────┬──────────────┬──────────────────────────────────┐
 │ Trace Width  │ Max Current  │ Application                      │
 ├──────────────┼──────────────┼──────────────────────────────────┤
 │ 0.25 mm      │ 0.8 A        │ Signal Traces (GPIO, I2C, SPI)   │
 │ 0.50 mm      │ 1.4 A        │ 3.3V Logic Power Rail            │
 │ 1.00 mm      │ 2.2 A        │ 5V Buck Converter Output         │
 │ 2.50 mm      │ 4.5 A        │ 24V Motor & Actuator Power Rail  │
 │ Copper Pour  │ > 10.0 A     │ Ground Plane & High-Power Rail   │
 └──────────────┴──────────────┴──────────────────────────────────┘
    `,
    checklist: [
      'ប្រើ Trace Width 0.25mm - 0.3mm សម្រាប់ Signal Traces (I2C, SPI, GPIO)។',
      'ប្រើ Trace Width 0.8mm - 1.0mm សម្រាប់ 3.3V / 5V Power Rails។',
      'ប្រើ Trace Width 2.5mm - 3.5mm (ឬ Copper Pour) សម្រាប់ខ្សែម៉ូទ័រ 24V H-Bridge។'
    ],
    solarTrackerApplication: 'ដានស្ពាន់ពី Screw Terminal 24V ទៅកាន់ជើង BTS7960 Motor Driver ត្រូវបានចាក់ជា Copper Polygon Pour ទំហំទទឹង 5.0mm ដើម្បីទ្រាំទ្រចរន្តកន្ត្រាក់ 5A ដោយមិនក្តៅបន្ទះ PCB។'
  },
  {
    id: 'pcb-vias-planes',
    level: 1,
    title: '6. Vias & Ground Plane Design (រន្ធផ្លាស់ប្តូរស្រទាប់ និងប្លង់ដី)',
    tag: 'Layout',
    summary: 'តួនាទីរបស់ Vias ក្នុងការតភ្ជាប់ស្រទាប់ស្ពាន់ និងសារៈសំខាន់នៃ Continuous Ground Plane។',
    content: [
      'Via គឺជារន្ធខួងតូចមួយដែលត្រូវបានស្រោបស្ពាន់ខាងក្នុង (Plated Through-Hole) ដើម្បីភ្ជាប់ចរន្តរវាងស្រទាប់ Top Copper និង Bottom Copper។',
      'Via មួយគ្រាប់ទំហំស្តង់ដារ (Drill 0.3mm / Diameter 0.6mm) អាចទ្រាំចរន្តបានប្រហែល 1.5A ទៅ 2A និងមាន Parasitic Inductance ប្រហែល 1nH។ សម្រាប់ចរន្តធំ ត្រូវប្រើ Via ច្រើនគ្រាប់ស្របគ្នា (Via Array)។',
      'Ground Plane (ស្រទាប់ដីបន្ត) នៅស្រទាប់ Bottom Copper ផ្តល់ផ្លូវត្រឡប់នៃចរន្តដែលមាន Impedance ទាបបំផុត កាត់បន្ថយ EMI Noise និងដើរតួជាបន្ទះស្រូបកម្តៅ (Heatsink)។'
    ],
    visualDiagram: `
 Via Cross-Section:
       Top Copper ─────[ Annular Ring ]───── Top Trace
                              │ █ │ Plated Copper Barrel
          FR-4 Core           │   │ (Hole Drill: 0.3 mm)
                              │ █ │
    Bottom Copper ─────[ Annular Ring ]───── Bottom Ground Plane
    `,
    checklist: [
      'ប្រើប្រាស់រន្ធ Via ទំហំស្តង់ដារដែលរោងចក្រមិនគិតថ្លៃបន្ថែម (Drill 0.3mm, Pad 0.6mm)។',
      'ដាក់ Stitching Vias (Via ដេរភ្ជាប់ Ground ជួរៗ) នៅជុំវិញគែម PCB ដើម្បីទប់ស្កាត់ការសាយភាយរលកវិទ្យុ RF។',
      'ហាមកាត់ផ្តាច់ Ground Plane ដោយការរត់ខ្សែសញ្ញាវែងៗកាត់ទទឹងស្រទាប់ Bottom Layer ជាដាច់ខាត។'
    ],
    solarTrackerApplication: 'នៅក្រោម Thermal Pad របស់ 3.3V Voltage Regulator និង Motor Driver យើងខួង Via Array ចំនួន 9 គ្រាប់ (3x3) ភ្ជាប់ទៅ Bottom Copper Plane ដើម្បីជួយរំសាយកម្តៅចេញយ៉ាងលឿន។'
  },

  // LEVEL 2: KICAD WORKFLOW (កម្រិតទី ២: ជំហានអនុវត្តជាក់ស្តែងលើ KiCad 8.0)
  {
    id: 'kicad-step1-project',
    level: 2,
    title: 'ជំហានទី 1: បង្កើត Project និងកំណត់រចនាសម្ព័ន្ធលើ KiCad 8.0',
    tag: 'KiCad Workflow',
    summary: 'ការចាប់ផ្តើមគម្រោងថ្មីក្នុង KiCad, ការរៀបចំ Folder និងការកំណត់ Grid/Units។',
    content: [
      'ទាញយកនិងដំឡើង KiCad 8.0 (Software Open-Source ស្តង់ដារវិស្វកម្មពិភពលោក)។',
      'បង្កើត Project ថ្មីដាក់ឈ្មោះថា "SolarTrack_Controller_Rev1" ក្នុង Folder គម្រោងដាច់ដោយឡែក។',
      'ឯកសារសំខាន់ពីរនឹងត្រូវបានបង្កើត៖ .kicad_sch (ឯកសារគំនូរបំព្រួញ Schematic) និង .kicad_pcb (ឯកសារប្លង់រចនាបន្ទះ PCB)។'
    ],
    visualDiagram: `
 KiCad Project Structure:
   ├── SolarTrack_Controller_Rev1.kicad_pro   (Project Manager)
   ├── SolarTrack_Controller_Rev1.kicad_sch   (Schematic Editor)
   ├── SolarTrack_Controller_Rev1.kicad_pcb   (PCB Layout Editor)
   └── libraries/                             (Custom Footprints/3D Models)
    `,
    checklist: [
      'ជ្រើសរើសខ្នាតរង្វាស់ជា Millimeters (mm) ជាទូទៅសម្រាប់ PCB ឬ Mils (0.001 inch) សម្រាប់ Pitch។',
      'ទាញយក ESP32-S3 KiCad Library ផ្លូវការពី Espressif GitHub ឬ SnapEDA។',
      'បំពេញព័ត៌មាន Title Block នៃ Schematic (ឈ្មោះគម្រោង, កាលបរិច្ឆេទ, ឈ្មោះនិស្សិត, Revision 1.0)។'
    ],
    solarTrackerApplication: 'ការរៀបចំ Project មានរបៀបរៀបរយជួយឱ្យការធ្វើការងារជាក្រុមលើ Git/GitHub ក្នុងគម្រោង FYP ដំណើរការបានរលូន គ្មានការបាត់បង់ឯកសារ។'
  },
  {
    id: 'kicad-step2-schematic-capture',
    level: 2,
    title: 'ជំហានទី 2: គូរ Schematic លើ KiCad Schematic Editor',
    tag: 'KiCad Workflow',
    summary: 'ការទាញ Symbol ដាក់លើទំព័រ, ការតខ្សែ Wires, ការដាក់ Net Labels និងការរៀបចំប្លុកមុខងារ។',
    content: [
      'ចុចគ្រាប់ចុច "A" ដើម្បីបន្ថែម Symbols៖ ESP32-S3-WROOM-1, MP1584 Buck Converter, ME6211 LDO, SN65HVD230 CAN Transceiver, Terminal Blocks, Resistors, Capacitors។',
      'បែងចែក Schematic ជាប្លុកច្បាស់លាស់ដោយប្រើ Hierarchical Sheets ឬបំបែកជាតំបន់៖ 1. Power Supply 2. Microcontroller 3. Sensor Interfaces 4. Motor Outputs 5. Protection Circuit។',
      'ចុចគ្រាប់ចុច "W" ដើម្បីគូរខ្សែ Wire និង "L" ដើម្បីដាក់ Net Label។'
    ],
    visualDiagram: `
 Schematic Hierarchical Blocks:
 ┌───────────────────────────┐    ┌───────────────────────────┐
 │   1. Power Management     │    │   2. ESP32-S3 MCU Core    │
 │ (24V In -> 5V Buck -> 3.3V│    │ (Dual Core, Flash, Reset) │
 └─────────────┬─────────────┘    └─────────────┬─────────────┘
               │                                │
 ┌─────────────┴─────────────┐    ┌─────────────┴─────────────┐
 │   3. Industrial CAN Bus   │    │   4. Motor Driver H-Bridge│
 │ (SN65HVD230 + 120Ω Term)  │    │ (BTS7960 PWM/Dir Control) │
 └───────────────────────────┘    └───────────────────────────┘
    `,
    checklist: [
      'ដាក់ Capacitor 100nF នៅជិតគ្រប់ជើង VDD ទាំងអស់លើ Schematic។',
      'ដាក់ Pull-up Resistor 10kΩ នៅជើង EN (Chip Enable) របស់ ESP32 ទៅ 3.3V និង Capacitor 1µF ទៅ GND (RC Reset Delay)។',
      'ពិនិត្យឱ្យច្បាស់ថាគ្មានជើងខ្សែពីរឆ្លងគ្នាដោយចៃដន្យ (Green Junction Dots)។'
    ],
    solarTrackerApplication: 'នៅលើ Schematic យើងគូរប្លុកការពារ TVS Diode និង P-MOSFET ដាច់ដោយឡែកនៅច្រកចូល Power Supply 24V ដើម្បីងាយស្រួលពន្យល់គណៈកម្មការ FYP អំពីយុទ្ធសាស្ត្រការពារ Circuit Protection។'
  },
  {
    id: 'kicad-step3-erc',
    level: 2,
    title: 'ជំហានទី 3: ដំណើរការ Electrical Rules Checker (ERC)',
    tag: 'KiCad Workflow',
    summary: 'ការផ្ទៀងផ្ទាត់កំហុសសៀគ្វីអគ្គិសនីស្វ័យប្រវត្តមុនពេលប្តូរទៅកាន់ប្លង់ PCB។',
    content: [
      'ERC (Electrical Rules Checker) គឺជាឧបករណ៍ត្រួតពិនិត្យស្វ័យប្រវត្តរបស់ KiCad ដើម្បីរកមើល៖ ជើង Output ពីរជល់គ្នា (Short Circuit), ជើង Pin ភ្លេចតខ្សែ, ឬជើង Power Input គ្មានប្រភពផ្គត់ផ្គង់ (Power Flag Error)។',
      'ដើម្បីដោះស្រាយកំហុស "Pin connected to other pins, but not driven by any pin": ត្រូវបន្ថែម Symbol "PWR_FLAG" ទៅកាន់ខ្សែ +3.3V, +5V, +24V និង GND។',
      'ដាច់ខាតត្រូវតែដោះស្រាយ Error ឱ្យនៅសល់ 0 មុនពេលឈានទៅជំហានបន្ទាប់!'
    ],
    visualDiagram: `
 KiCad ERC Report Dialog:
   [✔] ERC completed. 0 errors, 0 warnings.
   (Green checkmark indicates schematic is electrically sound and ready for netlist export)
    `,
    checklist: [
      'ដាក់សញ្ញា "No Connect" (កូនកាត់ X ពណ៌ខៀវ) លើគ្រប់ជើង GPIO ណាដែលមិនបានប្រើប្រាស់។',
      'បន្ថែម PWR_FLAG លើគ្រប់ Net ភ្លើងសំខាន់ៗ។',
      'ចុច Annotate Schematic ដើម្បីកំណត់លេខសម្គាល់ Component ស្វ័យប្រវត្ត (R1, R2, C1, U1...)។'
    ],
    solarTrackerApplication: 'ERC ជួយរកឃើញភ្លាមៗប្រសិនបើអ្នកភ្លេចតខ្សែ Ground ទៅកាន់ SN65HVD230 CAN Transceiver ឬភ្លេចបើកជើង Enable របស់ Motor Driver។'
  },
  {
    id: 'kicad-step4-footprints',
    level: 2,
    title: 'ជំហានទី 4: ជ្រើសរើស Footprints (Footprint Assignment Tool)',
    tag: 'KiCad Workflow',
    summary: 'ការផ្គូផ្គង Symbol នីមួយៗទៅនឹងកញ្ចប់គ្រឿងបន្លាស់រូបវន្តពិតប្រាកដ។',
    content: [
      'បើកផ្ទាំង Footprint Assignment Tool (ចុច Icon រូប IC មានកែវពង្រីក)។',
      'ជ្រើសរើស Footprints ឱ្យត្រូវនឹងទំហំដែលអ្នកនឹងទិញ៖ Resistor_SMD:R_0805_2012Metric, Capacitor_SMD:C_0805_2012Metric, TerminalBlock:TerminalBlock_bornier-2_P5.08mm។',
      'ពិនិត្យមើលរូបរាង 3D Model នៃ Footprint នីមួយៗ (ចុច Alt + 3) ដើម្បីប្រាកដថាទំហំជើង Pad ត្រូវគ្នាឥតខ្ចោះ។'
    ],
    visualDiagram: `
 Symbol to Footprint Mapping Table:
 ┌──────────────┬──────────────────┬─────────────────────────────────┐
 │ Symbol       │ Value            │ Assigned Footprint              │
 ├──────────────┼──────────────────┼─────────────────────────────────┤
 │ U1           │ ESP32-S3-WROOM-1 │ RF_Module:ESP32-S3-WROOM-1      │
 │ U2           │ SN65HVD230       │ Package_SO:SOIC-8_3.9x4.9mm     │
 │ R1, R2       │ 4.7k             │ Resistor_SMD:R_0805_2012Metric  │
 │ J1, J2       │ 24V_Motor_Screw  │ TerminalBlock:bornier-2_P5.08mm │
 └──────────────┴──────────────────┴─────────────────────────────────┘
    `,
    checklist: [
      'ពិនិត្យតារាង Footprint ឱ្យគ្រប់ 100% គ្មានសល់ Symbol ណាគ្មាន Footprint ឡើយ។',
      'ផ្ទៀងផ្ទាត់ Diameter នៃរន្ធ Screw Terminal ថាអាចស៊កជើងដែក 1.2mm ចូលបាន។',
      'រក្សាទុក (Save) និងចុច "Update PCB from Schematic" (F8)។'
    ],
    solarTrackerApplication: 'សម្រាប់ Relay និង Motor Terminals ត្រូវប្រាកដថាជ្រើសរើស Footprint ដែលមានរន្ធរឹងមាំ (Through-Hole Pad > 2.5mm) ដើម្បីធានាភាពធន់នៅពេលរឹតវីសខ្សែភ្លើង។'
  },
  {
    id: 'kicad-step5-pcb-layout',
    level: 2,
    title: 'ជំហានទី 5: រៀបចំទីតាំងគ្រឿងបន្លាស់ (Component Placement)',
    tag: 'KiCad Workflow',
    summary: 'យុទ្ធសាស្ត្ររៀបចំគ្រឿងបន្លាស់តាមលំហូរសញ្ញា និងការបែងចែកតំបន់ Power/Digital/Analog។',
    content: [
      'ក្បួនមាសនៃវិស្វកម្ម PCB៖ "ការរៀបចំទីតាំងគ្រឿងបន្លាស់ (Placement) សម្រេចជោគជ័យ 80% នៃប្លង់ PCB ទាំងមូល"។ បើរៀបចំទីតាំងល្អ ការរត់ខ្សែស្ពាន់ (Routing) នឹងមានភាពងាយស្រួលបំផុត។',
      'បែងចែកបន្ទះជា 3 តំបន់ដាច់ដោយឡែកពីគ្នា (Floorplanning)៖',
      '1. High-Power Zone (ជ្រុងម្ខាង): Terminal 24V, Reverse Protection MOSFET, BTS7960 Motor Driver',
      '2. Power Conversion Zone (កណ្តាល): MP1584 Buck Converter, 3.3V LDO, Bulk Capacitors',
      '3. Low-Power Digital Zone (ជ្រុងម្ខាងទៀត): ESP32-S3, CAN Transceiver, I2C Sensor Headers',
      'ដាក់អង់តែន Wi-Fi របស់ ESP32 ឱ្យលៀនចេញក្រៅគែមបន្ទះ PCB និងហាមមានដានស្ពាន់នៅពីក្រោមអង់តែនជាដាច់ខាត (Antenna Keepout Zone)!'
    ],
    visualDiagram: `
 Recommended PCB Floorplan (Top View):
 ┌────────────────────────────────────────────────────────┐
 │ [ 24V In ]  [ Motor Out 1 ]  [ Motor Out 2 ]           │
 │ ──────── High-Power Motor Zone (PGND) ──────────────── │
 │ [ Reverse Polarity ]  [ Dual H-Bridge BTS7960 ]        │
 │                                                        │
 │ ──────── DC/DC Buck Converter Zone (5V / 3.3V) ─────── │
 │ [ 24V to 5V MP1584 ]  [ 3.3V LDO ME6211 ]              │
 │                                                        │
 │ ──────── Sensitive Digital / RF Zone (DGND) ────────── │
 │ [ CAN Bus IC ]  [ I2C Headers ]  [ ESP32-S3 Module ]   │
 │                                  [ ANTENNA OVERHANG! ] │
 └────────────────────────────────────────────────────────┘
    `,
    checklist: [
      'បង្វិលគ្រឿងបន្លាស់ (គ្រាប់ចុច "R") ដើម្បីឱ្យខ្សែ Net (Ratsnest) កាត់គ្នាតិចបំផុតតាមដែលអាចធ្វើបាន។',
      'ដាក់ Decoupling Capacitor 100nF ឱ្យនៅជាប់នឹងជើង VDD របស់បន្ទះឈីបនីមួយៗ (ក្រោម 2mm)។',
      'រក្សាទុកគម្លាតយ៉ាងតិច 5mm ពីគ្រឿងបន្លាស់ទៅកាន់គែមបន្ទះ PCB (Edge Clearance)។'
    ],
    solarTrackerApplication: 'ការដាក់អង់តែន ESP32 លៀនចេញក្រៅបន្ទះ PCB ជួយឱ្យ Wi-Fi ផ្សាយបានចម្ងាយឆ្ងាយជាងមុន 2 ដង អាចភ្ជាប់ទៅកាន់ Wi-Fi Router ក្នុងផ្ទះបានយ៉ាងងាយពីលើដំបូល។'
  },
  {
    id: 'kicad-step6-routing-drc',
    level: 2,
    title: 'ជំហានទី 6: រត់ខ្សែស្ពាន់ (Routing), ចាក់ Ground Plane & ត្រួតពិនិត្យ DRC',
    tag: 'KiCad Workflow',
    summary: 'ការរត់ដានស្ពាន់ Traces, ការចាក់ Polygon Copper Pour, និងការផ្ទៀងផ្ទាត់ Design Rules Check (DRC)។',
    content: [
      'កំណត់ Design Rules តាមស្តង់ដាររោងចក្រ PCB (ដូចជា JLCPCB ឬ PCBWay)៖ Min Trace Width = 0.15mm (6 mil), Min Clearance = 0.15mm (6 mil), Min Drill = 0.3mm។',
      'រត់ខ្សែ Signal Traces នៅស្រទាប់លើ (Top Layer - F.Cu) ដោយប្រើជ្រុងកាច់ 45 ដឺក្រេ (ហាមកាច់កែង 90 ដឺក្រេ ព្រោះវាបង្កើត Acid Traps និង EMI Reflections)។',
      'ចាក់ដី Solid Ground Copper Pour នៅស្រទាប់ក្រោម (Bottom Layer - B.Cu) ដោយចុច Add Filled Zone (Ctrl + Shift + Z) រួចជ្រើសរើស Net "GND"។',
      'ដំណើរការ Design Rules Check (DRC)៖ ត្រូវតែលុបបំបាត់ Clearance Violations និង Unconnected Nets ឱ្យបាន 100% (0 Errors)!'
    ],
    visualDiagram: `
 Trace Bending Rules:
   BAD:  ───────┐ (Sharp 90° corner causes impedance mismatch & acid trap)
                │
   GOOD: ───────╲
                 ╲───── (Smooth 45° mitered bend keeps signal clean)
    `,
    checklist: [
      'ប្រាកដថា Unconnected Nets = 0 (គ្មានខ្សែ Ratsnest ណាមួយនៅសេសសល់ឡើយ)។',
      'ផ្ទៀងផ្ទាត់ទទឹងដានស្ពាន់ខ្សែម៉ូទ័រថាគ្រប់ 2.5mm - 3.0mm តាមការគណនា។',
      'មើលរូបភាព 3D Viewer (Alt + 3) ដើម្បីត្រួតពិនិត្យភាពស្រស់ស្អាត និងប្រាកដថាមិនមានគ្រឿងបន្លាស់ជល់គ្នា។'
    ],
    solarTrackerApplication: 'បន្ទាប់ពីចាក់ Ground Plane លើស្រទាប់ B.Cu យើងបន្ថែម Thermal Relief Pads នៅលើជើង Ground ដើម្បីឱ្យការផ្សារដោយដែកផ្សារធម្មតាមានភាពងាយស្រួល សំណប៉ាហាំងរលាយស្រួលមិនបឺតកម្តៅបាត់។'
  }
];
