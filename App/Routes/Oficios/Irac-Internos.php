<?php 
namespace App\Routes\Catalogos;

use Juridico\App\Controllers\Oficios\IracInternosController;

$controller = new IracInternosController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){

	$app->get('/Irac-Internos',function() use ($controller){
		$controller->index();
	});

	$app->get('/Irac-Internos/Registers',function() use ($controller){
		$controller->get_registers();
	});

	$app->get('/Irac-Internos/:id',function($id) use ($controller){
		$controller->update_register($id);
	});

	$app->post('/Irac-Internos/Save',function() use ($controller,$app){
		$controller->Save($app->request->post(),$_FILES);
	});



});



?>