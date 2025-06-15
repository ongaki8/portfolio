// src/app/components/shared/DesktopTrash.tsx
'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiTrash2, FiClock, FiRotateCw, FiList, FiGrid } from 'react-icons/fi';
import { fakeTrashItems, getFileIcon } from './trashData';

export default function DesktopTrash() {
  const [items, setItems] = useState(fakeTrashItems);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const handleRestore = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    setSelectedItem(null);
  };

  const handleEmptyTrash = () => {
    setItems([]);
    setSelectedItem(null);
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
            TRASH_BIN
          </h1>
        </motion.div>

        <hr className="border-t border-gray-300 dark:border-gray-700 my-8" />
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-500 dark:text-gray-400 font-mono text-sm sm:text-base">
            {`// Buffer zone for bytes on the edge.`}
          </p>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
              {items.length} FILE{items.length !== 1 ? 'S' : ''}
            </div>
            
            <div className="flex bg-gray-200 dark:bg-gray-800 rounded-xl px-2 py-2"> 
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg cursor-pointer ${viewMode === 'list' ? 'bg-gray-300 dark:bg-gray-700 text-blue-600 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                title="List View"
              >
                <FiList size={18} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg cursor-pointer ${viewMode === 'grid' ? 'bg-gray-300 dark:bg-gray-700 text-blue-600 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                title="Grid View"
              >
                <FiGrid size={18} />
              </button>
            </div>
          </div>
        </div>

        {items.length > 0 ? (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => setSelectedItem(selectedItem === index ? null : index)}
                  >
                    <div className={`p-4 rounded-xl mb-2 transition-all ${
                      selectedItem === index 
                        ? 'bg-blue-900/20 border-2 border-blue-500' 
                        : 'bg-gray-200 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 group-hover:border-gray-400 dark:group-hover:border-gray-600'
                    }`}>
                      {getFileIcon(item.name)}
                    </div>
                    <p className="text-gray-900 dark:text-white text-sm text-center max-w-full truncate px-1">
                      {item.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-200/70 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-3xl overflow-hidden mb-8">
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ backgroundColor: 'rgba(43, 43, 43, 0.15)' }}
                    className={`cursor-pointer border-b border-gray-300 dark:border-gray-700 last:border-b-0 ${
                      selectedItem === index ? 'bg-gray-300/70 dark:bg-gray-800/70' : ''
                    }`}
                    onClick={() => setSelectedItem(selectedItem === index ? null : index)}
                  >
                    <div className="p-4 flex items-center gap-4">
                      <div className="text-2xl">
                        {getFileIcon(item.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-gray-900 dark:text-white font-medium truncate">{item.name}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs mt-1 flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <FiClock size={12} /> {item.deleted}
                          </span>
                          <span>{item.size}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {selectedItem !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-200/80 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-3xl p-4 mb-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-medium flex items-center gap-3">
                      <span className="text-2xl">
                        {getFileIcon(items[selectedItem].name)}
                      </span>
                      {items[selectedItem].name}
                    </h3>
                    <div className="text-gray-500 dark:text-gray-400 text-sm mt-2 space-y-1">
                      <p className="flex items-center gap-2">
                        Deleted: {items[selectedItem].deleted}
                      </p>
                      <p>File Size: {items[selectedItem].size}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRestore(selectedItem);
                      }}
                      className="cursor-pointer px-3 py-1 bg-red-100 dark:bg-red-600/20 text-red-600 dark:text-red-400 rounded-md border border-red-300 dark:border-red-700/50 flex items-center gap-2"
                    >
                      <FiTrash2 size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEmptyTrash}
                className="cursor-pointer px-4 py-2 bg-red-100 dark:bg-red-600/20 font-medium text-red-600 dark:text-red-400 text-xs font-mono rounded-xl border border-red-300 dark:border-red-700/50 flex items-center gap-2"
              >
                <FiTrash2 size={14} /> EMPTY_TRASH
              </motion.button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-200/70 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-3xl">
            <div className="p-4 bg-gray-300 dark:bg-gray-900/30 rounded-full mb-4">
              <FiTrash2 className="text-gray-400 dark:text-gray-600" size={48} />
            </div>
            <h2 className="text-xl font-medium font-mono text-gray-900 dark:text-white mb-2">EMPTY_TRASH</h2>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-6 font-mono text-sm">
              0 files. 0 problems. Somewhere, a sysadmin smiles.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setItems(fakeTrashItems)}
              className="cursor-pointer px-4 py-2 bg-blue-100 dark:bg-blue-600/40 text-blue-600 dark:text-white text-xs rounded-xl border border-blue-600 dark:border-blue-600 flex items-center gap-2 font-medium"
            >
              <FiRotateCw size={16} /> RESTORE_FILES
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}