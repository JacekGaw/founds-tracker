export const getMonthRange = (date: Date): { from: string; to: string } => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const formatLocal = (d: Date) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  return {
    from: formatLocal(firstDay),
    to: formatLocal(lastDay),
  };
};
