const fs = require('fs');
const readline = require('readline');
/*
A parser for parsing a file into an array of objects. Takes in the path to the file and a
function to modify the objects to the correct format
*/
const parseFile = async (filePath, modifyObject, id) => {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Initializing array for objects
  const array = [];
  // Iterating through lines in the file
  for await (let line of rl) {
    let obj = JSON.parse(line);
    if (id === undefined) {
      obj = modifyObject(obj);
    } else {
      obj = modifyObject(obj, id);
    }
    array.push(obj);
  }
  return array;
}

module.exports = parseFile;
