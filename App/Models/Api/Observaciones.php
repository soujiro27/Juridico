<?php 
namespace Juridico\App\Models\Api;
use Illuminate\Database\Eloquent\Model;


class Observaciones extends Model {
     protected $primaryKey = 'idObservacionDoctoJuridico';
     protected $table = 'sia_ObservacionesDoctosJuridico';
     protected $fillable = ['idVolante','idSubTipoDocumento','cveAuditoria','pagina','parrafo','observacion','usrAlta','fAlta','estatus'];
     public $timestamps = false;

 }
