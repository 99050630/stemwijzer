//Declerations;
var questionCount = 0;
var startBtn = document.getElementById("start_btn");
var startScreen = document.getElementById("startScreen");
var questionScreen = document.getElementById("questionScreen");
var resultScreen = document.getElementById("resultScreen");

var eensBtn = document.getElementById("eens_btn");
var neutraalBtn = document.getElementById("neutraal_btn");
var oneensBtn = document.getElementById("oneens_btn");
var skipBtn = document.getElementById("skip");
var reverseBtn = document.getElementById("reverse_btn");

var title = document.getElementById("title");
var statement = document.getElementById("statement");

var titleResult = document.getElementById("title_result");
var statementResult = document.getElementById("statement_result");
var sizeResult = document.getElementById("partij_size_result");

var matchCounter = [];
var matchCounterCounter = 0;

//Event listeners;
startBtn.addEventListener("click", loadQuestions);
eensBtn.addEventListener("click", setMatch);
neutraalBtn.addEventListener("click", setMatch);
oneensBtn.addEventListener("click", setMatch);
skipBtn.addEventListener("click", setMatch);
reverseBtn.addEventListener("click", reverseQuestion);

//Functions
function setMatch(){
    var type = this.id;
    if(type == "eens_btn"){
        matchCounter[matchCounterCounter] = 'pro';
    }else if(type == "oneens_btn"){
        matchCounter[matchCounterCounter] = 'contra';
    }else{
        matchCounter[matchCounterCounter] = '';
    }
    matchCounterCounter++;
    loadQuestions();
}

function setResultCounter(){
    var partij = [];
    var return_arr = [];
    return_arr[0] = [];
    return_arr[1] = [];
    var gekozenPartij = [];
    var oldBestResult = [];
    for(var i = 0; i < parties.length; i++){
        partij[i] = {
            partijNaam: parties[i].name,
            partijCounter: 0
        };
    }

    for(var i = 0; i < subjects.length; i++){
        for(var j = 0; j < subjects[i].parties.length; j++){
            if(subjects[i].parties[j].position == matchCounter[i]){
                partij[j].partijCounter++;
            }
        }
    }
    for(var i = 0; i < partij.length; i++){
        if(i == 0){
            gekozenPartij[i] = partij[i].partijNaam;
            oldBestResult[i] = partij[i].partijCounter;
        }else{
            if(oldBestResult[i] < partij[i].partijCounter){
                oldBestResult = [];
                gekozenPartij = [];
                oldBestResult[0] = partij[i].partijCounter;
                gekozenPartij[0] = partij[i].partijNaam;
            }else if(oldBestResult[0] == partij[i].partijCounter){
                oldBestResult.push(partij[i].partijCounter);
                gekozenPartij.push(partij[i].partijNaam);
            }
        }
    }
    // console.log(partij);
    console.log(gekozenPartij);
    console.log(oldBestResult);
    
    console.log("in voor loop");
    console.log(oldBestResult.length);
    for(var i = 0; i < oldBestResult.length; i++){
        console.log("in voor loop");
        return_arr[0][i] = gekozenPartij[i];
        return_arr[1][i] = oldBestResult[i];
        console.log(return_arr[0] + "return_arr[0]");
        console.log(return_arr[1] + "return_arr[0]");
    }
    return return_arr;
}

function getQuestion(){
    var question = [];
    var questionCheck = subjects.length;
    if(questionCheck != questionCount){
        question['title'] = subjects[questionCount].title;
        question['statement'] = subjects[questionCount].statement;
        questionCount++;
    }else{
        question['title'] = "";
        question['statement'] = ""
    }
    return question;
}

function getReverseQuestion(){
    var question = [];
    var questionCheck = subjects.length;
    questionCount--;
    questionCount--;
    matchCounterCounter--;
    if(questionCheck != questionCount){
        question['title'] = subjects[questionCount].title;
        question['statement'] = subjects[questionCount].statement;
        questionCount++;
    }else{
        question['title'] = "";
        question['statement'] = ""
    }
    // questionCount++;
    return question;
}

function loadResult(){
    var result = setResultCounter();
    questionScreen.style.display = "none";
    resultScreen.style.display = "flex";
    console.log(result);
    console.log("result");
    for(var j = 0; j < result[0].length; j++){
        for(var i = 0; i < parties.length; i++){
            if(parties[i].name == result[0][j]){
                titleResult.innerHTML += " " + result[0][j] + " " + result[1][j] + "  |  ";
                statementResult.innerHTML += parties[i].long + "  |  ";
                sizeResult.innerHTML += parties[i].size + "  |  ";
            }
        }
    }
}

function oldAnswerCheck(){
    console.log(matchCounter);
    console.log(matchCounterCounter);
    // matchCounterCounter--;
    if(matchCounter[matchCounterCounter] != ""){
        if(matchCounter[matchCounterCounter] == "pro"){
            eensBtn.style.backgroundColor = "#010e66";
        }else if(matchCounter[matchCounterCounter] == "contra"){
            oneensBtn.style.backgroundColor = "#010e66";
        }
    }
}
function resetButtons(){
    eensBtn.style.backgroundColor = "var(--blue)";
    oneensBtn.style.backgroundColor = "var(--blue)";
    neutraalBtn.style.backgroundColor = "var(--blue)";
}

function loadQuestions(){
    startScreen.style.display = "none";
    questionScreen.style.display = "flex";
    var question = getQuestion();
    console.log(question);
    if(question['title'] != "" && question['statement'] != ""){
        title.innerHTML = question['title'];
        statement.innerHTML = question['statement'];
        resetButtons();
        oldAnswerCheck();
    }else{
        loadResult();
    }
}

function reverseQuestion(){
    startScreen.style.display = "none";
    questionScreen.style.display = "flex";
    var reverseQuestion = getReverseQuestion();
    console.log(reverseQuestion);
    if(reverseQuestion['title'] != "" && reverseQuestion['statement'] != ""){
        title.innerHTML = reverseQuestion['title'];
        statement.innerHTML = reverseQuestion['statement'];
        resetButtons();
        oldAnswerCheck();
    }else{
        loadResult();
    }
}


