const TYPE_JSON = "application/json";

const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_UNAUTHORIZED = 401;
const STATUS_CODE_NOT_FOUND = 404;
const STATUS_CODE_SERVER_ERROR = 500;

const jsonOK = function (data, message, metadata) {
  const status = STATUS_CODE_OK;

  message = message ? message : "Successful request.";
  metadata = metadata ? metadata : {};

  this.status(status);
  this.type(TYPE_JSON);

  return this.json({ message, data, metadata, status });
};

const jsonBadRequest = function (data, message, metadata) {
  const status = STATUS_CODE_BAD_REQUEST;

  message = message ? message : "Bad request.";
  metadata = metadata ? metadata : {};

  this.status(status);
  this.type(TYPE_JSON);

  return this.json({ message, data, metadata, status });
};

const jsonUnauthorized = function (data, message, metadata) {
  const status = STATUS_CODE_UNAUTHORIZED;

  message = message ? message : "Unauthorized.";
  metadata = metadata ? metadata : {};

  this.status(status);
  this.type(TYPE_JSON);

  return this.json({ message, data, metadata, status });
};

const jsonNotFound = function (data, message, metadata) {
  const status = STATUS_CODE_NOT_FOUND;

  message = message ? message : "Not found.";
  metadata = metadata ? metadata : {};

  this.status(status);
  this.type(TYPE_JSON);

  return this.json({ message, data, metadata, status });
};

const jsonServerError = function (data, message, metadata) {
  const status = STATUS_CODE_SERVER_ERROR;

  message = message ? message : "Server error.";
  metadata = metadata ? metadata : {};

  this.status(status);
  this.type(TYPE_JSON);

  return this.json({ message, data, metadata, status });
};

const response = (req, res, next) => {
  res.jsonOK = jsonOK;
  res.jsonBadRequest = jsonBadRequest;
  res.jsonUnauthorized = jsonUnauthorized;
  res.jsonNotFound = jsonNotFound;
  res.jsonServerError = jsonServerError;

  next();
};

module.exports = response;
