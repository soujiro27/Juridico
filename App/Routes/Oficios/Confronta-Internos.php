<?php 
namespace App\Routes\Catalogos;

use Juridico\App\Controllers\Oficios\ConfrontaInternosController;

$controller = new ConfrontaInternosController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){

	$app->get('/Confrontas-Internos',function() use ($controller){
		$controller->index();
	});

	$app->get('/Confrontas-Internos/Registers',function() use ($controller){
		$controller->get_registers();
	});

	$app->get('/Confrontas-Internos/:id',function($id) use ($controller){
		$controller->get_data_confronta($id);
	});

	$app->post('/Confrontas-Internos/Save',function() use ($controller,$app){
		$controller->Save($app->request->post());
	});



});



?>