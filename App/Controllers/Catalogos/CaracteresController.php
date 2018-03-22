<?php  

namespace Juridico\App\Controllers\Catalogos;

use Juridico\App\Controllers\TwigController;

use Juridico\App\Controllers\BaseController;


class CaracteresController extends TwigController{

	private $moduleName = 'Caracteres';
	private $js = 'caracteres';

	public function index(){
		
		$base = new BaseController();
		$home = $base->home_layout_data($this->moduleName);
		echo $this->render('HomeLayout/HomeContainer.twig',[
			'js' => $this->js
		]);

		
	}

	public function get_registers(){

		//echo json_encode(Caracteres::all());
	}
}
