const vaccination = (arr) => {
  return {
    vaccinationId: arr[0],
    sourceBottle: arr[1],
    gender: arr[2],
    vaccinationDate: new Date(arr[3])
  }
}
module.exports = vaccination;
