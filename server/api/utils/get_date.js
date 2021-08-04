const getNewDate = (oldDate, days) => {
  return new Date(oldDate.setDate(oldDate.getDate() + days));
}

module.exports = getNewDate;
