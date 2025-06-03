// src/app/components/shared/DesktopPortfolio.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { projects, allTags, portfolioText, icons } from './portfolioData';
import { AlertCircle, ShieldAlert } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string | null;
  hasWalkthrough?: boolean;
}

interface ProjectCardProps {
  project: Project;
  expandedProjectId: number | null;
  setExpandedProjectId: (id: number | null) => void;
  hoveredTech: string | null;
  variants: {
    hidden: { y: number; opacity: number };
    visible: { y: number; opacity: number };
  };
  handleProjectClick: (id: number) => void;
  techGlowVariants: {
    initial: { scale: number; opacity: number };
    hover: { scale: number; opacity: number };
  };
}

interface EmptyStateProps {
  setActiveFilter: (filter: string) => void;
}

export default function DesktopPortfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project => project.tags.includes(activeFilter))
      );
    }
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const techGlowVariants = {
    initial: { scale: 1, opacity: 0.7 },
    hover: { 
      scale: 1.1,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      {/* Floating tech bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {allTags.map((tag, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: 0
            }}
            animate={controls}
            className={`absolute rounded-full filter blur-xl ${hoveredTech === tag ? 'opacity-100' : 'opacity-20'}`}
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              background: `radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(124, 58, 237, 0.1) 100%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transition: 'all 0.5s ease-out'
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with interactive elements */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-center mb-16"
        >
          <div className="inline-block relative group">
            <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-4 relative z-10">
              {portfolioText.title}
            </h2>
            <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-mono text-sm mb-6">
            {portfolioText.subtitle}
          </p>

          <hr className="border-t border-gray-300 dark:border-gray-700 my-6" />

          <div className="inline-flex">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 mt-1 text-sm text-orange-500 dark:text-orange-400 font-mono px-3 py-1.5 bg-gray-100/70 dark:bg-gray-800/50 rounded-lg border border-orange-400"
            >
              <ShieldAlert className="w-4 h-4 text-orange-500 dark:text-orange-400" />
              <span>{portfolioText.notification}</span>
            </motion.div>
          </div>
          
          {/* Interactive terminal */}
          <div 
            className="mt-8 mx-auto max-w-md bg-gray-100/70 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg p-4 text-left cursor-pointer hover:border-blue-500 transition-all"
            onClick={() => setShowFilters(!showFilters)}
          >
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
              <span className="font-mono text-sm">view_mode</span>
            </div>
            <div className="font-mono text-blue-600 dark:text-blue-500 text-sm flex items-center gap-2">
              <icons.AppWindowMac size={16} />
              {`Currently Viewing: ${showFilters ? 'GRID_WITH_MENU' : 'GRID_WITHOUT_MENU'}`}
            </div>
          </div>
        </motion.div>

        {/* Dynamic filter chips with hover effects */}
        {showFilters && (
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-8 top-4 z-20"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter('All')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                activeFilter === 'All' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {activeFilter === 'All' ? <icons.Expand size={14} /> : <icons.Shrink size={14} />}
              All Projects
            </motion.button>
            
            {allTags.map(tag => (
              <motion.button
                key={tag}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 10px rgba(59, 130, 246, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredTech(tag)}
                onHoverEnd={() => setHoveredTech(null)}
                onClick={() => setActiveFilter(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeFilter === tag 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Project grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}
        >
          {filteredProjects.map(project => (
            <ProjectCard 
              key={project.id}
              project={project}
              expandedProjectId={expandedProjectId}
              setExpandedProjectId={setExpandedProjectId}
              hoveredTech={hoveredTech}
              variants={itemVariants}
              handleProjectClick={handleProjectClick}
              techGlowVariants={techGlowVariants}
            />
          ))}
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <EmptyState setActiveFilter={setActiveFilter} />
        )}
      </div>

      {/* Interactive background elements */}
      <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-blue-500/10 filter blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute top-1/4 left-10 w-48 h-48 rounded-full bg-purple-500/10 filter blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>
    </section>
  );
}

function ProjectCard({ 
  project, 
  expandedProjectId, 
  setExpandedProjectId, 
  hoveredTech, 
  variants, 
  handleProjectClick, 
  techGlowVariants 
}: ProjectCardProps) {
  return (
    <motion.div
      variants={variants}
      className={`relative group overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 hover:border-blue-500 cursor-pointer transition-all duration-500 h-auto`}
      whileHover={{ 
        y: -10,
        boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)'
      }}
      onClick={() => handleProjectClick(project.id)}
    >
      {/* Project image with parallax effect */}
      <div className="relative h-48 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80 z-10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.3 }}
        />
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Project content */}
      <div className="p-6 flex flex-col h-full">
        <div className="">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{project.description}</p>
          
          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <motion.span
                key={tag}
                variants={techGlowVariants}
                initial="initial"
                whileHover="hover"
                className={`text-xs text-blue-500 font-mono px-2 py-1 rounded-md ${
                  hoveredTech === tag 
                    ? 'bg-blue-600/70 text-white shadow-lg shadow-blue-500/30' 
                    : 'bg-gray-200 dark:bg-gray-900 text-blue-600 dark:text-blue-500'
                }`}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Walkthrough section */}
        {expandedProjectId === project.id && !project.link && project.hasWalkthrough && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4"
          >
            <div className="pt-4 border-t border-gray-700">
              <div className="border border-blue-500/40 text-white p-2 rounded-lg text-center bg-blue-600/30">
                <span className="text-xs font-mono">{portfolioText.walkthrough.title}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-blue-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

function EmptyState({ setActiveFilter }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-16"
    >
      <icons.Code size={48} className="mx-auto text-gray-600 mb-4" />
      <h3 className="text-xl text-gray-400 font-mono">{portfolioText.noProjects.title}</h3>
      <p className="text-gray-500 mt-2 mb-6">{portfolioText.noProjects.message}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveFilter('All')}
        className="px-6 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition-colors font-mono text-sm"
      >
        {portfolioText.noProjects.button}
      </motion.button>
    </motion.div>
  );
}