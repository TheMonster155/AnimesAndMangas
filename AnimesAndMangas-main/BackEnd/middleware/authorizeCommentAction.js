const Comment = require("../modules/comments");

const authorizeCommentAction = (req, res, next) => {
  const { role, userId } = req.user;
  const { id } = req.params;

  if (role === "admin") {
    return next();
  }

  Comment.findById(id)
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      if (
        role === "user" &&
        comment.user &&
        comment.user.toString() === userId
      ) {
        return next();
      }

      if (
        role === "seller" &&
        comment.seller &&
        comment.seller.toString() === userId
      ) {
        return next();
      }

      return res.status(403).json({ error: "Action not allowed" });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = authorizeCommentAction;
