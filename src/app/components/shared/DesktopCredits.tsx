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
    <div className="h-full bg-gray-900 p-8 overflow-hidden">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          ref={terminalRef}
          className="flex-1 bg-gray-900/95 p-6 overflow-y-auto font-mono text-sm text-gray-300 rounded-lg border border-gray-700 shadow-lg"
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
                  line.startsWith('user@ongaki8') ? 'text-blue-400' : 
                  line.includes('┌') || line.includes('└') ? 'text-blue-400' :
                  line.includes('│') ? 'text-gray-300' : ''
                }
              >
                {line}
              </motion.div>
            ))}
          </div>

          {!isTyping && (
            <div className="flex items-center mt-2">
              <span className="text-blue-400">user@ongaki8 ~ % </span>
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={handleCommand}
                  className="w-full bg-transparent outline-none text-gray-300 caret-blue-400 ml-1 font-mono"
                  autoFocus
                  disabled={isTyping}
                  style={{ opacity: isTyping ? 0.5 : 1 }}
                />
                {showCursor && (
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute left-0 top-0 w-2 h-5 bg-blue-400 ml-1"
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
              className={`group bg-gray-800 hover:bg-gray-700 rounded-lg p-4 flex flex-col items-center gap-2 transition-all disabled:opacity-50 border border-gray-700 hover:border-${action.color}-400`}
            >
              <div className={`p-3 bg-gray-700 group-hover:bg-${action.color}-400/20 rounded-full transition-colors`}>
                {React.cloneElement(getIconComponent(action.icon), {
                  className: `text-${action.color}-400 group-hover:text-${action.color}-300`
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
          className="mt-6 text-sm text-gray-500 font-mono flex justify-between items-center px-3 py-2"
        >
          <div className="flex items-center gap-2">
            <SquareTerminal className="text-blue-400" size={16} />
            <span>Console_ONG v29.03.1996</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <span>CONNECTED</span>
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="text-yellow-400" size={16} />
            <span>Type "help" for commands</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}