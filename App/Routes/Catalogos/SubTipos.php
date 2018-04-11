<?php 
namespace App\Routes\Catalogos;

use Juridico\App\Controllers\Catalogos\SubTiposController;

$controller = new SubTiposController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){

	$app->get('/SubTiposDocumentos',function() use ($controller){
		$controller->index();
	});

	$app->get('/SubTiposDocumentos/Registers',function() use ($controller){
		$controller->get_registers();
	});

	$app->get('/SubTiposDocumentos/:id',function($id) use ($controller){
		$controller->update_register($id);
	});

	$app->post('/SubTiposDocumentos/Save',function() use ($controller,$app){
		$controller->Save($app->request->post());
	});

	$app->post('/SubTiposDocumentos/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});

});



?>