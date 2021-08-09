const order = (obj) => {
  let o = obj;
  o.arrived = new Date(o.arrived);
  return o;
};

module.exports = order;
