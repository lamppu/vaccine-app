const express = require('express');

const router = express.Router();

const expiredBottles = require('./expired_bottles.js');
const leftToUse = require('./left_to_use.js');
const nextTenDays = require('./next_ten_days.js');
const orders = require('./orders.js');
const overall = require('./overall.js');
const vaccinations = require('./vaccinations.js');

const validateDate = require('./utils/validate_date.js');
const formatResponse = require('./utils/format_response.js');

const response = async (req, res, mod) => {
  try {
    let reqTS = req.query.date;
    const valid = validateDate(reqTS);

    if(valid.valid) {
      reqTS = (reqTS.replace('T', ' ')).replace('Z', '');

      let data;
      switch (mod) {
        case 'expiredBottles':
          data = await expiredBottles(reqTS);
          break;
        case 'leftToUse':
          data = await leftToUse(reqTS);
          break;
        case 'nextTenDays':
          data = await nextTenDays(reqTS);
          break;
        case 'orders':
          data = await orders(reqTS);
          break;
        case 'overall':
          data = await overall(reqTS);
          break;
        case 'vaccinations':
          data = await vaccinations(reqTS);
          break;
        default:

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
}

// Vaccines and bottles that have expired on the requested day by the requested time
router.get('/expiredbottles', async (req, res) => {
  await response(req, res, 'expiredBottles');
});

// Vaccines that can still be used
router.get('/lefttouse', async (req, res) => {
  await response(req, res, 'leftToUse');
});

// Vaccines that will expire within the next ten days
router.get('/nexttendays', async (req, res) => {
  await response(req, res, 'nextTenDays');
});

// Arrived orders on the requested date by the requested time
router.get('/orders', async (req, res) => {
  await response(req, res, 'orders');
});

// Vaccines that have expired overall
router.get('/overall', async (req, res) => {
  await response(req, res, 'overall');
});

// Vaccinations that have been given on the requested date by the requested time
router.get('/vaccinations', async (req, res) => {
  await response(req, res, 'vaccinations');
});

module.exports = router;
