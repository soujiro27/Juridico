<?php 
namespace App\Routes\Oficios;

use Juridico\App\Controllers\Oficios\CedulaController;

$controller = new CedulaController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){


	$app->get('/Cedula/:id',function($id) use ($controller){
		$controller->get_Cedula($id);
	});

	$app->post('/Cedula/Save',function() use ($controller,$app){
		$controller->Save($app->request->post());
	});

	$app->post('/Cedula/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});

	

});



?>