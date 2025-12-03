const pad = (n: number) => n.toString().padStart(2, "0");
export const formatLocal = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const getMonthRange = (date: Date): { from: string; to: string } => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return {
    from: formatLocal(firstDay),
    to: formatLocal(lastDay),
  };
};

export const getRolingMonth = (): { from: string; to: string } => {
  const to = new Date();
  const from = new Date();

  from.setMonth(from.getMonth() - 1);

  return {
    from: formatLocal(from),
    to: formatLocal(to),
  };
};

export const getThisWeek = (): { from: string; to: string } => {
  const today = new Date();

  const dayOfWeek = today.getDay();
  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const from = new Date(today);
  from.setDate(today.getDate() - diffToMonday);

  const to = new Date(from);
  to.setDate(from.getDate() + 6);

  return { from: formatLocal(from), to: formatLocal(to) };
};

export const getRollingWeek = (): { from: string; to: string } => {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - 7);

  return { from: formatLocal(from), to: formatLocal(to) };
};

export const getThisYearRange = (): { from: string; to: string } => {
  const year = new Date().getFullYear();

  const from = new Date(year, 0, 1);
  const to = new Date(year, 11, 31);

  return {
    from: formatLocal(from),
    to: formatLocal(to),
  };
};

export const getYearToDate = (): { from: string; to: string } => {
  const year = new Date().getFullYear();

  const from = new Date(year, 0, 1);
  const to = new Date();

  return {
    from: formatLocal(from),
    to: formatLocal(to),
  };
};
