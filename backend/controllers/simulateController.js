const { roundRobin } = require('../services/scheduler');
const simulate = (req, res) => {
  const { processes, quantum } = req.body;
  if (!processes || !Array.isArray(processes) || processes.length === 0) return res.status(400).json({ error: 'Provide at least one process.' });
  if (!quantum || quantum <= 0) return res.status(400).json({ error: 'Quantum must be a positive number.' });
  const result = roundRobin(processes, quantum);
  res.json(result);
};
const healthCheck = (req, res) => res.json({ status: 'ok' });
module.exports = { simulate, healthCheck };