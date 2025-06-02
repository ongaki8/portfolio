// src/app/components/shared/contactData.ts
import { FiLinkedin, FiGithub, FiMail, FiPhone, FiPhoneCall } from 'react-icons/fi';
import { FaLinkedin, FaGithub, FaWhatsapp, FaComment, FaComments, FaFacebookMessenger, FaEnvelope, FaPhone, FaWhatsappSquare } from 'react-icons/fa';
import { FaPhoneFlip, FaSquareWhatsapp } from 'react-icons/fa6';

export const socialLinks = [
  { 
    icon: <FiMail size={24} />, 
    hoverIcon: <FaEnvelope size={24} />,
    name: 'Email', 
    url: 'mailto:b8ongaki@icloud.com',
    color: 'text-[#EA4335]'
  },

  { 
    icon: <FaWhatsapp size={24} />, 
    hoverIcon: <FaSquareWhatsapp size={24} />,
    name: 'WhatsApp', 
    url: 'https://wa.me/971561472975',
    color: 'text-[#25D366]'
  },
  
  { 
    icon: <FiPhone size={24} />, 
    hoverIcon: <FiPhoneCall size={24} />,
    name: 'Phone', 
    url: 'tel:971561472975',
    color: 'text-[#34B7F1]'
  },
];

export const formInitialState = {
  name: '',
  email: '',
  message: ''
};

export const emailPattern = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: "Invalid email address"
};