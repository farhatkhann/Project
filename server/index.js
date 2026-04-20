// const {Client} = require('pg');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connection =require('./dbConnection');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/products');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');

dotenv.config();
const app = express();
app.use(express.json());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(cookieParser()); 

// const connection = new Client({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     port: process.env.DB_PORT,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME
// });

connection.connect().then(()=>{
    console.log("Database connected!")
});

app.use('/api/users',usersRoute);
app.use('/api/auth',authRoute);
app.use('/api/product',productRoute);
app.use('/api/cart',cartRoute);
app.use('/api/order',orderRoute);

app.listen(process.env.PORT || 8000,()=>{
    console.log("Server is running...");
});


// CREATE TABLE cart (
//     cart_id varchar(6) PRIMARY KEY,
//     user_id varchar,   
// 	total_items INT,
//     FOREIGN KEY (user_id) REFERENCES users(user_id)
// );

// CREATE TABLE cart_products (
//     cart_id varchar(6),
//     product_id varchar,
//     quantity INT,
//     PRIMARY KEY (cart_id, product_id),
//     FOREIGN KEY (cart_id) REFERENCES cart(cart_id),
//     FOREIGN KEY (product_id) REFERENCES products(product_id)
// );

