const formatResponse = (success, data, error) => {
  return {
    "success": success,
    "data": data,
    "error": error
  };
};

module.exports = formatResponse;
