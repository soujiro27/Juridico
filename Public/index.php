<?php 
include '/../App/vendor/autoload.php';

$root_directory = '/../App/routes/';

/*--------------Catalogos-------------------*/
include_once $root_directory.'Catalogos/Caracteres.php';
include_once $root_directory.'Catalogos/Acciones.php';
include_once $root_directory.'Catalogos/SubTipos.php';
include_once $root_directory.'Catalogos/Textos.php';


/*-------------Volantes----------------------*/
include_once $root_directory.'Volantes/Volantes.php';
include_once $root_directory.'Volantes/volantesDiversos.php';
include_once $root_directory.'Volantes/Documentos.php';


/*----------oficios------------------------*/
//include_once '/../routes/oficios/irac.php';
//include_once '/../routes/oficios/Confrontas.php';
//include_once '/../routes/oficios/ifa.php';
//include_once '/../routes/oficios/diversos.php';

/*----------Documentos---------------------*/

//include_once '/../routes/documentos/direccion.php';
//include_once '/../routes/documentos/directores.php';







/*-------Turnados----------------------------*/
//include_once '/../routes/oficios/Turnados.php';

/*------------ Api --------------------------*/
include_once $root_directory.'Api/api.php';

/*----------------Datos DB ------------------*/
include_once '/../../src/conexion.php';

use Illuminate\Database\Capsule\Manager as Capsule;
$capsule = new Capsule;
$capsule->addConnection([
    'driver'    => 'sqlsrv',
    'host'      => $hostname,
    'database'  => $database,
    'username'  => $username,
    'password'  => $password,
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => '',
]);
$capsule->setAsGlobal();
$capsule->bootEloquent();



/*------------------- 404 ---------------------*/
$app->notFound(function () use ($app) {
   $app->render('/react/public/404.html');
});