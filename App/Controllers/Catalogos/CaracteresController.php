<?php  

namespace Juridico\App\Controllers\Catalogos;

use Juridico\App\Controllers\TwigController;

use Juridico\App\Controllers\ApiController;


class CaracteresController extends TwigController{

	private $moduleName = 'Caracteres';
	private $js = 'caracteres';

	public function index(){

		$api_class = new ApiController();
		$header_data = $api_class->headerData();
		$navigation = $api_class->navigation_data();
		
	
		$_SESSION['moduleName'] = $this->moduleName;
		echo $this->render('HomeLayout/HomeContainer.twig',[
			'header' => $header_data,
			'menus' => $navigation
		]); 
	}

	public function get_registers(){

		//echo json_encode(Caracteres::all());
	}
}
