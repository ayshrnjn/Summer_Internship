import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ClientDetails from './pages/ClientDetails';
import AddClient from './pages/AddClient';
import EditClient from './pages/EditClient';
import Navbar from './Navbar';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/clients/new" element={<ProtectedRoute><AddClient /></ProtectedRoute>} />
        <Route path="/clients/:id" element={<ProtectedRoute><ClientDetails /></ProtectedRoute>} />
        <Route path="/clients/:id/edit" element={<ProtectedRoute><EditClient /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
