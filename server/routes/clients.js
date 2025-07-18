const express = require('express');
const Joi = require('joi');
const Client = require('../models/Client');
const { encrypt, decrypt } = require('../utils/encrypt');
// const auth = require('../middleware/auth'); // To be implemented

const router = express.Router();

// Validation schema
const clientSchema = Joi.object({
  name: Joi.string().required(),
  websiteCredentials: Joi.array().items(
    Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      url: Joi.string().allow(''),
    })
  ),
  domains: Joi.array().items(
    Joi.object({
      domainName: Joi.string().required(),
      registrar: Joi.string().allow(''),
      expiryDate: Joi.date().allow(null),
      renewalCharge: Joi.number().allow(null),
    })
  ),
  emailCredentials: Joi.array().items(
    Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      provider: Joi.string().allow(''),
    })
  ),
  notes: Joi.string().allow(''),
});

// Create client
router.post('/', /*auth,*/ async (req, res) => {
  const { error } = clientSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const data = { ...req.body };
    if (data.websiteCredentials) {
      data.websiteCredentials = data.websiteCredentials.map(cred => ({
        ...cred,
        password: encrypt(cred.password),
      }));
    }
    if (data.emailCredentials) {
      data.emailCredentials = data.emailCredentials.map(cred => ({
        ...cred,
        password: encrypt(cred.password),
      }));
    }
    const client = new Client(data);
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all clients
router.get('/', /*auth,*/ async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get client by ID
router.get('/:id', /*auth,*/ async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get client by ID (with decrypted credentials)
router.get('/:id/decrypted', /*auth,*/ async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    const data = client.toObject();
    if (data.websiteCredentials) {
      data.websiteCredentials = data.websiteCredentials.map(cred => ({
        ...cred,
        password: decrypt(cred.password),
      }));
    }
    if (data.emailCredentials) {
      data.emailCredentials = data.emailCredentials.map(cred => ({
        ...cred,
        password: decrypt(cred.password),
      }));
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update client
router.put('/:id', /*auth,*/ async (req, res) => {
  const { error } = clientSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const data = { ...req.body };
    if (data.websiteCredentials) {
      data.websiteCredentials = data.websiteCredentials.map(cred => ({
        ...cred,
        password: encrypt(cred.password),
      }));
    }
    if (data.emailCredentials) {
      data.emailCredentials = data.emailCredentials.map(cred => ({
        ...cred,
        password: encrypt(cred.password),
      }));
    }
    const client = await Client.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete client
router.delete('/:id', /*auth,*/ async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json({ message: 'Client deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 