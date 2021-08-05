const getNewDate = (oldDate, days) => {
  const date = new Date(oldDate);
  date.setDate(date.getDate() + days);

  const oldOffset = oldDate.getTimezoneOffset();
  const newOffset = date.getTimezoneOffset();

  if (oldOffset === newOffset) {
    return date;
  }
  let hours;
  if (oldOffset > newOffset) {
    hours = Math.abs(Math.abs(oldOffset) - Math.abs(newOffset))/60;
    date.setHours(date.getHours() + hours);
    return date;
  }

  hours = Math.abs(Math.abs(newOffset) - Math.abs(oldOffset))/60;
  date.setHours(date.getHours() - hours);

  return date;
}

module.exports = getNewDate;
