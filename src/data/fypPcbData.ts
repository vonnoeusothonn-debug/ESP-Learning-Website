export interface SubsystemBlock {
  id: string;
  name: string;
  category: 'Power' | 'Controller' | 'Sensors' | 'Actuators' | 'Communication';
  status: 'Design Verified' | 'Prototype Tested' | 'Final Rev';
  keyComponents: string[];
  voltageRail: string;
  currentConsumption: string;
  description: string;
  circuitDetails: string[];
  schematicSummary: string;
  pcbLayoutGuidelines: string[];
}

export const FYP_PCB_SUBSYSTEMS: SubsystemBlock[] = [
  {
    id: 'power-section',
    name: '1. Power Input & Protection Subsystem',
    category: 'Power',
    status: 'Final Rev',
    keyComponents: ['5A Resettable PTC Fuse', 'SMAJ28A TVS Diode', 'P-MOSFET Reverse Protection', 'MP1584 Buck Converter (24V -> 5V)', 'AMS1117-3.3 LDO (5V -> 3.3V)'],
    voltageRail: 'Input: 18V - 32V (Nominal 24V) | Rails: +5V, +3.3V',
    currentConsumption: 'Quiescent: 45mA; Active Peak: 3.5A (during motor run)',
    description: 'Receives raw DC power from the 24V solar battery bank, filters out transient spikes, prevents catastrophic reverse hookup, and provides dual regulated voltage rails (+5V for relays/CAN, +3.3V for ESP32 and sensors).',
    circuitDetails: [
      'P-Channel MOSFET (AO4407A) in high-side configuration with 15V Zener gate clamp and 100kΩ pull-down for <15mV drop reverse-polarity protection.',
      'Bourns 5A PTC fuse trips if motor stall exceeds 5 seconds or if a direct short occurs.',
      'SMAJ28A TVS diode clamps lightning-induced surge voltages above 28V.',
      'MP1584 switching regulator steps 24V down to 5.0V with 91% efficiency, feeding an AMS1117-3.3 LDO for clean, low-noise digital logic power.'
    ],
    schematicSummary: `[24V IN] ──► [Fuse 5A] ──► [P-MOSFET Rev Prot] ──┬──► [24V Raw Motor Rail]
                                                 │
                                                 ├──► [MP1584 Buck] ──► [+5V Rail]
                                                                            │
                                                                   [AMS1117-3.3] ──► [+3.3V Rail]`,
    pcbLayoutGuidelines: [
      'Locate this entire power block adjacent to the main 2-pin screw terminal at the top-left edge of the PCB.',
      'Use minimum 80 mil (2.0mm) copper traces for the 24V motor input rail.',
      'Keep the buck converter switching loop (VIN cap, SW node, catch diode, inductor) ultra-compact to suppress RF radiation.'
    ]
  },
  {
    id: 'controller-section',
    name: '2. Microcontroller & Supervisor Core',
    category: 'Controller',
    status: 'Final Rev',
    keyComponents: ['ESP32-S3-WROOM-1 Module', 'Auto-Reset Circuit (Dual DTA114 Transistors)', 'Boot & Reset Tactile Buttons', 'Status LEDs (Green/Amber/Red)', 'USB-C Interface (ESD Protected)'],
    voltageRail: '+3.3V Regulated (Dedicated Digital Plane)',
    currentConsumption: 'Idle: 65mA; Wi-Fi Burst: 340mA',
    description: 'The computational brain of the tracking mast. Runs FreeRTOS, executes dual-axis PID kinematics, reads sensor buses, and manages fault diagnostics.',
    circuitDetails: [
      'ESP32-S3-WROOM-1 module with 8MB Octal Flash and 2MB PSRAM.',
      'Standard ESP32 auto-programming circuit using DTR/RTS lines from an external CP2102 adapter or native USB D+/D- pins (GPIO 19/20).',
      '10kΩ pull-up on EN pin paired with 1µF capacitor to provide a 10ms power-on reset delay.',
      'Diagnostic LEDs on GPIO 4 (System OK / Heartbeat), GPIO 5 (CAN Bus Active), and GPIO 6 (Motor Fault / Stall).'
    ],
    schematicSummary: `[USB-C] ──► [ESD Diodes] ──► [ESP32-S3 Native USB (GPIO 19/20)]
[+3.3V] ──► [100uF Bulk + 4x 100nF Decoupling] ──► [ESP32 VDD Pins]`,
    pcbLayoutGuidelines: [
      'CRITICAL: Ensure the PCB antenna overhangs the board edge with NO copper, traces, or ground plane on ANY layer within a 15mm radius.',
      'Surround the ESP32 module ground pads with via stitching into the bottom ground plane for heat sinking.'
    ]
  },
  {
    id: 'sensor-section',
    name: '3. Sensor & Astronomical Tracking Subsystem',
    category: 'Sensors',
    status: 'Final Rev',
    keyComponents: ['BNO085 9-DOF IMU (I2C 0x4A)', 'DS3231 RTC with CR2032 Backup (I2C 0x68)', '4-Quadrant LDR Conditioning Stage', 'LM35 Analog Temperature Sensor'],
    voltageRail: '+3.3V Clean Analog / Digital Rail',
    currentConsumption: '12mA Total',
    description: 'Provides sensory perception for hybrid dual-mode tracking: Closed-loop real-time optical tracking via 4 quadrant LDRs in clear skies, and Open-loop mathematical tracking via BNO085 angles + DS3231 astronomical solar position algorithms during overcast skies.',
    circuitDetails: [
      'Shared I2C bus (SDA: GPIO 21, SCL: GPIO 22) with hardware 4.7kΩ pull-up resistors to 3.3V.',
      'DS3231 maintains sub-minute celestial accuracy over 10 years powered by a 3V CR2032 coin cell.',
      '4x LDR voltage dividers (10kΩ precision 0.1% metal film resistors) filtered by 100nF capacitors feeding ADC1 channels GPIO 1, 2, 3, 7.',
      'BNO085 provides real-time Pitch (Elevation 0-90°) and Yaw (Azimuth 0-360°) with ±0.5° dynamic accuracy.'
    ],
    schematicSummary: `[I2C Bus: GPIO 21/22] ──┬──► [DS3231 RTC (0x68)] ──► [CR2032 Battery]
                        └──► [BNO085 IMU (0x4A)] ──► [Int Pin: GPIO 14]
[4x LDRs] ──► [10kΩ Dividers + 100nF RC Filter] ──► [ESP32 ADC1 Pins]`,
    pcbLayoutGuidelines: [
      'Route I2C lines away from motor PWM and high-current buck inductor traces.',
      'Keep LDR analog traces short and shielded with adjacent ground guard traces.',
      'Mount BNO085 footprint near the mechanical mounting holes for rigid alignment with the panel chassis.'
    ]
  },
  {
    id: 'motor-section',
    name: '4. Motor & Linear Actuator Drive Subsystem',
    category: 'Actuators',
    status: 'Final Rev',
    keyComponents: ['TB6612FNG Dual H-Bridge (Azimuth DC/Stepper)', 'Dual 10A SPDT Power Relays (Elevation Actuator)', '4x Limit Switch Input Conditioning', 'Optocoupled E-STOP Header'],
    voltageRail: '+24V High-Current Motor Bus',
    currentConsumption: 'Continuous: 1.5A; Max Inrush / Stall: 4.8A',
    description: 'Delivers high-torque dual-axis mechanical motion: Continuous azimuth rotation via a high-reduction worm gearbox, and elevation inclination tilt via a 12-inch 24V linear actuator.',
    circuitDetails: [
      'Azimuth Driver: TB6612FNG dual channels paralleled for 2.4A continuous motor driving, controlled by hardware PWM (GPIO 9, 10, 11).',
      'Elevation Driver: Dual SPDT automotive relays configured as an H-bridge polarity reverser, controlled by low-side IRLZ44N logic MOSFETs (GPIO 18, 19).',
      'Hardware Limit Switch Interlocks: Optical/mechanical limit switches cut relay power directly through logic gates while notifying ESP32 via GPIO interrupts.',
      'Reverse Flyback Diodes: SS34 Schottky diodes across all relay coils and motor outputs absorb inductive discharge.'
    ],
    schematicSummary: `[ESP32 GPIO 18/19] ──► [MOSFETs] ──► [Dual 10A Relays] ──► [24V Linear Actuator]
[ESP32 GPIO 9/10/11] ──► [TB6612FNG H-Bridge] ────────► [Azimuth Gear Motor]
[Limit Switches] ──► [10kΩ Pull-up + 100nF Debounce] ──► [ESP32 GPIO 7/8/12/13]`,
    pcbLayoutGuidelines: [
      'Dedicate wide top-layer copper polygons (minimum 3.0mm width) for 24V motor traces.',
      'Isolate the high-current motor ground return so it connects directly to the power input terminal via a Star Ground point.'
    ]
  },
  {
    id: 'communication-section',
    name: '5. Industrial CAN Bus & Telemetry Subsystem',
    category: 'Communication',
    status: 'Final Rev',
    keyComponents: ['SN65HVD230 3.3V CAN Transceiver', '120Ω Split Termination Network with Jumper', 'Common Mode Choke Filter', '3-Pin Screw Terminal (CANH, CANL, GND)'],
    voltageRail: '+3.3V Logic & Transceiver VCC',
    currentConsumption: '18mA during 250 kbps transmission',
    description: 'Industrial differential communications link bridging the exposed outdoor solar mast controller to the indoor base-station gateway over 25+ meters of shielded twisted pair cable.',
    circuitDetails: [
      'SN65HVD230 transceives CAN differential signals directly at 3.3V logic levels without resistive level shifters.',
      'Split Termination: Two 60Ω resistors in series with a 4.7nF capacitor to ground filters high-frequency common-mode noise.',
      'Termination Jumper (JP1): Allows user to enable or disable the 120Ω line termination depending on whether the board is a bus endpoint.',
      'TWAI Controller: Built-in ESP32 peripheral handles hardware bit stuffing, cyclic redundancy checks (CRC), and automatic retransmission.'
    ],
    schematicSummary: `[ESP32 TWAI TX: GPIO 20] ──► [SN65HVD230 TXD]
[ESP32 TWAI RX: GPIO 21] ◄── [SN65HVD230 RXD]
[SN65HVD230 CANH/CANL]  ──► [120Ω Split Term] ──► [CAN 3-Pin Screw Terminal]`,
    pcbLayoutGuidelines: [
      'Route CAN_H and CAN_L as a tightly coupled 120Ω differential pair with length matched within 0.5mm.',
      'Do not route noisy motor or PWM traces parallel to the CAN differential pair.'
    ]
  }
];

export interface ExternalConnectorPinout {
  connectorName: string;
  terminalType: string;
  pinCount: number;
  pins: { pinNumber: number; label: string; voltage: string; description: string }[];
}

export const EXTERNAL_CONNECTORS: ExternalConnectorPinout[] = [
  {
    connectorName: 'J1: POWER IN',
    terminalType: '5.08mm Screw Terminal (High Current)',
    pinCount: 2,
    pins: [
      { pinNumber: 1, label: '+24V_BAT', voltage: '+24V DC (18V-32V)', description: 'Positive power lead from MPPT / Battery Bank' },
      { pinNumber: 2, label: 'PWR_GND', voltage: '0V Reference', description: 'Heavy system return ground' }
    ]
  },
  {
    connectorName: 'J2: CAN BUS',
    terminalType: '3.81mm Screw Terminal',
    pinCount: 3,
    pins: [
      { pinNumber: 1, label: 'CAN_H', voltage: '2.5V - 3.5V Differential', description: 'CAN High differential signal line' },
      { pinNumber: 2, label: 'CAN_L', voltage: '1.5V - 2.5V Differential', description: 'CAN Low differential signal line' },
      { pinNumber: 3, label: 'ISO_GND', voltage: '0V Shield', description: 'Shield ground drain wire reference' }
    ]
  },
  {
    connectorName: 'J3: AZIMUTH MOTOR',
    terminalType: '5.08mm Screw Terminal',
    pinCount: 2,
    pins: [
      { pinNumber: 1, label: 'MOT_AZ_A', voltage: '0V - 24V PWM', description: 'H-bridge output terminal A' },
      { pinNumber: 2, label: 'MOT_AZ_B', voltage: '0V - 24V PWM', description: 'H-bridge output terminal B' }
    ]
  },
  {
    connectorName: 'J4: ELEVATION ACTUATOR',
    terminalType: '5.08mm Screw Terminal',
    pinCount: 2,
    pins: [
      { pinNumber: 1, label: 'ACT_EL_A', voltage: '±24V Switched', description: 'Relay polarity output terminal A' },
      { pinNumber: 2, label: 'ACT_EL_B', voltage: '±24V Switched', description: 'Relay polarity output terminal B' }
    ]
  },
  {
    connectorName: 'J5: SENSOR MAST HEAD',
    terminalType: 'JST-XH 2.54mm 6-Pin',
    pinCount: 6,
    pins: [
      { pinNumber: 1, label: '+3V3_SENS', voltage: '+3.3V Clean', description: 'Regulated power for quadrant LDRs & IMU' },
      { pinNumber: 2, label: 'LDR_NORTH', voltage: '0V - 3.3V Analog', description: 'North LDR divider voltage (ADC1_CH0)' },
      { pinNumber: 3, label: 'LDR_SOUTH', voltage: '0V - 3.3V Analog', description: 'South LDR divider voltage (ADC1_CH1)' },
      { pinNumber: 4, label: 'LDR_EAST', voltage: '0V - 3.3V Analog', description: 'East LDR divider voltage (ADC1_CH2)' },
      { pinNumber: 5, label: 'LDR_WEST', voltage: '0V - 3.3V Analog', description: 'West LDR divider voltage (ADC1_CH3)' },
      { pinNumber: 6, label: 'AGND', voltage: '0V Analog GND', description: 'Analog return ground' }
    ]
  },
  {
    connectorName: 'J6: LIMIT SWITCHES & E-STOP',
    terminalType: 'Screw Terminal 5-Pin',
    pinCount: 5,
    pins: [
      { pinNumber: 1, label: 'LIM_AZ_EAST', voltage: '3.3V Pullup', description: 'Azimuth East endstop switch (Active LOW)' },
      { pinNumber: 2, label: 'LIM_AZ_WEST', voltage: '3.3V Pullup', description: 'Azimuth West endstop switch (Active LOW)' },
      { pinNumber: 3, label: 'LIM_EL_MIN', voltage: '3.3V Pullup', description: 'Elevation Minimum (10°) endstop' },
      { pinNumber: 4, label: 'LIM_EL_MAX', voltage: '3.3V Pullup', description: 'Elevation Maximum (75°) endstop' },
      { pinNumber: 5, label: 'ESTOP_IN', voltage: '3.3V Pullup', description: 'Emergency Stop button circuit loop' }
    ]
  },
  {
    connectorName: 'J7: DEBUG & PROGRAMMING',
    terminalType: '2.54mm Male Header 4-Pin / USB-C',
    pinCount: 4,
    pins: [
      { pinNumber: 1, label: 'VBUS / 5V', voltage: '+5V USB', description: 'External 5V supply for bench programming' },
      { pinNumber: 2, label: 'UART_TXD0', voltage: '3.3V Logic', description: 'ESP32 Serial Transmit to PC' },
      { pinNumber: 3, label: 'UART_RXD0', voltage: '3.3V Logic', description: 'ESP32 Serial Receive from PC' },
      { pinNumber: 4, label: 'GND', voltage: '0V Reference', description: 'Shared Ground' }
    ]
  }
];
