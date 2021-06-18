const getBeginTimestamp = (endTS) => {
  let date = endTS.getDate();
  let month = endTS.getMonth() + 1;
  const year = endTS.getFullYear();
  const hours = endTS.getHours();

  month = (month >= 10) ? month : '0' + month;
  date = (hours < 2) ? date - 1 : date;
  date = (date >= 10) ? date : '0' + date;

  const beginString = year + '-' + month + '-' + date + 'T00:00:00Z';

  return new Date(beginString);
}

module.exports = getBeginTimestamp;
