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
    methods:["GET","POST"],
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

app.get('/auth-status',validateToken,(req,res)=>{
   return res.json({status:"success",auth:authenticated,id:id,username:userName,role:role});
});
app.get("/user/genreRelatedBooks", db.genreRelatedBooks);
app.get("/user/filterBooks", db.filterBooks);
app.post("/login", db.createUser);
app.get("/user/book/:id", db.getBookById);
app.get("/user/book/count/:id", db.getBookCount);
app.get("/user/book/author/:name",db.getAuthorById);
app.post("/user/book/reserve", db.reserveBook);
app.post("/user/book/comment", db.addBookComment);
// app.get("/user",db.getBooks)

app.listen(4000, () => console.log(`Server on localhost:4000`));
