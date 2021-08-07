const expect = require('chai').expect;
const utils = require('../../server/api/utils/');

describe('Testing API utils: database queries', () => {
  it('number of vaccinations on January 5th 2021 should be 10', async () => {
    const start = new Date ('2021-01-05T00:00:00.000Z');
    const end = new Date ('2021-01-05T23:59:59.999Z');
    const vaccinations = await utils.queryVaccinations(start, end);
    expect(vaccinations).to.equal(10);
  });
  it('number of vaccinations where gender=male on January 5th 2021 should be 3', async () => {
    const start = new Date ('2021-01-05T00:00:00.000Z');
    const end = new Date ('2021-01-05T23:59:59.999Z');
    const vaccinations = await utils.queryVaccinationsWithKey(start, end, 'gender', 'male');
    expect(vaccinations).to.equal(3);
  });
  it('number of vaccinations on January 5th 2021 where the source bottle is from Zerpfy should be 3', async () => {
    const start = new Date ('2021-01-05T00:00:00.000Z');
    const end = new Date ('2021-01-05T23:59:59.999Z');
    const vaccinations = await utils.queryVaccinationsWithOrderKey(start, end, 'vaccine', 'Zerpfy');
    expect(vaccinations).to.equal(3);
  });
  it('number of vaccinations on January 5th 2021 where the source bottle has arrived on January 3rd should be 2', async () => {
    const start = new Date ('2021-01-05T00:00:00.000Z');
    const end = new Date ('2021-01-05T23:59:59.999Z');
    const substart = new Date ('2021-01-03T00:00:00.000Z');
    const subend = new Date ('2021-01-03T23:59:59.999Z');
    const vaccinations = await utils.queryVaccinationsFromOrders(start, end, substart, subend);
    expect(vaccinations).to.equal(2);
  });
  it('number of vaccines that have arrived on January 5th 2021 by 4 am should be 53', async () => {
    const start = new Date ('2021-01-05T00:00:00.000Z');
    const end = new Date ('2021-01-05T04:00:00.000Z');
    const vaccines = await utils.queryInjections(start, end);
    expect(vaccines).to.equal(53);
  });
  it('number of vaccines that have arrived on January 5th 2021 by 4 am that are made by Zerpfy should be 25', async () => {
    const start = new Date ('2021-01-05T00:00:00.000Z');
    const end = new Date ('2021-01-05T04:00:00.000Z');
    const vaccines = await utils.queryInjectionsWithKey(start, end, 'vaccine', 'Zerpfy');
    expect(vaccines).to.equal(25);
  });
  it('number of orders that have arrived on January 5th 2021 by 4 am should be 10', async () => {
    const start = new Date ('2021-01-05T00:00:00.000Z');
    const end = new Date ('2021-01-05T04:00:00.000Z');
    const orders = await utils.queryOrders(start, end);
    expect(orders).to.equal(10);
  });
  it('number of orders that have arrived on January 5th 2021 by 4 am in the HYKS healthcare district should be 6', async () => {
    const start = new Date ('2021-01-05T00:00:00.000Z');
    const end = new Date ('2021-01-05T04:00:00.000Z');
    const orders = await utils.queryOrdersWithKey(start, end, 'healthCareDistrict', 'HYKS');
    expect(orders).to.equal(6);
  });
});
