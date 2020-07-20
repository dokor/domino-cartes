// @flow

export type HistoryLog = {
  +id: string,
  +idItem: string,
  +username: string,
  +table: string,
  +message: string,
  +modificationType: modificationType,
  +date: string,
};

export type modificationType = "CREATE" | "UPDATE" | "DELETE";

export const ModificationType = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
};

export type Criteria = {
  +username: string,
  +table: string,
  +message: string,
  +modificationType: modificationType,
  +date: string,
};
