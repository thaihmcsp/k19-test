const express = require('express')
const router = express.Router()
const UserModel = require('../models/user')
const checkLogin = require('../checkLogin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const BlackListModel = require('../models/blackList')

router.get("/", checkLogin, function (req, res) {
  console.log(6, req.cookies.userID);
  UserModel.find()
    .then(function (data) {
      res.json({ status: 200, mess: "thanh cong", data });
    })
    .catch(function (err) {
      console.log(err);
    });
});

router.get('/page/:page/:class', checkLogin, async (req,res)=>{
  try {
    if(req.params.class === 'all'){
      const data = await UserModel.find()
      .skip(5 * (req.params.page - 1 ))
      .limit(5)
      res.json(data)
    }else{
      const data = await UserModel.find({class: req.params.class})
      .skip(5 * (req.params.page - 1 ))
      .limit(5)
      res.json(data)
    }
  } catch (error) {
    res.json({mess:'loi server', error})
  }
})

router.get('/class/:class', checkLogin, async(req,res)=>{
  try {
    if(req.params.class === 'all'){
      const data = await UserModel.find()
      res.json(data)
    }else{
      const data = await UserModel.find({class: req.params.class})
      res.json(data)
    }
  } catch (error) {
    res.json(error)
  }
})

router.post('/create', async function(req,res){
  try {
    const data = await UserModel.findOne({username: req.body.username})
    if(data){
      res.json({mess: 'username da ton tai'})
    }else{
      const hashPass = await bcrypt.hash(req.body.password, 10)
      const newUser = await UserModel.create({
        username: req.body.username,
        password: hashPass
      })
      res.json({mess:'thanh cong', newUser})
    }
  } catch (error) {
    res.json(error);
  }
})

router.post('/login', async (req,res)=>{
  try {
    const user = await UserModel.findOne({
      username: req.body.username, 
    })
    if(user){
      const hashPass = user.password
      const checkPass = await bcrypt.compare(req.body.password, hashPass)
      if(checkPass){
        const token = jwt.sign({id: user._id}, 'thai')
        res.json({token, mess:'thanh cong'})
      }else{
        res.json({mess:'sai password'})
      }
    }else{
      res.json({mess:'user khong ton tai'})
    }
  } catch (error) {
    res.json({error, mess:'loi server'})
  }
})

router.post('/logout', async(req,res)=>{
  try {
    await BlackListModel.create({token: req.cookies.userID})
    res.json({mess:'dang xuat thanh cong'})
  } catch (error) {
    res.json(error)
  }
})

// viết API tạo user có check trùng username
// data gửi về server gửi qua query

// viết API put để sửa password
router.put('/:id', function(req,res){
  UserModel.updateOne(
    {_id:req.params.id, username: req.body.username, password: req.body.password},
    {password: req.body.newPass}
  )
  .then(function(data){
    if(data.modifiedCount){
      res.json({mess:'update thanh cong', data})
    }else{
      res.json({mess:'sai username, password hoac password khong đổi'})
    }
  })
  .catch(function(err){
    res.json(err)
  })
})

// viết API delete để xóa 1 user

router.delete('/:id', function(req,res){
  UserModel.deleteOne({_id:req.params.id})
  .then(function(data){
    res.json({mess:'xoa thanh cong', data})
  })
  .catch(function(err){
    res.json(err)
  })
})

router.get("/:id", function (req, res) {
  console.log(req.params);
  console.log(req.query);
  UserModel.findOne({ _id: req.params.id })
    .then(function (data) {
      // res.sendFile(path.join(__dirname, "./views/test.html"));
      res.json(data);
    })
    .catch(function (err) {
      console.log(err);
    });
});



module.exports = router