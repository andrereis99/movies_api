const express = require('express');

// Routes
const moviesRouter = require('./movies');
const peopleRouter = require('./people');
const generateRouter = require('./generate');


const routersFunc = (app, server, mode) => {
    const router = express.Router();
    
    router.use('/movies', moviesRouter());
    router.use('/people', peopleRouter());
    router.use('/generate', generateRouter());
	return router;
}

module.exports = routersFunc;