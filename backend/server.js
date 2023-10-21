const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const db = require("./database");
const {pool} = require("./database.js");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const {createToken} = require("./JWT");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}  
));
app.use(cookieParser());
app.use(express.json());

const validateToken = (req,res,next)=>{
    const accessToken = req.cookies["access-token"];
    if(!accessToken) return res.json({error:"user not authenticated"});
    else{
        jwt.verify(accessToken,"secret",(err,decoded)=>{
            if(err) return res.json({error:"token is not okay"})
            else{
                authenticated=true;
                role=decoded.role;
                id=decoded.id;
                userName=decoded.username;
                return next();
        }
        });
    }  
}
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).send();
  });
app.get('/auth-status',validateToken,(req,res)=>{
   return res.json({status:"success",auth:authenticated,id:id,username:userName,role:role});
});

app.put("/profile-change", validateToken, async (req, res) => {
  const { id, name, currentPassword, password } = req.body;
  console.log(req.body);

  try {
    // Retrieve the current encrypted password from the database
    const getPasswordQuery = "SELECT password FROM users WHERE id = $1";
    
    pool.query(getPasswordQuery, [id], async (error, result) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Check if the user with the provided id exists
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      const storedPassword = result.rows[0].password;
      console.log(storedPassword)
      // Compare the provided currentPassword with the stored password
      const isPasswordValid = await bcrypt.compare(currentPassword, storedPassword);
      console.log(isPasswordValid)
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }

      // Hash the new password using bcrypt
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.log('hash error')
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('m here')
        // Update the user's profile information in the database
        const updateQuery = `
          UPDATE users
          SET username = $1, password = $2
          WHERE id = $3
        `;

        pool.query(updateQuery, [name, hashedPassword, id], (updateError, results) => {
          if (updateError) {
            return res.status(500).json({ error: 'Internal Server Error' });
          }

          // Check if any rows were affected
          const numRowsUpdated = results.rowCount;
          console.log(numRowsUpdated)
          if (numRowsUpdated === 0) {
            return res.status(404).json({ error: 'User not found' });
          }

          // Return a success message
          res.status(200).json({ message: 'Profile updated successfully' });
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get("/commonforum", db.getForumComments);
app.post("/commonforum/comment", db.addForumComment);
app.put("/commonforum/comment/:commentId", db.updateForumComment);
app.delete("/commonforum/comment/:commentId", db.deleteForumComment);
app.get("/user/genreRelatedBooks", db.genreRelatedBooks);
app.get("/user/filterBooks", db.filterBooks);
app.post("/login", db.createUser);
app.get("/user/book/:id", db.getBookById);
app.get("/user/book/count/:id", db.getBookCount);
app.get("/user/book/author/:name",db.getAuthorById);
app.post("/user/book/reserve", db.reserveBook);
app.post("/user/book/comment", db.addBookComment);
app.put("/user/book/comment/:bookId/:commentId", db.updateBookComment);
app.delete("/user/book/comment/:bookId/:commentId", db.deleteBookComment);
// app.get("/user",db.getBooks)

app.listen(4000, () => console.log(`Server on localhost:4000`));
