const vaccination = (obj) => {
  let v = obj;
  v.vaccinationDate = ((v.vaccinationDate).replace('T', ' ')).replace('Z', '');
  delete Object.assign(v, {vaccinationId: v['vaccination-id']})['vaccination-id'];
  return v;
};

module.exports = vaccination;
