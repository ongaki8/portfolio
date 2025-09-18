// app/components/desktop/AIQuickSuggestions.tsx
'use client';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Smartphone, GraduationCap, Award, TrendingUp, LayoutTemplate } from 'lucide-react';

interface QuickSuggestion {
  icon: React.ReactNode;
  text: string;
  query: string;
}

const suggestions: QuickSuggestion[] = [
  { icon: <LayoutTemplate size={16} />, text: "WordPress Skills", query: "What's Brian's experience with WordPress?" },
  { icon: <Code size={16} />, text: "Tech Stack", query: "What programming languages does Brian know?" },
  { icon: <Globe size={16} />, text: "Projects", query: "Tell me about Brian's projects" },
  { icon: <TrendingUp size={16} />, text: "Experience", query: "What's Brian's work experience?" },
  { icon: <GraduationCap size={16} />, text: "Education", query: "What's Brian's educational background?" },
  { icon: <Award size={16} />, text: "Achievements", query: "What awards has Brian received?" },
  { icon: <Database size={16} />, text: "Python Skills", query: "What Python projects has Brian built?" },
  { icon: <Smartphone size={16} />, text: "Mobile Apps", query: "Tell me about Brian's mobile app projects" }
];

interface AIQuickSuggestionsProps {
  onSuggestionClick: (query: string) => void;
}

export default function AIQuickSuggestions({ onSuggestionClick }: AIQuickSuggestionsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 p-4">
      {suggestions.map((suggestion, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSuggestionClick(suggestion.query)}
          className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer"
        >
          {suggestion.icon}
          <span className="text-xs">{suggestion.text}</span>
        </motion.button>
      ))}
    </div>
  );
}