const app = require('express').Router();
const users = require('../database/models/users');

app.get('/', async (req, res) => {
  res.send(await users.getUser(req.query.firstName));
});

module.exports = app;
