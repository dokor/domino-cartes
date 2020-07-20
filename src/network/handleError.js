// @flow

export function unwrap<T>(value: ?T): T {
  if (!value) throw new Error('Unwrapping not possible because the variable is null or undefined!');
  return value; // at this point Flow should understand it cannot be of type Optional or Maybe
}

export const errorObject = {
  errorCode: 'INTERNAL_ERROR',
  statusArguments: [],
};

export function rawResponseCatcher(response: Object) {
  console.log('Cannot connect to HTTP server', response);
  throw Promise.resolve(errorObject);
}

export function jsonResponseCatcher(response: Object) {
  const contentType = response.headers.get('content-type');
  if (response.bodyValue && (!contentType || contentType.indexOf('application/json') === -1)) {
    console.log('Response type is not json', response);
    throw Promise.resolve(errorObject);
  }
  return response;
}

export function toJsonError(response: Object) {
  if (typeof response.then === 'function') {
    throw response;
  }
  const contentType = response.headers.get('content-type');
  if (!contentType || contentType.indexOf('application/json') === -1) {
    console.log('Response type is not JSON', response);
    throw errorObject;
  }
  throw response.json();
}

export default function handleError(response: Object) {
  if (response.status === 403) {
    throw Promise.resolve({
      errorCode: 'AUTHENTIFICATION_EXPIRED',
      statusArguments: [],
    });
  }
  if (!response.ok) {
    throw response;
  }
  return response;
}
