<?php
$file = $_POST["file"];
$file_content = file_get_contents($file);
$your_array = explode("\n", $file_content);
echo $file_content;
?>
