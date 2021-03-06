<?php 
namespace App\Routes\Catalogos;

use Juridico\App\Controllers\Catalogos\AccionesController;

$controller = new AccionesController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){

	$app->get('/Acciones',function() use ($controller){
		$controller->index();
	});

	$app->get('/Acciones/Registers',function() use ($controller){
		$controller->get_registers();
	});

	$app->get('/Acciones/:id',function($id) use ($controller){
		$controller->update_register($id);
	});

	$app->post('/Acciones/Save',function() use ($controller,$app){
		$controller->Save($app->request->post());
	});

	$app->post('/Acciones/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});

});



?>