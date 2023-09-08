const { Pool } = require("pg");
const { response } = require("express");
const pool = new Pool({
  user: "postgres",
  password: "12345",
  host: "localhost",
  port: 5432,
  database: "ilms",
});
const createUser = (request, response) => {
  const { name, role, email, password, mode } = request.body;
  if (mode === "Sign Up") {
    console.log("Received request with username:", name);
    console.log("Received request with password:", password);
    console.log(request.body);

    const qry1 = `SELECT * FROM users WHERE username = $1`;
    pool.query(qry1, [name], (error, results1) => {
     // console.log(qry);
      if (error) return response.json({ Message: "Error inside server" });
     // console.log(results.rows.length)
      if (results1.rows.length > 0) {
        return response.json({ nameExist:true});
      } else {
         const qry2 = `SELECT * FROM users WHERE email = $1`;
         pool.query(qry2, [email], (error, results2) => {
     // console.log(qry);
         if (error) return response.json({ Message: "Error inside server" });
     // console.log(results.rows.length)
         if (results2.rows.length > 0) {
           return response.json({ emailExist:true});
         } else {
          const qry = `INSERT INTO users (username,role,email,password) VALUES ($1, $2, $3,$4)`;
          pool.query(qry, [name, role, email, password], (error, results) => {
            if (error) {
              return response.json({ Message: "Error inside server" })
            }
            response.status(201).send("user added");
          });
         }})
    }
  })
  


    
  } else if (mode === "Login") {
    console.log(request.body);
    const qry = `SELECT * FROM users WHERE username = $1 AND password = $2`;
    pool.query(qry, [name, password], (error, results) => {
     // console.log(qry);
      if (error) return response.json({ Message: "Error inside server" });
     // console.log(results.rows.length)
      if (results.rows.length > 0) {
      let route='';
      console.log(qry);
      const userRole = results.rows[0].role;
      console.log(userRole);
      console.log(userRole);
      if(userRole==='admin'){
        route = '/admin';
      }else if(userRole == 'librarian'){
        route='/librarian';
      }else{
        route='/user'
      }
        return response.json({ Login: true ,route});
      } else {
        return response.json({ Login: false });
      }
    });
  }
};

module.exports = {
  createUser,
};