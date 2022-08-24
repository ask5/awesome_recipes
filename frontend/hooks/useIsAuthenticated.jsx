export const useIsAuthenticated = () => {
  const userInfo = window?.userInfo;
  return userInfo !== undefined;
};
