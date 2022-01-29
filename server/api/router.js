const express = require('express');

const router = express.Router();

const orders = require('./orders.js');
const vaccinations = require('./vaccinations.js');

const validateDate = require('./utils/validate_date.js');
const formatResponse = require('./utils/format_response.js');

router.get('/orders', async (req, res) => {
  try {
    const dateString = req.query.date;
    const valid = validateDate(dateString);

    if(valid.valid) {
      const endTS = (dateString.replace('T', ' ')).replace('Z', '');
      const beginTS = dateString.substring(0, 10) + ' 00:00:00.000000';

      const data = await orders(beginTS, endTS);

      res.statusCode = 200;
      res.send(formatResponse(true, data, null));
    } else {
      res.statusCode = 400;
      res.send(formatResponse(false, null, valid.message));
    }
  } catch (e) {
    console.log(e);
    res.statusCode = 400;
    res.send(formatResponse(false, null, "Something went wrong. Please try again."));
  }
})

router.get('/vaccinations', async (req, res) => {
  try {
    const dateString = req.query.date;
    const valid = validateDate(dateString);

    if(valid.valid) {
      const endTS = (dateString.replace('T', ' ')).replace('Z', '');
      const beginTS = dateString.substring(0, 10) + ' 00:00:00.000000';

      const data = await vaccinations(beginTS, endTS);

      res.statusCode = 200;
      res.send(formatResponse(true, data, null));
    } else {
      res.statusCode = 400;
      res.send(formatResponse(false, null, valid.message));
    }
  } catch (e) {
    console.log(e);
    res.statusCode = 400;
    res.send(formatResponse(false, null, "Something went wrong. Please try again."));
  }
})

/*
router.get('/', async (req, res) => {
  try {
  const dateString = req.query.date;
  const valid = validateDate(dateString);

  if(valid.valid) {
    const endTS = (dateString.replace('T', ' ')).replace('Z', '');
    const beginTS = dateString.substring(0, 10) + ' 00:00:00.000000';

    const data = await something(beginTS, endTS);


    res.statusCode = 200;
    res.send(formatResponse(true, data, null));
  } else {
    res.statusCode = 400;
    res.send(formatResponse(false, null, valid.message));
  }
  } catch (e) {
    console.log(e);
    res.statusCode = 400;
    res.send(formatResponse(false, null, "Something went wrong. Please try again."));
  }
})

router.get('/data', async (req, res) => {
  try {
    const dateString = req.query.date;
    const valid = validateDate(dateString);

    if(valid.valid) {
      const endTS = (dateString.replace('T', ' ')).replace('Z', '');
      const beginTS = dateString.substring(0, 10) + ' 00:00:00.000000';

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
    res.statusCode = 400;
    res.send(formatResponse(false, null, "Something went wrong. Please try again."));
  }
})
*/
module.exports = router;
