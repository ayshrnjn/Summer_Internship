import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

function ClientDetails() {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get(`/clients/${id}/decrypted`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClient(res.data);
      } catch (err) {
        setError('Failed to fetch client details');
      } finally {
        setLoading(false);
      }
    };
    fetchClient();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!client) return <div>No client found.</div>;

  return (
    <div className="client-details-container">
      <h2>{client.name}</h2>
      <h3>Website Credentials</h3>
      <ul>
        {client.websiteCredentials.map((cred, idx) => (
          <li key={idx}>
            <strong>Username:</strong> {cred.username} <br />
            <strong>Password:</strong> {cred.password} <br />
            <strong>URL:</strong> {cred.url}
          </li>
        ))}
      </ul>
      <h3>Domains</h3>
      <ul>
        {client.domains.map((domain, idx) => (
          <li key={idx}>
            <strong>Domain:</strong> {domain.domainName} <br />
            <strong>Registrar:</strong> {domain.registrar} <br />
            <strong>Expiry:</strong> {domain.expiryDate} <br />
            <strong>Renewal Charge:</strong> {domain.renewalCharge}
          </li>
        ))}
      </ul>
      <h3>Email Credentials</h3>
      <ul>
        {client.emailCredentials.map((cred, idx) => (
          <li key={idx}>
            <strong>Email:</strong> {cred.email} <br />
            <strong>Password:</strong> {cred.password} <br />
            <strong>Provider:</strong> {cred.provider}
          </li>
        ))}
      </ul>
      {client.notes && <div><h3>Notes</h3><p>{client.notes}</p></div>}
    </div>
  );
}

export default ClientDetails; 