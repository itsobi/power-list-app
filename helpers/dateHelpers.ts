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

export const collectionDate = () => {
  const currentDate = new Date();

  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const year = currentDate.getFullYear();

  const formattedDate = `${month}-${day}-${year}`;

  return formattedDate;
};

export const dropdownDates = () => {
  const today = new Date();

  // Create an array to store dropdown options
  const dropdownOptions = [];

  // Loop through the previous 5 days
  for (let i = 0; i < 5; i++) {
    // Create a new Date object for each day
    const previousDate = new Date(today);
    previousDate.setDate(today.getDate() - i);

    // Extract day, month, and year components
    const day = previousDate.getDate().toString().padStart(2, '0');
    const month = (previousDate.getMonth() + 1).toString().padStart(2, '0');
    const year = previousDate.getFullYear();

    // Format the date as a string (e.g., "MM-DD-YYYY")
    const formattedDate = `${month}-${day}-${year}`;

    // Add the formatted date to the dropdown options array
    dropdownOptions.push(formattedDate);
  }

  return dropdownOptions;
};
