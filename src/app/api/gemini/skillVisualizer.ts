// app/api/gemini/skillVisualizer.ts
export function createSkillVisual(name: string, level: number): string {
  const filled = '█'.repeat(Math.floor(level / 10));
  const empty = '░'.repeat(10 - Math.floor(level / 10));
  return `${name.padEnd(15)} ${filled}${empty} ${level}%`;
}

export function createSkillGrid(skills: {category: string, items: {name: string, level: number}[]}[]): string {
  let grid = '';
  
  skills.forEach(category => {
    grid += `\n**${category.category}:**\n`;
    category.items.forEach(skill => {
      grid += createSkillVisual(skill.name, skill.level) + '\n';
    });
    grid += '\n';
  });
  
  return grid;
}

export function createProgressBar(level: number, width: number = 10): string {
  const filled = Math.floor((level / 100) * width);
  const empty = width - filled;
  return '█'.repeat(filled) + '░'.repeat(empty);
}

export function getSkillColor(level: number): string {
  if (level >= 90) return 'text-green-600 dark:text-green-400';
  if (level >= 70) return 'text-blue-600 dark:text-blue-400';
  if (level >= 50) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-gray-600 dark:text-gray-400';
}

export function getSkillBarColor(level: number): string {
  if (level >= 90) return 'from-green-400 to-green-600';
  if (level >= 70) return 'from-blue-400 to-blue-600';
  if (level >= 50) return 'from-yellow-400 to-yellow-600';
  return 'from-gray-400 to-gray-600';
}