import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Container, GitBranch, Database, Shield, Terminal } from 'lucide-react';

const Skills = () => {
  const skills = [
    {
      category: 'Cloud & Infrastructure',
      icon: <Cloud className="w-6 h-6" />,
      items: ['Google Cloud Platform', 'Compute Engine', 'Cloud SQL', 'Cloud Storage'],
    },
    {
      category: 'Containers & Orchestration',
      icon: <Container className="w-6 h-6" />,
      items: ['Docker', 'Kubernetes', 'Microservices', 'Container Registry'],
    },
    {
      category: 'CI/CD & Automation',
      icon: <GitBranch className="w-6 h-6" />,
      items: ['Jenkins', 'Cloud Build', 'GitLab CI', 'Terraform'],
    },
    {
      category: 'AI & Development',
      icon: <Database className="w-6 h-6" />,
      items: ['GitHub Copilot', 'ChatGPT', 'AI-Driven Automation', 'Prompt Engineering'],
    },
    {
      category: 'DevOps Practices',
      icon: <Shield className="w-6 h-6" />,
      items: ['Infrastructure as Code', 'Cloud Shell', 'CLI Tools', 'Monitoring'],
    },
    {
      category: 'Soft Skills',
      icon: <Terminal className="w-6 h-6" />,
      items: ['Problem Solving', 'Communication', 'Team Collaboration', 'Documentation'],
    },
  ];

  return (
    <section id="skills" className="py-20">
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
              Skills
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
              >
                <div className="flex items-center gap-2 mb-4 text-cyan-400">
                  {skill.icon}
                  <h3 className="text-lg font-semibold">{skill.category}</h3>
                </div>
                <ul className="space-y-2">
                  {skill.items.map((item) => (
                    <li key={item} className="text-gray-300">• {item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills