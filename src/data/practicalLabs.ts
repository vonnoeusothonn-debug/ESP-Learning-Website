import { Lab } from '../types';

export const PRACTICAL_LABS: Lab[] = [
  {
    id: 1,
    title: 'Lab 01: ESP32 + LED (ភ្លើងសញ្ញា និង Output)',
    subtitle: 'ការបញ្ជា Digital Output និងការគណនា Current-Limiting Resistor',
    moduleName: 'Standard Diagnostic Indicator',
    difficulty: 'Beginner',
    estimatedTime: '20 នាទី',
    description: 'រៀនពីរបៀបបញ្ជា Digital Output, ការយល់ដឹងពី Forward Voltage Drop ($V_f$), ការគណនាតម្លៃ Resistor ការពារចរន្តលើសតាមច្បាប់ Ohm, និងការសរសេរកូដភ្លឹបភ្លែត (Blink) លើ ESP32-S3។',
    hardware: ['ESP32-S3 DevKit', '5mm Green LED', '220Ω Resistor', 'Breadboard & ខ្សែ Jumper Wires'],
    wiringDiagram: `
ESP32 GPIO 4 ──► [220Ω Resistor] ──► [LED Anode + (ជើងវែង)] ──► [LED Cathode - (ជើងខ្លី)] ──► ESP32 GND
    `,
    wiringTable: [
      { esp32Pin: 'GPIO 4', modulePin: 'Resistor Pin 1', description: 'ជើង Digital Output ភ្ជាប់ទៅ Resistor 220Ω' },
      { esp32Pin: 'Resistor Pin 2', modulePin: 'LED Anode (+)', description: 'កាត់បន្ថយចរន្តចូលជើងវែង (Anode) របស់ LED' },
      { esp32Pin: 'GND', modulePin: 'LED Cathode (-)', description: 'ជើងខ្លី (Cathode) ត្រឡប់ទៅ Ground រួម' }
    ],
    code: `// កំណត់ជើង Pin បញ្ជា LED
const int LED_PIN = 4;

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  Serial.println("[LAB 01] ប្រព័ន្ធ LED Blink ត្រូវបានចាប់ផ្តើម!");
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  Serial.println("LED ស្ថានភាព: បើកភ្លឺ (ON 3.3V)");
  delay(1000);
  
  digitalWrite(LED_PIN, LOW);
  Serial.println("LED ស្ថានភាព: បិទ (OFF 0.0V)");
  delay(1000);
}`,
    serialSample: [
      '[LAB 01] ប្រព័ន្ធ LED Blink ត្រូវបានចាប់ផ្តើម!',
      'LED ស្ថានភាព: បើកភ្លឺ (ON 3.3V)',
      'LED ស្ថានភាព: បិទ (OFF 0.0V)',
      'LED ស្ថានភាព: បើកភ្លឺ (ON 3.3V)'
    ],
    interactiveSim: {
      type: 'led',
      initialState: { isOn: false, brightness: 255 },
      prompt: 'ចុចប៊ូតុងខាងក្រោមដើម្បីធ្វើតេស្តបញ្ជាប្តូរស្ថានភាព Logic របស់ LED (HIGH / LOW) តាមបែប Digital Output។'
    },
    fypApplication: 'ក្នុងគម្រោង Solar Tracker ភ្លើង LED ដើរតួជា Heartbeat Indicator (ភ្លឹបភ្លែតរៀងរាល់ 1 វិនាទីម្តង បង្ហាញថាប្រព័ន្ធ Firmware កំពុងរស់) និងភ្លើង LED ពណ៌ក្រហមសម្រាប់ Fault Alarm បង្ហាញនៅពេលម៉ូទ័រជាប់គាំង ឬមានកំហុសលើប្រព័ន្ធ។'
  },
  {
    id: 2,
    title: 'Lab 02: ESP32 + Push Button (ប៊ូតុងចុច & Input)',
    subtitle: 'ការអាន Digital Input, Internal Pull-Up និង Software Debounce',
    moduleName: 'Tactile User Input Interface',
    difficulty: 'Beginner',
    estimatedTime: '25 នាទី',
    description: 'ស្វែងយល់ពីរបៀបអានសញ្ញាឌីជីថលពីប៊ូតុងចុច (Push Button), ការប្រើប្រាស់ Internal Pull-Up Resistor ដើម្បីការពារកុំឱ្យជើង Input អណ្តែត (Floating State) និងបច្ចេកទេស Debouncing។',
    hardware: ['ESP32-S3 DevKit', 'Tactile Push Button', 'Breadboard & ខ្សែ Jumper'],
    wiringDiagram: `
ESP32 GPIO 5 ──► [Push Button Terminal A]
ESP32 GND    ──► [Push Button Terminal B]
* ប្រើប្រាស់ INPUT_PULLUP ខាងក្នុង ESP32 (មិនបាច់តរេស៊ីស្តង់ក្រៅ)
    `,
    wiringTable: [
      { esp32Pin: 'GPIO 5', modulePin: 'Terminal A', description: 'ជើង Digital Input កំណត់ជា INPUT_PULLUP' },
      { esp32Pin: 'GND', modulePin: 'Terminal B', description: 'ភ្ជាប់ទៅ GND (ពេលចុច វានឹងទាញសញ្ញាទៅ LOW)' }
    ],
    code: `const int BUTTON_PIN = 5;
int previousState = HIGH;
int pressCount = 0;

void setup() {
  Serial.begin(115200);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  Serial.println("[LAB 02] Push Button Input Ready.");
}

void loop() {
  int currentState = digitalRead(BUTTON_PIN);
  
  if (previousState == HIGH && currentState == LOW) {
    pressCount++;
    Serial.printf("ប៊ូតុងត្រូវបានចុច! ចំនួនដងសរុប = %d\\n", pressCount);
    delay(50); // Software Debounce
  }
  
  previousState = currentState;
}`,
    serialSample: [
      '[LAB 02] Push Button Input Ready.',
      'ប៊ូតុងត្រូវបានចុច! ចំនួនដងសរុប = 1',
      'ប៊ូតុងត្រូវបានចុច! ចំនួនដងសរុប = 2'
    ],
    interactiveSim: {
      type: 'button',
      initialState: { pressed: false, totalClicks: 0 },
      prompt: 'ចុចប៊ូតុង Simulation ដើម្បីមើលការកើនឡើងនៃចំនួន Click និងការឆ្លើយតបរបស់ Debounce Logic។'
    },
    fypApplication: 'ប៊ូតុងចុចត្រូវបានប្រើប្រាស់ជាប៊ូតុង Manual Calibration និងប៊ូតុង Park/Home នៅលើប្រអប់បញ្ជា Solar Tracker ដើម្បីឱ្យអ្នកប្រើប្រាស់អាចបញ្ជាបង្វិលសូឡាទៅទីតាំងសុវត្ថិភាពដោយដៃ។'
  },
  {
    id: 3,
    title: 'Lab 03: ESP32 + Potentiometer (រ៉េអូស្តា & ADC)',
    subtitle: 'ការអានសញ្ញា Analog 12-bit (0-4095) និងការគណនាតង់ស្យុង',
    moduleName: 'Analog Rotary Transducer',
    difficulty: 'Beginner',
    estimatedTime: '25 នាទី',
    description: 'រៀនពីដំណើរការរបស់ 12-bit SAR ADC របស់ ESP32-S3, ការអានតង់ស្យុងបន្តពី Potentiometer (0V ដល់ 3.3V) និងការបំប្លែងតម្លៃ Raw ADC ទៅជាមុំគិតជាដឺក្រេ ($0^{\\circ} - 180^{\\circ}$)។',
    hardware: ['ESP32-S3 DevKit', '10kΩ Potentiometer', 'Breadboard & Wires'],
    wiringDiagram: `
ESP32 3.3V ──► [Potentiometer Pin 1 (VCC)]
ESP32 GPIO 1 ──► [Potentiometer Pin 2 (Wiper/Center)]
ESP32 GND  ──► [Potentiometer Pin 3 (GND)]
    `,
    wiringTable: [
      { esp32Pin: '3.3V', modulePin: 'Pin 1', description: 'តង់ស្យុងផ្គត់ផ្គង់ 3.3V ទៅខាងចុងមួយ' },
      { esp32Pin: 'GPIO 1 (ADC1)', modulePin: 'Pin 2 (Wiper)', description: 'ជើងកណ្តាលបញ្ចេញតង់ស្យុង Analog ប្រែប្រួលតាមការបង្វិល' },
      { esp32Pin: 'GND', modulePin: 'Pin 3', description: 'ភ្ជាប់ទៅ GND ខាងចុងម្ខាងទៀត' }
    ],
    code: `const int POT_PIN = 1; // ជើង ADC1_CH0

void setup() {
  Serial.begin(115200);
  analogReadResolution(12);
  Serial.println("[LAB 03] ADC Potentiometer Ready.");
}

void loop() {
  int rawADC = analogRead(POT_PIN);
  float voltage = (rawADC / 4095.0) * 3.3;
  float angle = (rawADC / 4095.0) * 180.0;

  Serial.printf("Raw ADC: %4d | Voltage: %.2f V | Target Angle: %5.1f deg\\n", 
                rawADC, voltage, angle);
  delay(300);
}`,
    serialSample: [
      '[LAB 03] ADC Potentiometer Ready.',
      'Raw ADC: 1024 | Voltage: 0.83 V | Target Angle:  45.0 deg',
      'Raw ADC: 2048 | Voltage: 1.65 V | Target Angle:  90.0 deg',
      'Raw ADC: 3072 | Voltage: 2.48 V | Target Angle: 135.0 deg'
    ],
    interactiveSim: {
      type: 'potentiometer',
      initialState: { raw: 2048, voltage: 1.65, angle: 90.0 },
      prompt: 'រុញស្លាយដឺក្រេ (Knob Slider) ដើម្បីបង្វិល Potentiometer និងមើលការផ្លាស់ប្តូរតង់ស្យុង Real-time។'
    },
    fypApplication: 'ក្នុងដំណាក់កាលធ្វើតេស្តសាកល្បង Solar Tracker Potentiometer ត្រូវបានប្រើដើម្បី Manual Override កំណត់មុំបង្វិលម៉ូទ័រ ឬប្រើជា Rotary Feedback Sensor ភ្ជាប់នឹងអ័ក្សបង្វិលផ្ទាល់។'
  },
  {
    id: 4,
    title: 'Lab 04: ESP32 + LDR (សេនស័រចាប់ពន្លឺថ្ងៃ)',
    subtitle: 'ការរៀបចំសៀគ្វី Voltage Divider និងក្បួនប្រៀបធៀបពន្លឺ Differential Tracking',
    moduleName: 'Photoresistor Optical Bridge',
    difficulty: 'Beginner',
    estimatedTime: '30 នាទី',
    description: 'យល់ដឹងពីលក្ខណៈរូបវន្តរបស់ LDR (ភាពធន់ថយចុះពេលពន្លឺកើនឡើង), ការរៀបចំសៀគ្វី Voltage Divider ជាមួយ Resistor 10kΩ និងការគណនាផលដកពន្លឺរវាង East LDR និង West LDR។',
    hardware: ['ESP32-S3 DevKit', '2x LDR Sensors (GL5528)', '2x 10kΩ Metal Film Resistors', 'Breadboard'],
    wiringDiagram: `
+3.3V ──► [LDR East] ──┬──► GPIO 1 (ADC1)
                       └──► [10kΩ Resistor] ──► GND
+3.3V ──► [LDR West] ──┬──► GPIO 2 (ADC1)
                       └──► [10kΩ Resistor] ──► GND
    `,
    wiringTable: [
      { esp32Pin: 'GPIO 1', modulePin: 'LDR East Junction', description: 'អានកម្រិតពន្លឺខាងកើត' },
      { esp32Pin: 'GPIO 2', modulePin: 'LDR West Junction', description: 'អានកម្រិតពន្លឺខាងលិច' },
      { esp32Pin: '3.3V', modulePin: 'LDR VCC', description: 'ប្រភពថាមពល' },
      { esp32Pin: 'GND', modulePin: 'Resistor GND', description: 'Ground រួម' }
    ],
    code: `const int LDR_EAST = 1;
const int LDR_WEST = 2;
const int DEAD_BAND = 150; // កម្រិត Threshold ការពារម៉ូទ័រញ័រ

void setup() {
  Serial.begin(115200);
  analogReadResolution(12);
  Serial.println("[LAB 04] Dual LDR Tracker Initialized.");
}

void loop() {
  int eastVal = analogRead(LDR_EAST);
  int westVal = analogRead(LDR_WEST);
  int diff = eastVal - westVal;

  Serial.printf("East: %4d | West: %4d | Diff: %+5d -> ", eastVal, westVal, diff);
  
  if (diff > DEAD_BAND) {
    Serial.println("បង្វិលទៅខាងកើត (Tracking EAST)");
  } else if (diff < -DEAD_BAND) {
    Serial.println("បង្វិលទៅខាងលិច (Tracking WEST)");
  } else {
    Serial.println("ចំកណ្តាលព្រះអាទិត្យ (Centered - Motor STOP)");
  }
  
  delay(400);
}`,
    serialSample: [
      '[LAB 04] Dual LDR Tracker Initialized.',
      'East: 3200 | West: 1800 | Diff: +1400 -> បង្វិលទៅខាងកើត (Tracking EAST)',
      'East: 2500 | West: 2450 | Diff:   +50 -> ចំកណ្តាលព្រះអាទិត្យ (Centered - Motor STOP)'
    ],
    interactiveSim: {
      type: 'ldr',
      initialState: { eastLux: 850, westLux: 400 },
      prompt: 'ផ្លាស់ប្តូរទីតាំងពន្លឺព្រះអាទិត្យ ដើម្បីមើលការគណនាផលដកពន្លឺ (Differential Tracking Error)។'
    },
    fypApplication: 'ក្បាលសេនស័រ 4-Quadrant LDR គឺជាប្រព័ន្ធចាប់ពន្លឺបឋមរបស់ Solar Tracker។ ការប្រើ Dead-band (150 counts) ជួយសន្សំសំចៃថាមពលថ្មបានយ៉ាងច្រើន ដោយម៉ូទ័រមិនបង្វិលទេនៅពេលពន្លឺសងខាងស្មើគ្នា។'
  },
  {
    id: 5,
    title: 'Lab 05: ESP32 + OLED Display (SSD1306 0.96")',
    subtitle: 'ការបង្ហាញទិន្នន័យ Telemetry តាម I2C Protocol លើអេក្រង់ Monochrome 128x64',
    moduleName: 'I2C Visual Graphic Interface',
    difficulty: 'Intermediate',
    estimatedTime: '30 នាទី',
    description: 'តភ្ជាប់អេក្រង់ OLED 0.96" SSD1306 តាមរយៈ I2C Bus, ការប្រើប្រាស់ Library Adafruit_SSD1306 ដើម្បីគូរអក្សរ តួលេខ និង Progress Bar បង្ហាញទិន្នន័យថាមពលសូឡា។',
    hardware: ['ESP32-S3 DevKit', '0.96" I2C OLED SSD1306 (128x64)', 'Jumper Wires'],
    wiringDiagram: `
ESP32 3.3V   ──► OLED VCC
ESP32 GND    ──► OLED GND
ESP32 GPIO 11──► OLED SDA (Data)
ESP32 GPIO 12──► OLED SCL (Clock)
    `,
    wiringTable: [
      { esp32Pin: 'GPIO 11', modulePin: 'SDA', description: 'Serial Data line (I2C)' },
      { esp32Pin: 'GPIO 12', modulePin: 'SCL', description: 'Serial Clock line (I2C)' },
      { esp32Pin: '3.3V', modulePin: 'VCC', description: 'ថាមពល 3.3V (ជៀសវាងត 5V)' },
      { esp32Pin: 'GND', modulePin: 'GND', description: 'Ground' }
    ],
    code: `#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void setup() {
  Serial.begin(115200);
  Wire.begin(11, 12); // SDA=11, SCL=12

  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("SSD1306 allocation failed");
    for(;;);
  }

  display.clearDisplay();
  display.setTextColor(SSD1306_WHITE);
  display.setTextSize(1);
  display.setCursor(10, 10);
  display.println("SOLAR TRACKER EE");
  display.setCursor(10, 25);
  display.println("Status: ACTIVE");
  display.setCursor(10, 40);
  display.println("Power: 185.4 W");
  display.display();
}

void loop() {
  // Update screen telemetry periodically
  delay(1000);
}`,
    serialSample: [
      'SSD1306 Initialized at I2C 0x3C.',
      'Displaying Solar Telemetry Screen.'
    ],
    interactiveSim: {
      type: 'oled',
      initialState: { power: '185.4 W', pitch: '42.5 deg', mode: 'AUTO' },
      prompt: 'មើលការ Render លើអេក្រង់ OLED ក្លែងធ្វើនូវទិន្នន័យថាមពល និងមុំរបស់បន្ទះសូឡា។'
    },
    fypApplication: 'អេក្រង់ OLED ត្រូវបានដំឡើងនៅផ្នែកខាងមុខនៃទូបញ្ជាអគ្គិសនី Solar Tracker Control Box ដើម្បីបង្ហាញអាសយដ្ឋាន IP, ស្ថានភាព Sensor, តង់ស្យុងថ្ម និងមុំបង្វិលដល់អ្នកបច្ចេកទេសនៅទីវាល។'
  },
  {
    id: 6,
    title: 'Lab 06: ESP32 + DS3231 RTC (ម៉ោងច្បាស់លាស់)',
    subtitle: 'Real-Time Clock ដែលមាន Temperature-Compensated Crystal (TCXO)',
    moduleName: 'High Precision Chronometric Module',
    difficulty: 'Intermediate',
    estimatedTime: '30 នាទី',
    description: 'ស្វែងយល់ពីមូលហេតុដែល ESP32 ត្រូវការ DS3231 (TCXO ច្បាស់លាស់ដល់កម្រិត ±2ppm មិនលម្អៀងម៉ោងទោះបីក្តៅត្រជាក់), ការអានកាលបរិច្ឆេទ ម៉ោង នាទី វិនាទី និងការប្រើប្រាស់ថ្មគ្រាប់ CR2032 ពេលដាច់ភ្លើង។',
    hardware: ['ESP32-S3 DevKit', 'DS3231 RTC Module', 'CR2032 Battery', 'Jumper Wires'],
    wiringDiagram: `
ESP32 3.3V   ──► DS3231 VCC
ESP32 GND    ──► DS3231 GND
ESP32 GPIO 11──► DS3231 SDA
ESP32 GPIO 12──► DS3231 SCL
    `,
    wiringTable: [
      { esp32Pin: 'GPIO 11', modulePin: 'SDA', description: 'I2C Data line (Address 0x68)' },
      { esp32Pin: 'GPIO 12', modulePin: 'SCL', description: 'I2C Clock line' },
      { esp32Pin: '3.3V', modulePin: 'VCC', description: '3.3V Supply' },
      { esp32Pin: 'GND', modulePin: 'GND', description: 'Ground' }
    ],
    code: `#include <Wire.h>
#include <RTClib.h>

RTC_DS3231 rtc;

void setup() {
  Serial.begin(115200);
  Wire.begin(11, 12);

  if (!rtc.begin()) {
    Serial.println("Couldn't find RTC module!");
    while (1);
  }

  Serial.println("[LAB 06] DS3231 RTC Ready.");
}

void loop() {
  DateTime now = rtc.now();
  
  Serial.printf("កាលបរិច្ឆេទ: %04d-%02d-%02d | ម៉ោង: %02d:%02d:%02d | សីតុណ្ហភាព RTC: %.1f C\\n",
                now.year(), now.month(), now.day(),
                now.hour(), now.minute(), now.second(),
                rtc.getTemperature());
  delay(1000);
}`,
    serialSample: [
      '[LAB 06] DS3231 RTC Ready.',
      'កាលបរិច្ឆេទ: 2026-09-28 | ម៉ោង: 10:15:30 | សីតុណ្ហភាព RTC: 29.5 C',
      'កាលបរិច្ឆេទ: 2026-09-28 | ម៉ោង: 10:15:31 | សីតុណ្ហភាព RTC: 29.5 C'
    ],
    interactiveSim: {
      type: 'rtc',
      initialState: { date: '2026-09-28', time: '10:15:30', temp: 29.5 },
      prompt: 'សង្កេតមើលចង្វាក់ម៉ោងដើរជាក់ស្តែងរបស់ DS3231 RTC ដែលប្រើសម្រាប់គណនាទីតាំងព្រះអាទិត្យ។'
    },
    fypApplication: 'ក្បួនគណនា Astronomical Sun Position Algorithm (SPA) ត្រូវការម៉ោង UTC និងកាលបរិច្ឆេទច្បាស់លាស់ជាចាំបាច់។ DS3231 ធានាថាសូឡានៅតែដឹងថាម៉ោងណាព្រះអាទិត្យរះ និងលិច ទោះបីប្រព័ន្ធដាច់ Wi-Fi ឬដាច់ភ្លើងក៏ដោយ។'
  },
  {
    id: 7,
    title: 'Lab 07: ESP32 + BNO085 IMU (មុំលំអៀង 9-DOF)',
    subtitle: 'Sensor Fusion Quaternion, Pitch, Roll & Tilt Inclinometer',
    moduleName: '9-DOF Inertial Measurement Unit',
    difficulty: 'Advanced',
    estimatedTime: '45 នាទី',
    description: 'តភ្ជាប់ BNO085 9-DOF IMU (Accelerometer + Gyroscope + Magnetometer) ជាមួយ Hardware Sensor Fusion ខាងក្នុង ដើម្បីអានមុំផ្អៀងពិតប្រាកដ (Pitch និង Roll) ដោយគ្មាន Gyro Drift សម្រាប់តម្រង់បន្ទះសូឡា។',
    hardware: ['ESP32-S3 DevKit', 'BNO085 IMU Module', 'Jumper Wires'],
    wiringDiagram: `
ESP32 3.3V   ──► BNO085 VCC
ESP32 GND    ──► BNO085 GND
ESP32 GPIO 11──► BNO085 SDA (Address 0x4A)
ESP32 GPIO 12──► BNO085 SCL
ESP32 GPIO 10──► BNO085 INT / RST
    `,
    wiringTable: [
      { esp32Pin: 'GPIO 11', modulePin: 'SDA', description: 'I2C Data line' },
      { esp32Pin: 'GPIO 12', modulePin: 'SCL', description: 'I2C Clock line' },
      { esp32Pin: 'GPIO 10', modulePin: 'INT', description: 'Host Interrupt pin' }
    ],
    code: `#include <Wire.h>
#include <Adafruit_BNO08x.h>

Adafruit_BNO08x bno08x(10);
sh2_SensorValue_t sensorValue;

void setup() {
  Serial.begin(115200);
  Wire.begin(11, 12);
  
  if (!bno08x.begin_I2C(0x4A, &Wire)) {
    Serial.println("Failed to find BNO085 chip!");
    while(1);
  }
  
  bno08x.enableReport(SH2_ROTATION_VECTOR, 20000); // 50Hz update rate
  Serial.println("[LAB 07] BNO085 Sensor Fusion Ready.");
}

void loop() {
  if (bno08x.getSensorEvent(&sensorValue)) {
    float qr = sensorValue.un.rotationVector.real;
    float qi = sensorValue.un.rotationVector.i;
    float qj = sensorValue.un.rotationVector.j;
    float qk = sensorValue.un.rotationVector.k;
    
    // បំប្លែង Quaternion ទៅ Euler Pitch & Roll
    float pitch = asin(2.0 * (qr * qj - qi * qk)) * 180.0 / PI;
    float roll  = atan2(2.0 * (qr * qi + qj * qk), 1.0 - 2.0 * (qi*qi + qj*qj)) * 180.0 / PI;

    Serial.printf("Pitch (Elevation Angle): %5.1f deg | Roll (Azimuth): %5.1f deg\\n", pitch, roll);
  }
  delay(100);
}`,
    serialSample: [
      '[LAB 07] BNO085 Sensor Fusion Ready.',
      'Pitch (Elevation Angle):  42.3 deg | Roll (Azimuth):   0.8 deg',
      'Pitch (Elevation Angle):  42.5 deg | Roll (Azimuth):   0.9 deg'
    ],
    interactiveSim: {
      type: 'imu',
      initialState: { pitch: 42.5, roll: 1.2 },
      prompt: 'រុញស្លាយ Pitch និង Roll ដើម្បីត្រាប់មើលមុំផ្អៀងរបស់បន្ទះសូឡាក្នុងលំហ 3D។'
    },
    fypApplication: 'BNO085 ត្រូវបានភ្ជាប់យ៉ាងរឹងមាំទៅនឹងគ្រោងដែកនៃបន្ទះសូឡា។ វាផ្តល់ទិន្នន័យមុំពិតប្រាកដ (Absolute Orientation Feedback) សម្រាប់ Closed-Loop PID Control ធានាថាសូឡាផ្អៀងចំមុំដែលចង់បានយ៉ាងជាក់លាក់បំផុត។'
  },
  {
    id: 8,
    title: 'Lab 08: ESP32 + Motor Driver (BTS7960 43A)',
    subtitle: 'ការបញ្ជាទិសដៅ Forward/Reverse និងល្បឿន PWM សម្រាប់ម៉ូទ័រ DC កម្លាំងធំ',
    moduleName: 'High Current H-Bridge Driver',
    difficulty: 'Intermediate',
    estimatedTime: '35 នាទី',
    description: 'យល់ដឹងពីស្ថាបត្យកម្ម H-Bridge (BTS7960/IBT-2), ការបញ្ជា Half-Bridge High-side និង Low-side, ការការពារ Shoot-Through និងការសរសេរកូដគ្រប់គ្រងល្បឿនម៉ូទ័រ 24V DC។',
    hardware: ['ESP32-S3 DevKit', 'BTS7960 43A Driver Module', '24V DC Motor', '24V Power Supply'],
    wiringDiagram: `
ESP32 GPIO 8  ──► RPWM (Forward PWM)
ESP32 GPIO 9  ──► LPWM (Reverse PWM)
ESP32 GPIO 7  ──► R_EN & L_EN (Enable 3.3V)
Driver B+ / B-──► 24V External Power Supply
Driver M+ / M-──► DC Motor Terminals
    `,
    wiringTable: [
      { esp32Pin: 'GPIO 8', modulePin: 'RPWM', description: 'Forward PWM speed control' },
      { esp32Pin: 'GPIO 9', modulePin: 'LPWM', description: 'Reverse PWM speed control' },
      { esp32Pin: 'GPIO 7', modulePin: 'R_EN + L_EN', description: 'Chip Enable Pin' },
      { esp32Pin: 'GND', modulePin: 'GND', description: 'Logic Common Ground' }
    ],
    code: `const int RPWM_PIN = 8;
const int LPWM_PIN = 9;
const int EN_PIN   = 7;

void setup() {
  Serial.begin(115200);
  pinMode(EN_PIN, OUTPUT);
  digitalWrite(EN_PIN, HIGH); // បើក Driver

  ledcAttach(RPWM_PIN, 20000, 8); // 20kHz, 8-bit (0-255)
  ledcAttach(LPWM_PIN, 20000, 8);
  
  Serial.println("[LAB 08] BTS7960 Driver Ready.");
}

void driveMotor(int speed) {
  if (speed > 0) {
    ledcWrite(RPWM_PIN, speed);
    ledcWrite(LPWM_PIN, 0);
  } else if (speed < 0) {
    ledcWrite(RPWM_PIN, 0);
    ledcWrite(LPWM_PIN, abs(speed));
  } else {
    ledcWrite(RPWM_PIN, 0);
    ledcWrite(LPWM_PIN, 0);
  }
}

void loop() {
  Serial.println("បង្វិលទៅមុខ (Forward 70% Speed)...");
  driveMotor(180);
  delay(3000);

  Serial.println("បញ្ឈប់ម៉ូទ័រ (Stop)...");
  driveMotor(0);
  delay(1000);

  Serial.println("បង្វិលថយក្រោយ (Reverse 70% Speed)...");
  driveMotor(-180);
  delay(3000);
}`,
    serialSample: [
      '[LAB 08] BTS7960 Driver Ready.',
      'បង្វិលទៅមុខ (Forward 70% Speed)...',
      'បញ្ឈប់ម៉ូទ័រ (Stop)...',
      'បង្វិលថយក្រោយ (Reverse 70% Speed)...'
    ],
    interactiveSim: {
      type: 'motor',
      initialState: { speed: 180, direction: 'CW', currentDraw: 2.1 },
      prompt: 'បញ្ជាប្តូរទិសដៅបង្វិលម៉ូទ័រ CW/CCW និងកែតម្រូវកម្រិត PWM Duty Cycle។'
    },
    fypApplication: 'Driver BTS7960 ត្រូវបានប្រើដើម្បីបញ្ជាម៉ូទ័រ Worm Gear Motor (Azimuth Drive) ដែលបង្វិលបន្ទះសូឡាពីទិសខាងកើតទៅខាងលិច និងម៉ូទ័រ Elevation Actuator។'
  },
  {
    id: 9,
    title: 'Lab 09: ESP32 + Stepper Motor (A4988/TMC2209)',
    subtitle: 'ការបញ្ជាជំហាន Step/Direction, Microstepping និង AccelStepper Library',
    moduleName: 'Precision Incremental Positioner',
    difficulty: 'Intermediate',
    estimatedTime: '35 នាទី',
    description: 'ស្វែងយល់ពីរបៀបបញ្ជា Stepper Motor (NEMA 17 / NEMA 23), ការប្រើជើង STEP និង DIR, ការកំណត់ Microstepping (1/16) ដើម្បីកុំឱ្យញ័រ និងការបង្កើត Acceleration Profile។',
    hardware: ['ESP32-S3 DevKit', 'A4988 / TMC2209 Driver', 'NEMA 17 Stepper', '12V/24V PSU'],
    wiringDiagram: `
ESP32 GPIO 15 ──► STEP
ESP32 GPIO 16 ──► DIR
ESP32 GND      ──► GND
Driver VMOT    ──► 24V Motor Power (100uF Cap ស្រប)
    `,
    wiringTable: [
      { esp32Pin: 'GPIO 15', modulePin: 'STEP', description: 'Pulse generation pin' },
      { esp32Pin: 'GPIO 16', modulePin: 'DIR', description: 'Direction pin (HIGH=CW, LOW=CCW)' }
    ],
    code: `const int STEP_PIN = 15;
const int DIR_PIN  = 16;

void setup() {
  Serial.begin(115200);
  pinMode(STEP_PIN, OUTPUT);
  pinMode(DIR_PIN, OUTPUT);
  Serial.println("[LAB 09] Stepper Motor Ready.");
}

void stepMotor(int steps, bool dir, int delayUs) {
  digitalWrite(DIR_PIN, dir ? HIGH : LOW);
  for (int i = 0; i < steps; i++) {
    digitalWrite(STEP_PIN, HIGH);
    delayMicroseconds(delayUs);
    digitalWrite(STEP_PIN, LOW);
    delayMicroseconds(delayUs);
  }
}

void loop() {
  Serial.println("បង្វិល 200 ជំហាន (1 ជុំពេញ)...");
  stepMotor(200, true, 1000);
  delay(1000);
}`,
    serialSample: [
      '[LAB 09] Stepper Motor Ready.',
      'បង្វិល 200 ជំហាន (1 ជុំពេញ)...',
      'បង្វិល 200 ជំហាន (1 ជុំពេញ)...'
    ],
    interactiveSim: {
      type: 'stepper',
      initialState: { steps: 800, microstepping: '1/16' },
      prompt: 'សាកល្បងចុច Pulse ជំហានដើម្បីមើលចលនាបង្វិលដ៏ម៉ដ្ឋនៃ Stepper Motor។'
    },
    fypApplication: 'Stepper Motor អាចប្រើប្រាស់ជាជម្រើសជំនួស DC Motor សម្រាប់ Solar Tracker ខ្នាតតូចដែលទាមទារភាពម៉ដ្ឋខ្ពស់ដោយមិនបាច់ប្រើ Gearbox ធំ។'
  },
  {
    id: 10,
    title: 'Lab 10: ESP32 + Linear Actuator (អ័ក្សកម្ពស់ Elevation)',
    subtitle: 'ការរុញ-ទាញបន្ទះសូឡា, Feedback Potentiometer និង End-Stop Safety',
    moduleName: 'Heavy-Duty Linear Drive System',
    difficulty: 'Advanced',
    estimatedTime: '40 នាទី',
    description: 'តភ្ជាប់ 24V Heavy-Duty Linear Actuator (កម្លាំងរុញ 1500N), ការអានប្រវែង Stroke តាមរយៈ Internal Feedback Potentiometer និងការការពារកុំឱ្យបុកទង្គិចដល់ Limit Switch។',
    hardware: ['ESP32-S3 DevKit', '24V Linear Actuator with Feedback', 'BTS7960 Driver', '24V 10A PSU'],
    wiringDiagram: `
Actuator Red/Black ──► Driver M+ / M- (24V High Current)
Actuator Feedback  ──► ESP32 GPIO 3 (ADC1 - 0 to 3.3V Stroke Readout)
Actuator Limits    ──► ESP32 GPIO 6 (Limit Switch Interrupt)
    `,
    wiringTable: [
      { esp32Pin: 'GPIO 3', modulePin: 'Actuator Wiper', description: 'អានប្រវែង Stroke (0-300mm)' },
      { esp32Pin: 'GPIO 6', modulePin: 'End Limit Switch', description: 'កុងតាក់សុវត្ថិភាពចុងជើង' }
    ],
    code: `const int STROKE_ADC_PIN = 3;
const int MAX_STROKE_MM  = 300;

void setup() {
  Serial.begin(115200);
  analogReadResolution(12);
  Serial.println("[LAB 10] Linear Actuator Controller Ready.");
}

void loop() {
  int raw = analogRead(STROKE_ADC_PIN);
  float strokeMm = (raw / 4095.0) * MAX_STROKE_MM;
  float elevationAngle = map(strokeMm, 0, 300, 15, 75); // 15° to 75°

  Serial.printf("Raw: %4d | Stroke Position: %5.1f mm | Elevation Angle: %4.1f deg\\n",
                raw, strokeMm, elevationAngle);
  delay(500);
}`,
    serialSample: [
      '[LAB 10] Linear Actuator Controller Ready.',
      'Raw: 2048 | Stroke Position: 150.0 mm | Elevation Angle: 45.0 deg',
      'Raw: 2450 | Stroke Position: 179.5 mm | Elevation Angle: 50.9 deg'
    ],
    interactiveSim: {
      type: 'actuator',
      initialState: { strokeMm: 150, elevationDeg: 45.0 },
      prompt: 'រុញស្លាយដើម្បីមើលចលនារុញឡើង និងទាញចុះនៃ Linear Actuator លើអ័ក្ស Elevation។'
    },
    fypApplication: 'Linear Actuator ទទួលបន្ទុកលើក និងទម្លាក់បន្ទះសូឡាទម្ងន់ធ្ងន់ពីមុំ 15 ដឺក្រេ (រដូវរងា/ថ្ងៃត្រង់) ដល់ 65 ដឺក្រេ ដោយទប់ទល់នឹងកម្លាំងខ្យល់បោកបក់រហូតដល់ 120 km/h។'
  },
  {
    id: 11,
    title: 'Lab 11: ESP32 + CAN Bus (TWAI Protocol)',
    subtitle: 'ទំនាក់ទំនងស្តង់ដាររថយន្ត និងឧស្សាហកម្ម Differential SN65HVD230 Transceiver',
    moduleName: 'Industrial Automotive Robust Bus',
    difficulty: 'Advanced',
    estimatedTime: '45 នាទី',
    description: 'ស្វែងយល់ពីពិធីការ Two-Wire Automotive Interface (TWAI/CAN Bus 2.0B) របស់ ESP32-S3, ការប្រើប្រាស់ 3.3V CAN Transceiver (SN65HVD230), ការបញ្ចប់ខ្សែដោយ Resistor 120Ω និងការបញ្ជូនកញ្ចប់សារ Telemetry រវាងបន្ទះសៀគ្វី។',
    hardware: ['2x ESP32-S3 Boards', '2x SN65HVD230 CAN Transceivers', '120Ω Termination Resistors'],
    wiringDiagram: `
ESP32 GPIO 4 ──► CAN Transceiver TXD
ESP32 GPIO 5 ──► CAN Transceiver RXD
Transceiver CAN_H ──► Twisted Pair Bus (CAN_H) ──[120Ω Resistor]
Transceiver CAN_L ──► Twisted Pair Bus (CAN_L) ──[120Ω Resistor]
    `,
    wiringTable: [
      { esp32Pin: 'GPIO 4', modulePin: 'TXD', description: 'ESP32 TWAI Transmit' },
      { esp32Pin: 'GPIO 5', modulePin: 'RXD', description: 'ESP32 TWAI Receive' }
    ],
    code: `#include "driver/twai.h"

#define CAN_TX_PIN GPIO_NUM_4
#define CAN_RX_PIN GPIO_NUM_5

void setup() {
  Serial.begin(115200);

  twai_general_config_t g_config = TWAI_GENERAL_CONFIG_DEFAULT(CAN_TX_PIN, CAN_RX_PIN, TWAI_MODE_NORMAL);
  twai_timing_config_t t_config  = TWAI_TIMING_CONFIG_250KBITS();
  twai_filter_config_t f_config  = TWAI_FILTER_CONFIG_ACCEPT_ALL();

  if (twai_driver_install(&g_config, &t_config, &f_config) == ESP_OK) {
    Serial.println("TWAI driver installed.");
  }
  if (twai_start() == ESP_OK) {
    Serial.println("[LAB 11] CAN Bus 250kbps Running.");
  }
}

void loop() {
  twai_message_t msg;
  msg.identifier = 0x120; // Message ID: Solar Telemetry
  msg.data_length_code = 4;
  msg.data[0] = 0x18; // 24V
  msg.data[1] = 0x2A; // 4.2A
  msg.data[2] = 0x2B; // 43° Pitch
  msg.data[3] = 0x01; // Status OK

  if (twai_transmit(&msg, pdMS_TO_TICKS(1000)) == ESP_OK) {
    Serial.println("[CAN TX] Packet Sent ID: 0x120 [24V, 4.2A, 43°]");
  }
  delay(1000);
}`,
    serialSample: [
      '[LAB 11] CAN Bus 250kbps Running.',
      '[CAN TX] Packet Sent ID: 0x120 [24V, 4.2A, 43°]',
      '[CAN TX] Packet Sent ID: 0x120 [24V, 4.2A, 43°]'
    ],
    interactiveSim: {
      type: 'can',
      initialState: { busRate: '250 kbps', packetsSent: 12, errorCount: 0 },
      prompt: 'ចុចបញ្ជូនកញ្ចប់ទិន្នន័យ CAN Bus Packet ដើម្បីសង្កេតមើល Differential Signal CAN_H និង CAN_L។'
    },
    fypApplication: 'CAN Bus ត្រូវបានជ្រើសរើសជាបណ្តាញទំនាក់ទំនងរឹងមាំរវាង Motor Controller PCB នៅលើបង្គោលសូឡា និង Main Gateway Controller PCB នៅក្នុងបន្ទប់បញ្ជា (ចម្ងាយ 50 ម៉ែត្រ) ដោយសារវាមានប្រព័ន្ធការពារ Noise និង Error Detection កម្រិតឧស្សាហកម្ម។'
  },
  {
    id: 12,
    title: 'Lab 12: ESP32 + MQTT (IoT Protocol)',
    subtitle: 'ការផ្ញើទិន្នន័យ Telemetry (Publish) និងការទទួលបញ្ជា (Subscribe) តាម Cloud Broker',
    moduleName: 'Lightweight IoT Publish/Subscribe',
    difficulty: 'Intermediate',
    estimatedTime: '35 នាទី',
    description: 'តភ្ជាប់ ESP32 ទៅកាន់ MQTT Broker (ដូចជា Mosquitto ឬ HiveMQ), ការ Publish ទិន្នន័យ Sensor ជាទម្រង់ JSON ទៅកាន់ Topic "solar/telemetry" និងការ Subscribe ទទួលបញ្ជា Manual Move ពី Cloud។',
    hardware: ['ESP32-S3 DevKit', 'Wi-Fi Network', 'Free Public MQTT Broker'],
    wiringDiagram: `
ESP32 Wi-Fi ──► Router (2.4GHz) ──► Internet ──► MQTT Broker (broker.hivemq.com:1883)
    `,
    wiringTable: [
      { esp32Pin: 'Wi-Fi RF', modulePin: 'TCP/IP Port 1883', description: 'MQTT standard unencrypted / 8883 for TLS' }
    ],
    code: `#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* mqtt_server = "broker.hivemq.com";

WiFiClient espClient;
PubSubClient client(espClient);

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("ទទួលបានបញ្ជាពី Topic [");
  Serial.print(topic);
  Serial.print("]: ");
  for (int i = 0; i < length; i++) Serial.print((char)payload[i]);
  Serial.println();
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);

  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    if (client.connect("ESP32_SolarClient")) {
      Serial.println("[LAB 12] MQTT Connected!");
      client.subscribe("solar/command");
    }
  }
  client.loop();

  static unsigned long lastMsg = 0;
  if (millis() - lastMsg > 3000) {
    lastMsg = millis();
    char msg[128];
    snprintf(msg, sizeof(msg), "{\\"volt\\":24.3,\\"curr\\":4.1,\\"pitch\\":43.2}");
    client.publish("solar/telemetry", msg);
    Serial.println("[MQTT PUB] solar/telemetry -> " + String(msg));
  }
}`,
    serialSample: [
      '[LAB 12] MQTT Connected!',
      '[MQTT PUB] solar/telemetry -> {"volt":24.3,"curr":4.1,"pitch":43.2}',
      'ទទួលបានបញ្ជាពី Topic [solar/command]: PARK_MODE'
    ],
    interactiveSim: {
      type: 'mqtt',
      initialState: { broker: 'broker.hivemq.com', status: 'Connected', payload: '{"volt":24.3}' },
      prompt: 'ចុច Publish សារ JSON Telemetry ទៅកាន់ MQTT Broker និងមើលការឆ្លើយតប។'
    },
    fypApplication: 'MQTT គឺជាពិធីការស្នូលរវាង ESP32 និង Node-RED Dashboard។ ដោយសារវាជាទម្រង់ Publish/Subscribe ទម្ងន់ស្រាល វាជួយសន្សំសំចៃទិន្នន័យអ៊ីនធឺណិត និងឆ្លើយតបបញ្ជាពីទូរសព្ទដៃភ្លាមៗក្នុងពេលតិចជាង 100ms។'
  },
  {
    id: 13,
    title: 'Lab 13: ESP32 + Node-RED Dashboard',
    subtitle: 'ការរចនាផ្ទាំងគ្រប់គ្រងឧស្សាហកម្ម Visual Flow-Based Programming & Gauge Metrics',
    moduleName: 'Industrial SCADA Flow Engine',
    difficulty: 'Intermediate',
    estimatedTime: '40 នាទី',
    description: 'តភ្ជាប់ ESP32 ជាមួយ Node-RED, ការបង្កើត Flow អានកញ្ចប់ MQTT, ការញែក JSON Object, ការគូរក្រាហ្វ Chart, Gauge វាស់តង់ស្យុង/ចរន្ត និងប៊ូតុងបញ្ជាទិសដៅលើ Web UI។',
    hardware: ['ESP32-S3 DevKit', 'PC/Raspberry Pi Running Node-RED', 'Local Wi-Fi Network'],
    wiringDiagram: `
ESP32 (MQTT Pub) ──► Node-RED MQTT In Node ──► JSON Parser ──► UI Gauge / Line Chart
Node-RED UI Button ──► MQTT Out Node ("solar/command") ──► ESP32 (MQTT Sub)
    `,
    wiringTable: [
      { esp32Pin: 'Wi-Fi MQTT', modulePin: 'Node-RED Host', description: 'Flow Engine on Port 1880' }
    ],
    code: `// ESP32 បញ្ជូនកញ្ចប់ទិន្នន័យ JSON ស្តង់ដារដែល Node-RED អាចញែកបានភ្លាមៗ
void sendTelemetryToNodeRed() {
  String json = "{";
  json += "\\"voltage\\":" + String(24.3, 2) + ",";
  json += "\\"current\\":" + String(4.15, 2) + ",";
  json += "\\"power\\":"   + String(24.3 * 4.15, 1) + ",";
  json += "\\"pitch\\":"   + String(42.5, 1) + ",";
  json += "\\"azimuth\\":" + String(148.0, 1) + ",";
  json += "\\"mode\\":\\"AUTO\\"";
  json += "}";

  client.publish("solartrack/metrics", json.c_str());
  Serial.println("[Node-RED Payload Sent]: " + json);
}`,
    serialSample: [
      '[Node-RED Payload Sent]: {"voltage":24.30,"current":4.15,"power":100.8,"pitch":42.5,"azimuth":148.0,"mode":"AUTO"}'
    ],
    interactiveSim: {
      type: 'nodered',
      initialState: { flowRunning: true, uiVoltage: 24.3, uiPower: 100.8 },
      prompt: 'សង្កេតមើលការហូរនៃទិន្នន័យ (Data Flow) ពី MQTT In ចូលទៅកាន់ Gauge និង Graph Widget ក្នុង Node-RED។'
    },
    fypApplication: 'Node-RED ដើរតួជា SCADA Host សម្រាប់បង្ហាញរបាយការណ៍ដល់គណៈកម្មការការពារនិក្ខេបបទ FYP។ វាផ្តល់នូវចំណុចប្រទាក់ដ៏ទាក់ទាញ មានក្រាហ្វប្រវត្តិថាមពលប្រចាំថ្ងៃ និងប៊ូតុងបញ្ជាបង្វិលសូឡាដោយផ្ទាល់។'
  },
  {
    id: 14,
    title: 'Lab 14: ESP32 + Web Dashboard & Cloud Server',
    subtitle: 'ការរួមបញ្ចូលប្រព័ន្ធពេញលេញ End-to-End IoT Solar Telemetry System',
    moduleName: 'Full-Stack Embedded Web Telemetry',
    difficulty: 'Advanced',
    estimatedTime: '50 នាទី',
    description: 'ការរួមបញ្ចូលគ្នាពេញលេញរវាង Hardware និង Software៖ ESP32-S3 អាន Sensor ទាំងអស់, បញ្ជា Motor តាមក្បួន Sun Tracking, បញ្ជូនទិន្នន័យតាម CAN Bus ទៅ Master Gateway និងរុញឡើង Web Dashboard ក្នុងពេលតែមួយ។',
    hardware: ['ប្រព័ន្ធគ្រឿងរឹង Solar Tracker ពេញលេញ (ESP32-S3, Motors, Sensors, PCB)'],
    wiringDiagram: `
[Sensors: LDR + IMU + RTC] ──► [ESP32-S3 Master] ──► [CAN Transceiver] ──► [Motor Driver PCB]
                                      │ (Wi-Fi WebSocket / MQTT)
                                      ▼
                        [Cloud Server & Web Dashboard]
    `,
    wiringTable: [
      { esp32Pin: 'All Subsystems', modulePin: 'Integrated PCB', description: 'Full System Integration' }
    ],
    code: `// កូដសង្ខេបនៃ Main Control Loop ពេញលេញ
void loop() {
  readSensors();       // 1. អាន LDR, IMU, RTC, Current Sensor
  computeTracking();   // 2. គណនាមុំលំអៀង និងរត់ PID Algorithm
  driveMotors();       // 3. បញ្ចេញ PWM ទៅកាន់ H-Bridge
  checkSafetyLimits(); // 4. ត្រួតពិនិត្យ E-Stop និង Limit Switches
  publishTelemetry();  // 5. បញ្ជូនកញ្ចប់ទិន្នន័យតាម MQTT/CAN
  delay(20);           // 50Hz Control Loop Rate
}`,
    serialSample: [
      '[SYSTEM OK] All 14 subsystems running deterministically at 50Hz loop rate.'
    ],
    interactiveSim: {
      type: 'telemetry',
      initialState: { status: 'NORMAL_TRACKING', efficiency: '+32.4% vs Fixed Panel' },
      prompt: 'ពិនិត្យមើលផ្ទាំង Telemetry បញ្ជាក់ពីប្រសិទ្ធភាពកើនឡើងនៃ Dual-Axis Solar Tracker បើធៀបនឹងបន្ទះសូឡានៅស្ងៀម។'
    },
    fypApplication: 'នេះគឺជាគោលដៅចុងក្រោយនៃ Final Year Project៖ ការបង្កើតប្រព័ន្ធឆ្លាតវៃពិតប្រាកដមួយដែលផលិតថាមពលអគ្គិសនីបានច្រើនជាងបន្ទះសូឡាធម្មតា 30% ទៅ 40% ព្រមទាំងអាចត្រួតពិនិត្យ និងបញ្ជាបានពីគ្រប់ទីកន្លែងលើពិភពលោក។'
  }
];
