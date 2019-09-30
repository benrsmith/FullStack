
var connection = require('./../config');
var mysql = require('mysql');
var md5 = require('md5');

module.exports.register=function(req,res){
    var today = new Date();
  
    username = req.body.username;
    password = req.body.password;  
    fullName = req.body.fullName

    var sql = "INSERT INTO student (student_id, username, password,full_name,class_id) VALUES (NULL,?,?,?,?)";
    console.log('ran',username,md5(password),fullName)
    connection.query(sql, [username,md5(password),fullName,111], function (error, results, fields) {
      if (error) {
        res.json({
            status:false,
            message:'Query error'
        })
      
      }else{
          res.json({
            status:true,            
            data:results,        
            message:'user registered sucessfully'
        })
      }
    });
}
