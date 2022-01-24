const express = require('express')
const router = express.Router()
const UserModel = require('../models/user')

router.get('/changePage/:page', async (req,res)=>{
  try {
    const data = await UserModel.find()
    .skip((req.params.page - 1) * 5)
    .limit(5)
    res.render('components/listUser', {data: data})
  } catch (error) {
    res.json(error)
  }
})

module.exports = router