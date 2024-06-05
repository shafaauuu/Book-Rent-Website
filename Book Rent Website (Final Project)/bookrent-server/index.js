const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 6001;
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require('dotenv').config();

// console.log(process.env.ACCESS_TOKEN_SECRET)
 
// middleware
app.use(cors());
app.use(express.json());
 
// MongoDB configuration using mongoose startv
mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-bookrent-client.ohs0y7m.mongodb.net/demo-book-client?retryWrites=true&w=majority&appName=demo-bookrent-client`,
    { useNewUrlParser: true, useUnifiedTopology: true }

    // mongodb+srv://rifkiimmanuel112:<password>@demo-bookrent-client.ohs0y7m.mongodb.net/?retryWrites=true&w=majority&appName=demo-bookrent-client
    // mongodb+srv://rifkiimmanuel112:<password>@demo-bookrent-client.ohs0y7m.mongodb.net/?retryWrites=true&w=majority&appName=demo-bookrent-client
    // mongodb+srv://rifkiimmanuel112:<password>@demo-bookrent-client.ohs0y7m.mongodb.net/?retryWrites=true&w=majority&appName=demo-bookrent-client
    
).then(() => {
    console.log("MongoDB connected successfully");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
});

// jwt authentication 
app.post('/jwt', async(req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn:'1hr'
    });
    res.send({token})

})

// verify jwt token  
//  middleware 


// import routes here  
const menuRoutes = require('./api/routes/menuRouters');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes');
const checkoutRoutes = require('./api/routes/checkoutRouters');


app.use('/menu', menuRoutes);
app.use('/carts', cartRoutes);
app.use('/users', userRoutes);
app.use('/transactions', checkoutRoutes);


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
