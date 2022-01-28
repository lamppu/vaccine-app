const order = (obj, vaccineId) => {
  let o = obj;
  o.arrived = ((o.arrived).replace('T', ' ')).replace('Z', '');
  o.vaccine = vaccineId;
  delete obj.injections;
  return o;
};

module.exports = order;
