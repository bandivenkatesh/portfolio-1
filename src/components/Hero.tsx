import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Cloud, Database, GitBranch } from 'lucide-react';

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold">
            <TypeAnimation
              sequence={[
                'Cloud Engineer Automating Scalable Futures',
                1000,
                'Merging AI with DevOps Excellence',
                1000,
                'Building Tomorrow\'s Infrastructure Today',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            />
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            3+ years of experience designing scalable GCP solutions. Skilled in Kubernetes, Terraform, CI/CD, and AI-driven automation. Certified Google Cloud Engineer passionate about merging DevOps with AI.
          </p>

          <div className="flex justify-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-medium shadow-lg shadow-cyan-500/20"
            >
              View Projects
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-cyan-500 rounded-lg font-medium text-cyan-400 hover:bg-cyan-500/10 transition-colors"
            >
              Download Resume
            </motion.button>
          </div>

          <div className="flex justify-center space-x-12 mt-16">
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-cyan-400"
            >
              <Cloud size={40} />
            </motion.div>
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                delay: 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-blue-400"
            >
              <Database size={40} />
            </motion.div>
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                delay: 0.6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-cyan-400"
            >
              <GitBranch size={40} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero