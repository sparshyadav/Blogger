const express = require("express");
const router = express.Router();

router.post("/addBlog", addBlog);
router.get("/showAllBlogs", showAllBlogs);