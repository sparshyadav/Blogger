const express = require("express");
const router = express.Router();
const { signup } = require("../contollers/authController");
const { addBlog, showAllBlogs } = require("../contollers/blogController");

router.post("/login",login);
router.post("/addBlog", addBlog);
router.get("/showAllBlogs", showAllBlogs);

router.post("/signup", signup);