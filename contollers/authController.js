const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = reqiure("../model/user");
require("dotenv").config();

exports.signup = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            });
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in Hashing Password"
            })
        }

        const user = await User.create({ username, email, password: hashedPassword, role });

        return res.status(200).json({
            success: true,
            message: "User Created Successfully"
        })
    }
    catch (err) {
        console.log(error);
        return res.statsu(500).json({
            sucess: false,
            message: "User Cannot be Registered, Please Try Again later"
        })
    }
}