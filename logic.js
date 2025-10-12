let currentQuestion = 0; 
let answers = []; //makes an array that stores the answers the quiz taker selects

function startQuiz(){
  document.getElementById("start-screen").style.display = "none"; //hides the start screen
  showQuestion(currentQuestion); //basically will show the question the user is on 
}

function showQuestion(index){
  document.querySelectorAll(".question").forEach(q => 
    q.style.display = "none"); //Ts isn't hiding what it's suppposed to hide.....
  document.getElementById("q" + (index+1)).style.display = "block"; 
  
}
      
function prevQuestion(currentId, prevId){ //Previous question thing...like goes back and stuff
  document.getElementById(currentId).style.display = "none";
  document.getElementById(prevId).style.display = "block"; 
  if(answers.length>0){
    answers.pop();
  }
  currentQuestion -= 1; 

  showQuestion(currentQuestion);
}      

function nextQuestion(currentId, nextId){

  let selected = document.querySelector(`input[name = "${currentId}"]:checked`);

  if(!selected){
    alert("Please choose an answer!");
    return; 
  }
  answers.push(parseInt(selected.value));

  showQuestion(currentQuestion);
  //console.log(answers);
  
  //document.getElementById(currentId).style.display = "none";

  if(nextId == "results"){
    results(); 
    document.getElementById("results").style.display = "block";
  }else{
    document.getElementById(nextId).style.display = "block";
  }
  currentQuestion+=1; 
}

function results(){
  let snare = 0; 
  let bass = 0;
  let cymbals = 0;
  let tenor = 0; 

  for(let i = 0; i < answers.length; i++){
    if(answers[i] == 1){
      snare += 1; 
    }else if(answers[i]==2){
      cymbals+=1;
    }else if(answers[i]==3){
      tenor+=1;
    }else{
      bass+=1;
    }
  }

  let highest = Math.max(snare,bass,cymbals,tenor);

  let winners = []; 

  if(highest==snare){
    winners.push("Snare");
  }

  if(highest == bass){
    winners.push("Bass");
  }

  if(highest == cymbals){
    winners.push("Cymabls");
  }

  if(highest == tenor){
    winners.push("Tenor");
  }

  let resultText = "";
  if(winners.length == 1){
    resultText = "Congrats - you're a " + winners[0] + "!";
  }else{
    resultText = "You're a mix of " + winners.join(" and ");
  }


  const resultDiv = document.getElementById("results");
  resultDiv.classList.remove("hidden");
  resultDiv.style.display = "block";
  resultDiv.innerText = resultText; 
  
}