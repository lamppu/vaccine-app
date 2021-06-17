const express = require('express');

const router = express.Router();

const orders = require('./orders.js');
const vaccinations = require('./vaccinations.js');
const expirations = require('./expirations.js');

// The total number of orders and vaccines that have arrived on requested date
router.get('/orders', async (req, res) => {
  try {
    res.send(await orders.allOrders(req.query.date));
  } catch (e) {
    console.log(e);
  }
})
// The total amount of orders and vaccines per producer
router.get('/orders/producer', async (req, res) => {
  try {
    res.send(await orders.perProducer(req.query.date));
  } catch (e) {
    console.log(e);
  }
})
// The total number of vaccines that have been used by requested date
router.get('/vaccinations', async (req, res) => {
  try {
    res.send(await vaccinations.allVaccinations(req.query.date));
  } catch (e) {
    console.log(e);
  }
})
// The gender distribution of all vaccinations by requested date
router.get('/vaccinations/gender', async (req, res) => {
  try {
    res.send(await vaccinations.byGender(req.query.date));
  } catch (e) {
    console.log(e);
  }
})
// The total amount of bottles that have expired on the requested date
router.get('/expired/bottles', async (req, res) => {
  try {
    res.send(await expirations.expiredBottlesOn(req.query.date));
  } catch (e) {
    console.log(e);
  }
})
// The total amount of vaccines that expired before usage by requested date
router.get('/expired/vaccines', async (req, res) => {
  try {
    res.send(await expirations.expiredVaccinesBy(req.query.date));
  } catch (e) {
    console.log(e);
  }
})
// The vaccines that are left to use on requested date
router.get('/orders/vaccines', async (req, res) => {
  try {
    res.send(await orders.vaccinesLeft(req.query.date));
  } catch (e) {
    console.log(e);
  }
})
// Total number of vaccines that are going to expire in the next ten days
router.get('/', async (req, res) => {
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
