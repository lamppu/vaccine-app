const express = require('express');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  })
}

const router = require('./api/router');

app.use('/api/', router)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})

module.exports = app;
