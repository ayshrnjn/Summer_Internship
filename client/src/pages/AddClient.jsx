import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function AddClient() {
  const [name, setName] = useState('');
  const [websiteCredentials, setWebsiteCredentials] = useState([{ username: '', password: '', url: '' }]);
  const [domains, setDomains] = useState([{ domainName: '', registrar: '', expiryDate: '', renewalCharge: '' }]);
  const [emailCredentials, setEmailCredentials] = useState([{ email: '', password: '', provider: '' }]);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/clients', {
        name,
        websiteCredentials,
        domains,
        emailCredentials,
        notes,
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to add client');
    }
  };

  const handleChange = (setter, idx, field, value) => {
    setter(prev => prev.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };

  const handleAddField = (setter, emptyObj) => {
    setter(prev => [...prev, emptyObj]);
  };

  return (
    <div className="centered-container">
      <div className="auth-card" style={{ maxWidth: 600 }}>
        <h2>Add Client</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Website Credentials</label>
            {websiteCredentials.map((cred, idx) => (
              <div key={idx} style={{ marginBottom: 8 }}>
                <input placeholder="Username" value={cred.username} onChange={e => handleChange(setWebsiteCredentials, idx, 'username', e.target.value)} required style={{ marginRight: 4 }} />
                <input placeholder="Password" value={cred.password} onChange={e => handleChange(setWebsiteCredentials, idx, 'password', e.target.value)} required style={{ marginRight: 4 }} />
                <input placeholder="URL" value={cred.url} onChange={e => handleChange(setWebsiteCredentials, idx, 'url', e.target.value)} />
              </div>
            ))}
            <button type="button" className="primary-btn" style={{ marginTop: 4, width: 'auto', padding: '4px 12px' }} onClick={() => handleAddField(setWebsiteCredentials, { username: '', password: '', url: '' })}>+ Add</button>
          </div>
          <div className="form-group">
            <label>Domains</label>
            {domains.map((domain, idx) => (
              <div key={idx} style={{ marginBottom: 8 }}>
                <input placeholder="Domain Name" value={domain.domainName} onChange={e => handleChange(setDomains, idx, 'domainName', e.target.value)} required style={{ marginRight: 4 }} />
                <input placeholder="Registrar" value={domain.registrar} onChange={e => handleChange(setDomains, idx, 'registrar', e.target.value)} style={{ marginRight: 4 }} />
                <input type="date" placeholder="Expiry Date" value={domain.expiryDate} onChange={e => handleChange(setDomains, idx, 'expiryDate', e.target.value)} style={{ marginRight: 4 }} />
                <input type="number" placeholder="Renewal Charge" value={domain.renewalCharge} onChange={e => handleChange(setDomains, idx, 'renewalCharge', e.target.value)} />
              </div>
            ))}
            <button type="button" className="primary-btn" style={{ marginTop: 4, width: 'auto', padding: '4px 12px' }} onClick={() => handleAddField(setDomains, { domainName: '', registrar: '', expiryDate: '', renewalCharge: '' })}>+ Add</button>
          </div>
          <div className="form-group">
            <label>Email Credentials</label>
            {emailCredentials.map((cred, idx) => (
              <div key={idx} style={{ marginBottom: 8 }}>
                <input placeholder="Email" value={cred.email} onChange={e => handleChange(setEmailCredentials, idx, 'email', e.target.value)} required style={{ marginRight: 4 }} />
                <input placeholder="Password" value={cred.password} onChange={e => handleChange(setEmailCredentials, idx, 'password', e.target.value)} required style={{ marginRight: 4 }} />
                <input placeholder="Provider" value={cred.provider} onChange={e => handleChange(setEmailCredentials, idx, 'provider', e.target.value)} />
              </div>
            ))}
            <button type="button" className="primary-btn" style={{ marginTop: 4, width: 'auto', padding: '4px 12px' }} onClick={() => handleAddField(setEmailCredentials, { email: '', password: '', provider: '' })}>+ Add</button>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} style={{ width: '100%', borderRadius: 6, padding: 8 }} />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="primary-btn">Add Client</button>
        </form>
      </div>
    </div>
  );
}

export default AddClient; 