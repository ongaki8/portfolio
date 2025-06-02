// src/app/components/shared/MobileAboutMe.tsx
'use client';

import { motion, AnimatePresence, PanInfo, useAnimation } from 'framer-motion';
import { useState } from 'react';
import { 
  Code, 
  Database, 
  Cpu, 
  GitBranch, 
  BarChart2, 
  User, 
  MapPin, 
  Languages, 
  LayoutTemplate, 
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  SquareDashedBottomCode
} from 'lucide-react';
import { 
  skillCategories, 
  languages, 
  cmsSkills, 
  proficiencyScale, 
  getProgressColor,
  aboutMeText
} from './aboutMeData';

export default function MobileAboutMe() {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for forward, -1 for backward
  const controls = useAnimation();

  const nextCategory = () => {
    setDirection(1);
    setCurrentCategory((prev) => 
      prev === skillCategories.length - 1 ? 0 : prev + 1
    );
  };

  const prevCategory = () => {
    setDirection(-1);
    setCurrentCategory((prev) => 
      prev === 0 ? skillCategories.length - 1 : prev - 1
    );
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      prevCategory();
    } else if (info.offset.x < -swipeThreshold) {
      nextCategory();
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
    let index = currentCategory + offset;
    if (index < 0) return skillCategories.length - 1;
    if (index >= skillCategories.length) return 0;
    return index;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-4 mb-8"
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-2">
            USER_INFO
          </h1>
          <p className="text-gray-400 font-mono text-xs">
            {`// Compiled as an engineer, runtime developer.`}
          </p>
        </motion.div>

        {/* About Me Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1 bg-blue-900/30 rounded-lg">
              <User className="text-blue-400" size={20} />
            </div>
            <h2 className="text-lg font-regular font-mono text-white">ABOUT_ME</h2>
          </div>
          
          <div className="space-y-4">
            <div>
                <p className="text-gray-300 text-sm mb-3">
                  {aboutMeText.mobileIntro}
                </p>
                <p className="text-gray-300 text-sm mb-3">
                  {aboutMeText.mobileExperience}
                </p>
                <p className="text-gray-300 text-sm mb-3">
                  {aboutMeText.mobileGoals}
                </p>
            </div>

            {/* Languages Section */}
            <div className="bg-gray-700/30 rounded-lg p-3 border border-gray-600">
                <h3 className="text-white font-regular font-mono text-lg mb-2 flex items-center gap-2">
                  <Languages className="text-purple-400" size={16} />
                  LANGUAGES
                </h3>
                <div className="space-y-2">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-xl">{lang.flag}</span>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-300">{lang.name}</span>
                          <span className="text-xs font-mono text-gray-400">Native</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-1">
                          <div 
                            className={`bg-gradient-to-r ${getProgressColor(lang.level)} h-1 rounded-full`}
                            style={{ width: `${lang.level}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
            <div className="font-mono font-light flex justify-center items-center gap-1 text-blue-500 text-sm">
              <MapPin className="text-blue-500" size={16} />
              <span>Based in UAE</span>
            </div>
          </div>
        </motion.div>

        {/* Proficiency Scale Rating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700 mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1 bg-blue-900/30 rounded-lg">
              <TrendingUp className="text-blue-500" size={16} />
            </div>
            <h2 className="text-lg font-regular font-mono text-white">PROFICIENCY_SCALE</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {proficiencyScale.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                className="bg-gray-700/20 rounded-lg p-3 border border-gray-600 hover:border-blue-500 transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  {item.icon}
                  <span className="font-mono text-blue-500 text-sm">{item.range}</span>
                </div>
                <h3 className="font-mono text-white text-sm font-medium mb-1">{item.level}</h3>
                <p className="text-gray-300 text-xs">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CMS Skills Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1 bg-purple-900/30 rounded-lg">
              <LayoutTemplate className="text-purple-400" size={20} />
            </div>
            <h2 className="text-lg font-regular font-mono text-white">CMS_EXPERIENCE</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {cmsSkills.map((cms, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                className="bg-gray-700/40 rounded-lg p-3 border border-gray-600 hover:border-blue-500 transition-all group"
              >
                <div className="flex items-center gap-2 mb-2">
                  {cms.icon}
                  <h3 className="text-white text-sm font-medium">{cms.name}</h3>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300 font-mono text-xs">{cms.name}</span>
                  <span className="text-xs font-mono text-gray-400">{cms.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cms.level}%` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                    className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(cms.level)} relative`}
                  >
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Carousel */}
        <div className="relative mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-regular font-mono text-gray-200 flex items-center gap-2">
              <Cpu className="text-purple-400" size={16} />
              SKILL_CATEGORIES
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={prevCategory}
                className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                <ChevronLeft className="text-white" size={18} />
              </button>
              <button 
                onClick={nextCategory}
                className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                <ChevronRight className="text-white" size={18} />
              </button>
            </div>
          </div>

          <div className="relative h-64 overflow-hidden">
            {/* Previous Card Preview */}
            <motion.div 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[80%] h-48 bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-600 z-0"
              style={{ x: '-80%' }}
              initial={{ opacity: 0.5, scale: 0.8 }}
              animate={{ opacity: 0.5, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 bg-gray-700 rounded-lg">
                  {skillCategories[getAdjacentIndex(-1)].icon}
                </div>
                <h3 className="text-sm font-medium text-gray-300 truncate">
                  {skillCategories[getAdjacentIndex(-1)].name}
                </h3>
              </div>
            </motion.div>

            {/* Next Card Preview */}
            <motion.div 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[80%] h-48 bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-600 z-0"
              style={{ x: '80%' }}
              initial={{ opacity: 0.5, scale: 0.8 }}
              animate={{ opacity: 0.5, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 bg-gray-700 rounded-lg">
                  {skillCategories[getAdjacentIndex(1)].icon}
                </div>
                <h3 className="text-sm font-medium text-gray-300 truncate">
                  {skillCategories[getAdjacentIndex(1)].name}
                </h3>
              </div>
            </motion.div>

            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={currentCategory}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition-all duration-300 absolute inset-0"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1 bg-gray-700 rounded-lg">
                    {skillCategories[currentCategory].icon}
                  </div>
                  <h2 className="text-lg font-medium text-white">
                    {skillCategories[currentCategory].name}
                  </h2>
                </div>

                <div className="space-y-3">
                  {skillCategories[currentCategory].skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="group">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-300 font-mono text-xs">{skill.name}</span>
                        <span className="text-xs font-mono text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ delay: 0.1 + skillIndex * 0.05, duration: 0.8 }}
                          className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(skill.level)} relative`}
                        >
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-1 mt-3">
            {skillCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentCategory ? 1 : -1);
                  setCurrentCategory(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentCategory ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Tech Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-lg font-regular font-mono text-gray-200 mb-4 flex items-center gap-2">
            <Cpu className="text-blue-500" size={16} />
            TECH_VISUALIZATION
          </h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <div className="grid grid-cols-2 gap-3 text-center">
              {/* Frontend */}
              <motion.div
                whileHover={{ y: -3 }}
                className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/50 cursor-pointer"
              >
                <Code className="mx-auto text-blue-500 mb-1" size={20} />
                <h3 className="text-white text-sm font-medium">Frontend</h3>
                <p className="text-xs font-mono text-blue-500 mt-1">4 languages</p>
              </motion.div>
              
              {/* Backend */}
              <motion.div
                whileHover={{ y: -3 }}
                className="bg-green-900/30 p-3 rounded-lg border border-green-500/30 cursor-pointer"
              >
                <Database className="mx-auto text-green-500 mb-1" size={20} />
                <h3 className="text-white text-sm font-medium">Backend</h3>
                <p className="text-xs font-mono text-green-500 mt-1">5 languages</p>
              </motion.div>
              
              {/* Dev Tools */}
              <motion.div
                whileHover={{ y: -3 }}
                className="bg-purple-900/30 p-3 rounded-lg border border-purple-500/30 cursor-pointer"
              >
                <GitBranch className="mx-auto text-purple-500 mb-1" size={20} />
                <h3 className="text-white text-sm font-medium">Dev Tools</h3>
                <p className="text-xs font-mono text-purple-500 mt-1">4 tools</p>
              </motion.div>
              
              {/* Data */}
              <motion.div
                whileHover={{ y: -3 }}
                className="bg-yellow-900/30 p-3 rounded-lg border border-yellow-500/30 cursor-pointer"
              >
                <BarChart2 className="mx-auto text-yellow-500 mb-1" size={20} />
                <h3 className="text-white text-sm font-medium">Data</h3>
                <p className="text-xs font-mono text-yellow-500 mt-1">1 spec.</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}