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


class TurnadosController extends TwigController{

	private $js = 'Turnos';

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

		$idUsuario = $_SESSION['idUsuario'];
       
        $turnados_propios = TurnadosJuridico::where('idUsrReceptor',"$idUsuario")
        ->get();
        

        $volantes_repetidos = [];
        foreach ($turnados_propios as $key => $value) {
            array_push($volantes_repetidos,$turnados_propios[$key]['idVolante']);
        }

       
        
        $volantes = array_unique($volantes_repetidos);

		  $turnos = Volantes::select('sia_Volantes.*','sub.nombre','c.nombre as caracter','a.nombre as accion','audi.clave')
            ->join('sia_catCaracteres as c','c.idCaracter','=','sia_Volantes.idCaracter')
            ->join('sia_CatAcciones as a','a.idAccion','=','sia_Volantes.idAccion')
            ->join('sia_VolantesDocumentos as vd','vd.idVolante','=','sia_Volantes.idVolante')
            ->leftJoin('sia_auditorias as audi','audi.idAuditoria','=','vd.cveAuditoria')
            ->join( 'sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','=','vd.idSubTipoDocumento')
            ->whereIn('sia_Volantes.idVolante',$volantes)
            ->get();

        echo json_encode($turnos);

	}


	public function Save($data,$file){


		$base = new BaseController();

		$area =  $_SESSION['idArea'];
		$idVolante = $data['idVolante'];
		$idPuestoJuridico = $data['idPuestoJuridico'];

		$datos_puesto = Puestos::where('idPuestoJuridico',"$idPuestoJuridico")->get();
		$rpe = $datos_puesto[0]['rpe'];

		$usuarios = Usuarios::where('idEmpleado',"$rpe")->get();
		$idUsuario = $usuarios[0]['idUsuario'];


		$validate = $this->validate($data);

		if(empty($validate)){

			$turno = new TurnadosJuridico([
	            'idVolante' => $idVolante,
	            'idAreaRemitente' => $area,
	            'idAreaRecepcion' => $area,
	            'idUsrReceptor' => $idUsuario,
	            'idEstadoTurnado' => 'EN ATENCION',
	            'idTipoTurnado' => 'I',
	            'idTipoPrioridad' => $data['idTipoPrioridad'],
	            'comentario' => $data['asunto'],
	            'usrAlta' => $_SESSION['idUsuario'],
	            'estatus' => 'ACTIVO',
	            'fAlta' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
	    	]);

	    	$turno->save();

	    	$idTurnadoJuridico =  TurnadosJuridico::all()->max('idTurnadoJuridico');

	    	$nombre_file = $file['file']['name'];
				
				if(!empty($nombre_file)){

					$base->upload_file_areas($file,$idVolante,$idTurnadoJuridico,'Internos');
					
			}

			$base->notifications_turnados('Turnado Interno',$rpe,$idVolante);
			
			$validate[0] = 'success';
		}

		echo json_encode($validate);

	}



	public function validate(array $data){


		$is_valid = GUMP::is_valid($data,array(
			'idPuestoJuridico' => 'required|max_len,3|numeric',
			'idTipoPrioridad' => 'required|max_len,2|alpha',
			'idVolante' => 'required|numeric',
			

		));

		if($is_valid === true){
			$is_valid = [];
		}

		return $is_valid;
	}

}
