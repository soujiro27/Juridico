<?php 
namespace Juridico\App\Models\Catalogos;
use Illuminate\Database\Eloquent\Model;


class SubTipos extends Model {
     protected $primaryKey = 'idSubTipoDocumento';
     protected $table = 'sia_catSubTiposDocumentos';
     protected $fillable = ['nombre','usrAlta','fAlta','estatus'];
     public $timestamps = false;

 }
