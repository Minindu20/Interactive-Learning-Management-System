const { Pool } = require("pg");
const { response, request } = require("express");
const bcrypt = require('bcrypt');
const {createToken} = require("./JWT");

// const pool = new Pool({
//   user: "postgres",
//   password: "12345",
//   host: "localhost",
//   port: 5432,
//   database: "ilms",
// });

const pool = new Pool({
  connectionString:process.env.DATABASE_URL,
  ssl:{
    rejectUnauthorized:false
  }
})

 pool.query(`
 CREATE TABLE public.bookdata (
     isbn character varying(25) NOT NULL,
     id integer,
     "timestamp" timestamp without time zone,
     res_status character varying DEFAULT 'NO'::character varying
 );
 CREATE TABLE public.books (
     id integer NOT NULL,
     title character varying(255),
     author character varying(255),
     image text,
     about text,
     comments jsonb DEFAULT '[]'::jsonb,
     genre character varying(20)
 );
 CREATE TABLE public.borrowings (
     id integer NOT NULL,
     userid integer,
     bookid integer,
     borrowdate date DEFAULT now(),
     returndate date DEFAULT (now() + '14 days'::interval),
     isbn character varying(13),
     extension_notes character varying(10) DEFAULT 'no'::character varying,
     return_status character varying(3) DEFAULT 'no'::character varying
 );
 CREATE TABLE public.forum (
     id bigint NOT NULL,
     created_at timestamp with time zone DEFAULT now(),
     comments jsonb
 );
 CREATE TABLE public.users (
     username character varying(50) NOT NULL,
     role character varying(10),
     email character varying(30),
     password text,
     id integer NOT NULL
 );
 `)
// pool.query(`INSERT INTO public.author (author_id, name, bio)
// VALUES (4, 'J.K Rowling', 'J.K. Rowling is a celebrated British author known for her iconic Harry Potter series. Her writing is characterized by imaginative storytelling, intricate world-building, and richly developed characters. Through her work, she explores themes of friendship, courage, and the timeless battle between good and evil. Rowling''s captivating narratives have garnered a global fan base, and her books continue to enchant readers of all ages. Her literary contributions have solidified her as a beloved and influential figure in modern literature.'),
// (5, 'George R.R Martin', 'George R.R. Martin, born in 1948, is an American author and television producer best known for his epic fantasy series, "A Song of Ice and Fire." The series gained immense popularity through its adaptation into the television phenomenon "Game of Thrones." Martin is celebrated for his complex characters, intricate political plots, and a willingness to defy traditional fantasy tropes, making him a prominent figure in modern speculative fiction.'),
// (6, 'J.R.R Tolkin', 'J.R.R. Tolkien (1892-1973) was an English writer, poet, and philologist best known for his high fantasy works. Renowned as the author of "The Hobbit" and "The Lord of the Rings" trilogy, Tolkien created intricate and immersive fictional worlds inhabited by diverse races, languages, and cultures. His novels revolutionized the fantasy genre, introducing readers to iconic characters like Frodo Baggins and Gandalf the Grey. Beyond his literary contributions, Tolkiens deep passion for mythology and linguistics significantly influenced his storytelling, leaving an enduring legacy in the realms of literature and popular culture.');`)

pool.query(`SELECT * FROM "author"`).then(data => {
  console.log(data.rows)
})

const getBookById = (request,response)=>{
  const {id} = request.params;
  //console.log(id);
  const qry = `SELECT * FROM books where id = $1`;
  pool.query(qry,[id],(error,results)=> {
  if(error) return response.status(500).json({error:'Internal Server Eroor'})
  const book=results.rows;
  response.json(book);
  }) 
}

const getBookCount = (request,response)=>{
  const{id} =request.params;
  console.log(id)
  const qry = `SELECT COUNT(*) AS count FROM bookdata WHERE id=$1 and res_status = 'no';`
  pool.query(qry,[id],(error,results)=>{
    if(error) return response.status(500).json({error:'Internal Server Eroor'})
    const count = results.rows
  console.log(count)
    response.json(count);
  })}

  const getAuthorById = (request,response)=>{
    const{name}=request.params;
    console.log(name);
    const qry = `SELECT bio FROM author WHERE name LIKE $1;`;
    pool.query(qry,[name],(error,results)=>{
      if(error) return response.status(500).json({error:'Internal Server Eroor'})
      const bio = results.rows;
    console.log(bio)
      response.json(bio);})}

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
};const deleteBookComment = (request, response) => {
  const bookId = parseInt(request.params.bookId);
  const commentId = parseInt(request.params.commentId);
  console.log(bookId, commentId)
  const qry = `
    UPDATE books
    SET comments = comments #- '{${commentId-1}}'
    WHERE id = $1;
  `;

  pool.query(qry, [bookId], (error, results) => {
    if (error) {
      return response.status(500).json({ error: 'Internal Server Error' });
    } else {
      response.status(200).json({ message: 'Comment deleted' });
    }
  });
};

const getLibData = async (req, response) => {
  try {
    const role = req.body.role

    if (!role) {
      return response.status(200).json({ error: "No Role" });
    }

    const queryResult = await pool.query('SELECT * FROM users WHERE role = $1', [role]);
    
    response.status(200).json({ userData2: queryResult.rows });
  } catch (error) {
    console.error("Error Occurred:", error);
    response.status(500).json({ error: "An error occurred" });
  }
};
  
const addLibData = async (req, response) => {
  try {
    const UsernameT = req.body.UsernameT;
    const EmailT = req.body.EmailT;
    const TextPass = req.body.PassT;
    const contactT = req.body.contactT;

    const checkUsername = await pool.query('select * from users where username = $1',[UsernameT])
    const checkEmail = await pool.query('select * from users where email = $1',[EmailT])

    
    if(checkEmail.rows.length > 0 )
    {
      response.status(200).json({message : 'Email Already Exists'})
    }

    else if(checkUsername.rows.length > 0 )
    {
      response.status(200).json({message : 'Username Already Exists'})
    }

   else{

    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(TextPass, saltRounds);
    

    const queryResult3 = await pool.query('insert into users(username,role,email,password,contact) values($1,$2,$3,$4,$5)',[UsernameT ,'librarian',EmailT,hashedPassword,contactT]);
      res.status(200).json({message:'Success'})
   }
    
  } catch (error) {
    console.error("Error Occurred:", error);
    response.status(500).json({ error: "An error occurred" });
  }
};
  
const removeLibData = async (req, response) => {
  try {
  
    const index = req.body.Username;
    const queryText = 'DELETE FROM users WHERE username = $1'; 
    const queryResult4 = await pool.query(queryText, [index]);
    
  } catch (error) {
    console.error("Error Occurred:", error);
    response.status(500).json({ error: "An error occurred" });
  }
};

const getUserData = async(req, response) =>
{ 
    try {
        const queryResult = await pool.query('SELECT * FROM users WHERE role = $1', ['reader']);
        response.status(200).json({ userData: queryResult.rows });
    } catch (error) {
        console.error("Error Occurred:", error);
        response.status(500).json({ error: "An error occurred" });
    }
}

const changeUserStatus = async (req, response) => {
  try {
   
    await pool.query('BEGIN');
    
    const index = req.body.Status;
    const user = req.body.UsernameT;
    
    const queryText2 = await pool.query('UPDATE users SET status = NULL WHERE username = $1',[user]); 
    const queryText3 = await pool.query('UPDATE users SET status = $1 WHERE username = $2 returning status',[index , user]); 
    const queryText4 = await pool.query('SELECT * FROM users WHERE role = $1 order by id', ['user']);;
    response.status(200).json({userData : queryText4.rows});
    
    
    
   
    await pool.query('COMMIT');
  } catch (error) {
    console.error("Error Occurred:", error);
    response.status(500).json({ error: "An error occurred" });
  }
};

// librarian....//
const addBook = async(request)=>{
    console.log(request.body);

    // Start the transaction        
    const ISBN = request.body.isbn;
    const name = request.body.name;
    //const date = request.body.date;
    const author = request.body.author;
    const des = request.body.des;
    const image = request.body.image;
    const genre = request.body.genre;
    
    
    /*
    const insertQuery = await pool.query('INSERT INTO books(title,author,image) values($1 , $2 , $3) returning id' , [name ,author ,image ]);
    const id = insertQuery.rows[0].id;
    const insertQuery2 = await pool.query('INSERT INTO bookdata(isbn,id,res_status) values($1 , $2 , $3 )' , ["ISBN-"+ISBN,id , "No" ]);
    //const insertResult = await pool.query(insertQuery, [ISBN]);
    //console.log(insertQuery.rows[0])

    // Select the ID from the 'booksdata' table
    //const selectQuery = 'SELECT id FROM booksdata WHERE isbn = $1';
    //const selectResult = await pool.query(selectQuery, [ISBN]);

    // Commit the transaction
    await pool.query('COMMIT');

    // Log the ID
    */
    
  
    /*
  pool.query('INSERT INTO books(title,author,image) values($1 , $2 , $3) returning id', [name ,author ,image], (fetchError, fetchResult) => {
    if (fetchError) {
      // Rollback the transaction in case of an error
      console.log(fetchError);
      pool.query('ROLLBACK', () => {
        return response.status(500).json({ error: 'Internal Server Error' });
      });
    } else {
      const id = fetchResult.rows[0].id;
      
      pool.query('INSERT INTO bookdata(isbn,id,res_status) values($1 , $2 , $3 )', ["ISBN-"+ISBN, id, "No"], (reserveError, reserveResult) => {
        if (reserveError) {
          // Rollback the transaction in case of an error
          console.log(reserveError);
          pool.query('ROLLBACK', () => {
            return response.status(500).json({ error: 'Internal Server Error' });
          });
        } else {
          // Commit the transaction
          pool.query('COMMIT', () => {
            return response.json({ message: 'Book registered' });
          });
        }
      });
    }
  });
  */

  
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const queryText = 'INSERT INTO books(title,author,image,about,genre) values($1 , $2 , $3 ,$4, $5) returning id'
    const res = await client.query(queryText, [name ,author ,image,des,genre])
  
    const queryText2 = 'INSERT INTO bookdata(isbn,id,res_status) values($1 , $2 , $3 )'
    const id = res.rows[0].id
    await client.query(queryText2, ["ISBN-"+ISBN, id, "no"])
    await client.query('COMMIT')

  } catch (e) {
    await client.query('ROLLBACK')
    throw e

  } finally {
    client.release()
  }
};


const getBooksData = async(req,response) =>
{
  try {
    // Start the transaction
    await pool.query('BEGIN');
    
    const query1 = await pool.query('select bookdata.id,bookdata.isbn,books.title,books.author from bookdata inner join books on books.id=bookdata.id')
    
    response.status(200).json({ userData3: query1.rows });
    
  
    // Commit the transaction
    await pool.query('COMMIT');
  
    // Log the ID
    
  } catch (error) {
    // If there is an error, roll back the transaction
    pool.query('ROLLBACK');
    console.error("Transaction failed:", error);
  } 
}


const userRequestBooks = async(req,response)=>
{
  try {
    // Start the transaction
    await pool.query('BEGIN');
    const query1 = await pool.query('select reservations."res_Id",reservations."userId",reservations."bookId",books.title,reservations.res_time from reservations join books on reservations."bookId" = books.id')
    response.status(200).json({ userData3: query1.rows });
    
    // Commit the transaction
    await pool.query('COMMIT');
  
    // Log the ID
    
  } catch (error) {
    // If there is an error, roll back the transaction
    pool.query('ROLLBACK');
    console.error("Transaction failed:", error);
  } 

}

const countData = async(req,response)=>
{
  try {
    // Start the transaction
    await pool.query('BEGIN');
    
    
    const query1 = await pool.query('select * from books');
    const query2 = await pool.query('select reservations."res_Id",reservations."userId",reservations."bookId",books.title,reservations.res_time from reservations join books on reservations."bookId" = books.id');
    const query3 = await pool.query('select * from users');
    const bookCount = query1.rows.length;
    const requestCount = query2.rows.length;
    const userCount = query3.rows.length;
    
    response.status(200).json({bookCount:bookCount , userCount:userCount , requestCount:requestCount});
    
  
    // Commit the transaction
    await pool.query('COMMIT');
  
    // Log the ID
    
  } catch (error) {
    // If there is an error, roll back the transaction
    pool.query('ROLLBACK');
    console.error("Transaction failed:", error);
  } 

}

const updateBookComment = (request, response) => {
  const bookId = parseInt(request.params.bookId);
  const commentId = parseInt(request.params.commentId);
  const updatedCommentText = request.body.userComment;
  console.log(bookId, commentId, updatedCommentText)
  const qry = `
    UPDATE books
    SET comments = jsonb_set(
        comments,
        '{${commentId - 1}, userComment}',
        '"${updatedCommentText}"'
    )
    WHERE id = $1;
  `;
  
  pool.query(qry, [bookId], (error, results) => {
    if (error) {
      return response.status(500).json({ error: 'Internal Server Error' });
    } else {
      response.status(200).json({ message: 'Comment updated' });
    }
  });
};

const addBookComment = (request,response)=>{
  const {id,comments}=request.body;
  console.log(id,comments);
  const qry = `Update books SET comments = $2 where id=$1;`
  pool.query(qry,[id,comments],(error,results)=>{
    if(error) return response.status(500).json({error:'Internal Server Eroor'})
    else 
      response.status(201).json({message:'comment added'});
  })
}

const getForumComments = (request,response)=>{

  const qry = `SELECT * FROM forum`;
  
  pool.query(qry,(error,results)=>{
    if(error) return response.status(500).json({error:'Internal Server Eroor'})
    else if (results.rows.length === 0) {
      return response.status(404).json({ error: 'No comments found' });
    }
    const comments = results.rows;
    response.status(200).json(comments);
    }
  )
}

const addForumComment = (request,response)=>{
  const {comments}=request.body;
  console.log(comments);
  const qry = `INSERT INTO forum (comments) VALUES ($1);`
  pool.query(qry,[comments],(error,results)=>{
    if(error) return response.status(500).json({error:'Internal Server Eroor'})
    else 
      response.status(200).json({message:'comment added'});
  })
}

const updateForumComment = (request, response) => {
  const commentId = parseInt(request.params.commentId);
  const updatedCommentText = request.body.updated;
  console.log(commentId, updatedCommentText)
  const qry = `
  UPDATE forum
  SET comments = $2
  WHERE id = $1;  
  `;
  
  pool.query(qry, [commentId, updatedCommentText], (error, results) => {
    if (error) {
      return response.status(500).json({ error: 'Internal Server Error' });
    } else {
      response.status(200).json({ message: 'Comment updated' });
    }
  });
}
const deleteForumComment = (request, response) => {
  const commentId = parseInt(request.params.commentId);
  console.log(commentId)
  const qry = `
    DELETE FROM forum
    WHERE id = $1;
  `;

  pool.query(qry, [commentId], (error, results) => {
    if (error) {
      return response.status(500).json({ error: 'Internal Server Error' });
    } else {
      response.status(200).json({ message: 'Comment deleted' });
    }
  });
}

const reserveBook = (request,response)=>{
  const {bookId,userId}=request.body;
  console.log(bookId,userId);
  // const qry = `Update bookdata SET timestamp = CURRENT_TIMESTAMP, res_status = 'reserved'
  // where isbn = (Select isbn from bookdata where id=$1 and res_status='no' order by isbn limit 1)`
  // pool.query(qry,[bookId],(error,results)=>{
  //   if(error) return response.status(500).json({error:'Internal Server Eroor'})
  //   else (
  //     response.json({message:'book reserved'}))});
  pool.query('BEGIN', (beginError, beginResult) => {
    if (beginError) {
      return response.status(500).json({ error: 'Internal Server Error' });
    }

    // Fetch ISBN
    const fetchISBNQuery = `
      SELECT isbn
      FROM bookdata
      WHERE id = $1 AND res_status = 'no'
      ORDER BY isbn
      LIMIT 1
    `;
     
    pool.query(fetchISBNQuery, [bookId], (fetchError, fetchResult) => {
      if (fetchError) {
        // Rollback the transaction in case of an error
        pool.query('ROLLBACK', () => {
          return response.status(500).json({ error: 'Internal Server Error' });
        });
      } else {
        const obtainedISBN = fetchResult.rows[0].isbn;
        console.log(obtainedISBN)
        // Make Reservation
        const reserveQuery = `
          UPDATE bookdata
          SET timestamp = CURRENT_TIMESTAMP, res_status = 'reserved'
          WHERE isbn = $1
        `;

        pool.query(reserveQuery, [obtainedISBN], (reserveError, reserveResult) => {
          if (reserveError) {
            // Rollback the transaction in case of an error
            pool.query('ROLLBACK', () => {
              return response.status(500).json({ error: 'Internal Server Error' });
            });
          } else {
            // Add reservation record to reservations table
            const addReservationQuery = `
              INSERT INTO reservations ("userId", "bookId", isbn)
              VALUES ($1, $2, $3)
            `;

            pool.query(addReservationQuery, [userId, bookId, obtainedISBN], (addResError, addResResult) => {
              if (addResError) {
                // Rollback the transaction in case of an error
                pool.query('ROLLBACK', () => {
                  return response.status(500).json({ error: 'Internal Server Error' });
                });
              } else {
                // Commit the transaction
                pool.query('COMMIT', () => {
                  return response.json({ message: 'Book reserved' });
                });
              }
            });
          }
        });
      }
    });
  });
    }

const getReservedBooks = (request,response)=>{
  const userId=request.params.id;
  console.log(userId);
  const qry = `SELECT * FROM reservations_view WHERE "userId"=$1`;
  pool.query(qry,[userId],(error,results)=>{
    if(error) return response.status(500).json({error:'Internal Server Eroor'})
    else 
      response.json(results.rows);
  })
};

const getAllBorrowings = async (request, response) => {
  try {
    pool.query(`SELECT * FROM borrowings WHERE "return_status"= $1`,["no"],(error,results)=>{
      if(error) return response.status(500).json({error:'Internal Server Eroor'})
       
      response.status(200).json({allBorrowings: results.rows});
    })        
  } catch (error) {
    return response.status(500).json({ message: 'Error while retriving borrowings' });    
  }

}

const markBookAsReturned = async (request, response) => {

  const borrowing_Id = await request.body.borrowing_Id;

  const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const queryText = `UPDATE borrowings SET "return_status" = 'yes' WHERE "id" = $1 RETURNING isbn`
        const res = await client.query(queryText, [borrowing_Id])
      
        const queryText2 = `UPDATE bookdata SET "res_status" = 'no', timestamp = null WHERE "isbn" = $1`
        const isbn = res.rows[0].isbn

        await client.query(queryText2, [isbn])
        await client.query('COMMIT')

    } catch (e) {
        await client.query('ROLLBACK')
        throw e

    } finally {
        client.release()
        return response.status(200).json({ message: 'request accepted' });
    }
}

const acceptReservation = async (request, response) => {
    const res_id = await request.body.res_Id;

    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const queryText = 'SELECT * FROM reservations WHERE "res_Id" = $1'
        const res = await client.query(queryText, [res_id])
      
        const queryText2 = `UPDATE bookdata SET "res_status" = 'borrowed', timestamp = timestamp + interval '14' day WHERE "isbn" = $1`
        const isbn = res.rows[0].isbn
        const userId = res.rows[0].userId
        const bookId = res.rows[0].bookId

        await client.query(queryText2, [isbn])

        const queryText3 = "INSERT INTO borrowings (userid, bookid, isbn) VALUES ($1, $2, $3)"
        await client.query(queryText3, [userId, bookId, isbn]);

        const queryText4 = 'DELETE FROM reservations WHERE "res_Id" = $1'
        await client.query(queryText4, [res_id])

        await client.query('COMMIT')

    } catch (e) {
        await client.query('ROLLBACK')
        throw e

    } finally {
        client.release()
        return response.status(200).json({ message: 'request accepted' });
    }
}

const deleteReservation = async (request, response) => {

  const res_id = await request.body.res_Id;
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const queryText = 'SELECT isbn FROM reservations WHERE "res_Id" = $1'
    const res = await client.query(queryText, [res_id])
  
    const queryText2 = `UPDATE bookdata SET "res_status" = 'no', timestamp = null WHERE "isbn" = $1`
    const isbn = res.rows[0].isbn
    await client.query(queryText2, [isbn])

    const queryText3 = 'DELETE FROM reservations WHERE "res_Id" = $1'
    await client.query(queryText3, [res_id])

    await client.query('COMMIT')

  } catch (e) {
      await client.query('ROLLBACK')
      throw e

  } finally {
      client.release();
      return response.status(200).json({ message: 'request deleted' });
  }
/*
  const { reservationId, isbn } = request.body;
  console.log(reservationId, isbn)
  pool.query('BEGIN', (beginError, beginResult) => {
    if (beginError) {
      return response.status(500).json({ error: 'Internal Server Error' });
    }

    const qry = `DELETE FROM reservations WHERE "res_Id"=$1`;
    pool.query(qry, [reservationId], (error, results) => {
      if (error) {
        pool.query('ROLLBACK', () => {
          console.log('i m here')
          return response.status(500).json({ error: 'Internal Server Error' });
        });
      } else {
        const qry2 = `UPDATE bookdata SET res_status = 'no', timestamp = NULL WHERE isbn=$1`;
       
        pool.query(qry2, [isbn], (error2, results2) => {
          if (error2) {
            pool.query('ROLLBACK', () => {
              return response.status(500).json({ error: 'Internal Server Error' });
            });
          } else {
            pool.query('COMMIT', (commitError) => {
              if (commitError) {
                return response.status(500).json({ error: 'Internal Server Error' });
              }
              return response.json({ message: 'Reservation deleted' });
            });
          }
        });
      }
    });
  });

  */
};

 const getReserveCount = (request,response)=>{
    const userId=request.params.id;
    console.log(userId);
    const qry = `SELECT COUNT(*) AS reservecount FROM reservations_view WHERE "userId"=$1`;
    pool.query(qry,[userId],(error,results)=>{
      if(error) return response.status(500).json({error:'Internal Server Eroor'})
      else{
        const reservecount = results.rows
        //console.log(count)
        response.json(reservecount);
      }})
 };

const getBorrowedBooks = (request,response)=>{
   const userId=request.params.id;
    console.log(userId);
    const qry = `SELECT * FROM borrowing_view WHERE userid=$1`;
    pool.query(qry,[userId],(error,results)=>{
      if(error) return response.status(500).json({error:'Internal Server Eroor'})
      else 
        response.json(results.rows);
    })
}
const addExtension = (request,response)=>{
  const borrowingId=request.params.id
  console.log(borrowingId);
  const qry = `UPDATE borrowings SET extension_notes = 'yes' WHERE id=$1 `;
  pool.query(qry,[borrowingId],(error,results)=>{
    if(error) return response.status(500).json({error:'Internal Server Eroor'})
    else 
      response.status(200).json({message:'extension added'});
  })
}
const createUser = (request, response) => {
  const { name, role, email, password, mode } = request.body;
  if (mode === "Sign Up") {
    // console.log("Received request with username:", name);
    // console.log("Received request with password:", password);
    // console.log(request.body);
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
          bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return response.json({ Message: "Error inside server"
          })
          const qry = `INSERT INTO users (username,role,email,password) VALUES ($1, $2, $3,$4) RETURNING *`;
          pool.query(qry, [name, role, email, hashedPassword], (error, results) => {
            if (error) {
              return response.json({ Message: "Error inside server" })
            }
             const accessToken = createToken(results.rows[0]);
          response.cookie('access-token',accessToken,{maxAge:60*60*24*1000,httpOnly:true});
            response.status(201).send("user added");
            
          });});
          
         }})
    }
  }) 
  } else if (mode === "Login") {
    //console.log(request.body);
    const qry = `SELECT * FROM users WHERE username = $1`;
    pool.query(qry, [name], (error, results) => {
      if (error) return response.json({ Message: "Error inside server" });
     // console.log(results.rows.length)
      if (results.rows.length > 0) {
      let route='';
      let dbPassword = results.rows[0].password;
      bcrypt.compare(password,dbPassword,(err,result)=>{
        if(err) {return response.json({ Message: "hasing error" })}
        else if(result===true){
          const accessToken = createToken(results.rows[0]);
          response.cookie('access-token',accessToken,{maxAge:60*60*24*1000,httpOnly:true});
          const userRole = results.rows[0].role;
          console.log(role)
          if(userRole==='admin'){
            route = '/admin';
          }else if(userRole == 'librarian'){
            route='/librarian';
          }else{
            console.log('im here')
            route='/user'
          }
            return response.json({ Login: true ,route});
         
      }else{
        return response.json({ Login: false });
      }
          }) } else {
            return response.json({ Login: false });
          }
     
    });
  }
};







module.exports = {
  pool,
  createUser,
  getBooks,
  filterBooks,
  genreRelatedBooks,
  getBookById,

  getLibData,
  addLibData,
  removeLibData,
  getUserData,
  changeUserStatus,
  addBook,
  getBooksData,
  userRequestBooks,
  countData,
  getBookCount,
  reserveBook,addBookComment,getAuthorById,
  updateBookComment,
  deleteBookComment,
  getForumComments,
  addForumComment,
  updateForumComment,
  deleteForumComment,
  getReservedBooks,
  acceptReservation,
  deleteReservation,
  getAllBorrowings,
  markBookAsReturned,
  getBorrowedBooks,
  addExtension,
  getReserveCount
};
