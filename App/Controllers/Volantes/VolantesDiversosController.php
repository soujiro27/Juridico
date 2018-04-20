<?php  

namespace Juridico\App\Controllers\Volantes;



use Juridico\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;

use Juridico\App\Controllers\BaseController;

use Juridico\App\Models\Volantes\Volantes;
use Juridico\App\Models\Volantes\VolantesDocumentos;
use Juridico\App\Models\Volantes\TurnadosJuridico;


class VolantesDiversosController extends TwigController{

	
	private $js = 'VolantesDiversos';

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
		
		$volantes = Volantes::select('sia_Volantes.*','vd.cveAuditoria','sub.nombre','t.idEstadoTurnado','t.idAreaRecepcion','t.idAreaRemitente')
		->join('sia_VolantesDocumentos as vd','vd.idVolante','=','sia_volantes.idVolante')
		->join('sia_TurnadosJuridico as t','t.idVolante','=','sia_Volantes.idVolante'  )
		->join('sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','=','vd.idSubTipoDocumento')
		->where('sub.auditoria','NO')
		->where('t.idTipoTurnado','VD')
		->whereYear('sia_Volantes.fRecepcion','=',"$now")
		->orderBy("folio","ASC")
		->get();

		echo json_encode($volantes);
	}



	public function Save($data,$file){
		
	

		$base = new BaseController();
	

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
				'destinatario' => 'DR. IVAN OLMOS CANSIANO',
				'asunto' => $data['asunto'],
				'idRemitente' => $data['idRemitente'],
				'idRemitenteJuridico' => $data['idRemitenteJuridico'],
				'idCaracter' => $data['idCaracter'],
				'idAccion' => $data['idAccion'],
				'usrAlta' => $_SESSION['idUsuario']
			]);

			$volantes->save();
			$max = Volantes::all()->max('idVolante');

			
					
			$volantesDocumentos = new VolantesDocumentos([
				'idVolante' => $max,
				'promocion' => 'NO',
				'idSubTipoDocumento' => $data['idSubTipoDocumento'],
				'notaConfronta' => 'NO',
				'usrAlta' => $_SESSION['idUsuario'],
				
			]);

			$volantesDocumentos->save();

			$areas = explode(',',$data['idTurnado']);

			foreach ($areas as $key => $value) {

				$datos_director_area = $base->get_data_area($value);
				
				$turno = new TurnadosJuridico([
		            'idVolante' => $max,
		            'idAreaRemitente' => 'DGAJ',
		            'idAreaRecepcion' => $value,
		            'idUsrReceptor' => $datos_director_area[0]['idUsuario'],
		            'idEstadoTurnado' => 'EN ATENCION',
		            'idTipoTurnado' => 'VD',
		            'idTipoPrioridad' => $data['idCaracter'],
		            'comentario' => 'SIN COMENTARIOS',
		            'usrAlta' => $_SESSION['idUsuario'],
		            'estatus' => 'ACTIVO',
		            'fAlta' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
        		]);

        		$turno->save();
			}

			

        	
        	$idTurnadoJuridico =  TurnadosJuridico::all()->max('idTurnadoJuridico');

			
			
			$nombre_file = $file['file']['name'];
			
			if(!empty($nombre_file)){

				$upload = $base->upload_file_areas($file,$max,$idTurnadoJuridico);
				
			}

			foreach ($areas as $key => $value) {
				
				$data['idTurnado'] = $value;
				$base->send_notificaciones_areas($data);
			}
			
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
		$turnados = $data['idTurnado'];

		$is_valid = GUMP::is_valid($data,array(
			'idTipoDocto' => 'required|max_len,50|alpha',
			'idSubTipoDocumento' => 'required|max_len,2|numeric',
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
			'idTurnado' => 'required|max_len,30',
			'idAccion' => 'required|max_len,2|numeric',
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

		$areas = explode(',',$turnados);
		

		foreach ($areas as $key => $value) {
			
			
			$datos_director_area = $base->get_data_area($value);

				if($datos_director_area->isEmpty()){

				array_push($is_valid, 'El Director de: '.$value.' NO se encuentra dado de alta ');
			}
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
