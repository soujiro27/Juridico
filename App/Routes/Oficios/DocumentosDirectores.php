<?php 
namespace App\Routes\Oficios;

use Juridico\App\Controllers\Oficios\DocumentosDirectoresController;

$controller = new DocumentosDirectoresController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){

	$app->get('/Documentos',function() use ($controller){
		$controller->index();
	});

	$app->get('/Documentos/Registers',function() use ($controller){
		$controller->get_registers();
	});

	$app->get('/Documentos/:id/:area',function($id,$area) use ($controller){
		$controller->update_register($id,$area);
	});

	$app->post('/Documentos/Save',function() use ($controller,$app){
		$controller->Save($app->request->post(),$_FILES);
	});

	


});



?>