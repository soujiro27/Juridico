<?php 
namespace Juridico\App\Routes\Catalogos;

use Juridico\App\Controllers\Oficios\IfaController;

$controller = new IfaController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){

	$app->get('/Ifa',function() use ($controller){
		$controller->index();
	});

	$app->get('/Ifa/Registers',function() use ($controller){
		$controller->get_registers();
	});

	$app->get('/Ifa/:id',function($id) use ($controller){
		$controller->update_register($id);
	});

	$app->post('/Ifa/Save',function() use ($controller,$app){
		$controller->Save($app->request->post());
	});



});



?>