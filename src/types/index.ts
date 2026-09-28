export type Language = 'km' | 'en';
export type LearningMode = 'beginner' | 'engineering' | 'fyp';

export type NavSection =
  | 'dashboard'
  | 'roadmap'
  | 'esp32'
  | 'labs'
  | 'electronics'
  | 'pcb-course'
  | 'components'
  | 'fyp-pcb-arch'
  | 'fyp-pcb-design'
  | 'circuit-builder'
  | 'code-playground'
  | 'fyp-mode'
  | 'system-arch'
  | 'debug-center'
  | 'calculators'
  | 'solar-calculator'
  | 'quizzes'
  | 'notebook'
  | 'kanban';

export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  
  // 15-Section Comprehensive Engineering Pedagogy:
  // 1. Learning Objectives (គោលបំណងសិក្សា)
  learningObjectives?: string[];

  // 2. What is it? (តើវាជាអ្វី?)
  concept: string;
  whatIsIt?: string;

  // 3. Why do we need it? (ហេតុអ្វីបានជាយើងត្រូវការវា?)
  whyNeedIt?: string;

  // 4. How does it work? (តើវាដំណើរការយ៉ាងដូចម្តេច?)
  howItWorks?: string;
  diagram: string;
  explanation: string[];

  // 5. Hardware / Wiring (ការតភ្ជាប់ Hardware & Pinout)
  wiring: {
    pinFrom: string;
    pinTo: string;
    component: string;
    note: string;
  }[];

  // 6. Example (ឧទាហរណ៍ជាក់ស្តែង / Real-World Engineering Example)
  realWorldExample?: {
    title: string;
    scenario: string;
    whyItMatters: string;
  };

  // 7. Arduino IDE Code (កូដកម្មវិធី Arduino C++)
  codeExample: string;

  // 8. Code Explanation in Khmer (ការពន្យល់កូដលម្អិតជាភាសាខ្មែរ)
  codeExplanation: { token: string; explanation: string }[];

  // 9. Testing Procedure (វិធីសាស្ត្រធ្វើតេស្តផ្ទៀងផ្ទាត់ & Serial Output)
  howToTest?: string;
  expectedOutput: string;

  // 10. Common Problems (បញ្ហាប្រឈមញឹកញាប់ & Root Causes)
  commonErrors: { error: string; cause: string; fix: string }[];

  // 11. Debugging (វិធីសាស្ត្រដោះស្រាយកំហុស Step-by-Step Protocol)
  debuggingSteps?: {
    step: number;
    action: string;
    expectedCheck: string;
    toolsUsed?: string;
  }[];

  // 12. FYP Connection (Dedicated interactive card with architecture, purpose, wiring, trade-offs, troubleshooting)
  fypConnection?: {
    title: string;
    subsystem: string;
    architectureTree: string;
    purposeKm: string;
    wiringDetailsKm: string;
    tradeOffsKm: string;
    troubleshootingKm: string;
    hardwareComponents: string[];
    documentationTipKm?: string;
  };

  // 13. Mini Exercise (លំហាត់អនុវត្តខ្នាតតូច)
  miniExercise: { prompt: string; hint: string };

  // 14. Quiz (សំណួរត្រួតពិនិត្យការយល់ដឹងជាមួយភ្លាមៗ Feedback & Rationale)
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };

  // 15. Next Lesson (មេរៀនបន្ទាប់ និងស្ពានចម្លង)
  nextLesson?: {
    id: number;
    title: string;
    bridgeKm: string;
  };

  // Backward compatibility
  fypApplication: {
    title: string;
    description: string;
    hardwareConnected: string;
  };

  // Three Learning Modes Data:
  beginnerMode?: {
    simpleSummaryKm: string;
    analogyKm: string;
    stepByStepGuideKm: string[];
  };

  engineeringMode?: {
    datasheetSpecs: { parameter: string; value: string; conditionOrLimit: string }[];
    calculations: {
      title: string;
      formula: string;
      variablesKm: string;
      workedExampleKm: string;
    };
    designTradeOffs: {
      decision: string;
      optionA: string;
      optionB: string;
      selectedReasonKm: string;
    }[];
    labTestingProtocolKm: string;
  };

  fypModeData?: {
    roleInSolarTrackerKm: string;
    hardwareRelationshipKm: string;
    trackerCalculationsKm?: string;
    onSiteTestingKm: string;
    thesisDefenseQuestionKm: string;
    modelAnswerKm: string;
  };
}

export interface Lab {
  id: number;
  title: string;
  subtitle?: string;
  moduleName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  description: string;
  hardware: string[];
  wiringDiagram: string;
  wiringTable: { esp32Pin: string; modulePin: string; description: string }[];
  code: string;
  serialSample: string[];
  interactiveSim: {
    type: 'led' | 'button' | 'potentiometer' | 'ldr' | 'oled' | 'rtc' | 'imu' | 'motor' | 'stepper' | 'actuator' | 'can' | 'mqtt' | 'nodered' | 'telemetry';
    initialState: Record<string, any>;
    prompt: string;
  };
  fypApplication: string;
}

export interface ElectronicsTopic {
  id: string;
  title: string;
  category: 'Fundamentals' | 'Components' | 'Protection & Noise' | 'Power Systems';
  formula?: string;
  keyRule: string;
  explanation: string;
  solarTrackerRelevance: string;
  schematicAscii: string;
  designTips: string[];
  commonMistakes: string[];
}

export interface PcbComponent {
  id: string;
  name: string;
  category: 'MCU' | 'Power' | 'Protection' | 'Drivers' | 'Communication' | 'Sensors' | 'Passive' | 'Connectors';
  function: string;
  voltage: string;
  current: string;
  packageType: string;
  thtSmd: 'SMD' | 'THT' | 'Both';
  recommendedFootprint: string;
  whyUsed: string;
  alternatives: string[];
  commonMistakes: string[];
  solarTrackerRole: string;
}

export interface DebugIssue {
  id: string;
  category: 'ESP32' | 'PCB' | 'CAN' | 'MQTT';
  title: string;
  symptoms: string[];
  possibleCauses: string[];
  testingMethod: string;
  solution: string;
  preventionTip: string;
}

export interface QuizQuestion {
  id: string;
  category: string;
  type: 'multiple-choice' | 'true-false' | 'circuit-debug' | 'code-debugging' | 'pcb-decision';
  question: string;
  codeSnippet?: string;
  circuitSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedLessonId?: number;
}

export interface NotebookEntry {
  id: string;
  title: string;
  date: string;
  hardware: string;
  codeVersion: string;
  category: 'Hardware' | 'Firmware' | 'PCB' | 'Testing' | 'System';
  measurements: string;
  problem: string;
  solution: string;
  conclusion: string;
}

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  status: 'backlog' | 'in-progress' | 'testing' | 'completed';
  category: 'Hardware' | 'Firmware' | 'PCB' | 'IoT' | 'Integration';
  priority: 'High' | 'Medium' | 'Low';
  milestone: string;
  deliverable: string;
}
