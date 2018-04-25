<?php 
namespace Juridico\App\Models\Api;
use Illuminate\Database\Eloquent\Model;


class Espacios extends Model {
     protected $primaryKey = 'idEspacioJuridico ';
     protected $table = 'sia_EspaciosJuridico';
     protected $fillable = [  
     	'idVolante',
		'encabezado',
		'cuerpo',
		'pie',
		'usrAlta',
		'usrModificacion',
		'fModificacion'
	];
     public $timestamps = false;

 }
