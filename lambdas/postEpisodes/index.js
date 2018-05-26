import 'babel-polyfill';

import { getCustomResponse, ERROR_BAD_REQUEST_DETAIL } from './common/const';

const validateRequest = (request) => {
  console.log('check if request is valid');
  if (!request) return false;
  const { payload } = request;
  console.log('check if payload is valid', payload);
  if (!payload) return false;
  console.log('check if payload is array');
  if (!Array.isArray(payload)) return false;
  return true;
};

const handlePostEpisodes = (payload) => {
  const validEpisodes = payload.filter((episode) => {
    const { episodeCount, image, slug, title, drm } = episode;
    return image && image.showImage && slug && title && episodeCount && episodeCount > 0 && drm;
  });
  console.log('handlePostEpisodes validEpisodes ', validEpisodes);

  const response = validEpisodes.map(({ image, slug, title }) => ({
    image: image.showImage,
    slug,
    title,
  }));

  console.log('handlePostEpisodes response ', response);
  return response;
};

exports.handler = (event, context, callback) => {

  console.log('start to handle events:', JSON.stringify(event));
  console.log('the context is:', JSON.stringify(context));

  const { body } = event;
  console.log(`input data: ${body}`);
  let res;

  try {
    const request = JSON.parse(body);

    if (!validateRequest(request)) throw ERROR_BAD_REQUEST_DETAIL.INVALID_CONTENT;

    const response = handlePostEpisodes(request.payload);

    if (response.length === 0) throw ERROR_BAD_REQUEST_DETAIL.INVALID_CONTENT;

    res = {
      ...getCustomResponse(),
      body: JSON.stringify({ response }),
    };
  } catch (e) {
    console.log('catched error: ', e);
    const error = e instanceof SyntaxError ? ERROR_BAD_REQUEST_DETAIL.JSON_PARSE_FAIL : e;
    res = { ...getCustomResponse(error) };
  }
  console.log('returned response ', res);
  callback(null, res);
};
