const Blogs = require("../models/blog");
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
