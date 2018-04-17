<?php 

namespace Juridico\App\Routes\Api;

use Juridico\App\Controllers\ApiController;

$controller = new ApiController();



 
$app->group('/juridico',function() use($app,$controller){

	#obtiene los documentos
	$app->get('/Api/Documentos',function() use ($app,$controller){
		
		$controller->get_documentos();
		
	});

	#obtiene los sub documentos dependiendo del documento enviado 
	$app->get('/Api/SubDocumentos',function() use ($app,$controller){
		
		$controller->get_subDocumentos($app->request->get());
		
	});

	#obtiene los datos de la tabla carCaracteres
	$app->get('/Api/Caracteres',function() use ($controller){
		
		$controller->get_caracteres();
		
	});

	#obtiene las areas a turnar
	$app->get('/Api/Areas',function() use ($controller){
		
		$controller->get_areas();
		
	});

	#obtiene las acciones de catAcciones
	$app->get('/Api/Acciones',function() use ($controller){
		
		$controller->get_acciones();
		
	});

	


	

});



?>


