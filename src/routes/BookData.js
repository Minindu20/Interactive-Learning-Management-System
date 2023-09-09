import book1 from '../assests/books/bk1.jpg'
import book2 from '../assests/books/bk2.jpg'
import book3 from '../assests/books/bk3.jpg'
import book4 from '../assests/books/bk4.jpg'
import book5 from '../assests/books/bk5.jpg'

export const Books=[
    {   id:1,
        title:"Harry Potter and Philosopers stone",
        author:"J.K Rowling",
        image:book1,
        likes:0,
        comments:[{
            id: 1,
            userName: 'Minindu',
            userComment: 'Great Book',
            typeOfFeedback: true,
          }]
        
    },
    {   id:2,
        title:"Harry Potter and Half blood  prince",
        author:"J.K Rowling",
        image:book2,
        likes:0,
        comments:[]
    },
    {   id:3,
        title:"Harry Potter and Chamber of secrets",
        author:"J.K Rowling",
        image:book3,
        likes:0,
        comments:[]
    },
    {   id:4,
        title:"Harry Potter and Deathly hallows",
        author:"J.K Rowling",
        image:book4,
        likes:0,
        comments:[]
    },
    {   id:5,
        title:"Harry Potter and Philosopers stone",
        author:"J.K Rowling",
        image:book5,
        likes:0,
        comments:[]
    },
    {   id:6,
        title:"Harry Potter and Chamber of secrets",
        author:"J.K Rowling",
        image:book3,
        likes:0,
        comments:[]
    },
    {   id:7,
        title:"Harry Potter and Deathly hallows",
        author:"J.K Rowling",
        image:book4,
        likes:0,
        comments:[]
    },
    {   id:8,
        title:"Harry Potter and Philosopers stone",
        author:"J.K Rowling",
        image:book5,
        likes:0,
        comments:[]
    }
]
export function updateBookComments(bookId, newComments) {
    const updatedBooks = Books.map((book) => {
      if (book.id.toString() === bookId) {
        return { ...book, comments: newComments };
      }
      return book;
    });
    console.log(updatedBooks);
    return updatedBooks;
    
  }