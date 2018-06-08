<?php 
namespace Juridico\App\Models\Api;
use Illuminate\Database\Eloquent\Model;


class Plantillas extends Model {
     protected $primaryKey = 'idPlantillaJuridico';
     protected $table = 'sia_plantillasJuridico';
     protected $fillable = [
     	'idVolante',
     	'numFolio',
     	'asunto',
     	'fOficio',
     	'idRemitente',
     	'texto',
     	'siglas',
     	'copias',
     	'espacios',
          'espacios2',	
     	'idPuestoJuridico',
     	'usrAlta',
          'refDocumento',
     	'fAlta',
     	'usrModificacion',
     	'fModificacion'
     ];
     public $timestamps = false;

 }
