var express = require('express');
var router = express.Router();
var User =require('../model/user')

router.get('/authenticate/:str',(req,res)=>{
  let {str}=req.params;
  const [username,password]=str.split(',')
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
  console.log('hello in save ');
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
    res.status(200);
    res.json({response:response})
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






module.exports = router;
