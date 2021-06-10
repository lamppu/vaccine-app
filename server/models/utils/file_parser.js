const fs = require('fs');
const readline = require('readline');

const parseFile = async (fileName) => {
  const fileStream = fs.createReadStream(fileName);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  const array = [];
  for await (let line of rl) {
    array.push(line);
  }
  return array;
}

module.exports = parseFile;
