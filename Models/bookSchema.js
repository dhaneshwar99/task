const mongoose = require('mongoose')
const schema = mongoose.Schema;
const bookSchema = new schema({
    title: {
        type: String, required: true, 
    },
    author: {
        type: String, required: true
    },
    summary: {
        type: String
    },
   
    language: {
        type: String, enum: [' HINDI', "ENGLISH"]
    }
    
},
    { timestamps: true, collection: "books" }
)
module.exports = mongoose.model("books", bookSchema)