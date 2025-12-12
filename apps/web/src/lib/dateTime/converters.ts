/* eslint-disable @typescript-eslint/no-explicit-any */

const isISODateString = (value: unknown): boolean => {
  return (
    typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/.test(value)
  );
};

export const convertStringsToDates = (obj: any): void => {
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (typeof obj[i] === 'object' && obj[i] !== null) {
        convertStringsToDates(obj[i]);
      } else if (isISODateString(obj[i])) {
        obj[i] = new Date(obj[i]);
      }
    }
  } else if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        convertStringsToDates(obj[key]);
      } else if (isISODateString(obj[key])) {
        obj[key] = new Date(obj[key]);
      }
    }
  }
};
