
module.exports.newhiscore=function(req,res){
    var id = currentUser.id
    var score = req.body.score

    var sql = 'UPDATE scores SET score = ? WHERE student_id = ? AND score < ?'
    connection.query(sql,[score,id,score], function (error, results, fields){
        if (error) {
            res.json({
              status:false,
              message:'Query error'
              })
        }else{
            res.json({
            status:true,
            })

        }
    })
    
  
  
  
}
  