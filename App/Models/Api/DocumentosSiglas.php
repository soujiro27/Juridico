<?php 
namespace Juridico\App\Models\Api;
use Illuminate\Database\Eloquent\Model;


class DocumentosSiglas extends Model {
     protected $primaryKey = 'idDocumentoSiglas';
     protected $table = 'sia_DocumentosSiglas';
     protected $fillable = ['idVolante','idSubTipoDocumento','idDocumentoTexto','idPuestosJuridico','fOficio','siglas','numFolio','usrAlta','estatus','usrModificacion','fModificacion'];
     public $timestamps = false;

 }
