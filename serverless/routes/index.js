var express = require('express');
var router = express.Router();
var User =require('../model/user')




router.post('/authenticate',(req,res)=>{
  const {username,password}=req.body;
  if(username==='axfsd1'&&password==='admin')
      res.json({
        user:{
          name:'axfsd1'
        }
      })
  else 
      res.json({
        error:'authentication failed'
      })

})


// Routes
router.post('/save',(req,res)=>{
  const {firstname,lastname,email,phone}=req.body;
  const user=new User({firstname,lastname,email,phone});
  user.save().then((response)=>{
    res.status(200);
    res.json({
      user:response._doc
    })
  }).catch((err)=>{
    res.status(400);
    res.json({
        message:'User couldnot be saved in DB',
        error:err
      })
  })
})


router.get('/users',(req,res)=>{

  User.find({}).then(response=>{
    console.log(response)
    res.json({users:{...response}})
  })

})



router.get('/id/:id',(req,res)=>{
  const {id}=req.params
  User.findById(id).then(doc=>{
    res.status(200);
    res.json({
      user:{...doc}
    })
  }).catch((err)=>{
    res.status(400);
    res.json({
      message:'User couldnot be found',
      error:err
    })

})

})


router.put('/id/:id',(req,res)=>{
  const id=req.params.id;

  console.log(req.body)
  const{firstname,lastname,email,phone}=req.body;
  User.findByIdAndUpdate({_id:id},{firstname:firstname,lastname:lastname,email:email,phone:phone}, function(err, result){
    
    if(err){
      console.log(err);
        res.send(err)
    }
    else{
        res.send(result)
    }
  })
})


router.delete('/id/:id',(req,res)=>{
  const id=req.params.id;
  User.deleteOne({_id:id}).then(doc=>{
    console.log(doc)
    res.json({message:'delete sucessfull'});
  }).catch(err=>{
    res.json({error:'delete not sucessfull',err:err});
  })
})

module.exports = router;
