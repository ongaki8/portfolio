// src/app/components/shared/aboutMeData.ts
import { Code, Database, GitBranch, BarChart2, Settings, LayoutTemplate, ShoppingCart, Star, Zap, Circle } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWordpress, faShopify, faWordpressSimple } from '@fortawesome/free-brands-svg-icons'

export const skillCategories = [
  {
    name: 'Frontend',
    icon: <Code className="text-blue-500" />,
    skills: [
      { name: 'HTML5', level: 80 },
      { name: 'CSS3', level: 78 },
      { name: 'JavaScript', level: 80 },
      { name: 'TypeScript', level: 75 },
      { name: 'React.js', level: 70 }
    ]
  },
  {
    name: 'Backend',
    icon: <Database className="text-green-500" />,
    skills: [
      { name: 'PHP', level: 75 },
      { name: 'Python', level: 85 },
      { name: 'Node.js', level: 70 },
      { name: 'REST APIs', level: 60 },
      { name: 'PostgreSQL', level: 70 }
    ]
  },
  {
    name: 'Developer Tools',
    icon: <GitBranch className="text-purple-500" />,
    skills: [
      { name: 'Git & GitHub', level: 80 },
      { name: 'Visual Studio Code', level: 95 },
      { name: 'Android Studio', level: 80 },
      { name: 'Xcode', level: 80 }
    ]
  },
  {
    name: 'Data & Automation',
    icon: <BarChart2 className="text-yellow-500" />,
    skills: [
      { name: 'Data Visualization', level: 95 }
    ]
  },
  {
    name: 'Other',
    icon: <Settings className="text-red-500" />,
    skills: [
      { name: 'UI/UX Optimization', level: 80 },
      { name: 'Photoshop', level: 80 }
    ]
  }
];

export const languages = [
  { name: 'English', level: 100, flag: '🇬🇧' },
  { name: 'Kiswahili', level: 100, flag: '🇰🇪' }
];

export const cmsSkills = [
  { name: 'WordPress', icon: <FontAwesomeIcon icon={faWordpress} className="text-blue-500" />, level: 90 },
  { name: 'Shopify', icon: <FontAwesomeIcon icon={faShopify} className="text-green-500" />, level: 75 },
];

export const proficiencyScale = [
  {
    range: <span className="text-green-500">90 – 100%</span>,
    level: "Highly Proficient",
    description: "I can work independently and solve complex problems.",
    icon: <Star className="text-green-500" />,
    color: "from-green-400 to-green-600"
  },
  {
    range: <span className="text-blue-500">70 – 89%</span>,
    level: "Strong Working Knowledge",
    description: "I can work independently, but may need support on highly advanced tasks.",
    icon: <Zap className="text-blue-500" />,
    color: "from-blue-400 to-blue-600"
  },
  {
    range: <span className="text-yellow-500">50 – 69%</span>,
    level: "Intermediate",
    description: "I understand the fundamentals and can contribute, but still growing",
    icon: <Circle className="text-yellow-500" />,
    color: "from-yellow-400 to-yellow-600"
  },
];

export const getProgressColor = (level: number) => {
  if (level >= 90) return "from-green-400 to-green-600";
  if (level >= 70) return "from-blue-400 to-blue-600";
  if (level >= 50) return "from-yellow-400 to-yellow-600";
  return "from-gray-400 to-gray-600";
};

export const aboutMeText = {
  intro: "Deeply passionate about leveraging technology to solve real-world problems. With a multidisciplinary background spanning IT and engineering, I specialize in building efficient, scalable digital solutions that enhance user experiences and streamline business operations.",
  experience: "Over the years, I have contributed to diverse projects, from AI-driven tools and custom dashboards for data analysis and visualization to CMS platforms like WordPress and Shopify. These experiences have strengthened my ability to bridge technical execution with practical business needs, delivering results that are both innovative and impactful.",
  goals: "I am currently seeking roles that allow me to further explore the intersection of technology and business operations. I'm excited to apply my skills to meaningful projects that drive innovation and create measurable value.",
  location: "Based in United Arab Emirates",
  mobileIntro: "Passionate about leveraging technology to solve real-world problems. Multidisciplinary background in IT and engineering, specializing in efficient, scalable digital solutions.",
  mobileExperience: "Contributed to diverse projects including AI tools, data dashboards, and CMS platforms. Bridging technical execution with business needs.",
  mobileGoals: "Seeking roles exploring technology and business operations intersection."
};