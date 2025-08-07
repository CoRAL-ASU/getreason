import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Play, Pause, Info } from 'lucide-react';
import architectureDiagram from '../../assets/images/diagrams/GETReason_architecture.drawio_1.png';

export const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAgent, setActiveAgent] = useState<string | null>(null);

  const agents = [
    {
      id: 'geospatial',
      title: 'Geospatial Agent',
      description: 'Analyzes location context and spatial relationships',
      color: 'from-purple-200/40 to-purple-300/40'
    },
    {
      id: 'event',
      title: 'Event Agent',
      description: 'Identifies news events and social relevance',
      color: 'from-orange-200/40 to-red-200/40'
    },
    {
      id: 'temporal',
      title: 'Temporal Agent',
      description: 'Understands time-based relationships and sequences',
      color: 'from-cyan-200/40 to-teal-200/40'
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with pattern and gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-neural-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/95 via-blue-600/90 to-blue-700/95 animated-gradient"></div>
      </div>

      <div className="container-custom relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
              <span className="text-sm font-medium">ACL 2025 Main Conference</span>
            </div>

            <h1 className="text-white mb-6 leading-tight">
              <span className="block font-light">GETReason:</span>
              <span className="block">Enhancing Image Context Extraction through Hierarchical Multi-Agent Reasoning</span>
            </h1>

            <p className="text-gray-100 text-lg mb-8 max-w-2xl mx-auto lg:mx-0">
              A novel framework that moves beyond surface-level image descriptions to infer deeper contextual meaning through geospatial, event, and temporal reasoning.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="https://github.com/CoRAL-ASU/getreason?tab=readme-ov-file"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-black text-white hover:bg-gray-900 group"
              >
                Go to GitHub
                <motion.span
                  className="inline-block ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </a>
              <a
                href="https://aclanthology.org/2025.acl-long.1439/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-white text-black hover:bg-gray-100"
              >
                View Paper
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl">
              <div className="aspect-w-16 aspect-h-9 relative group">
                <img
                  src={architectureDiagram}
                  alt="GETReason Architecture Diagram - Multi-agent reasoning framework"
                  className="rounded-lg object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
                />

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                >
                  {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white" />}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4">
                {agents.map((agent) => (
                  <motion.div
                    key={agent.id}
                    className={`bg-gradient-to-br ${agent.color} p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 border-2 border-white`}
                    onClick={() => setActiveAgent(activeAgent === agent.id ? null : agent.id)}
                    whileHover={{ y: -5 }}
                  >
                    <h4 className="text-black text-sm font-semibold mb-1">{agent.title}</h4>
                    <p className="text-black/80 text-xs">{agent.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interactive Agent Info Panel */}
            <AnimatePresence>
              {activeAgent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute top-full left-0 right-0 mt-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                >
                  <div className="flex items-start gap-3">
                    <Info size={20} className="text-black mt-1" />
                    <div>
                      <h4 className="text-black font-semibold mb-2">
                        {agents.find(a => a.id === activeAgent)?.title}
                      </h4>
                      <p className="text-black/80 text-sm">
                        {agents.find(a => a.id === activeAgent)?.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-secondary-500/30 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-primary-600/30 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-white flex flex-col items-center"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ArrowDown size={20} />
        </motion.div>
      </div>
    </section>
  );
};