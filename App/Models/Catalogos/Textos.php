<?php 
namespace React\Backend\Models\Catalogos;
use Illuminate\Database\Eloquent\Model;


class Textos extends Model {
     protected $primaryKey = 'idDocumentoTexto';
     protected $table = 'sia_CatDoctosTextos';
     protected $fillable = ['nombre','usrAlta','fAlta','estatus'];
     public $timestamps = false;

 }
