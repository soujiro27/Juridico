<?php  
namespace Juridico\App\Controllers;

use Juridico\App\Models\Api\Notificaciones;
use Juridico\App\Models\Api\TiposDocumentos;
use Juridico\App\Models\Api\UsuariosRoles;
use Juridico\App\Models\Api\RolesModulos;

class ApiController {

	
	#Regresa todos los datos del Header
	public function headerData(){

		$notificaciones = $this->get_user_notification($_SESSION['idUsuario']);

		

		$response = array(
			'cuentaPublica' => $_SESSION['sCuentaActual'],
			'modulo' => $_SESSION['moduleName'],
			'notificaciones' => $notificaciones->count(),
			'usuario' => $_SESSION['sUsuario'],
			'idCuentaActual' => $_SESSION['idCuentaActual']
		);

		return $response;
	}


	public function navigation_data(){

		$idUsuario = $_SESSION['idUsuario'];

		$usuarios_roles = UsuariosRoles::where('idUsuario',"$idUsuario")->get();

		$idRol = $usuarios_roles[0]['idRol'];

		$roles = RolesModulos::where('idRol',"$idRol")->where('estatus','ACTIVO')->get();

		$menus = [];

		foreach ($roles as $key => $value) {
			
			array_push($menus,$value->idModulo);
		}


		return $menus;


	}

	
	#Pide las Notificaciones por el idUsuario
	public function get_user_notification($idUsuario){

		$notificaciones = Notificaciones::where('idUsuario',"$idUsuario")
										->where('situacion','NUEVO')
										->get();
		return $notificaciones;

	}


	#obtiene los documentos (OFICIO,NOTA, CIRCULAR)
	public function get_documentos(){


		$documentos = TiposDocumentos::where('tipo','JURIDICO')
									->where('estatus','ACTIVO')
									->get();

		echo json_encode($documentos);

	}

}