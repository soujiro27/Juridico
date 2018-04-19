<?php  
namespace Juridico\App\Controllers;

use Carbon\Carbon;

use Juridico\App\Models\Api\Notificaciones;
use Juridico\App\Models\Api\TiposDocumentos;
use Juridico\App\Models\Api\UsuariosRoles;
use Juridico\App\Models\Api\Puestos;
use Juridico\App\Models\Api\Usuarios;
use Juridico\App\Models\Volantes\AnexosJuridico;
use Juridico\App\Models\Catalogos\SubTipos;

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


	public function get_data_area($area){

		$datos = Puestos::select('sia_PuestosJuridico.*','u.idUsuario')
				->join('sia_usuarios as u','u.idEmpleado','=','sia_PuestosJuridico.rpe')
				->where('sia_PuestosJuridico.titular','SI')
				->where('sia_PuestosJuridico.idArea',"$area")
				->get();

		return $datos;
	}


	public function upload_file_areas($file,$idVolante,$idTurnadoJuridico){

		$nombre_file = $file['file']['name'];
		$extension = explode('.',$nombre_file);
		$nombre_final = $idTurnadoJuridico.'.'.$extension[1];

		$directory ='juridico/files/'.$idVolante.'/Areas';
    
        $extension = explode('.',$nombre_file);

        if(!file_exists($directory)){
                    
            mkdir($directory,0777,true);
        } 

        

        if(move_uploaded_file($file['file']['tmp_name'],$directory.'/'.$nombre_final)){


	        $anexo = new AnexosJuridico([
	    		'idTurnadoJuridico' => $idTurnadoJuridico,
	    		'archivoOriginal' => $nombre_file,
	    		'archivoFinal' => $nombre_final,
	    		'idTipoArchivo' => $extension[1],
	    		'usrAlta' => $_SESSION['idUsuario'],
	            'estatus' => 'ACTIVO'
	            ]);

	    	$anexo->save();
	    	return true;
        } else {
        	return false;
        }

	}


	public function get_id_usr($rpe){

		$usuarios = Usuarios::where('idEmpleado',"$rpe")->where('estatus','ACTIVO')->get();
		$idUsuario = $usuarios[0]['idUsuario'];
		return $idUsuario;
	}

	public function send_notificaciones_areas($data){

		$subDocumento = $data['idSubTipoDocumento'];
		$turnado=$data['idTurnado'];
		
		$datos_area = $this->get_data_area($turnado);
		$rpe = $datos_area[0]['rpe'];
		$nombre = $datos_area[0]['saludo'] .' '.$datos_area[0]['nombre'].' '.$datos_area[0]['paterno'].' '.$datos_area[0]['materno'];

		$usuarios[0] = $this->get_id_usr($rpe);

		$subtipos = SubTipos::find($subDocumento);
		$documento = $subtipos['nombre'];

		
		$mensaje = 'Mensaje enviado a: '.$nombre.
				"\nHas recibido un ".$documento.
				"\nCon el folio: ".$data['folio'];


		$puestos = Puestos::where('usrAsisteA',"$rpe")->where('estatus','ACTIVO')->get();

		foreach ($puestos as $key => $value) {
			array_push($usuarios,$this->get_id_usr($value['rpe']));
		}

		foreach ($usuarios as $key => $value) {
			$this->save_notificaciones($value,$mensaje);
		}

		

	}


	public function save_notificaciones($idUsuario,$mensaje){

		$notifica = new Notificaciones([
				'idNotificacion' => '1',
				'idUsuario' => $idUsuario,
				'mensaje' => $mensaje,
				'idPrioridad' => 'ALTA',
				'idImpacto' => 'MEDIO',
				'fAlta' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s'),
				'usrAlta' => $_SESSION['idUsuario'],
				'estatus' => 'ACTIVO',
				'situacion' => 'NUEVO',
				'identificador' => '1',
				'idCuenta' => $_SESSION['idCuentaActual'],
				'idAuditoria' => '1',
				'idModulo' => 'Volantes',
				'referencia' => 'idVolante'
	 
			]);
			$notifica->save();


	}

}