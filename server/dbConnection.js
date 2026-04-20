const {Client} = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const connection = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

module.exports = connection;

// fetch("http://localhost:5000/api/register", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         name: "John",
//         email: "john@example.com",
//         password: "123456"
//     })
// })
// .then(async (response) => {
//     const data = await response.json();
//     if (!response.ok) {
//         // Show error message
//         alert(data.message); // or show it in UI
//     } else {
//         // Success message
//         alert("Registered successfully!");
//     }
// })
// .catch(error => {
//     console.error("Error:", error);
//     alert("Server not responding");
// });
