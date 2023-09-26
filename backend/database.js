const { Pool } = require("pg");
const { response } = require("express");

const pool = new Pool({
  user: "postgres",
  password: "12345",
  host: "localhost",
  port: 5432,
  database: "ilms",
});
const getBookById = (request,response)=>{
  const {id} = request.params;
  console.log(id);
  const qry = `SELECT * FROM books where id = $1`;
  pool.query(qry,[id],(error,results)=>{
  if(error) return response.status(500).json({error:'Internal Server Eroor'})
  const book=results.rows;
  response.json(book);
  }) 

}
const filterBooks = (request,response)=>{
   const { q } = request.query;
   console.log(q)
  const qry=`SELECT * FROM books
  WHERE title ILIKE '%' || $1 || '%' OR author ILIKE '%' || $1 || '%';`;
   pool.query(qry,[q],(error,results)=>{
    //console.log(qry);
    console.log('filter books');
    if(error) return response.status(500).json({error:'Internal server error'})
    else if (results.rows.length === 0) {
      return response.status(404).json({ error: 'No books found' });
    }
    const books = results.rows;
    response.json(books);
   })

}
const genreRelatedBooks=(request,response)=>{
  const { g }=request.query;
  console.log(g);
  const qry = `SELECT * FROM books WHERE genre ILIKE $1;`;
  pool.query(qry,[g],(error,results)=>{
  if(error) return response.status(500).json({error:'Internal Server Eroor'})
  else if(results.rows.length===0){
    return response.status(404).json({ error: 'No books found in the databse' });
   }
   const books = results.rows;
   response.json(books);
  })
}

const getBooks = (request,response)=>{
    const qry = `SELECT * FROM books`;
    pool.query(qry,(error,results)=>{
    if(error) return response.status(500).json({error:'Internal server error'})
    else if (results.rows.length === 0) {
      return response.status(404).json({ error: 'No bookos found' });
    }
    const books = results.rows;
    response.json(books);
    }
  )
};
  

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
    
      if (error) return response.json({ Message: "Error inside server" });
     // console.log(results.rows.length)
      if (results.rows.length > 0) {
      request.session.username = results.rows[0].username;
      console.log(request.session.username);
      let route='';
      const userRole = results.rows[0].role;
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
  getBooks,
  filterBooks,
  genreRelatedBooks,
  getBookById
};
