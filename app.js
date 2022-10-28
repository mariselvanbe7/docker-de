const express = require("express");
const exhbs = require("express-handlebars");
const bodypraser = require("body-parser");
const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const alert = require('alert');


require('dotenv').config();

const app = express();
const port = 5000;

app.use(bodypraser.urlencoded({extended:false}));
app.use(bodypraser.json());

app.use(express.static("public"));

const handlebars = exhbs.create({extname:".hbs"});
app.engine('hbs', handlebars.engine);
app.set("view engine", "hbs");


const con = mysql.createPool({
    connectionLimit:10,
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
});

con.getConnection((err,Connection)=>{
    if(err){
        alert("hello"  +err);
    } else{
        
   alert("connection succses");
    }
})


const routes = require("./server/routes/student");
app.use('/',routes);

/*
app.use((req, res, next) => {
    res.status(404).send(
        "<h1>Page not found on the server</h1>")
})
*/
app.use((req, res) => {

    
    var username = req.body.username;
    var password = req.body.password;
if(username=="" && password == ""){
    res.render("home",{msg:"Please fill the form"});
}
    

   else if (username=='mari' && password == 'pass') {
    
        con.getConnection((err,Connection)=>{
            if(err) throw err
            Connection.query("select * from users",(err,rows) =>{
                Connection.release();
                if(!err){
                    res.render("datas",{rows,msg:"login sucess"});
              }else{
                    
                   console.log("Error in Listing Data" +err);
                   
                }
            });
        });

    } else { 
       res.render("home",{msg:"Invalid user"});
        
    
    }
});

app.listen(port,() => {
    console.log("Listen port" + port);
});