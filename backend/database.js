const {Pool}=require("pg");
const {response} =require("express");
const pool = new Pool(
    {
        user:"postgres",
        password:"12345",
        host:"localhost",
        port:5432,
        database:"ilms"
    }
);
const createUser = (request,response) =>{
    const{name,role,email,password} =request.body
    console.log("Received request with username:", name);
    console.log("Received request with password:", password);

    console.log(request.body)
    const qry =`INSERT INTO users (username,role,email,password) VALUES ($1, $2, $3,$4)`
    pool.query(qry,[name,role,email,password],(error,results)=> {
        if(error){
            throw error
        }
        response.status(201).send('user added')
    })
}
 module.exports = {
    createUser
 };