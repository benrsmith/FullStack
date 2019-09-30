var connection = require('./../config');
var mysql = require('mysql');

module.exports.hiscores=function(req,res){
  var today = new Date();  

  //need to get the currentUser stored and use the username to get the teacherID
  var id = req.body.id;
  var isTeacher = req.body.isTeacher;
  console.log("This has run",id,isTeacher)

  getClassScores = function(userClass){
    var sql = "SELECT st.full_name,s.score FROM scores s join student st on st.student_id=s.student_id join classes c on c.class_id=st.class_id where c.class_id=? ORDER BY score DESC"
    connection.query(sql,[userClass], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'Query error'
            })
      }else{
        if(results.length >0){
            res.json({
              status:true,
              results:results,
            })
          
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
  getClassInfo = function(teacherID){
    var sql = "SELECT st.student_id,st.full_name,st.last_login, s.score FROM scores s join student st on st.student_id=s.student_id join classes c on c.class_id=st.class_id where c.teacher_id=?"

    connection.query(sql,[teacherID], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'Query error'
            })
      }else{
        if(results.length >0){
            res.json({
              status:true,
              results:results,
            })
          
        }
        else{
          res.json({
              status:false,    
              message:"Empty class"
          });
  
        }
      }
    });

  }



  
  if (isTeacher == "false"){  //needed to send as string in response
    var sql = 'SELECT class_id FROM student WHERE student_id = ?'
    connection.query(sql,[id], function (error, results, fields) {
      if (error) {
          console.log("Error 008")
      }else{
        if(results.length >0){
            var userClass = results[0].class_id
            console.log(userClass,"memes")
            getClassScores(userClass);
          
        }
        else{
          console.log("Error 009")

        }
      }
    });
  } 

  if (isTeacher == "true"){
    console.log("Can run other query here")
    getClassInfo(id);
  }

}
