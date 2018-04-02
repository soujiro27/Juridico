<?php 
namespace App\Routes\Catalogos;

use Juridico\App\Controllers\Catalogos\TextosController;

$controller = new TextosController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){

	$app->get('/DoctosTextos',function() use ($controller){
		$_SESSION['modulo'] = 'Textos Juridico';
		$controller->index();
	});

	$app->get('/DoctosTextos/Registers',function() use ($controller){
		$controller->get_registers();
	});

	$app->get('/DoctosTextos/New',function() use ($controller){
		$controller->new_register();
	});

});



?>