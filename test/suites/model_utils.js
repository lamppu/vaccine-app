const expect = require('chai').expect;
const utils = require('../../server/models/utils');

describe('Testing utils for parsing files and modifying objects', () => {
  it('should return an altered order object', () => {
    let obj = {
      id: '6da3a8cf-c923-4c77-8f80-c69c935fe1df',
      orderNumber: 1,
      responsiblePerson: 'Joonatan Siloma',
      healthCareDistrict: 'KYS',
      vaccine: 'Antiqua',
      injections: 4,
      arrived: '2021-01-11T08:59:28.642790Z'
    }
    expect(
      utils.order(obj))
    .deep.to.equal(
      {
        id: '6da3a8cf-c923-4c77-8f80-c69c935fe1df',
        orderNumber: 1,
        responsiblePerson: 'Joonatan Siloma',
        healthCareDistrict: 'KYS',
        vaccine: 'Antiqua',
        injections: 4,
        arrived: '2021-01-11 08:59:28.642790'
      }
    )
  });
  it('should return an altered vaccination object', () => {
    let obj = {
      'vaccination-id': 'bcff2e53-e515-4636-991a-ff4bfa5b931f',
      sourceBottle: 'e1cd8aac-3796-4517-899d-45b45aa792c3',
      gender: 'nonbinary',
      vaccinationDate: '2021-02-07T20:20:59.662864Z'
    }
    expect(
      utils.vaccination(obj)
    ).deep.to.equal(
      {
        vaccinationId: 'bcff2e53-e515-4636-991a-ff4bfa5b931f',
        sourceBottle: 'e1cd8aac-3796-4517-899d-45b45aa792c3',
        gender: 'nonbinary',
        vaccinationDate: '2021-02-07 20:20:59.662864'
      }
    )
  });
  it('should return an array with 5 items', async () => {
    expect(await utils.parser('./test/test_data/order_test.source', utils.order))
    .to.have.lengthOf(5);
  });
});
