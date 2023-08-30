export const activeLink = (url: string, pathname: string) => {
  return pathname === url ? "text-white" : "";
};
