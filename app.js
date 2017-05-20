
const express=require('express'),
      mongoose=require('mongoose');

const db=mongoose.connect('mongodb://localhost/bookAPI');
const book=require('./models/bookModel');

const app=express();
const port=process.env.PORT || 3000;

const bookRouter=express.Router();
bookRouter.route('/Books')
          .get((req,res)=>{

            //filter with query string
            let query={};
            if(req.query.genre)
            {
              query.genre=req.query.genre;
            }
            //pull the books from the db 
            Book.find((err,books)=>{
              if(err)
                console.log(err);
              res.json(books);
            })
          });

app.use('/api',bookRouter);


app.get('/',(req,res)=>{
  res.send('Welcome to my API');
});

app.listen(port,()=>{
  console.log("Server running at http://localhost:"+port);
})