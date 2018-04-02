<?php 
namespace App\Routes\Catalogos;

use Juridico\App\Controllers\Catalogos\AccionesController;

$controller = new AccionesController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){

	$app->get('/Acciones',function() use ($controller){
		$_SESSION['modulo'] = 'Acciones';
		$controller->index();
	});

	$app->get('/Acciones/Registers',function() use ($controller){
		$controller->get_registers();
	});

	$app->get('/Acciones/New',function() use ($controller){
		$controller->new_register();
	});

});



?>