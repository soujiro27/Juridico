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
        },
        data:[]
    }

    columns = [
        {
            Header:'Enviado por:',
            accessor:props =>{
                let nombre = props.saludo + ' ' + props.nombre + ' ' + props.materno + ' ' + props.paterno 
                return nombre
            },
            id:'id'
        },
        {
            Header:'Fecha',
            accessor:props =>{
                let fecha = props.fAlta
                let fFinal = fecha.substring(0,10)
                return fFinal

            },
            id:'idFecha'
        },
        {
            Header:'Hora',
            accessor:props =>{
                let fecha = props.fAlta
                let fFinal = fecha.substring(11,16)
                return fFinal
            },
            id:'idHora'
        },
        {
            Header:'Comentario',
            accessor:'comentario'
        },
        {
            Header:'Archivo',
            accessor:props => {
                if(props.archivoFinal == null){
                    return 'Sin Archivo'
                } else{
                    return <a href={'/SIA/juridico/Files/'+this.props.volante +'/Internos/' + props.archivoFinal}>{props.archivoFinal}</a>
                }
            },
            id:'idFile'
        }
]

    HandleChange(event){
        event.preventDefault()
        axios.get('/SIA/juridico/Api/Respuestas',{params:{idPuesto:event.target.value,idVolante:this.props.volante}}).then(json=>{
            this.setState({
                data:json.data
            })
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
                    <ReactTable 
                        data={this.state.data}
                        columns={this.columns}
                        pageSizeOptions={[5]}
                        defaultPageSize={5}
                        className="-highlight"
                        previousText='Anterior'
                        nextText='Siguiente'
                        noDataText='Sin Datos'
                        pageText='Pagina'
                        ofText= 'de'
                        //getTrProps={this.HandleClickTr.bind(this)}
                    />
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