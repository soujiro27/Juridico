<?php  

namespace Juridico\App\Controllers\Catalogos;

use Juridico\App\Controllers\TwigController;

use Juridico\App\Models\Catalogos\Caracteres;



class CaracteresController extends TwigController{

	private $moduleName = 'Caracteres';
	private $js = 'caracteres';

	public function index(){
		
		echo $this->render('HomeLayout/HomeContainer.twig',[
			'js' => $this->js
		]);

		
	}

	public function get_registers(){
		echo json_encode(Caracteres::all());
	}
}
