export const getIdFromUrl = (url: string): number => {
  const matches = url.match(/\/(\d+)\/?$/);
  return matches ? parseInt(matches[1]) : 0;
};
