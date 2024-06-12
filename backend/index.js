const express=require('express');
const cors=require('cors');
const app=express();
const mongoose=require('mongoose');
const route=require('./routes/toDoRoute');
require("dotenv").config({path:"./config/config.env"});
const port=process.env.PORT;
app.use(express.json());
console.log(port);
app.use(cors());
let collection;
mongoose.connect(process.env.MONGODB_URI,{
    dbName: "todoapp",
  }).then(() => {
    console.log("Connected to database");
}).catch(err => console.log(err));
app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.use(route);
app.use('/api/todo',route);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
