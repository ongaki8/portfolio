// src/app/components/shared/DesktopProjectsFolder.tsx
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
  Box
} from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWordpress, faShopify, faWordpressSimple } from '@fortawesome/free-brands-svg-icons'

interface ProjectNote {
  id: string;
  title: string;
  content: string;
  status: 'idea-phase' | 'in-progress' | 'completed';
  techStack: string[];
  tasks?: {  // Add this line
    isChecked: boolean;
    description: string;
  }[];
}


export default function ProjectsFolder() {
  const [activeTab, setActiveTab] = useState<'notes' | 'portfolio' | 'web' | 'mobile' >('notes');
  const [expandedNotes, setExpandedNotes] = useState<number[]>([]);

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
      case 'planned': return 'bg-gray-500';
      case 'in-progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  

  const renderTabContent = () => {
    switch(activeTab) {
      case 'notes':
        return (
          <div className="space-y-6">
            {/* Header with animated terminal cursor */}
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-mono font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <SquareTerminal className="text-purple-500" size={18} />
                PROJECT_CONSOLE
                <motion.span 
                  className="w-2 h-5 bg-purple-500 inline-block"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </h2>
              <div className="flex-1 border-gray-300 dark:border-gray-600"></div>
            </div>

            {/* Updates Log Section */}
            <div className="bg-gray-200/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="text-blue-500" size={16} />
                <h3 className="font-mono font-medium text-sm text-gray-700 dark:text-gray-300">UPDATES_LOG</h3>
                <div className="flex-1 border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="flex-1 border-b border-gray-300 dark:border-gray-600 mb-2"></div>
              
              <div className="space-y-3">
                {updatesLog.map((update, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded transition-colors"
                  >
                    <div className={`mt-1 flex-shrink-0 w-2 h-2 rounded-full ${getUpdateColor(update.type)}`}></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{update.date}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                          v{update.version}
                        </span>
                      </div>
                      <p className="text-sm mt-1 dark:text-gray-200">{update.message}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* TODO Checklist Section */}
            <div className="bg-gray-200/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-3">
                <LayoutList className="text-green-500" size={16} />
                <h3 className="font-mono font-medium text-sm text-gray-700 dark:text-gray-300">TASKS_QUEUE</h3>
              </div>
              <div className="flex-1 border-b border-gray-300 dark:border-gray-600 mb-2"></div>
              
              <div className="space-y-2">
                {tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded transition-colors"
                  >
                    <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-sm border ${task.isChecked 
                      ? 'bg-green-500 border-green-500 flex items-center justify-center' 
                      : 'border-gray-400 dark:border-gray-500'}`}
                    >
                      {task.isChecked && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${task.isChecked ? 'line-through text-gray-400 dark:text-gray-500' : 'dark:text-gray-200'}`}>
                        {task.description}
                      </p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs font-mono text-gray-500 dark:text-gray-400 flex items-center">
                            {task.category}
                          </span>
                        <span className={`text-xs font-mono p-1 rounded ${getPriorityColor(task.priority)} text-white`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Project Notes Section */}
            <div className="space-y-4">
              {projectNotes.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer group"
                  onClick={() => toggleNoteExpand(index)}
                >
                  <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="text-purple-500" size={16} />
                      <h4 className="text-sm font-mono font-medium text-gray-500 dark:text-gray-300">INNOVATION_STACK</h4>
                    </div>

                  <div className="flex-1 border-b border-gray-300 dark:border-gray-600 mb-3"></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-mono font-medium text-gray-800 dark:text-white flex items-center">
                          {note.title}
                          <span className={`w-1 h-1 ml-2 rounded-full ${getStatusColor(note.status)}`}></span>
                          <span className="text-xs font-mono text-gray-500 dark:text-gray-400 capitalize ml-1">{note.status.replace('-', ' ')}</span>
                          {/* <span className="text-xs font-mono text-gray-500 dark:text-gray-400 ml-2">{note.date}</span> */}
                        </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* {note.urgent && (
                        <span className="px-1.5 py-0.5 text-xs font-mono rounded bg-red-500/20 text-red-600 dark:text-red-400">
                          URGENT
                        </span>
                      )} */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleNoteExpand(index);
                        }}
                        className="text-gray-400 hover:text-purple-500 transition-colors hover:cursor-pointer"
                      >
                        {expandedNotes.includes(index) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {expandedNotes.includes(index) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 overflow-hidden"
                    >
                          <div className="pt-1 space-y-3">
                            <div className="bg-gray-100/50 dark:bg-transparent border border-gray-300/50 dark:border-gray-500 rounded-lg">
                              <div className="p-4">

                            <div>
                              <h4 className="text-xs font-mono font-medium text-purple-600 dark:text-purple-500 mb-1">DESCRIPTION</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{note.content}</p>
                            </div>
                            
                            <div>
                              <h4 className="text-xs font-mono font-medium text-purple-600 dark:text-purple-500 mb-1">TECH_STACK</h4>
                              <div className="flex flex-wrap gap-2">
                                {note.techStack.map((tech, techIndex) => (
                                  <span 
                                    key={techIndex}
                                    className="px-2 py-1 bg-gray-400/30 dark:bg-gray-900/30 text-gray-700 dark:text-gray-200 text-xs font-mono rounded"
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
                            <h4 className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-1">SUB_TASKS</h4>
                            <div className="space-y-2">
                              {note.tasks.map((task, taskIndex) => (
                                <div key={taskIndex} className="flex items-center gap-2">
                                  <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${task.isChecked 
                                    ? 'bg-green-500 border-green-500' 
                                    : 'border-gray-300 dark:border-gray-500'}`}
                                  >
                                    {task.isChecked && <Check className="w-3 h-3 text-white" />}
                                  </div>
                                  <span className={`text-sm ${task.isChecked ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'}`}>
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
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-7">
              <div className="flex-1">
                <h2 className="text-xl font-mono font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                  <Box className="text-blue-500" size={18} />
                  3D_PORTFOLIO
                </h2>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <GalleryVerticalEnd className="text-blue-500 dark:text-blue-400" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-mono font-light text-gray-800 dark:text-white">IMMERSIVE_UI</h3>
                      <p className="text-xs font-mono text-blue-500 dark:text-blue-500">Status: <span className="text-blue-500">In Progress</span></p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        An immersive 3D workspace portfolio built using Three.js and React Three Fiber, showcasing a virtual replica of my working environment modeled in Blender and SolidWorks.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-6">

                          {/* TECH_STACK Section */}
                        <div className="relative">
                          {/* Animated header */}
                          <motion.div 
                            className="flex items-center justify-center gap-2 mb-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <h4 className="font-mono text-xs font-medium text-blue-500 dark:text-blue-500">
                              <TypeAnimation
                                sequence={['T', 500, 'TECH_STACK', 1500]}
                                wrapper="span"
                                cursor={true}
                                repeat={0}
                              />
                            </h4>
                          </motion.div>

                          {/* Interactive tech list */}
                          <ul className="space-y-2">
                            {[
                              { icon: <Code size={14} />, name: 'Three.js + R3F' },
                              { icon: <Braces size={14} />, name: 'Next.js' },
                              { icon: <DraftingCompass size={14} />, name: 'Blender (GLTF)' },
                              { icon: <GitBranch size={14} />, name: 'Git' },
                              { icon: <Triangle size={14} />, name: 'Vercel' }
                            ].map((tech, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0 }}
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-3 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm cursor-pointer group"
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
                          {/* Animated header */}
                          <motion.div 
                            className="flex items-center justify-center gap-2 mb-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <h4 className="font-mono text-xs font-medium text-blue-500">
                              <TypeAnimation
                                sequence={['F', 500, 'FEATURES', 1500]}
                                wrapper="span"
                                cursor={true}
                                repeat={0}
                              />
                            </h4>
                          </motion.div>

                          {/* Interactive features list */}
                          <ul className="space-y-3">
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
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-3 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm cursor-pointer group"
                              >
                                <motion.div
                                  animate={{ 
                                    color: ['#3b82f6', '#60a5fa', '#3b82f6'],
                                    scale: [1, 1.2, 1],
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

                        <div className="mb-2">
                        <h4 className="font-mono text-xs text-gray-500 dark:text-gray-400 mb-2">INTERACTIVE_ELEMENTS</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm cursor-pointer">
                            <div className="text-blue-500 font-mono text-xs mb-1">COMPUTER</div>
                            <p className="text-xs text-gray-600 dark:text-gray-300">Click to start experience</p>
                            </div>
                            <div className="p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm cursor-pointer">
                            <div className="text-blue-500 font-mono text-xs mb-1">SKETCHBOOK</div>
                            <p className="text-xs text-gray-600 dark:text-gray-300">Click & hold to scribble</p>
                            </div>
                            <div className="p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm cursor-pointer">
                            <div className="text-blue-500 font-mono text-xs mb-1">PHONE</div>
                            <p className="text-xs text-gray-600 dark:text-gray-300">Click to show contact info</p>
                            </div>
                            <div className="p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm cursor-pointer">
                            <div className="text-blue-500 font-mono text-xs mb-1">HEADPHONES</div>
                            <p className="text-xs text-gray-600 dark:text-gray-300">Click to play music</p>
                            </div>
                        </div>
                        </div> 
                </div>


              </div>
              
              <div className="flex-1">
                <div className="bg-gray-100/70 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 mb-7">
                  <div className="p-2 bg-gray-700 flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="p-4">
                    <div className="font-mono text-xs text-gray-500 dark:text-gray-500 mb-4">// CONCEPT_MODEL</div>

                        <div className="h-54">
                            <div className="relative h-[100%] rounded-lg overflow-hidden">
                                <Image
                                src="/folder/concept.jpg"
                                alt="3D Workspace Preview"
                                fill
                                className="object-cover rounded-lg"
                                />
                            </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-100/70 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
                  <div className="p-2 bg-gray-700 flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="p-4">
                    <div className="font-mono text-xs text-gray-500 dark:text-gray-500 mb-2">// LOCALHOST:3000</div>

                        <div className="h-54">
                            <div className="relative h-[100%] rounded-lg overflow-hidden">
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
            </div>
            {/* Digital percentage display */}
              <div className="w-full backdrop-blur-sm bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="space-y-2 px-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm text-blue-500">BUILD_STATUS</span>
                    <div className="relative">
                      <motion.div
                        className="font-mono text-sm text-blue-500"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        60%
                      </motion.div>
                      <motion.div 
                        className="absolute -bottom-1 left-0 w-full h-5/100 bg-blue-500"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                      />
                    </div>
                  </div>

                  {/* Hexagon pattern progress bar */}
                  <div className="relative h-4 w-full overflow-hidden">
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
                        className="absolute top-0 left-0 w-full h-1 bg-white/50"
                        initial={{ y: 0 }}
                        animate={{ y: "150%" }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                    </motion.div>
                    
                    {/* Progress Bar */}
                    <motion.div
                      className="absolute top-0 left-[60%] h-full w-0.5 bg-white cursor-col-resize"
                      whileHover={{ width: 2 }}
                      // drag="x"
                      // dragConstraints={{ left: 0, right: "100%" }}
                      // dragElastic={0}
                      // dragMomentum={false}
                    >
                      <div className="absolute -top-1 -left-1.5 w-3 h-6 bg-white rounded-sm" />
                    </motion.div>
                  </div>

                  {/* Progress Indicators */}
                  <div className="flex justify-between px-1 mb-5">
                    {[0, 25, 50, 75, 100].map((point) => (
                      <div key={point} className="relative">
                        <div className={`w-0.5 h-2 ${60 >= point ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                        <span className="absolute left-1/2 transform -translate-x-1/2 mt-1 text-[10px] font-mono text-gray-400">
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
    <div className="space-y-6">
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-[#b3938f]/20 dark:bg-[#b3938f]/10 rounded-lg">
      <FontAwesomeIcon icon={faShopify} className="text-[#b3938f]" style={{ fontSize: 24 }} />
      </div>
      <div>
        <h2 className="text-lg font-medium font-mono text-gray-800 dark:text-white">SHOPIFY_STORE</h2>
        <p className="text-xs font-mono text-[#b3938f]">Status: <span className="text-green-500">Live</span></p>
      </div>
    </div>

    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
A fully responsive Shopify storefront with a strong focus on perfomance, mobile usability and conversion optimization.
Integrated key Shopify apps to enhance functionality and crafted a custom UI to elevate the shopping experience and drive engagement.
    </p>

    <div className="mb-6 p-4 bg-[#b3938f]/10 dark:bg-[#b3938f]/5 rounded-lg border border-[#b3938f]/20">
      <h4 className="font-mono font-medium text-xs text-[#b3938f] mb-3">PERFORMANCE_METRICS</h4>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
          <img 
            src="/folder/gtmetrix.png" 
            alt="GTmetrix" 
            className="w-full h-24 object-cover mb-1 rounded-lg"
          />
          <p className="text-xs font-mono text-center text-gray-600 dark:text-gray-300">GTmetrix_Grade</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
          <img 
            src="/folder/pagespeed.png" 
            alt="PageSpeed" 
            className="w-full h-24 object-cover mb-1 rounded-lg"
          />
          <p className="text-xs font-mono text-center text-gray-600 dark:text-gray-300">PageSpeed_Insights</p>
        </div>
      </div>
    </div>

    <div className="flex justify-center">
    <div className="grid grid-cols-2 gap-4 w-fit mb-6">

       {/* TECH STACK SECTION */}
      <div className="relative max-w-md mx-auto p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        {/* Floating bubbles background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#b3938f]/20 dark:bg-[#c4a39f]/20"
              initial={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${10 + Math.random() * 20}px`,
                height: `${10 + Math.random() * 20}px`,
                opacity: 0
              }}
              animate={{
                y: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100],
                x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100],
                opacity: [0, 0.4, 0],
                transition: {
                  duration: 15 + Math.random() * 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: Math.random() * 5
                }
              }}
            />
          ))}
        </div>

        {/* TECH_STACK */}
        <div className="relative z-10 text-center">
          <h4 className="font-mono font-medium text-l text-[#c4a39f] mb-6">TECH_STACK</h4>

          {/* Interactive tech stack bubbles */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: <Code size={16} />, name: 'Shopify' },
              { icon: <FontAwesomeIcon icon={faShopify} size="sm" />, name: 'Shopify Apps' },
              { icon: <CodeXml size={16} />, name: 'CSS/SCSS' },
              { icon: <Droplet size={16} />, name: 'Liquid' },
              { icon: <Blend size={16} />, name: 'Photoshop' }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center p-4 w-24 h-24 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer relative overflow-hidden"
              >
                {/* Bubble highlight */}
                <motion.div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'radial-gradient(circle, rgba(179,147,143,0.2) 0%, rgba(255,255,255,0) 70%)'
                  }}
                />
                
                <motion.div
                  animate={{ 
                    color: ['#b3938f', '#c4a39f', '#b3938f'],
                    transition: { 
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.3
                    }
                  }}
                  className="mb-2"
                >
                  {tech.icon}
                </motion.div>
                <span className="text-xs font-medium dark:text-gray-200">{tech.name}</span>
                
                {/* Bubble pulse effect on hover */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ 
                    scale: 1.5,
                    opacity: 0.3,
                    transition: { duration: 0.6 }
                  }}
                  className="absolute inset-0 rounded-full bg-[#b3938f] dark:bg-[#c4a39f]"
                />
              </motion.div>
            ))}
          </div>

          {/* Floating indicator */}
          <motion.div
            className="mt-6 text-xs text-gray-400 dark:text-gray-500 flex justify-center"
            animate={{
              y: [0, 5, 0],
              transition: { repeat: Infinity, duration: 2 }
            }}
          >
            <ChevronsDown size={16} className="mr-1" />
            <span>project link</span>
          </motion.div>
        </div>
      </div>

      {/* KEY FEATURES */}
      <div className="relative p-6 rounded-xl bg-transparent backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      
        {/* Animated Header */}
        <motion.div 
          className="flex items-center gap-2 mb-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="font-mono font-medium text-l text-[#c4a39f]">
            <TypeAnimation
              sequence={['KEY_FEATURES', 1000, 'KEY_FEATURES_', 500]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
            />
          </h4>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="w-3 h-3 rounded-full border border-dashed border-gray-400 dark:border-gray-500"
          />
        </motion.div>

        {/* Feature List */}
        <ul className="space-y-2 relative">
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm cursor-pointer group"
            >
              <motion.div
                animate={{ 
                  color: ['#b3938f', '#c4a39f', '#b3938f'],
                  scale: [1, 1.2, 1],
                  transition: { 
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3
                  }
                }}
                className="flex-shrink-0 pt-0.5"
              >
                •
              </motion.div>
              <span className="text-xs font-medium dark:text-gray-200">{feature}</span>
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#b3938f] to-transparent"
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="opacity-0 group-hover:opacity-100 ml-auto text-xs text-gray-400 dark:text-gray-500"
                animate={{
                  x: [0, 2, 0],
                  transition: { repeat: Infinity, duration: 1.5 }
                }}
              >
                →
              </motion.div>
            </motion.li>
          ))}
        </ul>

        {/* Floating Particles Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#b3938f]"
              initial={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0
              }}
              animate={{
                y: [0, (Math.random() - 0.5) * 20],
                x: [0, (Math.random() - 0.5) * 20],
                opacity: [0, 0.3, 0],
                transition: {
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }
              }}
            />
          ))}
        </div>
      </div>
      </div>

          </div>
          </div>

          <div className="mb-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
            <img 
              src="/folder/trendsetterbabe.png" 
              alt="Trendsetter Babe Shopify Store" 
              className="w-full h-auto"
            />
            <div className="bg-gray-700 dark:bg-gray-900 p-2 text-center">
              <a 
                href="https://www.trendsetterbabe.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-mono text-[#b3938f] hover:text-[#b38b87] transition-colors"
              >
                www.trendsetterbabe.com
              </a>
            </div>
          </div>

        </div>
  );
      
      case 'mobile':
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-[#d2e6f3] dark:bg-[#117bae]/20 rounded-lg">
            <Siren className="text-[#117bae]" size={24} />
          </div>
          <div>
            <h2 className="text-lg font-mono font-medium text-gray-800 dark:text-white">Emergency Response App</h2>
            <p className="text-xs font-mono text-[#117bae]">Status: <span className="text-blue-500">In Progress</span></p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-8">
          A mobile-first emergency alert system designed for healthcare environments. Built for rapid communication, role-based alerts, in-app voice note support, and offline fallback via SMS and email.
        </p>

        {/* Two Column Layout */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Left Column - Content */}
          <div className="md:w-1/2">
            {/* Core Features */}
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 mb-8">
              <h4 className="font-mono font-medium text-xs text-left text-[#117bae] mb-2">CORE_FEATURES</h4>
              <ul className="space-y-2 text-sm font-light text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="">•</span>
                  <span>Push-based emergency notifications with role targeting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="">•</span>
                  <span>Smart analytics dashboard with insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="">•</span>
                  <span>Alert progress tracking with real-time updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="">•</span>
                  <span>Device number assignment to role/user</span>
                </li>
              </ul>
            </div>

            {/* Creative Timeline Visualization */}
            <div className="mb-8 p-4 bg-[#f8fafc] dark:bg-gray-800 border border-[#e2e8f0] dark:border-gray-700 rounded-lg">
              <h4 className="font-mono font-medium text-xs text-[#117bae] mb-3">ALERT_FLOW</h4>
              <div className="relative">
                {/* Vertical timeline line */}
                <div className="absolute left-4 h-full w-px bg-gradient-to-b from-[#117bae]/30 via-[#117bae]/50 to-[#117bae]/30 dark:from-[#117bae]/20 dark:via-[#117bae]/40 dark:to-[#117bae]/20"></div>
                
                {/* Timeline steps with animation */}
                <div className="space-y-6 pl-8">
                  <div className="relative group">
                    <div className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#117bae] text-white shadow-md group-hover:scale-110 transition-transform duration-200">
                      <span className="text-xs font-bold">1</span>
                    </div>
                    <div className="text-sm font-mono font-medium text-gray-800 dark:text-white group-hover:text-[#117bae] transition-colors">Alert Triggered</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">User presses emergency button</p>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#117bae] text-white shadow-md group-hover:scale-110 transition-transform duration-200">
                      <span className="text-xs font-bold">2</span>
                    </div>
                    <div className="text-sm font-mono font-medium text-gray-800 dark:text-white group-hover:text-[#117bae] transition-colors">Role Targeting</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">System identifies appropriate responders</p>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#117bae] text-white shadow-md group-hover:scale-110 transition-transform duration-200">
                      <span className="text-xs font-bold">3</span>
                    </div>
                    <div className="text-sm font-mono font-medium text-gray-800 dark:text-white group-hover:text-[#117bae] transition-colors">Push Notification</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Instant delivery to all assigned devices</p>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#117bae] text-white shadow-md group-hover:scale-110 transition-transform duration-200">
                      <span className="text-xs font-bold">4</span>
                    </div>
                    <div className="text-sm font-mono font-medium text-gray-800 dark:text-white group-hover:text-[#117bae] transition-colors">Response Tracking</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">System monitors acknowledgments in real-time</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Tech Stack with Horizontal Icons */}
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <h4 className="font-mono text-xs text-center text-gray-500 dark:text-gray-400 mb-3">TECH_STACK</h4>
                <div className="flex flex-wrap justify-evenly gap-4 sm:gap-1">
                    {[
                    { icon: <Code size={18} className="text-[#117bae]" />, label: "React Native" },
                    { icon: <Smartphone size={18} className="text-[#117bae]" />, label: "Expo" },
                    { icon: <Database size={18} className="text-[#117bae]" />, label: "PostgreSQL" },
                    { icon: <Zap size={18} className="text-[#117bae]" />, label: "Firebase" },
                    { icon: <Shield size={18} className="text-[#117bae]" />, label: "Auth0" },
                    ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-1 min-w-[64px]">
                        <div className="p-2 bg-[#d2e6f3] dark:bg-[#117bae]/10 rounded-full">
                        {item.icon}
                        </div>
                        <span className="text-xs text-center">{item.label}</span>
                    </div>
                    ))}
                </div>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative mx-auto border-gray-800 dark:border-gray-600 bg-gray-800 border-[14px] rounded-[2.5rem] h-[620px] w-[300px] shadow-xl">
              {/* Phone side buttons */}
              <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-600 absolute -left-[3px] top-[72px] rounded-l-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-600 absolute -left-[3px] top-[124px] rounded-l-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-600 absolute -left-[3px] top-[178px] rounded-l-lg"></div>
              <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-600 absolute -right-[3px] top-[142px] rounded-r-lg"></div>
              
              {/* Phone screen content */}
              <div className="rounded-[1.7rem] overflow-hidden w-[272px] h-[591px] bg-white dark:bg-gray-800">
                <img 
                  src="/folder/sos.png" 
                  className="w-full h-full object-cover"
                  alt="Emergency Response App showing active alert screen"
                />
              </div>
              
              {/* Notch area */}
              {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 dark:bg-gray-900 rounded-b-xl"></div> */}

            </div>
          </div>
        </div>

        {/* Additional Creative Element - Stats Bar */}
        <div className="mt-6 p-3 bg-[#f1f8fe] dark:bg-[#0d3a5a] rounded-lg border border-[#d2e6f3] dark:border-[#117bae]/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#117bae] dark:text-[#5ab0e8]">99.9%</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#117bae] dark:text-[#5ab0e8]">≤2s</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Alert Delivery</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#117bae] dark:text-[#5ab0e8]">24/7</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Monitoring</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#117bae] dark:text-[#5ab0e8]">256-bit</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Encryption</div>
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
    <div className="h-full bg-gray-50 dark:bg-gray-900 p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
        <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
            {`import { Projects } from ‘scratch’`}
          </h1>
          <p className="text-gray-400 font-mono text-sm sm:text-base">
            {`// version 29.03.1996`}
          </p>

        {/* Animated system status */}
          <div className="mt-4 flex items-center gap-2 text-xs justify-center">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-green-600 dark:text-green-400 font-mono">SYSTEM_ONLINE • KERNEL INITIALIZED</span>
          </div>

        </motion.div>


        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab('notes')}
          className={`px-4 py-2 text-sm font-medium flex items-center gap-1 cursor-pointer ${activeTab === 'notes' ? 'text-purple-600 dark:text-purple-500 border-b-2 border-purple-500' : 'text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-500'}`}
        >
          <CodeXml size={16} />
          Console
        </button>
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`px-4 py-2 text-sm font-medium flex items-center gap-1 cursor-pointer ${activeTab === 'portfolio' ? 'text-blue-600 dark:text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500'}`}
        >
          <Globe size={16} />
          Portfolio
        </button>
        <button
          onClick={() => setActiveTab('web')}
          className={`px-4 py-2 text-sm font-medium flex items-center gap-1 cursor-pointer ${activeTab === 'web' ? 'text-[#b3938f] dark:text-[#b3938f] border-b-2 border-[#b3938f]' : 'text-gray-500 dark:text-gray-400 hover:text-[#b3938f] dark:hover:[#b3938f]'}`}
        >
          <ShoppingCart size={16} />
          Shopify
        </button>
        <button
          onClick={() => setActiveTab('mobile')}
          className={`px-4 py-2 text-sm font-medium flex items-center gap-1 cursor-pointer ${activeTab === 'mobile' ? 'text-[#117bae] dark:text-[#117bae] border-b-2 border-[#117bae]' : 'text-gray-500 dark:text-gray-400 hover:text-[#117bae] dark:hover:[#117bae]'}`}
        >
          <Smartphone size={16} />
          Mobile App
        </button>
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