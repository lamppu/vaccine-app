/* A function that takes in the string that has a key-value pair
and returns only the value string
*/
const getValues = (elem) => {
  elem = elem.slice(elem.indexOf(':')+1);
  return elem;
}

/* A function that takes in a string Like:
'{"id":"abcd","orderNumber":1,"responsiblePerson":"Name","healthCareDistrict":"Abbrev","vaccine":"Name","injections":4,"arrived":"2021-01-11T08:59:28.642790Z"}'
and returns an array of the values:
['abcd','1','Name','Abbev','Name','4','2021-01-11T08:59:28.642790Z']
*/
const valueParser = (str) => {
  // Removing the '{' and '}' characters from the string
  str = str.substring(1,str.length-1);
  // Removing quotes
  str = str.replace(/"/g,'');
  // Getting an array of key-value pairs
  let arr = str.split(',');
  // Mapping the array into an array with only the values
  return arr.map(getValues);
}

module.exports = valueParser;
