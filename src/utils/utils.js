export const isFirebaseStorageLink = (link) => {
  const storageUrlPattern = /^https:\/\/firebasestorage\.googleapis\.com/;
  return storageUrlPattern.test(link);
};
