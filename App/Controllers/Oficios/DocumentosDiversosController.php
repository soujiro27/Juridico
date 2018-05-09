<?php  

namespace Juridico\App\Controllers\Oficios;



use Juridico\App\Controllers\TwigController;
use GUMP;
use Carbon\Carbon;

use Juridico\App\Controllers\BaseController;
use Juridico\App\Controllers\NotificacionesController;

use Juridico\App\Models\Volantes\Volantes;
use Juridico\App\Models\Volantes\VolantesDocumentos;
use Juridico\App\Models\Volantes\TurnadosJuridico;
use Juridico\App\Models\Api\Puestos;
use Juridico\App\Models\Api\Usuarios;
use Juridico\App\Models\Api\DocumentosSiglas;
use Juridico\App\Models\Api\Espacios;
use Juridico\App\Models\Api\Confrontas;
use Juridico\App\Models\Api\Plantillas;

class DocumentosDiversosController extends TwigController{

	
	private $js = 'DocumentosDiversos';

	public function index(){
		
		$base = new BaseController();
		$notifica = new NotificacionesController();
		$notificaciones = $notifica->get_notifications($_SESSION['idUsuario']);
		$menu = $base->menu();

		echo $this->render('HomeLayout/HomeContainer.twig',[
			'js' => $this->js,
			'session' => $_SESSION,
			'notificaciones' => $notificaciones->count(),
			'menu' => $menu['modulos']
		]);

		
}

	public function get_registers(){
		
		$id = $_SESSION['idEmpleado'];
        $areas = Puestos::where('rpe','=',"$id")->get();
        $area = $areas[0]['idArea'];

        $iracs = Volantes::select('sia_Volantes.*','c.nombre as caracter','a.nombre as accion','t.idEstadoTurnado')
            ->join('sia_catCaracteres as c','c.idCaracter','=','sia_Volantes.idCaracter')
            ->join('sia_CatAcciones as a','a.idAccion','=','sia_Volantes.idAccion')
            ->join('sia_VolantesDocumentos as vd','vd.idVolante','=','sia_Volantes.idVolante')
            ->join( 'sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','=','vd.idSubTipoDocumento')
            ->join('sia_TurnadosJuridico as t','t.idVolante','=','sia_Volantes.idVolante')
            ->where('sub.auditoria','NO')
            ->where('t.idAreaRecepcion','=',"$area")
            ->where('t.idTipoTurnado','V')
            ->get();

		echo json_encode($iracs);
	}

	    public function tipo_cedula($id){

        $tipoQuery = VolantesDocumentos::select('sub.idTipoDocto')
                    ->join('sia_catSubTiposDocumentos as sub','sub.idSubtipoDocumento','=','sia_VolantesDocumentos.idSubtipoDocumento')
                    ->where('sia_VolantesDocumentos.idVolante',"$id")
                    ->get();
        $tipo = $tipoQuery[0]['idTipoDocto'];

        return $tipo;

    }

        public function create_array_cedula($data){

        $id = $data['idVolante'];
        $tipo = $this->tipo_cedula($id);
        $remitente = Volantes::find($id);

        
        $copias = $data['internos'].','.$data['externos'];
        $last = substr($copias,-1);
        $first = substr($copias,0,1);

        

        if($last == ','){

            $copias = substr($copias,0,-1);

        } elseif ( $first == ','){

            $copias = substr($copias,1);
        }



        $datos  = array(
            'idVolante' => $id,
            'numFolio' => $data['numFolio'],
            'fOficio' => $data['fOficio'],
            'idRemitente' => $remitente['idRemitenteJuridico'],
            'texto' => $data['texto'],
            'siglas' => $data['siglas'],
            'copias' => $copias,
            'espacios' => $data['espacios']
        );

        if($tipo == 'OFICIO' || $tipo == 'CIRCULAR'){

            $datos['asunto'] = $data['asunto'];

        } else {

            $datos['idPuestoJuridico'] = $data['idPuestoJuridico'];

        }

        return $datos;
    }

	public function Save(array $data){


		$validate = $this->validate($data);
		$id = $data['idVolante'];
		$plantilla = Plantillas::where('idVolante',"$id")->get();

		if(empty($validate)){

			$tipo = $this->tipo_cedula($id);

			if($plantilla->isEmpty()){


				
				$datos = $this->create_array_cedula($data);
		        $datos['usrAlta'] = $_SESSION['idUsuario'];
		        $plantilla =  new Plantillas($datos);
		        $plantilla->save();
		        $validate[0] = 'success';
		        $validate[1] = $tipo;
			
			} else {

				    $copias = $data['internos'].','.$data['externos'];
			        $last = substr($copias,-1);
			        $first = substr($copias,0,1);

			        

			        if($last == ','){

			            $copias = substr($copias,0,-1);

			        } elseif ( $first == ','){

			            $copias = substr($copias,1);
			        }

				Plantillas::where('idVolante',"$id")->update([
        			'numFolio' => $data['numFolio'],
        			'fOficio' => $data['fOficio'],
        			'texto' => $data['texto'],
        			'siglas' => $data['siglas'],
        			'copias' => $copias,
        			'espacios' => $data['espacios'],
        			'usrModificacion' => $_SESSION['idUsuario'],
					//'fModificacion' => Carbon::now('America/Mexico_City')->format('Y-d-m H:i:s')
				]);

				$validate[0] = 'success';
		        $validate[1] = $tipo;
			}
		}

		echo json_encode($validate);

        
		
	}


	public function get_data_confronta($id){

		$DocumentosDiversos = Plantillas::where('idVolante',"$id")->get();
		if($DocumentosDiversos->isEmpty()){
			$DocumentosDiversos = [];
		}
		$tipo = $this->tipo_cedula($id);
		$DocumentosDiversos[0]['tipo'] = $tipo;
		echo json_encode($DocumentosDiversos);
	}


	public function validate($data){

			$is_valid = GUMP::is_valid($data,array(
			'numFolio' => 'required',
			'texto' => 'required',
			'fOficio' => 'required',
			'siglas' => 'required',

		));

		if($is_valid === true){
			$is_valid = [];
		}

		return $is_valid;

	}

	
}
