const express = require('express');

const router = express.Router();

const ordersAndVaccines = require('./orders.js');
const vaccinations = require('./vaccinations.js');
const vaccines = require('./vaccines.js');
const validateDate = require('./utils/validate_date.js');
const formatResponse = require('./utils/format_response.js');

// The total number of orders and vaccines that have arrived on requested date, total & per producer & per district
// and the  total number of vaccinations on the given date, total & per producer & per district & gender distribution
router.get('/ordersandvaccinations', async (req, res) => {
  try {
    const dateString = req.query.date;
    const valid = validateDate(dateString);

    if(valid.valid) {
      const endTS = new Date(dateString)
      const beginTS = new Date((dateString.substring(0, 10) + 'T00:00:00Z'));
      const data = {
        "ordersData": await ordersAndVaccines(beginTS, endTS),
        "vaccinationsData": await vaccinations(beginTS, endTS)
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
/*
- The total number of arrived vaccines that have been used on requested date
- How many vaccines are left to use
- The total amount of bottles that have expired on the requested date
- The total amount of vaccines that expired before usage by requested date
- Total number of vaccines that are going to expire in the next ten days
*/
router.get('/vaccinedata', async (req, res) => {
  try {
    const dateString = req.query.date;
    const valid = validateDate(dateString);

    if(valid.valid) {
      const endTS = new Date(dateString)
      const beginTS = new Date((dateString.substring(0, 10) + 'T00:00:00Z'));

      const data = await vaccines(beginTS, endTS);

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

/*
router.get('', async (req, res) => {
  try {
    res.send(await (req.query.date));
  } catch (e) {
    console.log(e);
  }
})
*/

module.exports = router;
