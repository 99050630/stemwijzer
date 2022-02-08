//Declerations;
var questionCount = 0;
//Declerations: screens
var startScreen = document.getElementById("startScreen");
var questionScreen = document.getElementById("questionScreen");
var resultScreen = document.getElementById("resultScreen");
//Declerations: buttons
var startBtn = document.getElementById("start_btn");
var eensBtn = document.getElementById("eens_btn");
var neutraalBtn = document.getElementById("neutraal_btn");
var oneensBtn = document.getElementById("oneens_btn");
var skipBtn = document.getElementById("skip");
var reverseBtn = document.getElementById("reverse_btn");
var bigParties = document.getElementById("bigParties");
var smallParties = document.getElementById("smallParties");
var bigParties = document.getElementById("bigParties");
var seculaireParties = document.getElementById("seculaireParties");
//Declerations: vragen pagina
var title = document.getElementById("title");
var statement = document.getElementById("statement");
var vragenPartijen = document.getElementById("vragen_partijen");
var partieNameContainer = document.getElementById("partie_name_container");
var partieStatementContainer = document.getElementById("partie_statement_container");
//Declerations: result pagina
var titleResult = document.getElementById("title_result");
var statementResult = document.getElementById("statement_result");
var sizeResult = document.getElementById("partij_size_result");

var matchCounter = [];
var matchCounterCounter = 0;

const sizeDiff = 10;

//Event listeners;
startBtn.addEventListener("click", loadQuestions);
eensBtn.addEventListener("click", setMatch);
neutraalBtn.addEventListener("click", setMatch);
oneensBtn.addEventListener("click", setMatch);
skipBtn.addEventListener("click", setMatch);
reverseBtn.addEventListener("click", reverseQuestion);
bigParties.addEventListener("click", loadResult);
smallParties.addEventListener("click", loadResult);
seculaireParties.addEventListener("click", loadResult);
allParties.addEventListener("click", loadResult);

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

function setResultCounter(type){
    var partij = [];
    var return_arr = [];
    return_arr[0] = [];
    return_arr[1] = [];
    var gekozenPartij = [];
    var oldBestResult = [];
    var partijIndex = 0;
    for(var i = 0; i < parties.length; i++){
        if(type == "big"){
            if(parties[i].size > sizeDiff){
                partij[partijIndex] = {
                    partijNaam: parties[i].name,
                    partijCounter: 0
                };
                partijIndex++;
            }
        }else if(type == "small"){
            if(parties[i].size < sizeDiff){
                partij[partijIndex] = {
                    partijNaam: parties[i].name,
                    partijCounter: 0
                };
                partijIndex++;
            }
        }else if(type == "seculaire"){
            if(parties[i].secular == true){
                partij[partijIndex] = {
                    partijNaam: parties[i].name,
                    partijCounter: 0
                };
                partijIndex++;
            }
        }else{
            partij[partijIndex] = {
                partijNaam: parties[i].name,
                partijCounter: 0
            };
            partijIndex++;
        }
    }

    for(var i = 0; i < subjects.length; i++){
        for(var j = 0; j < partij.length; j++){
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

    for(var i = 0; i < oldBestResult.length; i++){
        return_arr[0][i] = gekozenPartij[i];
        return_arr[1][i] = oldBestResult[i];
    }
    return return_arr;
}

function loadQuestionInfo(id){
    var showID = id;
    var allOpinion = document.querySelectorAll('.partie_question_container');
    for(var i = 0; i < allOpinion.length; i++){
        allOpinion[i].style.display = "none";
    }
    document.getElementById(showID+"_statement").style.display = "flex";
}

function setPartiesArgument(){
    partieStatementContainer.innerHTML = "";
    partieNameContainer.innerHTML = "";
    for(let i = 0; i < subjects[questionCount].parties.length; i++){
        var partijName = subjects[questionCount].parties[i].name.replace(" ", "_");
        partieStatementContainer.innerHTML += "<div class='partie_question_container' id='"+partijName+"_statement'>"+subjects[questionCount].parties[i].opinion+"</div>";
        partieNameContainer.innerHTML += "<div class='partie_name' onclick=\"loadQuestionInfo('"+partijName+"');\" id='"+partijName+"'>"+subjects[questionCount].parties[i].name+"</div>";
        // (function(index){
        //     document.getElementById(subjects[questionCount].parties[index].name).addEventListener("click", loadQuestionInfo);
        // })(i)
    }
}

function getQuestion(){
    var question = [];
    var questionCheck = subjects.length;
    if(questionCheck != questionCount){
        question['title'] = subjects[questionCount].title;
        question['statement'] = subjects[questionCount].statement;
        setPartiesArgument();
        questionCount++;
    }else{
        question['title'] = "";
        question['statement'] = ""
    }
    return question;
}

function getReverseQuestion(){
    if(questionCount == 0){
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
}

function loadResult(){
    titleResult.innerHTML = "";
    statementResult.innerHTML = "";
    sizeResult.innerHTML = "";
    var btnID = this.id;
    var typeLoad;
    if(btnID == "bigParties"){
        typeLoad = "big";
    }else if(btnID == "smallParties"){
        typeLoad = "small";
    }else if(btnID == "seculaireParties"){
        typeLoad = "seculaire";
    }else{
        typeLoad = "all";
    }
    var result = setResultCounter(typeLoad);
    questionScreen.style.display = "none";
    resultScreen.style.display = "flex";
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
    if(questionCount == 0){
        startScreen.style.display = "none";
        questionScreen.style.display = "flex";
        var reverseQuestion = getReverseQuestion();
        if(reverseQuestion['title'] != "" && reverseQuestion['statement'] != ""){
            title.innerHTML = reverseQuestion['title'];
            statement.innerHTML = reverseQuestion['statement'];
            resetButtons();
            oldAnswerCheck();
        }else{
            loadResult();
        }
    }
}


