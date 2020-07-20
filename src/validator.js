// @flow


export const required = value => (value ? undefined : 'Required');

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(error), undefined);
