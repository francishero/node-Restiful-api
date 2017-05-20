//here we define a json object that lays out how a book looks like

const mongoose=require('mongoose'),
      schema=mongoose.schema();
const bookModel=new schema({
  title:{
    type:string
  },
  author:{type:string},
  genre:{type:string},
  read:{type:boolean,default:false}
});

//we have a new schema called book so we export
module.exports=mongoose.model('book',bookModel);