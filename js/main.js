var listQ = [];
var reps = [];
var index = 0;
var selected = false;
var reponse=0;

$(document).ready(function(){
  initQuestions();
  $("#next").hide();
  $("#last").hide();
});

//Questions
function initQuestions() {
  var txtFile = "../src/Questions.txt";
  $.post('php/readFile.php', { file: txtFile}, function(result) {
      var res = result.split("\n");
      readQuestions(res);
  });
}

function readQuestions(res) {
  var i;
  var arrayOfStrings;
  for (i = 0; i < res.length; i++) {
      arrayOfStrings = res[i].split(";");
      listQ.push(arrayOfStrings[1]);
  }
  showQ();
  nbBottom();
}

function showQ() {
  if(index<listQ.length){
    $("#text").html(listQ[index]);
  }
}

//btns
function next() {
  if(index+1==reps.length){
    $("#next").hide();
  }
  if(reponse!=null){
    sauv(reponse);
    getRep();
    select();
    nbBottom();
    showQ();
    selected = false;
  }else{
    alert("Saisir une réponse");
  }
}

function last() {
  if(index > 0){
    index--;
    $("#next").show();
    getRep();
    select();
    nbBottom();
    showQ();
  }else{
    $("#last").hide();
  }
}

function nbBottom() {
  var str = "";
  str = str.concat(index+1,"/",listQ.length);
  $("#page").html(str);
}

//Reponses
function rep(val) {
  //reponse = val;
  select();
  if(index+1==reps.length){
    $("#next").hide();
  }
  if(index >= 0){
    $("#last").show();
  }
  sauv(val);
  getRep();
  select();
  nbBottom();
  showQ();
  console.log("passe");
  selected=true;
}

function sauv(val) {
  if(reps.length-1>=index){
    reps[index]=val;
  }else{
    reps.push(val);
  }
  index++;
}

function getRep() {
  reponse = reps[index];
  console.log(reponse);
}

function select() {
  if(reponse==1){
    $("#rep1").css("font-size", "8vh");
    $("#rep2").css("font-size", "5vh");
    $("#rep3").css("font-size", "5vh");
    $("#rep4").css("font-size", "5vh");
    $("#rep5").css("font-size", "5vh");
  }else if(reponse==2){
    $("#rep1").css("font-size", "5vh");
    $("#rep2").css("font-size", "8vh");
    $("#rep3").css("font-size", "5vh");
    $("#rep4").css("font-size", "5vh");
    $("#rep5").css("font-size", "5vh");
  }else if(reponse==3){
    $("#rep1").css("font-size", "5vh");
    $("#rep2").css("font-size", "5vh");
    $("#rep3").css("font-size", "8vh");
    $("#rep4").css("font-size", "5vh");
    $("#rep5").css("font-size", "5vh");
  }else if(reponse==4){
    $("#rep1").css("font-size", "5vh");
    $("#rep2").css("font-size", "5vh");
    $("#rep3").css("font-size", "5vh");
    $("#rep4").css("font-size", "8vh");
    $("#rep5").css("font-size", "5vh");
  }else if(reponse==5){
    $("#rep1").css("font-size", "5vh");
    $("#rep2").css("font-size", "5vh");
    $("#rep3").css("font-size", "5vh");
    $("#rep4").css("font-size", "5vh");
    $("#rep5").css("font-size", "8vh");
  }else{
    $("#rep1").css("font-size", "5vh");
    $("#rep2").css("font-size", "5vh");
    $("#rep3").css("font-size", "5vh");
    $("#rep4").css("font-size", "5vh");
    $("#rep5").css("font-size", "5vh");
  }
}
