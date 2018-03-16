<?php 
namespace App\Routes\Catalogos;

use Juridico\App\Controllers\Catalogos\CaracteresController;

$controller = new CaracteresController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){

	$app->get('/Caracteres',function() use ($controller){
		$controller->index();
	});

	$app->get('/Caracteres/Registers',function() use ($controller){
		$controller->get_registers();
	});

});



?>