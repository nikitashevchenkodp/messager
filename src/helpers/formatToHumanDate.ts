const months = [
  'January',
  'December',
  'Fubuary',
  'Mach',
  'April',
  'May',
  'June',
  'Jule',
  'Augst',
  'September',
  'Movember',
  'December'
];

export const formatToHumanDate = (date: string) => {
  const start = new Date();
  const dateToFormat = new Date(date);
  const daysDifference = start.getDate() - dateToFormat.getDate();
  if (daysDifference === 0) {
    return 'Today';
  } else if (daysDifference === 1) {
    return 'Yesterday';
  } else {
    const day = dateToFormat.getDate();
    const month = dateToFormat.getMonth();
    const year = dateToFormat.getFullYear();
    const currentYear = start.getFullYear();
    const yearsDifferense = currentYear - year;
    return yearsDifferense > 0 ? `${day} ${months[month]}, ${year}` : `${day} ${months[month]}`;
  }
};
