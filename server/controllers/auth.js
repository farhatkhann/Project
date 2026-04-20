const connection = require('../dbConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const register = (req, res) => {
//     //CHECK IF USER EXISTS
//     const q = "SELECT * FROM users WHERE email = $1";
//     connection.query(q, [req.body.email], (err, data) => {
//         if (err) {
//             console.log("ERR1: ",err);
//             return res.status(500).json(err);
//         }
//         if (data.length)
//             return res.status(409).json("User already exists!");
//         //CREATE NEW USER
//         let userId;
//         let isUnique = false;
//         let attempts = 0;
//         const maxAttempts = 10000;
//         while (!isUnique && attempts < maxAttempts) {
//             attempts++;
//           userId = Math.floor(1000 + Math.random() * 9000);
//           const res = connection.query('SELECT 1 FROM users WHERE user_id = $1', [userId]);
//           if (res.rowCount === 0) {
//             isUnique = true;
//             const salt = bcrypt.genSaltSync(10);
//         const hashedPassword = bcrypt.hashSync(req.body.password, salt);
//         const q = "INSERT INTO users (user_id,username,email,phone,password,isadmin) VALUES ($1,$2,$3,$4,$5)";
//         const values = [userId,req.body.username, req.body.email, req.body.phone, hashedPassword, false];
//         connection.query(q, values, (err, data) => {
//             if (err) {
//                 if(err.code = '23505'){
//                     return res.status(409).json("User already exists!");
//                 }
//                 console.log("err2: ",err);
//                 return res.status(500).json(err);
//             }
//             return res.status(200).json("User created!");
//         });
//           }
//         }
//         // const salt = bcrypt.genSaltSync(10);
//         // const hashedPassword = bcrypt.hashSync(req.body.password, salt);
//         // const q = "INSERT INTO users (user_id,username,email,phone,password,isadmin) VALUES ($1,$2,$3,$4,$5)";
//         // const values = [req.body.username, req.body.email, req.body.phone, hashedPassword, false];
//         // connection.query(q, values, (err, data) => {
//         //     if (err) {
//         //         if(err.code = '23505'){
//         //             return res.status(409).json("User already exists!");
//         //         }
//         //         console.log("err2: ",err);
//         //         return res.status(500).json(err);
//         //     }
//         //     return res.status(200).json("User created!");
//         // });
//     });
// };
const register = async (req, res) => {
    try {
      const { username, email, phone, password } = req.body;
  
      // Check if user already exists
      const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
      const existingUser = await connection.query(checkUserQuery, [email]);
      if (existingUser.rows.length > 0) {
        return res.status(409).json("User already exists!");
      }
  
      // Generate unique 4-digit user_id
      async function generateUniqueUserId() {
        let attempts = 0;
        const maxAttempts = 10000;
        while (attempts < maxAttempts) {
          attempts++;
          const userId = Math.floor(1000 + Math.random() * 9000);
          const result = await connection.query('SELECT 1 FROM users WHERE user_id = $1', [userId]);
          if (result.rowCount === 0) {
            return userId;
          }
        }
        throw new Error('Unable to generate a unique user ID');
      }
  
      const userId = await generateUniqueUserId();
  
      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
  
      // Insert the new user
      const insertQuery = `
        INSERT INTO users (user_id, username, email, phone, password, isadmin)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
      const values = [userId, username, email, phone, hashedPassword, false];
  
      await connection.query(insertQuery, values);
  
      return res.status(200).json("User created!");
  
    } catch (err) {
      console.error("Registration error:", err);
      if (err.code === '23505') {
        return res.status(409).json("User already exists!");
      }
      return res.status(500).json("Server error.");
    }
  };
const login = (req, res) => {
    const q = "SELECT * FROM users WHERE email = $1";
    connection.query(q,[req.body.email],(err,data)=>{
        if(err){
            console.log(err);
            return res.status(500).json(err);
        }
        const user = data.rows[0];
        if(!user)
            return res.status(404).json("User not found!");
        const checkPassword = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!checkPassword)
            return res.status(400).json("Wrong password or email!");
        // return res.status(200).json("Login successful!");
        const accessToken = jwt.sign(
            {
                id: user.id,
                isAdmin: user.isadmin
            }, 
            process.env.PASS_SEC,
            {expiresIn: "3d"}
        );
        const {password, ...others} = user;
        const id = user.id;
        const name = user.username;
        const isAdmin = user.isadmin;
        // res.status(200).json({...others, accessToken});
        res.cookie("accessToken",accessToken,{
            httpOnly: true,
        }).status(200).json({user_id: id, user_name: name, isAdmin: isAdmin, ...others, accessToken})
    })
}

const logout = (req, res) => {
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
      }).status(200).json("User has been logged out.")
}

module.exports = { register, login, logout };