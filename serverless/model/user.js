const mongoose=require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstname:String,
  lastname:String,
  email:  String, // String is shorthand for {type: String}
  phone: String,
});

const User = mongoose.model('user', userSchema);

module.exports=User;