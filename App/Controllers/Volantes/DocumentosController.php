<?php  

namespace Juridico\App\Controllers\Volantes;



use Juridico\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;

use Juridico\App\Controllers\BaseController;

use Juridico\App\Models\Volantes\Volantes;
use Juridico\App\Models\Volantes\VolantesDocumentos;
use Juridico\App\Models\Volantes\TurnadosJuridico;


class DocumentosController extends TwigController{

	
	private $js = 'Documentos';

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
		->where('t.idTipoTurnado','V')
		->orderBy("folio","ASC")
		->get();

		echo json_encode($volantes);
	}



	public function Save($data,$file){
		

		$base = new BaseController();
	
		$id = $data['idVolante'];
		$idTurnadoJuridico = $data['idTurnadoJuridico'];

		$nombre_file = $file['file']['name'];

		if(!empty($nombre_file)){

			$upload = $base->upload_file_areas($file,$id,$idTurnadoJuridico,'Areas');
			
		}

		$base->send_notificaciones_documentos($id,$idTurnadoJuridico);

		$validate[0] = 'success';
			
		echo json_encode($validate);
	}




	public function update_register($id,$area){

		$datos = TurnadosJuridico::select('sia_TurnadosJuridico.*','a.fAlta','a.archivoFinal')
				->Leftjoin('sia_Volantes as v ','v.idVolante','=','sia_TurnadosJuridico.idVolante')
				->Leftjoin('sia_AnexosJuridico as a','a.idTurnadoJuridico','=','sia_TurnadosJuridico.idTurnadoJuridico')
				->where('sia_TurnadosJuridico.idVolante',"$id")
				->where('sia_TurnadosJuridico.idAreaRecepcion',"$area")
				->where('sia_TurnadosJuridico.idTipoTurnado','V')
				->get();
		echo json_encode($datos);
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


	
}
