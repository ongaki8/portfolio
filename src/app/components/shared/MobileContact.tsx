// src/app/components/shared/MobileContact.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { socialLinks, formInitialState, emailPattern } from './contactData';
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { FiLinkedin, FiGithub, FiMail, FiPhone } from 'react-icons/fi';

export default function MobileContact() {
  const [formData, setFormData] = useState(formInitialState);
  const [activeTab, setActiveTab] = useState<'social' | 'form'>('social');
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.value.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Clear submit status when editing
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
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
        setFormData(formInitialState);
      } else {
        setSubmitStatus({ 
          success: false, 
          message: data.error || 'TRANSMISSION_ERROR. TRY_AGAIN.' 
        });
      }
    } catch (error) {
      setSubmitStatus({ 
        success: false, 
        message: 'NETWORK_ERROR. TRY_AGAIN.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 p-4 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-4 mb-8"
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-2">
            CONNECT_WITH_ME
          </h1>
          <p className="text-gray-400 font-mono text-sm">
            {`// Let's build the future, one function at a time.`}
          </p>
        </motion.div>

        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-gray-800 rounded-lg p-1 border border-gray-700">
            <button
              onClick={() => setActiveTab('social')}
              className={`px-3 py-1.5 rounded-md font-mono text-xs font-medium transition-all ${
                activeTab === 'social' 
                  ? 'bg-blue-900/50 text-blue-400 border border-blue-500/30' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              SOCIAL
            </button>
            <button
              onClick={() => setActiveTab('form')}
              className={`px-3 py-1.5 rounded-md font-mono text-xs font-medium transition-all ${
                activeTab === 'form' 
                  ? 'bg-purple-900/50 text-purple-400 border border-purple-500/30' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              MESSAGE
            </button>
          </div>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden shadow-xl">
          {activeTab === 'social' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-4"
            >
              <h2 className="text-lg font-mono text-blue-400 mb-4 flex items-center">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                PING_ME
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg border border-gray-800 hover:border-gray-700 transition-all ${
                      index === isHovering ? 'bg-gray-800/50' : 'bg-gray-900/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => setIsHovering(index)}
                    onHoverEnd={() => setIsHovering(null)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`${social.color} transition-transform ${
                        index === isHovering ? 'scale-110' : ''
                      }`}>
                        {index === isHovering ? social.hoverIcon : social.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-sm">{social.name}</h3>
                        <p className="text-gray-400 text-xs font-mono truncate">
                          {social.url.replace('mailto:', '').replace('tel:', '').replace('https://', '')}
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
              className="p-4"
            >
              <h2 className="text-lg font-mono text-purple-400 mb-4 flex items-center">
                <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                TRANSMIT_MESSAGE
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">
                      NAME
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 bg-gray-800 border ${
                        errors.name ? 'border-red-500/50' : 'border-gray-700'
                      } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 font-mono text-sm`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs font-mono mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 bg-gray-800 border ${
                        errors.email ? 'border-red-500/50' : 'border-gray-700'
                      } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 font-mono text-sm`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs font-mono mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">
                      MESSAGE
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 bg-gray-800 border ${
                        errors.message ? 'border-red-500/50' : 'border-gray-700'
                      } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 font-mono text-sm`}
                      placeholder="Your message"
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs font-mono mt-1">{errors.message}</p>
                    )}
                  </div>
                </div>

                {submitStatus && (
                  <div className={`text-center font-mono text-xs p-2 rounded ${
                    submitStatus.success 
                      ? 'text-green-400 bg-green-900/20 border border-green-800/50' 
                      : 'text-red-400 bg-red-900/20 border border-red-800/50'
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
                    className={`px-4 py-2 bg-gradient-to-r from-purple-900/50 to-purple-900/50 rounded-lg text-purple-300 font-mono text-xs font-medium border border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all mb-1 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        SENDING...
                      </span>
                    ) : (
                      'SEND MESSAGE'
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </div>

        <div className="absolute bottom-6 right-6 w-24 h-24 rounded-full bg-blue-500/10 filter blur-2xl pointer-events-none"></div>
      </div>
    </div>
  );
}