<?php 
namespace App\Routes\Catalogos;

use Juridico\App\Controllers\Oficios\DocumentosDiversosController;

$controller = new DocumentosDiversosController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){

	$app->get('/DocumentosDiversos',function() use ($controller){
		$controller->index();
	});

	$app->get('/DocumentosDiversos/Registers',function() use ($controller){
		$controller->get_registers();
	});

	$app->get('/DocumentosDiversos/:id',function($id) use ($controller){
		$controller->get_data_confronta($id);
	});

	$app->post('/DocumentosDiversos/Save',function() use ($controller,$app){
		$controller->Save($app->request->post());
	});



});



?>