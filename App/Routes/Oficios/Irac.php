<?php 
namespace App\Routes\Catalogos;

use Juridico\App\Controllers\Oficios\IracController;

$controller = new IracController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){

	$app->get('/Irac',function() use ($controller){
		$controller->index();
	});

	$app->get('/Irac/Registers',function() use ($controller){
		$controller->get_registers();
	});

	$app->get('/Irac/:id',function($id) use ($controller){
		$controller->update_register($id);
	});

	$app->post('/Irac/Save',function() use ($controller,$app){
		$controller->Save($app->request->post(),$_FILES);
	});



});



?>