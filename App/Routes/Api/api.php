<?php 

namespace Juridico\App\Routes\Api;

use Juridico\App\Controllers\ApiController;

$controller = new ApiController();



 
$app->group('/juridico',function() use($app,$controller){
		
	$app->get('/Api/headerData',function() use ($app,$controller){
		
		$controller->headerData();
		
	});

		$app->get('/Api/Documentos',function() use ($controller){
		
		$controller->get_documentos();
		
	});


});



?>


