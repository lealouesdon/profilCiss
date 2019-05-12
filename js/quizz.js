var listQ = [];
var reps = [];
var index = 0;
var selected = false;
var reponse=0;
var sourceQuestions = "../src/Questions.txt";
var sourceCalcTemp = "../src/QRef.txt";

const urlParams = new URLSearchParams(window.location.search);
var sexe = urlParams.get('s'); //1=Femme 2=Homme


$(document).ready(function(){
  initQuestions();
  $("#next").hide();
  $("#last").hide();
  $(".overlay").hide();
});

//Questions
function initQuestions() {
  $.post('../php/readFile.php', { file: sourceQuestions}, function(result) {
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
    $("#currentQuestion.text").html(listQ[index]);
  }
  if(index+1<listQ.length){
    $("#nextQuestion.text").html(listQ[index+1]);
  }
}

//btns
function next() {
  if(index+1==reps.length){
    $("#next").hide();
  }
  $("#last").show();
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
    if (index==1) {
      $("#last").hide();
    }
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

  if(index+1==reps.length){
    $("#next").hide();
  }
  if(index >= 0){
    $("#last").show();
  }
  sauv(val);
  getRep();

  nbBottom();
  showQ();
  selected=true;
  select();
}

function sauv(val) {
  if(reps.length-1>=index){
    reps[index]=val;
  }else{
    reps.push(val);
  }
  if(index+1 == listQ.length){
    calcScore();
  }else{
    index++;
  }

}

function getRep() {
  reponse = reps[index];
}

function select() {
  console.log(reponse);
  
  $("#rep1").removeClass("selected");
  $("#rep2").removeClass("selected");
  $("#rep3").removeClass("selected");
  $("#rep4").removeClass("selected");
  $("#rep5").removeClass("selected");


  if(reponse==1){
    $("#rep1").addClass("selected");
  }else if(reponse==2){
    $("#rep2").addClass("selected");

  }else if(reponse==3){
    $("#rep3").addClass("selected");

  }else if(reponse==4){
    $("#rep4").addClass("selected");

  }else if(reponse==5){
    $("#rep5").addClass("selected");
  }
}

//end
var tache = 0;
var emotion = 0;
var evitement = 0;
var distruction = 0;
var diversion = 0;

var calcTemp = [];

function calcScore() {
  tache = 0;
  emotion = 0;
  evitement = 0;
  distruction = 0;
  diversion = 0;
  initCalcTemp();
}

function initCalcTemp() {
  $.post('../php/readFile.php', { file: sourceCalcTemp}, function(result) {
      var res = result.split("\n");
      readCalcTemps(res);
  });
}

function readCalcTemps(res) {
  var i;
  var arrayOfStrings;
  var temp = [];
  for (i = 0; i < res.length; i++) {
      arrayOfStrings = res[i].split(";");
      temp = [];
      temp.push(arrayOfStrings[1]);
      temp.push(arrayOfStrings[2]);
      temp.push(arrayOfStrings[3]);
      temp.push(arrayOfStrings[4]);
      temp.push(arrayOfStrings[5]);
      calcTemp.push(temp);
  }
  calc();
}

function calc() {
  var i;
  var rep;
  var temp;
  for(i=0;i<reps.length;i++){
    rep = reps[i];
    temp = calcTemp[i];
    //console.log(temp);
    tache += rep * temp[0];
    emotion += rep * temp[1];
    evitement += rep * temp[2];
    distruction += rep * temp[3];
    diversion += rep * temp[4];
  }

  console.log(tache);
  console.log(emotion);
  console.log(evitement);
  console.log(distruction);
  console.log(diversion);
  //valuesGraph();
  //open other html page
  load_page();
  //$(".overlay").show();
}

function load_page(){
    var myWindow = window.open("../html/result.html?s="+sexe+"&t="+tache+"&em="+emotion+"&ev="+evitement+"&dis="+distruction+"&div="+diversion, "_self");     
};





