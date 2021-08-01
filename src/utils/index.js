export const normalizeString = (str, len = 40) => {
  return str !== undefined
    ? str.length > len
      ? `${str.substr(0, len)}...`
      : str
    : '';
};
