import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Users, Network, Layers, ChevronDown, ChevronUp, Info, Eye, GitMerge, ChevronLeft, ChevronRight, Zap, Target, MessageSquare, Cpu, Database, ArrowRight, CheckCircle, Settings, Workflow, Cloud, Server, HardDrive } from 'lucide-react';

export const Methodology: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);
  const [showMetricDetails, setShowMetricDetails] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  const equations = [
    {
      title: 'Event Score Equations',
      content: (
        <div className="space-y-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Cosine Similarity Shift</p>
            <div className="text-lg font-mono">
              CS<sub>shifted</sub> = <span className="text-blue-600">(CS + 1) / 2</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Event Score</p>
            <div className="text-lg font-mono">
              ES<sub>i</sub> = <span className="text-blue-600">(CS((e<sub>i</sub> + b<sub>i</sub>), (E<sub>i</sub> + B<sub>i</sub>)) + 1) / 2</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Geospatial Score Equations',
      content: (
        <div className="space-y-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Haversine Distance</p>
            <div className="text-sm font-mono leading-relaxed">
              d = 2R × arcsin(√[sin²(Δφ/2) + cos(φ₁) × cos(φ₂) × sin²(Δλ/2)])
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Where</p>
            <div className="text-sm font-mono">
              Δφ = φ₂ - φ₁, &nbsp; Δλ = λ₂ - λ₁
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Geospatial Score</p>
            <div className="text-lg font-mono">
              S<sub>geo</sub> = <span className="text-green-600">max(0, 1 - d/D<sub>max</sub>)</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Temporal Score Equations',
      content: (
        <div className="space-y-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Unit Score</p>
            <div className="text-sm font-mono space-y-2">
              <div>S<sub>u</sub> = 1, if gt<sub>u</sub> = pred<sub>u</sub> (exact match)</div>
              <div>S<sub>u</sub> = max(0, 1 - |gt<sub>u</sub> - pred<sub>u</sub>|/T<sub>u</sub>), otherwise</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Temporal Score</p>
            <div className="text-lg font-mono">
              TS<sub>i</sub> = <span className="text-purple-600">Σ(w<sub>u</sub> × S<sub>u</sub>) / Σw<sub>u</sub></span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Overall GREAT Score',
      content: (
        <div className="space-y-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-4">Overall Score Calculation</p>
            <div className="space-y-3 font-mono text-sm">
              <div className="p-2 bg-blue-50 rounded">
                <div className="font-semibold text-blue-800">TARA Dataset:</div>
                <div>0.4 × ES<sub>i</sub> + 0.3 × GS<sub>i</sub> + 0.3 × TS<sub>i</sub></div>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <div className="font-semibold text-green-800">WikiTiLo Dataset:</div>
                <div>0.5 × GS<sub>i</sub> + 0.5 × TS<sub>i</sub></div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const workflowSteps = [
    {
      id: 1,
      title: "Scene Graph Generation",
      description: "Extract structured representations of visual relationships, objects, and attributes from input images",
      icon: Network,
      color: "from-blue-500 to-blue-600",
      details: [
        "Object detection and classification",
        "Relationship identification",
        "Attribute extraction",
        "Spatial layout analysis"
      ]
    },
    {
      id: 2,
      title: "Multi-Agent Initialization",
      description: "Deploy specialized agents with domain-specific knowledge and reasoning capabilities",
      icon: Users,
      color: "from-purple-500 to-purple-600",
      details: [
        "Geospatial reasoning agent",
        "Temporal analysis agent", 
        "Event detection agent",
        "Context integration agent"
      ]
    },
    {
      id: 3,
      title: "Hierarchical Reasoning",
      description: "Execute coordinated reasoning across multiple abstraction levels with inter-agent communication",
      icon: Brain,
      color: "from-green-500 to-green-600",
      details: [
        "Local feature analysis",
        "Cross-modal attention",
        "Agent communication protocols",
        "Consensus building mechanisms"
      ]
    },
    {
      id: 4,
      title: "Context Synthesis",
      description: "Integrate multi-agent outputs into comprehensive contextual understanding",
      icon: GitMerge,
      color: "from-orange-500 to-orange-600",
      details: [
        "Information fusion algorithms",
        "Conflict resolution strategies",
        "Confidence scoring",
        "Final context generation"
      ]
    }
  ];

  // Auto-advance slides every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % equations.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Auto-advance workflow steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWorkflowStep((prev) => (prev + 1) % workflowSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % equations.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + equations.length) % equations.length);
  };

  return (
    <section id="methodology" className="section bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-gray-900 mb-6">Methodology</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              GETReason introduces a revolutionary hierarchical multi-agent reasoning framework that transforms 
              image understanding through coordinated specialist agents, advanced scene graph analysis, and 
              sophisticated context extraction mechanisms.
            </p>
          </motion.div>
        </div>

        {/* Workflow Pipeline */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Processing Pipeline</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our framework operates through four coordinated stages, each optimized for specific aspects of visual reasoning
            </p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-stretch gap-4">
              {workflowSteps.map((step, index) => (
              <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative bg-white rounded-xl shadow-lg p-6 border-2 transition-all duration-300 flex-1 min-h-[280px] ${
                    activeWorkflowStep === index 
                      ? 'border-primary-500 shadow-primary-500/20 shadow-xl' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveWorkflowStep(index)}
                >
                  <div className={`bg-gradient-to-br ${step.color} rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4 mx-auto`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 text-center">{step.title}</h4>
                  <p className="text-gray-600 text-sm text-center mb-4">{step.description}</p>
                
                <AnimatePresence>
                    {activeWorkflowStep === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                        <div className="border-t border-gray-200 pt-4">
                          <ul className="space-y-1">
                            {step.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start text-xs text-gray-600">
                                <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Arrow connector for desktop */}
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                      <div className="bg-white rounded-full p-2 shadow-md">
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  )}
                  
                  {/* Arrow connector for mobile */}
                  {index < workflowSteps.length - 1 && (
                    <div className="md:hidden flex justify-center mt-4">
                      <div className="bg-white rounded-full p-2 shadow-md">
                        <ArrowRight className="h-4 w-4 text-gray-400 rotate-90" />
                      </div>
                    </div>
                  )}
              </motion.div>
            ))}
            </div>
          </div>
        </motion.div>
          
        {/* GREAT Evaluation Metric */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">GREAT Evaluation Framework</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive Geospatial Reasoning and Event Accuracy with Temporal Alignment (GREAT) metric 
              provides multi-dimensional evaluation of visual reasoning capabilities
            </p>
          </div>

          {/* Equation Slideshow */}
          <div className="mb-8 relative">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 min-h-[350px] flex flex-col justify-center relative overflow-hidden border border-gray-200">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="h-full flex flex-col justify-center"
                >
                  <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">
                    {equations[currentSlide].title}
                  </h4>
                  {equations[currentSlide].content}
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
              
              {/* Slide indicators */}
              <div className="flex justify-center space-x-3 mt-6">
                {equations.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-primary-500 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
              </div>
              
          {/* Metric Details */}
                <div>
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-semibold">Evaluation Components</h4>
                    <button
                      onClick={() => setShowMetricDetails(!showMetricDetails)}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors font-medium"
                    >
                {showMetricDetails ? 'Hide Details' : 'Show Details'}
                      {showMetricDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                </div>
                
                <AnimatePresence>
                  {showMetricDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                      <h5 className="font-semibold text-blue-900 mb-4 flex items-center">
                        <Target className="h-5 w-5 mr-2" />
                        Geospatial Accuracy
                      </h5>
                      <ul className="text-sm text-blue-800 space-y-2">
                        <li className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                          Haversine distance calculation
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                          Location context understanding
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                          Spatial relationship modeling
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                          Geographic knowledge integration
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                      <h5 className="font-semibold text-purple-900 mb-4 flex items-center">
                        <Zap className="h-5 w-5 mr-2" />
                        Event Relevance
                      </h5>
                      <ul className="text-sm text-purple-800 space-y-2">
                            <li className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                          News event detection
                            </li>
                            <li className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                          Social context analysis
                            </li>
                            <li className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                          Semantic similarity matching
                            </li>
                            <li className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                          Cultural significance assessment
                            </li>
                          </ul>
                        </div>
                        
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                      <h5 className="font-semibold text-green-900 mb-4 flex items-center">
                        <Workflow className="h-5 w-5 mr-2" />
                        Temporal Coherence
                      </h5>
                      <ul className="text-sm text-green-800 space-y-2">
                            <li className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                          Multi-scale time analysis
                            </li>
                            <li className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                          Chronological consistency
                            </li>
                            <li className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                          Historical context integration
                            </li>
                            <li className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                          Temporal relationship modeling
                            </li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
          </div>
        </motion.div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Technical Infrastructure & Implementation</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Cloud className="h-8 w-8 text-blue-400" />
                <h4 className="text-xl font-semibold">Cloud Platforms</h4>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-300 mb-2">Gemini-1.5 Pro-002</h5>
                  <p className="text-gray-300 text-sm">Vertex AI Batch API on Google Cloud Platform (GCP)</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h5 className="font-semibold text-green-300 mb-2">GPT-4o-mini</h5>
                  <p className="text-gray-300 text-sm">OpenAI Batch API with AWS Rekognition integration</p>
                  <p className="text-gray-400 text-xs mt-1">Celebrity recognition with 99% confidence threshold</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <HardDrive className="h-8 w-8 text-green-400" />
                <h4 className="text-xl font-semibold">Hardware Setup</h4>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-300 mb-2">Qwen-VL2.5-7B-Instruct</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• 3x NVIDIA A100 Tensor Core GPUs</li>
                    <li>• 80 GB GPU memory each</li>
                    <li>• 8-core CPUs with 32 GB RAM</li>
                  </ul>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h5 className="font-semibold text-orange-300 mb-2">Infrastructure</h5>
                  <p className="text-gray-300 text-sm">Arizona State University Sol Supercomputer</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Server className="h-8 w-8 text-purple-400" />
                <h4 className="text-xl font-semibold">Integration Services</h4>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h5 className="font-semibold text-yellow-300 mb-2">AWS Rekognition</h5>
                  <p className="text-gray-300 text-sm">CelebrityFaces API for public figure identification</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h5 className="font-semibold text-red-300 mb-2">API Integration</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Batch processing optimization</li>
                    <li>• External entity grounding</li>
                    <li>• High-confidence filtering</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};