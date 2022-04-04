export const isEmptyObj = (obj: any) => JSON.stringify(obj) === '{}';

export const deepCopy = <T = any>(obj: T): T => JSON.parse(JSON.stringify(obj));
