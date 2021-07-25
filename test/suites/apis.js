const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../server/index.js');

describe('Testing fetching orders and vaccinations data', () => {
  it('number of orders arrived on January 2nd 2021 by 16:25:04 should be 12', async () => {
    const timestamp = '2021-01-02T16:25:04Z';
    const res = await request(app).get('/ordersandvaccinations?date=' + timestamp);
    expect(res.body.data.ordersData.orders).to.equal(12);
  });
  it('number of vaccines arrived on January 2nd 2021 by 16:25:04 should be 61', async () => {
    const timestamp = '2021-01-02T16:25:03.693461Z';
    const res = await request(app).get('/ordersandvaccinations?date=' + timestamp);
    expect(res.body.data.ordersData.vaccines).to.equal(61);
  });
  it('number of orders arrived on March 20th should be 61', async () => {
    const timestamp = '2021-03-20T23:59:59Z';
    const res = await request(app).get('/ordersandvaccinations?date=' + timestamp);
    expect(res.body.data.ordersData.orders).to.equal(61);
  });
  it('number of vaccines arrived on March 20th should be 300', async () => {
    const timestamp = '2021-03-20T23:59:59Z';
    const res = await request(app).get('/ordersandvaccinations?date=' + timestamp);
    expect(res.body.data.ordersData.vaccines).to.equal(300);
  });
  it('should return error message "Invalid Date"', async () => {
    const timestamp = 'k';
    const res = await request(app).get('/ordersandvaccinations?date=' + timestamp);
    expect(res.body.error).to.equal('Invalid Date');
  });
  it('should return error message "No date selected"', async () => {
    const res = await request(app).get('/ordersandvaccinations?date=');
    expect(res.body.error).to.equal('No date selected');
  });
  it('number of vaccinations on January 5th 2021 should be 10', async () => {
    const timestamp = '2021-01-05T23:59:59Z';
    const res = await request(app).get('/ordersandvaccinations?date=' + timestamp);
    expect(res.body.data.vaccinationsData.vaccinations).to.equal(10);
  });
  it('number of Zerpfy vaccinations on January 5th 2021 should be 3', async () => {
    const timestamp = '2021-01-05T23:59:59Z';
    const res = await request(app).get('/ordersandvaccinations?date=' + timestamp);
    expect(res.body.data.vaccinationsData.zerpfyVaccinations).to.equal(3);
  });
  it('number of vaccinations done in HYKS district on January 5th 2021 should be 5', async () => {
    const timestamp = '2021-01-05T23:59:59Z';
    const res = await request(app).get('/ordersandvaccinations?date=' + timestamp);
    expect(res.body.data.vaccinationsData.hyksVaccinations).to.equal(5);
  });
})

/*
it('test case', async () => {
  const timestamp = '';
  const res = await request(app).get('/ordersandvaccinations?date=' + timestamp);
  expect(res.body.something).to.equal('something');
});
*/
