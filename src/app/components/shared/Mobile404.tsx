// src/app/components/shared/Mobile404.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { dev404Data } from './data404';

export default function Mobile404() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
  let timeout: NodeJS.Timeout;

  const type = (
    snippetIndex = 0,
    lineIndex = 0,
    charIndex = 0,
    text = ''
  ) => {
    if (snippetIndex < dev404Data.codeSnippets.length) {
      const snippet = dev404Data.codeSnippets[snippetIndex];
      const lines = snippet.split('\n');

      if (lineIndex < lines.length) {
        const line = lines[lineIndex];

        if (charIndex < line.length) {
          setDisplayedText(text + line[charIndex]);
          timeout = setTimeout(
            () => type(snippetIndex, lineIndex, charIndex + 1, text + line[charIndex]),
            Math.random() * 100 + 50 // very slow
          );
        } else {
          // Move to next line
          setDisplayedText(text + '\n');
          timeout = setTimeout(
            () => type(snippetIndex, lineIndex + 1, 0, text + '\n'),
            100
          );
        }
      } else {
        // Move to next snippet
        setDisplayedText(text + '\n\n');
        timeout = setTimeout(
          () => type(snippetIndex + 1, 0, 0, text + '\n\n'),
          100
        );
      }
    }
  };

  type();

  return () => clearTimeout(timeout);
}, []);

useEffect(() => {
  if (codeRef.current) {
    codeRef.current.scrollTop = codeRef.current.scrollHeight;
  }
}, [displayedText]);

    return (
    <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-4 mb-8"
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-2">
            BUILD_IN_PROGRESS
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-mono text-sm">
            {`// This page is still in the build queue. Check back later.`}
          </p>
        </motion.div>

        <hr className="border-t border-gray-300 dark:border-gray-700 my-0" />

        <div className="text-gray-800 dark:text-[#e2e8f0] font-mono flex items-start p-4 mt-6 mb-4">
          <div className="w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-[#1a202c] border border-gray-300 dark:border-[#2d3748]">
            {/* Mobile Window Header */}
            <div className="bg-[#2d3748] px-4 py-3 flex items-center justify-center relative">
              <div className="absolute left-4 flex items-center space-x-2">
                <div className="text-xs text-gray-400 dark:text-[#a0aec0]">←</div>
                <div className="text-xs text-gray-400 dark:text-[#a0aec0]">→</div>
              </div>
              <div className="text-xs text-[#a0aec0]">mobile-debug</div>
              <div className="absolute right-4">
                <div className="w-6 h-1 rounded-full bg-[#4a5568]"></div>
              </div>
            </div>

            {/* Mobile Status Bar */}
            <div className="bg-[#1a202c] px-3 py-1 flex justify-between items-center border-b border-gray-300 dark:border-[#2d3748]">
              <div className="text-[10px] text-[#a0aec0]">CONSOLE</div>
              <div className="flex space-x-1">
                <div className="text-[10px] text-[#a0aec0]">TypeScript</div>
                <div className="text-[10px] text-[#a0aec0]">UTF-8</div>
              </div>
            </div>

            <div className="p-4">
              {/* Code Editor */}
              <div className="p-4">
                <div className="bg-gray-200 dark:bg-[#0d1117] rounded-lg p-3 mb-4 border border-gray-300 dark:border-[#30363d] h-64 overflow-hidden">
                  <div className="text-xs text-gray-400 dark:text-[#8b949e] mb-2">pageData.tsx</div>
                  <pre 
                    ref={codeRef}
                    className="text-xs whitespace-pre-wrap overflow-auto h-[calc(100%-20px)]"
                  >
                    <code>
                      {displayedText}
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="ml-1"
                      >
                        █
                      </motion.span>
                    </code>
                  </pre>
                </div>
              </div>

              {/* Error Message */}
              <div className="ml-4 mr-4 p-4 rounded-lg bg-transparent border border-red-700 mb-8">
                <div className="items-center">
                  <div>
                    <h3 className="text-sm font-bold text-red-700 text-center">{dev404Data.errorMessage}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-300 text-center mt-1">
                      Tap show terminal to debug
                    </p>
                  </div>
                </div>
              </div>

              {/* Terminal Toggle */}
              <button 
                onClick={() => setShowTerminal(!showTerminal)}
                className="w-full py-2 px-3 bg-[#2d3748] dark:bg-[#2d3748] rounded-lg text-xs mb-2 border border-gray-300 dark:border-[#4a5568] text-[#a0aec0] text-left"
              >
                $ {showTerminal ? 'hide terminal' : 'show terminal'}
              </button>

              {/* Interactive Terminal */}
              {showTerminal && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-gray-200 dark:bg-[#0a0a0a] rounded-lg overflow-hidden border border-gray-300 dark:border-[#333]"
                >
                  <div className="p-3 text-green-600 dark:text-[#00ff00] text-xs h-32 overflow-y-auto">
                    {dev404Data.commands.map((cmd, i) => (
                      <div key={i} className="mb-1">
                        <div className="text-yellow-600 dark:text-yellow-400">$ {cmd.cmd}</div>
                        <div className="text-gray-500 dark:text-[#aaa]">{cmd.output}</div>
                      </div>
                    ))}
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-600 dark:text-yellow-400">$</span>
                      <div className="ml-1 flex">
                        {[...Array(3)].map((_, i) => (
                          <motion.span
                            key={i}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ 
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.3
                            }}
                          >
                            ■
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Progress Bar - Now as a loading indicator */}
            <div className="bg-[#2d3748] dark:bg-[#2d3748] px-3 py-2 text-xs">
              <div className="flex justify-between mb-1 text-gray-400 dark:text-[#a0aec0]">
                <span>Building...</span>
                {/* <span>{Math.floor(Math.random() * 37) + 15}%</span> */}
              </div>
              <div className="w-full bg-gray-300 dark:bg-[#4a5568] rounded-full h-1 overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-400 to-green-700"
                  initial={{ width: '15%' }}
                  animate={{ width: `${Math.floor(Math.random() * 57) + 15}%` }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}