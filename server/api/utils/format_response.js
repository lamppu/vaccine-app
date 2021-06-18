const formatResponse = (success, data, code, message) => {
  const error = (message == null) ? null : {"code": code, "message": message};
  return {
    "success": success,
    "data": data,
    "error": error
  };
};

module.exports = formatResponse;
