const express = require("express");
const router = express.Router();

router.post("/login",login);
router.post("/addBlog", addBlog);
router.get("/showAllBlogs", showAllBlogs);