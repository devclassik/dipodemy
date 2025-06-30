export const isValidEmail = (email: string) => {
  // A simple regex for email validation.
  // This is a basic example; more robust ones exist.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
