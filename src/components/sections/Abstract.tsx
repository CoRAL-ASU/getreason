import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, Image, Globe } from 'lucide-react';

export const Abstract: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <section id="abstract" className="section bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h2 className="text-gray-900 mb-4">Abstract</h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto mb-8"></div>
          </motion.div>

          <motion.div variants={itemVariants} className="prose prose-lg max-w-none mb-12">
            <p className="text-gray-700 leading-relaxed mb-6">
              Publicly significant images from events hold valuable contextual information, crucial for journalism and education. However, existing methods often struggle to extract this relevance accurately. To address this, we introduce GETReason (Geospatial Event Temporal Reasoning), a framework that moves beyond surface-level image descriptions to infer deeper contextual meaning.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              We propose that extracting global event, temporal, and geospatial information enhances understanding of an image's significance. Additionally, we introduce GREAT (Geospatial Reasoning and Event Accuracy with Temporal Alignment), a new metric for evaluating reasoning-based image understanding.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our layered multi-agent approach, assessed using a reasoning-weighted metric, demonstrates that meaningful insights can be inferred, effectively linking images to their broader event context.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="card p-6 border-t-4 border-primary-500 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-primary-100 w-12 h-12 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Geospatial Reasoning</h3>
              <p className="text-gray-600">
                Extracting and inferring location-based context from visual content to understand environmental significance.
              </p>
            </div>
            
            <div className="card p-6 border-t-4 border-secondary-500 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-secondary-100 w-12 h-12 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Event Detection</h3>
              <p className="text-gray-600">
                Identifying significant events and their relation to visual content for comprehensive understanding.
              </p>
            </div>
            
            <div className="card p-6 border-t-4 border-accent-500 hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-accent-100 w-12 h-12 flex items-center justify-center mb-4">
                <Image className="h-6 w-6 text-accent-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Temporal Analysis</h3>
              <p className="text-gray-600">
                Understanding time-based relationships and historical context within image content.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};