<?php 

namespace Juridico\App\Models\Api;
use Illuminate\Database\Eloquent\Model;


class TiposDocumentos extends Model {
    protected $primaryKey = 'idTipoDocto';
    protected $table = 'sia_tiposdocumentos';
    public $timestamps = false;
    public $incrementing = false;

 }
