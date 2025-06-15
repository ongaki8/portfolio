// src/app/components/shared/DesktopCredits.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Mail, Command, Globe, Github, Linkedin, 
  SquareTerminal, BookOpenText, CircleHelp, Unplug 
} from 'lucide-react';
import { initialCommands, commandResponses, quickActions } from '../shared/creditsData';
import React from 'react'

export default function DesktopCredits() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const initializeTerminal = () => {
    setOutput([]);
    setIsTyping(true);
    let timer = 0;
    initialCommands.forEach((line, i) => {
      timer += i * 300 + 200;
      setTimeout(() => {
        setOutput(prev => [...prev, line]);
        if (i === initialCommands.length - 1) setIsTyping(false);
      }, timer);
    });
  };

  useEffect(() => {
    initializeTerminal();

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (!isTyping && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTyping]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const typeText = (text: string, callback: () => void) => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setOutput(prev => {
          const newOutput = [...prev];
          newOutput[newOutput.length - 1] = text.substring(0, i + 1);
          return newOutput;
        });
        i++;
      } else {
        clearInterval(typingInterval);
        callback();
      }
    }, 20);
  };

  const executeCommand = (cmd: string) => {
    if (cmd.toLowerCase() === 'clear') {
      initializeTerminal();
      return;
    }

    const newOutput = [...output];
    setOutput(newOutput);
    setCommand('');
    setIsTyping(true);

    setTimeout(() => {
      let responseLines: string[] = [];
      
      if (cmd.toLowerCase() in commandResponses) {
        responseLines = [...commandResponses[cmd.toLowerCase() as keyof typeof commandResponses]];
        if (cmd.toLowerCase() === 'default') {
          responseLines[4] = responseLines[4].replace('{cmd}', cmd.padEnd(34));
        }
      } else {
        responseLines = [...commandResponses.default];
        responseLines[4] = responseLines[4].replace('{cmd}', cmd.padEnd(34));
      }

      const commandPrompt = `user@ongaki8 ~ %  ${cmd}`;
      setOutput(prev => [...prev, commandPrompt]);

      let currentIndex = 0;
      const typeResponse = () => {
        if (currentIndex < responseLines.length) {
          typeText(responseLines[currentIndex], () => {
            currentIndex++;
            if (currentIndex < responseLines.length) {
              setOutput(prev => [...prev, '']);
            }
            typeResponse();
          });
        } else {
          setIsTyping(false);
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }
      };

      setOutput(prev => [...prev, '']);
      typeResponse();
    }, 100);
  };

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && command.trim() && !isTyping) {
      executeCommand(command);
    }
  };

  const handleButtonClick = (cmd: string) => {
    if (isTyping) return;
    setCommand(cmd);
    setTimeout(() => {
      executeCommand(cmd);
    }, 0);
  };

  const getIconComponent = (iconName: string) => {
    switch(iconName) {
      case 'BookOpenText': return <BookOpenText size={20} />;
      case 'Mail': return <Mail size={20} />;
      case 'CircleHelp': return <CircleHelp size={20} />;
      case 'Unplug': return <Unplug size={20} />;
      default: return <BookOpenText size={20} />;
    }
  };

    return (
    <div className="h-full bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 overflow-hidden">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          ref={terminalRef}
          className="flex-1 bg-white/90 dark:bg-gray-900/95 p-6 overflow-y-auto font-mono text-sm text-gray-700 dark:text-gray-300 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-sm"
          style={{ fontFamily: 'monospace' }}
          onClick={() => inputRef.current?.focus()}
        >
          <div className="space-y-1 whitespace-pre">
            {output.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                className={
                  line.startsWith('user@ongaki8') ? 'text-blue-500 dark:text-blue-400' : 
                  line.includes('┌') || line.includes('└') ? 'text-blue-500 dark:text-blue-400' :
                  line.includes('│') ? 'text-gray-700 dark:text-gray-300' : ''
                }
              >
                {line}
              </motion.div>
            ))}
          </div>

          {!isTyping && (
            <div className="flex items-center mt-2">
              <span className="text-blue-500 dark:text-blue-400">user@ongaki8 ~ % </span>
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={handleCommand}
                  className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-300 caret-blue-500 dark:caret-blue-400 ml-1 font-mono"
                  autoFocus
                  disabled={isTyping}
                  style={{ opacity: isTyping ? 0.5 : 1 }}
                />
                {showCursor && (
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute left-0 top-0 w-2 h-5 bg-blue-500 dark:bg-blue-400 ml-1"
                    style={{ left: `${command.length * 0.6}rem` }}
                  />
                )}
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 grid grid-cols-4 gap-4"
        >
          {quickActions.map((action, index) => (
            <button 
              key={index}
              onClick={() => handleButtonClick(action.command)}
              disabled={isTyping}
              className={`group bg-gray-200 dark:bg-gray-800 cursor-pointer hover:bg-gray-300/60 dark:hover:bg-gray-700 rounded-2xl p-4 flex flex-col items-center gap-2 transition-all disabled:opacity-50 border border-gray-300 dark:border-gray-700 ${
                action.color === 'blue' ? 'hover:border-blue-400' :
                action.color === 'green' ? 'hover:border-green-400' :
                action.color === 'yellow' ? 'hover:border-yellow-400' :
                'hover:border-purple-400'
              }`}
            >
              <div className={`p-3 bg-gray-300 dark:bg-gray-700 rounded-full transition-colors ${
                action.color === 'blue' ? 'group-hover:bg-blue-400/20' :
                action.color === 'green' ? 'group-hover:bg-green-400/20' :
                action.color === 'yellow' ? 'group-hover:bg-yellow-400/20' :
                'group-hover:bg-purple-400/20'
              }`}>
                {React.cloneElement(getIconComponent(action.icon), {
                  className: `${
                    action.color === 'blue' ? 'text-blue-600 dark:text-blue-400 group-hover:text-blue-600' :
                    action.color === 'green' ? 'text-green-500 dark:text-green-400 group-hover:text-green-500' :
                    action.color === 'yellow' ? 'text-yellow-500 dark:text-yellow-400 group-hover:text-yellow-500' :
                    'text-purple-500 dark:text-purple-400 group-hover:text-purple-400'
                  }`
                })}
              </div>
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-sm text-gray-400 dark:text-gray-500 font-mono flex justify-between items-center px-3 py-2"
        >
          <div className="flex items-center gap-2">
            <SquareTerminal className="text-blue-500 dark:text-blue-400" size={16} />
            <span className="text-blue-500 dark:text-blue-400">Console_ONG v29.03.1996</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-green-500 dark:text-green-500">CONNECTED</span>
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="text-yellow-500 dark:text-yellow-400" size={16} />
            <span className="text-yellow-500 dark:text-yellow-400">Type "help" for commands</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}