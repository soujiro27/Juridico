<?php  
namespace Juridico\App\Controllers;

use Juridico\App\Models\Api\Notificaciones;
use Juridico\App\Models\Api\TiposDocumentos;
use Juridico\App\Models\Api\UsuariosRoles;


class BaseController {

	
	#Regresa todos los datos del Header
	public function headerData($module_name){

		$notificaciones = $this->get_user_notification($_SESSION['idUsuario']);

		$response = array(
			'cuentaPublica' => $_SESSION['sCuentaActual'],
			'modulo' => $module_name,
			'notificaciones' => $notificaciones->count(),
			'usuario' => $_SESSION['sUsuario'],
			'idCuentaActual' => $_SESSION['idCuentaActual']
		);

		return $response;
	}


	#obtiene los modulos que le corresponden al usuario
	public function get_roles_modulos(){

		$idUsuario = $_SESSION['idUsuario'];

		$usuarios_roles = UsuariosRoles::select('m.*')
						->join('sia_rolesmodulos as rm','rm.idRol','=','sia_usuariosroles.idRol')
						->join('sia_modulos as m','m.idModulo','=','rm.idModulo')
						->where('idUsuario',"$idUsuario")
						->get();


		return $usuarios_roles;

	}

	
	#Pide las Notificaciones por el idUsuario
	public function get_user_notification($idUsuario){

		$notificaciones = Notificaciones::where('idUsuario',"$idUsuario")
										->where('situacion','NUEVO')
										->get();
		return $notificaciones;

	}


	#crea el array para el render del home layout
	public function home_layout_data($module_name){

		$url = 'juridico/Templates/HomeLayout/menu.json';
		$data = file_get_contents($url);
		$json = json_decode($data,TRUE);


		$json['header'] = $this->headerData($module_name);

		$roles = $this->get_roles_modulos();

		foreach ($roles as $key => $value) {

			$data = array(
						'modulo' => $value->idModulo,
						'nombre' => $value->nombre,
						'panel' => $value->panel,
						'liga' => $value->liga,
						'icono' => $value->icono
			);

			array_push($json['modulos'][$value->panel]['submenus'],$data);

			
		}

	
		return $json;

	}



}