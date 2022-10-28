const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");

const con = mysql.createPool({
    connectionLimit:10,
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
});



exports.view=(req,res) =>{
                res.render("home");
       
};


exports.adduser = (req,res) =>{
    res.render("adduser");
}


exports.save = (req, res) =>{
    con.getConnection((err,Connection)=>{
        if(err) throw(err);

        const {name,age,city} =req.body;

        Connection.query("insert into users (NAMEs,AGE,CITY) values (?,?,?)",[name,age,city],(err,rows) =>{
            Connection.release();
            if(!err){
                res.render("adduser",{msg:"save succefully!!"});
            }else{
                //console.log("Error in Listing Data" +err);
                res.render("adduser",{msg:"field is empty"});
            
            }
        });
    });
 
}

exports.delete = (req,res)=>{
   con.getConnection((err,Connection) => {
    if(err) throw err
   let id = req.params.id;
    Connection.query("delete from users where id = ?",[id],(err,rows) => {
        Connection.release();
        if(!err){
           res.redirect("/datas");
            

        }
        else{
            res.render("/datas",{msg:"Don't delete you have somee err" + err});
        }
    })
    
})
};

exports.datas = (req,res) =>{
   con.getConnection((err,Connection)=>{
        if(err) throw err
        Connection.query("select * from users",(err,rows) =>{
            Connection.release();
            if(!err){
                res.render("datas",{rows});
          }else{
           
               console.log("Error in Listing Data" +err);
               
            }
        });
    });
}

exports.edituser = (req,res) =>{

    con.getConnection((err,Connection) =>{
        if(err) throw err
        let id = req.params.id;
        Connection.query("select * from users where id =?", [id], (err,rows) =>{
           Connection.release();
            if(!err){
                res.render("edituser",{rows});
            }
            else{
                console.log(err);
            }
        });
        
    });
};

exports.edit = (req, res) =>{
    con.getConnection((err,Connection)=>{
        if(err) throw(err);

        const {name,age,city} =req.body;
        let id = req.params.id;
        console.log(id);
        Connection.query("update users set NAMES=?,AGE=?,CITY=? where ID=?",[name,age,city,id],(err,rows) =>{
            Connection.release();
            if(!err){
               
                con.getConnection((err,Connection) =>{
                    if(err) throw err
                    let id = req.params.id;
                    Connection.query("select * from users where id =?", [id], (err,rows) =>{
                       Connection.release();
                        if(!err){
                        
                            res.render("edituser",{rows,msg:"update succefully!!"});
                        }
                        else{
                            console.log(err);
                        }
                    });
                    
                });
            }else{
                //console.log("Error in Listing Data" +err);
                res.render("adduser",{msg:"field is empty"});
            
            }
        });
    });
 
}

