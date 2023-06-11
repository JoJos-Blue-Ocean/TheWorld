require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// ROUTES

app.use('/vinyl', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server available at http://localhost:${PORT}`));
