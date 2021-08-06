const getNewDate = (oldDate, days) => {
  const date = new Date(oldDate);
  date.setDate(date.getDate() + days);

  const oldOffset = oldDate.getTimezoneOffset();
  const newOffset = date.getTimezoneOffset();

  if (oldOffset === newOffset) {
    return date;
  }
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

module.exports = getNewDate;
