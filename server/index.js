require('dotenv').config();
const Multer = require('multer');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');

const app = express();
const storage = new Multer.memoryStorage();
const upload = Multer({ storage });

// MIDDLEWARE
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// ROUTES

app.use('/api/record-catalog', router.helpers);
app.use('/api/trading-platform', router.tradingPlatform);
app.use('/api/profile', router.profile);
app.use('/api/trade-history', router.tradeHistory);
app.use('/api/wishlist', router.wishlist);
app.use('/api/messages', router.messages);
app.use('/api/register', router.register);
app.use('/api/photo', router.photo);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Server available at http://localhost:${PORT}`));
