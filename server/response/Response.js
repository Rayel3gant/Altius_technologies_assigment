const resStatus = (res, status, msg) => {
  return res.status(200).send({ message: msg, status: status });
};

const resBadRequest = (res, status, msg) => {
  return res.status(400).send({ message: msg, status: status });
};

const resNotFound = (res, status, msg) => {
  return res.status(404).send({ message: msg, status: status });
};


// Status code , message and data
const resStatusData = (res, status, msg, data) => {
  return res.status(200).send({ message: msg, data: data, status: status });
};

const resErrorCode = (res, status, msg) => {
  return res.status(500).send({ status: status, message: msg });
};

// Status code , message , data and token
const resStatusDataToken = (res, status, msg, data, token) => {
  return res.status(200).send({ message: msg, token: token, data: data, status: status });
};

const resStatusToken = (res, status, msg, token) => {
  return res.status(200).send({ message: msg, token: token, status: status });
};


module.exports = {
  resStatus,
  resStatusData,
  resStatusDataToken,
  resStatusToken,
  resErrorCode,
  resBadRequest,
  resNotFound
};
