export const formatTime = (date: string) => {
  return new Date(Date.parse(date)).toLocaleTimeString().slice(0, 5);
};
