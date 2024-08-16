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

  return `${year}-${month}-${dayOfMonth}`;
};

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(today.getDate()).padStart(2, '0'); // Days are zero-based

  return `${year}-${month}-${day}`;
};
