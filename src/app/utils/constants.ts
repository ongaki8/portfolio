// src/app/utils/constants.ts
import { 
  User, GraduationCap, Briefcase, Folder, FileText, Sparkles, Mail,
  FolderOpen, Github, Globe, Code, Smartphone, Database, Layout,
  Server, Terminal, GalleryVerticalEnd, Trash2
} from 'lucide-react';
import { AppConfig } from './types';
import AIAssistantIcon from "../components/icons/AIAssistantIcon";

export const APPS: AppConfig[] = [
  // ============ MAIN APPLICATIONS ============
  { 
    id: 'about', 
    title: 'About Me', 
    iconComponent: User,
    component: 'AboutMe',
    iconProps: { size: 20 }
  },
  { 
    id: 'education', 
    title: 'Education', 
    iconComponent: GraduationCap,
    component: 'Education',
    iconProps: { size: 20 }
  },
  { 
    id: 'experience', 
    title: 'Experience', 
    iconComponent: Briefcase,
    component: 'Experience',
    iconProps: { size: 20 }
  },
  { 
    id: 'portfolio', 
    title: 'Portfolio', 
    iconComponent: GalleryVerticalEnd,
    component: 'Portfolio',
    iconProps: { size: 20 }
  },
  { 
    id: 'resume', 
    title: 'Resume', 
    iconComponent: FileText,
    component: 'Resume',
    iconProps: { size: 20 }
  },
  { 
    id: 'contact', 
    title: 'Contact Me', 
    iconComponent: Mail,
    component: 'Contact',
    iconProps: { size: 20 }
  },
  { 
    id: 'credits', 
    title: 'Credits', 
    iconComponent: Sparkles,
    component: 'Credits',
    iconProps: { size: 20 }
  },
  { 
    id: 'trash', 
    title: 'Trash', 
    iconComponent: Trash2,
    component: 'Trash',
    iconProps: { size: 20 }
  },
  { 
    id: 'ai-assistant', 
    title: 'AI Assistant', 
    iconComponent: AIAssistantIcon,
    component: 'DesktopAIAssistant',
    iconProps: { size: 20 }
  },

  // ============ FOLDERS ============
  { 
    id: 'projects-folder', 
    title: 'Projects', 
    iconComponent: Folder,
    folderIconComponent: FolderOpen,
    component: 'ProjectsFolder',
    iconProps: { size: 20 },
    isFolder: true,
    folderItems: [
      'portfolio-project',
      'web-project',
      'mobile-project',
      'api-project'
    ]
  }
];

export const ALL_APPS: AppConfig[] = [
  ...APPS,
  
  // ============ PROJECT ITEMS ============
  { 
    id: 'portfolio-project', 
    title: 'Portfolio', 
    iconComponent: Globe,
    component: 'PortfolioProject',
    iconProps: { size: 16 }
  },
  { 
    id: 'web-project', 
    title: 'Web App', 
    iconComponent: Layout,
    component: 'WebProject',
    iconProps: { size: 16 }
  },
  { 
    id: 'mobile-project', 
    title: 'Mobile App', 
    iconComponent: Smartphone,
    component: 'MobileProject',
    iconProps: { size: 16 }
  },
  { 
    id: 'api-project', 
    title: 'API Service', 
    iconComponent: Server,
    component: 'APIProject',
    iconProps: { size: 16 }
  },

  // ============ DEVELOPMENT ITEMS ============
  { 
    id: 'github-repos', 
    title: 'GitHub Repos', 
    iconComponent: Github,
    component: 'GithubRepos',
    iconProps: { size: 16 }
  },
  { 
    id: 'code-snippets', 
    title: 'Code Snippets', 
    iconComponent: Code,
    component: 'CodeSnippets',
    iconProps: { size: 16 }
  },
  { 
    id: 'terminal-scripts', 
    title: 'Terminal Scripts', 
    iconComponent: Terminal,
    component: 'TerminalScripts',
    iconProps: { size: 16 }
  }
];

// Helper functions
export const getAppById = (id: string) => ALL_APPS.find(app => app.id === id);

export const isFolder = (id: string) => {
  const app = getAppById(id);
  return app?.isFolder || false;
};

export const getFolderContents = (folderId: string) => {
  const folder = getAppById(folderId);
  if (!folder?.isFolder) return [];
  return folder.folderItems?.map(itemId => getAppById(itemId)).filter(Boolean) || [];
};