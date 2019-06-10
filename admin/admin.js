$(document).ready(function() {
  getFiles();
});

function getFiles() {
  $.post("../php/scanDirectory.php", { dir: "../sauvegarde" }, function(
    result
  ) {
    var list = result.split(",");
    createLinks(list);
  });
}

function createLinks(list) {
  for (let index = 2; index < list.length; index++) {
    var node = document.createElement("LI"); // Create a <li> node
    node.setAttribute("onclick", "listClick(" + index + ")");
    node.setAttribute("id", index);
    var textnode = document.createTextNode(list[index]); // Create a text node
    node.appendChild(textnode); // Append the text to <li>
    document.getElementById("list").appendChild(node); // Append <li> to <ul> with id="myList"
  }
}

function listClick(id) {
  console.log(document.getElementById(id).innerHTML);
  fileName = document.getElementById(id).innerHTML;
  window.location = "../php/downloadFile.php?file=" + fileName;
}
