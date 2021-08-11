const order = (obj) => {
  let o = obj;
  o.arrived = ((o.arrived).replace('T', ' ')).replace('Z', '');
  return o;
};

module.exports = order;
