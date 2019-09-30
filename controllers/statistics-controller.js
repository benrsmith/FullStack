var connection = require('./../config');
var mysql = require('mysql');

module.exports.statistics=function(req,res){

  
  getClassStatistics = function(teacherId){
    var sql = "SELECT count(score) as 'noStudents', max(score) as 'max_score', avg(score) as 'avg_score' FROM scores s join student st on st.student_id=s.student_id join classes c on c.class_id=st.class_id where c.teacher_id=?"
    connection.query(sql,[teacherId], function (error, results, fields) {
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
    var id = req.body.id;
    console.log("This has run",id)

    getClassStatistics(id);


}
