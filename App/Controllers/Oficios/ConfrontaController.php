<?php  

namespace Juridico\App\Controllers\Oficios;



use Juridico\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;

use Juridico\App\Controllers\BaseController;
use Juridico\App\Controllers\NotificacionesController;

use Juridico\App\Models\Volantes\Volantes;
use Juridico\App\Models\Volantes\VolantesDocumentos;
use Juridico\App\Models\Volantes\TurnadosJuridico;
use Juridico\App\Models\Api\Puestos;
use Juridico\App\Models\Api\Usuarios;
use Juridico\App\Models\Api\DocumentosSiglas;
use Juridico\App\Models\Api\Espacios;
use Juridico\App\Models\Api\Confrontas;
class ConfrontaController extends TwigController{

	
	private $js = 'Confronta';

	public function index(){
		
		$base = new BaseController();
		$notifica = new NotificacionesController();
		$notificaciones = $notifica->get_notifications($_SESSION['idUsuario']);
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
            ->where('sub.nombre','=','CONFRONTA')
            ->where('t.idAreaRecepcion','=',"$area")
            ->where('t.idTipoTurnado','V')
            ->get();

		echo json_encode($iracs);
	}

	public function Save(array $data){

		$idVolante = $data['idVolante'];

		$validate = $this->validate($data);


		$datos = [
				'idVolante' => $data['idVolante'],
				'nombreResponsable' => $data['nombre'],
				'cargoResponsable' => $data['cargo'],
				'siglas' => $data['siglas'],
				'hConfronta' => $data['hConfronta'],
				'fConfronta' => $data['fConfronta'],
				'fOficio' => $data['fdocumento'],
				'numFolio' => $data['documento'],
			];

		if(empty($validate)){

			$confronta = Confrontas::where('idVolante',"$idVolante")->get();


			if($confronta->isEmpty()){

				if(!isset($data['notaInformativa'])){
					
					$datos['usrAlta'] = $_SESSION['idUsuario'];
					$confronta = new Confrontas($datos);

					
				} else {
					$datos['usrAlta'] = $_SESSION['idUsuario'];
					$datos['notaInformativa'] = $data['notaInformativa']; 
					$confronta = new Confrontas($datos);
				}

				$confronta->save();
				$validate[0] = 'success';

			} else {

				$idConfronta = $confronta[0]['idConfrontaJuridico'];

				if(!isset($data['notaInformativa'])){

					$datos['usrModificacion'] =  $_SESSION['idUsuario'];
					//$datos['fModificacion'] = Carbon::now('America/Mexico_City')->format('m-d-Y ');
					
				} else {

					$datos['notaInformativa'] = $data['notaInformativa'];

				}
				Confrontas::find($idConfronta)->update($datos);
				$validate[0] = 'success';

			}

			
		}
		
		echo json_encode($validate);
	}


	public function get_data_confronta($id){

		$volantes = VolantesDocumentos::select('sia_VolantesDocumentos.notaConfronta','c.*')
					->leftJoin('sia_ConfrontasJuridico as c','c.idVolante','=','sia_VolantesDocumentos.idVolante')
					->where('sia_VolantesDocumentos.idVolante',"$id")
					->get();
		echo json_encode($volantes);
	}


	public function validate($data){

			$is_valid = GUMP::is_valid($data,array(
			'nombre' => 'required|max_len,40',
			'cargo' => 'required|max_len,40|alpha_space',
			'fConfronta' => 'required',
			'hConfronta' => 'required',
			'fdocumento' => 'required',		
			'siglas' => 'required',
			'documento' => 'required'

		));

		if($is_valid === true){
			$is_valid = [];
		}

		return $is_valid;

	}

	
}
