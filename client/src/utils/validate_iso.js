const validateIso = (iso) => {
  if (!iso || iso.trim() === '') {
    return {valid: false, msg: "No date selected"};
  }
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{6}Z/.test(iso)) {
    return {valid: false, msg: "Please check the input"}
  }
  try {
    const d = new Date(iso);
    // Evaluating the date parts of the string in case for example February 31st would be accepted and returned as March 3rd
    const datepart1 = ((d.toISOString()).split('T'))[0];
    const datepart2 = (iso.split('T'))[0];

    if (d === 'Invalid Date' || datepart1 !== datepart2) {
      return {valid: false, msg: "Invalid Date"};
    }
    return {valid: true, msg: null};
  } catch (e) {
    return {valid: false, msg: "Invalid Date"};
  }

};

module.exports.validateIso = validateIso;
