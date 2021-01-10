const express = require('express');
const http = require('http');

const bodyParser = require('body-parser');
const cors = require('cors');
const errors = require('./utils/errors');
const { response } = require('./utils/utils.js');
require('dotenv').config()

const index = require('./routes/index');

const app = express();

const server = http.createServer(app);

// Enable All CORS Requests
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Register Route V1
app.use(process.env.API_URL || '/api', index(app, server));

//404 handler
app.use(function (req, res, next) {
    const err = errors.not_found
    const error = new Error(JSON.stringify(err.message));
	error.status = err.status;
	error.code = err.code;
    next(error);
});

//error handler
app.use(function (err, req, res, next) {
    const message = JSON.parse(err.message);
    console.error('[ERROR]', err);
    response(req, res, err.status, err.code, message || err.message);
});

// http server
const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Connected on port: ${port}`));

module.exports = app;