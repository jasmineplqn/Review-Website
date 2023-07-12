const { addItem } = require("./handlers/items/addItem");
const { deleteItem } = require("./handlers/items/deleteItem");
const { getAllItems } = require("./handlers/items/getAllItems");
const { getOneItem } = require("./handlers/items/getOneItem");
const { updateItem } = require("./handlers/items/updateItem");
const {
  addSubmission,
} = require("./handlers/request_submission/addSubmission");
const {
  approveSubmission,
} = require("./handlers/request_submission/approveSubmission");
const {
  deleteSubmission,
} = require("./handlers/request_submission/deleteSubmission");
const {
  getAllSubmissions,
} = require("./handlers/request_submission/getAllSubmissions");
const {
  getOneSubmission,
} = require("./handlers/request_submission/getOneSubmission");
const {
  updateSubmission,
} = require("./handlers/request_submission/updateSubmission");
const { addReview } = require("./handlers/reviews/addReview");
const { deleteReview } = require("./handlers/reviews/deleteReview");
const { getReview } = require("./handlers/reviews/getReview");
const { getReviews } = require("./handlers/reviews/getReviews");
const { updateReview } = require("./handlers/reviews/updateReview");
const { addFavorite } = require("./handlers/users/addFavorite");
const { addUser } = require("./handlers/users/addUser");
const { authenticateUser } = require("./handlers/users/authenticateUser");
const { deleteUser } = require("./handlers/users/deleteUser");
const { getAllUsers } = require("./handlers/users/getAllUsers");
const { getUser } = require("./handlers/users/getUser");
const { updateUser } = require("./handlers/users/updateUser");

const router = require("express").Router();

//ROUTES FOR ITEMS
// gets all items and gets all items by one category or one location
router.get("/api/items", getAllItems);
// gets one item
router.get("/api/items/:itemId", getOneItem);
// add new item (admin)
router.post("/api/items", addItem);
// updates one item (admin)
router.patch("/api/items/:itemId", updateItem);
// overwrites an item (admin)
router.put("/api/items/:itemId", updateItem);
// deletes one item (admin)
router.delete("/api/items/:itemId", deleteItem);

// ROUTES FOR REQUEST SUBMISSION
// gets all submissions and gets all submissions by one category or one location (admin)
router.get("/api/submissions", getAllSubmissions);
// gets one submission (admin)
router.get("/api/submissions/:submissionId", getOneSubmission);
// add new submission
router.post("/api/submissions", addSubmission);
// updates one submission (admin)
router.patch("/api/submissions/:submissionId", updateSubmission);
// overwrites a submission (admin)
router.put("/api/submissions/:submissionId", updateSubmission);
// deletes one submission (admin)
router.delete("/api/submissions/:submissionId", deleteSubmission);
// approves submission (admin)
router.post("/api/submissions/:submissionId", approveSubmission);

// ROUTES FOR USERS
// gets all users (admin)
router.get("/api/users", getAllUsers);
// gets one user
router.get("/api/users/:userId", getUser);
// adds new user
router.post("/api/users", addUser);
// updates information of user
router.patch("/api/users/:userId", updateUser);
// updates favorites (add and remove)
router.patch("/api/users/:userId/favorites/:itemId", addFavorite);
// deletes user by the same user (also by admin)
router.delete("/api/users/:userId", deleteUser);
// authentification of user when login in
router.post("/api/authenticate", authenticateUser);

// ROUTES FOR REVIEWS
// gets all reviews of one technology or one user
router.get("/api/reviews", getReviews);
// gets one review
router.get("/api/reviews/:reviewId", getReview);
// adds new review
router.post("/api/reviews", addReview);
// updates one review by the same user
router.patch("/api/reviews/:reviewId", updateReview);
// deletes one review by the same user (also by admin)
router.delete("/api/reviews/:reviewId", deleteReview);

module.exports = router;
