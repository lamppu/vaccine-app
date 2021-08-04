const Vaccination = require('../models/bookshelf/vaccination.js');
const Order = require('../models/bookshelf/order.js');
/*
- The total number of arrived vaccines that have been used on requested date
- How many vaccines are left to use
- The total amount of bottles that have expired on the requested date
- The total amount of vaccines that expired before usage by requested date
- Total number of vaccines that are going to expire in the next ten days
*/

const vaccines = async (beginTS, endTS) => {
  const subquery = await Order.whereBetween('arrived', beginTS, endTS).select('id').buildQuery();
  const usedArrived = await Vaccination.whereBetween('vaccinationDate', beginTS, endTS).whereIn('sourceBottle', subquery.query).count();

  const data = {
    "usedArrived": usedArrived,
    "leftToUse": null,
    "expiredBottles": null,
    "expiredVaccinesOverall": null,
    "expiresInTenDays": null
  };
  return data;
}
module.exports = vaccines;
