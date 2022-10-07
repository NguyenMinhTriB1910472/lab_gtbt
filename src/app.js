const express = require("express");
const app = express();
const path =require("path");
var mysql = require('mysql');
//import { SOME_OBJECT } from './models';
// const { dirname } = require("path");
var db = mysql.createPool({
    host:'127.0.0.1:3300',
    user:'root',
    password:'admin',
    database:'gtbt',
});

// let connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'admin',
//     database: 'gtbt'
// });

app.get("/connection",(req,res)=>{
    db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!!!")
      });
});

const port = process.env.port || 3001;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,'./views'));
app.get("/",(req,res)=>{
    res.render("home");
});
const static_path = path.join(__dirname,"../src");
console.log(static_path);
app.use(express.static(static_path));
app.get('/facbook',function(req,resp){
    resp.redirect("https://www.facebook.com/tri.paipi/");
});
app.get('/github',function(req,resp){
    resp.redirect("https://github.com/minhtri228/lab_PTUD.git");
});
app.get('/instagram',function(req,resp){
    resp.redirect("https://www.instagram.com/trizuize/");
});
app.get("/all", function(req,resp){
    const sql = `select * from user`;
    console.log(sql);
    // db.query(sql, function(err, results) {
        // if (err) throw err;
        // console.log(results);
        // res.redirect("/");
    //})
});

app.get('/testconnect',function(req,res,next){
    if(db!=null){
        console.log(db);
        res.send("connect successful");
    } else{
        res.send('connect fail');
    }
});
  
app.get('/form',function(req,res,next){
    res.send('form');
});


app.post('/insert', function(req, res, next) {
    //const id =req.query.email;
    const email =req.query.email;
    const name = req.query.name;
    const content = req.query.content;
    const sdt = req.query.sdt;
    // console.log(req.query.email+" ");
    // console.log(email+" "+name+" "+content+" "+sdt+" ");
    console.log(db);
    const sql = `INSERT INTO user (email,name, sdt, content) VALUES ("${email}","${name}", "${sdt}", "${content}")`;
    console.log(sql);
    db.query(sql, function(err, results) {
        if (err) throw err;
        console.log(results);
        res.redirect("/");
    })
});
module.exports = app;
app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
});