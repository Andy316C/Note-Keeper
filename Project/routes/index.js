const routes = require('express').Router();

// Import our modular routers for /tips and /feedback
const notesRouter = require('./notes');


routes.use('/notes', notesRouter);


module.exports = routes;