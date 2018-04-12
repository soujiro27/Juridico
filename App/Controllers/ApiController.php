<?php  
namespace Juridico\App\Controllers;

use Juridico\App\Models\Api\Notificaciones;
use Juridico\App\Models\Api\TiposDocumentos;
use Juridico\App\Models\Api\UsuariosRoles;
use Juridico\App\Models\Api\Puestos;
use Juridico\App\Models\Api\Usuarios;
use Juridico\App\Models\Catalogos\SubTipos;


use Juridico\App\Models\Catalogos\Textos;


class ApiController {

	public function get_documentos(){

		$documentos = TiposDocumentos::where('tipo','JURIDICO')->where('estatus','ACTIVO')->get();
		echo json_encode($documentos);
	}

	public function get_subDocumentos($data){

		$documento = $data['documento'];
		$sub = SubTipos::where('idTipoDocto',"$documento")
				->where('tipo','JURIDICO')
				->where('estatus','ACTIVO')
				->where('auditoria','SI')
				->get();


		echo json_encode($sub);
	}

}