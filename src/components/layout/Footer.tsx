import React from 'react';
import { Github } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <a 
              href="https://github.com/CoRAL-ASU/getreason?tab=readme-ov-file"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">GR</span>
              </div>
              <span className="font-bold text-xl">GETReason</span>
            </a>
            <p className="text-gray-400 mb-4">
              Enhancing Image Context Extraction through Hierarchical Multi-Agent Reasoning
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/CoRAL-ASU/getreason?tab=readme-ov-file"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#abstract" className="text-gray-400 hover:text-white transition-colors">
                  Abstract
                </a>
              </li>
              <li>
                <a href="#methodology" className="text-gray-400 hover:text-white transition-colors">
                  Methodology
                </a>
              </li>
              <li>
                <a href="#results" className="text-gray-400 hover:text-white transition-colors">
                  Results
                </a>
              </li>
              <li>
                <a href="#authors" className="text-gray-400 hover:text-white transition-colors">
                  Authors
                </a>
              </li>
              <li>
                <a href="#resources" className="text-gray-400 hover:text-white transition-colors">
                  Resources
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">
              Have questions or interested in collaboration?
            </p>
            <a 
              href="#contact" 
              className="inline-block px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-md transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="mt-2">Published at ACL 2025 Main Conference</p>
        </div>
      </div>
    </footer>
  );
};