const mongoose=require("mongoose");

const blogSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
        maxLength: 10
    },
    content: {
        type: String,
        required: true,
    }
})

module.exports=mongoose.model("Blog", blogSchema);