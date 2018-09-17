var listQ = [];

$(document).ready(function(){
  initQuestions();
});

function initQuestions() {
  var txtFile = "../src/Questions.txt";
  $.post('php/readFile.php', { file: txtFile}, function(result) {
     alert(result);
  });
}
