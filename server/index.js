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

app.use('/api/record-catalog', router.helpers);
app.use('/api/trading-platform', router.tradingPlatform);
app.use('/api/profile', router.profile);
app.use('/api/messages', router.messages);
app.use('/api/register', router.register);
app.use('/wishlist', router.wishlist);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server available at http://localhost:${PORT}`));
