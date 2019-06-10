<?php
$dir = $_POST["dir"];

$files = scandir($dir);
$list = implode(",", $files);
echo($list)

?>