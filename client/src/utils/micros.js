const getMicrosString = (micros) => {
  if (micros/100000 >= 1) return (micros);
  if (micros/10000 >= 1) return ('0' + micros);
  if (micros/1000 >= 1) return ('00' + micros);
  if (micros/100 >= 1) return ('000' + micros);
  if (micros/10 >= 1) return ('0000' + micros);
  return ('00000' + micros);
}

module.exports.getMicrosString = getMicrosString;
