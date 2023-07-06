// categories and locations that are fix
const bodyCategories = ["hair removal", "cellulite", "toning/lifting"];

const faceCategories = [
  "redness",
  "acne",
  "hyperpigmentation",
  "aging",
  "dehydration",
  "texture",
];

const locations = ["face", "body"];

// validates if categories is an array and depending on the location, if it includes that category
const validateLocation = (categories, location) => {
  if (Array.isArray(categories) && locations.includes(location)) {
    if (location === "face") {
      return categories.every((category) => faceCategories.includes(category));
    } else if (location === "body") {
      return categories.every((category) => bodyCategories.includes(category));
    }
  }
  return false;
};

const validatePassword = (password) => {
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

module.exports = {
  bodyCategories,
  faceCategories,
  locations,
  validateLocation,
  validatePassword,
};
