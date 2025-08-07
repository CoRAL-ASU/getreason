import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, Database, Code, Download, ExternalLink } from 'lucide-react';

export const Resources: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const resources = [
    {
      title: 'Research Paper',
      description: 'Read the full paper published at ACL 2025',
      icon: <FileText className="h-6 w-6" />,
      link: 'https://aclanthology.org/2025.acl-long.1439/',
      buttonText: 'View Paper',
      buttonIcon: <ExternalLink className="h-4 w-4 ml-2" />,
    },
    {
      title: 'Code Repository',
      description: 'GitHub repository with implementation and examples',
      icon: <Code className="h-6 w-6" />,
              link: 'https://github.com/CoRAL-ASU/getreason?tab=readme-ov-file',
      buttonText: 'View on GitHub',
      buttonIcon: <ExternalLink className="h-4 w-4 ml-2" />,
    },
    {
      title: 'Dataset',
      description: 'Access the annotated dataset used in our experiments',
      icon: <Database className="h-6 w-6" />,
              link: 'https://github.com/CoRAL-ASU/getreason?tab=readme-ov-file',
      buttonText: 'Access Dataset',
      buttonIcon: <ExternalLink className="h-4 w-4 ml-2" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="resources" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">Paper Resources</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access the full paper, code implementation, and supplementary materials
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
                      className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-gray-100 rounded-lg p-3 mr-4">
                  <span className="text-black">{resource.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <a 
                    href={resource.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-white bg-black hover:bg-gray-900 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                  >
                    {resource.buttonText}
                    {resource.buttonIcon}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 bg-gray-50 rounded-xl p-8 max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-semibold mb-4 text-center">Citation</h3>
          <div className="bg-white p-4 rounded-lg border border-gray-200 font-mono text-sm text-gray-800 overflow-x-auto">
            <pre className="whitespace-pre-wrap break-words">
              {`@inproceedings{siingh-etal-2025-getreason,
    title = "{GETR}eason: Enhancing Image Context Extraction through Hierarchical Multi-Agent Reasoning",
    author = "Siingh, Shikhhar  and
      Rawat, Abhinav  and
      Baral, Chitta  and
      Gupta, Vivek",
    editor = "Che, Wanxiang  and
      Nabende, Joyce  and
      Shutova, Ekaterina  and
      Pilehvar, Mohammad Taher",
    booktitle = "Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers)",
    month = jul,
    year = "2025",
    address = "Vienna, Austria",
    publisher = "Association for Computational Linguistics",
    url = "https://aclanthology.org/2025.acl-long.1439/",
    doi = "10.18653/v1/2025.acl-long.1439",
    pages = "29779--29800",
    ISBN = "979-8-89176-251-0",
    abstract = "Publicly significant images from events carry valuable contextual information with applications in domains such as journalism and education. However, existing methodologies often struggle to accurately extract this contextual relevance from images. To address this challenge, we introduce GETREASON (Geospatial Event Temporal Reasoning), a framework designed to go beyond surfacelevel image descriptions and infer deeper contextual meaning. We hypothesize that extracting global event, temporal, and geospatial information from an image enables a more accurate understanding of its contextual significance. We also introduce a new metric GREAT (Geospatial, Reasoning and Event Accuracy with Temporal alignment) for a reasoning capturing evaluation. Our layered multi-agentic approach, evaluated using a reasoning-weighted metric, demonstrates that meaningful information can be inferred from images, allowing them to be effectively linked to their corresponding events and broader contextual background."
}`}
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
};