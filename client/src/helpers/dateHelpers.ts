export const getMonthRange = (date: Date): { from: string; to: string } => {
  
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toDateString();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toDateString();
  
  return {
    from: firstDay,
    to: lastDay,
  };
};