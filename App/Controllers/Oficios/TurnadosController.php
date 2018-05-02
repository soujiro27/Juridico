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


class TurnadosController extends TwigController{




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

			$base->send_notificaciones_internos($idVolante,$idTurnadoJuridico,$idPuestoJuridico);
			
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
