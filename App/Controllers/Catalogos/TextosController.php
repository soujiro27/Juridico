<?php  

namespace Juridico\App\Controllers\Catalogos;

use Juridico\App\Controllers\TwigController;

use Juridico\App\Models\Catalogos\Textos;



class TextosController extends TwigController{

	
	private $js = 'Textos';

	public function index(){
		
		echo $this->render('HomeLayout/HomeContainer.twig',[
			'js' => $this->js
		]);

		
	}

	public function get_registers(){

		$textos = Textos::select('sia_CatDoctosTextos.*','t.nombre as subtipo')
				->join('sia_catSubTiposDocumentos as t','t.idSubTipoDocumento','=','sia_CatDoctosTextos.idSubTipoDocumento')
				->get();

		echo json_encode($textos);
	}

	public function new_register($controller){
		//
	}
}
