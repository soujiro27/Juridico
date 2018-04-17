<?php  
namespace Juridico\App\Controllers;

use Juridico\App\Models\Api\Notificaciones;
use Juridico\App\Models\Api\TiposDocumentos;
use Juridico\App\Models\Api\UsuariosRoles;
use Juridico\App\Models\Api\Puestos;
use Juridico\App\Models\Api\Usuarios;
use Juridico\App\Models\Catalogos\SubTipos;


use Juridico\App\Models\Catalogos\Textos;
use Juridico\App\Models\Catalogos\Caracteres;
use Juridico\App\Models\Api\Areas;
use Juridico\App\Models\Catalogos\Acciones;

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

	public function get_caracteres(){

		$caracteres = Caracteres::where('estatus','ACTIVO')->get();
		echo json_encode($caracteres);
	}

	public function get_areas(){

		$areas = Areas::whereIn('idArea',['DGAJ','DAJPA','DCPA','DIJPA','DN'])->get();
		echo json_encode($areas);
	}

	public function get_Acciones(){
		$acciones = Acciones::where('estatus','ACTIVO')->get();
		echo json_encode($acciones);
	}

}