// src/app/components/shared/MobileProjectsFolder.tsx
'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Folder, FolderOpen, Globe, Layout, Smartphone, Server,
  Notebook, Cpu, Database, GitBranch, Code, Terminal,
  ChevronDown, ChevronUp, X, ExternalLink, Github,
  DraftingCompass,
  Braces,
  Triangle,
  Monitor,
  CodeXml,
  Droplet,
  Blend,
  GalleryVerticalEnd,
  ShoppingBag,
  ShoppingCart,
  Siren,
  Zap,
  Shield,
  Phone,
  Check,
  Code2,
  LayoutList,
  Lightbulb,
  SquareTerminal,
  ChevronsDown,
  Box,
  BookOpen,
  BarChart2,
  Clock,
  Cloud,
  Cog,
  FileText,
  Layers,
  LifeBuoy,
  Lock,
  Mail,
  PieChart,
  Settings,
  ShieldCheck,
  Tag,
  TrendingUp,
  Users
} from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWordpress, faShopify, faWordpressSimple } from '@fortawesome/free-brands-svg-icons'

interface ProjectNote {
  id: string;
  title: string;
  content: string;
  status: 'idea-phase' | 'in-progress' | 'completed';
  techStack: string[];
  date?: string;
  urgent?: boolean;
  tasks?: {
    isChecked: boolean;
    description: string;
  }[];
}

export default function ProjectsFolder() {
  const [activeTab, setActiveTab] = useState<'notes' | 'portfolio' | 'web' | 'mobile' >('notes');
  const [expandedNotes, setExpandedNotes] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Types
  interface UpdateLog {
    id: string;
    date: string;
    version: string;
    message: string;
    type: 'feature' | 'fix' | 'improvement' | 'note';
  }

  interface Task {
    id: string;
    description: string;
    isChecked: boolean;
    category: string;
    priority: 'low' | 'medium' | 'high';
  }

  // State
  const [updatesLog, setUpdatesLog] = useState<UpdateLog[]>([
    {
      id: '1',
      date: '29-05-2025',
      version: '1.0.0',
      message: 'Mobile-first friendly layout implemented.',
      type: 'improvement'
    },
    {
      id: '2',
      date: '25-05-2025',
      version: '2.0.0',
      message: 'Fully redesigned UI with dark mode.',
      type: 'feature'
    },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
   {
      id: '1',
      description: 'OS-inspired interface that adapts flawlessly from desktop to mobile.',
      isChecked: true,
      category: 'UI/UX',
      priority: 'medium'
    },
    {
      id: '2',
      description: 'Implement OS-style controls and route them.',
      isChecked: false,
      category: 'Feature',
      priority: 'low'
    },
    {
      id: '3',
      description: 'Optimize the mobile interface for better usability and smoother user interactions.',
      isChecked: false,
      category: 'Improvement',
      priority: 'high'
    },
  ]);

  // Helper functions
  const getUpdateColor = (type: string) => {
    switch(type) {
      case 'feature': return 'bg-blue-500';
      case 'fix': return 'bg-red-500';
      case 'improvement': return 'bg-green-500';
      case 'note': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (type: string) => {
    switch(type) {
      case 'low': return 'bg-blue-500/70';
      case 'medium': return 'bg-green-500/70';
      case 'high': return 'bg-red-500/70';
      default: return 'bg-gray-500';
    }
  };

  const projectNotes: ProjectNote[] = [
     {
      id: 'note-1',
      title: '3D Workspace Portfolio',
      content: 'Step into a 3D interactive portfolio set within a virtual room. Move around freely, explore the space, and interact with objects - all presented in an immersive, game-like environment.',
      status: 'in-progress',
      techStack: ['Three.js', 'Blender']
    }
  ];

  const toggleNoteExpand = (index: number) => {
    setExpandedNotes(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'idea-phase': return 'bg-gray-500';
      case 'in-progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'notes':
        return (
          <div className="space-y-4">
            {/* Header with animated terminal cursor */}
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-mono font-medium text-gray-800 dark:text-gray-200 flex items-center gap-1">
                <SquareTerminal className="text-purple-500" size={16} />
                PROJECT_CONSOLE
                <motion.span 
                  className="w-1.5 h-4 bg-purple-500 inline-block"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </h2>
              <div className="flex-1 border-gray-300 dark:border-gray-600"></div>
            </div>

            {/* Updates Log Section */}
            <div className="bg-gray-200/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="text-blue-500" size={14} />
                <h3 className="font-mono font-medium text-xs text-gray-700 dark:text-gray-300">UPDATES_LOG</h3>
                <div className="flex-1 border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="flex-1 border-b border-gray-300 dark:border-gray-600 mb-1"></div>
              
              <div className="space-y-2">
                {updatesLog.map((update, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded transition-colors"
                  >
                    <div className={`mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full ${getUpdateColor(update.type)}`}></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">{update.date}</span>
                        <span className="text-[10px] px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                          v{update.version}
                        </span>
                      </div>
                      <p className="text-xs mt-0.5 dark:text-gray-200">{update.message}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* TODO Checklist Section */}
            <div className="bg-gray-200/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
              <div className="flex items-center gap-2 mb-2">
                <LayoutList className="text-green-500" size={14} />
                <h3 className="font-mono font-medium text-xs text-gray-700 dark:text-gray-300">TASKS_QUEUE</h3>
              </div>
              <div className="flex-1 border-b border-gray-300 dark:border-gray-600 mb-1"></div>
              
              <div className="space-y-1.5">
                {tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded transition-colors"
                  >
                    <div className={`mt-0.5 flex-shrink-0 w-3 h-3 rounded-sm border ${task.isChecked 
                      ? 'bg-green-500 border-green-500 flex items-center justify-center' 
                      : 'border-gray-400 dark:border-gray-500'}`}
                    >
                      {task.isChecked && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs ${task.isChecked ? 'line-through text-gray-400 dark:text-gray-500' : 'dark:text-gray-200'}`}>
                        {task.description}
                      </p>
                      <div className="flex gap-1 mt-0.5">
                        <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 flex items-center">
                            {task.category}
                          </span>
                        <span className={`text-[10px] font-mono px-1 py-0.5 rounded ${getPriorityColor(task.priority)} text-white`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Project Notes Section */}
            <div className="space-y-3">
              {projectNotes.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer group"
                  onClick={() => toggleNoteExpand(index)}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                      <Lightbulb className="text-purple-600 dark:text-purple-500" size={14} />
                      <h4 className="text-xs font-mono font-medium text-gray-500 dark:text-gray-300">INNOVATION_STACK</h4>
                    </div>

                  <div className="flex-1 border-b border-gray-200 dark:border-gray-600 mb-2"></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-mono font-medium text-gray-800 dark:text-white flex items-center flex-wrap gap-1">
                          {note.title}
                          <span className={`w-1 h-1 rounded-full ${getStatusColor(note.status)}`}></span>
                          <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 capitalize">
                            {note.status.replace('-', ' ')}
                          </span>
                          {note.date && (
                            <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">
                              {note.date}
                            </span>
                          )}
                        </h3>
                    </div>
                    <div className="flex items-center gap-1">
                      {note.urgent && (
                        <span className="px-1 py-0.5 text-[10px] font-mono rounded bg-red-500/20 text-red-600 dark:text-red-400">
                          URGENT
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleNoteExpand(index);
                        }}
                        className="text-gray-400 hover:text-purple-500 transition-colors hover:cursor-pointer"
                      >
                        {expandedNotes.includes(index) ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>
                  </div>

                  {expandedNotes.includes(index) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 overflow-hidden"
                    >
                          <div className="pt-1 space-y-2">
                            <div className="bg-gray-100/50 dark:bg-transparent border border-gray-300/50 dark:border-gray-500 rounded-lg">
                              <div className="p-3">

                            <div>
                              <h4 className="text-[10px] font-mono font-medium text-purple-600 dark:text-purple-500 mb-0.5">DESCRIPTION</h4>
                              <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">{note.content}</p>
                            </div>
                            
                            <div>
                              <h4 className="text-[10px] font-mono font-medium text-purple-600 dark:text-purple-500 mb-0.5">TECH_STACK</h4>
                              <div className="flex flex-wrap gap-1">
                                {note.techStack.map((tech, techIndex) => (
                                  <span 
                                    key={techIndex}
                                    className="px-1.5 py-0.5 bg-gray-400/30 dark:bg-gray-900/30 text-gray-700 dark:text-gray-200 text-[10px] font-mono rounded"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {note.tasks && note.tasks.length > 0 && (
                          <div>
                            <h4 className="text-[10px] font-mono text-gray-500 dark:text-gray-400 mb-0.5">SUB_TASKS</h4>
                            <div className="space-y-1.5">
                              {note.tasks.map((task, taskIndex) => (
                                <div key={taskIndex} className="flex items-center gap-1.5">
                                  <div className={`w-3 h-3 rounded-sm border flex items-center justify-center ${task.isChecked 
                                    ? 'bg-green-500 border-green-500' 
                                    : 'border-gray-300 dark:border-gray-500'}`}
                                  >
                                    {task.isChecked && <Check className="w-2 h-2 text-white" />}
                                  </div>
                                  <span className={`text-xs ${task.isChecked ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'}`}>
                                    {task.description}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        );
      
      case 'portfolio':
        return (
          <div className="space-y-4">
            <div className="flex flex-col gap-5">
              <div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <GalleryVerticalEnd className="text-blue-500 dark:text-blue-400" size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-mono font-medium text-gray-800 dark:text-white">3D_PORTFOLIO</h3>
                      <p className="text-[10px] font-mono text-blue-500 dark:text-blue-500">Status: <span className="text-blue-500">In Progress</span></p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                    An immersive 3D workspace portfolio built using Three.js and React Three Fiber, showcasing a virtual replica of my working environment modeled in Blender and SolidWorks.
                  </p>

                  <div className="grid grid-cols-1 gap-3 mb-4">
                    {/* TECH_STACK Section */}
                    <div className="relative">
                      <motion.div 
                        className="flex items-center justify-center gap-1 mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h4 className="font-mono text-[10px] font-medium text-blue-500 dark:text-blue-500">
                          TECH_STACK
                        </h4>
                      </motion.div>

                      <ul className="space-y-1.5">
                        {[
                          { icon: <Code size={12} />, name: 'Three.js + R3F' },
                          { icon: <Braces size={12} />, name: 'Next.js' },
                          { icon: <DraftingCompass size={12} />, name: 'Blender (GLTF)' },
                          { icon: <GitBranch size={12} />, name: 'Git' },
                          { icon: <Triangle size={12} />, name: 'Vercel' }
                        ].map((tech, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0 }}
                            whileHover={{ scale: 1.03 }}
                            className="flex items-center gap-2 p-1.5 bg-white/50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700 backdrop-blur-sm cursor-pointer"
                          >
                            <motion.div
                              animate={{ 
                                color: ['#3b82f6', '#60a5fa', '#3b82f6'],
                                transition: { 
                                  duration: 3,
                                  repeat: Infinity,
                                  delay: index * 0.3
                                }
                              }}
                            >
                              {tech.icon}
                            </motion.div>
                            <span className="text-xs font-medium dark:text-gray-200">{tech.name}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* FEATURES Section */}
                    <div className="relative">
                      <motion.div 
                        className="flex items-center justify-center gap-1 mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h4 className="font-mono text-[10px] font-medium text-blue-500">
                          FEATURES
                        </h4>
                      </motion.div>

                      <ul className="space-y-1.5">
                        {[
                          "Orbit/Pan/Zoom Camera Controls",
                          "Object Interaction",
                          "RGB Lighting",
                          "Responsive 3D performance"
                        ].map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0 }}
                            whileHover={{ scale: 1.03 }}
                            className="flex items-center gap-2 p-1.5 bg-white/50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700 backdrop-blur-sm cursor-pointer"
                          >
                            <motion.div
                              animate={{ 
                                color: ['#3b82f6', '#60a5fa', '#3b82f6'],
                                scale: [1, 1.1, 1],
                                transition: { 
                                  duration: 3,
                                  repeat: Infinity,
                                  delay: index * 0.3
                                }
                              }}
                              className="flex-shrink-0 leading-none flex items-center"
                            >
                              •
                            </motion.div>
                            <span className="text-xs font-medium dark:text-gray-200">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mb-1">
                    <h4 className="font-mono text-[10px] text-gray-500 dark:text-gray-400 mb-1">INTERACTIVE_ELEMENTS</h4>
                    <div className="grid grid-cols-2 gap-1.5">
                        <div className="p-1.5 bg-white/50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700 backdrop-blur-sm cursor-pointer">
                          <div className="text-blue-500 font-mono text-[10px] mb-0.5">COMPUTER</div>
                          <p className="text-[10px] text-gray-600 dark:text-gray-300">Click to start experience</p>
                        </div>
                        <div className="p-1.5 bg-white/50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700 backdrop-blur-sm cursor-pointer">
                          <div className="text-blue-500 font-mono text-[10px] mb-0.5">SKETCHBOOK</div>
                          <p className="text-[10px] text-gray-600 dark:text-gray-300">Click & hold to scribble</p>
                        </div>
                        <div className="p-1.5 bg-white/50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700 backdrop-blur-sm cursor-pointer">
                          <div className="text-blue-500 font-mono text-[10px] mb-0.5">PHONE</div>
                          <p className="text-[10px] text-gray-600 dark:text-gray-300">Click to show contact info</p>
                        </div>
                        <div className="p-1.5 bg-white/50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700 backdrop-blur-sm cursor-pointer">
                          <div className="text-blue-500 font-mono text-[10px] mb-0.5">HEADPHONES</div>
                          <p className="text-[10px] text-gray-600 dark:text-gray-300">Click to play music</p>
                        </div>
                    </div>
                  </div> 
                </div>
              </div>
              
              <div>
                <div className="bg-gray-200/20 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 mb-5">
                  <div className="p-1.5 bg-gray-700 flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="p-3">
                    <div className="font-mono text-[10px] text-gray-500 dark:text-gray-500 mb-3">// CONCEPT_MODEL</div>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <Image
                        src="/folder/concept.jpg"
                        alt="3D Workspace Preview"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-200/20 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
                  <div className="p-1.5 bg-gray-700 flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="p-3">
                    <div className="font-mono text-[10px] text-gray-500 dark:text-gray-500 mb-3">// LOCALHOST:3000</div>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <Image
                        src="/folder/real-model.jpg"
                        alt="3D Workspace Preview"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div> 
            </div>
            
            {/* Digital percentage display */}
            <div className="w-full backdrop-blur-sm bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="space-y-1.5 px-1">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-blue-500">BUILD_STATUS</span>
                  <div className="relative">
                    <motion.div
                      className="font-mono text-xs text-blue-500"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      60%
                    </motion.div>
                  </div>
                </div>

                {/* Hexagon pattern progress bar */}
                <div className="relative h-3 w-full overflow-hidden">
                  {/* Background hex pattern */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBhdGggZD0iTTAgMEw1IDBMNSAyTDEwIDJMMTUgMEwxNSAyTDEwIDRMNSA0TDAgMloiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20" />
                  
                  {/* Progress fill with animated "scan line" */}
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: '60%' }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  >
                    <motion.div
                      className="absolute top-0 left-0 w-full h-0.5 bg-white/50"
                      initial={{ y: 0 }}
                      animate={{ y: "150%" }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  </motion.div>
                </div>

                {/* Progress Indicators */}
                <div className="flex justify-between px-0.5 mb-3">
                  {[0, 25, 50, 75, 100].map((point) => (
                    <div key={point} className="relative">
                      <div className={`w-0.5 h-1.5 ${60 >= point ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                      <span className="absolute left-1/2 transform -translate-x-1/2 mt-0.5 text-[8px] font-mono text-gray-400">
                        {point}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'web':
        return (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-[#b3938f]/20 dark:bg-[#b3938f]/10 rounded-lg">
                  <FontAwesomeIcon icon={faShopify} className="text-[#b3938f]" style={{ fontSize: 20 }} />
                </div>
                <div>
                  <h2 className="text-base font-medium font-mono text-gray-800 dark:text-white">SHOPIFY_STORE</h2>
                  <p className="text-[10px] font-mono text-[#b3938f]">Status: <span className="text-green-500">Live</span></p>
                </div>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                A fully responsive Shopify storefront with a strong focus on perfomance, mobile usability and conversion optimization.
                Integrated key Shopify apps to enhance functionality and crafted a custom UI to elevate the shopping experience and drive engagement.
              </p>

              <div className="mb-4 p-3 bg-[#b3938f]/10 dark:bg-[#b3938f]/5 rounded-lg border border-[#b3938f]/20 min-h-[320px]">
  <h4 className="font-mono font-medium text-[10px] text-[#b3938f] mb-2">PERFORMANCE_METRICS</h4>
  <div className="grid grid-cols-1 gap-2">
    <div className="bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="relative h-25 rounded-lg overflow-hidden mb-0.5">
        <Image
          src="/folder/gtmetrix.png"
          alt="GTmetrix"
          fill
          className="object-cover"
        />
      </div>
      <p className="text-[10px] font-mono text-center text-gray-600 dark:text-gray-300">GTmetrix_Grade</p>
    </div>
    <div className="bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="relative h-25 rounded-lg overflow-hidden mb-0.5">
        <Image
          src="/folder/pagespeed.png"
          alt="PageSpeed"
          fill
          className="object-cover"
        />
      </div>
      <p className="text-[10px] font-mono text-center text-gray-600 dark:text-gray-300">PageSpeed_Insights</p>
    </div>
  </div>
</div>

              <div className="flex justify-center">
                <div className="grid grid-cols-1 gap-3 w-full mb-4">
                  {/* TECH STACK SECTION */}
                  <div className="relative p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    <h4 className="font-mono font-medium text-xs text-[#c4a39f] dark:text-[#c4a39f] mb-4 text-center">TECH_STACK</h4>

                    {/* Interactive tech stack bubbles */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {[
                        { icon: <FontAwesomeIcon icon={faShopify} size="xs" />, name: 'Shopify' },
                        { icon: <Code size={14} />, name: 'Shopify Apps' },
                        { icon: <CodeXml size={14} />, name: 'CSS/SCSS' },
                        { icon: <Droplet size={14} />, name: 'Liquid' },
                        { icon: <Blend size={14} />, name: 'Photoshop' }
                      ].map((tech, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex flex-col items-center justify-center p-2 w-16 h-16 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer relative overflow-hidden"
                        >
                          <motion.div
                            animate={{ 
                              color: ['#b3938f', '#c4a39f', '#b3938f'],
                              transition: { 
                                duration: 3,
                                repeat: Infinity,
                                delay: index * 0.3
                              }
                            }}
                            className="mb-1"
                          >
                            {tech.icon}
                          </motion.div>
                          <span className="text-[8px] font-regular dark:text-gray-200 text-center">{tech.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* KEY FEATURES */}
                  <div className="relative p-4 rounded-lg bg-transparent backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    <h4 className="font-mono font-medium text-xs text-[#c4a39f] dark:text-[#c4a39f] mb-3 text-center">
                      KEY_FEATURES
                    </h4>

                    {/* Feature List */}
                    <ul className="space-y-1.5 relative">
                      {[
                        "Mobile-First Responsive Design",
                        "Product Quick View",
                        "Cross Sell & Upsell",
                        "Seamless Checkout Flow",
                        "Email Marketing Integration"
                      ].map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.0 }}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-1 p-1.5 bg-white/50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700 backdrop-blur-sm cursor-pointer group"
                        >
                          <motion.div
                            animate={{ 
                              color: ['#b3938f', '#c4a39f', '#b3938f'],
                              scale: [1, 1.1, 1],
                              transition: { 
                                duration: 3,
                                repeat: Infinity,
                                delay: index * 0.3
                              }
                            }}
                            className="flex-shrink-0"
                          >
                            •
                          </motion.div>
                          <span className="text-xs font-medium  text-gray-600 dark:text-gray-200">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
                <div className="relative w-full h-10 overflow-hidden"> 
                    <Image
                    src="/folder/trendsetterbabe.png"
                    alt="Trendsetter Babe Shopify Store"
                    fill
                    className="object-cover"
                    />
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-1.5 text-center">
                    <a 
                    href="https://www.trendsetterbabe.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-[#b3938f] hover:text-[#b38b87] transition-colors"
                    >
                    www.trendsetterbabe.com
                    </a>
                </div>
                </div>
          </div>
        );
      
      case 'mobile':
        return (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              {/* Header Section */}
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-[#d2e6f3] dark:bg-[#117bae]/20 rounded-lg">
                  <Siren className="text-[#117bae]" size={20} />
                </div>
                <div>
                  <h2 className="text-base font-mono font-medium text-gray-800 dark:text-white">Emergency Response App</h2>
                  <p className="text-[10px] font-mono text-[#117bae]">Status: <span className="text-blue-500">In Progress</span></p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                A mobile-first emergency alert system designed for healthcare environments. Built for rapid communication, role-based alerts, in-app voice note support, and offline fallback via SMS and email.
              </p>

              {/* Single Column Layout for Mobile */}
              <div className="flex flex-col gap-4 mb-4">
                {/* Core Features */}
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h4 className="font-mono font-medium text-[10px] text-left text-[#117bae] mb-1">CORE_FEATURES</h4>
                  <ul className="space-y-1 text-xs font-light text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-1">
                      <span className="">•</span>
                      <span>Push-based emergency notifications with role targeting</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="">•</span>
                      <span>Smart analytics dashboard with insights</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="">•</span>
                      <span>Alert progress tracking with real-time updates</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="">•</span>
                      <span>Device number assignment to role/user</span>
                    </li>
                  </ul>
                </div>

                {/* Creative Timeline Visualization */}
                <div className="p-3 bg-[#f8fafc] dark:bg-gray-800 border border-[#e2e8f0] dark:border-gray-700 rounded-lg">
                  <h4 className="font-mono font-medium text-[10px] text-[#117bae] mb-2">ALERT_FLOW</h4>
                  <div className="relative">

                    {/* Vertical Line */}
                    <div className="absolute left-3 h-full w-px bg-gradient-to-b from-[#117bae]/30 via-[#117bae]/50 to-[#117bae]/30 dark:from-[#117bae]/20 dark:via-[#117bae]/40 dark:to-[#117bae]/20"></div>
                    
                    {/* Timeline steps with animation */}
                    <div className="space-y-4 pl-6">
  <div className="relative group">
    <div className="absolute -left-5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#117bae] text-white shadow-md group-hover:scale-110 transition-transform duration-200">
      <span className="text-[10px] font-bold">1</span>
    </div>
    <div className="ml-3">
      <div className="text-xs font-mono font-medium text-gray-800 dark:text-white group-hover:text-[#117bae] transition-colors">Alert Triggered</div>
      <p className="text-[10px] text-gray-500 dark:text-gray-400">User presses emergency button</p>
    </div>
  </div>
  
  <div className="relative group">
    <div className="absolute -left-5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#117bae] text-white shadow-md group-hover:scale-110 transition-transform duration-200">
      <span className="text-[10px] font-bold">2</span>
    </div>
    <div className="ml-3">
      <div className="text-xs font-mono font-medium text-gray-800 dark:text-white group-hover:text-[#117bae] transition-colors">Role Targeting</div>
      <p className="text-[10px] text-gray-500 dark:text-gray-400">System identifies appropriate responders</p>
    </div>
  </div>
  
  <div className="relative group">
    <div className="absolute -left-5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#117bae] text-white shadow-md group-hover:scale-110 transition-transform duration-200">
      <span className="text-[10px] font-bold">3</span>
    </div>
    <div className="ml-3">
      <div className="text-xs font-mono font-medium text-gray-800 dark:text-white group-hover:text-[#117bae] transition-colors">Push Notification</div>
      <p className="text-[10px] text-gray-500 dark:text-gray-400">Instant delivery to all assigned devices</p>
    </div>
  </div>
  
  <div className="relative group">
    <div className="absolute -left-5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#117bae] text-white shadow-md group-hover:scale-110 transition-transform duration-200">
      <span className="text-[10px] font-bold">4</span>
    </div>
    <div className="ml-3">
      <div className="text-xs font-mono font-medium text-gray-800 dark:text-white group-hover:text-[#117bae] transition-colors">Response Tracking</div>
      <p className="text-[10px] text-gray-500 dark:text-gray-400">System monitors acknowledgments in real-time</p>
    </div>
  </div>
</div>
                  </div>
                </div>

                {/* Tech Stack with Horizontal Icons */}
                <div className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <h4 className="font-mono text-[10px] text-center text-gray-500 dark:text-gray-400 mb-2">TECH_STACK</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                      {[
                      { icon: <Code size={16} className="text-[#117bae]" />, label: "React Native" },
                      { icon: <Smartphone size={16} className="text-[#117bae]" />, label: "Expo" },
                      { icon: <Database size={16} className="text-[#117bae]" />, label: "PostgreSQL" },
                      { icon: <Zap size={16} className="text-[#117bae]" />, label: "Firebase" },
                      { icon: <Shield size={16} className="text-[#117bae]" />, label: "Auth0" },
                      ].map((item, index) => (
                      <div key={index} className="flex flex-col items-center gap-1 min-w-[60px]">
                          <div className="p-1.5 bg-[#d2e6f3] dark:bg-[#117bae]/10 rounded-full">
                          {item.icon}
                          </div>
                          <span className="text-[10px] text-center">{item.label}</span>
                      </div>
                      ))}
                  </div>
                </div>

                {/* Phone Mockup */}
                <div className="flex justify-center">
                  <div className="relative mx-auto border-gray-800 dark:border-gray-600 bg-gray-800 border-[10px] rounded-[2rem] h-[500px] w-[250px] shadow-xl">
                    {/* Phone side buttons */}
                    <div className="h-[26px] w-[2px] bg-gray-800 dark:bg-gray-600 absolute -left-[2px] top-[60px] rounded-l-lg"></div>
                    <div className="h-[40px] w-[2px] bg-gray-800 dark:bg-gray-600 absolute -left-[2px] top-[110px] rounded-l-lg"></div>
                    <div className="h-[40px] w-[2px] bg-gray-800 dark:bg-gray-600 absolute -left-[2px] top-[160px] rounded-l-lg"></div>
                    <div className="h-[50px] w-[2px] bg-gray-800 dark:bg-gray-600 absolute -right-[2px] top-[120px] rounded-r-lg"></div>
                    
                    {/* Phone screen content */}
                    <div className="rounded-[1.5rem] overflow-hidden w-[230px] h-[480px] bg-white dark:bg-gray-800">
                      <div className="relative w-full h-full">
                        <Image
                          src="/folder/sos.png"
                          alt="Emergency Response App showing active alert screen"
                          fill
                          className="object-cover"
                        />
                      </div>
                      {/* Notch area */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-5 bg-gray-800 dark:bg-gray-900 rounded-b-xl"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="p-2 bg-[#f1f8fe] dark:bg-[#0d3a5a] rounded-lg border border-[#d2e6f3] dark:border-[#117bae]/30">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div>
                    <div className="text-xl font-bold text-[#117bae] dark:text-[#5ab0e8]">99.9%</div>
                    <div className="text-[10px] text-gray-600 dark:text-gray-300">Uptime</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#117bae] dark:text-[#5ab0e8]">≤2s</div>
                    <div className="text-[10px] text-gray-600 dark:text-gray-300">Alert Delivery</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#117bae] dark:text-[#5ab0e8]">24/7</div>
                    <div className="text-[10px] text-gray-600 dark:text-gray-300">Monitoring</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#117bae] dark:text-[#5ab0e8]">256-bit</div>
                    <div className="text-[10px] text-gray-600 dark:text-gray-300">Encryption</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 p-4 overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mt-2 mb-4">
            {`import { Projects } from ‘scratch’`}
          </h1>
          <p className="text-gray-400 font-mono text-xs sm:text-sm mb-4">
            {`// version 29.03.1996`}
          </p>

          {/* Animated system status */}
          <div className="mt-2 flex items-center gap-1 text-[10px] justify-center">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-green-600 dark:text-green-400 font-mono">SYSTEM_ONLINE • KERNEL INITIALIZED</span>
          </div>
        </motion.div>

        {/* Tabs - Scrollable for mobile */}
        <div className="relative w-full">
            <div className="flex w-full overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex w-full border-b border-gray-200 dark:border-gray-700 mb-4">
                <button
                    onClick={() => setActiveTab('notes')}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium flex items-center justify-center gap-1 ${activeTab === 'notes' ? 'text-purple-600 dark:text-purple-500 border-b-2 border-purple-500' : 'text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-500'}`}
                >
                    <CodeXml size={14} />
                    Console
                </button>
                <button
                    onClick={() => setActiveTab('portfolio')}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium flex items-center justify-center gap-1 ${activeTab === 'portfolio' ? 'text-blue-600 dark:text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500'}`}
                >
                    <Globe size={14} />
                    Portfolio
                </button>
                <button
                    onClick={() => setActiveTab('web')}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium flex items-center justify-center gap-1 ${activeTab === 'web' ? 'text-[#b3938f] dark:text-[#b3938f] border-b-2 border-[#b3938f]' : 'text-gray-500 dark:text-gray-400 hover:text-[#b3938f] dark:hover:[#b3938f]'}`}
                >
                    <ShoppingCart size={14} />
                    Shopify
                </button>
                <button
                    onClick={() => setActiveTab('mobile')}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium flex items-center justify-center gap-1 ${activeTab === 'mobile' ? 'text-[#117bae] dark:text-[#117bae] border-b-2 border-[#117bae]' : 'text-gray-500 dark:text-gray-400 hover:text-[#117bae] dark:hover:[#117bae]'}`}
                >
                    <Smartphone size={14} />
                    App
                </button>
                </div>
            </div>
            </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
}