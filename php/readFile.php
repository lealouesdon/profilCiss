<?php
$file = $_POST["file"];
$file_content = file_get_contents($file);
echo $file_content;
?>
