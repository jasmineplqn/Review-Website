// validating password helper
export const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) {
    errors.push("Your password must be at least 8 characters.");
  }
  if (password.search(/[a-z]/i) < 0) {
    errors.push("Your password must contain at least one letter.");
  }
  if (password.search(/[0-9]/) < 0) {
    errors.push("Your password must contain at least one digit.");
  }
  return errors;
};



export const getServerUrl = () => {
  if (process.env.NODE_ENV) {
    if (process.env.NODE_ENV === "production") {
      return "https://review-website-backend.onrender.com" 
    }
  };
  return "http://localhost:8000" 
}