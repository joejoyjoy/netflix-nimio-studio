export const downScaleImage = (url: string): string => {
  const uploadIndex = url.indexOf("/upload/");
  if (uploadIndex !== -1) {
    const firstPart = url.substring(0, uploadIndex + 8);
    const secondPart = url.substring(uploadIndex + 8);
    return `${firstPart}w_340/${secondPart}`;
  }
  return url;
};
