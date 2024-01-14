const Blog = require("../models/blog");
const User = require("../models/user");

exports.addBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (req.user.role !== "Admin") {
      const response = await Blog.create({ title, content });
    }
    if (req.user.role == "Admin") {
      const response = await Blog.create({ title, content, isVerified: true });
    }
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
      data: "Error Occured while Adding Blog",
    });
  }
};

exports.showAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find({ isVerified: true });
    res.status(200).json({
      success: true,
      data: allBlogs,
      message: "All Blogs Shown"
    })
  }
  catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
      data: "Error Occured while Showing Blogs",
    });
  }
}

exports.adminBlogs = async (req, res) => {
  try {
    const nonVerifiedBlogs = await Blog.find({ isVerified: false });
    res.status(200).json({
      success: true,
      data: nonVerifiedBlogs,
      message: "All Blogs Shown that Admin has to Verify"
    })
  }
  catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
      data: "Error Occured while Showing Blogs that Admin has to Verify",
    });
  }
}
