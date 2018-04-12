<?php 
namespace Juridico\App\Models\Catalogos;
use Illuminate\Database\Eloquent\Model;


class Textos extends Model {
    
    protected $primaryKey = 'idDocumentoTexto';
    protected $table = 'sia_CatDoctosTextos';
    protected $fillable = ['idTipoDocto','idSubTipoDocumento','nombre','tipo','texto','usrAlta','fAlta','estatus'];
    public $timestamps = false;

 }
