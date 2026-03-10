export const isEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isEmpty = (value) => !value || value.trim() === "";

export const isPasswordStrong = (password) => password.length >= 6;