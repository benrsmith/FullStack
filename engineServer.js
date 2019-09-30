
                      
server.classHiscores = function(){ //will only run if student logged in

    var id = currentUser.id
    var isTeacher = currentUser.teacher

    var parameters = "id="+id+"&isTeacher="+isTeacher
    http.open("post",server.hiscoresurl,true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    http.onreadystatechange = function() { // Call a function when the state changes.
        if (http.readyState === http.DONE && http.status === 200) {
            body = http.responseText
            parsedBody = JSON.parse(body)
            if (isTeacher == false){
                displayAsTable(parsedBody.results)
            }else{
                displayAsTableTeacher(parsedBody.results)
            }
        }
    }
    
    http.send(parameters);
}


server.updateScore = function(){
    console.log("this has run 878")
    var score = currentUser.score

    var parameters = "score="+score
    http.open("post",server.newhiscoreurl,true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    http.onreadystatechange = function() { 
        if (http.readyState === http.DONE && http.status === 200) {
            body = http.responseText
            parsedBody = JSON.parse(body)
        }
    }
    http.send(parameters);
}



server.statistics = function(){

    var id = currentUser.id

    var parameters = "id="+id
    http.open("post",server.statisticsurl,true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    http.onreadystatechange = function() { // Call a function when the state changes.
        if (http.readyState === http.DONE && http.status === 200) {
            body = http.responseText
            parsedBody = JSON.parse(body)
            console.log(parsedBody)
            displayAsTableStats(parsedBody.results)
        
        }
    }
    
    http.send(parameters);
}

