<?php 
namespace Juridico\App\Models\Volantes;
use Illuminate\Database\Eloquent\Model;


class AnexosJuridico extends Model {
     protected $primaryKey = 'idAnexoJuridico';
     protected $table = 'sia_AnexosJuridico';
     protected $fillable = [
     'idTurnadoJuridico',
     'archivoOriginal',
     'archivoFinal',
     'idTipoArchivo',
     'comentario',
     'usrAlta',
     'fAlta',
     'estatus'
     ];
     
     public $timestamps = false;

 }
