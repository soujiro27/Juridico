<?php
session_start();
// Include the main TCPDF library (search for installation path).
require_once('./tcpdf/tcpdf.php');

$idVolante = $_GET['param'];


function conecta(){
  try{
    require './../../../src/conexion.php'; 
    //require 'src/conexion.php';
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



$sql = "SELECT * FROM sia_DocumentosSiglas WHERE idVolante='$idVolante'";
$db=conecta();
$datos=consultaRetorno($sql, $db);

if(empty($datos)){
  header('Location: /SIA/juridico/Public/cedula.html');
}




$sql = "SELECT vo.numDocumento,CASE WHEN a.tipoAuditoria LIKE '%FIN%' THEN '<b>C.P. FELIPE DE JESÚS ALVA MARTÍNEZ,</b> Titular de la Unidad Técnica Sustantiva de Fiscalización Financiera y Administración.- Presente.- Para su conocimiento.<br>' WHEN us.idArea='DGACFA' or us.idArea='DGACFB' or us.idArea='DGACFC' THEN '<b>C.P. FELIPE DE JESÚS ALVA MARTÍNEZ,</b> Titular de la Unidad Técnica Sustantiva de Fiscalización Financiera y Administración.- Presente.- Para su conocimiento.<br>' ELSE ' ' END tipoau,a.idAuditoria audi ,a.clave claveAuditoria,vo.fDocumento,vo.fRecepcion ,CONCAT(us.saludo,' ',us.nombre,' ',us.paterno,' ', us.materno) nombreres, ar.nombre direccion,ds.fOficio,ds.siglas,ds.idPuestosJuridico,ds.numFolio FROM sia_Volantes vo INNER JOIN sia_volantesDocumentos vd on vo.idVolante = vd.idVolante INNER JOIN sia_areas ar on vo.idRemitente=ar.idArea INNER JOIN sia_usuarios us on ar.idEmpleadoTitular=us.idEmpleado LEFT JOIN sia_DocumentosSiglas ds on vo.idVolante=ds.idVolante INNER JOIN sia_auditorias a on vd.cveAuditoria=a.idAuditoria WHERE vo.idVolante='$idVolante';";      
      
$db=conecta();
$datos=consultaRetorno($sql, $db);

function convierte($cadena){
  $str = utf8_decode($cadena);
  return $str;
}

function mes($num){
  $meses= ['Enero','Febrero','Marzo','Abril','Mayo','Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  return $meses[$num-1];
}

$fecha=explode('-',$datos[0]['fDocumento']);
$mes=mes(intval($fecha[1]));

$feoficio=explode('-',$datos[0]['fOficio']);
$mes2=mes(intval($feoficio[1]));

$feRecep=explode('-',$datos[0]['fRecepcion']);
$mes3=mes(intval($feRecep[1]));



$numdocu=convierte(str_replace('/',"\n", $datos[0]['numDocumento']));
$clave=$datos[0]['claveAuditoria'];
$fdocume=$datos[0]['fDocumento'];
$nomarers=$datos[0]['nombreres'];
$direc=$datos[0]['direccion'];
$sig=$datos[0]['siglas'];
$puesjud=$datos[0]['idPuestosJuridico'];
$tipo=$datos[0]['tipoau'];
$numof=$datos[0]["numFolio"];

// create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Auditoria Superior de la Ciudad de México');
$pdf->SetTitle('IRAC ' .$clave);
 
 $pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins('24','24','27',true);
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

// -------------------------------------------------------------------

// set font
$pdf->SetFont('helvetica', '', 11);

// add a page
$pdf->AddPage('P','LETTER',true);


$header = '<table  border="0" width="100%">
    <tr>
        <td width="140"><img src="img/asamblea.png" width="124" height="160" /></td>
        <td width="139"></td>
        <td width="308"><p style="text-align:justify;line-height:14px"><b>AUDITORÍA SUPERIOR DE LA CIUDAD DE MÉXICO</b></p>
          <p style="text-align:justify;margin-top:0px"><b>DIRECCIÓN GENERAL DE ASUNTOS JURÍDICOS</b></p>
          <p><b>OFICIO NÚM. ' .$datos[0]["numFolio"] .'</b></p>
          
            <span style="border:1px solid red"><b>ASUNTO:</b></span>
              <span style="text-align:justify">Se remite evaluación del Informe de Resultados de Auditoría para Confronta (IRAC) correspondiente a la Auditoría '.$clave .'
              </span> 
       
          <p>Ciudad de México, '. $feoficio[2] . ' de ' .$mes2 . ' de ' . $feoficio[0].'</p>
          <p><i>"Fiscalizar con Integridad para Prevenir y Mejorar"</i></p>
        </td>
    </tr>
</table>';




$pdf->SetFont('helvetica', '', 11);

$pdf->writeHTML($header);



// -------------------------------------------------------------------
$pdf->SetFont('helvetica', '', 11);
$tbl = <<<EOD
<br><br>
<table cellspacing="0" cellpadding="0" border="0"  width="395">
    
    <tr >
        <td style="line-height:15px"><b>{$nomarers} <br>{$direc}<br>P R E S E N T E</b></td>
        
        
    </tr>
</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');



// -------------------------------------------------------------------
$pdf->SetFont('helvetica', '', 11);
$mes_lower = strtolower($mes);
$mes_dos_lower = strtolower($mes3);
$tbl = <<<EOD
<table cellspacing="0" cellpadding="0" border="0">
    
    <tr>
        <td align="justify">En atención al oficio número {$numdocu} de fecha {$fecha[2]} de {$mes_lower} de {$fecha[0]}, presentado ante esta Dirección General el día {$feRecep[2]} de {$mes_dos_lower} de {$feRecep[0]}, y de conformidad con lo dispuesto por el Manual del Proceso General de Fiscalización en su Apartado 7. “Fases de Auditoría”, inciso B) “Fase de Ejecución”, Subapartado 4. “Confronta de Resultados de Auditoría con el Sujeto Fiscalizado”, numeral 1, por este conducto, me permito remitir junto al original en sobre cerrado, la Hoja de Evaluación del Informe de Resultados de Auditoría para Confronta (IRAC):</td>
    </tr>

</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');

// -----------------------------------------------------------------------------
$sql="SELECT ROW_NUMBER() OVER (ORDER BY vo.idVolante  desc ) as fila,a.idAuditoria,a.clave,dbo.lstSujetosByAuditoria(a.idAuditoria) sujeto,
ta.nombre tipo, a.rubros, vo.idVolante 
FROM sia_Volantes vo 
LEFT JOIN sia_VolantesDocumentos vd on vo.idVolante=vd.idVolante
LEFT JOIN sia_auditorias a on vd.cveAuditoria=a.idAuditoria 
LEFT JOIN sia_tiposauditoria ta on a.tipoAuditoria=ta.idTipoAuditoria 
WHERE vo.idVolante='$idVolante'";

$db=conecta();
$datos=consultaRetorno($sql, $db);

$tbl = <<<EOD
  <table cellspacing="0" cellpadding="1" border="1">
    <tr style="background-color:#E7E6E6;">
      <th colspan="1" align="center" width="25"><b>No.</b></th>
      <th colspan="1" align="center" width="80"><b>AUDITORÍA NÚM.</b></th>
      <th colspan="1" align="center" width="100"><b>SUJETO<br>FISCALIZADO</b></th>
      <th colspan="1" align="center" width="90"><b>TIPO DE AUDITORÍA</b></th>
      <th colspan="4" align="center"><b>RUBRO</b></th>
    </tr>
    
EOD;

foreach ($datos as $row) {
$tbl .= <<<EOD
  <tr>
    <td colspan="1" align="center">{$row['fila']}</td>
    <td colspan="1" align="center">{$row['clave']}</td>
    <td colspan="1">{$row['sujeto']}</td>
    <td colspan="1">{$row['tipo']}</td>
    <td colspan="7">{$row['rubros']}</td>
  </tr>
EOD;
}

$tbl .= <<<EOD
  </table>
EOD;
$pdf->SetFont('helvetica', '', 8);

$pdf->writeHTML($tbl, true, false, false, false, '');

// -----------------------------------------------------------------------------


$sqlEspacios="SELECT * from sia_EspaciosJuridico WHERE idVolante='$idVolante'";

$db=conecta();
$espacios=consultaRetorno($sqlEspacios, $db);

$atentamente ='';
for ($i=0; $i <$espacios[0]['atte'] ; $i++) { 
 $atentamente .= <<<EOD
  <br>

EOD;
}

$atentamente .= <<<EOD
<table cellspacing="0" cellpadding="0" border="0">
    
    <tr>
        <td>Sin otro particular por el momento, hago propicia la ocasión para enviarle un cordial saludo.<br><br></td>
    </tr>
    <tr>
        <td><b>ATENTAMENTE<br>El DIRECTOR GENERAL<br><br><br><br></b></td>
    </tr>
    <tr>
        <td><b>DR. IVÁN DE JESÚS OLMOS CANSINO<br></b></td>
    </tr>
</table>
EOD;
$pdf->SetFont('helvetica', '', 11);
$pdf->writeHTML($atentamente, true, false, false, false, '');
// -----------------------------------------------------------------------------

$pdf->SetFont('helvetica', '', 8);

$textoCopias = '';
for ($i=0; $i <$espacios[0]['copia']; $i++) { 
 $textoCopias .= <<<EOD
  <br>
EOD;
}

$textoCopias .= <<<EOD
<table cellspacing="0" cellpadding="0" border="0">
    <tr>
        <td width="30">c.c.p.</td>  
        <td width="555"><b>DR. DAVID MANUEL VEGA VERA,</b> Auditor Superior.- Presente.- Para su conocimiento.<br>{$tipo}<b>DR. ARTURO VÁZQUEZ ESPINOSA,</b> Titular de la Unidad Técnica Sustantiva de Fiscalización Especializada y de Asuntos Jurídicos.- Presente.- Para su conocimiento.</td>
    </tr>
</table>
EOD;

$pdf->writeHTML($textoCopias, true, false, false, false, '');

// -----------------------------------------------------------------------------
$textoSiglas = '';
for ($i=0; $i <$espacios[0]['sigla']; $i++) { 
 $textoSiglas .= <<<EOD
  <br>
EOD;
}
$textoSiglas .= <<<EOD
  <table cellspacing="0" cellpadding="0" border="0">
    <tr><td colspan="6" align="left">{$sig}</td></tr>
  </table>
EOD;

$pdf->writeHTML($textoSiglas, true, false, false, false, '');
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
//Close and output PDF document
$pdf->Output('OFICIOIRAC.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+