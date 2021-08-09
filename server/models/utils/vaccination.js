const vaccination = (obj) => {
  let v = obj;
  v.vaccinationDate = new Date(v.vaccinationDate);
  delete Object.assign(v, {vaccinationId: v['vaccination-id']})['vaccination-id'];
  return v;
};

module.exports = vaccination;
