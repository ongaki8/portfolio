// app/components/desktop/ai/ProjectCard.tsx
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
}

export default function ProjectCard({ title, description, tech }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 mb-3"
    >
      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{description}</p>
      <div className="flex flex-wrap gap-1">
        {tech.map((t, i) => (
          <span key={i} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}