const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const {authRouter} = require("./src/auth/router.js");
const blogRouter = require("./src/blog/router.js");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/blog", blogRouter);

//Database connection
mongoose.connect("mongodb://localhost:27017/BeeProject");
mongoose.connection.on("connected",()=>{
    console.log("DB CONNECTED");
});
mongoose.connection.on("error",(e)=>{
    console.log(e);
});


app.listen(4000,()=>{
   console.log("Server started on Port: 4000");
})