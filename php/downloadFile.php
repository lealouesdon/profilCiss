<?php
/**
 * download.php
 */

if (!empty($_GET['file'])) {
    // Security, down allow to pass ANY PATH in your server
    $fileName = basename($_GET['file']);
} else {
    return;
}

$filePath = '../sauvegarde/' . $fileName;
if (!file_exists($filePath)) {
    return;
}

header("Cache-Control: public");
header("Content-Description: File Transfer");
header("Content-Disposition: attachment; filename=".$filePath."");
header("Content-Transfer-Encoding: binary");
header("Content-Type: binary/octet-stream");
readfile($filePath);
?>
