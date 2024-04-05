export const getDateFormat = (date: string): string => {
  const startCurrentDay = new Date(new Date().toLocaleDateString()).getTime();
  const lastClearedDate = new Date(date);
  const [nameDay, nameMonth, day, year] = `${new Date(lastClearedDate)}`.split(
    " "
  );
  let dateFormat = `${day} ${nameMonth} ${year} ${lastClearedDate.getHours()}h${lastClearedDate.getMinutes()} `;

  if (startCurrentDay <= lastClearedDate.getTime()) {
    dateFormat += "(Today)";
  } else {
    dateFormat += `(${nameDay})`;
  }

  return dateFormat;
};
