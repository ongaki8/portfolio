// src/app/components/shared/MobileExperience.tsx
'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { FiChevronDown, FiChevronUp, FiExternalLink } from 'react-icons/fi';
import { Wrench, FolderCode, GitCommitHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { experiences } from '../shared/experienceData';
import { projects, allTags, portfolioText, icons } from './portfolioData';

export default function MobileExperience() {
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Experience toggle
  const toggleExpand = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedExperience(expandedExperience === index ? null : index);
  };

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
  <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-900 p-4 overflow-x-hidden">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-4 mb-8"
      >
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-2">
          EXPERIENCE_CONSOLE
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-mono text-xs">
          {`// Professional journey & notable projects`}
        </p>
      </motion.div>

      <hr className="border-t border-gray-300 dark:border-gray-700 my-6" />

      {/* Experience Timeline */}
      <div className="mb-12">
        <h2 className="text-lg font-mono text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Wrench className="text-blue-500" size={18} />
          CAREER_TIMELINE
        </h2>
        
        <div className="relative">
          <div className="absolute left-[10px] top-0 h-full w-0.5 bg-blue-200 dark:bg-blue-900"></div>
          
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 pb-6 last:pb-0 group"
            >
              <div className="absolute left-[11px] top-1/3 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-blue-200 dark:border-blue-900 z-10 animate-pulse"></div>
              
              <div 
                className="bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer"
                onClick={() => setExpandedExperience(expandedExperience === index ? null : index)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-gray-800 dark:text-white">{exp.company}</h3>
                    <p className="font-mono text-blue-600 dark:text-blue-500 text-sm mb-1">{exp.role}</p>
                    <span className="text-xs font-mono text-gray-400 bg-gray-100 dark:bg-gray-900 px-2 py-0.5 rounded inline-block mb-2">
                      {exp.period}
                    </span>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">{exp.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {exp.tech.map((tech, i) => (
                        <span key={i} className="text-[0.7rem] font-mono bg-gray-200 dark:bg-gray-900 text-blue-600 dark:text-blue-500 px-2 py-0.5 rounded-2xl">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: expandedExperience === index ? 'auto' : 0,
                        opacity: expandedExperience === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="text-xs font-semibold text-blue-600 dark:text-blue-500 mb-1">KEY_RESPONSIBILITIES</h4>
                        <ul className="space-y-1">
                          {exp.responsibilities.map((item, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <GitCommitHorizontal 
                                className="text-blue-600 dark:text-blue-500 mt-1 flex-shrink-0" 
                                size={12} 
                              />
                              <span className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                  
                  <button 
                    onClick={(e) => toggleExpand(index, e)}
                    className="ml-2 p-0.5 text-gray-400 hover:text-blue-500 transition-colors"
                    aria-label={expandedExperience === index ? "Collapse details" : "Expand details"}
                  >
                    {expandedExperience === index ? (
                      <FiChevronUp size={16} />
                    ) : (
                      <FiChevronDown size={16} />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <hr className="border-t border-gray-300 dark:border-gray-700 my-6" />

      <h2 className="text-lg font-mono text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
        <FolderCode className="text-blue-500" size={20} />
        PROJECT_SHOWCASE
      </h2>

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
        <div className="relative min-h-[390px]">
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
              className="absolute inset-0 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm shadow-sm rounded-3xl border border-gray-200 dark:border-gray-700 w-full"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              onClick={() => handleProjectClick(filteredProjects[currentIndex].id)}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <div className="relative h-48 rounded-t-3xl overflow-hidden">
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
                      className="text-[0.7rem] font-mono bg-gray-200 dark:bg-gray-900 text-blue-600 dark:text-blue-500 px-2 py-0.5 rounded-2xl"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Walkthrough or View Project section */}
                  {!filteredProjects[currentIndex].link && filteredProjects[currentIndex].hasWalkthrough && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="border border-blue-500/40 text-gray-800 dark:text-white p-2 rounded-2xl text-center bg-blue-100/30 dark:bg-blue-600/30">
                        <span className="text-sm font-mono">{portfolioText.walkthrough.title}</span>
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
                        className="border border-blue-500/40 text-gray-800 dark:text-white p-2 rounded-2xl text-center bg-blue-100/30 dark:bg-blue-600/30 w-full text-sm font-mono"
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
    </div>
  </div>
);
}