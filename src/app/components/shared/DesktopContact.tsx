// src/app/components/shared/DesktopContact.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { socialLinks, formInitialState } from '../shared/contactData';
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { FiLinkedin, FiGithub, FiMail, FiPhone } from 'react-icons/fi';

export default function DesktopContact() {
  const [formData, setFormData] = useState({
    ...formInitialState,
    email: '' // Added email field
  });
  const [activeTab, setActiveTab] = useState<'social' | 'form'>('social');
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (submitStatus) setSubmitStatus(null); // Clear status when editing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus({ 
          success: true, 
          message: 'MESSAGE_TRANSMITTED.' 
        });
        setFormData({ ...formInitialState, email: '' });
      } else {
        setSubmitStatus({ 
          success: false, 
          message: data.error || 'TRANSMISSION_ERROR. TRY_AGAIN.' 
        });
      }
    } catch (error) {
      setSubmitStatus({ 
        success: false, 
        message: 'NETWORK_ERROR. TRY_AGAIN' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 overflow-auto">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          CONNECT_WITH_ME
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-mono text-base">
          {`// Let's build the future, one function at a time.`}
        </p>
      </motion.div>

      <hr className="border-t border-gray-300 dark:border-gray-700 my-8" />

      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-200 dark:bg-gray-800 rounded-2xl p-1 border border-gray-300 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('social')}
            className={`px-4 py-2 rounded-xl font-mono text-sm font-medium transition-all ${
              activeTab === 'social'
                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-600/30 cursor-pointer'
                : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white cursor-pointer'
            }`}
          >
            SOCIAL_TERMINAL
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`px-4 py-2 rounded-xl font-mono text-sm font-medium transition-all ${
              activeTab === 'form'
                ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 border border-purple-500/30 cursor-pointer'
                : 'text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white cursor-pointer'
            }`}
          >
            MESSAGE_CONSOLE
          </button>
        </div>
      </div>

      <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-300 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
        {activeTab === 'social' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-8"
          >
            <h2 className="text-xl font-mono font-medium text-blue-600 dark:text-blue-400 mb-6 flex items-center">
              <span className="inline-block w-3 h-3 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
              PING_ME
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-2xl border border-gray-300 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all ${
                    index === isHovering
                      ? 'bg-blue-50 dark:bg-gray-800/50'
                      : 'bg-gray-100/70 dark:bg-gray-900/50'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  onHoverStart={() => setIsHovering(index)}
                  onHoverEnd={() => setIsHovering(null)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`${social.color} transition-transform ${index === isHovering ? 'scale-110' : ''}`}>
                      {index === isHovering ? social.hoverIcon : social.icon}
                    </div>
                    <div>
                      <h3 className="text-gray-900 dark:text-white font-medium">{social.name}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-xs font-mono truncate">
                        {social.url.replace('mailto:', '').replace('tel:', '')}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'form' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-8"
          >
            <h2 className="text-xl font-mono font-medium text-purple-600 dark:text-purple-400 mb-6 flex items-center">
              <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
              TRANSMIT_MESSAGE
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-mono text-gray-500 dark:text-gray-400 mb-2">
                    USER_IDENTIFIER
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 font-mono text-sm"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-gray-500 dark:text-gray-400 mb-2">
                    CONTACT_ADDRESS
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 font-mono text-sm"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-gray-500 dark:text-gray-400 mb-2">
                    MESSAGE_CONTENT
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 font-mono text-sm"
                    placeholder="Type your message here..."
                  />
                </div>
              </div>

              {submitStatus && (
                <div className={`p-3 rounded text-center font-mono text-sm ${
                  submitStatus.success
                    ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-800/50'
                    : 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <div className="flex justify-center">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-6 py-3 bg-gradient-to-r from-purple-100 dark:from-purple-900/50 to-purple-100 dark:to-purple-900/50 rounded-xl text-purple-600 dark:text-purple-300 font-mono text-sm font-medium border border-purple-300 dark:border-purple-500/30 hover:shadow-lg transition-all cursor-pointer ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      TRANSMITTING...
                    </span>
                  ) : (
                    'SEND_TRANSMISSION'
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-blue-600/10 filter blur-3xl pointer-events-none"></div>
    </div>
  </div>
);
}