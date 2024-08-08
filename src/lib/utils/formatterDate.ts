const formatDate = (isoDate?: string) => {
  if(!isoDate) return;

  const date = new Date(isoDate);
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
  });

  return formatter.format(date);
};

export default formatDate;