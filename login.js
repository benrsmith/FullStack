const http = new XMLHttpRequest();
server = {};
server.url = 'http://localhost:3000'
server.regurl='http://localhost:3000/api/register';
server.authurl = 'http://localhost:3000/api/authenticate';
server.hiscoresurl = 'http://localhost:3000/api/hiscores';
server.statisticsurl = 'http://localhost:3000/api/statistics';
server.newhiscoreurl = 'http://localhost:3000/api/newhiscore';
currentUser = {};                       
currentUser.score = 0


server.login = function(){

    usernameinput = document.getElementById("loginName").value;
    passwordinput = document.getElementById("loginPass").value;
    console.log(usernameinput,passwordinput);
    var parameters = "username="+usernameinput+"&password="+passwordinput
    http.open("post", server.authurl,true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    http.onreadystatechange = function() { // Call function on statechange
        if (http.readyState === http.DONE && http.status === 200) {
            body = http.responseText
            parsedBody = JSON.parse(body)
            currentUser.id = parsedBody.id
            currentUser.teacher = parsedBody.teacher
            console.log("teac1")
            console.log(currentUser.teacher)
            if (currentUser.teacher == true){
                console.log("teac")
                teacherInterface();
            }
            if (parsedBody.message == "successfully authenticated"){
                loggedIn();
                  //now that current user is defined, future updates of tables can use this!
            }else if (parsedBody.message == "Username and password do not match"){
                incorrectPassword();
        
            }else if (parsedBody.message == "User does not exist")
                incorrectUsername();    

        }
    }
    
    http.send(parameters);

}

server.addUser = function(){
    usernameInput = document.getElementById("registerName").value;
    passwordInput = document.getElementById("registerPass").value;
    fullNameInput = document.getElementById("registerfullName").value;

    if (usernameInput.length < 3 || passwordInput.length < 5 || fullNameInput.length < 6)
        document.getElementById("registerFeedback").innerHTML = "Field length requirements not met: Username (3), Password (5), Full name (6)"
        document.getElementById("registerFeedback").style.display = "block"
        return; 
    
    var parameters = "username="+usernameInput+"&password="+passwordInput+"&fullName="+fullNameInput
    console.log(parameters,"user added");
    http.open("post", server.regurl,true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(parameters);

    http.onreadystatechange = function() { // Call a function when the state changes.
        if (http.readyState === http.DONE && http.status === 200) {
            body = http.responseText
            parsedBody = JSON.parse(body)
            console.log(parsedBody.status)
        
            if (parsedBody.status == false){
                document.getElementById("registerFeedback").innerHTML = "Registration invalid"
                  
            }else if (parsedBody.status == true){
                document.getElementById("registerFeedback").innerHTML = "User registered successfully"
                //.innerHTML = "User registered successfully"
            }
            document.getElementById("registerFeedback").style.display = "block";
        
    }


}
}


teacherInterface = function(){
    document.getElementById("hiscoreButton").value = "Student Information"
    document.getElementById("cvs").style.display = "none"
    document.getElementById("manageClass").style.display = "block"

}


loggedOut = function(){
    //usernameinput = document.getElementById("registerform").elements["username"].value
    //passwordinput = document.getElementById("registerform").elements["password"].value
    currentUser = {}
    document.getElementById("logoutButton").style.visibility = "hidden";
    document.getElementById("cvs").style.display = "block"
    document.getElementById("login").style.visibility = "visible";
    document.getElementById("loggedIn").textContent ="You are now logged in as ";
    document.getElementById("loggedIn").style.display = "none";
    document.getElementById("loginName").value = ""
    document.getElementById("loginPass").value = ""
}


loggedIn = function(){
    document.getElementById("logoutButton").style.visibility = "visible";
    console.log("successfully authenticated");
    currentUser.name = parsedBody.user;
    currentUser.loginDate = Date.now();
    document.getElementById("login").style.visibility = "hidden";
    document.getElementById("loggedIn").textContent += " as "+currentUser.name;
    document.getElementById("loggedIn").style.display = "block";
    document.getElementById("loginError").style.display = "none";
    
}

incorrectPassword = function(){
    console.log("Username and password do not match");
    document.getElementById("loginError").innerHTML = "Username and password do not match";
    document.getElementById("loginError").style.display = "block";
    

}

incorrectUsername = function(){
    console.log("User does not exist");
    document.getElementById("loginError").innerHTML = "User does not exist";
    document.getElementById("loginError").style.display = "block";


}
