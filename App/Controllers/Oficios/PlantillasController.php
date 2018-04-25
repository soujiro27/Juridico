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
use Juridico\App\Models\Api\Plantillas;

class PlantillasController extends TwigController{

	public function get_Plantillas($id){

		$plantillas = Plantillas::where('idVolante',"$id")->get();
		echo json_encode($plantillas);
	}

	public function Save(array $data){


		$idVolante = $data['idVolante'];
		$vd = VolantesDocumentos::where('idVolante',"$idVolante")->get();
		$subTipo = $vd[0]['idSubTipoDocumento'];
		$clave = $vd[0]['cveAuditoria'];

		$validate = $this->validate($data);
		if(empty($validate)){

			$observacion = new Observaciones([
				'idVolante' => $data['idVolante'],
				'idSubTipoDocumento' => $subTipo,
				'cveAuditoria' => $clave,
				'pagina' => $data['pagina'],
				'parrafo' => $data['parrafo'],
				'observacion' => $data['texto'],
				'usrAlta' => $_SESSION['idUsuario']
			]);

			$observacion->save();
			$validate[0] = 'success';
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
			'pagina' => 'required|max_len,3|numeric',
			'parrafo' => 'required|max_len,20|alpha',
			'texto' => 'required'

		));

		if($is_valid === true){
			$is_valid = [];
		}

		return $is_valid;

	}

}
