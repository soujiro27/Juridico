<?php 

namespace Juridico\App\Routes\Api;

use Juridico\App\Controllers\ApiController;

$controller = new ApiController();



 
$app->group('/juridico',function() use($app,$controller){


	$app->get('/Api/tester',function() use ($app,$controller){
		
		$controller->tester($app->request->get());
		
	});

		
	$app->get('/Api/HomeData',function() use ($app,$controller){
		
		$controller->home_layout_data();
		
	});

		$app->get('/Api/Documentos',function() use ($controller){
		
		$controller->get_documentos();
		
	});


});



?>


