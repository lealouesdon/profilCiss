var sexe; //1=Femme 2=Homme

//intro
function selectSexe(val) {
  sexe = val;
  let urlParams = new URLSearchParams(window.location.search);
  window.open('url' + urlParams);
}

//Questions
function initQuestions() {
  $.post('php/readFile.php', { file: sourceQuestions}, function(result) {
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
  //reponse = val;
  //select();
  //click(val);

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
  if(reponse==1){
    /*$("#rep1").css("font-size", "8vh");
    $("#rep2").css("font-size", "5vh");
    $("#rep3").css("font-size", "5vh");
    $("#rep4").css("font-size", "5vh");
    $("#rep5").css("font-size", "5vh");*/
    $("#rep1").css("width", "100%");
    $("#rep2").css("width", "75%");
    $("#rep3").css("width", "75%");
    $("#rep4").css("width", "75%");
    $("#rep5").css("width", "75%");

  }else if(reponse==2){
    $("#rep1").css("width", "75%");
    $("#rep2").css("width", "100%");
    $("#rep3").css("width", "75%");
    $("#rep4").css("width", "75%");
    $("#rep5").css("width", "75%");
  }else if(reponse==3){
    $("#rep1").css("width", "75%");
    $("#rep2").css("width", "75%");
    $("#rep3").css("width", "100%");
    $("#rep4").css("width", "75%");
    $("#rep5").css("width", "75%");
  }else if(reponse==4){
    $("#rep1").css("width", "75%");
    $("#rep2").css("width", "75%");
    $("#rep3").css("width", "75%");
    $("#rep4").css("width", "100%");
    $("#rep5").css("width", "75%");
  }else if(reponse==5){
    $("#rep1").css("width", "75%");
    $("#rep2").css("width", "75%");
    $("#rep3").css("width", "75%");
    $("#rep4").css("width", "75%");
    $("#rep5").css("width", "100%");
  }else{
    $("#rep1").css("width", "75%");
    $("#rep2").css("width", "75%");
    $("#rep3").css("width", "75%");
    $("#rep4").css("width", "75%");
    $("#rep5").css("width", "75%");
  }
}

/*function click(val) {
  if(val==1){
    //$( "#rep1" ).slideUp( 300 ).delay( 800 ).fadeIn( 400 );
    //$( "#rep1" ).animate({zoom: '150%'}, "fast");
    //$( "#rep1" ).animate({zoom: '100%'}, "fast");
  }else if (val==2) {
    $( "#rep2" ).animate({zoom: '150%'}, "fast");
    $( "#rep2" ).animate({zoom: '100%'}, "fast");
  }else if (val==3) {
    $( "#rep3" ).animate({zoom: '150%'}, "fast");
    $( "#rep3" ).animate({zoom: '100%'}, "fast");
  }else if (val==4) {
    $( "#rep4" ).animate({zoom: '150%'}, "fast");
    $( "#rep4" ).animate({zoom: '100%'}, "fast");
  }else if (val==5) {
    $( "#rep5" ).animate({zoom: '150%'}, "fast");
    $( "#rep5" ).animate({zoom: '100%'}, "fast");
  }
}*/



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
  $.post('php/readFile.php', { file: sourceCalcTemp}, function(result) {
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
  valuesGraph();
  $(".overlay").show();
}

/*values for graph*/
var equi = []; //equivalence score graph
function valuesGraph() {
  //initEqui();
  /*if(sexe==1){

  }else{

  }*/

  $.post('php/readFile.php', { file: equiH}, function(result) {
      var res = result.split("\n");
      readEqui(res);
  });

}


function readEqui(res) {
  var i;
  var arrayOfStrings;
  for (i = 0; i < res.length; i++) {
      arrayOfStrings = res[i].split(";");
      equi.push(arrayOfStrings);
  }
  calcEqui();
}

function calcEqui() {
  var gTache = 0;
  var gEmotion = 0;
  var gEvitement = 0;
  var gDistruction = 0;
  var gDiversion = 0;


  var temp = [];
  for (i=0; i<equi.length; i++){
    temp = equi[i];
    if(temp[2]==tache){
      gTache = temp[1];
    }else if (temp[3]==emotion) {
      gEmotion = temp[1];
    }else if (temp[4]==evitement) {
      gEvitement = temp[1];
    }else if (temp[5]==distruction) {
      gDistruction = temp[1];
    }else if (temp[6]==diversion) {
      gDiversion = temp[1];
    }
  }

  console.log(gTache);
  console.log(gEmotion);
  console.log(gEvitement);
  console.log(gDistruction);
  console.log(gDiversion);
  setGraph(gTache,gEmotion,gEvitement,gDistruction,gDiversion);

}

/*graph*/
function setGraph(tache,emotion,evitement,distruction,diversion) {
  $("#pB1")
      .css("height", tache + "%")
      .attr("aria-valuenow", tache);
  $("#pB2")
      .css("height", emotion + "%")
      .attr("aria-valuenow", emotion);
  $("#pB3")
      .css("height", evitement + "%")
      .attr("aria-valuenow", evitement);
  $("#pB4")
      .css("height", distruction + "%")
      .attr("aria-valuenow", distruction);
  $("#pB5")
      .css("height", diversion + "%")
      .attr("aria-valuenow", diversion);

}
