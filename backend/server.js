const express = require("express");
const cors=require("cors")
const db =require("./database")

const app = express()

app.use(express.json())
app.use(cors())

app.post("/login",db.createUser)  

app.listen(4000,()=>console.log(`Server on localhost:4000`));