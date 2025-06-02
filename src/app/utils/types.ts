// src/app/utils/types.ts
import { ComponentType } from 'react';

export interface AppConfig {
  id: string;
  title: string;
  iconComponent: ComponentType<{
    size?: number;
    className?: string;
    style?: React.CSSProperties;
    [key: string]: any;
  }>;
  iconProps?: Record<string, any>;
  isFolder?: boolean;
  href?: string;
  isInDock?: boolean;
  folderItems?: string[];
  component?: string;
  folderIconComponent?: ComponentType<{
    size?: number;
    className?: string;
    style?: React.CSSProperties;
    [key: string]: any;
  }>;
}

export type DesktopViewProps = {
  apps: AppConfig[];
  onAppClick: (id: string | null) => void;
  onLock: () => void;
  onRestart: () => void;
  onShutdown: () => void;
};