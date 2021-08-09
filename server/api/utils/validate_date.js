const validateDate = (dateString) => {
  if (!dateString || dateString == '""') {
    return {"valid": false, "message": "No date selected"};
  }
  try {
    const d = new Date(dateString);
    // Evaluating the date parts of the string in case for example February 31st would be accepted and returned as March 3rd
    const datepart1 = ((d.toISOString()).split('T'))[0];
    const datepart2 = (dateString.split('T'))[0];

    if (d == 'Invalid Date' || datepart1 !== datepart2) {
      return {"valid": false, "message": "Invalid Date"};
    }
    return {"valid": true, "message": null};
  } catch (e) {
    return {"valid": false, "message": "Invalid Date"};
  }

};

module.exports = validateDate;
