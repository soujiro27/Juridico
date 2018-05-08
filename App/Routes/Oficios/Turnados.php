<?php 
namespace App\Routes\Oficios;

use Juridico\App\Controllers\Oficios\TurnadosController;

$controller = new TurnadosController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){

	
	$app->post('/TurnadosInternos/Save',function() use ($controller,$app){
		$controller->Save($app->request->post(),$_FILES);
	});

	$app->get('/turnos',function() use ($controller){
		$controller->index();
	});

	$app->get('/turnos/Registers',function() use ($controller){
		$controller->get_registers();
	});



});



?>