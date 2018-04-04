<?php  

namespace Juridico\App\Controllers\Catalogos;

use Juridico\App\Controllers\TwigController;
use GUMP;

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

	public function new_register(){
		
		echo $this->render('HomeLayout/InsertContainer.twig',[
			'js' => $this->js
		]);
	}

	public function update_register($id){

		$datos = Acciones::find($id);
		echo $this->render('HomeLayout/UpdateContainer.twig',[
			'js' => $this->js,
			'datos' => $datos
		]);
	}


	public function Save($data){
		

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

	public function validate($data){

		$nombre = $data['nombre'];

		$is_valid = GUMP::is_valid($data,array(
			'nombre' => 'required|max_len,50|alpha'
		));

		$accion = Acciones::where('nombre',"$nombre")->get();

		
		if($is_valid === true){
			$is_valid = [];
		}

		if($accion->isNotEmpty()){
			
			array_push($is_valid, 'Registro Duplicado');
		}
		
		return $is_valid;
	}


}
