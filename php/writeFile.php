<?php
$file = $_POST["file"];
$data = $_POST["data"];

$myfile = fopen($file, "w") or die("Unable to open file!");

fwrite($myfile, $data);

fclose($myfile);

?>