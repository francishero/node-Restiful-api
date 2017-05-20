//here we define a json object that lays out how a book looks like

const mongoose=require('mongoose'),
      Schema=mongoose.Schema;
const bookModel=new Schema({
  title:{
    type:String
  },
  author:{type:String},
  genre:{type:String},
  read:{type:Boolean,default:false}
});

//we have a new schema called Book so we export
module.exports=mongoose.model('Book',bookModel);