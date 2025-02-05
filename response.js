const GETResponse = (statusCode, data, message, res) => {
  res.status(statusCode).json({
    payload: data,
    message,
    metadata: {
      prev: "",
      next: "",
      current: "",
    },
  });
};

const POSTResponse = (statusCode, data, result, message, res) => {
  res.status(statusCode).json([
    {
      data,
      result,
      message,
    },
  ]);
};

const PUTResponse = (statusCode, data, result, message, res) => {
  res.status(statusCode).json([
    {
      data,
      result,
      message,
    },
  ]);
};

const DELETEResponse = (statusCode, message, res) => {
  res.status(statusCode).json([{ message }]);
};

const Response = (statusCode, message, res) => {
  res.status(statusCode).json({ message });
};

const DATAResponse = (statusCode, result, message, res) => {
  res.status(statusCode).json([
    {
      result,
      message,
    },
  ]);
};

export {
  GETResponse,
  POSTResponse,
  PUTResponse,
  DELETEResponse,
  Response,
  DATAResponse,
};
