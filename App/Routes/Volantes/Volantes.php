<?php 
namespace App\Routes\Catalogos;

use Juridico\App\Controllers\Volantes\VolantesController;

$controller = new VolantesController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){

	$app->get('/Volantes',function() use ($controller){
		$controller->index();
	});

	$app->get('/Volantes/Registers',function() use ($controller){
		$controller->get_registers();
	});

	$app->get('/Volantes/:id',function($id) use ($controller){
		$controller->update_register($id);
	});

	$app->post('/Volantes/Save',function() use ($controller,$app){
		$controller->Save($app->request->post(),$_FILES);
	});

	$app->post('/Volantes/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});

});



?>