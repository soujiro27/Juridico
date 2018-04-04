<?php  
namespace Juridico\App\Controllers;

use Juridico\App\Models\Api\Notificaciones;
use Juridico\App\Models\Api\TiposDocumentos;
use Juridico\App\Models\Api\UsuariosRoles;
use Juridico\App\Models\Api\Puestos;
use Juridico\App\Models\Api\Usuarios;



class BaseController {


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

		$rpe = $_SESSION['idEmpleado'];

		$asiste = Puestos::select('usrAsisteA')->where('rpe',"$rpe")->get();

		$rpeAsiste = $asiste[0]['usrAsisteA'];

		$usrAsisteA = Usuarios::select('idUsuario')->where('idEmpleado',"$rpeAsiste")->get();

		$idRecibe = $usrAsisteA[0]['idUsuario'];


		$notificaciones = Notificaciones::where('idUsuario',"$idUsuario")
										->Orwhere('idUsuario',"$idRecibe")
										->where('situacion','NUEVO')
										->get();

		return $notificaciones;

	}


	#crea el array para el render del home layout
	public function menu(){

		$url = 'juridico/Templates/HomeLayout/menu.json';
		$data = file_get_contents($url);
		$json = json_decode($data,TRUE);

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