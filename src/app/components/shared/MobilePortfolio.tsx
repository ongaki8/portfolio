// src/app/components/shared/MobilePortfolio.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects, allTags, portfolioText, icons } from './portfolioData';
import { ShieldAlert, ChevronLeft, ChevronRight, X, Eye, GitCommitHorizontal, BrainCircuit } from 'lucide-react';

export default function MobilePortfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.tags.includes(activeFilter)));
    }
    setCurrentIndex(0);
    setExpandedProjectId(null);
  }, [activeFilter]);

  const handleProjectClick = (id: number) => {
    const project = projects.find(p => p.id === id);
    if (project?.link) {
      window.open(project.link, '_blank');
    } else {
      setExpandedProjectId(expandedProjectId === id ? null : id);
    }
  };

  const nextProject = () => {
    setDirection(1);
    setCurrentIndex(prev => 
      prev === filteredProjects.length - 1 ? 0 : prev + 1
    );
    setExpandedProjectId(null);
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentIndex(prev => 
      prev === 0 ? filteredProjects.length - 1 : prev - 1
    );
    setExpandedProjectId(null);
  };

  const handleDragEnd = (event: any, info: any) => {
    event.stopPropagation();
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      prevProject();
    } else if (info.offset.x < -swipeThreshold) {
      nextProject();
    }
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 300 : -300,
        opacity: 0,
        scale: 0.9
      };
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 300 : -300,
        opacity: 0,
        scale: 0.9,
        zIndex: 0
      };
    }
  };

  const getAdjacentIndex = (offset: number) => {
    let index = currentIndex + offset;
    if (index < 0) return filteredProjects.length - 1;
    if (index >= filteredProjects.length) return 0;
    return index;
  };

  return (
  <section className="relative py-8 px-4 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-200 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 min-h-screen overflow-x-hidden">
    <div className="max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <div className="inline-block relative group">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-2 relative z-10">
            {portfolioText.title}
          </h2>
          <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
        </div>

        <p className="text-gray-500 dark:text-gray-400 font-mono text-xs">
          {portfolioText.subtitle}
        </p>
      </motion.div>

      <hr className="border-t border-gray-300 dark:border-gray-700 my-6" />

      {/* Filter chips */}
      <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex gap-2 w-max">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter('All')}
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              activeFilter === 'All' 
                ? 'bg-blue-600/90 text-white' 
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            All
          </motion.button>
          
          {allTags.map(tag => (
            <motion.button
              key={tag}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(tag)}
              className={`px-3 py-1 rounded-full text-xs font-regular ${
                activeFilter === tag 
                  ? 'bg-blue-600/90 text-white' 
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {tag}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Project carousel */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="relative mb-16"
      >
        {/* Previous Project Preview */}
        <motion.div 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[80%] h-[360px] bg-gray-200/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-300 dark:border-gray-600 z-0"
          style={{ x: '-80%' }}
          initial={{ opacity: 0.3, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative h-40 overflow-hidden rounded-t-lg">
            <img 
              src={filteredProjects[getAdjacentIndex(-1)].image} 
              alt={filteredProjects[getAdjacentIndex(-1)].title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
              {filteredProjects[getAdjacentIndex(-1)].title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {filteredProjects[getAdjacentIndex(-1)].description}
            </p>
          </div>
        </motion.div>

        {/* Next Project Preview */}
        <motion.div 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[80%] h-[360px] bg-gray-200/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-300 dark:border-gray-600 z-0"
          style={{ x: '80%' }}
          initial={{ opacity: 0.3, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative h-40 overflow-hidden rounded-t-lg">
            <img 
              src={filteredProjects[getAdjacentIndex(1)].image} 
              alt={filteredProjects[getAdjacentIndex(1)].title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
              {filteredProjects[getAdjacentIndex(1)].title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {filteredProjects[getAdjacentIndex(1)].description}
            </p>
          </div>
        </motion.div>

        {/* Center Project Display */}
        <div className="relative min-h-[400px]">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 w-full"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              onClick={() => handleProjectClick(filteredProjects[currentIndex].id)}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <div className="relative h-48 rounded-t-lg overflow-hidden">
                <img 
                  src={filteredProjects[currentIndex].image} 
                  alt={filteredProjects[currentIndex].title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-mono font-bold text-gray-800 dark:text-white mb-1">
                  {filteredProjects[currentIndex].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs mb-3">
                  {filteredProjects[currentIndex].description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {filteredProjects[currentIndex].tags.map(tag => (
                    <span 
                      key={tag}
                      className="text-[0.7rem] font-mono bg-gray-200 dark:bg-gray-900 text-blue-600 dark:text-blue-500 px-1.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Project section */}
                  {!filteredProjects[currentIndex].link && filteredProjects[currentIndex].hasWalkthrough && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="border border-blue-500/40 text-gray-800 dark:text-white p-2 rounded-lg text-center bg-blue-100/30 dark:bg-blue-600/30">
                        <span className="text-xs font-mono">{portfolioText.walkthrough.title}</span>
                      </div>
                    </div>
                  )}

                  {filteredProjects[currentIndex].link && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => {
                            const link = filteredProjects[currentIndex].link;
                            if (typeof link === 'string' && link) {
                              window.open(link, '_blank');
                            }
                          }}
                        className="border border-blue-500/40 text-white dark:text-white p-2 rounded-lg text-center bg-blue-600 dark:bg-blue-600/30 w-full text-xs font-mono hover:bg-blue-200/40 dark:hover:bg-blue-700/40 transition"
                      >
                        VIEW PROJECT
                      </button>
                    </div>
                  )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation controls */}
        <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-8">
          <button
            onClick={prevProject}
            className="p-2 rounded-full bg-gray-200/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700"
          >
            <ChevronLeft size={16} className="text-gray-700 dark:text-gray-300" />
          </button>
          
          <div className="flex items-center gap-1">
            {filteredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                  setExpandedProjectId(null);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-500' : 'bg-gray-400 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextProject}
            className="p-2 rounded-full bg-gray-200/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700"
          >
            <ChevronRight size={16} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </motion.div>

      <hr className="border-t border-gray-300 dark:border-gray-700 my-6" />

      {/* Glitch Terminal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-blue-500 dark:border-gray-700 mb-8"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-mono text-blue-600 dark:text-blue-500 flex items-center gap-2">
            <BrainCircuit size={16} />
            GLITCH_TERMINAL
          </h3>
          <button
            onClick={() => setActiveFilter('All')}
            className="text-xs font-mono px-2 py-1 bg-gray-100 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300"
          >
            [DEFAULT_STATE]
          </button>
        </div>

        <div className="bg-gray-100 dark:bg-gray-900/70 p-3 rounded-lg border border-blue-500 font-mono text-xs mb-3">
          <div className="text-blue-600 dark:text-blue-500 mb-2">$ tech_stack --analyze</div>
          <div className="text-gray-500 dark:text-gray-400">&gt; Scanning {allTags.length} technologies...</div>
        </div>

        <div 
          className="bg-gray-100 dark:bg-gray-900/70 p-3 rounded border-lg border-gray-300 dark:border-gray-700 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800/50 transition mb-3 min-h-20 flex flex-col justify-center"
          onClick={() => {
            const randomTag = allTags[Math.floor(Math.random() * allTags.length)];
            setActiveFilter(randomTag);
          }}
        >
          <div className="flex justify-between text-gray-500 dark:text-gray-400 text-xs mb-2">
            <span>TECH_PATTERN</span>
            <span className="text-blue-600 dark:text-blue-500">TAP_TO_DECODE</span>
          </div>
          
          {(() => {
            const randomTag = allTags[Math.floor(Math.random() * allTags.length)];
            const caseType = Math.random() > 0.5 ? 1 : 2;
            
            // Case 1: Tech stack letters from tags
            if (caseType === 1) {
              const maskedTech = randomTag.split('').map((char, i) => 
                i % 2 === 0 ? char : String.fromCharCode(97 + Math.floor(Math.random() * 26))
              ).join('');
              
              return (
                <div className="space-y-1">
                  <div className="text-purple-500 font-medium">
                    {maskedTech}
                    <span className="text-gray-500 dark:text-gray-400 text-xs block">// tech_stack</span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                    Projects using this: {projects.filter(p => p.tags.includes(randomTag)).length}
                  </div>
                </div>
              );
            }
            
            // Case 2: Code association with tech stack
            else {
              type CodeAssociations = {
                [key: string]: string;
              };

              const codeAssociations: CodeAssociations = {
                'React': 'npm create vite@latest',
                'Next.js': 'npx create-next-app@latest',
                'WordPress': 'wp core install',
                'Shopify': 'shopify theme init',
                'Node.js': 'npm init -y',
                'TypeScript': 'tsc --init',
                'GraphQL': 'npm install @apollo/server',
                'Tailwind': 'npm install -D tailwindcss',
                'Figma': 'figma:export --components',
                'JavaScript': 'node index.js'
              };
              
              const code = codeAssociations[randomTag] || `npm install ${randomTag.toLowerCase()}`;
              const maskedCode = code.split(' ').map(word => 
                Math.random() > 0.5 ? word : word.split('').map((c,i) => i % 3 === 0 ? c : '_').join('')
              ).join(' ');
              
              return (
                <div className="space-y-1">
                  <div className="text-green-400 font-medium">
                    $ {maskedCode}
                    <span className="text-gray-500 dark:text-gray-400 text-xs block">// terminal_command</span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                    Associated with: {randomTag}
                  </div>
                </div>
              );
            }
          })()}
        </div>
      </motion.div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <icons.Code size={32} className="mx-auto text-gray-600 dark:text-gray-400 mb-3" />
          <h3 className="text-lg text-gray-400 dark:text-gray-500 font-mono">{portfolioText.noProjects.title}</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1 mb-4 text-sm">{portfolioText.noProjects.message}</p>
          <button
            onClick={() => setActiveFilter('All')}
            className="px-4 py-1.5 bg-blue-600 rounded-md text-white text-xs font-mono"
          >
            {portfolioText.noProjects.button}
          </button>
        </div>
      )}
    </div>
  </section>
);
}