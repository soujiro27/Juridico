<?php  

namespace Juridico\App\Controllers\Oficios;



use Juridico\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;

use Juridico\App\Controllers\BaseController;

use Juridico\App\Models\Volantes\Volantes;
use Juridico\App\Models\Volantes\VolantesDocumentos;
use Juridico\App\Models\Volantes\TurnadosJuridico;
use Juridico\App\Models\Api\Puestos;
use Juridico\App\Models\Api\Usuarios;
use Juridico\App\Models\Api\DocumentosSiglas;
use Juridico\App\Models\Api\Espacios;

class IfaController extends TwigController{

	
	private $js = 'Ifa';

	public function index(){
		
		$base = new BaseController();
		$notificaciones = $base->get_user_notification($_SESSION['idUsuario']);
		$menu = $base->menu();

		echo $this->render('HomeLayout/HomeContainer.twig',[
			'js' => $this->js,
			'session' => $_SESSION,
			'notificaciones' => $notificaciones->count(),
			'menu' => $menu['modulos']
		]);

		
}

	public function get_registers(){
		
		$id = $_SESSION['idEmpleado'];
        $areas = Puestos::where('rpe','=',"$id")->get();
        $area = $areas[0]['idArea'];

         $iracs = Volantes::select('sia_Volantes.*','c.nombre as caracter','a.nombre as accion','audi.clave','sia_Volantes.extemporaneo','t.idEstadoTurnado')
            ->join('sia_catCaracteres as c','c.idCaracter','=','sia_Volantes.idCaracter')
            ->join('sia_CatAcciones as a','a.idAccion','=','sia_Volantes.idAccion')
            ->join('sia_VolantesDocumentos as vd','vd.idVolante','=','sia_Volantes.idVolante')
            ->join('sia_auditorias as audi','audi.idAuditoria','=','vd.cveAuditoria')
            ->join( 'sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','=','vd.idSubTipoDocumento')
            ->join('sia_TurnadosJuridico as t','t.idVolante','=','sia_Volantes.idVolante')
            ->where('sub.nombre','=','IFA')
            ->where('t.idAreaRecepcion','=',"$area")
            ->where('t.idTipoTurnado','V')
            ->get();

		echo json_encode($iracs);
	}

		public function Save(array $data){

		$validate = $this->validate($data);

			$idVolante = $data['idVolante'];
			$vd = VolantesDocumentos::where('idVolante',"$idVolante")->get();
			$subTipo = $vd[0]['idSubTipoDocumento'];
		
		if(empty($validate)){

			$document = DocumentosSiglas::where('idVolante',"$idVolante")->get();

			if($document->isEmpty()){

			  	$documento = new DocumentosSiglas([
	                'idVolante' => $idVolante,
	                'idSubTipoDocumento' => $subTipo,
	                'idDocumentoTexto' => $data['idDocumentoTexto'],
	                'idPuestosJuridico' => $data['idPuestosJuridico'],
	                'fOficio' => $data['fOficio'],
	                'siglas' => $data['siglas'],
	                'usrAlta' => $_SESSION['idUsuario'],
	            ]);

	            $documento->save();

	            $espacios = new Espacios([
	                'idVolante' => $idVolante,
	                'encabezado' => $data['encabezado'],
	                'cuerpo' => $data['cuerpo'],
	                'pie' => $data['pie'],
	                'usrAlta' => $_SESSION['idUsuario']
	            ]);

	            $espacios->save();
	            $validate[0] = 'success';
			} else {

				DocumentosSiglas::where('idVolante',"$idVolante")->update([
	                'idPuestosJuridico' => $data['idPuestosJuridico'],
	                'fOficio' => $data['fOficio'],
	                'siglas' => $data['siglas'],
	                'idDocumentoTexto' => $data['idDocumentoTexto'],
	                'usrModificacion' => $_SESSION['idUsuario'],
	                'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
				]);

				Espacios::where('idVolante',"$idVolante")->update([
					'encabezado' => $data['encabezado'],
	                'cuerpo' => $data['cuerpo'],
	                'pie' => $data['pie'],
	                'usrModificacion' => $_SESSION['idUsuario'],
	               	'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')

				]);

				 $validate[0] = 'success';
			}
	
		}

		echo json_encode($validate);
	}


	public function Update(array $data){


		$id = $data['id'];
	

		$validate = $this->validate($data);
		if(empty($validate)){

			Observaciones::find($id)->update([
				'pagina' => $data['pagina'],
				'parrafon' => $data['parrafo'],
				'observacion' => $data['texto'],
				'estatus' => $data['estatus'],
				'usrModificacion' => $_SESSION['idUsuario'],
				'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
			]);

			$validate[0] = 'success';
		}
		echo json_encode($validate);

	}



	public function validate($data){

			$is_valid = GUMP::is_valid($data,array(
			'siglas' => 'required',
			'fOficio' => 'required',
			'idDocumentoTexto' => 'required',
			'idPuestosJuridico' => 'required',
			'encabezado' => 'max_len,2|numeric',
			'cuerpo' => 'max_len,2|numeric',
			'pie' => 'max_len,2|numeric',
		

		));

		if($is_valid === true){
			$is_valid = [];
		}

		return $is_valid;

	}

	
}
