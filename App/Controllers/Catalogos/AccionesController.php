<?php  

namespace Juridico\App\Controllers\Catalogos;

use Juridico\App\Controllers\TwigController;

use Juridico\App\Models\Catalogos\Acciones;



class AccionesController extends TwigController{

	private $js = 'Acciones';

	public function index(){
		
		echo $this->render('HomeLayout/HomeContainer.twig',[
			'js' => $this->js
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
}
