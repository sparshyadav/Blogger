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
exports.login = async (req,res) => {
  try{
    //data fetch
    const {email,password} = req.body;
    if(!email || !password){
      return res.status(400).json({
        success:false,
        message:'Please fill all the details carefully'
      });
    }
    const user = await User.findOne({email});
    if(!user){
      return res.status(401).json({
        success:false,
        message:'User is not registered',
      });
    }
    const payload = {
      email : user.email,
      id:user._id, 
      role:user.role   
    };
    if(await bcrypt.compare(password,user.password)){
      let token = jwt.sign(payload,
        process.env.JWT_SECRET,
        {
          expiresIn:"2h",
        });
        user = user.toObject();
        user.token = token;
        user.password = undefined;
        const options = {
          expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly:true,
        }
        res.cookie("blogCookie",token,options).status(200).json({
          success:true,
          token,
          user,
          message:'User logged in Successfully',
        });
    }
    else{
      return res.starus(403).json({
        success:false,
        message:"Password Incorrect"
      });
    }
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      success:false,
      message:"Login failure",
    });
  }
}