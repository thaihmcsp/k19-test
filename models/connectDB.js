const mongoose = require('mongoose')
const user = process.env.USER
const pass = process.env.PASS

mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.10m5w.mongodb.net/k19db?retryWrites=true&w=majority`); // liên kết databases mongodb

module.exports = mongoose