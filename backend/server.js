const express = require("express");
const cors=require("cors")
const db =require("./database")

const app = express()

app.use(express.json())
app.use(cors())
app.get('/user',db.filterBooks)
app.post("/login",db.createUser)  
app.get("/user",db.getBooks)

app.listen(4000,()=>console.log(`Server on localhost:4000`));