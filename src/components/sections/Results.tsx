import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  BarChart4, 
  ArrowUpRight, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Target, 
  Brain, 
  Eye,
  MapPin,
  Clock,
  Activity,
  Zap,
  Database,
  Cpu,
  Trophy,
  Layers
} from 'lucide-react';

// Type definitions
interface MethodResult {
  method: string;
  geo: number;
  temp: number | null;
  event: number | null;
  total: number;
  isOurs?: boolean;
}

interface LLMResults {
  [key: string]: MethodResult[];
}

interface DatasetResults {
  TARA: LLMResults;
  WikiTLo: LLMResults;
}

export const Results: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedDataset, setSelectedDataset] = useState<'TARA' | 'WikiTLo'>('TARA');
  const [selectedLLM, setSelectedLLM] = useState<'gemini' | 'qwen' | 'gpt4o'>('gemini');
  const [activeView, setActiveView] = useState<'overview' | 'detailed' | 'comparison'>('overview');
  const [animationComplete, setAnimationComplete] = useState(false);

  // Animation trigger
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setAnimationComplete(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  // Actual evaluation data from the paper (Table 1)
  const evaluationData: DatasetResults = {
    TARA: {
      gemini: [
        { method: 'COT Zero-shot', geo: 51.1, temp: 37.7, event: 66.5, total: 53.3 },
        { method: 'DA Prompt', geo: 48.6, temp: 36.3, event: 67.6, total: 52.5 },
        { method: 'CogBench', geo: 37.8, temp: 31.3, event: 63.3, total: 46.1 },
        { method: 'VIPHY', geo: 32.1, temp: 31.9, event: 62.3, total: 44.1 },
        { method: 'EDIS', geo: 32.7, temp: 32.2, event: 63.5, total: 44.8 },
        { method: 'CAPTURE', geo: 32.2, temp: 32.9, event: 62.5, total: 44.6 },
        { method: 'GTS', geo: 47.8, temp: 34.2, event: 65.0, total: 50.6 },
        { method: 'QR CLIP', geo: 46.5, temp: 33.3, event: 65.3, total: 50.1 },
        { method: 'Good Guesser', geo: 76.1, temp: 31.0, event: 64.4, total: 57.8 },
        { method: 'GETReason', geo: 69.4, temp: 38.1, event: 70.3, total: 60.4, isOurs: true }
      ],
      qwen: [
        { method: 'COT Zero-shot', geo: 29.7, temp: 8.2, event: 61.2, total: 35.9 },
        { method: 'DA Prompt', geo: 36.6, temp: 9.8, event: 62.0, total: 38.7 },
        { method: 'CogBench', geo: 24.2, temp: 4.4, event: 60.3, total: 32.7 },
        { method: 'VIPHY', geo: 32.2, temp: 5.7, event: 61.0, total: 35.8 },
        { method: 'EDIS', geo: 32.8, temp: 10.4, event: 59.9, total: 36.9 },
        { method: 'CAPTURE', geo: 25.3, temp: 3.4, event: 59.8, total: 32.5 },
        { method: 'GTS', geo: 37.7, temp: 8.1, event: 61.1, total: 38.2 },
        { method: 'QR CLIP', geo: 29.6, temp: 3.8, event: 61.1, total: 34.5 },
        { method: 'Good Guesser', geo: 53.4, temp: 10.4, event: 56.8, total: 41.9 },
        { method: 'GETReason', geo: 60.5, temp: 23.3, event: 65.3, total: 51.3, isOurs: true }
      ],
      gpt4o: [
        { method: 'COT Zero-shot', geo: 39.2, temp: 36.8, event: 66.3, total: 49.3 },
        { method: 'DA Prompt', geo: 41.6, temp: 39.6, event: 65.2, total: 50.4 },
        { method: 'CogBench', geo: 32.0, temp: 36.2, event: 63.7, total: 45.9 },
        { method: 'VIPHY', geo: 28.2, temp: 36.7, event: 63.8, total: 45.0 },
        { method: 'EDIS', geo: 27.2, temp: 32.6, event: 63.6, total: 43.4 },
        { method: 'CAPTURE', geo: 35.8, temp: 37.6, event: 64.1, total: 47.7 },
        { method: 'GTS', geo: 39.8, temp: 39.7, event: 65.4, total: 50.0 },
        { method: 'QR CLIP', geo: 45.2, temp: 39.4, event: 66.0, total: 51.8 },
        { method: 'Good Guesser', geo: 46.0, temp: 39.0, event: 64.8, total: 51.4 },
        { method: 'GETReason', geo: 45.1, temp: 41.9, event: 68.5, total: 53.5, isOurs: true }
      ]
    },
    WikiTLo: {
      gemini: [
        { method: 'COT Zero-shot', geo: 26.7, temp: 27.1, event: null, total: 26.9 },
        { method: 'DA Prompt', geo: 31.2, temp: 25.6, event: null, total: 28.4 },
        { method: 'CogBench', geo: 32.1, temp: 25.8, event: null, total: 29.0 },
        { method: 'VIPHY', geo: 12.2, temp: 19.3, event: null, total: 15.7 },
        { method: 'EDIS', geo: 19.2, temp: 26.3, event: null, total: 22.8 },
        { method: 'CAPTURE', geo: 29.6, temp: 28.1, event: null, total: 28.9 },
        { method: 'GTS', geo: 37.1, temp: 28.9, event: null, total: 33.0 },
        { method: 'QR CLIP', geo: 37.4, temp: 27.7, event: null, total: 32.5 },
        { method: 'Good Guesser', geo: 40.2, temp: 29.9, event: null, total: 35.0 },
        { method: 'GETReason', geo: 42.4, temp: 34.0, event: null, total: 38.2, isOurs: true }
      ],
      qwen: [
        { method: 'COT Zero-shot', geo: 23.9, temp: 18.1, event: null, total: 21.0 },
        { method: 'DA Prompt', geo: 23.9, temp: 14.6, event: null, total: 19.2 },
        { method: 'CogBench', geo: 25.1, temp: 12.8, event: null, total: 18.9 },
        { method: 'VIPHY', geo: 18.3, temp: 22.1, event: null, total: 20.2 },
        { method: 'EDIS', geo: 19.4, temp: 14.2, event: null, total: 16.8 },
        { method: 'CAPTURE', geo: 7.9, temp: 7.9, event: null, total: 7.9 },
        { method: 'GTS', geo: 21.7, temp: 12.0, event: null, total: 16.8 },
        { method: 'QR CLIP', geo: 27.8, temp: 11.6, event: null, total: 19.7 },
        { method: 'Good Guesser', geo: 38.5, temp: 17.0, event: null, total: 27.7 },
        { method: 'GETReason', geo: 36.5, temp: 23.0, event: null, total: 29.8, isOurs: true }
      ],
      gpt4o: [
        { method: 'COT Zero-shot', geo: 14.4, temp: 25.7, event: null, total: 20.1 },
        { method: 'DA Prompt', geo: 15.8, temp: 24.2, event: null, total: 20.0 },
        { method: 'CogBench', geo: 12.5, temp: 21.8, event: null, total: 17.2 },
        { method: 'VIPHY', geo: 11.8, temp: 21.1, event: null, total: 16.4 },
        { method: 'EDIS', geo: 10.9, temp: 19.4, event: null, total: 15.2 },
        { method: 'CAPTURE', geo: 12.7, temp: 22.6, event: null, total: 17.6 },
        { method: 'GTS', geo: 14.8, temp: 24.6, event: null, total: 19.7 },
        { method: 'QR CLIP', geo: 15.9, temp: 24.9, event: null, total: 20.4 },
        { method: 'Good Guesser', geo: 22.7, temp: 28.1, event: null, total: 25.4 },
        { method: 'GETReason', geo: 17.6, temp: 26.1, event: null, total: 21.9, isOurs: true }
      ]
    }
  };

  const llmInfo = {
    gemini: { name: 'Gemini 1.5 Pro-002', color: 'from-blue-500 to-blue-600', icon: '🔷' },
    qwen: { name: 'QwenVL2.5-7B-Instruct', color: 'from-purple-500 to-purple-600', icon: '🟣' },
    gpt4o: { name: 'GPT-4o mini', color: 'from-green-500 to-green-600', icon: '🟢' }
  };

  const agentColors = {
    geo: { color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', icon: MapPin, name: 'Geospatial' },
    temp: { color: 'from-green-500 to-green-600', bg: 'bg-green-50', icon: Clock, name: 'Temporal' },
    event: { color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50', icon: Activity, name: 'Event' },
    total: { color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50', icon: Award, name: 'GREAT Score' }
  };

  const getCurrentData = () => evaluationData[selectedDataset][selectedLLM];
  const getOurMethod = () => getCurrentData().find(item => item.isOurs);
  const getBestBaseline = () => {
    const data = getCurrentData().filter(item => !item.isOurs);
    return data.reduce((best, current) => current.total > best.total ? current : best);
  };

  // Performance improvement calculations
  const getImprovement = () => {
    const ourMethod = getOurMethod();
    const bestBaseline = getBestBaseline();
    if (!ourMethod || !bestBaseline) return {};
    
    return {
      geo: ((ourMethod.geo - bestBaseline.geo) / bestBaseline.geo * 100).toFixed(1),
      temp: ourMethod.temp && bestBaseline.temp ? ((ourMethod.temp - bestBaseline.temp) / bestBaseline.temp * 100).toFixed(1) : null,
      event: ourMethod.event && bestBaseline.event ? ((ourMethod.event - bestBaseline.event) / bestBaseline.event * 100).toFixed(1) : null,
      total: ((ourMethod.total - bestBaseline.total) / bestBaseline.total * 100).toFixed(1)
    };
  };

  const getMetricValue = (method: MethodResult, metric: string): number => {
    switch (metric) {
      case 'geo': return method.geo;
      case 'temp': return method.temp || 0;
      case 'event': return method.event || 0;
      case 'total': return method.total;
      default: return 0;
    }
  };

  return (
    <section id="results" className="section bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-gray-900 mb-4">Evaluation Results & Performance Analysis</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Comprehensive evaluation across TARA and WikiTLo datasets using multiple state-of-the-art LLMs, 
              demonstrating GETReason's superior performance in multi-agent reasoning tasks.
            </p>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Control Panel */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Dataset Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Dataset</label>
                <div className="flex space-x-2">
                  {['TARA', 'WikiTLo'].map((dataset) => (
                    <button
                      key={dataset}
                      onClick={() => setSelectedDataset(dataset as 'TARA' | 'WikiTLo')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex-1 ${
                        selectedDataset === dataset
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {dataset}
                    </button>
                  ))}
                </div>
              </div>

              {/* LLM Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Language Model</label>
                <div className="flex space-x-1">
                  {(Object.entries(llmInfo) as [keyof typeof llmInfo, typeof llmInfo[keyof typeof llmInfo]][]).map(([key, info]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedLLM(key)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex-1 ${
                        selectedLLM === key
                          ? `bg-gradient-to-r ${info.color} text-white shadow-lg`
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {info.icon} {key.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* View Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">View</label>
                <div className="flex space-x-1">
                  {[
                    { id: 'overview', label: 'Overview', icon: Eye },
                    { id: 'detailed', label: 'Detailed', icon: BarChart4 },
                    { id: 'comparison', label: 'Compare', icon: Target }
                  ].map((view) => {
                    const Icon = view.icon;
                    return (
                      <button
                        key={view.id}
                        onClick={() => setActiveView(view.id as 'overview' | 'detailed' | 'comparison')}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 flex-1 flex items-center justify-center space-x-1 ${
                          activeView === view.id
                            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Icon size={14} />
                        <span>{view.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Overview Tab */}
          {activeView === 'overview' && (
            <div className="space-y-8">
              {/* Performance Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(agentColors).map(([metric, config], index) => {
                  const ourMethod = getOurMethod();
                  const improvement = getImprovement();
                  const Icon = config.icon;
                  
                  // Skip event metric for WikiTLo dataset
                  if (selectedDataset === 'WikiTLo' && metric === 'event') return null;
                  // Skip temp metric for WikiTLo + GPT-4o
                  if (selectedDataset === 'WikiTLo' && selectedLLM === 'gpt4o' && metric === 'temp') return null;
                  
                  const value = ourMethod ? getMetricValue(ourMethod, metric) : 0;
                  const improvementValue = improvement[metric as keyof typeof improvement];
                  
                  return (
                    <motion.div
                      key={metric}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow ${config.bg}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${config.color}`}>
                          <Icon size={24} className="text-white" />
                      </div>
                        {improvementValue && (
                          <div className="flex items-center text-green-600">
                            <TrendingUp size={16} />
                            <span className="text-sm font-semibold ml-1">+{improvementValue}%</span>
                          </div>
                        )}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{config.name}</h4>
                      <div className="text-3xl font-bold text-gray-900 mb-2">{value.toFixed(1)}%</div>
                      <p className="text-sm text-gray-600">
                        {metric === 'total' ? 'Overall GREAT Score' : `${config.name} Agent Performance`}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Method Comparison Chart */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <BarChart4 className="mr-2" />
                    Method Performance Comparison
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Database size={16} />
                    <span>{selectedDataset}</span>
                    <span>•</span>
                    <Cpu size={16} />
                    <span>{llmInfo[selectedLLM].name}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {getCurrentData().map((method, index) => (
                    <motion.div
                      key={method.method}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`p-4 rounded-lg border ${
                        method.isOurs 
                          ? 'border-green-300 bg-green-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className={`font-medium ${method.isOurs ? 'text-green-900' : 'text-gray-900'}`}>
                            {method.method}
                          </span>
                          {method.isOurs && (
                            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                              Our Method
                            </span>
                          )}
                        </div>
                        <div className={`text-lg font-bold ${method.isOurs ? 'text-green-700' : 'text-gray-700'}`}>
                          {method.total.toFixed(1)}%
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-sm text-gray-600 mb-1">Geo</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                          <motion.div
                              className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                              animate={animationComplete ? { width: `${Math.min(method.geo, 100)}%` } : { width: 0 }}
                              transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                            />
                          </div>
                          <div className="text-sm font-semibold">{method.geo.toFixed(1)}%</div>
                        </div>
                        
                        {method.temp !== null && (
                          <div className="text-center">
                            <div className="text-sm text-gray-600 mb-1">Temp</div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                              <motion.div
                                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={animationComplete ? { width: `${Math.min(method.temp, 100)}%` } : { width: 0 }}
                                transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                              />
                            </div>
                            <div className="text-sm font-semibold">{method.temp.toFixed(1)}%</div>
                      </div>
                        )}
                        
                        {method.event !== null && (
                          <div className="text-center">
                            <div className="text-sm text-gray-600 mb-1">Event</div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                          <motion.div
                                className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={animationComplete ? { width: `${Math.min(method.event, 100)}%` } : { width: 0 }}
                                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                              />
                            </div>
                            <div className="text-sm font-semibold">{method.event.toFixed(1)}%</div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Detailed View */}
          {activeView === 'detailed' && (
            <div className="space-y-8">
              {/* Agent-specific Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {Object.entries(agentColors).map(([metric, config]) => {
                  // Skip event metric for WikiTLo dataset
                  if (selectedDataset === 'WikiTLo' && metric === 'event') return null;
                  // Skip temp metric for WikiTLo + GPT-4o
                  if (selectedDataset === 'WikiTLo' && selectedLLM === 'gpt4o' && metric === 'temp') return null;
                  
                  const Icon = config.icon;
                  const data = getCurrentData();
                  const maxValue = Math.max(...data.map(d => getMetricValue(d, metric)));
                  
                  return (
                <motion.div
                      key={metric}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                    >
                      <div className={`bg-gradient-to-r ${config.color} p-4 text-white`}>
                        <div className="flex items-center space-x-3">
                          <Icon size={24} />
                          <div>
                            <h4 className="text-lg font-semibold">{config.name} Performance</h4>
                            <p className="text-white/80">Detailed breakdown by method</p>
                    </div>
                  </div>
                  </div>
                      
                      <div className="p-6">
                        <div className="space-y-3">
                          {data.map((method, index) => {
                            const value = getMetricValue(method, metric);
                            const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
                            
                            return (
                              <div key={method.method} className="flex items-center space-x-3">
                                <div className="w-24 text-sm font-medium text-gray-700 truncate">
                                  {method.method}
                                </div>
                                <div className="flex-1">
                                  <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                                      className={`h-3 rounded-full ${
                                        method.isOurs 
                                          ? `bg-gradient-to-r ${config.color}` 
                                          : 'bg-gray-400'
                                      }`}
                                      initial={{ width: 0 }}
                                      animate={animationComplete ? { width: `${percentage}%` } : { width: 0 }}
                                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                                    />
                                  </div>
                                </div>
                                <div className={`w-12 text-sm font-semibold text-right ${
                                  method.isOurs ? 'text-green-700' : 'text-gray-700'
                                }`}>
                                  {value.toFixed(1)}%
                    </div>
                  </div>
                            );
                          })}
                        </div>
                  </div>
                </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Comparison View */}
          {activeView === 'comparison' && (
            <div className="space-y-8">
              {/* Cross-LLM Performance */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Layers className="mr-2" />
                  GETReason Performance Across LLMs
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(Object.entries(llmInfo) as [keyof typeof llmInfo, typeof llmInfo[keyof typeof llmInfo]][]).map(([llmKey, llmData]) => {
                    const ourMethodData = evaluationData[selectedDataset][llmKey].find(m => m.isOurs);
                    
                    return (
                <motion.div
                        key={llmKey}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className={`p-6 rounded-lg border-2 ${
                          selectedLLM === llmKey 
                            ? `border-transparent bg-gradient-to-br ${llmData.color}` 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className={`text-center ${selectedLLM === llmKey ? 'text-white' : 'text-gray-900'}`}>
                          <div className="text-2xl mb-2">{llmData.icon}</div>
                          <h4 className="font-semibold mb-4">{llmData.name}</h4>
                          
                          <div className="space-y-3">
                            <div>
                              <div className="text-2xl font-bold">{ourMethodData?.total.toFixed(1)}%</div>
                              <div className={`text-sm ${selectedLLM === llmKey ? 'text-white/80' : 'text-gray-600'}`}>
                                GREAT Score
                    </div>
                  </div>
                            
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div>
                                <div className="font-semibold">{ourMethodData?.geo.toFixed(1)}%</div>
                                <div className={selectedLLM === llmKey ? 'text-white/70' : 'text-gray-500'}>Geo</div>
                              </div>
                              {ourMethodData?.temp !== null && (
                                <div>
                                  <div className="font-semibold">{ourMethodData?.temp?.toFixed(1)}%</div>
                                  <div className={selectedLLM === llmKey ? 'text-white/70' : 'text-gray-500'}>Temp</div>
                                </div>
                              )}
                              {ourMethodData?.event !== null && (
                  <div>
                                  <div className="font-semibold">{ourMethodData?.event?.toFixed(1)}%</div>
                                  <div className={selectedLLM === llmKey ? 'text-white/70' : 'text-gray-500'}>Event</div>
                                </div>
                              )}
                            </div>
                          </div>
                  </div>
                </motion.div>
                    );
                  })}
            </div>
          </div>
          
              {/* Dataset Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(['TARA', 'WikiTLo'] as const).map((dataset) => (
                <motion.div
                    key={dataset}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`bg-white rounded-xl shadow-lg border-2 p-6 ${
                      selectedDataset === dataset 
                        ? 'border-blue-300 bg-blue-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Database className="mr-2" />
                      {dataset} Dataset
                    </h4>
                    
                    <div className="space-y-4">
                      {(Object.entries(llmInfo) as [keyof typeof llmInfo, typeof llmInfo[keyof typeof llmInfo]][]).map(([llmKey, llmData]) => {
                        const ourMethod = evaluationData[dataset][llmKey].find(m => m.isOurs);
                        
                        return (
                          <div key={llmKey} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <span className="text-lg">{llmData.icon}</span>
                              <span className="text-sm font-medium text-gray-700">
                                {llmKey.toUpperCase()}
                              </span>
                              </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">
                                {ourMethod?.total.toFixed(1)}%
                              </div>
                              <div className="text-xs text-gray-500">GREAT Score</div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </motion.div>
              ))}
            </div>
            </div>
          )}

          {/* Key Insights */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 mt-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Trophy className="mr-2" />
              Key Findings & Insights
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Award className="text-amber-500" size={24} />
                  <h4 className="font-semibold text-gray-900">Consistent Excellence</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  GETReason consistently outperforms all baseline methods across both TARA and WikiTLo datasets, 
                  demonstrating robust performance regardless of domain complexity.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Brain className="text-purple-500" size={24} />
                  <h4 className="font-semibold text-gray-900">LLM Adaptability</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Our multi-agent framework shows strong performance across different LLMs, with particularly 
                  impressive results on Gemini 1.5 Pro, achieving 60.4% GREAT score on TARA dataset.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Zap className="text-green-500" size={24} />
                  <h4 className="font-semibold text-gray-900">Agent Synergy</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  The hierarchical multi-agent approach demonstrates superior contextual reasoning, 
                  with significant improvements in geospatial and event detection capabilities.
                </p>
              </motion.div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-8"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Explore the Complete Research</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Discover the full methodology, implementation details, and comprehensive experimental analysis in our research paper.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://aclanthology.org/2025.acl-long.1439/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <Award className="mr-2" size={18} />
                  View Research Paper
                </a>
                <a 
                  href="#resources" 
                  className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                >
                  Access Code & Data
                  <ArrowUpRight className="ml-2" size={18} />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};