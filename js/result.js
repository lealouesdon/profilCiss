var equiH = "../src/H_RVal.txt";
var equiF = "../src/F_RVal.txt";



const urlParams = new URLSearchParams(window.location.search);
var sexe = urlParams.get('s'); //1=Femme 2=Homme

var tache = urlParams.get('t');;
var emotion = urlParams.get('em');;
var evitement = urlParams.get('ev');;
var distruction = urlParams.get('dis');;
var diversion = urlParams.get('div');;

valuesGraph();

/*values for graph*/
var equi = []; //equivalence score graph
function valuesGraph() {
  //initEqui();
  /*if(sexe==1){

  }else{

  }*/
  console.log("passe 2");
  

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
