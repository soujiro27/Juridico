<?php  

namespace Juridico\App\Controllers\Catalogos;

use Juridico\App\Controllers\TwigController;

use Juridico\App\Models\Catalogos\SubTipos;



class SubTiposController extends TwigController{

	private $js = 'SubTipos';

	public function index(){
		
		echo $this->render('HomeLayout/HomeContainer.twig',[
			'js' => $this->js
		]);

		
	}

	public function get_registers(){
		echo json_encode(SubTipos::all());
	}

	public function new_register($controller){
		//
	}
}
