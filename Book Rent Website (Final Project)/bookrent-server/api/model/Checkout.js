const mongoose = require('mongoose');
const { Schema } = mongoose;

const checkoutSchema = new Schema({
    checkoutItemId: String,
    Title: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    image: String,
    price: Number,
    quantity: Number,
    email: {
        type: String,
        true: true,
        required: true,
    },
    penalty: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "Unpaid"
    },
    transaction_date: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date, 
      }
});

const Checkout = mongoose.model("transaction", checkoutSchema);

module.exports = Checkout;


