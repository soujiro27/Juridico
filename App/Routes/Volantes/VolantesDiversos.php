<?php 
namespace App\Routes\Catalogos;

use Juridico\App\Controllers\Volantes\VolantesDiversosController;

$controller = new VolantesDiversosController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){

	$app->get('/VolantesDiversos',function() use ($controller){
		$controller->index();
	});

	$app->get('/VolantesDiversos/Registers',function() use ($controller){
		$controller->get_registers();
	});

	$app->get('/VolantesDiversos/:id',function($id) use ($controller){
		$controller->update_register($id);
	});

	$app->post('/VolantesDiversos/Save',function() use ($controller,$app){
		$controller->Save($app->request->post(),$_FILES);
	});

	$app->post('/VolantesDiversos/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});

	$app->post('/VolantesDiversos/Close',function() use ($controller,$app){
		$controller->Close($app->request->post());
	});

});



?>