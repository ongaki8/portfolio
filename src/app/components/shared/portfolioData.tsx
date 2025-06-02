// src/app/components/shared/portfolioData.tsx
import { 
  Code, 
  Globe, 
  MoveRight, 
  Expand, 
  Shrink, 
  Video, 
  Terminal, 
  AppWindowMac 
} from 'lucide-react';

export const projects = [
  {
    id: 1,
    title: 'Munetsi Foundation',
    description: 'Nonprofit website developed using WordPress with custom donation integration.',
    tags: ['WordPress', 'Elementor', 'CSS', 'PHP', 'MySQL'],
    image: '/projects/munetsi.jpg',
    link: 'https://marshallmunetsi.org',
    hasWalkthrough: false
  },
  {
    id: 2,
    title: 'Airline Analytics Dashboard',
    description: 'Data-driven airline analytics dashboard with real-time flight tracking and statistics.',
    tags: ['Python', 'Streamlit', 'Pandas', 'Matplotlib'],
    image: '/projects/dashboard.jpg',
    link: null,
    hasWalkthrough: true
  },
  {
    id: 3,
    title: 'REBAC Store',
    description: 'Fashion eCommerce platform with WooCommerce integration and custom theme.',
    tags: ['WordPress', 'WooCommerce', 'Elementor', 'PHP'],
    image: '/projects/rebac-web.jpg',
    link: 'https://reb.ac',
    hasWalkthrough: false
  },
  {
    id: 4,
    title: 'Trendsetter Babe Store',
    description: 'High-conversion Shopify store with custom liquid templates and mobile-first design.',
    tags: ['Shopify', 'Liquid', 'CSS', 'JavaScript'],
    image: '/projects/trendsetterbabe.jpg',
    link: 'https://trendsetterbabe.com',
    hasWalkthrough: false
  },
  {
    id: 5,
    title: 'Client SOS App Concept',
    description: 'Emergency response app with location tracking and instant alert system.',
    tags: ['React Native', 'JavaScript', 'Supabase', 'PostgreSQL'],
    image: '/projects/concept.jpg',
    link: null,
    hasWalkthrough: true
  },
  {
    id: 6,
    title: 'REBAC Fashion App',
    description: 'Cross-platform mobile app for fashion eCommerce with smooth animations.',
    tags: ['Flutter', 'Dart', 'REST API', 'Firebase'],
    image: '/projects/rebac.jpg',
    link: null,
    hasWalkthrough: true
  },
  {
    id: 7,
    title: 'App Website',
    description: 'WordPress site for showcasing and downloading on mobile devices.',
    tags: ['WordPress', 'Elementor', 'CSS', 'PHP', 'MySQL'],
    image: '/projects/rebac-app.jpg',
    link: 'https://app.reb.ac',
    hasWalkthrough: false
  }
];

export const allTags = [...new Set(projects.flatMap(project => project.tags))];

export const portfolioText = {
  title: 'PROJECT_ARCHIVE',
  subtitle: '// Deployed without causing a 500',
  notification: "I'd love to console.log(allProjects), but some are wrapped in clientConfidential().",
  noProjects: {
    title: 'NO_PROJECTS_FOUND',
    message: 'Try selecting a different technology filter',
    button: 'RESET_FILTERS'
  },
  walkthrough: {
    title: 'WALKTHROUGH AVAILABLE ON REQUEST',
    message: 'A detailed demo walkthrough is available upon request. Contact me to schedule a live showcase.',
    buttons: {
      request: 'REQUEST_DEMO',
      close: 'CLOSE'
    }
  },
  terminal: {
    command: '$ view_mode',
    status: 'Currently Viewing:'
  },
  viewModes: {
    withMenu: 'GRID_WITH_MENU',
    withoutMenu: 'GRID_WITHOUT_MENU'
  }
};

export const icons = {
  Code,
  Globe,
  MoveRight,
  Expand,
  Shrink,
  Video,
  Terminal,
  AppWindowMac
};

export const techColors: Record<string, string> = {
  WordPress: 'bg-blue-500/20 text-blue-400',
  Elementor: 'bg-purple-500/20 text-purple-400',
  CSS: 'bg-cyan-500/20 text-cyan-400',
  PHP: 'bg-indigo-500/20 text-indigo-400',
  MySQL: 'bg-orange-500/20 text-orange-400',
  Python: 'bg-yellow-500/20 text-yellow-400',
  Streamlit: 'bg-red-500/20 text-red-400',
  Pandas: 'bg-green-500/20 text-green-400',
  Matplotlib: 'bg-blue-500/20 text-blue-400',
  WooCommerce: 'bg-purple-500/20 text-purple-400',
  Shopify: 'bg-green-500/20 text-green-400',
  Liquid: 'bg-red-500/20 text-red-400',
  JavaScript: 'bg-yellow-500/20 text-yellow-400',
  'React Native': 'bg-blue-500/20 text-blue-400',
  Supabase: 'bg-green-500/20 text-green-400',
  PostgreSQL: 'bg-blue-500/20 text-blue-400',
  Flutter: 'bg-cyan-500/20 text-cyan-400',
  Dart: 'bg-blue-500/20 text-blue-400',
  'REST API': 'bg-green-500/20 text-green-400',
  Firebase: 'bg-orange-500/20 text-orange-400'
};

export const getTechColor = (tech: string) => {
  return techColors[tech] || 'bg-gray-700 text-gray-300';
};