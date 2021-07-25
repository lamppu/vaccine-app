const validateDate = (dateString) => {
  if (!dateString || dateString == '""') {
    return {"valid": false, "message": "No date selected"};
  }
  const d = new Date(dateString);

  if (d == 'Invalid Date') {
    return {"valid": false, "message": "Invalid Date"};
  }
  return {"valid": true, "message": null};
};

module.exports = validateDate;
