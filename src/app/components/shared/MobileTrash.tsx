// src/app/components/shared/MobileTrash.tsx
'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiTrash2, FiClock, FiRotateCw, FiList, FiGrid } from 'react-icons/fi';
import { fakeTrashItems, getFileIcon } from './trashData';

export default function MobileTrash() {
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
    <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4 overflow-auto">
      <div className="mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-4 mb-8"
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-2">
            TRASH_BIN
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-mono text-xs">
            {`// Buffer zone for bytes on the edge.`}
          </p>
        </motion.div>

        <hr className="border-t border-gray-300 dark:border-gray-700 my-8" />

        <div className="flex justify-between items-center mb-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
            {items.length} FILE{items.length !== 1 ? 'S' : ''}
          </div>
          <div className="flex bg-gray-200 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg cursor-pointer ${viewMode === 'list' ? 'bg-gray-300 dark:bg-gray-700 text-blue-600 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
              title="List View"
            >
              <FiList size={16} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg cursor-pointer ${viewMode === 'grid' ? 'bg-gray-300 dark:bg-gray-700 text-blue-600 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
              title="Grid View"
            >
              <FiGrid size={16} />
            </button>
          </div>
        </div>

        {items.length > 0 ? (
          <>
            {viewMode === 'grid' ? (
              <div className="bg-gray-200/70 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-3xl p-4 mb-6">
                <div className="grid grid-cols-2 gap-3">
                  {items.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center cursor-pointer group"
                      onClick={() => setSelectedItem(selectedItem === index ? null : index)}
                    >
                      <div className={`p-3 rounded-2xl mb-1 w-full transition-all ${
                        selectedItem === index 
                          ? 'bg-blue-900/20 border-2 border-blue-500' 
                          : 'bg-gray-200 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 group-hover:border-gray-400 dark:group-hover:border-gray-600'
                      }`}>
                        <div className="flex justify-center">
                          {getFileIcon(item.name)}
                        </div>
                      </div>
                      <p className="text-gray-900 dark:text-white text-xs text-center max-w-full truncate px-1">
                        {item.name}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-gray-200/70 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-3xl p-4 overflow-hidden mb-6">
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      backgroundColor: 
                        typeof window !== 'undefined' && document.documentElement.classList.contains('dark')
                          ? 'rgba(39, 39, 42, 0.7)'
                          : 'rgba(229,231,235,0.7)'
                    }}
                    className={`cursor-pointer border-b border-gray-300 dark:border-gray-700 ${
                      selectedItem === index ? 'bg-gray-300/70 dark:bg-gray-800/70 rounded-2xl' : ''
                    }`}
                    onClick={() => setSelectedItem(selectedItem === index ? null : index)}
                  >
                    <div className="p-3 flex items-center gap-3">
                      <div className="text-xl">
                        {getFileIcon(item.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-gray-900 dark:text-white font-medium truncate text-sm">{item.name}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs mt-1 flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <FiClock size={10} /> {item.deleted}
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
                className="bg-gray-200/80 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-3xl p-5 mb-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-medium flex items-center gap-2 text-sm">
                      <span className="text-xl">
                        {getFileIcon(items[selectedItem].name)}
                      </span>
                      {items[selectedItem].name}
                    </h3>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1 space-y-1">
                      <p className="flex items-center gap-1">
                        Deleted: {items[selectedItem].deleted}
                      </p>
                      <p>File Size: {items[selectedItem].size}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRestore(selectedItem);
                      }}
                      className="cursor-pointer px-2 py-1 bg-red-100 dark:bg-red-600/20 text-red-600 dark:text-red-400 rounded-md border border-red-300 dark:border-red-700/50 flex items-center gap-1"
                    >
                      <FiTrash2 size={14} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEmptyTrash}
                className="cursor-pointer px-3 py-1.5 bg-red-100 dark:bg-red-600/20 text-red-600 dark:text-red-400 text-xs font-mono rounded-lg border border-red-300 dark:border-red-700/50 flex items-center gap-2"
              >
                <FiTrash2 size={12} /> EMPTY_TRASH
              </motion.button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 bg-gray-200/70 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-3xl">
            <div className="p-3 bg-gray-300 dark:bg-gray-900/30 rounded-full mb-1">
              <FiTrash2 className="text-gray-400 dark:text-gray-600" size={30} />
            </div>
            <h2 className="text-lg font-medium font-mono text-gray-900 dark:text-white mb-1">EMPTY_TRASH</h2>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-4 font-mono text-xs">
              0 files. 0 problems. Somewhere, a sysadmin smiles.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setItems(fakeTrashItems)}
              className="cursor-pointer px-3 py-1.5 bg-blue-100 dark:bg-blue-600/50 text-blue-600 dark:text-white text-xs rounded-lg flex items-center gap-1 mb-4 font-medium"
            >
              <FiRotateCw size={14} /> RESTORE
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}