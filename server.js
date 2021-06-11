const express = require('express');
const app = express();
const path = require('path');

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('HELLO WORLD!');
});

app.listen(3000, () => console.log('Server running on port 3000'));