

// mkdir stock-api
// cd stock-api
// npm init -y
// npm install express mongoose
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (replace URI as needed)
mongoose.connect('mongodb://localhost:27017/stockdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Define Stock Schema & Model
const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, index: true },
  price: { type: Number, required: true },
  volume: { type: Number, default: 0 },
  timestamp: { type: Date, required: true, index: true },
});

// Compound index for fast real-time latest price queries
stockSchema.index({ symbol: 1, timestamp: -1 });

const Stock = mongoose.model('Stock', stockSchema);

// Query functions

// 1. Get latest stock price for symbol
async function getLatestStockPrice(symbol) {
  return await Stock.findOne({ symbol })
    .sort({ timestamp: -1 }) // newest first
    .limit(1);
}

// 2. Get stocks by date range
async function getStocksByDateRange(symbol, startDate, endDate) {
  return await Stock.find({
    symbol,
    timestamp: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
  }).sort({ timestamp: 1 });
}

// 3. Get stocks for last N minutes
async function getStocksLastNMinutes(symbol, minutes) {
  const cutoff = new Date(Date.now() - minutes * 60000);
  return await Stock.find({
    symbol,
    timestamp: { $gte: cutoff },
  }).sort({ timestamp: 1 });
}

// Express routes

// Fetch stock data endpoint
app.get('/stocks/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const { start, end, lastMinutes } = req.query;

  try {
    if (start && end) {
      // Query by date range
      const data = await getStocksByDateRange(symbol, start, end);
      return res.json(data);
    }

    if (lastMinutes) {
      // Query last N minutes
      const minutes = Number(lastMinutes);
      if (isNaN(minutes) || minutes <= 0) {
        return res.status(400).json({ error: 'Invalid lastMinutes value' });
      }
      const data = await getStocksLastNMinutes(symbol, minutes);
      return res.json(data);
    }

    // Default: latest price
    const latest = await getLatestStockPrice(symbol);
    if (!latest) return res.status(404).json({ error: 'No stock data found' });
    res.json(latest);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching stock data' });
  }
});

// Optional: Endpoint to add stock data (for testing)
app.use(express.json());

app.post('/stocks', async (req, res) => {
  try {
    const { symbol, price, volume, timestamp } = req.body;
    if (!symbol || !price || !timestamp) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const stock = new Stock({
      symbol,
      price,
      volume: volume || 0,
      timestamp: new Date(timestamp),
    });
    await stock.save();
    res.status(201).json(stock);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error saving stock data' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
