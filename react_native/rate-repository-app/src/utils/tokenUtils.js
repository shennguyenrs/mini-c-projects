export const writeTokenToLocal = async (authStorage, token) => {
  await authStorage.setAccessToken(token);
};

export const returnTokenFromLocal = async (authStorage) => {
  return await authStorage.getAccessToken();
};

export const removeTokenInLocal = async (authStorage) => {
  await authStorage.removeAccessToken();
};
