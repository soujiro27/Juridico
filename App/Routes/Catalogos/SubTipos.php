<?php 
namespace App\Routes\Catalogos;

use Juridico\App\Controllers\Catalogos\SubTiposController;

$controller = new SubTiposController();

$auth = function(){
	//echo "yes";
};



$app->group('/juridico',$auth,function() use($controller, $app){

	$app->get('/SubTiposDocumentos',function() use ($controller){
		$_SESSION['modulo'] = 'SubDocumentos';
		$controller->index();
	});

	$app->get('/SubTiposDocumentos/Registers',function() use ($controller){
		$controller->get_registers();
	});

	$app->get('/SubTiposDocumentos/New',function() use ($controller){
		$controller->new_register();
	});

});



?>