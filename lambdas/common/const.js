const defaultParameters = {
  headers: { 'Content-Type': 'application/json' },
};

const HTTP_CODES = {
  SUCCESS_POST: 201,
  ERROR_BAD_REQUEST: 400,
};

const ERROR_DESCRIPTION = {
  ERROR_BAD_REQUEST: { error: 'Could not decode request: JSON parsing failed' }
};

const getErrorDescriptionObj = (statusCode) => {
  const errorKey = Object.keys(ERROR_DESCRIPTION).find((key) => ERROR_DESCRIPTION[key] === statusCode);
  if (!errorKey) return {};
  return ERROR_DESCRIPTION[errorKey] || {};
};

const getCustomResponse = (statusCode) => {
  const descObj = getErrorDescriptionObj(statusCode);

  return {
    ...defaultParameters,
    statusCode,
    body: JSON.stringify(descObj),
  };
};

export default { getCustomResponse, HTTP_CODES };
