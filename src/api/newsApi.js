import { serverUrl, handleResponse, handleError } from './apiUtils';

export function getAllNewsAPI(page) {
  return fetch(`${serverUrl}/news/${page}.json`)
    .then(handleResponse)
    .catch(handleError);
}

export function fetchNewsById(id) {
  return fetch(`${serverUrl}/item/${id}.json`)
    .then(handleResponse)
    .catch(handleError);
}

// export function fetchCommentsById(id) {
//   return fetch(`${baseUrl}/${id}/comments`)
//     .then(handleResponse)
//     .catch(handleError);
// }

// export function postAdd(post) {
//   return fetch(baseUrl, {
//     method: 'POST',
//     body: JSON.stringify(post),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   })
//     .then(handleResponse)
//     .catch(handleError);
// }

// export function postUpdate(post) {
//   return fetch(`${baseUrl}/${post.id}`, {
//     method: 'PUT',
//     body: JSON.stringify(post),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   })
//     .then(handleResponse)
//     .catch(handleError);
// }

// export function postDelete(id) {
//   return fetch(`${baseUrl}/${id}`, { method: 'DELETE' })
//     .then(handleResponse)
//     .catch(handleError);
// }
