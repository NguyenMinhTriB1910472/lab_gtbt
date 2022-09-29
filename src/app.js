const express = require("express");
const app = express();
const path =require("path");
var mysql = require('mysql');
// const { dirname } = require("path");
var db = mysql.createPool({
    host: 'localhost',
    user:'root',
    password: 'admin',
    database:'gtbt'
});
const port = process.env.port || 3000;
app.set("view engine","ejs");
app.set("views",path.join(__dirname,'../public'));
app.get("/",(req,res)=>{
    res.render("home");
});
const static_path = path.join( __dirname , " ../public");
console.log(path.join(__dirname,'../public'));
app.use(express.static(static_path));

app.get('/testconnect',function(req,res,next){
    if(db!=null){
        res.send("connect successful");
    } else{
        res.send('connect fail');
    }
  });
  
app.get('/form',function(req,res,next){
    res.send('form');
});

app.post('/insert', function(req, res, next) {
    var name = req.body.name;
    var content = req.body.content;
    var sdt = req.body.sdt;
    var sql = `INSERT INTO user (id, insert, sdt, content) VALUES ("${name}", "${sdt}", "${content}", NOW())`;
    db.query(sql,function(){
      res.redirect('/');
    });
  });

app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
});