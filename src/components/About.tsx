import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Award } from 'lucide-react';
import TechStackGalaxy from './TechStackGalaxy';
import LiveActivityFeed from './LiveActivityFeed';
import AISkillMatrix from './AISkillMatrix';

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <h2 className="text-3xl font-bold text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-gray-300 text-lg">
                I'm Bandi Venkatesh, a Cloud Engineer specializing in GCP solutions and DevOps practices. With over 3 years of experience, I've helped organizations automate their infrastructure, optimize deployments, and integrate AI-driven solutions.
              </p>
              <p className="text-gray-300 text-lg">
                My journey started in mechanical engineering, but my passion for technology led me to cloud computing and DevOps. I'm particularly interested in the intersection of AI and infrastructure automation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Award className="text-cyan-400" />
                  Certifications
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                    Google Cloud Associate Engineer (ID: ab112200543542a9bfc57441cb4b5d1)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                    Future Goal: AWS AI/ML Specialty
                  </li>
                </ul>
              </div>

              <TechStackGalaxy />
              <LiveActivityFeed />
              <AISkillMatrix />

            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About
