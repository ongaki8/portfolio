// src/app/components/shared/MobileEducation.tsx
'use client';
import { GraduationCap, FileText, Award, Eye, X, ChevronDown, ChevronUp, GitCommitHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { educationData, publications, awards, certificates } from '../shared/educationData';

export default function MobileEducation() {
  const [viewingAttachment, setViewingAttachment] = useState<string | null>(null);
  const [expandedEducation, setExpandedEducation] = useState<number[]>([]);
  const [expandedCertificates, setExpandedCertificates] = useState<number[]>([]);
  const [currentAward, setCurrentAward] = useState(0);
  const [direction, setDirection] = useState(0);

  const openAttachment = (url: string) => {
    setViewingAttachment(url);
  };

  const closeAttachment = () => {
    setViewingAttachment(null);
  };

  const toggleEducationExpand = (index: number) => {
    setExpandedEducation(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const toggleCertificateExpand = (index: number) => {
    setExpandedCertificates(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const nextAward = () => {
    setDirection(1);
    setCurrentAward(prev => 
      prev === awards.length - 1 ? 0 : prev + 1
    );
  };

  const prevAward = () => {
    setDirection(-1);
    setCurrentAward(prev => 
      prev === 0 ? awards.length - 1 : prev - 1
    );
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      prevAward();
    } else if (info.offset.x < -swipeThreshold) {
      nextAward();
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
    let index = currentAward + offset;
    if (index < 0) return awards.length - 1;
    if (index >= awards.length) return 0;
    return index;
  };

  return (
    <div className="h-full overflow-x-hidden overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-4 mb-8"
      >
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 mb-2">
          ACADEMIC_JOURNEY
        </h1>
        <p className="text-gray-400 font-mono text-xs">
          {`// Education & notable academic work`}
        </p>
      </motion.div>

      {/* Education Timeline Section */}
      <section className="mb-8">
        <h2 className="text-lg font-mono text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <GraduationCap className="text-blue-500" size={18} />
          EDUCATION
        </h2>
        
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-blue-900"></div>
          
          {educationData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="relative pl-8 pb-6 last:pb-0 group"
            >
              <div className="absolute left-4 top-1/3 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-blue-900 z-10 animate-pulse"></div>
              
              <div 
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer"
                onClick={() => toggleEducationExpand(index)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-medium text-gray-800 dark:text-white">{item.institution}</h3>
                    <p className="font-mono text-blue-600 dark:text-blue-500 text-sm mb-1">{item.degree}</p>
                    <span className="text-xs font-mono text-gray-400 bg-gray-900 px-2 py-0.5 rounded inline-block mb-2">
                      {item.period}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">

                    {/* {item.attachment && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openAttachment(item.attachment!);
                        }}
                        className="text-gray-400 hover:text-blue-500 transition-colors hover:cursor-pointer"
                        aria-label="View certificate"
                      >
                        <Eye size={16} />
                      </button>
                    )} */}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleEducationExpand(index);
                      }}
                      className="text-gray-400 hover:text-blue-500 transition-colors hover:cursor-pointer"
                      aria-label={expandedEducation.includes(index) ? "Collapse details" : "Expand details"}
                    >
                      {expandedEducation.includes(index) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {expandedEducation.includes(index) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 overflow-hidden"
                  >
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">{item.summary}</p>
                      <div className="flex flex-wrap gap-1">
                        {item.skills?.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs font-mono rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Publications Section */}
      <section className="mb-8">
        <h2 className="text-lg font-mono text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <FileText className="text-green-500" size={18} />
          PUBLICATIONS
        </h2>
        
        {publications.map((pub, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:border-green-500 transition-all duration-300 mb-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-medium text-gray-800 dark:text-white">{pub.title}</h3>
                <p className="text-xs font-mono text-gray-400 bg-gray-900 px-2 py-1 rounded inline-block mb-1">
                  <span className="font-medium text-green-500">{pub.journal} · {pub.year}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 italic">{pub.authors}</p>
              </div>

              {/* <button 
                onClick={() => openAttachment(pub.attachment)}
                className="text-gray-400 hover:text-green-500 transition-colors hover:cursor-pointer"
                aria-label="View publication"
              >
                <Eye size={16} />
              </button> */}

            </div>
          </motion.div>
        ))}
      </section>

      {/* Certificates Section */}
      <section className="mb-8">
        <h2 className="text-lg font-mono text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <FileText className="text-purple-500" size={18} />
          CERTIFICATES
        </h2>
        
        <div className="grid grid-cols-1 gap-3">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer"
              onClick={() => toggleCertificateExpand(index)}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-gray-800 dark:text-white">{cert.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                      <span className="font-mono font-light">{cert.issuer} · {cert.year}</span>
                    </p>
                    <p className="font-mono text-xs text-purple-500 dark:text-purple-500 bg-gray-900 px-2 py-1 rounded inline-block mb-1">{cert.description}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openAttachment(cert.attachment);
                      }}
                      className="text-gray-400 hover:text-purple-500 transition-colors hover:cursor-pointer"
                      aria-label="View certificate"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCertificateExpand(index);
                      }}
                      className="text-gray-400 hover:text-purple-500 transition-colors hover:cursor-pointer"
                      aria-label={expandedCertificates.includes(index) ? "Collapse details" : "Expand details"}
                    >
                      {expandedCertificates.includes(index) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {expandedCertificates.includes(index) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 overflow-hidden"
                  >
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="font-mono text-xs font-semibold text-purple-500 dark:text-purple-500 mb-1">KEY_LEARNINGS</h4>
                      <ul className="space-y-1">
                        {cert.responsibilities?.map((responsibility, respIndex) => (
                          <li key={respIndex} className="flex items-start">
                            <GitCommitHorizontal 
                              className="text-purple-500 mt-0.5 flex-shrink-0" 
                              size={12} 
                            />
                            <span className="text-gray-600 dark:text-gray-300 text-xs ml-1">{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Awards Section - Carousel */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-mono text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <Award className="text-yellow-500" size={18} />
            HONORS_AND_RECOGNITION
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={prevAward}
              className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <ChevronLeft className="text-white" size={18} />
            </button>
            <button 
              onClick={nextAward}
              className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <ChevronRight className="text-white" size={18} />
            </button>
          </div>
        </div>

        <div className="relative h-36">
          {/* Previous Award Preview */}
          <motion.div 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[80%] h-30 bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-600 z-0"
            style={{ x: '-80%' }}
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-3">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-md">
                <Award className="text-yellow-500 dark:text-yellow-400" size={18} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-300 truncate">
                  {awards[getAdjacentIndex(-1)].title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {awards[getAdjacentIndex(-1)].organization}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Next Award Preview */}
          <motion.div 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[80%] h-30 bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-600 z-0"
            style={{ x: '80%' }}
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-3">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-md">
                <Award className="text-yellow-500 dark:text-yellow-400" size={18} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-300 truncate">
                  {awards[getAdjacentIndex(1)].title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {awards[getAdjacentIndex(1)].organization}
                </p>
              </div>
            </div>
          </motion.div>

          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={currentAward}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-yellow-500 transition-all duration-300 absolute inset-0"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
            >
              <div className="flex items-start gap-3 h-full">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-md">
                  <Award className="text-yellow-500 dark:text-yellow-400" size={20} />
                </div>
                <div className="flex-1 flex flex-col h-full">
                  <div>
                    <h3 className="text-base font-medium text-gray-800 dark:text-white">{awards[currentAward].title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                      <span className="font-mono font-light">{awards[currentAward].organization} · {awards[currentAward].year}</span>
                    </p>
              
                    <p className="font-mono font-light text-xs text-yellow-500 dark:text-yellow-400 mb-3">
                      {awards[currentAward].description}
                    </p>
                  </div>

                  {/* {awards[currentAward].attachment && (
                    
                    <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
                      <button 
                        onClick={() => openAttachment(awards[currentAward].attachment!)}
                        className="flex items-center gap-1 text-xs font-mono text-yellow-500 hover:text-yellow-400 transition-colors"
                      >
                        <Eye size={14} />
                        <span>View Certificate</span>
                      </button>
                    </div>
                    
                  )} */}

                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-1 mt-3">
          {awards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentAward ? 1 : -1);
                setCurrentAward(index);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentAward ? 'bg-yellow-500' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Attachment Preview Modal */}
      {viewingAttachment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2"
          onClick={closeAttachment}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-[95vw] h-[80vh] flex flex-col shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-3 border-b dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-800 dark:text-white truncate max-w-[70%]">
                {viewingAttachment.split('/').pop()}
              </h3>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  closeAttachment();
                }}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors hover:cursor-pointer"
                aria-label="Close preview"
              >
                <X className="text-gray-500 dark:text-gray-400" size={18} />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-2 flex items-center justify-center">
              {viewingAttachment.toLowerCase().endsWith('.pdf') ? (
                <div className="w-full h-full">
                  <iframe
                    src={`${viewingAttachment}#view=fitH`}
                    className="w-full h-full border-0"
                    title="PDF Preview"
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center p-1">
                  <img 
                    src={viewingAttachment} 
                    alt="Document preview" 
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/fallback-image.jpg';
                    }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}