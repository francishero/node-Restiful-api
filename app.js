
const express=require('express'),
      mongoose=require('mongoose'),
      bodyParser=require('body-parser');

const db=mongoose.connect('mongodb://localhost/bookAPI');
const Book=require('./models/bookModel');

const app=express();
const port=process.env.PORT || 3000;

//use body-parser to parse the body into json and add it to the req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//from the Routes dir
const bookRouter=require('./Routes/bookRouter')(Book);


app.use('/api',bookRouter);


app.get('/',(req,res)=>{
  res.send('Welcome to my API');
});

app.listen(port,()=>{
  console.log("Server running at http://localhost:"+port);
})