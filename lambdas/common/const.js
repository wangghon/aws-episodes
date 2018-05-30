const defaultParameters = {
  headers: { 'Content-Type': 'application/json' },
};

export const HTTP_CODES = {
  SUCCESS: 200,
  SUCCESS_CREATE: 201,
  ERROR_BAD_REQUEST: 400,
};

export const ERROR_BAD_REQUEST_DETAIL = {
  JSON_PARSE_FAIL: 'JSON_PARSE_FAIL',
  INVALID_CONTENT: 'INVALID_CONTENT',
};

const ERROR_DESCRIPTION = {
  JSON_PARSE_FAIL: { error: 'Could not decode request: JSON parsing failed' },
  INVALID_CONTENT: { error: 'Could not process request: No valid entity' }
};

const getErrorDescriptionObj = (detailError) => ERROR_DESCRIPTION[detailError] || {};

export const getCustomResponse = (error = null) => {
  const statusCode = error ? HTTP_CODES.ERROR_BAD_REQUEST : HTTP_CODES.SUCCESS;
  const body = JSON.stringify(error ? getErrorDescriptionObj(error) : {});
  return {
    ...defaultParameters,
    statusCode,
    body,
  };
};

