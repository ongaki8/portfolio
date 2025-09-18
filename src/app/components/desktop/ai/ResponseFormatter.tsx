// app/components/desktop/ai/ResponseFormatter.tsx
import SkillBadge from './SkillBadge';
import ProjectCard from './ProjectCard';

interface ResponseFormatterProps {
  content: string;
  role: string;
}

export default function ResponseFormatter({ content, role }: ResponseFormatterProps) {
  // Check if content contains skill data (look for percentage indicators)
  const hasSkillData = content.includes('%') && 
    (content.includes('Skill') || content.includes('skill') || 
     content.includes('expertise') || content.includes('proficiency'));
  
  // Check if content contains project data
  const hasProjectData = content.includes('Project') || 
    content.includes('project') || content.includes('portfolio');

  // If it's a skills response, show skill badges
  if (hasSkillData) {
    return (
      <div className="grid grid-cols-2 gap-2 mb-4">
        <SkillBadge name="WordPress" level={95} />
        <SkillBadge name="PHP" level={90} />
        <SkillBadge name="Python" level={85} />
        <SkillBadge name="JavaScript" level={88} />
        <SkillBadge name="React" level={82} />
        <SkillBadge name="CSS/HTML" level={93} />
      </div>
    );
  }

  // If it's a projects response, show project cards
  if (hasProjectData) {
    return (
      <div className="space-y-3">
        <ProjectCard 
          title="E-commerce Website" 
          description="A full-featured online store with payment processing and inventory management"
          tech={["WordPress", "WooCommerce", "PHP", "JavaScript"]}
        />
        <ProjectCard 
          title="Data Automation Tool" 
          description="Python-based automation system for processing large datasets"
          tech={["Python", "Pandas", "SQL", "Automation"]}
        />
      </div>
    );
  }

  // For all other responses, use the standard formatting
  // Split content into sections based on dividers
  const sections = content.split(/\n-{3,}\n/).filter(section => section.trim());
  
  return (
    <div className="space-y-4">
      {sections.map((section, sectionIndex) => {
        const lines = section.split('\n').filter(line => line.trim());
        const firstLine = lines[0] || '';
        
        // Check if this is a section header
        const isHeader = firstLine.match(/[🌐🐍🚀💼🎓🏆💡💬🔗✨]+\s+.+/);
        
        return (
          <div key={sectionIndex} className="space-y-3">
            {isHeader && (
              <div className="flex items-center gap-2">
                <div className="text-lg">
                  {firstLine.match(/[🌐🐍🚀💼🎓🏆💡💬🔗✨]+/)?.[0]}
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-white">
                  {firstLine.replace(/[🌐🐍🚀💼🎓🏆💡💬🔗✨]+\s+/, '')}
                </h4>
              </div>
            )}
            
            <div className="space-y-2">
              {lines.slice(isHeader ? 1 : 0).map((line, lineIndex) => {
                if (line.startsWith('**✨ Highlights:**')) {
                  return (
                    <div key={lineIndex} className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <strong className="text-blue-600 dark:text-blue-400">✨ Highlights</strong>
                      <ul className="mt-2 space-y-1">
                        {lines.slice(lineIndex + 1)
                          .filter(l => l.startsWith('•'))
                          .map((item, itemIndex) => (
                            <li key={itemIndex} className="text-sm text-gray-700 dark:text-gray-300">
                              {item.replace('•', '').trim()}
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  );
                }
                
                if (line.startsWith('💬 Follow-Up Questions')) {
                  return (
                    <div key={lineIndex} className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                      <strong className="text-purple-600 dark:text-purple-400">💬 Follow-up Questions</strong>
                      <ul className="mt-2 space-y-1">
                        {lines.slice(lineIndex + 1)
                          .filter(l => l.startsWith('•'))
                          .map((item, itemIndex) => (
                            <li key={itemIndex} className="text-sm text-gray-700 dark:text-gray-300">
                              {item.replace('•', '').trim()}
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  );
                }
                
                if (line.startsWith('🔗 Quick Access')) {
                  return (
                    <div key={lineIndex} className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                      <strong className="text-green-600 dark:text-green-400">🔗 Quick Access</strong>
                      <ul className="mt-2 space-y-1">
                        {lines.slice(lineIndex + 1)
                          .filter(l => l.startsWith('•'))
                          .map((item, itemIndex) => (
                            <li key={itemIndex} className="text-sm text-gray-700 dark:text-gray-300">
                              {item.replace('•', '').trim()}
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  );
                }
                
                // Regular text formatting
                const parts = line.split(/(\*\*.*?\*\*|_.*?_|`.*?`)/g);
                return (
                  <p key={lineIndex} className="text-sm text-gray-700 dark:text-gray-300">
                    {parts.map((part, partIndex) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return (
                          <strong key={partIndex} className="text-blue-600 dark:text-blue-400">
                            {part.slice(2, -2)}
                          </strong>
                        );
                      }
                      if (part.startsWith('_') && part.endsWith('_')) {
                        return (
                          <em key={partIndex} className="text-gray-600 dark:text-gray-400">
                            {part.slice(1, -1)}
                          </em>
                        );
                      }
                      if (part.startsWith('`') && part.endsWith('`')) {
                        return (
                          <code key={partIndex} className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-xs">
                            {part.slice(1, -1)}
                          </code>
                        );
                      }
                      return <span key={partIndex}>{part}</span>;
                    })}
                  </p>
                );
              })}
            </div>
            
            {/* Add visual separator between sections except the last one */}
            {sectionIndex < sections.length - 1 && (
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}