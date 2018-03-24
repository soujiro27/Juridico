<?php 
namespace Juridico\App\Models\Catalogos;
use Illuminate\Database\Eloquent\Model;


class Caracteres extends Model {
     protected $primaryKey = 'idCaracter';
     protected $table = 'sia_CatCaracteres';
     protected $fillable = ['nombre','usrAlta','estatus'];
     public $timestamps = false;

 }
