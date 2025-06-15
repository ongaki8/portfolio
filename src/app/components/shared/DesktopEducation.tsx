// src/app/components/shared/DesktopEducation.tsx
'use client';
import { GraduationCap, FileText, Award, Eye, X, ZoomIn, ZoomOut, Maximize, Minimize, FileCode2, ChevronDown, ChevronUp, GitCommitHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { educationData, publications, awards, certificates, EducationItem, PublicationItem, AwardItem, CertificateItem } from '../shared/educationData';

export default function DesktopEducation() {
  const [viewingAttachment, setViewingAttachment] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [scale, setScale] = useState<number>(1);
  const [isFitted, setIsFitted] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [expandedEducation, setExpandedEducation] = useState<number[]>([]);
  const [expandedCertificates, setExpandedCertificates] = useState<number[]>([]);

  useEffect(() => {
    setIsClient(true);
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const getPreviewHeight = () => {
    const baseHeight = Math.min(
      Math.floor(window.innerHeight * 0.6),
      Math.floor(containerHeight * 0.8)
    );
    return Math.max(baseHeight, 300);
  };

  const openAttachment = (url: string) => {
    setViewingAttachment(url);
    setScale(1);
    setIsFitted(true);
  };

  const closeAttachment = () => {
    setViewingAttachment(null);
  };

  const isPdf = (url: string) => url.toLowerCase().endsWith('.pdf');

  const zoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.25, 3));
    setIsFitted(false);
  };

  const zoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.max(prev - 0.25, 0.5));
    setIsFitted(false);
  };

  const toggleFit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFitted(!isFitted);
    if (!isFitted) {
      setScale(1);
    }
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

  return (
  <div 
    ref={containerRef}
    className="h-full overflow-y-auto rounded-2xl p-8 bg-gray-50 dark:bg-gray-900"
  >
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-8"
    >
      <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 mb-4">
        ACADEMIC_JOURNEY
      </h1>
      <p className="text-gray-500 dark:text-gray-400 font-mono text-sm sm:text-base">
        {`// Education & notable academic work`}
      </p>
    </motion.div>
    
     <hr className="border-t border-gray-300 dark:border-gray-700 my-8" />

    {/* Education Timeline Section */}
    <section className="mb-12">
      <h2 className="text-xl font-mono font-medium text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
        <GraduationCap className="text-blue-600" size={20} />
        EDUCATION
      </h2>
      
      <div className="relative">
        <div className="absolute left-[10px] top-0 h-full w-0.5 bg-blue-200 dark:bg-blue-900"></div>
        
        {educationData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="relative pl-10 pb-8 last:pb-0 group"
          >
            <div className="absolute left-[11px] top-1/3 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-blue-600 border-4 border-blue-200 dark:border-blue-900 z-10 animate-pulse"></div>
            
            <div 
              className="bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:shadow-blue-600/20 hover:border-blue-600 transition-all duration-300 cursor-pointer"
              onClick={() => toggleEducationExpand(index)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white">{item.institution}</h3>
                  <p className="font-mono text-blue-600 mb-1">{item.degree}</p>
                  <span className="text-xs font-mono text-gray-500 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded inline-block mb-2">
                    {item.period}
                  </span>
                  <p className="text-s text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleEducationExpand(index);
                    }}
                    className="text-gray-400 hover:text-blue-600 transition-colors hover:cursor-pointer"
                    aria-label={expandedEducation.includes(index) ? "Collapse details" : "Expand details"}
                  >
                    {expandedEducation.includes(index) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>

              {expandedEducation.includes(index) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 overflow-hidden"
                >
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{item.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.skills?.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="px-3 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs font-mono rounded-2xl inline-block"
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

    <hr className="border-t border-gray-300 dark:border-gray-700 my-8" />

    {/* Publications Section */}
    <section className="mb-12">
      <h2 className="text-xl font-mono font-medium text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
        <FileText className="text-green-500" size={20} />
        PUBLICATIONS
      </h2>
      
      {publications.map((pub, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:shadow-green-500/20 hover:border-green-500 transition-all duration-300 mb-4"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">{pub.title}</h3>
              <p className="text-xs font-mono text-gray-500 bg-gray-100 dark:bg-gray-900 px-2 py-2 rounded inline-block mb-2">
                <span className="font-medium text-green-500">{pub.journal} · {pub.year}</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">{pub.authors}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </section>

    <hr className="border-t border-gray-300 dark:border-gray-700 my-8" />

    {/* Certificates Section */}
    <section className="mb-12">
      <h2 className="text-xl font-mono font-medium text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
        <FileCode2 className="text-purple-500" size={20} />
        CERTIFICATES
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {certificates.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:shadow-purple-500/20 hover:border-purple-500 transition-all duration-300 cursor-pointer"
            onClick={() => toggleCertificateExpand(index)}
          >
            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white">{cert.title}</h3>
                  <p className="text-s text-gray-600 dark:text-gray-300 mb-1">
                    <span className="font-mono font-light">{cert.issuer} · {cert.year}</span>
                  </p>
                  <p className="font-mono text-sm text-purple-500 bg-gray-100 dark:bg-gray-900 px-2 py-2 rounded inline-block mb-2">{cert.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      openAttachment(cert.attachment);
                    }}
                    className="text-gray-400 hover:text-purple-500 transition-colors hover:cursor-pointer"
                    aria-label="View certificate"
                  >
                    <Eye size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCertificateExpand(index);
                    }}
                    className="text-gray-400 hover:text-purple-500 transition-colors hover:cursor-pointer"
                    aria-label={expandedCertificates.includes(index) ? "Collapse details" : "Expand details"}
                  >
                    {expandedCertificates.includes(index) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>

              {expandedCertificates.includes(index) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 overflow-hidden"
                >
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-mono text-sm font-semibold text-purple-500 mb-2">KEY_LEARNINGS</h4>
                    <ul className="space-y-2">
                      {cert.responsibilities?.map((responsibility, respIndex) => (
                        <li key={respIndex} className="flex items-start">
                          <GitCommitHorizontal 
                            className="text-purple-500 mt-0.5 flex-shrink-0" 
                            size={14} 
                          />
                          <span className="text-gray-600 dark:text-gray-300 text-sm ml-2">{responsibility}</span>
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

    <hr className="border-t border-gray-300 dark:border-gray-700 my-8" />

    {/* Awards Section */}
    <section>
      <h2 className="text-xl font-mono font-medium text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
        <Award className="text-yellow-500 dark:text-yellow-400" size={20} />
        HONORS_AND_RECOGNITION
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {awards.map((award, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:shadow-yellow-500/20 hover:border-yellow-500 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
                <Award className="text-yellow-500 dark:text-yellow-400" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">{award.title}</h3>
                <p className="text-s text-gray-600 dark:text-gray-300 mb-1">
                  <span className="font-mono font-light">{award.organization} · {award.year}</span>
                </p>
                <p className="font-mono font-light text-sm text-yellow-500 dark:text-yellow-400">{award.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Attachment Preview Modal */}
    {viewingAttachment && isClient && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        onClick={closeAttachment}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl w-[95vw] max-w-[900px] flex flex-col shadow-xl"
          style={{ height: `${getPreviewHeight()}px` }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-800 dark:text-white truncate max-w-[80%]">
              {viewingAttachment.split('/').pop()}
            </h3>
            <div className="flex items-center gap-2">
              {!isPdf(viewingAttachment) && (
                <>
                  <button 
                    onClick={zoomIn}
                    disabled={scale >= 3}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-600 disabled:opacity-30 hover:cursor-pointer"
                    aria-label="Zoom in"
                  >
                    <ZoomIn size={20} />
                  </button>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {Math.round(scale * 100)}%
                  </span>
                  <button 
                    onClick={zoomOut}
                    disabled={scale <= 0.5}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-600 disabled:opacity-30 hover:cursor-pointer"
                    aria-label="Zoom out"
                  >
                    <ZoomOut size={20} />
                  </button>
                  <button 
                    onClick={toggleFit}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-600 hover:cursor-pointer"
                    aria-label={isFitted ? "Zoom to actual size" : "Fit to window"}
                  >
                    {isFitted ? <Maximize size={20} /> : <Minimize size={20} />}
                  </button>
                </>
              )}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  closeAttachment();
                }}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors hover:cursor-pointer"
                aria-label="Close preview"
              >
                <X className="text-gray-500 dark:text-gray-400" size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
            {isPdf(viewingAttachment) ? (
              <div className="w-full h-full">
                <iframe
                  src={`${viewingAttachment}#view=fitH`}
                  className="w-full h-full border-0"
                  title="PDF Preview"
                />
              </div>
            ) : (
              <div 
                className={`w-full h-full flex items-center justify-center ${isFitted ? 'p-2' : 'p-1'}`}
                style={{ cursor: scale > 1 ? 'grab' : 'default' }}
              >
                <div className="relative w-full h-full flex items-center justify-center overflow-auto">
                  <img 
                    src={viewingAttachment} 
                    alt="Document preview" 
                    className={`${isFitted ? 'max-h-full max-w-full object-contain' : ''}`}
                    style={{ 
                      transform: `scale(${scale})`, 
                      transformOrigin: 'center',
                      maxHeight: '100%',
                      maxWidth: '100%'
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/fallback-image.jpg';
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    )}
  </div>
);
}