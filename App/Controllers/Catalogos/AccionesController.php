<?php  

namespace Juridico\App\Controllers\Catalogos;

use Juridico\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;

use Juridico\App\Models\Catalogos\Acciones;

use Juridico\App\Controllers\BaseController;



class AccionesController extends TwigController{

	private $js = 'Acciones';

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
		echo json_encode(Acciones::all());
	}



	public function update_register($id){

		$datos = Acciones::find($id);
		echo json_encode($datos);
	}


	public function Save($data){
		

		$data['estatus'] = 'ACTIVO';
		$validate = $this->validate($data);


		if(empty($validate)){

			$accion = new Acciones([
				'nombre' => $data['nombre'],
				'usrAlta' => $_SESSION['idUsuario']                                                         
			]);

			$accion->save();
			$validate[0] = 'success';

		}

		echo json_encode($validate);
	
	}

	public function Update($data){
		$validate = $this->validate($data);
		$id = $data['id'];

		if(empty($validate)){


			$accion = Acciones::find($id)->update([
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

		$is_valid = GUMP::is_valid($data,array(
			'nombre' => 'required|max_len,50|alpha'
		));

		$accion = Acciones::where('nombre',"$nombre")->where('estatus',"$estatus")->get();

		
		if($is_valid === true){
			$is_valid = [];
		}

		if($accion->isNotEmpty()){
			
			array_push($is_valid, 'Registro Duplicado');
		}
		
		return $is_valid;
	}


}
