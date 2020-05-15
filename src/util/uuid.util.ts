import uuid from 'uuid/v1';

// TODO eliminate it's usage, we want ids to be generated on backend
export const generateId = (): string => uuid();
