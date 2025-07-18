import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <motion.nav className="navbar" initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <div className="navbar-left" onClick={() => navigate('/')}>WebHostManager</div>
      {isLoggedIn && (
        <div className="navbar-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/clients/new">Add Client</Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </motion.nav>
  );
}

export default Navbar; 