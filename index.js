const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to update the CSV file
app.post('/update-csv', (req, res) => {
  const { part_number, bar_length, part_length, part_off, extra, extra_s, leftover, zero, order_qty } = req.body;

  if (
    part_number === undefined || bar_length === undefined || part_length === undefined ||
    part_off === undefined || extra === undefined || extra_s === undefined ||
    leftover === undefined || zero === undefined || order_qty === undefined
  ) {
    return res.status(400).send({ error: 'Missing required fields' });
  }

  // Format data for CSV
  const row = `${part_number},${bar_length},${part_length},${part_off},${extra},${extra_s},${leftover},${zero},${order_qty}\n`;

  // Append the data to the CSV file
  fs.appendFile('data.csv', row, (err) => {
    if (err) {
      return res.status(500).send({ error: 'Failed to update the file' });
    }
    res.send({ message: 'CSV updated successfully' });
  });
});

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));