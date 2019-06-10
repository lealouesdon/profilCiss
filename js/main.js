var sexe; //1=Femme 2=Homme

//intro
function selectSexe(val) {
  sexe = val;
  nom = document.getElementById("nom").value;
  prenom = document.getElementById("prenom").value;

  if (nom.length == 0 || prenom.length == 0) {
    alert("Saisir un nom et un prénom s'il vous plait");
  } else {
    load_page(sexe, nom, prenom);
  }
}

function load_page(sexe, nom, prenom) {
  var myWindow = window.open(
    "html/quizz.html?s=" + sexe + "&nom=" + nom + "&prenom=" + prenom,
    "_self"
  );
}
