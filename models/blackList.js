const mongoose = require("./connectDB"); // gọi mongoose vào

const BlackListSchema = mongoose.Schema({
  token: String
},{collection:'blackList'})

const BlackListModel = mongoose.model('blackList', BlackListSchema)

module.exports = BlackListModel
