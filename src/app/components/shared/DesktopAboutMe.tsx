// src/app/components/shared/DesktopAboutMe.tsx
'use client';

import { motion } from 'framer-motion';
import { Code, Database, Cpu, GitBranch, BarChart2, Settings, User, MapPin, Languages, LayoutTemplate, ShoppingCart, Star, Zap, TrendingUp, Circle } from 'lucide-react';
import { 
  skillCategories, 
  languages, 
  cmsSkills, 
  proficiencyScale, 
  getProgressColor,
  aboutMeText
} from './aboutMeData';

export default function DesktopAboutMe() {
  return (
  <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-6 overflow-auto">
    <div className="max-w-6xl mx-auto">
      {/* Tech-style header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
          USER_INFO
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-mono text-sm sm:text-base">
          {`// Compiled as an engineer, runtime developer.`}
        </p>
      </motion.div>

      {/* About Me Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <User className="text-blue-500 dark:text-blue-400" size={24} />
          </div>
          <h2 className="text-xl font-medium font-mono text-gray-900 dark:text-white">ABOUT_ME</h2>
        </div>
        
        <div className="space-y-6">
          {/* Text Section */}
          <div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {aboutMeText.intro}
                <br /><br />
                {aboutMeText.experience}
                <br /><br />
                {aboutMeText.goals}
              </p>
              <div className="font-mono font-light flex items-center gap-2 text-blue-600 dark:text-blue-500">
                <MapPin className="text-blue-600 dark:text-blue-500" size={18} />
                <span>{aboutMeText.location}</span>
              </div>
          </div>

          {/* Languages Section */}
          <div className="bg-gray-100 dark:bg-gray-700/30 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
              <h3 className="text-gray-900 dark:text-white font-regular font-mono mb-3 flex items-center gap-2">
                <Languages className="text-purple-500 dark:text-purple-400" size={20} />
                LANGUAGES
              </h3>
              <div className="space-y-3">
                {languages.map((lang, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-s text-gray-700 dark:text-gray-300">{lang.name}</span>
                        <span className="text-xs font-mono text-gray-700 dark:text-gray-400">Native</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                        <div 
                          className={`bg-gradient-to-r ${getProgressColor(lang.level)} h-1.5 rounded-full`}
                          style={{ width: `${lang.level}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </motion.div>

      {/* Proficiency Scale Rating */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="bg-white/70 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl p-5 border border-gray-200 dark:border-gray-700 mb-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <TrendingUp className="text-blue-500 dark:text-blue-500" size={20} />
          </div>
          <h2 className="text-xl font-medium font-mono text-gray-900 dark:text-white">PROFICIENCY_SCALE</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {proficiencyScale.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -3 }}
              className="bg-gray-100/70 dark:bg-gray-700/20 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-blue-500 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                {item.icon}
                <span className="font-mono text-blue-500">{item.range}</span>
              </div>
              <h3 className="font-mono text-gray-900 dark:text-white font-medium mb-1">{item.level}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CMS Skills Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <LayoutTemplate className="text-purple-500 dark:text-purple-400" size={24} />
          </div>
          <h2 className="text-xl font-medium font-mono text-gray-900 dark:text-white">CMS_EXPERIENCE</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cmsSkills.map((cms, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -3 }}
              className="bg-gray-100 dark:bg-gray-700/40 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-blue-500 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                {cms.icon}
                <h3 className="text-gray-900 dark:text-white font-medium">{cms.name}</h3>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-700 dark:text-gray-300 font-mono font-regular">{cms.name}</span>
                <span className="text-xs font-mono text-gray-700 dark:text-gray-400">{cms.level}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${cms.level}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                  className={`h-2.5 rounded-full bg-gradient-to-r ${getProgressColor(cms.level)} relative`}
                >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {skillCategories.map((category, catIndex) => (
          <motion.div
            key={catIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + catIndex * 0.1 }}
            className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                {category.icon}
              </div>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">{category.name}</h2>
            </div>

            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="group">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700 dark:text-gray-300 font-mono font-regular">{skill.name}</span>
                    <span className="text-xs font-mono text-gray-700 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.4 + skillIndex * 0.05, duration: 0.8 }}
                      className={`h-2.5 rounded-full bg-gradient-to-r ${getProgressColor(skill.level)} relative`}
                    >
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tech Visualization */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <h2 className="text-xl font-medium font-mono text-gray-900 dark:text-gray-200 mb-6 flex items-center gap-2">
          <Cpu className="text-blue-500" size={20} />
          TECH_VISUALIZATION
        </h2>
        
        <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 text-center">
            {/* Frontend */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-500/50 cursor-pointer"
            >
              <Code className="mx-auto text-blue-500 mb-2" size={28} />
              <h3 className="text-gray-900 dark:text-white font-medium">Frontend</h3>
              <p className="text-xs font-mono text-blue-500 mt-1">4 languages</p>
            </motion.div>
            
            {/* Backend */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-500/30 cursor-pointer"
            >
              <Database className="mx-auto text-green-500 mb-2" size={28} />
              <h3 className="text-gray-900 dark:text-white font-medium">Backend</h3>
              <p className="text-xs font-mono text-green-500 mt-1">5 languages</p>
            </motion.div>
            
            {/* Dev Tools */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-500/30 cursor-pointer"
            >
              <GitBranch className="mx-auto text-purple-500 mb-2" size={28} />
              <h3 className="text-gray-900 dark:text-white font-medium">Dev Tools</h3>
              <p className="text-xs font-mono text-purple-500 mt-1">4 tools</p>
            </motion.div>
            
            {/* Data */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-500/30 cursor-pointer"
            >
              <BarChart2 className="mx-auto text-yellow-500 mb-2" size={28} />
              <h3 className="text-gray-900 dark:text-white font-medium">Data</h3>
              <p className="text-xs font-mono text-yellow-500 mt-1">1 specialization</p>
            </motion.div>
            
            {/* Other */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg border border-red-200 dark:border-red-500/30 cursor-pointer"
            >
              <Settings className="mx-auto text-red-500 mb-2" size={28} />
              <h3 className="text-gray-900 dark:text-white font-medium">Other</h3>
              <p className="text-xs font-mono text-red-500 mt-1">3 skills</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Glowing tech orbs */}
      <div className="fixed top-1/4 left-1/4 w-40 h-40 rounded-full bg-blue-500/10 filter blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-purple-500/10 filter blur-3xl pointer-events-none -z-10"></div>
    </div>
  </div>
);
}