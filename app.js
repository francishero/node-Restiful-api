
const express=require('express'),
      mongoose=require('mongoose');

const db=mongoose.connect('mongodb://localhost/bookAPI');
const book=require('./models/bookModel');

const app=express();
const port=process.env.PORT || 3000;

const bookRouter=express.Router();
bookRouter.route('/Books')
          .get((req,res)=>{
            let responseJson={Hello:"this is my api"};
            res.json(responseJson);
          });

app.use('/api',bookRouter);


app.get('/',(req,res)=>{
  res.send('Welcome to my API');
});

app.listen(port,()=>{
  console.log("Server running at http://localhost:"+port);
})