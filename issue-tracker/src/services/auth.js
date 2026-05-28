import localStorageHelper from '../helpers/local-storage';

const AUTH_KEY = 'issue_tracker_user';

export const login = (userData) => {
  localStorageHelper.set(AUTH_KEY, userData);
};

export const logout = () => {
  localStorageHelper.remove(AUTH_KEY);
};

export const getCurrentUser = () => {
  return localStorageHelper.get(AUTH_KEY);
};

export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};