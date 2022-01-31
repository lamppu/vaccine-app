const expect = require('chai').expect;
const utils = require('../../server/api/utils/');

describe('Testing API utils: database queries', () => {
  it('should return an integer', async () => {
    const id = await utils.queryIdForProducer("Antiqua");
    expect(id).to.be.a('number');
    expect(id % 1).to.equal(0);
  });
  it('should return a list of objects with two properties', async () => {
    const list = await utils.queryProducersAndIds();
    expect((Object.keys(list[0])).length).to.equal(2);
  });
  it('should return a list of objects with three properties', async () => {
    const list = await utils.queryVaccineRows();
    expect((Object.keys(list[0])).length).to.equal(3);
  });
  it('number of vaccinations on January 5th 2021 should be 10', async () => {
    const start = '2021-01-05 00:00:00.000000';
    const end = '2021-01-05 23:59:59.999999';
    const vaccinations = await utils.queryVaccinations(start, end);
    expect(vaccinations).to.equal(10);
  });
  it('number of vaccinations where gender=male on January 5th 2021 should be 3', async () => {
    const start = '2021-01-05 00:00:00.000000';
    const end = '2021-01-05 23:59:59.999999';
    const vaccinations = await utils.queryVaccinationsWithKey(start, end, 'gender', 'male');
    expect(vaccinations).to.equal(3);
  });
  it('number of vaccinations on January 5th 2021 where the source bottle is from Zerpfy should be 3', async () => {
    const start = '2021-01-05 00:00:00.000000';
    const end = '2021-01-05 23:59:59.999999';
    const id = await utils.queryIdForProducer('Zerpfy');
    const vaccinations = await utils.queryVaccinationsWithOrderKey(start, end, 'vaccine', id);
    expect(vaccinations).to.equal(3);
  });
  it('number of vaccinations on January 5th 2021 where the source bottle has arrived on January 3rd should be 2', async () => {
    const start = '2021-01-05 00:00:00.000000';
    const end = '2021-01-05 23:59:59.999999';
    const substart = '2021-01-03 00:00:00.000000';
    const subend = '2021-01-03 23:59:59.999999';
    const vaccinations = await utils.queryVaccinationsFromOrders(start, end, substart, subend);
    expect(vaccinations).to.equal(2);
  });
  it('number of vaccines that have arrived on January 5th 2021 by 4 am should be 53', async () => {
    const start = '2021-01-05 00:00:00.000000';
    const end = '2021-01-05 04:00:00.000000';
    const vaccines = await utils.queryInjections(start, end);
    expect(vaccines).to.equal(53);
  });
  it('number of orders that have arrived on January 5th 2021 by 4 am should be 10', async () => {
    const start = '2021-01-05 00:00:00.000000';
    const end = '2021-01-05 04:00:00.000000';
    const orders = await utils.queryOrders(start, end);
    expect(orders).to.equal(10);
  });
  it('number of orders that have arrived on January 5th 2021 by 4 am in the HYKS healthcare district should be 6', async () => {
    const start = '2021-01-05 00:00:00.000000';
    const end = '2021-01-05 04:00:00.000000';
    const orders = await utils.queryOrdersWithKey(start, end, 'healthCareDistrict', 'HYKS');
    expect(orders).to.equal(6);
  });
});
