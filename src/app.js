const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const connectDB = require('./utils/connectionDB');
const { initModels } = require('./models/initModels');
const { routerApi } = require('./routes');

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());

// Connection DB and init models
connectDB();

// Routes
app.use('/api/v1', routerApi);


module.exports = app;