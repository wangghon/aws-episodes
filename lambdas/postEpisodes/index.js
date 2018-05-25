import 'babel-polyfill';

import { getCustomResponse, HTTP_CODES } from './common/const';

const validateRequest = (request) => {
  if (!request) return false;
  const { payload } = request;
  if (!payload || !Array.isArray(payload)) return false;
  return true;
};

const handlePostEpisodes = ({ payload }, callback) => {
  const validEpisodes = payload.filter((episode) => {
    const { episodeCount, image: { showImage }, slug, title, drm } = episode;
    return showImage && slug && title && episodeCount && episodeCount > 0 && drm;
  });

  const response = validEpisodes.map(({ image, slug, title }) => ({
    image: image.showImage,
    slug,
    title,
  }));

  if (response.length === 0) throw HTTP_CODES.ERROR_BAD_REQUEST;
  const res = {
    ...getCustomResponse(HTTP_CODES.SUCCESS_POST),
    body: JSON.stringify({ response }),
  };
  console.log('return result:', res);

  callback(null, res);
};

exports.handler = (event, context, callback) => {

  console.log('start to handle events:', JSON.stringify(event));
  console.log('the context is:', JSON.stringify(context));

  const { requestContext, body } = event;
  const { requestId: apiRequestId } = requestContext;
  console.log(`API Gateway Request ID: ${apiRequestId} Lambda Request ID: ${context.awsRequestId}`);

  console.log(`input data: ${body}`);
  try {
    const request = JSON.parse(body);

    if (!validateRequest(request)) {
      throw HTTP_CODES.ERROR_BAD_REQUEST;
    }

    handlePostEpisodes(request, callback);
  } catch (error) {
    const res = {
      ...getCustomResponse(error),
    };
    return callback('error', res);
  }
};
