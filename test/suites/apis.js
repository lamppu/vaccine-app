/*
const orders = require('../../server/api/orders.js');

const expect = require('chai').expect;

describe('Testing fetching number of orders and vaccines', () => {
  it('number of orders arrived on January 2nd 2021 by 16:25:04 should be 12', async () => {
    const timestamp = "2021-01-02T16:25:03.693461Z";
    expect((await orders.ordersAndVaccines(timestamp)).data.orders).to.equal(12);
  });
  it('number of vaccines arrived on January 2nd 2021 by 16:25:04 should be 61', async () => {
    const timestamp = "2021-01-02T16:25:03.693461Z";
    expect((await orders.ordersAndVaccines(timestamp)).data.vaccines).to.equal(61);
  });
  it('number of orders arrived on March 20th should be 61', async () => {
    const timestamp = "2021-03-20T23:59:59Z";
    expect((await orders.ordersAndVaccines(timestamp)).data.orders).to.equal(61);
  });
  it('number of vaccines arrived on March 20th should be 300', async () => {
    const timestamp = "2021-03-20T23:59:59Z";
    expect((await orders.ordersAndVaccines(timestamp)).data.vaccines).to.equal(300);
  });
  it('should return error message "Invalid Date"', async () => {
    const timestamp = "k";
    expect((await orders.ordersAndVaccines(timestamp)).error.message).to.equal('Invalid Date');
  });
  it('should return error message "No query string"', async () => {
    expect((await orders.ordersAndVaccines()).error.message).to.equal('No date selected');
  })
});*/
