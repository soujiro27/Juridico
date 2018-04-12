<?php 
namespace App\Routes\Catalogos;

use Juridico\App\Controllers\Catalogos\TextosController;

$controller = new TextosController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){

	$app->get('/DoctosTextos',function() use ($controller){
		$controller->index();
	});

	$app->get('/DoctosTextos/Registers',function() use ($controller){
		$controller->get_registers();
	});

	$app->get('/DoctosTextos/:id',function($id) use ($controller){
		$controller->update_register($id);
	});

	$app->post('/DoctosTextos/Save',function() use ($controller,$app){
		$controller->Save($app->request->post());
	});

	$app->post('/DoctosTextos/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});

});



?>