export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(Math.floor(num));
};

export const formatPercent = (num) => {
  return `${num.toFixed(2)}%`;
};
