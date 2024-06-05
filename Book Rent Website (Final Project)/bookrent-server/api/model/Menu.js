const mongoose = require('mongoose');
const {Schema} = mongoose;

// create schema object for menu items

const menuSchema = new Schema({
    Title :{
        type: String,
        trim: true,
        required : true,
        minlength: 3


    }, 
    author: String,
    rating: String,
    About: String, 
    image: String, 
    category: String, 
    isbn: String,
    year: String,
    price: Number,
    // need to modify later
    createdAt: {
        type:Date,
        default: Date.now
    }
})

// create model
const Menu = mongoose.model("Book", menuSchema)
module.exports = Menu;
