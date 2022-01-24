const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://nodemy:nodemy123@cluster0.10m5w.mongodb.net/k19db?retryWrites=true&w=majority"); // liên kết databases mongodb

module.exports = mongoose