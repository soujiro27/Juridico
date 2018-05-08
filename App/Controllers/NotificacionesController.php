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
use Juridico\App\Models\Volantes\Volantes;
use Juridico\App\Models\Volantes\VolantesDocumentos;
use Juridico\App\Models\Volantes\TurnadosJuridico;



class NotificacionesController {

	public function get_rpe_asiste($rpe_boss){

		$puestos = Puestos::where('usrAsisteA',"$rpe_boss")->get();
		$rpe = [];
		foreach ($puestos as $key => $value) {
			array_push($rpe,$puestos[$key]['rpe']);
		}

		return $rpe;
	}

	public function create_message_notifications($tipo,$nombre,$tipoDocumento,$folio){

		$mensaje = 'Mensaje enviado a: '.$nombre.
				"\nHas recibido un ".$tipo.": ".$tipoDocumento.
				"\nCon el folio: ".$folio;

		return $mensaje;

	}

	public function send_notifications($idUsuario,$mensaje){

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

	public function get_notifications($idUsuario){
		
		$notificaciones = Notificaciones::where('idUsuario',"$idUsuario")->where('situacion','NUEVO')->get();

		return $notificaciones;
	}




}


 ?>