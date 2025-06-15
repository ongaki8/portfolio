// src/app/components/shared/DesktopExperience.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp, FiExternalLink } from 'react-icons/fi';
import { Wrench, FolderCode, GitCommitHorizontal } from 'lucide-react';
import { experiences, projects } from '../shared/experienceData';

export default function DesktopExperience() {
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (projectsRef.current) {
        setScrollPosition(projectsRef.current.scrollLeft);
        setMaxScroll(projectsRef.current.scrollWidth - projectsRef.current.clientWidth);
      }
    };

    if (projectsRef.current) {
      projectsRef.current.addEventListener('scroll', handleScroll);
      setMaxScroll(projectsRef.current.scrollWidth - projectsRef.current.clientWidth);
    }

    return () => {
      if (projectsRef.current) {
        projectsRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollProjects = (direction: 'left' | 'right') => {
    if (projectsRef.current) {
      const scrollAmount = direction === 'right' ? 300 : -300;
      projectsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const toggleExpand = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedExperience(expandedExperience === index ? null : index);
  };

  const handleProjectClick = (index: number, e: React.MouseEvent) => {
    const project = projects[index];
    if (project.link) {
      window.open(project.link, '_blank');
    } else {
      e.stopPropagation();
      setExpandedProject(expandedProject === index ? null : index);
    }
  };

  const scrollPercentage = maxScroll > 0 ? Math.round((scrollPosition / maxScroll) * 100) : 0;

  return (
    <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 sm:p-8 overflow-auto">
  <div className="max-w-6xl mx-auto">
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-8"
    >
      <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
        EXPERIENCE_CONSOLE
      </h1>
      <p className="text-gray-500 dark:text-gray-400 font-mono text-sm sm:text-base">
        {`// Professional journey & notable projects`}
      </p>
    </motion.div>

    <hr className="border-t border-gray-300 dark:border-gray-700 my-8" />

    {/* Experience Timeline */}
    <div className="mb-16">
      <h2 className="text-xl font-mono font-medium text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
        <Wrench className="text-blue-600" size={20} />
        CAREER_TIMELINE
      </h2>
      
      <div className="relative">
        <div className="absolute left-5 top-0 h-full w-0.5 bg-blue-200 dark:bg-blue-900"></div>
        
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-10 pb-8 last:pb-0 group"
          >
            <div className="absolute left-5 top-1/3 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-blue-600 border-4 border-blue-200 dark:border-blue-900 z-10 animate-pulse"></div>
            
            <div 
              className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-3xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:shadow-blue-600/10 hover:border-blue-600 transition-all duration-300 cursor-pointer"
              onClick={() => setExpandedExperience(expandedExperience === index ? null : index)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white">{exp.company}</h3>
                  <p className="font-mono text-blue-600 mb-1">{exp.role}</p>
                  <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded inline-block mb-2">
                    {exp.period}
                  </span>
                  <p className="text-s text-gray-600 dark:text-gray-300 mb-3">{exp.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {exp.tech.map((tech, i) => (
                      <span key={i} className="text-xs font-mono bg-gray-100 dark:bg-gray-900 text-blue-600 px-2 py-1 rounded">
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
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-semibold text-blue-600 mb-2">KEY_RESPONSIBILITIES</h4>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <GitCommitHorizontal 
                              className="text-blue-600 mt-1.5 flex-shrink-0" 
                              size={14} 
                            />
                            <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
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
                  className="ml-4 p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  aria-label={expandedExperience === index ? "Collapse details" : "Expand details"}
                >
                  {expandedExperience === index ? (
                    <FiChevronUp size={20} />
                  ) : (
                    <FiChevronDown size={20} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    <hr className="border-t border-gray-300 dark:border-gray-700 my-8" />

    {/* Projects Carousel */}
    <div className="mb-8">
      <h2 className="text-xl font-mono font-medium text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
        <FolderCode className="text-blue-600" size={20} />
        PROJECT_SHOWCASE
      </h2>
      
      <div className="relative">
        <button 
          onClick={() => scrollProjects('left')}
          disabled={scrollPosition === 0}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700/90 p-2 rounded-full border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white ml-2 transition-opacity ${
            scrollPosition === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
          }`}
        >
          <FiChevronLeft size={24} />
        </button>
        
        <div 
          ref={projectsRef}
          className="flex overflow-x-auto scrollbar-hide space-x-4 py-4 px-2"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {projects.map((project, index) => {
            const [imageError, setImageError] = useState(false);
            
            return (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="flex-shrink-0 w-64 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden shadow-sm hover:border-blue-600 transition-all cursor-pointer relative"
                style={{ scrollSnapAlign: 'start' }}
                onClick={(e) => handleProjectClick(index, e)}
              >
                {project.link && (
                  <div className="absolute top-2 right-2 bg-white/80 dark:bg-gray-900/80 rounded-full p-1 z-10">
                    <FiExternalLink className="text-blue-600" size={14} />
                  </div>
                )}
                
                <div className="h-40 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                  {imageError ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-800 flex items-center justify-center">
                      <span className="text-xs text-gray-400 font-mono">PROJECT_IMAGE</span>
                    </div>
                  ) : (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-mono text-gray-900 dark:text-white font-medium mb-1">{project.title}</h3>
                  <p className="text-xs text-gray-700 dark:text-gray-300 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-xs font-mono bg-gray-100 dark:bg-gray-900/70 text-blue-600 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Walkthrough Section */}
                  {!project.link && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: expandedProject === index ? 'auto' : 0,
                        opacity: expandedProject === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-xs font-mono border border-blue-600/40 text-blue-700 dark:text-white p-2 rounded-lg text-center bg-blue-100/30 dark:bg-blue-600/30">
                          WALKTHROUGH AVAILABLE ON REQUEST
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <button 
          onClick={() => scrollProjects('right')}
          disabled={scrollPosition >= maxScroll}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700/90 p-2 rounded-full border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white mr-2 transition-opacity ${
            scrollPosition >= maxScroll ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
          }`}
        >
          <FiChevronRight size={24} />
        </button>

        {/* Scroll Indicator */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${scrollPercentage}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono w-12 text-right">
            {scrollPercentage}%
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}