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
use Juridico\App\Models\Api\Auditorias;
use Juridico\App\Models\Api\AuditoriasUnidades;
use Juridico\App\Models\Api\Unidades;
use Juridico\App\Models\Volantes\VolantesDocumentos;
use Juridico\App\Models\Api\Remitentes;
use Juridico\App\Models\Volantes\TurnadosJuridico;

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

	public function get_subDocumentos_volantesDiversos($data){

		$documento = $data['documento'];
		$sub = SubTipos::where('idTipoDocto',"$documento")
				->where('tipo','JURIDICO')
				->where('estatus','ACTIVO')
				->where('auditoria','NO')
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

	public function get_data_auditoria(array $dato){

		$cuenta = substr($dato['cuenta'], -2);

		if(empty($dato['clave'])){
			$datosAuditoria = array('error' => 'La Auditoria NO existe', );
		}else{
			$cveAuditoria = 'ASCM/'.$dato['clave'].'/'.$cuenta;
			
			$datos = Auditorias::select('idAuditoria', 'tipoAuditoria','rubros','idArea')
			->where('clave',"$cveAuditoria")
			->get();

			if($datos->isEmpty()){
				$datosAuditoria = array('error' => 'La Auditoria NO existe', );
			}else{
				$idAuditoria = $datos[0]['idAuditoria'];

				$unidades = AuditoriasUnidades::select('idCuenta','idSector','idSubsector','idUnidad')
				->where('idAuditoria',"$idAuditoria")
				->get();

				$sector = $unidades[0]['idSector'];
				$subSector = $unidades[0]['idSubsector'];
				$unidad = $unidades[0]['idUnidad'];
				$cuenta = $unidades[0]['idCuenta'];

				$unidades = Unidades::select('nombre')
				->where('idSector',"$sector")
				->where('idSubsector',"$subSector")
				->where('idUnidad',"$unidad")
				->where('idCuenta',"$cuenta")
				->get();

				
				$datosAuditoria = array(
					'sujeto' => $unidades[0]['nombre'],
					'tipo' => $datos[0]['tipoAuditoria'],
					'rubro' => $datos[0]['rubros'],
					'id' => $datos[0]['idAuditoria'],
					'idArea' => $datos[0]['idArea']
				);		
			}
		}

		
		echo json_encode($datosAuditoria);
	}

	public function get_auditoria_turnado(array $dato){


		$cuenta = substr($dato['cuenta'], -2);

		if(empty($dato['clave']))
		{
			$turnos  = array('error' => 'No Hay Datos', );
		}else{

			$clave = 'ASCM/'.$dato['clave'].'/'.$cuenta;
			


			$datos = Auditorias::select('idAuditoria', 'tipoAuditoria','rubros')
			->where('clave',"$clave")
			->get();
			
			$idAuditoria = $datos[0]['idAuditoria'];		

			$turnos = VolantesDocumentos::select('sub.nombre','t.idAreaRecepcion')
			->join('sia_volantes as v','v.idVolante','sia_volantesDocumentos.idVolante')
			->join('sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','sia_volantesDocumentos.idSubTipoDocumento')
			->join('sia_TurnadosJuridico as t','t.idVolante','sia_volantesDocumentos.idVolante')
			->where('sia_volantesDocumentos.cveAuditoria',"$idAuditoria")
			->where('t.idTipoTurnado','V')
			->get();
		}
		echo json_encode($turnos);
	}


	public function get_remitentes(array $data){

		$tipo = $data['tipo'];

		$remitentes  = Remitentes::where('estatus','=','ACTIVO')
        ->where('tipoRemitente','=',"$tipo")
        ->get();

		echo json_encode($remitentes);

	}

	public function get_personal(){

		$area = $_SESSION['idArea'];

		$puestos = Puestos::where('idArea',"$area")->where('estatus','ACTIVO')->get();

		echo json_encode($puestos);
	}


	public function get_persona_cedula(){

		$area = $_SESSION['idArea'];

		$puestos = Puestos::where('idArea',"$area")->where('estatus','ACTIVO')->where('titular','NO')->get();

		echo json_encode($puestos);
		

	}

	public function get_promocion_acciones(){
		
		$textos = Textos::where('tipo','JURIDICO')->where('estatus','ACTIVO')->get();
		echo json_encode($textos);
		
	}

	public function get_turnados_internos($data){
		$idUsuario = $_SESSION['idUsuario'];
		$idVolante = $data['idVolante'];
		$idPuesto = $data['idPuesto'];

		$puestos = Puestos::select('u.idUsuario')
					->join('sia_usuarios as u','u.idEmpleado','=','sia_PuestosJuridico.rpe')
					->where('sia_PuestosJuridico.idPuestoJuridico',"$idPuesto")
					->get();
		$idUsuario_envio = $puestos[0]['idUsuario'];
		

		$turnados_propios = TurnadosJuridico::select('idTurnadoJuridico')
							->where('idVolante',"$idVolante")
							->where('usrAlta',"$idUsuario")
							->where('idUsrReceptor',"$idUsuario_envio")
							->where('idTipoTurnado','I')
							->get();
	
		$turnados_recibidos = TurnadosJuridico::select('idTurnadoJuridico')
							->where('idVolante',"$idVolante")
							->where('usrAlta',"$idUsuario_envio")
							->where('idUsrReceptor',"$idUsuario")
							->where('idTipoTurnado','I')
							->get();

		$propios = $this->array_turnados($turnados_propios);
		$recibidos = $this->array_turnados($turnados_recibidos);

		$res = array_merge($propios,$recibidos);


		$turnados = TurnadosJuridico::select('sia_TurnadosJuridico.*','a.archivoFinal','u.saludo','u.nombre','u.paterno','u.materno')
					->leftJoin('sia_AnexosJuridico as a ','a.idTurnadoJuridico','=','sia_TurnadosJuridico.idTurnadoJuridico')
					->join('sia_usuarios as u','u.idUsuario','=','sia_TurnadosJuridico.usrAlta')
					->whereIn('sia_TurnadosJuridico.idTurnadoJuridico',$res)
					->orderBy('sia_TurnadosJuridico.fAlta','DESC')
					->get();

		echo json_encode($turnados);
	}


		public function array_turnados($data) {
		$id = [];
		foreach ($data as $key => $value) {
			array_push($id,$data[$key]['idTurnadoJuridico']);
		}
		return $id;
	}


	public function get_firma_nota(){

		$personal = Puestos::where('firmaNota','SI')
									->where('estatus','ACTIVO')
									->get();
		echo json_encode($personal);

	}

}

