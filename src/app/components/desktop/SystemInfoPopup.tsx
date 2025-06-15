// src/app/components/desktop/SystemInfoPopup.tsx
'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Bell, AlertCircle } from 'lucide-react';
import Image from 'next/image';

interface SystemInfoPopupProps {
  onClose: () => void;
}

interface PerformanceData {
  realExperienceScore: number;
  metrics: {
    name: string;
    value: string;
    target: string;
    score: number;
  }[];
  deviceComparison: {
    desktop: { score: number; loading: string; fcp: string };
    mobile: { score: number; loading: string; fcp: string };
  };
}

const MANUAL_PERFORMANCE_DATA: PerformanceData = {
  realExperienceScore: 91,
  metrics: [
    { name: 'Largest Contentful Paint', value: '2.95s', target: '2.5s', score: 85 },
    { name: 'First Input Delay', value: '2ms', target: '100ms', score: 100 },
    { name: 'Cumulative Layer Shift', value: '0', target: '0.1', score: 100 },
    { name: 'Time to First Byte', value: '0.95s', target: '0.8s', score: 88 },
  ],
  deviceComparison: {
    desktop: { score: 91, loading: '1.1s', fcp: '2.43s' },
    mobile: { score: 90, loading: '2.3s', fcp: '1.2s' },
  }
};

export default function SystemInfoPopup({ onClose }: SystemInfoPopupProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'performance'>('about');
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab === 'performance' && !performanceData) {
      loadPerformanceData();
    }
  }, [activeTab]);

  const loadPerformanceData = () => {
    setLoading(true);
    try {
      setPerformanceData(MANUAL_PERFORMANCE_DATA);
    } catch (err) {
      console.error('Error loading performance data:', err);
      setError('Failed to load performance data');
      setPerformanceData(MANUAL_PERFORMANCE_DATA);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 flex items-center justify-center z-[100]"
      onClick={onClose}
    >
      <div
        className="bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700 w-[600px] max-w-[90vw] max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Centered Header */}
        {/* <div className="flex items-center justify-between px-6 py-4 border-gray-700">
          <div className="flex-1"></div>
          <h2 className="text-xl font-semibold text-gray-200 flex-1 text-center">
            {activeTab === 'about' ? 'Portfolio' : 'Performance Metrics'}
          </h2>
          <div className="flex-1 flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white cursor-pointer transition-colors"
            >
              ✕
            </button>
          </div>
        </div> */}

        {/* Centered Tabs */}
        <div className="flex justify-center px-4 pt-2 mt-3 mb-3">
          <div className="flex bg-gray-600/40 dark:bg-gray-700/50 rounded-2xl p-1.5">
            <button
              className={`px-4 py-1.5 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-gray-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('about')}
            >
              ABOUT
            </button>
            <button
              className={`px-4 py-1.5 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                activeTab === 'performance'
                  ? 'bg-gray-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('performance')}
            >
              PERFORMANCE
            </button>
          </div>
        </div>

         <div className="overflow-y-auto flex-1 p-6">
          {activeTab === 'about' ? (
            <>
              <div className="flex items-center justify-center gap-6 mb-9">
                <div className="bg-gray-700 dark:bg-gray-700 rounded-2xl p-4 flex items-center justify-center">
                  <div className="w-12 h-12 p-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <div className="w-full h-full rounded-2xl overflow-hidden">
                        <Image
                        src="/icon.png"
                        alt="Profile"
                        width={64}
                        height={64}
                        className="object-cover"
                        />
                    </div>
                    </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium font-mono text-gray-200">Portfolio OS by ONG</h3>
                  <p className="text-sm text-gray-400 mt-2">Version 1.0 (2025 Release)</p>
                  <p className="text-sm text-gray-400">React, Next.js, Tailwind CSS</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div className="bg-gray-600/40 dark:bg-gray-700/50 rounded-2xl hover:border hover:border-gray-500 cursor-pointer p-4 flex flex-col items-center justify-center text-center">
                  <p className="text-gray-400 text-sm">Developer</p>
                  <p className="text-gray-200 text-lg font-mono mt-1">Brian Ongaki</p>
                </div>
                <div className="bg-gray-600/40 dark:bg-gray-700/50 rounded-2xl hover:border hover:border-gray-500 cursor-pointer p-4 flex flex-col items-center justify-center text-center">
                  <p className="text-gray-400 text-sm">Framework</p>
                  <p className="text-gray-200 text-lg font-mono mt-1">Next.js 14</p>
                </div>
                <div className="bg-gray-600/40 dark:bg-gray-700/50 rounded-2xl hover:border hover:border-gray-500 cursor-pointer p-4 flex flex-col items-center justify-center text-center">
                  <p className="text-gray-400 text-sm">UI Library</p>
                  <p className="text-gray-200 text-lg font-mono mt-1">Tailwind CSS</p>
                </div>
                <div className="bg-gray-600/40 dark:bg-gray-700/50 rounded-2xl hover:border hover:border-gray-500 cursor-pointer p-4 flex flex-col items-center justify-center text-center">
                  <p className="text-gray-400 text-sm">Animation</p>
                  <p className="text-gray-200 text-lg font-mono mt-1">Framer Motion</p>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              {loading && !performanceData ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : error ? (
                <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <p className="text-red-400">{error}</p>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Showing Speed Insights</p>
                </div>
              ) : null}

              {performanceData && (
                <>
                  <div className="bg-gradient-to-r from-gray-900/30 to-gray-800/30 border border-green-400 rounded-3xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400 font-bold">REAL EXPERIENCE SCORE</p>
                        <p className="text-3xl font-mono font-bold text-white">
                          {performanceData.realExperienceScore}
                          <span className="text-sm text-gray-400 ml-1">/ 100</span>
                        </p>
                      </div>
                      <div className="w-24 h-24 relative">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#2D3748"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#06df73"
                            strokeWidth="3"
                            strokeDasharray={`${performanceData.realExperienceScore}, 100`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-mono font-bold text-white">
                            {performanceData.realExperienceScore}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-md font-medium font-mono text-gray-200">CORE WEB VITALS</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {performanceData.metrics.map((metric) => (
                        <div key={metric.name} className="bg-gray-600/40 dark:bg-gray-700/50 rounded-2xl hover:border hover:border-gray-500 cursor-pointer p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-gray-200">
                                {metric.name}
                              </p>
                              <p className="text-xs text-gray-400">Target: {metric.target}</p>
                            </div>
                            <span
                              className={`px-2 py-1 rounded text-xs font-bold ${
                                metric.score >= 90
                                  ? 'bg-green-600/30 text-green-400'
                                  : metric.score >= 75
                                  ? 'bg-yellow-600/30 text-yellow-400'
                                  : 'bg-red-600/30 text-red-400'
                              }`}
                            >
                              {metric.score}
                            </span>
                          </div>
                          <p className="text-xl font-semibold font-mono text-white mt-1">
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-medium font-mono text-gray-200 mb-3">
                      DEVICE COMPARISON
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-600/40 dark:bg-gray-700/50 rounded-2xl hover:border hover:border-gray-500 cursor-pointer p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                          <p className="text-sm font-medium text-gray-200">Desktop</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-400">
                            Score: <span className="text-white font-mono">
                              {performanceData.deviceComparison.desktop.score}
                            </span>
                          </p>
                          <p className="text-sm text-gray-400">
                            Loading: <span className="text-white font-mono">
                              {performanceData.deviceComparison.desktop.loading}
                            </span>
                          </p>
                          <p className="text-sm text-gray-400">
                            FCP: <span className="text-white font-mono">
                              {performanceData.deviceComparison.desktop.fcp}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="bg-gray-600/40 dark:bg-gray-700/50 rounded-2xl hover:border hover:border-gray-500 cursor-pointer p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                          <p className="text-sm font-medium text-gray-200">Mobile</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-400">
                            Score: <span className="text-white font-mono">
                              {performanceData.deviceComparison.mobile.score}
                            </span>
                          </p>
                          <p className="text-sm text-gray-400">
                            Loading: <span className="text-white font-mono">
                              {performanceData.deviceComparison.mobile.loading}
                            </span>
                          </p>
                          <p className="text-sm text-gray-400">
                            FCP: <span className="text-white font-mono">
                              {performanceData.deviceComparison.mobile.fcp}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="mt-auto p-4 border-t border-gray-600 dark:border-gray-700">
          {activeTab === 'about' ? (
            <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-2xl text-sm font-medium transition-colors cursor-pointer">
              Check for Updates...
            </button>
          ) : (
            <div className="flex justify-center items-center text-xs text-gray-400">
              <p>Powered by Vercel Speed Insights</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}