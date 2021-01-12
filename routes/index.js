const express = require('express');

// Routes
const moviesRouter = require('./movies');
const peopleRouter = require('./people');


const routersFunc = (app, server, mode) => {
    const router = express.Router();
    
    router.use('/movies', moviesRouter());
    router.use('/people', peopleRouter());
	return router;
}

module.exports = routersFunc;