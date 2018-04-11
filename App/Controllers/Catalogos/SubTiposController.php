<?php  

namespace Juridico\App\Controllers\Catalogos;



use Juridico\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;

use Juridico\App\Controllers\BaseController;

use Juridico\App\Models\Catalogos\SubTipos;



class SubTiposController extends TwigController{

	private $js = 'SubTipos';

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
		echo json_encode(SubTipos::all());
	}



	public function update_register($id){

		$datos = SubTipos::find($id);
		echo json_encode($datos);
	}


	public function Save($data){
		

		$data['estatus'] = 'ACTIVO';
		$validate = $this->validate($data);


		if(empty($validate)){

			$SubTipos = new SubTipos([
				'idTipoDocto' => $data['idTipoDocto'],
				'nombre' => $data['nombre'],
				'auditoria' => $data['auditoria'],
				'tipo' => 'JURIDICO',
				'usrAlta' => $_SESSION['idUsuario']                                                         
			]);

			$SubTipos->save();
			$validate[0] = 'success';
			

		}

		echo json_encode($validate);
	
	}

	public function Update($data){
		$validate = $this->validate($data);
		$id = $data['id'];

		if(empty($validate)){


			$SubTipos = SubTipos::find($id)->update([
				'idTipoDocto' => strtoupper($data['idTipoDocto']),
				'nombre' => strtoupper($data['nombre']),
				'auditoria' => $data['auditoria'],
				'estatus' => $data['estatus'],
				'usrModificacion' => $_SESSION['idUsuario'],
				'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')

			]);

			$validate[0] = 'success';

		}

		echo json_encode($validate);
	}

	public function validate($data){

		$nombre = $data['nombre'];
		$estatus = $data['estatus'];
		$idTipoDocto = $data['idTipoDocto'];
		$auditoria = $data['auditoria'];

		$is_valid = GUMP::is_valid($data,array(
			'nombre' => 'required|max_len,50|alpha',
			'idTipoDocto' => 'required|max_len,50|alpha',
			'auditoria' => 'required|max_len,2|alpha'
		));

		$accion = SubTipos::where('nombre',"$nombre")
							->where('idTipoDocto',"$idTipoDocto")
							->where('auditoria',"$auditoria")
							->where('estatus',"$estatus")->get();

		
		if($is_valid === true){
			$is_valid = [];
		}

		if($accion->isNotEmpty()){
			
			array_push($is_valid, 'Registro Duplicado');
		}
		
		return $is_valid;
	}

}
