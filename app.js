const express = require("express");
const cookieParser = require('cookie-parser')
const path = require("path");
const UserRouter = require('./routers/userRoute')
const IndexRouter = require('./routers/indexRouter')
const PageRouter = require('./routers/pageRouter')
const bcrypt = require('bcrypt')
const multer  = require('multer');
const UserModel = require("./models/user");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'./public/uploads'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    console.log(13, path.extname(file.originalname));
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

app.use("/public", express.static(path.join(__dirname, "./public")));

app.post('/profile', upload.single('test'), async function (req, res, next) {
  console.log(18, req.file);
  console.log(19, req.body);
  const index = req.file.path.indexOf('public')
  const link = req.file.path.slice(index, req.file.path.length)
  try {
    const data = await UserModel.findOne({username: req.body.username})
    if(data){
      res.json({mess: 'username da ton tai'})
    }else{
      const hashPass = await bcrypt.hash(req.body.password, 10)
      const newUser = await UserModel.create({
        username: req.body.username,
        password: hashPass,
        avatar: link
      })
      res.json({mess:'thanh cong', newUser})
    }
  } catch (error) {
    res.json(error);
  }
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

app.use('/user', UserRouter)
app.use('/page', PageRouter)
app.use('/', IndexRouter)

app.listen( process.env.PORT || 4000 );
