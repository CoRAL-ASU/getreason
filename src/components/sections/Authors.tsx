import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Linkedin, Twitter, Mail, Globe } from 'lucide-react';
import shikhharImage from '../../assets/images/team/shikhhar.jpeg';
import abhinavImage from '../../assets/images/team/abhinav.jpeg';

export const Authors: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const authors = [
    {
      name: 'Abhinav Rawat',
      role: 'First Author',
      affiliation: 'Arizona State University',
      image: abhinavImage,
      bio: 'Graduate student with hands-on experience in deploying scalable LLM-based systems, AI-driven automation, and applied machine learning solutions across NLP, GenAI, and computer vision domains.',
      social: {
        twitter: 'https://x.com/raw_abh',
        linkedin: 'https://www.linkedin.com/in/abh-raw/',
        website: '#',
        email: 'mailto:arawat21@asu.edu',
      }
    },
    {
      name: 'Shikhhar Siingh',
      role: 'First Author',
      affiliation: 'Arizona State University',
      image: shikhharImage,
      bio: 'Graduate researcher specializing in deep learning and computer vision, with experience in deploying scalable ML systems and contributing to peer-reviewed medical imaging research.',
      social: {
        twitter: 'https://x.com/shikhharsiingh',
        linkedin: 'https://www.linkedin.com/in/shikhharsiingh/',
        website: '#',
        email: 'mailto:ssiingh@asu.edu',
      }
    }
  ];

  return (
    <section id="authors" className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">Research Team</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the research team behind the GETReason framework for hierarchical multi-agent image reasoning
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {authors.map((author, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={author.image} 
                  alt={author.name} 
                  className="w-full h-64 object-cover"
                  style={{
                    ...(author.name === 'Shikhhar Siingh' ? { objectPosition: 'center 40%' } : {}),
                    ...(author.name === 'Abhinav Rawat' ? { 
                      transform: 'scale(1.1)',
                      transformOrigin: 'center center'
                    } : {})
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-semibold text-lg">{author.name}</h3>
                    <p className="text-white/80 text-sm">{author.role}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-4 py-2 text-sm font-medium">
                    {author.affiliation}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {author.bio}
                </p>
                
                <div className="flex space-x-4 justify-center">
                  <a 
                    href={author.social.twitter} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-500 transition-colors p-2 rounded-full hover:bg-gray-100"
                    title="Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                  <a 
                    href={author.social.linkedin} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-gray-100"
                    title="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>

                  <a 
                    href={author.social.email} 
                    className="text-gray-400 hover:text-green-600 transition-colors p-2 rounded-full hover:bg-gray-100"
                    title="Email"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl p-8 shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4">Acknowledgements</h3>
            <p className="text-gray-600 leading-relaxed">
              This research was conducted at Arizona State University. 
              We thank the anonymous reviewers for their valuable feedback and the research community for their contributions to 
              multi-agent systems and computer vision research.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};