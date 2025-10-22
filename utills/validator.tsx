export const isValidEmail = (email: string): boolean => {
  const emailRegex = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');
  return emailRegex.test(String(email).toLowerCase());
};