const app = require('express').Router();
const entries = require('../database/models/entries');

app.get('/', async (req, res) => {
  res.send(await entries.getEntries(req.query));
});

app.get('/entry', async (req, res) => {
  res.send(await entries.getEntry(req.query));
});

app.post('/save', async (req, res) => {
  res.send(await entries.saveEntry(req.body));
});

module.exports = app;
