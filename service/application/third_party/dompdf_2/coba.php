<?php
require_once("dompdf_config.inc.php");
 
 $nama  = "Akmal";
 $alamat = "Jati";
//$html =file_get_contents('formpdf.php');
 
$dompdf = new DOMPDF();
$dompdf->load_html(file_get_contents('formpdf.php'));
$dompdf->render();
$dompdf->stream('laporan_'.$nama.'.pdf');

?>













