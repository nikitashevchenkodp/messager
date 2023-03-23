export const arrayToObject = <T extends Record<string, any>, K extends keyof T>(
  arr: T[],
  key: K
): { [key: string]: T } => {
  return arr.reduce((acc, item) => {
    const currElem = item[key];
    acc[currElem] = item;
    return acc;
  }, {} as { [id: string]: T });
};

export const arrayOfIds = (arr: any[], key: string) => {
  return arr.reduce((acc, item) => {
    acc.push(item[key]);
    return acc;
  }, []);
};
