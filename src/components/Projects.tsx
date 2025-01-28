import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Cloud, Database } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'GCP Microservices Deployment',
      description: 'Deployed microservices on GCP using Kubernetes, improving scalability and performance.',
      metrics: '40% scalability improvement',
      icon: <Cloud className="w-6 h-6 text-cyan-400" />,
    },
    {
      title: 'CI/CD Pipeline Automation',
      description: 'Automated deployment pipelines using Jenkins and Cloud Build for multiple applications.',
      metrics: '65% faster deployments',
      icon: <GitBranch className="w-6 h-6 text-cyan-400" />,
    },
    {
      title: 'Terraform Infrastructure',
      description: 'Implemented Infrastructure as Code using Terraform with AI-assisted scripting.',
      metrics: '70% reduced deployment time',
      icon: <Database className="w-6 h-6 text-cyan-400" />,
    },
  ];

  return (
    <section id="projects" className="py-20">
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
              Projects
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-cyan-400 transition-colors"
              >
                <div className="mb-4">{project.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <p className="text-cyan-400 font-medium">{project.metrics}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects