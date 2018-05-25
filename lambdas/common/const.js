const defaultParameters = {
  headers: { 'Content-Type': 'application/json' },
};

export const HTTP_CODES = {
  SUCCESS_POST: 201,
  ERROR_BAD_REQUEST: 400,
};

const ERROR_DESCRIPTION = {
  ERROR_BAD_REQUEST: { error: 'Could not decode request: JSON parsing failed' }
};

const getErrorDescriptionObj = (statusCode) => {
  const errorKey = Object.keys(ERROR_DESCRIPTION).find(key => object[key] === value);
  if (!errorKey) return {}
  return ERROR_DESCRIPTION[errorKey] || {};
}

export const getCustomResponses = (statusCode) => {
  const descObj = getErrorDescriptionObj(statusCode);

  return  {
    ...defaultParameters,
    statusCode,
    body: JSON.stringify(descObj),
  };
};