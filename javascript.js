//functions


var playing;
var score;
var action;
var timeRemaining;
var correctAnswer;
var correctPosition;
var wrongAnswer;

//if we click on the start/reset
document.getElementById("startReset").onclick =
function(){

   //if we are playing
   if(playing == true){
     location.reload();

   }else{ //if we are not playing
       playing = true;
       score = 0;
       document.getElementById("scoreValue").innerHTML = score;

       //show countdown box
       show("timeRemaining");
         timeRemaining = 60;

       //hide game over box
       hide("gameOver");
         
       //change button to reset
       document.getElementById("startReset").innerHTML = "Reset Game";

       //start countdown
       startCountdown();

       //generate a new Q&A
       generateQA();
   }

}

//clicking on an anwer box
for(i=1; i<5; i++){
    document.getElementById("box" + i).onclick =
function(){
    //check if we are playing
    if(playing == true){ //yes
        if(this.innerHTML == correctAnswer){
            score++;
            document.getElementById("scoreValue").innerHTML = score;

            //hide wrong box and show correct box
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");
            }, 1000)

          //generate new Q&A
          generateQA();

        }else{
            //wrong answer
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");
            }, 1000)
        }

    }

}
}

//start counter
function startCountdown(){
    action = setInterval(function(){
      timeRemaining -= 1;
      document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
        if(timeRemaining == 0){ //game over
            stopCountdown();
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>Game Over!</p><p>Your score is " + score + ".</p>";
            hide("timeRemaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startReset").innerHTML = "Start Game";
        }
    }, 1000)
}

//stop counter
function stopCountdown(){
    clearInterval(action);
}

//hide an element
function hide(Id){
    document.getElementById(Id).style.display = "none";
}

//show an element
function show(Id){
    document.getElementById(Id).style.display = "block";
}

//generate a question and multiple answers
function generateQA(){
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;

    //fill one box with the correct answer
    var correctPosition = 1 + Math.round(3*Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;

    //fill other boxes with wrong answers
    var answers = [correctAnswer];
    for(i=1; i<5; i++){
        if(i !== correctPosition){
            var wrongAnswer;
            do{
              wrongAnswer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random())); //A wrong answer
            }while(answers.indexOf(wrongAnswer)>-1);    
        
            document.getElementById("box" + i).innerHTML = wrongAnswer;
              answers.push(wrongAnswer);
        }
        }     
    }

 
   
    // if we click on answer box
       //if we are playing
        // correct?
        // yes
        //   increase score by 1
        //   show correct box for one Second 
        //   generate new questions and answers
        // No 
        //   show try again box for 1sec
