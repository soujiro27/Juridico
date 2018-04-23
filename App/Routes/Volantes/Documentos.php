<?php 
namespace App\Routes\Catalogos;

use Juridico\App\Controllers\Volantes\DocumentosController;

$controller = new DocumentosController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){

	$app->get('/DocumentosGral',function() use ($controller){
		$controller->index();
	});

	$app->get('/DocumentosGral/Registers',function() use ($controller){
		$controller->get_registers();
	});

	$app->get('/DocumentosGral/:id/:area',function($id,$area) use ($controller){
		$controller->update_register($id,$area);
	});

	$app->post('/DocumentosGral/Save',function() use ($controller,$app){
		$controller->Save($app->request->post(),$_FILES);
	});

	


});



?>