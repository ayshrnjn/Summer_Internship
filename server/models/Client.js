const mongoose = require('mongoose');

const CredentialSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }, // Will be encrypted
  url: { type: String },
});

const DomainSchema = new mongoose.Schema({
  domainName: { type: String, required: true },
  registrar: { type: String },
  expiryDate: { type: Date },
  renewalCharge: { type: Number },
});

const EmailCredentialSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }, // Will be encrypted
  provider: { type: String },
});

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  websiteCredentials: [CredentialSchema],
  domains: [DomainSchema],
  emailCredentials: [EmailCredentialSchema],
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Client', ClientSchema); 