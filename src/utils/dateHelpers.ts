export const formatDate = (date: string | null): string => {
  if (!date) return 'Present';

  // Handle both YYYY-MM and MM-YYYY formats
  const parts = date.split('-');
  let month: string, year: string;

  if (parts[0].length === 4) {
    // YYYY-MM format
    [year, month] = parts;
  } else {
    // MM-YYYY format
    [month, year] = parts;
  }

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

  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

export const formatDateRange = (startDate: string | null, endDate: string | null): string => {
  if (!startDate && !endDate) return '';
  if (!startDate) return formatDate(endDate);
  if (!endDate) return `${formatDate(startDate)} - Present`;
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};
