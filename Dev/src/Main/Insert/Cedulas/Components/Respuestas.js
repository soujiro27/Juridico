import React, { Component } from 'react';
import { Get } from 'react-axios';
import { GridLoader } from 'react-spinners';
import axios from 'axios';
import ReactTable from 'react-table';
import SelectPuestos from './../../../Form/Select-personal';


import './../../form.styl'
export default class Asignacion extends Component {

    state = {
        message:'',
        visible:{
            modal:false
        }
    }

    columns = [
        {
            Header:'Enviado por:',
            accessor:'siglas'
        },
        {
            Header:'Fecha',
            accessor:'nombre'
        },
        {
            Header:'Hora',
            accessor:'estatus'
        },
        {
            Header:'Comentario',
            accessor:'comentario'
        },
        {
            Header:'Archivo',
            accessor:'archivo'
        }
]

    HandleChange(event){
        event.preventDefault()
        axios.get('/SIA/juridico/Api/Respuestas',{params:{id:event.target.value}}).then(json=>{
            
        })
    }


    
    render(){
        return(
            <Get url='/SIA/juridico/Api/Puestos'>
            {(error, response, isLoading, onReload) => {
                
                if(response !== null) {
                    let datos = response.data
                    return(
                    <div>
                    <form className='Form'>
                        <div className='row bottom'>
                            <div className='col-lg-4'>
                                <label>Respuesta De:</label>
                                <select className='form-contro form-control-sm' onChange={this.HandleChange.bind(this)}>
                                <option value="">Escoga una Opcion</option>
                                {
                                    datos.map(item =>(
                                        <option 
                                key={item.idPuestoJuridico}
                                value={item.idPuestoJuridico}
                            >
                                {item.saludo} {item.nombre} {item.paterno} {item.materno}
                            </option> 
                                    ))
                                }
                                </select>
                            </div>
                        </div>
                    </form>
                    </div>
                    )
                }
                return (<GridLoader
                    color={'#750c05'} 
                    loading={isLoading} 
                />)
            }}
            </Get>
        )
    }
}