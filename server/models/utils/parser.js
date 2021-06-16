const fs = require('fs');
const readline = require('readline');
const valueParser = require('./value_parser.js')

/*
A parser for parsing a file into objects. Takes in the path to the file and a
function to create objects from the values
*/
const parseFile = async (filePath, createObject) => {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Initializing array for objects
  const array = [];
  // Iterating through lines in the file
  for await (let line of rl) {
    // Parsing array of values from the string
    let arr = valueParser(line);
    // Making the object from the values and pushing to the array
    array.push(createObject(arr));
  }
  return array;
}

module.exports = parseFile;
