// src/app/components/shared/Desktop404.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaReact } from 'react-icons/fa';
import { BugPlay, Files, GitBranchIcon, SearchIcon, ZapIcon } from 'lucide-react';

export default function Desktop404() {
  const [code, setCode] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [activePanel, setActivePanel] = useState('terminal');

  // Code content
  const codeLines = [
    "// pageData.tsx",
    "import { ConstructionIcon } from '@/components/icons';",
    "",
    "export default function UnderConstruction() {",
    "  return (",
    "    <div className='flex flex-col min-h-screen'>",
    "      <header className='bg-[#007acc] p-4'>",
    "        <h1 className='text-2xl font-bold text-white'>",
    "          <ConstructionIcon className='inline mr-2' />",
    "          Under Construction",
    "        </h1>",
    "      </header>",
    "      ",
    "      <main className='flex-1 grid place-items-center p-8'>",
    "        <div className='text-center max-w-md'>",
    "          <p className='text-lg mb-4'>",
    "            Still developing this page, please check back later.",
    "          </p>",
    "          <p className='text-[#858585]'>",
    "            Check back soon for updates!",
    "          </p>",
    "        </div>",
    "      </main>",
    "    </div>",
    "  );",
    "}"
  ];

  // Typewriter effect
  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let timeout: NodeJS.Timeout;

    const type = () => {
      if (lineIndex < codeLines.length) {
        const line = codeLines[lineIndex];
        
        if (charIndex < line.length) {
          setCode(prev => {
            const lines = prev.split('\n');
            lines[lineIndex] = line.substring(0, charIndex + 1);
            return lines.join('\n');
          });
          charIndex++;
          timeout = setTimeout(type, Math.random() * 30 + 20);
        } else {
          lineIndex++;
          charIndex = 0;
          setCurrentLine(lineIndex);
          timeout = setTimeout(type, 50);
        }
      } else {
        setTimeout(() => {
          setCode('');
          lineIndex = 0;
          charIndex = 0;
          timeout = setTimeout(type, 500);
        }, 2000);
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
            BUILD_IN_PROGRESS
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-mono text-sm sm:text-base">
            {`// This page is still in the build queue. Check back later.`}
          </p>
        </motion.div>

        <div className="flex items-start justify-center p-4 mt-4">
          <div className="w-full max-w-5xl rounded-md overflow-hidden bg-[#f3f3f3] dark:bg-[#252526] border border-[#e5e7eb] dark:border-[#37373d] shadow-xl">
            {/* ONG Title Bar */}
            <div className="bg-[#007acc] dark:bg-[#181818] border-b border-[#e5e7eb] dark:border-[#37373d] px-3 py-2 flex items-center justify-between">
              <div className="flex-1 flex justify-center items-center">
                <span className="text-white dark:text-white/80">pageData.tsx - NEW_PAGE</span>
              </div>
            </div>

            {/* ONG Activity Bar */}
            <div className="flex h-[350px]">
              <div className="flex h-[350px]">
                <div className="w-12 bg-[#f9f9f9] dark:bg-[#181818] flex flex-col items-center py-4 border-r border-[#e5e7eb] dark:border-[#37373d]">
                  {/* Active Document Icon with blue indicator */}
                  <div className="relative w-full">
                    <div className="absolute left-0 w-1 h-8 bg-[#0078d4]"></div>
                    <button className="p-2 text-gray-800 dark:text-white w-full flex justify-center cursor-pointer">
                      <Files className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Search Icon */}
                  <button className="p-2 text-[#858585] mt-4 hover:text-blue-500 dark:hover:text-white cursor-pointer">
                    <SearchIcon className="w-5 h-5" />
                  </button>

                  {/* Git Icon */}
                  <button className="p-2 text-[#858585] mt-4 hover:text-blue-500 dark:hover:text-white cursor-pointer">
                    <GitBranchIcon className="w-5 h-5" />
                  </button>

                  {/* Debug Icon */}
                  <button className="p-2 text-[#858585] mt-4 hover:text-blue-500 dark:hover:text-white cursor-pointer">
                    <BugPlay className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* ONG Sidebar */}
              <div className="w-48 bg-[#f9f9f9] dark:bg-[#181818] border-r border-[#e5e7eb] dark:border-[#37373d] p-3 text-sm">
                <div className="text-xs text-[#858585] uppercase mb-3">EXPLORER</div>
                <div className="text-[#333] dark:text-[#cccccc] mb-4">
                  <div className="flex items-center py-1 px-2 rounded hover:bg-[#e5e7eb] dark:hover:bg-[#2a2d2e] cursor-pointer">
                    <FaReact className="w-4 h-4 mr-2 text-[#519aba]" />
                    pageData.tsx
                  </div>
                </div>
              </div>

              {/* ONG Editor Area */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Editor Tabs */}
                <div className="bg-[#f9f9f9] dark:bg-[#181818] flex items-center border-b border-gray-300 dark:border-[#37373d]">
                  <div className="px-4 py-2 text-sm bg-[#e5e7eb] dark:bg-[#1e1e1e] text-[#222] dark:text-[#ffffff] border-t-1 border-[#0078d4] flex items-center cursor-pointer">
                    <FaReact className="w-4 h-4 mr-2 text-[#519aba]" />
                    pageData.tsx
                  </div>
                </div>

                {/* Editor Content */}
                <div className="flex-1 overflow-auto bg-[#e5e7eb] dark:bg-[#1e1e1e]">
                  <div className="p-4 font-mono text-sm text-[#222] dark:text-[#d4d4d4]">
                    <pre>
                      {code.split('\n').map((line, i) => (
                        <div key={i} className="flex">
                          <span className="text-[#858585] w-8 text-right pr-2 select-none">{i + 1}</span>
                          <code>{line}</code>
                          {i === currentLine && (
                            <motion.span
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ repeat: Infinity, duration: 1 }}
                              className="inline-block w-2 h-5 bg-[#569cd6] ml-1"
                            />
                          )}
                        </div>
                      ))}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* ONG Panel */}
            <div className="border-t border-[#e5e7eb] dark:border-[#37373d] h-35 flex flex-col">
              <div className="bg-[#f9f9f9] dark:bg-[#181818] px-3 py-1 flex text-xs">
                <button 
                  className={`px-4 py-1 ${activePanel === 'terminal' ? 'text-blue-600 dark:text-white border-b border-[#0078d4] cursor-pointer' : 'text-[#858585] cursor-pointer'}`}
                  onClick={() => setActivePanel('terminal')}
                >
                  TERMINAL
                </button>
                <button 
                  className={`px-4 py-1 ${activePanel === 'problems' ? 'text-blue-600 dark:text-white border-b border-[#0078d4] cursor-pointer' : 'text-[#858585] cursor-pointer'}`}
                  onClick={() => setActivePanel('problems')}
                >
                  PROBLEMS
                </button>
              </div>
              <div className="flex-1 bg-[#f9f9f9] dark:bg-[#181818] p-3 text-sm font-mono text-[#222] dark:text-[#d4d4d4] overflow-auto">
                {activePanel === 'terminal' && (
                  <div>
                    <div>$ npm run dev</div>
                    <div>Compiling page...</div>
                    <div>Warning: This page is under development and may not function as expected.</div>
                    <div className="flex items-center mt-1">
                      <span>$</span>
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="ml-1 inline-block w-2 h-4 bg-green-400 dark:bg-[#4ec9b0]"
                      />
                    </div>
                  </div>
                )}
                {activePanel === 'problems' && (
                  <div>No problems have been detected in the workspace.</div>
                )}
              </div>
            </div>
            
            {/* ONG Status Bar */}
            <div className="bg-[#007acc] px-4 py-1 text-xs text-white flex justify-between">
              <div className="flex items-center">
                <span className="mr-4">Console</span>
                <span>v29.03.1996</span>
              </div>
              <div className="flex items-center">
                <span>Ln {currentLine + 1}, Col {code.split('\n')[currentLine]?.length || 1}</span>
                <span className="ml-4">UTF-8</span>
                <span className="ml-4">TypeScript</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}