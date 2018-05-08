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

class MYPDF extends TCPDF {

	//Page header
	public function Header() {
		// Logo
		$image_file = K_PATH_IMAGES.'logo_example.jpg';
		$this->Image($image_file, 10, 10, 15, '', 'JPG', '', 'T', false, 300, '', false, false, 0, false, false, false);
		// Set font
		$this->SetFont('helvetica', 'B', 20);
		// Title
		$this->Cell(0, 15, '<< TCPDF Example 003 >>', 0, false, 'C', 0, '', 0, false, 'M', 'M');
	}

      // Page footer
    public function Footer() {
        // Position at 15 mm from bottom
        $this->SetY(-15);
        // Set font
        $this->SetFont('helvetica', 'I', 10);
        // Page number
        //$this->Cell(20);
        //$this->Cell(186, 3,' | '.$this->getAliasNumPage().' | '. ' de '.' | '.$this->getAliasNbPages().' | ',1,1,'R');
    }
}

// create new PDF document
$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Auditoria Superior de la Ciudad de México');
$pdf->SetTitle('IRAC ' .$clave);
 
 $pdf->setPrintHeader(false);
//$pdf->setPrintFooter(false);

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
    require_once(dirname(__FILE__).'/lang/eng.php');
    $pdf->setLanguageArray($l);
}

// -------------------------------------------------------------------

// set font
$pdf->SetFont('helvetica', '', 20);

// add a page
$pdf->AddPage();

$text1 = '
<table cellspacing="0" cellpadding="0" border="0">
    <tr>
        <td colspan="1"><img img src="img/asamblea.png"/></td>
        <td colspan="2"></td>
        <td colspan="4"><p><font size="10"><b> AUDITORÍA SUPERIOR DE LA CIUDAD DE MÉXICO<br><br> DIRECCIÓN GENERAL DE ASUNTOS JURÍDICOS<br><br>OFICIO NÚM: ' .$datos[0]["numFolio"] .'<br><br> ASUNTO: Se remite evaluación del Informe de <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Resultados de Auditoría para Confronta<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (IRAC) correspondiente a la Auditoría <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' . $clave . '.<br><br>Ciudad de México, '. $feoficio[2] . ' de ' .$mes2 . ' de ' . $feoficio[0].'<br><br><i>"Fiscalizar con Integridad para Prevenir y Mejorar".</i></b></p></font></td>
    </tr>
</table>';

$pdf->SetFontSize(9);
$pdf->writeHTML($text1);

//$pdf->SetFont('helvetica', '', 8);

// -------------------------------------------------------------------

$tbl = <<<EOD
<table cellspacing="0" cellpadding="0" border="0">
    
    <tr>
        <td colspan="1"><b>{$nomarers} <br>{$direc}<br>PRESENTE</b></td>
        
        
    </tr>
</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');



// -------------------------------------------------------------------

$tbl = <<<EOD
<table cellspacing="0" cellpadding="0" border="0">
    
    <tr>
        <td align="justify">En atención al oficio número {$numdocu} de fecha {$fecha[2]} de {$mes} de {$fecha[0]}, presentado ante esta Dirección General el día {$feRecep[2]} de {$mes3} de {$feRecep[0]}, y de conformidad con lo dispuesto por el Manual del Proceso General de Fiscalización en su Apartado 7. “Fases de Auditoría”, inciso B) “Fase de Ejecución”, Subapartado 4. “Confronta de Resultados de Auditoría con el Sujeto Fiscalizado”, numeral 1, por este conducto, me permito remitir junto al original en sobre cerrado, la Hoja de Evaluación del Informe de Resultados de Auditoría para Confronta (IRAC):</td>
    </tr>

</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');

// -----------------------------------------------------------------------------
$sql="SELECT ROW_NUMBER() OVER (ORDER BY vo.idVolante  desc ) as fila,a.idAuditoria,a.clave,dbo.lstSujetosByAuditoria(a.idAuditoria) sujeto, ta.nombre tipo, a.rubros FROM sia_Volantes vo INNER JOIN sia_ObservacionesDoctosJuridico ob on vo.idVolante=ob.idVolante INNER JOIN sia_auditorias a on ob.cveAuditoria=a.idAuditoria INNER JOIN sia_tiposauditoria ta on a.tipoAuditoria=ta.idTipoAuditoria WHERE vo.idVolante='$idVolante' GROUP BY a.idAuditoria,a.clave, ta.nombre, a.rubros,vo.idVolante;";

$db=conecta();
$datos=consultaRetorno($sql, $db);

$tbl = <<<EOD
  <table cellspacing="0" cellpadding="1" border="1">
    <tr style="background-color:#E7E6E6;">
      <th colspan="1" align="center" width="22"><b>No.</b></th>
      <th colspan="1" align="center" width="65"><b>AUDITORÍA NÚM.</b></th>
      <th colspan="1" align="center" width="80"><b>SUJETO<br>FISCALIZADO</b></th>
      <th colspan="1" align="center" width="75"><b>TIPO DE AUDITORÍA</b></th>
      <th colspan="7" align="center"><b>RUBRO</b></th>
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


$pdf->writeHTML($tbl, true, false, false, false, '');

// -----------------------------------------------------------------------------

$tbl = <<<EOD
<table cellspacing="0" cellpadding="0" border="0">
    
    <tr>
        <td>Sin otro particular por el momento, hago propicia la ocasión para enviarle un cordial saludo.<br><br></td>
    </tr>
    <tr>
        <td><b>ATENTAMENTE<br>El DIRECTOR GENERAL<br><br><br><br><br></b></td>
    </tr>
    <tr>
        <td><b>DR. IVÁN DE JESÚS OLMOS CANSINO<br></b></td>
    </tr>
</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');
// -----------------------------------------------------------------------------


$tbl = <<<EOD
<table cellspacing="0" cellpadding="0" border="0">
    <tr>
        <td colspan="1">c.c.p.</td>  
        <td colspan="5"><b>DR. DAVID MANUEL VEGA VERA,</b> Auditor Superior.- Presente.- Para su conocimiento.<br>{$tipo}<b>DR. ARTURO VÁZQUEZ ESPINOSA,</b> Titular de la Unidad Técnica Sustantiva de Fiscalización Especializada y de Asuntos Jurídicos.- Presente.- Para su conocimiento.</td>
    </tr>
</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');

// -----------------------------------------------------------------------------

$tbl = <<<EOD
  <table cellspacing="0" cellpadding="0" border="0">
    <tr><td colspan="6" align="left">{$sig}<br><br></td></tr>
  </table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
//Close and output PDF document
$pdf->Output('OFICIOIRAC.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+