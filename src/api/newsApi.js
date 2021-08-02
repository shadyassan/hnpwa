import { serverUrl, handleResponse, handleError } from './apiUtils';

export function getAllDataAPI(url = 'news', page = 1) {
  return fetch(`${serverUrl}/${url}/${page}.json`)
    .then(handleResponse)
    .catch(handleError);
}

export function fetchNewsById(id) {
  return fetch(`${serverUrl}/item/${id}.json`)
    .then(handleResponse)
    .catch(handleError);
}
