const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

const router = require('./api/router');

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})
