import book1 from '../assests/books/bk1.jpg'
import book2 from '../assests/books/bk2.jpg'
import book3 from '../assests/books/bk3.jpg'
import book4 from '../assests/books/bk4.jpg'
import book5 from '../assests/books/bk5.jpg'

export const Books=[
    {   id:1,
        title:"Harry Potter and Philosopers stone",
        author:"J.K Rowling",
        image:"https://www.jkrowling.com/wp-content/uploads/2016/11/HPTSS-1.png",
        likes:0,
        comments:[{
            id: 1,
            userName: 'Minindu',
            userComment: 'Great Book',
            typeOfFeedback: true,
          }]
        
    },
    {   id:2,
        title:"Harry Potter and the Chamber Of Secrets",
        author:"J.K Rowling",
        image:"https://images.booksense.com/images/535/716/9781338716535.jpg",
        likes:0,
        comments:[]
    },
    {   id:3,
        title:"Harry Potter and the Prisoner of Azkaban",
        author:"J.K Rowling",
        image:"https://m.media-amazon.com/images/I/71NaVwWsRDL._AC_UF1000,1000_QL80_.jpg",
        likes:0,
        comments:[]
    },
    {   id:4,
        title:"Harry Potter and the Goblet of Fire",
        author:"J.K Rowling",
        image:"https://images.ctfassets.net/usf1vwtuqyxm/3d9kpFpwHyjACq8H3EU6ra/85673f9e660407e5e4481b1825968043/English_Harry_Potter_4_Epub_9781781105672.jpg?w=914&q=70&fm=jpg",
        likes:0,
        comments:[]
    },
    {   id:5,
        title:"Harry Potter and the Order Of Phoneix",
        author:"J.K Rowling",
        image:"https://images.ctfassets.net/usf1vwtuqyxm/29op5HEVpvrKK2JKYCsFiO/5b939002fe3611b3f77659df83a76551/English_Harry_Potter_5_Epub_9781781100240.jpg?w=914&q=70&fm=jpg",
        likes:0,
        comments:[]
    },
    {   id:6,
        title:"Harry Potter and the half-Blood Prince",
        author:"J.K Rowling",
        image:"https://images.ctfassets.net/usf1vwtuqyxm/35KbpLHvQvQtBBKs0vKErL/43985bc9e5bea863ccf9cc9561b62827/English_Harry_Potter_6_Epub_9781781100257.jpg?w=914&q=70&fm=jpg",
        likes:0,
        comments:[]
    },
    {   id:7,
        title:"Harry Potter and Deathly hallows",
        author:"J.K Rowling",
        image:"https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/7/30/1406719784584/a3673b4b-74cd-4544-8eba-bd0b51fbee5f-1360x2040.jpeg?width=700&quality=85&auto=format&fit=max&s=f872e3d83c535f8659a964c8328fa977",
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