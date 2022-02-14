//Declerations;
var questionCount = 0;
var extraCount = [];
//Declerations: screens
var startScreen = document.getElementById("startScreen");
var questionScreen = document.getElementById("questionScreen");
var resultScreen = document.getElementById("resultScreen");
var extraScreen = document.getElementById("extraScreen");
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
//Declerations: Extra pagina
var extraBtn = document.getElementById("extra_btn");
var extraContent = document.getElementById("extra_content");
//Declerations: result pagina
var titleResult = document.getElementById("title_result");
var statementResult = document.getElementById("statement_result");
var sizeResult = document.getElementById("partij_size_result");
var resultaatPartijInfoContainer = document.getElementById("resultaat_partij_info_container");

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
extraBtn.addEventListener("click", loadResult);

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
    var partijIndex = 0;
    var return_arr = [];
    return_arr[0] = [];
    return_arr[1] = [];
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
    for(var q = 0; q < subjects.length; q++){
        for(var i = 0; i < subjects[q].parties.length; i++){
            if(subjects[q].parties[i].position == matchCounter[q]){
                for(var p = 0; p < partij.length; p++){
                    if(partij[p].partijNaam == subjects[q].parties[i].name){
                        partij[p].partijCounter++;
                        for(var e = 0; e < extraCount.length; e++){
                            if(extraCount[e].questionNumber == q){
                                if(extraCount[e].value == "checked"){
                                    partij[p].partijCounter++;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    var gekozenPartij = [];
    var gekozenPartijStandpunten = [];
    var oldBestResult = 0;
    for(var i = 0; i < partij.length; i++){
        if(oldBestResult <= partij[i].partijCounter){
            // if(oldBestResult < partij[i].partijCounter){
            //     gekozenPartij = [];
            //     gekozenPartijStandpunten = [];
            // }
            oldBestResult = partij[i].partijCounter;
            gekozenPartijStandpunten.push(partij[i].partijCounter);
            gekozenPartij.push(partij[i].partijNaam);
        }
    }
    return_arr[0] = gekozenPartij;
    return_arr[1] = gekozenPartijStandpunten;
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
    if(questionCount != 0){
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

function setExtraResultArr(){
    var checkBoxes = document.querySelectorAll("input[type=checkbox]");
    for(var i = 0; i < checkBoxes.length; i++){
        if(checkBoxes[i].checked){
            extraCount[i] = {
                questionNumber: i,
                value: "checked"
            }
        }else{
            extraCount[i] = {
                questionNumber: i,
                value: ""
            }
        }
    }
}

function loadResult(){
    setExtraResultArr();
    extraScreen.style.display = "none";
    resultaatPartijInfoContainer.innerHTML = "";
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
                resultaatPartijInfoContainer.innerHTML += "<div class='partij_info_result'>" +
                                                        "<div id=\"title_result\" class=\"title_result\">"+result[0][j]+": "+parties[i].long+"</div>" +
                                                        "<div id=\"statement_result\" class=\"statement_result\">Standpunten het zelfde: "+result[1][j]+"</div>" +
                                                        "<div id=\"partij_size_result\" class=\"partij_size_result\">Zetels in tweede kamer: "+parties[i].size+"</div>" + 
                                                    "</div>";
            }
        }
    }
}

function loadExtra(){
    questionScreen.style.display = "none";
    // resultaatPartijInfoContainer.innerHTML = "";
    for(var i = 0; i < subjects.length; i++){
        extraContent.innerHTML += "<div class='extra_inner'>" +
                                  " <input type='checkbox' id='extra_"+i+"'>" + 
                                  " <p>"+subjects[i].title+"</p>" + 
                                  "</div>";
    }
    extraScreen.style.display = "flex";
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
        loadExtra();
        // loadResult();
    }
}

function reverseQuestion(){
    if(questionCount != 0){
        startScreen.style.display = "none";
        questionScreen.style.display = "flex";
        var reverseQuestion = getReverseQuestion();
        if(reverseQuestion['title'] != "" && reverseQuestion['statement'] != ""){
            title.innerHTML = reverseQuestion['title'];
            statement.innerHTML = reverseQuestion['statement'];
            resetButtons();
            oldAnswerCheck();
        }else{
            loadExtra();
            // loadResult();
        }
    }
}


