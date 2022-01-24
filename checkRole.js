const UserModel = require('./models/user')
const jwt = require('jsonwebtoken')
const BlackListModel = require('./models/blackList')

async function checkRole (req,res,next) {
  try {
    if(req.cookies.userID){
      const checkToken = await BlackListModel.findOne({token: req.cookies.userID})
      if(checkToken){
        res.redirect('/login')
      }else{
        const userID = jwt.verify(req.cookies.userID,'thai').id
        const user = await UserModel.findOne({_id: userID})
        if(user){
          if(user.role === 'admin'){
            next()
          }else{
            res.redirect('/home')
          }
        }else{
          res.redirect('/login')
        }
      }
    }else{
      res.redirect('/login')
    }
  } catch (error) {
    res.redirect('/login')
  }
}

module.exports = checkRole