const addDays = (oldDate, days) => {
  const date = new Date(oldDate);
  date.setDate(date.getDate() + days);

  const oldOffset = oldDate.getTimezoneOffset();
  const newOffset = date.getTimezoneOffset();

  if (oldOffset === newOffset) {
    return date;
  }
  /*
  In case the function is used within a system that uses a timezone where there is
  a daylight saving time change between oldDate and the new date, in the next part
  the hours and minutes are corrected
  */
  let hours;
  let minutes;
  if (oldOffset > newOffset) {
    minutes = Math.abs(Math.abs(oldOffset) - Math.abs(newOffset));
    hours = Math.floor(minutes/60);
    minutes = minutes % 60;
    date.setHours(date.getHours() + hours);
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  }
  minutes = Math.abs(Math.abs(newOffset) - Math.abs(oldOffset));
  hours = Math.floor(minutes/60);
  minutes = minutes % 60;
  date.setHours(date.getHours() - hours);
  date.setMinutes(date.getMinutes() - minutes);
  return date;
}

const addMillisecond = (oldDate) => {
  let date = new Date(oldDate);
  date.setMilliseconds(date.getMilliseconds() + 1);
  return date;
}

module.exports.addDays = addDays;
module.exports.addMillisecond = addMillisecond;
