// app/components/desktop/ai/SkillBadge.tsx
interface SkillBadgeProps {
  name: string;
  level: number;
}

export default function SkillBadge({ name, level }: SkillBadgeProps) {
  const getColor = (level: number) => {
    if (level >= 90) return 'from-green-400 to-green-600';
    if (level >= 70) return 'from-blue-400 to-blue-600';
    if (level >= 50) return 'from-yellow-400 to-yellow-600';
    return 'from-gray-400 to-gray-600';
  };

  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{name}</span>
      <div className="w-16 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full">
        <div
          className={`h-1.5 rounded-full bg-gradient-to-r ${getColor(level)}`}
          style={{ width: `${level}%` }}
        />
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400">{level}%</span>
    </div>
  );
}