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



});



?>