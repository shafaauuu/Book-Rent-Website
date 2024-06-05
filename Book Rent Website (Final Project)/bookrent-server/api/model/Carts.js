// const mongoose = require('mongoose');
// const {Schema} = mongoose;

// const cartSchema = new Schema({
//     menuItemId: String,
//     Title :{
//         type: String,
//         trim: true,
//         required : true,
//         minlength: 3


//     }, 
//     recipe: String,
//     image: String, 
//     price: Number,
//     quantity: Number,
//     email:{
//         type: String,
//         true:true,
//         required:true,
//     }

// })

// const Carts = mongoose.model("Cart", cartSchema);

// module.exports = Carts;

// 
const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
    menuItemId: String,
    Title: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    recipe: String,
    image: String,
    price: Number,
    quantity: Number,
    email: {
        type: String,
    true: true,
        required: true,
    }
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
