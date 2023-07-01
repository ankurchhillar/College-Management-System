const { User } = require("../auth/models");
const { Blog } = require("./models");

const createNewBlog = async (req, res) => {
  var newBlog = await Blog.create(req.body);
  return res.json({ status: "Done", newBlog });
};

const getBlogs = async (req, res) => {
  var blogs = await Blog.find({ user_id: req.user }); //.populate("user_id");
  return res.json({ blogs: blogs });
};

const deleteblog = async (req, res) => {
    var title = await Blog.findOne({
      $and: [{ title: req.body.title }, { user_id: req.user }],
    });
    if (title) {
      await Blog.deleteOne(title);
      return res.json({ status: "deleted" });
    } else {
      return res
        .status(404)
        .json({
          status: "Error",
          msg: "Invalid request: Either username or id invalid",
        });
    }
  };

module.exports = { createNewBlog, getBlogs, deleteblog };