import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Database, FileText, BarChart3, CheckCircle, AlertTriangle, Zap, Target, TrendingUp, Filter, Shuffle, Plus, Calendar, MapPin, Newspaper } from 'lucide-react';

export const Dataset: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeDataset, setActiveDataset] = useState(0);
  const [expandedAugmentation, setExpandedAugmentation] = useState<string | null>(null);

  const datasets = [
    {
      id: 'wikitilo',
      name: 'WikiTiLo',
      description: 'Wikipedia-based dataset with comprehensive spatio-temporal annotations spanning multiple countries and decades',
      icon: BarChart3,
      color: 'from-blue-500 to-blue-600',
      stats: {
        totalImages: '6,296',
        excluded: '0',
        utilized: '6,296',
        countries: '30+',
        timespan: '1826-2021',
        years: '195'
      },
      details: [
        'Images sourced from Wikipedia with verified historical context',
        'Comprehensive spatio-temporal annotations for each image',
        'Coverage spans over 30 countries across multiple continents',
        'Temporal range from 1826 to 2021 providing nearly two centuries of data',
        'Rich metadata including precise location and time information',
        'Diverse content representing global historical events and landmarks'
      ],
      limitations: [
        'No accompanying textual context unlike TARA dataset',
        'Certain analysis components required adjustment due to missing text',
        'Event extraction not available due to lack of associated metadata'
      ]
    },
    {
      id: 'tara',
      name: 'TARA',
      description: 'News article-associated dataset with comprehensive temporal and geospatial information from New York Times',
      icon: Newspaper,
      color: 'from-green-500 to-green-600',
      stats: {
        totalImages: '12,306',
        excluded: '1,065',
        utilized: '11,241',
        timespan: '2010-2021',
        years: '11',
        source: 'NYT Archive'
      },
      details: [
        'Images extracted from New York Times archive spanning 2010-2021',
        'Each image associated with comprehensive news article metadata',
        'Automatic extraction of time and location information from articles',
        'Rich contextual information enabling multi-modal analysis',
        'Professional journalism standards ensuring content quality',
        'Diverse coverage of global events, politics, culture, and society'
      ],
      exclusions: [
        'Images with incorrect or corrupted formats removed',
        'Content deemed socially inappropriate filtered out',
        'Quality control measures applied to ensure dataset integrity',
        'Final dataset maintains high standards for research evaluation'
      ]
    }
  ];

  const augmentationProcesses = [
    {
      id: 'tara-spatio-temporal',
      title: 'TARA*: Spatio-Temporal Augmentation',
      description: 'Enhanced temporal and geospatial structuring using Vision Language Models',
      icon: MapPin,
      color: 'from-purple-500 to-purple-600',
      process: [
        'Metadata processing using Gemini 1.5 Pro for structured information extraction',
        'Temporal categorization into century, decade, year, month, and day granularity',
        'Spatial categorization into country, state/province, and city hierarchies',
        'JSON format standardization for consistent data representation',
        'Quality validation and verification of extracted information'
      ]
    },
    {
      id: 'tara-event',
      title: 'TARA*: Event Information Augmentation',
      description: 'Comprehensive event extraction and reasoning from image-article pairs',
      icon: Zap,
      color: 'from-orange-500 to-orange-600',
      process: [
        'Simultaneous processing of images and associated news articles',
        'Primary event identification and extraction from visual and textual content',
        'Secondary event detection for background context understanding',
        'Reasoning generation explaining event grounding in visual elements',
        'Structured JSON output with event hierarchy and contextual relationships'
      ]
    },
    {
      id: 'tara-deduction',
      title: 'TARA*: Deduction Augmentation',
      description: 'Comprehensive reasoning and inference generation for visual content analysis',
      icon: Target,
      color: 'from-red-500 to-red-600',
      process: [
        'VLM-based deduction inference generation using augmented ground truth',
        'Event reasoning: Visual analysis of ceremonial and contextual elements',
        'Temporal deduction: Time-based inference from visual and contextual cues',
        'Geospatial reasoning: Location inference from environmental and cultural indicators',
        'Comprehensive reasoning chains linking visual evidence to factual conclusions'
      ],
      example: {
        image: 'Indonesian President Inauguration',
        eventDeduction: 'Joko Widodo taking oath on the Quran during initiation ceremony',
        temporalDeduction: 'Inauguration ceremony took place on October 20, 2019',
        geospatialDeduction: 'Government setting in Jakarta at People\'s Consultative Assembly (MPR) Building'
      }
    },
    {
      id: 'wikitilo-enhancement',
      title: 'WikiTiLo*: Structural Enhancement',
      description: 'Format standardization and consistency alignment with evaluation framework',
      icon: Shuffle,
      color: 'from-cyan-500 to-cyan-600',
      process: [
        'Ground truth label restructuring for consistency with TARA format',
        'Annotation format standardization across both datasets',
        'Evaluation framework alignment for comparative analysis',
        'Metadata preservation while ensuring structural compatibility',
        'Quality assurance and validation of restructured annotations'
      ]
    }
  ];

  // Auto-advance datasets
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDataset((prev) => (prev + 1) % datasets.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="dataset" className="section bg-gradient-to-br from-white to-gray-50/50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-gray-900 mb-6">Dataset</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              We evaluate our framework on two comprehensive datasets: WikiTiLo and TARA, both featuring rich 
              spatio-temporal annotations and enhanced with our augmentation techniques for robust evaluation.
            </p>
          </motion.div>
        </div>

        {/* Dataset Overview */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {datasets.map((dataset, index) => (
              <motion.div
                key={dataset.id}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index === 0 ? -50 : 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden border-2 transition-all duration-500 ${
                  activeDataset === index 
                    ? 'border-primary-500 shadow-primary-500/20 transform scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setActiveDataset(index)}
              >
                <div className={`bg-gradient-to-r ${dataset.color} p-6 text-white`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-white/20 rounded-lg p-3">
                      <dataset.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{dataset.name}</h3>
                      <p className="text-white/80">Dataset</p>
                    </div>
                  </div>
                  <p className="text-white/90">{dataset.description}</p>
                </div>

                <div className="p-6">
                  {/* Statistics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{dataset.stats.totalImages}</div>
                      <div className="text-sm text-gray-600">Total Images</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{dataset.stats.utilized}</div>
                      <div className="text-sm text-gray-600">Utilized</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{dataset.stats.excluded}</div>
                      <div className="text-sm text-gray-600">Excluded</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary-600">{dataset.stats.timespan}</div>
                      <div className="text-sm text-gray-600">Time Span</div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      Key Features
                    </h4>
                    <div className="space-y-2">
                      {dataset.details.slice(0, 3).map((detail, idx) => (
                        <div key={idx} className="flex items-start text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-3 mt-2 flex-shrink-0"></div>
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Limitations/Exclusions */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                      {dataset.id === 'wikitilo' ? 'Limitations' : 'Data Exclusions'}
                    </h4>
                    <div className="space-y-2">
                      {(dataset.id === 'wikitilo' ? dataset.limitations : dataset.exclusions)?.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-start text-sm text-gray-700">
                          <AlertTriangle className="h-3 w-3 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dataset Statistics Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
              <Database className="h-6 w-6 mr-2" />
              Dataset Statistics Summary
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Dataset</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Total</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Excluded</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Utilized</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">TARA</td>
                    <td className="py-3 px-4 text-center text-gray-700">12,306</td>
                    <td className="py-3 px-4 text-center text-red-600 font-medium">1,065</td>
                    <td className="py-3 px-4 text-center text-green-600 font-medium">11,241</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">WikiTiLo</td>
                    <td className="py-3 px-4 text-center text-gray-700">6,296</td>
                    <td className="py-3 px-4 text-center text-green-600 font-medium">0</td>
                    <td className="py-3 px-4 text-center text-green-600 font-medium">6,296</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Summary of dataset images utilized in the study after quality filtering and content validation.
            </p>
          </motion.div>
        </motion.div>

        {/* Dataset Enhancement & Augmentation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Dataset Enhancement & Augmentation</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive augmentation processes to enhance dataset utility for multi-modal reasoning evaluation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {augmentationProcesses.map((process, index) => (
              <motion.div
                key={process.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => setExpandedAugmentation(expandedAugmentation === process.id ? null : process.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`bg-gradient-to-br ${process.color} rounded-lg p-3`}>
                        <process.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{process.title}</h4>
                      <p className="text-gray-600 text-sm">{process.description}</p>
                    </div>
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedAugmentation === process.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-200 pt-4">
                          <h5 className="font-semibold text-gray-900 mb-3">Process Steps:</h5>
                          <div className="space-y-2">
                            {process.process.map((step, idx) => (
                              <div key={idx} className="flex items-start text-sm text-gray-700">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                {step}
                              </div>
                            ))}
                          </div>
                          
                          {process.example && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                              <h6 className="font-semibold text-gray-900 mb-2">Example: {process.example.image}</h6>
                              <div className="space-y-1 text-sm text-gray-700">
                                <div><strong>Event:</strong> {process.example.eventDeduction}</div>
                                <div><strong>Temporal:</strong> {process.example.temporalDeduction}</div>
                                <div><strong>Geospatial:</strong> {process.example.geospatialDeduction}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 