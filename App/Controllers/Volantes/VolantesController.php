<?php  

namespace Juridico\App\Controllers\Volantes;



use Juridico\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;

use Juridico\App\Controllers\BaseController;

use Juridico\App\Models\Volantes\Volantes;
use Juridico\App\Models\Volantes\VolantesDocumentos;
use Juridico\App\Models\Volantes\TurnadosJuridico;


class VolantesController extends TwigController{

	
	private $js = 'Volantes';

	public function index(){
		
		$base = new BaseController();
		$notificaciones = $base->get_user_notification($_SESSION['idUsuario']);
		$menu = $base->menu();

		echo $this->render('HomeLayout/HomeContainer.twig',[
			'js' => $this->js,
			'session' => $_SESSION,
			'notificaciones' => $notificaciones->count(),
			'menu' => $menu['modulos']
		]);

		
}

	public function get_registers(){
		
		$now = Carbon::now('America/Mexico_City')->format('Y');
		
		$volantes = Volantes::select('sia_Volantes.*','vd.cveAuditoria','a.clave','sub.nombre','t.idEstadoTurnado','t.idAreaRecepcion')
		->join('sia_VolantesDocumentos as vd','vd.idVolante','=','sia_volantes.idVolante')
		->join('sia_TurnadosJuridico as t','t.idVolante','=','sia_Volantes.idVolante'  )
		->join('sia_auditorias as a','a.idAuditoria','=','vd.cveAuditoria')
		->join('sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','=','vd.idSubTipoDocumento')
		->where('sub.auditoria','SI')
		->where('t.idTipoTurnado','V')
		->whereYear('sia_Volantes.fRecepcion','=',"$now")
		->orderBy("folio","ASC")
		->get();

		echo json_encode($volantes);
	}



	public function Save($data,$file){
		
		$base = new BaseController();
		$datos_director_area = $base->get_data_area($data['idTurnado']);

		$data['estatus'] =  'ACTIVO';
		
		$validate = $this->validate($data);


		if(empty($validate)){

			
			$volantes = new Volantes([
				'idTipoDocto' =>$data['idTipoDocto'],
				'subFolio' => $data['subFolio'],
				'extemporaneo' => $data['extemporaneo'],
				'folio' => $data['folio'],
				'numDocumento' => $data['numDocumento'],
				'anexos' => $data['anexos'],
				'fDocumento' => $data['fDocumento'],
				'fRecepcion' => $data['fRecepcion'],
				'hRecepcion' => $data['hRecepcion'],
				'hRecepcion' => $data['hRecepcion'],
				'idRemitente' => $data['idRemitente'],
				'destinatario' => 'DR. IVAN OLMOS CANSIANO',
				'asunto' => $data['asunto'],
				'idCaracter' => $data['idCaracter'],
				'idAccion' => $data['idAccion'],
				'usrAlta' => $_SESSION['idUsuario']
			]);

			$volantes->save();
			$max = Volantes::all()->max('idVolante');
					
			$volantesDocumentos = new VolantesDocumentos([
				'idVolante' => $max,
				'promocion' => $data['promocion'],
				'cveAuditoria' => $data['cveAuditoria'],
				'idSubTipoDocumento' => $data['idSubTipoDocumento'],
				'notaConfronta' => $data['notaConfronta'],
				'usrAlta' => $_SESSION['idUsuario'],
				'fAlta' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
			]);

			$volantesDocumentos->save();

			$turno = new TurnadosJuridico([
	            'idVolante' => $max,
	            'idAreaRemitente' => 'DGAJ',
	            'idAreaRecepcion' => $data['idTurnado'],
	            'idUsrReceptor' => $datos_director_area[0]['idUsuario'],
	            'idEstadoTurnado' => 'EN ATENCION',
	            'idTipoTurnado' => 'V',
	            'idTipoPrioridad' => $data['idCaracter'],
	            'comentario' => 'SIN COMENTARIOS',
	            'usrAlta' => $_SESSION['idUsuario'],
	            'estatus' => 'ACTIVO',
	            'fAlta' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
        	]);

        	$turno->save();
        	$idTurnadoJuridico =  TurnadosJuridico::all()->max('idTurnadoJuridico');

			
			
			$nombre_file = $file['file']['name'];
			
			if(!empty($nombre_file)){

				$upload = $base->upload_file_areas($file,$max,$idTurnadoJuridico);
				
			}

			$base->send_notificaciones_areas($data);
			$validate[0] = 'success';
		}


		
		echo json_encode($validate);
	}




	public function update_register($id){

		$datos = Volantes::select('sia_volantes.*','idAreaRecepcion')
						->join('sia_TurnadosJuridico as tj','tj.idVolante','=','sia_Volantes.idVolante')
						->where('sia_Volantes.idVolante',"$id")
						->get();
		echo json_encode($datos);
	}


	public function Update($data){
		
		$data['estatus'] =  'ACTIVO';
		$id = $data['idVolante'];

		$validate = $this->validate_update($data);
		$base = new BaseController();
		$datos_director_area = $base->get_data_area($data['idTurnado']);

		if(empty($validate)){

			$vd = VolantesDocumentos::where('idVolante',"$id")->get();
			$data['idSubTipoDocumento'] = $vd[0]['idSubTipoDocumento'];


			Volantes::find($id)->update([
				'numDocumento' => $data['numDocumento'],
				'anexos' => $data['anexos'],
				'fDocumento' => $data['fDocumento'],
				'fRecepcion' => $data['fRecepcion'],
				'asunto' => $data['asunto'],
				'idCaracter' => $data['idCaracter'],
				'idAccion' => $data['idAccion'],
				'usrModificacion' => $_SESSION['idUsuario'],
				'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s'),
			]);

			TurnadosJuridico::where('idVolante',"$id")->where('idTipoTurnado','V')->update([
				'idAreaRecepcion' => $data['idTurnado'],
				'idUsrReceptor' => $datos_director_area[0]['idUsuario'],
				'idTipoPrioridad' => $data['idCaracter'],
				'usrModificacion' => $_SESSION['idUsuario'],
				'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s'),

			]);

			$base->send_notificaciones_areas($data);
		
			$validate[0] = 'success';

		}

		echo json_encode($validate);
		
	}


	public function close($data){

		$id = $data['idVolante'];
		Volantes::find($id)->update([
			'estatus' => 'INACTIVO'
		]);

		TurnadosJuridico::where('idVolante',"$id")->where('idTipoTurnado','V')->update([
			'idEstadoTurnado' => 'CERRADO'
		]);

	}

	public function validate($data){

		
		$estatus = $data['estatus'];
		$folio = $data['folio'];
		$subFolio = $data['subFolio'];
		

		$is_valid = GUMP::is_valid($data,array(
			'idTipoDocto' => 'required|max_len,50|alpha',
			'idSubTipoDocumento' => 'required|max_len,2|numeric',
			'promocion' => 'required|max_len,2|alpha',
			'extemporaneo' => 'required|max_len,2|alpha',
			'folio' => 'required|max_len,4|numeric',
			'subFolio' => 'required|max_len,2|numeric',
			'numDocumento' => 'required|max_len,50',
			'anexos' => 'required|max_len,2|numeric',
			'fDocumento' => 'required',
			'fRecepcion' => 'required',
			'hRecepcion' => 'required|max_len,5',
			'asunto' => 'max_len,50|alpha_space',
			'idCaracter' => 'required|max_len,2|numeric',
			'idTurnado' => 'required|max_len,10|alpha',
			'idAccion' => 'required|max_len,2|numeric',
			'notaConfronta' => 'required|max_len,2|alpha',
			'cveAuditoria' => 'required|max_len,6|numeric',
			'idRemitente' => 'required|max_len,10|alpha'

		));

		if($is_valid === true){
			$is_valid = [];
		}

		$fecha = date("Y",strtotime($data['fRecepcion']));
		
		$res = Volantes::where('folio',"$folio")
						->where('subFolio',"$subFolio")
						->whereYear('fRecepcion',"$fecha")
						->get();

		if($res->isNotEmpty()){
			
			array_push($is_valid, 'Registro Duplicado');
		}

		$base = new BaseController();
		$datos_director_area = $base->get_data_area($data['idTurnado']);
		
		if($datos_director_area->isEmpty()){

			array_push($is_valid, 'El Director NO se encuentra dado de alta ');
		}


		return $is_valid;
	}


	public function validate_update(array $data){

		$estatus = $data['estatus'];
		
		

		$is_valid = GUMP::is_valid($data,array(
			'numDocumento' => 'required|max_len,50',
			'anexos' => 'required|max_len,2|numeric',
			'fDocumento' => 'required',
			'fRecepcion' => 'required',
			'asunto' => 'max_len,50|alpha_space',
			'idCaracter' => 'required|max_len,2|numeric',
			'idTurnado' => 'required|max_len,10|alpha',
			'idAccion' => 'required|max_len,2|numeric'

		));

		if($is_valid === true){
			$is_valid = [];
		}

		

		$base = new BaseController();
		$datos_director_area = $base->get_data_area($data['idTurnado']);
		
		if($datos_director_area->isEmpty()){

			array_push($is_valid, 'El Director NO se encuentra dado de alta ');
		}


		return $is_valid;
	}
}
