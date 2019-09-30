var connection = require('./../config');
var mysql = require('mysql');
var moment = require('moment');

module.exports.authenticate=function(req,res){
  var today = new Date();                            
  username = req.body.username;  
  password = req.body.password;  
  
  var md5 = require('md5');
  var a = md5("studentpass1")
  console.log(a)
  

//var hash = md5("my message");
//The user creates an account.
//Their password is hashed and stored in the database. At no point is the plain-text (unencrypted) password ever written to the hard drive.
//When the user attempts to login, the hash of the password they entered is checked against the hash of their real password (retrieved from the database).
//If the hashes match, the user is granted access. If not, the user is told they entered invalid login credentials.
//Steps 3 and 4 repeat every time someone tries to login to their account.


  var sql = 'SELECT full_name as fname, password, student_id AS id FROM student WHERE username = ? UNION ALL SELECT full_name as fname, password, teacher_id FROM teacher WHERE username = ?'
  connection.query(sql,[username,username], function (error, results, fields) {
    if (error) {
        res.json({
          status:false,
          message:'Query error'
          })
    }else{
      if(results.length >0){
          if(md5(password)==results[0].password){
            var teacher = false;
            if (results[0].fname.slice(0,2) == "Mr"){       
              teacher = true;
            }
              res.json({
                  status:true,
                  message:"successfully authenticated",
                  user:username, //teacher id or student id?
                  id:results[0].id,
                  teacher:teacher,
                  //class:results[0].class_id
              })
          updateLoginDate(teacher,results[0].id);
          }else{
              res.json({
                status:false,
                message:"Username and password do not match"
                });
          }
        
      }
      else{
        res.json({
            status:false,    
            message:"User does not exist"
        });

      }
    }
  });
}

updateLoginDate = function(teacher,id){
  
  if (teacher == false){
    var idType = "student_id"
    var user = "student"
  }else{
    var idType = "teacher_id"
    var user = "teacher"
  }
  //put in format YYYY-MM-DD HH:MM:SS
  var datetime = moment().format('YYYY/MM/D hh:mm:ss') // SSS at end?

  console.log(datetime,teacher,id)

  var sql = 'UPDATE ? SET last_login = ? WHERE ? = ?'
  connection.query(sql,[user,datetime,idType,id], function (error, results, fields){
    if (error) {
        console.log("Error 008")
    }   
    
  })
}

//UPDATE student SET last_login = "2019/03/29 07:27:57" WHERE student_id = 1