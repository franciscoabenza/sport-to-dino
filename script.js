const express = require('express');
const path = require('path');
const robot = require('robotjs');
const { promisify } = require('util');

const wait = promisify(setTimeout);

const app = express();

app.use(express.static('static'));

app.get('/keypress/:keyId', (req, res) => {
  const keyId = req.params.keyId;
  try {
    robot.keyTap(keyId);
    console.log('registed key', keyId)
    res.status(200).send('shit');
  } catch (error) {
    res.status(500).send(`Failed to simulate keypress ${keyId}`);
  }
});

app.get('/', (req, res) => {
  const filePath = path.resolve(__dirname, 'frontend/index.html');
  return res.sendFile(filePath);
});

app.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
