<?php  
namespace Juridico\App\Controllers;

use Juridico\App\Models\Api\Notificaciones;
use Juridico\App\Models\Api\TiposDocumentos;
use Juridico\App\Models\Api\UsuariosRoles;
use Juridico\App\Models\Api\RolesModulos;
use Juridico\App\Models\Api\Modulos;

class ApiController {

	
	#obtiene los documentos (OFICIO,NOTA, CIRCULAR)
	public function get_documentos(){


		$documentos = TiposDocumentos::where('tipo','JURIDICO')
									->where('estatus','ACTIVO')
									->get();

		echo json_encode($documentos);

	}

}