<?php  

namespace Juridico\App\Controllers\Volantes;



use Juridico\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;

use Juridico\App\Controllers\BaseController;

use Juridico\App\Models\Volantes\Volantes;



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
		->where('t.idTipoTurnado','E')
		->whereYear('sia_Volantes.fRecepcion','=',"$now")
		->orderBy("folio","ASC")
		->get();

		echo json_encode($volantes);
	}



	public function update_register($id){

		$datos = Textos::find($id);
		echo json_encode($datos);
	}


	public function Save($data){
		
/*
		$data['estatus'] = 'ACTIVO';
		$validate = $this->validate($data);


		if(empty($validate)){

			$SubTipos = new Textos([
				'idTipoDocto' => $data['idTipoDocto'],
				'idSubTipoDocumento' => $data['idSubTipoDocumento'],
				'texto' => $data['texto'],
				'tipo' => 'JURIDICO',
				'nombre' => 'TEXTO-JURIDICO',
				'usrAlta' => $_SESSION['idUsuario']                                                         
			]);

			$SubTipos->save();
			$validate[0] = 'success';
			

		}

		echo json_encode($validate);
	
*/

		var_dump($data);
	}

	public function Update($data){
		$validate = $this->validate($data);
		$id = $data['id'];

		if(empty($validate)){


			$SubTipos = Textos::find($id)->update([
				'idTipoDocto' => $data['idTipoDocto'],
				'idSubTipoDocumento' => $data['idSubTipoDocumento'],
				'texto' => $data['texto'],
				'estatus' => $data['estatus'],
				'usrModificacion' => $_SESSION['idUsuario'],
				'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')

			]);

			$validate[0] = 'success';

		}

		echo json_encode($validate);
	}

	public function validate($data){

		
		$estatus = $data['estatus'];
		$idTipoDocto = $data['idTipoDocto'];
		$idSubTipoDocumento = $data['idSubTipoDocumento'];

		$is_valid = GUMP::is_valid($data,array(
			'idTipoDocto' => 'required|max_len,50|alpha',
			'idSubTipoDocumento' => 'required|max_len,2|numeric'
		));

		if($is_valid === true){
			$is_valid = [];
		}

		return $is_valid;
	}
}
