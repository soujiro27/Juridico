<?php 
namespace App\Routes\Catalogos;

use Juridico\App\Controllers\Catalogos\CaracteresController;

$controller = new CaracteresController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){

	$app->get('/Caracteres',function() use ($controller){
		$controller->index();
	});

	$app->get('/Caracteres/Registers',function() use ($controller){
		$controller->get_registers();
	});

	$app->get('/Caracteres/:id',function($id) use ($controller){
		$controller->update_register($id);
	});

	$app->post('/Caracteres/Save',function() use ($controller,$app){
		$controller->Save($app->request->post());
	});

	$app->post('/Caracteres/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});

});



?>