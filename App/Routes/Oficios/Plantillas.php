<?php 
namespace App\Routes\Oficios;

use Juridico\App\Controllers\Oficios\PlantillasController;

$controller = new PlantillasController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){


	$app->get('/Plantillas/:id',function($id) use ($controller){
		$controller->get_Plantillas($id);
	});

	$app->post('/Plantillas/Save',function() use ($controller,$app){
		$controller->Save($app->request->post());
	});

	$app->post('/Plantillas/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});

	

});



?>