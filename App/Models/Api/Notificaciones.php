<?php 
namespace Juridico\App\Models\Api;
use Illuminate\Database\Eloquent\Model;


class Notificaciones extends Model {
     
    protected $table = 'sia_notificacionesmensajes';
    protected $fillable = [
    	'idNotificacion', 
		'idUsuario', 
		'mensaje', 
		'idPrioridad', 
		'idImpacto', 
		'usrAlta', 
		'estatus', 
		'situacion', 
		'identificador', 
		'idCuenta', 
		'idAuditoria', 
		'idModulo', 
		'referencia',
		'fAlta'
	];
	 public $timestamps = false;
     
 }
