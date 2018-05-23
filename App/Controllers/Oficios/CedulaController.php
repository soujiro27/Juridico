<?php  

namespace Juridico\App\Controllers\Oficios;



use Juridico\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;

use Juridico\App\Controllers\BaseController;

use Juridico\App\Models\Volantes\Volantes;
use Juridico\App\Models\Volantes\VolantesDocumentos;
use Juridico\App\Models\Volantes\TurnadosJuridico;
use Juridico\App\Models\Api\Puestos;
use Juridico\App\Models\Api\Usuarios;
use Juridico\App\Models\Api\DocumentosSiglas;
use Juridico\App\Models\Api\Espacios;

class CedulaController extends TwigController{

	public function get_Cedula($id){

	

		$cedula = DocumentosSiglas::select('sia_DocumentosSiglas.*','e.idEspacioJuridico','e.encabezado','e.cuerpo','e.pie')
			->join('sia_EspaciosJuridico as e','e.idVolante','=','sia_DocumentosSiglas.idVolante')
			->where('sia_DocumentosSiglas.idVolante',"$id")
			->get();
		echo json_encode($cedula);
	}

	public function Save(array $data){

		$validate = $this->validate($data);

			$idVolante = $data['idVolante'];
			$vd = VolantesDocumentos::where('idVolante',"$idVolante")->get();
			$subTipo = $vd[0]['idSubTipoDocumento'];
		
		if(empty($validate)){

			$document = DocumentosSiglas::where('idVolante',"$idVolante")->get();

			if($document->isEmpty()){

			  	$documento = new DocumentosSiglas([
	                'idVolante' => $idVolante,
	                'idSubTipoDocumento' => $subTipo,
	                'idPuestosJuridico' => $data['idPuestosJuridico'],
	                'fOficio' => $data['fOficio'],
	                'siglas' => $data['siglas'],
	                'numFolio' => $data['folio'],
	                'usrAlta' => $_SESSION['idUsuario'],
	            ]);

	            $documento->save();

	            $espacios = new Espacios([
	                'idVolante' => $idVolante,
	                'encabezado' => $data['encabezado'],
	                'cuerpo' => $data['cuerpo'],
	                'pie' => $data['pie'],
	                'usrAlta' => $_SESSION['idUsuario']
	            ]);

	            $espacios->save();
	            $validate[0] = 'success';
			} else {

				DocumentosSiglas::where('idVolante',"$idVolante")->update([
	                'idPuestosJuridico' => $data['idPuestosJuridico'],
	                'fOficio' => $data['fOficio'],
	                'siglas' => $data['siglas'],
	                'numFolio' => $data['folio'],
	                'usrModificacion' => $_SESSION['idUsuario'],
	                'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
				]);

				Espacios::where('idVolante',"$idVolante")->update([
					'encabezado' => $data['encabezado'],
	                'cuerpo' => $data['cuerpo'],
	                'pie' => $data['pie'],
	                'usrModificacion' => $_SESSION['idUsuario'],
	               	'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')

				]);

				 $validate[0] = 'success';
			}
	
		}

		echo json_encode($validate);
	}


	public function Update(array $data){


		$id = $data['id'];
	

		$validate = $this->validate($data);
		if(empty($validate)){

			Observaciones::find($id)->update([
				'pagina' => $data['pagina'],
				'parrafon' => $data['parrafo'],
				'observacion' => $data['texto'],
				'estatus' => $data['estatus'],
				'usrModificacion' => $_SESSION['idUsuario'],
				'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
			]);

			$validate[0] = 'success';
		}
		echo json_encode($validate);

	}



	public function validate($data){

		$firmas = $data['idPuestosJuridico'];

			$is_valid = GUMP::is_valid($data,array(
			'siglas' => 'required',
			'folio' => 'required',
			'fOficio' => 'required',
			'idPuestosJuridico' => 'required',
			'encabezado' => 'max_len,2|numeric',
			'cuerpo' => 'max_len,2|numeric',
			'pie' => 'max_len,2|numeric',
		

		));

		$arreglo = explode(',', $firmas);

		if($is_valid === true){
			$is_valid = [];
		}

		if(count($arreglo) > 3){
			array_push($is_valid, 'Solo Pueden Firmar 3 personas Maximo');
		}

		return $is_valid;

	}

}
