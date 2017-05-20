
const express=require('express');
const bookRouter=express.Router();
const routes=(Book)=>{
  
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
                res.status(500).send(err);
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
            })
            .put((req,res)=>{
              //put will just replce an existing item
              Book.findById(req.params.bookId,(err,book)=>{
                if(err)
                  res.status(500).send(err);
                  else
                  {
                    title=req.body.title;
                    genre=req.body.genre;
                    author=req.body.author;
                    read=req.body.read;
                    //save the new book to db 
                    book.save();
                    res.json(book);
                  }
              })
            })
      

            return bookRouter;
}

module.exports=routes;