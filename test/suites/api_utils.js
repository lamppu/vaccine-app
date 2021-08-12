const expect = require('chai').expect;
const utils = require('../../server/api/utils');

describe('Testing API utils', () => {
  it('formatResponse should return a JSON string', () => {
    expect(utils.formatResponse(true, "hello", null))
    .deep.to.equal({"success": true, "data": "hello", "error": null});
  });

  it('validateDate should return a JSON string with message "No date selected"', () => {
    expect(utils.validateDate(''))
    .deep.to.equal({"valid": false, "message": "No date selected"});
  });
  it('validateDate should return a JSON string with message "Please give the date in the format YYYY-MM-DDTHH:mm:ss.ssssssZ"', () => {
    expect(utils.validateDate('2021-03-21T23:34:24'))
    .deep.to.equal({"valid": false, "message": "Please give the date in the format YYYY-MM-DDTHH:mm:ss.ssssssZ"});
  });
  it('validateDate should return a JSON string with message "Invalid Date" when validating February 30th', () => {
    expect(utils.validateDate('2021-02-30T23:59:59.999999Z'))
    .deep.to.equal({"valid": false, "message": "Invalid Date"});
  });
  it('validateDate should return a JSON string with valid value set to true', () => {
    expect(utils.validateDate('2021-01-06T23:59:59.999999Z'))
    .deep.to.equal({"valid": true, "message": null});
  });

  it('addDays should return date three days later', () => {
    const testDate = '2021-01-29 23:59:59.999999';
    expect(utils.addDays(testDate, 3))
    .deep.to.equal('2021-02-01 23:59:59.999999');
  });
  it('addDays should return date after 30 days', () => {
    const testDate = '2021-03-17 23:59:59.999999';
    expect(utils.addDays(testDate, 30))
    .deep.to.equal('2021-04-16 23:59:59.999999');
  });

  it('addMicrosecond should return the next day', () => {
    const testDate = '2021-03-17 23:59:59.999999';
    expect(utils.addMicrosecond(testDate))
    .deep.to.equal('2021-03-18 00:00:00.000000');
  });
  it('addMicrosecond should return a date that is one microsecond later that the requested', () => {
    const testDate = '2021-03-17 23:59:59.578247';
    expect(utils.addMicrosecond(testDate))
    .deep.to.equal('2021-03-17 23:59:59.578248');
  });

  it('compareDateStrings should return -1', () => {
    const testDate1 = '2021-03-17 23:59:59.578247';
    const testDate2 = '2021-03-17 23:59:59.578248';
    expect(utils.compareDateStrings(testDate1, testDate2))
    .to.equal(-1);
  });
  it('compareDateStrings should return 1', () => {
    const testDate1 = '2021-03-17 23:59:59.578249';
    const testDate2 = '2021-03-17 23:59:59.578248';
    expect(utils.compareDateStrings(testDate1, testDate2))
    .to.equal(1);
  });
  it('compareDateStrings should return 0', () => {
    const testDate1 = '2021-03-17 23:59:59.578249';
    const testDate2 = '2021-03-17 23:59:59.578249';
    expect(utils.compareDateStrings(testDate1, testDate2))
    .to.equal(0);
  });
});
