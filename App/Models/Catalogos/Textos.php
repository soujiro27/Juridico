<?php 
namespace Juridico\App\Models\Catalogos;
use Illuminate\Database\Eloquent\Model;

use Juridico\App\Models\Catalogos\SubTipos;

class Textos extends Model {
    
    protected $primaryKey = 'idDocumentoTexto';
    protected $table = 'sia_CatDoctosTextos';
    protected $fillable = ['nombre','usrAlta','fAlta','estatus'];
    public $timestamps = false;

 }
