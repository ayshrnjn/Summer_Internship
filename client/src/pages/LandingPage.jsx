import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing-bg">
      <motion.div className="landing-content" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="project-title">WebHostManager</h1>
        <p className="project-tagline">A Comprehensive Client Data Management System for Web Hosting Companies</p>
        <button className="primary-btn landing-btn" onClick={() => navigate('/login')}>Get Started</button>
      </motion.div>
    </div>
  );
}

export default LandingPage; 