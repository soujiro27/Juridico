<?php  

require_once('./tcpdf/tcpdf.php');
$idVolante = $_GET['param'];



/*-------------Conexion a BD  ---------------------*/
function conecta(){
    try{
      require './../../../src/conexion.php';
      $db = new PDO("sqlsrv:Server={$hostname}; Database={$database}", $username, $password );
      return $db;
    }catch (PDOException $e) {
      print "ERROR: " . $e->getMessage();
      die();
    }
  }

function consultaRetorno($sql,$db){
		$query=$db->prepare($sql);
		$query->execute();
    return $query->fetchAll(PDO::FETCH_ASSOC);
}

$db=conecta();

/*---------------- Consultas ------------------*/





$datos_confronta="select pj.*,
concat(rj.saludo,' ',rj.nombre) as titular,
rj.puesto as area,
concat(p.saludo,' ',p.nombre,p.paterno,p.materno) as nombrePuesto,
p.puesto
from sia_plantillasJuridico  as pj
inner join sia_RemitentesJuridico rj on rj.idRemitenteJuridico = pj.idRemitente
inner join sia_PuestosJuridico p on p.idPuestoJuridico = pj.idPuestoJuridico
where pj.idVolante ='$idVolante'";

$confronta=consultaRetorno($datos_confronta, $db);

$refDocumento = $confronta[0]['refDocumento'];

$idCopias = $confronta[0]['copias'];
$array_copias = explode(',',$idCopias);

$tr = '';

foreach ($array_copias as $key => $value) {
  
    $sqlCopias = "select * from sia_RemitentesJuridico where idRemitenteJuridico = '$value'";
    $copias = consultaRetorno($sqlCopias, $db);
    $puesto = $copias[0]['puesto'];
    $nombre = mb_strtoupper($copias[0]['nombre'],'utf-8');
    $saludo = $copias[0]['saludo'];

    $tr .=  '<b>' .$saludo .' '. $nombre.', '.'</b>' . $puesto .'.- Presente.- Para su conocimiento.-<br>';
      
}



$sql_area = "select a.nombre from sia_areas a 
inner join sia_TurnadosJuridico tj on tj.idAreaRecepcion = a.idArea
where tj.idVolante = '$idVolante' and tj.idTipoTurnado = 'V'";


$area_header = consultaRetorno($sql_area, $db);


$sqlEspacios = "Select * from sia_EspaciosJuridico where idVolante = '$idVolante'";


$espacios = consultaRetorno($sqlEspacios,$db);

/*------------------ Configuracion del PDF -----------------*/

$siglas = $confronta[0]['siglas'];
$folio = $confronta[0]['numFolio'];

$pageLayout = array(216, 279); //  or array($height, $width) 

$pdf = new TCPDF(PDF_PAGE_ORIENTATION, 'mm', $pageLayout, true, 'UTF-8', false);



$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Auditoria Superior de la Ciudad de Mexico');
$pdf->SetTitle('NOTA-GENERICA');
$pdf->SetSubject('NOTA-GENERICA');
$pdf->SetKeywords('NOTA-GENERICA');


// remove default header/footer
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);

$pdf->SetFooterMargin('25');


// set margins
$pdf->SetMargins('24','24','24',true);
$pdf->SetFooterMargin('21');
// set auto page breaks
$pdf->SetY(0, true, true);
$pdf->SetAutoPageBreak(true, '21');

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
    require_once(dirname(__FILE__).'/lang/eng.php');
    $pdf->setLanguageArray($l);
}


$pdf->SetFont('helvetica', '', 11);
$pdf->AddPage('P','LETTER',true);












/*------------------ Funciones ----------------*/

if(empty($confronta)){
  header('Location: /SIA/juridico/Public/cedula.html');
}

function mes($num){
  $meses= ['Enero','Febrero','Marzo','Abril','Mayo','Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  return $meses[$num-1];
}

$fecha=explode('-',$confronta[0]['fOficio']);
$mes=mes($fecha[1]);




/*-------------------------- Encabezado (LOGO Y FECHA) ---------------------*/

$text1 = '
<table cellspacing="0" cellpadding="0" border="0">
    <tr>
        <td width="264"><img src="img/logo-top.png"/></td>
        <td width="323"><p><b>DIRECCIÓN GENERAL DE ASUNTOS JURÍDICOS<br><br>'.$area_header[0]['nombre'].'<br><br>NOTA INFORMATIVA</b><br><br>Ciudad de México,'. $fecha[2] . ' de ' .$mes . ' de ' . $fecha[0].'.'.'<br><br><i>"Fiscalizar con Integridad para Prevenir y Mejorar".</i></p></td>
    </tr>
</table>';
$pdf->SetFont('helvetica', '', 11);
$pdf->writeHTML($text1);




/*----------------------- PARA: Y DE: ---------------------*/

$titular = mb_strtoupper($confronta[0]['titular'],'utf-8');
$area = mb_strtoupper($confronta[0]['area'],'utf-8');
$nombre = mb_strtoupper($confronta[0]['nombrePuesto'],'utf-8');
$puesto = mb_strtoupper($confronta[0]['puesto'],'utf-8');
$tbl = <<<EOD
<table cellspacing="0" cellpadding="0" border="0" style="line-height:15px">
    <tr>
        <td width="60"><b>PARA:</b></td>
        <td width="350"><b>$titular<br>$area</b></td>
    </tr>
    <tr>
        <td rowspan="2"><b><br>DE: </b></td>
        <td colspan="8"><b><br>$nombre<br>$puesto</b></td>
      
    </tr>

</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');


/*------------------ TEXTO CUERPO ---------------------*/
$texto = mb_strtoupper($confronta[0]['texto'],'utf-8');
$pdf->SetFont('helvetica', '', 11);
$tbl = <<<EOD
$texto
EOD;

$pdf->writeHTML($tbl, true, 0, false, false,'J');






/*-------------- ATENTAMENTE --------------------*/

$to ='';
for($i=0;$i<$espacios[0]['atte'];$i++){
    $to .= '<br>';
}

$tbl = <<<EOD
$to
<br><p>Sin otro particular, hago propicia la ocasión para enviarle un coordial saludo. </p>
<br><p><b>ATENTAMENTE</b></p>

EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');





/*------------------- ESPACIOS ----------------------*/
/*$espacios = $confronta[0]['espacios'];
$to = '';

for($i=0;$i<$espacios;$i++){
    $to .= '<br>';
}

$tbl = <<<EOD
    <table cellspacing="0" cellpadding="0" border="0" >
        <tr>
            <td> $to </td>
        </tr>
    </table>
EOD;

$pdf -> writeHTML($tbl,true,false,false,false,'');
*/


/*------------------- COPIAS ----------------*/

$pdf->SetFont('helvetica', '', 8);
$to ='';
for($i=0;$i<$espacios[0]['copia'];$i++){
    $to .= '<br>';
}
$tbl = <<<EOD
$to
<table cellspacing="0" cellpadding="0" border="">
    <tr>
      <td width="30">c.c.p.</td> 
      <td width="555">$tr </td>
    </tr>
</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');



/*---------------¨PIE DE PAGINA ----------------*/

$to ='';
for($i=0;$i<$espacios[0]['sigla'];$i++){
    $to .= '<br>';
}
$tbl = <<<EOD
$to
<table cellspacing="0" cellpadding="1" border="0" >
    <tr >
        <td style="text-align:left">$siglas<br>$folio</td>
        <td style="text-align:right">Ref. $refDocumento</td>
       
       
    </tr>
</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');




$pdf->Output('example_002.pdf', 'I');

?>
