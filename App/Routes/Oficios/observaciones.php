<?php 
namespace App\Routes\Oficios;

use Juridico\App\Controllers\Oficios\ObservacionesController;

$controller = new ObservacionesController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){


	$app->get('/Observaciones/:id',function($id) use ($controller){
		$controller->get_observaciones($id);
	});

	$app->post('/Observaciones/Save',function() use ($controller,$app){
		$controller->Save($app->request->post());
	});

	$app->post('/Observaciones/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});

	
});



?>