const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        required: true
    },
    blog: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }]
})

module.exports=mongoose.model("User", userSchema); 