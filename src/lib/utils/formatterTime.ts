const formatTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  });

  return formatter.format(date);
};

export default formatTime;