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
use Juridico\App\Models\Api\Observaciones;

class ObservacionesController extends TwigController{

	public function get_observaciones($id){

		$observaciones = Observaciones::where('idVolante',"$id")->get();
		echo json_encode($observaciones);
	}

}
