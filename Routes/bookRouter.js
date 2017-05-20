
const express=require('express');
const bookRouter=express.Router();
const routes=()=>{
  
  bookRouter.route('/Books')
//we let the users add a new Book using the post verb
          .post((req,res)=>{
            //create a new book with req.body has the content
            let book=new Book(req.body);
            //save the book to mongodb 
            book.save();
            res.send(book);//send back the book so the user gets its _id
            res.status(201).send(book);//status of created and the book created
          })
          .get((req,res)=>{

            //filter with query string
            let query={};
            if(req.query.genre)
            {
              query.genre=req.query.genre;
            }
            //pull the books from the db 
            Book.find(query,(err,books)=>{
              if(err)
                console.log(err);
              res.json(books);
            });
          });

  bookRouter.route('/Books/:bookId')
            .get((req,res)=>{
              Book.findById(req.params.bookId,(err,book)=>{
                if(err)
                  res.status(500).send(err);
                res.json(book);
              });
            });

            return bookRouter;
}

module.exports=routes;