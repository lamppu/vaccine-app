const order = (arr) => {
  return {
    id: arr[0],
    orderNumber: parseInt(arr[1]),
    responsiblePerson: arr[2],
    healthCareDistrict: arr[3],
    vaccine: arr[4],
    injections: parseInt(arr[5]),
    arrived: new Date(arr[6])
  }
};

module.exports = order;
