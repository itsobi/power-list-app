const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const getDate = () => {
  const currentDate = new Date();

  const formattedDate = `${
    monthNames[currentDate.getMonth()]
  } ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  return formattedDate;
};
