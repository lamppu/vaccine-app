const express = require('express');

const router = express.Router();

const orders = require('./orders.js');
const vaccinations = require('./vaccinations.js');
const vaccines = require('./vaccines.js');
const expirations = require('./expirations.js');

// The total number of orders and vaccines that have arrived on requested date, total & per producer & per district
router.get('/orders', async (req, res) => {
  try {
    const resJSON = await orders.ordersAndVaccines(req.query.date);
    res.statusCode = (resJSON.success) ? 200 : resJSON.error.code;
    res.send(resJSON);
  } catch (e) {
    console.log(e);
  }
})
// The total number of vaccinations on the given date, total & per producer & per district & gender distribution
router.get('/vaccinations', async (req, res) => {
  try {
    const resJSON = await vaccinations.allVaccinations(req.query.date);
    res.statusCode = (resJSON.success) ? 200 : resJSON.error.code;
    res.send(resJSON);
  } catch (e) {
    console.log(e);
  }
})
// The total number of arrived vaccines that have been used on requested date,
// and how many vaccines are left to use
router.get('/vaccines/used', async (req, res) => {
  try {
    res.send(await vaccines.usedOn(req.query.date));
  } catch (e) {
    console.log(e);
  }
})
// The total amount of bottles that have expired on the requested date
router.get('/expirations/bottles', async (req, res) => {
  try {
    res.send(await expirations.expiredBottlesOn(req.query.date));
  } catch (e) {
    console.log(e);
  }
})
// The total amount of vaccines that expired before usage by requested date
router.get('/expirations/vaccines', async (req, res) => {
  try {
    res.send(await expirations.expiredVaccinesBy(req.query.date));
  } catch (e) {
    console.log(e);
  }
})
// The vaccines that are left to use on requested date
router.get('/vaccines', async (req, res) => {
  try {
    res.send(await vaccines.leftToUse(req.query.date));
  } catch (e) {
    console.log(e);
  }
})
// Total number of vaccines that are going to expire in the next ten days
router.get('/expirations/tendays', async (req, res) => {
  try {
    res.send(await expirations.toBeExpired(req.query.date));
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
