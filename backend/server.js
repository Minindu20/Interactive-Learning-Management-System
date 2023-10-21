const express = require("express");
const cors = require("cors");
const db = require("./database");
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
