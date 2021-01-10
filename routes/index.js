const express = require('express');

// Routes
const moviesRouter = require('./movies');


const routersFunc = (app, server, mode) => {
    const router = express.Router();
    
    router.use('/movies', moviesRouter());
	return router;
}

module.exports = routersFunc;