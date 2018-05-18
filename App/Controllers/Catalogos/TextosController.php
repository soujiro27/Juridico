<?php  

namespace Juridico\App\Controllers\Catalogos;



use Juridico\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;

use Juridico\App\Controllers\BaseController;
use Juridico\App\Controllers\NotificacionesController;

use Juridico\App\Models\Catalogos\Textos;



class TextosController extends TwigController{

	
	private $js = 'Textos';

	public function index(){
		
		$base = new BaseController();
		$notifica = new NotificacionesController();
		$notificaciones = $notifica->get_notifications($_SESSION['idUsuario']);
		$menu = $base->menu();

		echo $this->render('HomeLayout/HomeContainer.twig',[
			'js' => $this->js,
			'session' => $_SESSION,
			'notificaciones' => $notificaciones->count(),
			'menu' => $menu['modulos']
		]);

		
}

	public function get_registers(){
		echo json_encode(Textos::all());
	}



	public function update_register($id){

		$datos = Textos::find($id);
		echo json_encode($datos);
	}


	public function Save($data){
		

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
