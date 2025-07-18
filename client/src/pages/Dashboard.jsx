import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await api.get('/clients');
        setClients(res.data);
      } catch (err) {
        setError('Failed to fetch clients');
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const handleAddClient = () => {
    navigate('/clients/new');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this client?')) return;
    try {
      await api.delete(`/clients/${id}`);
      setClients(clients.filter(c => c._id !== id));
    } catch (err) {
      alert('Failed to delete client');
    }
  };

  if (loading) return <div className="centered-container"><div>Loading...</div></div>;
  if (error) return <div className="centered-container"><div style={{ color: 'red' }}>{error}</div></div>;

  return (
    <div className="dashboard-main">
      <div className="dashboard-header">
        <h2>Client Dashboard</h2>
        <button className="primary-btn" onClick={handleAddClient}>+ Add Client</button>
      </div>
      <div className="client-list">
        {clients.length === 0 ? (
          <div>No clients found.</div>
        ) : (
          clients.map(client => (
            <div className="client-card" key={client._id}>
              <h3>{client.name}</h3>
              <div><b>Domains:</b> {client.domains?.map(d => d.domainName).join(', ') || 'N/A'}</div>
              <div><b>Expiry:</b> {client.domains?.map(d => d.expiryDate ? d.expiryDate.substring(0,10) : 'N/A').join(', ')}</div>
              <div className="client-actions">
                <Link to={`/clients/${client._id}`} className="view-btn">View</Link>
                <Link to={`/clients/${client._id}/edit`} className="edit-btn">Edit</Link>
                <button className="delete-btn" onClick={() => handleDelete(client._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard; 