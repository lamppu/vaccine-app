const removeTAndZ = (str) => ((str.replace('T', ' ')).replace('Z', ''));

const addTAndZ = (str) => ((str.replace(' ', 'T')) + 'Z');

const getMinutes = (offset1, offset2) => (Math.abs(Math.abs(offset1) - Math.abs(offset2)));

const toReturnString = (date, lastThree) => {
  let str = date.toISOString();
  str = removeTAndZ(str);
  return (str + lastThree);
};

const addDays = (dateString, days) => {
  const lastThree = dateString.slice(dateString.length - 4, dateString.length - 1);
  const oldDate = new Date(addTAndZ(dateString));
  const newDate = new Date(oldDate);
  newDate.setDate(newDate.getDate() + days);

  const oldOffset = oldDate.getTimezoneOffset();
  const newOffset = newDate.getTimezoneOffset();

  if (oldOffset === newOffset) {
    return toReturnString(newDate, lastThree);
  }
  /*
  In case the function is used within a system that uses a timezone where there is
  a daylight saving time change between oldDate and the new date, in the next part
  the hours and minutes are corrected
  */
  let hours;
  let minutes;

  if (oldOffset > newOffset) {
    minutes = getMinutes(oldOffset, newOffset);
    hours = Math.floor(minutes/60);
    minutes = minutes % 60;
    newDate.setHours(newDate.getHours() + hours);
    newDate.setMinutes(newDate.getMinutes() + minutes);
    return toReturnString(newDate, lastThree);
  }

  minutes = getMinutes(newOffset, oldOffset);
  hours = Math.floor(minutes/60);
  minutes = minutes % 60;
  newDate.setHours(newDate.getHours() - hours);
  newDate.setMinutes(newDate.getMinutes() - minutes);
  return toReturnString(newDate, lastThree);
}

const addMicrosecond = (dateString) => {
  let parts = dateString.split('.')
  let micros = parseInt(parts[1]);

  if (micros === 999999) {
    const date = new Date(addTAndZ(dateString));
    date.setSeconds(date.getSeconds() + 1);
    let iso = date.toISOString();
    iso = removeTAndZ(iso);
    let parts2 = iso.split('.');

    return (parts2[0] + '.' + '000000');
  }
  micros = micros + 1;

  if (micros/100000 >= 1) return (parts[0] + '.' + micros)
  if (micros/10000 >= 1) return (parts[0] + '.0' + micros)
  if (micros/1000 >= 1) return (parts[0] + '.00' + micros)
  if (micros/100 >= 1) return (parts[0] + '.000' + micros)
  if (micros/10 >= 1) return (parts[0] + '.0000' + micros)
  return (parts[0] + '.00000' + micros);
}

const compareDateStrings = (dateString1, dateString2) => {
  // Returns -1 if dateString1 is a date before dateString2
  // Returns 0 if the datestrings are equal
  // Returns 1 if dateString1 is a date after dateString2

  if (dateString1 === dateString2) return 0;

  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  if (date1.getTime() < date2.getTime()) return -1;

  if (date1.getTime() > date2.getTime()) return 1;

  let micros1 = parseInt((dateString1.split('.'))[1]);
  let micros2 = parseInt((dateString2.split('.'))[1]);

  if (micros1 < micros2) return -1;
  return 1;
}

module.exports.addDays = addDays;
module.exports.addMicrosecond = addMicrosecond;
module.exports.compareDateStrings = compareDateStrings;
