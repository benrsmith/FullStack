
displayAsTable = function(dicList){
	console.log("table func run")

	var table = document.getElementById("hiscoreTable")
	document.getElementById("headingsRow").style.display = "table-row"

	for (var i = 0; i < dicList.length; i++) {    
			var counter = 0
			var newRow = table.insertRow(table.length);
			for (var key in dicList[i]) {
					var cell = newRow.insertCell(counter);
					cell.innerHTML = dicList[i][key];
					counter+=1
					
			}
	}
}

displayAsTableTeacher = function(dicList){
	var table = document.getElementById("hiscoreTable")
	document.getElementById("teacherHeadingsRow").style.display = "table-row"
	
	for (var i = 0; i < dicList.length; i++) {     // moved i++ to the end
		var counter = 0
		var newRow = table.insertRow(table.length);
		for (var key in dicList[i]) {
				var cell = newRow.insertCell(counter);
				cell.innerHTML = dicList[i][key];
				counter+=1
				
		}
}
}
	

displayAsTableStats = function(dicList){
	var table = document.getElementById("statisticsTable")
	document.getElementById("statsHeadingsRow").style.display = "table-row"
	for (var i = 0; i < dicList.length; i++) {    
		var counter = 0
		var newRow = table.insertRow(table.length);
		for (var key in dicList[i]) {
				var cell = newRow.insertCell(counter);
				cell.innerHTML = dicList[i][key];
				counter+=1
				
		}
}
}

generateQuestions = function(){		

	var questionsLeft = 10;

	var questionStack = []
	var topics = []

	if (document.getElementById("topic1").checked)
		topics.push(projectileMotion)
	if (document.getElementById("topic2").checked)
		topics.push(projectileMotion)

	
	getTopic = function(){											
		
		for (var i = 0;i<questionsLeft;i++){
			var index = Math.floor(Math.random() * topics.length);
			try{
				questionStack.push(topics[index])
				}
				catch (err){
					quizOver();//this occurs if length is 0
				}
		}
		
		return true;
	}
	

	runQuestion = function(){
		if (questionsLeft > 0){
		var nextQ = questionStack.pop()
		console.log(questionsLeft,"haha",questionStack);
		try{
		nextQ();
		questionsLeft = questionsLeft - 1
		}
		catch (err){
			if (topics.length == 0)
				quizOver();
		}
	
		}else{
			quizOver();
		}


	}
	document.getElementById("nextQuestion").addEventListener("click", runQuestion);
	getTopic();
	runQuestion();	


}

quizOver = function(score){
	world.clearCanvas();
	document.getElementById("nextQuestion").style.display = "none"
	document.getElementById("questionAnswer").style.display = "none"
	document.getElementById("test").style.display = "none"
	document.getElementById("menu").style.display = "block"
	document.getElementById("solutions").style.display = "none"
	console.log('its over but you have to do that query stuff AND FINISH WRITE UP BY 11:30 ITS 8:30 3 HOURS')
	server.updateScore();
}





replaceCanvas = function(elem) {
	document.getElementById("nextQuestion").style.display = "none"
	document.getElementById("questionAnswer").style.display = "none"
	document.getElementById("test").style.display = "block"
	document.getElementById("menu").style.display = "none"
	document.getElementById("solutions").style.display = "none"
	var myCanvas = document.createElement('canvas')
	myCanvas.id = "ccv"
	myCanvas.style = "display:none" 
	myCanvas.id="ctx" 
	myCanvas.width = "700" 
	myCanvas.height = "520"
	ctx = myCanvas.getContext('2d');
	// Insert the new canvas after the old one
	elem.parentNode.insertBefore(myCanvas, elem.nextSibling);
	// Remove old canvas. Now the new canvas has its position.
	elem.parentNode.removeChild(elem);
	return ctx
  }
  

projectileMotion = function(){

	
  var ctx = replaceCanvas(document.getElementById("ctx"));
	var myCanvas = document.getElementById("ctx")

	document.getElementById("vars").style.display = "block";
	myCanvas.style.display = "block"
	world = {};                                      
	world.radian =Math.PI/180;
	world.gravity= .1;													//YOU CAN HIGHLIGHT CODE AND RIGHTCLICK RUN THIS USEFUL FOR TRYING STUFF LIKE ACCESSING DICT
	world.bodies = {};
	world.angles = []
	for (i = 0; i <= 360; i += 5) {
		world.angles.push(i)
	}
	console.log(world.angles);
	
	world.drawScreen = function(){
		ctx.fillStyle = '#EEEEEE';
		ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
		ctx.strokeStyle = '#000000';
		ctx.strokeRect(1, 1, myCanvas.width-2, myCanvas.height-2);
	}



	world.createTestBall = function(){
		//var testAdjustment = Math.random() * 50;
		var x = myCanvas.width/2; //+testaAjustment
		var y = myCanvas.height/2;	

		 //rounds to nearest 5
		var angleIndex = Math.floor(Math.random() * world.angles.length) //like 73 but need to round
		var angle = world.angles[angleIndex]
		var speed = Math.floor(Math.random() * 50)	// in ones from 1 to 250 or so
		var radius = 20;	
		var friction = 0.008;
		var randomID = Math.random();
		ball(x,y,angle,speed,radius,friction,randomID);
		//ball(400,400,200,10,10,0.6,0.0008,Math.random())
	}



	body = function(x,y,angle,speed,friction,randomID){
		var self = {
			x:x,
			y:y,
			angle: angle,
			radians: world.radian * angle, 
			speed: speed,
			vx: Math.cos(world.radian * angle) * speed,
			vy: Math.sin(world.radian * angle) * speed,  //negative/positive variable in func
			friction:friction,
			id:randomID
		}
		return self;
	}





	ball = function(x,y,angle,speed,radius,friction,randomID){
		var self = body(x,y,angle,speed,friction,randomID);
		self.radius = radius;
		self.type = 'circle';

		self.draw = function(){
			ctx.beginPath(); 
			ctx.arc(self.x,self.y,self.radius,0,Math.PI*2,true); 
			ctx.closePath();
			ctx.fill();
			ctx.closePath();
			ctx.fillStyle = '#000000'	
		}
		
		self.displayVars = function(){
		
			self.draw();
			ctx.beginPath();
			ctx.moveTo(self.x - 60 ,self.y);
			ctx.lineTo(self.x +60,self.y);
			ctx.moveTo(self.x ,self.y - 60);
			ctx.lineTo(self.x ,self.y + 60);
			ctx.stroke();
			ctx.closePath();

			ctx.fillText("Initial velocity ="+self.speed, self.x + 50, self.y + 50);
			ctx.fillText("Initial angle = "+self.angle, self.x + 50, self.y + 90);
			ctx.beginPath();
			ctx.strokeStyle = '#00ff00'
			ctx.moveTo(self.x ,self.y);
			var xline = Math.cos(world.radian * self.angle)
			var yline = Math.sin(world.radian * self.angle) 
			ctx.lineTo(self.x + (100 * xline),self.y + (100 * yline));
			ctx.stroke();
			ctx.closePath();
			ctx.strokeStyle = '#000000'

		}
		world.bodies[randomID] = self;

	}
	world.start = function(){
		world.createTestBall();
	}

	world.clearCanvas = function(){
		world.bodies = {};
	}
	
	world.correct = function(){
		console.log('Correct')
		document.getElementById("questionAnswer").textContent = "Correct";
		document.getElementById("questionAnswer").style.display = "block";
		document.getElementById("test").style.display = "none"
		document.getElementById("nextQuestion").style.display = "block"
		currentUser.score+=1;
	}

	world.incorrect = function(){
		document.getElementById("questionAnswer").textContent = "Incorrect";
		document.getElementById("questionAnswer").style.display = "block";
		console.log('Wrong')
		document.getElementById("test").style.display = "none"
		document.getElementById("nextQuestion").style.display = "block"
		document.getElementById("solutions").style.display = "block"
	}
	//input for what the i and j components will equal then if correct run the
	//simulation green trail behind the circle and u get a point.
	world.testAnswers = function(){
		for (var key in world.bodies)
			world.answersVA(world.bodies[key])
	}


	world.answersVA = function(entity){   //answers given velocity and angle
		var vx = Number(vars.elements[0].value).toFixed(1);
		var vy = Number(vars.elements[1].value).toFixed(1);
		if (vx == entity.vx.toFixed(1) && vy == -entity.vy.toFixed(1)){
			world.correct();
			//When test me clicked in gives a tick, then you click a next button to go next

		}else{
			world.incorrect();
		}

	}

	var vars = document.getElementById("vars");

	world.start();

	for (var key in world.bodies)
		world.bodies[key].displayVars();

	world.angleX = function(entity){
		var xangle = 0;

		if (entity.angle <=90)
			var xangle = entity.angle

		if (entity.angle > 90 && entity.angle <= 180)
			var xangle = 180 - entity.angle

		if (entity.angle > 180 && entity.angle <= 270)
			var xangle = entity.angle - 180

		if (entity.angle > 270 && entity.angle <= 360)
			var xangle = 360 - entity.angle
		
		return xangle

	}

	world.angleY = function(entity){
		var yangle = 0;

		if (entity.angle <=90)
			var yangle = 90 - entity.angle

		if (entity.angle > 90 && entity.angle <= 180)
			var yangle = entity.angle - 90

		if (entity.angle > 180 && entity.angle <= 270)
			var yangle = 180 - entity.angle

		if (entity.angle > 270 && entity.angle <= 360)
			var yangle = entity.angle - 270
		
		return yangle

	}

	world.signOfVx = function(entity){

		var sign = "positive"
		if (entity.vx < 0)
			sign = "negative";	
		return sign
	}

	world.signOfVy = function(entity){

		var sign = "positive"
		if (entity.vy < 0)
			sign = "negative";	
		return sign
	}

	world.solutions = function(entity){
		text = "Velocity X: "+entity.speed+" * cos("+world.angleX(entity)+ "). Taking right as positive, the diagram shows this angle is horizontally "+world.signOfVx(entity)+".<br> So Velocity X = " +entity.vx.toFixed(1)+". <br>"
		text1 = "Velocity Y: "+entity.speed+" * cos("+world.angleY(entity)+ "). Taking upwards as positive, the diagram shows this angle is vertically "+world.signOfVy(entity)+".<br> So Velocity Y = " + -entity.vy.toFixed(1)+". <br>"


		document.getElementById("solutions").innerHTML = text+text1;
	}
	
	for (var key in world.bodies)
		world.solutions(world.bodies[key]);

}

