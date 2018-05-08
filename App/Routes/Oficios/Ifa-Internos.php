<?php 
namespace App\Routes\Catalogos;

use Juridico\App\Controllers\Oficios\IfaInternosController;

$controller = new IfaInternosController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){

	$app->get('/Ifa-Internos',function() use ($controller){
		$controller->index();
	});

	$app->get('/Ifa-Internos/Registers',function() use ($controller){
		$controller->get_registers();
	});

	$app->get('/Ifa-Internos/:id',function($id) use ($controller){
		$controller->update_register($id);
	});

	$app->post('/Ifa-Internos/Save',function() use ($controller,$app){
		$controller->Save($app->request->post());
	});



});



?>