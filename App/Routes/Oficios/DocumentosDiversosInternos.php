<?php 
namespace App\Routes\Catalogos;

use Juridico\App\Controllers\Oficios\DiversosInternosController;

$controller = new DiversosInternosController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){

	$app->get('/Diversos-Internos',function() use ($controller){
		$controller->index();
	});

	$app->get('/Diversos-Internos/Registers',function() use ($controller){
		$controller->get_registers();
	});

	$app->get('/Diversos-Internos/:id',function($id) use ($controller){
		$controller->get_data_confronta($id);
	});

	$app->post('/Diversos-Internos/Save',function() use ($controller,$app){
		$controller->Save($app->request->post());
	});



});



?>