const { User } = require("./models");
const jsonWebToken = require("jsonwebtoken");
const { request } = require("express");
const Key = "bj3b4kjb3jb3j4b3-43b3b45j3bjk4bj5k3b";

const register = async (req, res) => {
    var isExist = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (isExist) {
      return res.json({
        status: "Error",
        message: "This Username or email already exist.",
      });
    }
  
    // isExist = await User.findOne({ email: req.body.email });
    // if (isExist) {
    //   return res.json({
    //     status: "Error",
    //     message: "This email already exist.",
    //   });
    // }
  
    var newUser = await User.create(req.body);
    return res.json({ status: "User created successfully", newUser });
  };
  

const loginMiddleWare = async (req, res, next) => {
    const { username,password } = req.body;
    if(!username || !password){
        return res.send("Username and Password required");
    }
    const userExists = await User.findOne({username: username});
    if(!userExists){
        return res.send("No such Username Exists");
    }
    if(!userExists.isAuthenticated(password)){
        return res.json({
            status: "Error",
            message: "Wrong Password"
        });
    }    

    var token = jsonWebToken.sign({
        _id: userExists._id
    },
    Key
    );
    req.body.token = token;
    // req.body.userExists = userExists;
    next();
  };

const login = async (req,res) => {
    return res.json({ status: "Login Successfully",data: req.body });
};

const reset = async (req,res) => {
    var user = await User.findOne({ username: req.body.username });
    user.password = req.body.newPassword;
    await user.save();
    return res.json({ status: "Done", user });
};

module.exports = { register, login, reset ,loginMiddleWare, Key };