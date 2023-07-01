const express = require("express");
const { is_authenticated } = require("../helper/utils");
const { createNewBlog, getBlogs } = require("./controllers");
const blogRouter = express.Router();

blogRouter
  .route("/blog")
  .post(is_authenticated, createNewBlog)
  .get(is_authenticated, getBlogs);

module.exports = blogRouter;