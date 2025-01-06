export const isEqual = (a: string, b: string) => {
  return a.toLowerCase() === b.toLowerCase();
};

export const getNextDateForDay = (day: string): string => {
  const today = new Date();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const targetDay = daysOfWeek.indexOf(day);

  if (targetDay === -1) {
    throw new Error('Invalid day of the week');
  }

  const diff = (targetDay + 7 - today.getDay()) % 7;
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + diff || 7);

  const year = nextDate.getFullYear();
  const month = String(nextDate.getMonth() + 1).padStart(2, '0');
  const dayOfMonth = String(nextDate.getDate()).padStart(2, '0');

  return `${dayOfMonth}-${month}-${year}`;
};

export const getFormattedDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};
