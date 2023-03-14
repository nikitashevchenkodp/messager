export const parseDate = (date: string) => {
  return new Date(date).toTimeString().slice(0, 5);
};
