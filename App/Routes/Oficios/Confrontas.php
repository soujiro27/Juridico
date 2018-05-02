<?php 
namespace App\Routes\Catalogos;

use Juridico\App\Controllers\Oficios\ConfrontaController;

$controller = new ConfrontaController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){

	$app->get('/confrontasJuridico',function() use ($controller){
		$controller->index();
	});

	$app->get('/confrontasJuridico/Registers',function() use ($controller){
		$controller->get_registers();
	});

	$app->get('/confrontasJuridico/:id',function($id) use ($controller){
		$controller->get_data_confronta($id);
	});

	$app->post('/confrontasJuridico/Save',function() use ($controller,$app){
		$controller->Save($app->request->post());
	});



});



?>