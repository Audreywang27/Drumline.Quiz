let currentQuestion = 0; 
let answers = []; //makes an array that stores the answers the quiz taker selects



function startQuiz(){
  document.getElementById("start-screen").style.display = "none"; //hides the start screen
  document.getElementById("quiz-container").style.display = "flex";
  document.body.style.overflow = "hidden";
  showQuestion(currentQuestion); //basically will show the question the user is on 
}

function showQuestion(index){
  document.querySelectorAll(".question").forEach(q => q.style.display = "none"); 
  document.getElementById("q" + (index+1)).style.display = "block"; 
}

function prevQuestion(currentId, prevId){ //Previous question thing...like goes back and stuff
  document.getElementById(currentId).style.display = "none";
  document.getElementById(prevId).style.display = "block"; 
  if(answers.length>0){
    answers.pop();
  }
  currentQuestion -= 1; 

  //showQuestion(currentQuestion);
}      

function nextQuestion(currentId, nextId){

  let selected = document.querySelector(`input[name = "${currentId}"]:checked`);

  if(!selected){
    showPopup("Please choose an answer!");
    return; 
  }
  answers.push(parseInt(selected.value));

  document.getElementById(currentId).style.display = "none";

  if(nextId == "showResults"){
    showResults(currentId); 
  }else{
    document.getElementById(nextId).style.display = "block";
  }
  currentQuestion+=1; 
}
//Results confetti
/* Confetti Class, imported from Library*/
const jsConfetti = new JSConfetti();

//Show the results
function showResults(prevQuestion){
  document.getElementById(prevQuestion).classList.add("hidden");
  document.getElementById("quiz-container").style.display = "none";

  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("loading").style.display = "flex";

  setTimeout(() =>{
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("loading").style.display = "none";

    results(); 
    resultPercentages(); 
  },4000);
}

//the loading before the results
function load(){
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById('loading').style.display = "block";
  setTimeout(()=>{
    //document.getElementById('loading').style.display
  },1000);
  results(); 
}

//The results
function results(){
  let snare = 0, bass = 0, cymbals = 0, tenor = 0; 
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
    winners.push("Cymbals");
  }

  if(highest == tenor){
    winners.push("Tenor");
  }

  let resultText = "";
  if(winners.length == 1){
    jsConfetti.addConfetti();
    resultText = "Congrats! You're a " + winners[0] + "!";
  }else{
    jsConfetti.addConfetti();
    resultText = "Congrats! You're a mix of " + winners.join(" and ") + "!";
  }


  const resultDiv = document.getElementById("showResults");
  resultDiv.classList.remove("hidden");
  resultDiv.style.display = "flex";
  resultDiv.innerText = resultText; 

  return{
    snare, bass, cymbals, tenor
  }
  
}

function resultPercentages(){
  const{snare, bass, cymbals, tenor} = results(); 

  let total = snare + bass + cymbals + tenor; 

  let snarePercent = ((snare/total)*100).toFixed(2);
  let bassPercent = ((bass/total) * 100).toFixed(2);
  let cymbalsPercent = ((cymbals/total) * 100).toFixed(2);
  let tenorPercent = ((tenor/total) * 100).toFixed(2);

  let percentResults = "\n\nYou are " + snarePercent + "% snare. \nYou are " + bassPercent + "% bass. \nYou are " + cymbalsPercent + "% cymbals. \nYou are " + tenorPercent + "% tenors."

  /*Make it print out into the HTML when the user presses a button....add a pi chart if i have time? */
  const percentPrint = document.getElementById("showResults");
  percentPrint.innerText += percentResults;

}
 



//Popup stuff

function showPopup(message){
  const popup = document.getElementById("popup");
  document.getElementById("popup-message").innerText = message; 
  popup.classList.remove("hidden");
  popup.style.display = "flex";
}

function hidePopup(){
  const popup = document.getElementById("popup");
  popup.classList.add("hidden");
  popup.style.display = "none";
}
