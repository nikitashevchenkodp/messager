export const fomatLastTimeOnline = (timestamp: number) => {
  if (timestamp === 0) return 'last seen recently';
  const currTimestamp = Date.now();
  const differense = currTimestamp - timestamp;
  const seconds = differense / 1000;
  const withEnding = (timeEntity: number) => (timeEntity > 1 ? 's' : '');

  if (seconds < 60) {
    return 'last seen just now';
  } else if (seconds < 60 * 60) {
    const minutes = Math.floor(seconds / 60);
    return `last seen ${minutes} minute${withEnding(minutes)} ago`;
  } else if (seconds < 60 * 60 * 24) {
    const hours = Math.floor(seconds / (60 * 60));
    return `last seen ${hours} hour${withEnding(hours)} ago`;
  } else if (seconds < 60 * 60 * 24 * 30) {
    const days = Math.floor(seconds / (60 * 60 * 24));
    return `last seen ${days} day${withEnding(days)} ago`;
  } else if (seconds < 60 * 60 * 24 * 30 * 30) {
    const months = Math.floor(seconds / (60 * 60 * 24 * 30));
    return `last seen ${months} month${withEnding(months)} ago`;
  } else {
    return 'last seen recently';
  }
};
