const express = require('express');

const router = express.Router();

const ordersAndVaccines = require('./orders.js');
const vaccinations = require('./vaccinations.js');
const vaccines = require('./vaccines.js');
const validateDate = require('./utils/validate_date.js');
const formatResponse = require('./utils/format_response.js');

router.get('/data', async (req, res) => {
  try {
    const dateString = req.query.date;
    const valid = validateDate(dateString);

    if(valid.valid) {
      const endTS = new Date(dateString)
      const beginTS = new Date((dateString.substring(0, 10) + 'T00:00:00Z'));
      const data = {
        "ordersData": await ordersAndVaccines(beginTS, endTS),
        "vaccinationsData": await vaccinations(beginTS, endTS),
        "vaccineData": await vaccines(beginTS, endTS)
      }

      res.statusCode = 200;
      res.send(formatResponse(true, data, null));
    } else {
      res.statusCode = 400;
      res.send(formatResponse(false, null, valid.message));
    }
  } catch (e) {
    console.log(e);
  }
})

module.exports = router;
