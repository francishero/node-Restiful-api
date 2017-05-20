
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

          //middleware to find a single book
bookRouter.use('/:bookId',(req,res)=>{
        Book.findById(req.params.bookId,(err,book)=>{
          if(err)
            res.status(500).send(err);
          else if(book)
          {
            //we found the book so we update item
            req.book=book;
            next();//continue to others
          }
          else
          {
            res.send(404).send('Book not found');
          }
        });
});

  bookRouter.route('/Books/:bookId')
            .get((req,res)=>{
              //the middleware will handle this
            res.json(req.book);
            })
            .put((req,res)=>{
              //put will just replce an existing item
              req.book.title=req.body.title;
              req.book.genre=req.body.genre;
              req.book.author=req.body.author;
              req.book.read=req.body.author;

              req.book.save();
              res.json(req.book);
            })
      

            return bookRouter;
}

module.exports=routes;