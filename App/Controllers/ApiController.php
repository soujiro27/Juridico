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
			->where('t.idTipoTurnado','E')
			->get();
		}
		echo json_encode($turnos);
	}

}