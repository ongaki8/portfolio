// app/api/gemini/responseFormatter.ts
import { createSkillVisual, createProgressBar } from './skillVisualizer';

function hasKeywords(text: string, keywords: string[]): boolean {
  return keywords.some(kw => new RegExp(`\\b${kw}\\b`, 'i').test(text));
}

export function formatResponse(rawResponse: string, query: string): string {
  let formatted = rawResponse.trim();
  const sections: string[] = [];
  
  sections.push(formatted);

  // CMS
  if (hasKeywords(formatted, ['WordPress', 'Shopify', 'CMS']) &&
      formatted.match(/WordPress|Shopify/gi)?.length! >= 2) {
    sections.push(createSection('🌐 CMS Expertise', [
      'WordPress: High Proficiency',
      'Shopify: High Proficiency', 
      '10+ websites managed',
      '35% faster load times',
      '20% higher conversion rates'
    ]));
  }

  // Data & Automation
  if (hasKeywords(formatted, ['Python', 'Data', 'MATLAB', 'automation'])) {
    sections.push(createSection('🐍 Data & Automation', [
      'Python',
      'Data Visualization',
      'Custom Analytics Tools',
      'Streamlit Dashboards',
    ]));
  }

  // Projects
  if (hasKeywords(formatted, ['REBAC', 'Trendsetter', 'portfolio site', 'delivered app', 'built project'])) {
    sections.push(createSection('🚀 Project Portfolio', [
      'E-commerce Stores',
      'Web Applications', 
      'Mobile Apps',
      'Data Dashboards',
      '3D Interactive Portfolio'
    ]));
  }

  // Experience
  if (hasKeywords(formatted, ['TriT', 'digiREB', 'experience at', 'worked for'])) {
    sections.push(createSection('💼 Professional Experience', [
      'Web Developer at TriT Group',
      'Web Developer at digiREB',
      'Full Stack Developer at REBAC',
    ]));
  }

  // Education
  if (hasKeywords(formatted, ['M.Sc', 'Bachelor', 'university', 'degree'])) {
    sections.push(createSection('🎓 Education & Credentials', [
      'M.Sc. Aerospace Engineering - TUM',
      'B.Eng. Aeronautical Engineering - SAU',
      'Python/Matlab Proficiency',
      'Thesis Projects',
      'Academic Publications'
    ]));
  }

  // Awards
  if (hasKeywords(formatted, ['certificate', 'award', 'scholarship'])) {
    sections.push(createSection('🏆 Awards & Recognition', [
      'TUM Asia-DAAD Scholarship',
      'University Scholarship Awards',
      'GE Aerospace Certification',
      'Academic Publications',
      'Research Achievements'
    ]));
  }

  // Fallback
  if (sections.length === 1) {
    sections.push(createSection('💡 Key Information', [
      'Comprehensive professional profile',
      'Diverse skill set across multiple domains',
      'Strong technical and analytical capabilities'
    ]));
  }

  // Call to action
  sections.push(`
💬 Follow-Up Questions
• "Can you tell me more about your [specific project/technology]?"
• "What metrics did you achieve with [specific skill]?"
• "How can I see demos of your work?"

🔗 Quick Access
• Check the Projects folder for live demos
• View Experience for detailed work history  
• See Education for academic background
  `.trim());

  return sections.join('\n\n---\n\n');
}

function createSection(title: string, highlights: string[]): string {
  return `
${title}

**✨ Highlights:**
${highlights.map(h => `• ${h}`).join('\n')}
  `.trim();
}