import type { JSX } from 'react';
import { FiCode, FiImage, FiAlignLeft, FiFile } from 'react-icons/fi';

export const fileIcons: Record<string, JSX.Element> = {
  'sh': <FiCode className="text-red-500" size={24} />,
  'jpg': <FiImage className="text-blue-500" size={24} />,
  'png': <FiImage className="text-green-500" size={24} />,
  'txt': <FiAlignLeft className="text-yellow-500" size={24} />,
  'docx': <FiFile className="text-blue-500" size={24} />,
  'default': <FiFile className="text-gray-400" size={24} />
};

export const fakeTrashItems = [
  { 
    name: '404_Excuses_Not_Found.docx', 
    deleted: '2 days ago',
    size: '2.4 MB',
    type: 'docx'
  },
  { 
    name: 'CtrlZ_Recovery_Script.sh', 
    deleted: '1 week ago',
    size: '1.2 MB',
    type: 'sh'
  },
  { 
    name: 'Project_Idea_Notes.txt', 
    deleted: '2 weeks ago',
    size: '0.1 MB',
    type: 'txt'
  },
  { 
    name: 'Screen_Shot_2025-04-15.png', 
    deleted: '1 month ago',
    size: '3.7 MB',
    type: 'png'
  },
];

export const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase() || 'default';
  return fileIcons[extension] || fileIcons['default'];
};