<?php  

require_once('./tcpdf/tcpdf.php');
$idVolante = $_GET['param1'];



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

$consulta_datos = "SELECT * FROM sia_ConfrontasJuridico WHERE idVolante='$idVolante'";
$datos=consultaRetorno($consulta_datos, $db);




$datos_confronta="select v.idRemitente,v.numDocumento,
a.idEmpleadoTitular,a.nombre as area,
CONCAT(u.saludo,' ',u.nombre,' ',u.paterno,' ',u.materno) as titular,
audi.clave,audi.idPrograma,
dbo.lstSujetosByAuditoria(audi.idAuditoria) as ente,
con.notaInformativa, con.nombreResponsable, con.cargoResponsable, con.siglas, con.siglas,con.fOficio,con.hConfronta, con.fConfronta, con.numFolio,con.refDocumento, catsub.idTipoDocto as tipo
from sia_Volantes v
left join sia_VolantesDocumentos vd on v.idVolante=vd.idVolante
left join sia_areas a on v.idRemitente=a.idArea
left join sia_empleados e on a.idEmpleadoTitular=e.idEmpleado
left join sia_usuarios u on e.idEmpleado=u.idEmpleado
left join sia_auditorias audi on vd.cveAuditoria=audi.idAuditoria
left join sia_confrontasJuridico con on v.idVolante=con.idVolante
left join sia_catSubTiposDocumentos catsub on vd.idSubTipoDocumento=catsub.idSubTipoDocumento
where v.idVolante='$idVolante'";

$confronta=consultaRetorno($datos_confronta, $db);


$sql_area = "select a.nombre from sia_areas a 
inner join sia_TurnadosJuridico tj on tj.idAreaRecepcion = a.idArea
where tj.idVolante = '$idVolante' and tj.idTipoTurnado = 'V'";


$area_header = consultaRetorno($sql_area, $db);


$sqlEspacios = "Select * from sia_EspaciosJuridico where idVolante = '$idVolante'";


$espacios = consultaRetorno($sqlEspacios,$db);

/*------------------ Configuracion del PDF -----------------*/

$siglas = $confronta[0]['siglas'];
$folio = $confronta[0]['numFolio'];
$refDocumento = $confronta[0]['refDocumento'];

$pageLayout = array(216, 279); //  or array($height, $width) 

$pdf = new TCPDF(PDF_PAGE_ORIENTATION, 'mm', $pageLayout, true, 'UTF-8', false);



$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Auditoria Superior de la Ciudad de Mexico');
$pdf->SetTitle('Confronta');
$pdf->SetSubject('Confronta');
$pdf->SetKeywords('Confronta');


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

$fecha=explode('-',$datos[0]['fOficio']);
$mes=mes($fecha[1]);


function texto_confronta($tipo,$confronta){

	$array_clave_auditoria = explode('-',$confronta[0]['idPrograma']);


	$textoNota='Hago referencia a su Nota Informativa '.$confronta[0]['numDocumento'];
	$texto='Hago referencia a su oficio '.$confronta[0]['numDocumento'];
	$textoDos=' y Nota Informativa '.$confronta[0]['notaInformativa'];
	$textoTres=' mediante los cuales solicita se proporcione el nombre del servidor público que asistira a la reunión de Confronta, correspondiente a la Cuenta Pública '.$array_clave_auditoria[2].', sobre el particular, se informa el nombre del representante:';


	if($tipo == 'NOTA'){
  		
  		$textoFinal=$textoNota.$textoTres;
	
	}else{

  		if(empty($datos[0]['notaInformativa'])){
  			
  			$textoFinal=$texto.$textoTres;
  		}else{
    
    		$textoFinal=$texto.$textoDos.$textoTres;
  		}

	}



	return $textoFinal;

}


/*-------------------------- Encabezado (LOGO Y FECHA) ---------------------*/

$text1 = '
<table cellspacing="0" cellpadding="0" border="0">
    <tr>
        <td width="264"><img src="img/logo-top.png"/></td>
        <td width="323"><p style="text-align:justify"><b>DIRECCIÓN GENERAL DE ASUNTOS JURÍDICOS<br><br>'.$area_header[0]['nombre'].'<br><br>NOTA INFORMATIVA</b><br><br>Ciudad de México, '. $fecha[2] . ' de ' .$mes . ' de ' . $fecha[0].'.'.'<br><br><i>"Fiscalizar con Integridad para Prevenir y Mejorar".</i></p></td>
    </tr>
</table>';
$pdf->SetFont('helvetica', '', 11);
$pdf->writeHTML($text1);
 



/*----------------------- PARA: Y DE: ---------------------*/

$titular = $confronta[0]['titular'];
$area = $confronta[0]['area'];

$tbl = <<<EOD
<br><br>
<table cellspacing="0" cellpadding="0" border="0" style="line-height:15px">
    <tr>
        <td width="60"><b>PARA:</b></td>
        <td width="350"><b>$titular<br>$area</b></td>
    </tr>
    <tr>
        <td rowspan="2"><b><br>DE: </b></td>
        <td colspan="8"><b><br>DR. IVÁN DE JESÚS OLMOS CANSINO<br>DIRECTOR GENERAL DE ASUNTOS JURÍDICOS</b></td>
      
    </tr>

</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');


/*--------------------- TEXTO CONFRONTA -----------------------*/

$texto = texto_confronta($confronta[0]['tipo'], $confronta);


$tbl = <<<EOD
	<p style="text-align:justify">$texto</p><br>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');



/*-------------------- TABLA DATOS CONFRONTA ---------------*/

$ente = $confronta[0]['ente'];
$clave = $confronta[0]['clave'];
$fecha_confronta = $confronta[0]['fConfronta'];
$hora_confronta = substr($confronta[0]['hConfronta'],0,5);
$asiste =  $confronta[0]['nombreResponsable'];
$cargo = $confronta[0]['cargoResponsable'];
$tbl = <<<EOD
<table cellspacing="0" cellpadding="1" border="1" style="text-align:center" width="587">
    <tr style="background-color:#efefef">
        <td>ENTIDAD</td>
        <td>CLAVE</td>
        <td>DIA/HORA</td>
        <td>ASISTE</td>
        <td>CARGO</td>
    </tr>
    <tr>
    	<td>$ente</td>
        <td>$clave</td>
        <td>
        	$fecha_confronta
			<br>
			$hora_confronta
        </td>
        <td>$asiste</td>
        <td>$cargo</td>
    </tr>
</table>
EOD;
$pdf->SetFont('helvetica', '', 8);
$pdf->writeHTML($tbl, true, false, false, false, '');


/*-------------- TEXTO PIE DE PAGINA --------------------*/



$tbl = <<<EOD
<br><p>Sin otro particular, hago propicia la ocasión para enviarle un coordial saludo. </p>
<br><p><b>ATENTAMENTE</b></p>

EOD;
$pdf->SetFont('helvetica', '', 11);
$pdf->writeHTML($tbl, true, false, false, false, '');


/*--------------------- SIGLAS -------------------*/

$pdf->SetFont('helvetica', '', 8);
$to ='';
for($i=0;$i<$espacios[0]['sigla'];$i++){
    $to .= '<br>';
}

$tbl = <<<EOD
<br><br>$to
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
