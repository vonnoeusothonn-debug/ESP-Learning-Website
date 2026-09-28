import React, { useState, useEffect } from 'react';
import { NavSection, KanbanTask, NotebookEntry } from './types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { RoadmapView } from './components/RoadmapView';
import { Esp32LessonsView } from './components/Esp32LessonsView';
import { PracticalLabView } from './components/PracticalLabView';
import { ElectronicsView } from './components/ElectronicsView';
import { PcbCourseView } from './components/PcbCourseView';
import { ComponentGuideView } from './components/ComponentGuideView';
import { FypPcbArchitectureView } from './components/FypPcbArchitectureView';
import { FypPcbDesignView } from './components/FypPcbDesignView';
import { CircuitBuilderView } from './components/CircuitBuilderView';
import { CodePlaygroundView } from './components/CodePlaygroundView';
import { FypModeView } from './components/FypModeView';
import { SystemArchitectureView } from './components/SystemArchitectureView';
import { DebugCenterView } from './components/DebugCenterView';
import { CalculatorsView } from './components/CalculatorsView';
import { SolarCalculatorView } from './components/SolarCalculatorView';
import { QuizView } from './components/QuizView';
import { NotebookView } from './components/NotebookView';
import { KanbanView } from './components/KanbanView';

import { INITIAL_KANBAN_TASKS, INITIAL_NOTEBOOK_ENTRIES } from './data/initialFypData';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [currentSection, setCurrentSection] = useState<NavSection>('dashboard');
  const [fypModeActive, setFypModeActive] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedCodeSnippet, setSelectedCodeSnippet] = useState<string>('');

  // Persistent Completed Lessons
  const [completedLessons, setCompletedLessons] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('solartrack_completed_lessons');
      return saved ? JSON.parse(saved) : [1, 2, 3, 4, 5, 6, 7, 8, 9];
    } catch (e) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
  });

  // Persistent Kanban Tasks
  const [tasks, setTasks] = useState<KanbanTask[]>(() => {
    try {
      const saved = localStorage.getItem('solartrack_kanban_tasks');
      return saved ? JSON.parse(saved) : INITIAL_KANBAN_TASKS;
    } catch (e) {
      return INITIAL_KANBAN_TASKS;
    }
  });

  // Persistent Lab Notebook
  const [notebookEntries, setNotebookEntries] = useState<NotebookEntry[]>(() => {
    try {
      const saved = localStorage.getItem('solartrack_notebook_entries');
      return saved ? JSON.parse(saved) : INITIAL_NOTEBOOK_ENTRIES;
    } catch (e) {
      return INITIAL_NOTEBOOK_ENTRIES;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('solartrack_completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('solartrack_kanban_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('solartrack_notebook_entries', JSON.stringify(notebookEntries));
  }, [notebookEntries]);

  const toggleLessonCompletion = (id: number) => {
    setCompletedLessons(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Dynamic Progress calculation
  const esp32Progress = Math.round((completedLessons.length / 16) * 100);
  const completedTasksCount = tasks.filter(t => t.status === 'completed').length;
  const fypOverallProgress = Math.round(((completedTasksCount / tasks.length) * 0.6 + (esp32Progress / 100) * 0.4) * 100);

  const progressState = {
    esp32: esp32Progress,
    electronics: 35,
    pcb: 25,
    iot: 30,
    fyp: fypOverallProgress
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        fypModeActive={fypModeActive}
        setFypModeActive={setFypModeActive}
        overallProgress={fypOverallProgress}
      />

      {/* Main Framework Layout */}
      <div className="flex-1 flex">
        
        {/* Sidebar Navigation */}
        <Sidebar
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          fypModeActive={fypModeActive}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />

        {/* Content Body */}
        <main className="flex-1 lg:pl-64 flex flex-col min-w-0">
          
          {/* Mobile subheader bar with hamburger */}
          <div className="lg:hidden flex items-center justify-between px-4 py-2.5 bg-slate-900/60 border-b border-slate-800">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2 text-xs font-mono"
            >
              <Menu className="w-4 h-4 text-cyan-400" />
              <span>Menu</span>
            </button>

            <span className="text-xs font-mono text-slate-400 uppercase">
              {currentSection.replace('-', ' ')}
            </span>
          </div>

          {/* Section Router Container */}
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto flex-1">
            {currentSection === 'dashboard' && (
              <DashboardView
                setCurrentSection={setCurrentSection}
                fypModeActive={fypModeActive}
                setFypModeActive={setFypModeActive}
                progress={progressState}
                tasks={tasks}
                notebookEntries={notebookEntries}
              />
            )}

            {currentSection === 'roadmap' && (
              <RoadmapView
                setCurrentSection={setCurrentSection}
                completedLessons={completedLessons}
              />
            )}

            {currentSection === 'esp32' && (
              <Esp32LessonsView
                completedLessons={completedLessons}
                toggleLessonCompletion={toggleLessonCompletion}
                setCurrentSection={setCurrentSection}
                setSelectedCodeSnippet={setSelectedCodeSnippet}
              />
            )}

            {currentSection === 'labs' && (
              <PracticalLabView
                setCurrentSection={setCurrentSection}
                setSelectedCodeSnippet={setSelectedCodeSnippet}
              />
            )}

            {currentSection === 'electronics' && (
              <ElectronicsView
                setCurrentSection={setCurrentSection}
              />
            )}

            {currentSection === 'pcb-course' && (
              <PcbCourseView
                setCurrentSection={setCurrentSection}
              />
            )}

            {currentSection === 'components' && (
              <ComponentGuideView
                setCurrentSection={setCurrentSection}
              />
            )}

            {currentSection === 'fyp-pcb-arch' && (
              <FypPcbArchitectureView
                setCurrentSection={setCurrentSection}
              />
            )}

            {currentSection === 'fyp-pcb-design' && (
              <FypPcbDesignView
                setCurrentSection={setCurrentSection}
              />
            )}

            {currentSection === 'circuit-builder' && (
              <CircuitBuilderView
                setCurrentSection={setCurrentSection}
              />
            )}

            {currentSection === 'code-playground' && (
              <CodePlaygroundView
                initialCode={selectedCodeSnippet}
                setCurrentSection={setCurrentSection}
              />
            )}

            {currentSection === 'fyp-mode' && (
              <FypModeView
                setCurrentSection={setCurrentSection}
              />
            )}

            {currentSection === 'system-arch' && (
              <SystemArchitectureView
                setCurrentSection={setCurrentSection}
              />
            )}

            {currentSection === 'debug-center' && (
              <DebugCenterView
                setCurrentSection={setCurrentSection}
              />
            )}

            {currentSection === 'calculators' && (
              <CalculatorsView
                setCurrentSection={setCurrentSection}
              />
            )}

            {currentSection === 'solar-calculator' && (
              <SolarCalculatorView
                setCurrentSection={setCurrentSection}
              />
            )}

            {currentSection === 'quizzes' && (
              <QuizView
                setCurrentSection={setCurrentSection}
              />
            )}

            {currentSection === 'notebook' && (
              <NotebookView
                entries={notebookEntries}
                setEntries={setNotebookEntries}
                setCurrentSection={setCurrentSection}
              />
            )}

            {currentSection === 'kanban' && (
              <KanbanView
                tasks={tasks}
                setTasks={setTasks}
                setCurrentSection={setCurrentSection}
              />
            )}
          </div>

          {/* Footer */}
          <footer className="mt-auto px-6 py-4 border-t border-slate-900 bg-slate-950/80 text-[11px] font-mono text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              SolarTrack EE • Final Year Project (FYP) Development Assistant
            </div>
            <div>
              ESP32-S3 • 2-Layer Custom PCB • 250W Solar Mast • CAN Bus SCADA
            </div>
          </footer>
        </main>

      </div>

    </div>
  );
}
