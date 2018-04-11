<?php  

namespace Juridico\App\Controllers\Catalogos;

use Juridico\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;



use Juridico\App\Controllers\BaseController;

use Juridico\App\Models\Catalogos\Caracteres;



class CaracteresController extends TwigController{

	private $js = 'Caracteres';

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
		echo json_encode(Caracteres::all());
	}



	public function update_register($id){

		$datos = Caracteres::find($id);
		echo json_encode($datos);
	}


	public function Save($data){
		

		$data['estatus'] = 'ACTIVO';
		$validate = $this->validate($data);


		if(empty($validate)){

			$Caracteres = new Caracteres([
				'siglas' => $data['siglas'],
				'nombre' => $data['nombre'],
				'usrAlta' => $_SESSION['idUsuario']                                                         
			]);

			$Caracteres->save();
			$validate[0] = 'success';

		}

		echo json_encode($validate);
	
	}

	public function Update($data){
		$validate = $this->validate($data);
		$id = $data['id'];

		if(empty($validate)){


			$accion = Caracteres::find($id)->update([
				'siglas' => strtoupper($data['siglas']),
				'nombre' => strtoupper($data['nombre']),
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
		$siglas = $data['siglas'];

		$is_valid = GUMP::is_valid($data,array(
			'nombre' => 'required|max_len,10|alpha',
			'siglas' => 'required|max_len,2|alpha'
		));

		$accion = Caracteres::where('nombre',"$nombre")
							->where('siglas',"$siglas")
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
