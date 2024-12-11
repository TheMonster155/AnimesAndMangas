// useValidation.js
export const useValidation = () => {
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return { validatePassword, validateEmail };
};
