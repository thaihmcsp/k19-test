const express = require('express')
const router = express.Router()
const path = require('path')
const checkLogin = require('../checkLogin')
const checkRole = require('../checkRole')
const UserModel = require('../models/user')

router.get("/home", checkLogin, async function (req, res) {
  res.sendFile(path.join(__dirname, "../views/home.html"));
});

router.get("/admin", checkRole , async function (req, res) {
  res.sendFile(path.join(__dirname, "../views/admin.html"));
});

router.get("/list", checkRole , async function (req, res) {
  const listUser = await UserModel.find()
  res.render('pages/home', {listUser: listUser})
});

router.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/login.html"));
});

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/signup.html"));
});

router.get("/changePass", checkLogin, function (req, res) {
  res.sendFile(path.join(__dirname, "../views/changePass.html"));
});

module.exports = router