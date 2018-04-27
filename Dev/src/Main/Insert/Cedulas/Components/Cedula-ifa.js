import React, { Component } from 'react';
import {Get} from 'react-axios';
import axios from 'axios';
import ReactTable from 'react-table';
import { GridLoader } from 'react-spinners';

import Text from './../../../Form/Input-Text'
import Fecha from './../../../Form/Input-Date';
import Numeric from './../../../Form/Input-Number';
import Hidden from './../../../Form/Input-Hidden';
import Buttons from './../../../Form/Buttons-cedula';

import ModalFirmas from './../../../Modal/Components/Modal-puestos-firmas';
import ModalTextos from './../../../Modal/Components/Modal-promocion-acciones';
import Modal from './../../../Modal/Components/Modal-form';
export default class CedulaIrac extends Component {
    
    
    state = {
        load:false,
        form:{
            siglas:'',
            fDocumento:'',
            firmas:'',
            folio:'',
            texto:'',
            espacio_obvs:'',
            espacio_texto:'',
            espacio_firmas:''

        },
        puestos:'',
        visible:{
            firmas:false,
            modal:false,
            cedula:false,
            texto:false
        },
        message:''
    }

    

    componentWillMount(){
        console.log(this.props.volante)
        let url ='/SIA/juridico/Cedula/'+this.props.volante

        axios.all([axios.get(url),]).then(axios.spread((datos) => {
            if(datos.data.length > 0){
                
                    this.setState({
                        form:{
                            siglas:datos.data[0].siglas,
                            fDocumento:datos.data[0].fOficio,
                            firmas:datos.data[0].idPuestosJuridico,
                            folio:datos.data[0].numFolio,
                            espacio_obvs:datos.data[0].encabezado,
                            espacio_texto:datos.data[0].cuerpo,
                            espacio_firmas:datos.data[0].pie,
                            texto:datos.data[0].idDocumentoTexto
                        },
                        load:true

                    })
            } else {
                this.setState({
                    load:true,
                })
            }
        }))
    }

    HandleModalFirmas(event){
        event.preventDefault();
        this.setState({
            visible:{
                firmas:true
            }
        })
        
    }

    HandleFirmas(value){
        this.setState({
            visible:{
                firmas:false
            },
            form:{
                firmas:value,
                texto:this.state.form.texto
            }
        })
    }

    HandleSubmit(event){
        event.preventDefault()
        let form = new FormData(event.target)
        form.append('idVolante',this.props.volante)
        axios.post('/SIA/juridico/Ifa/Save',form).then(json=>{
            
            this.setState({
                visible:{
                    modal:true,
                },
                message:json.data[0]
                })
        })
    }


    HanldeModalClose(value){

        if(this.state.message == 'success'){
           this.setState({
               visible:{
                   modal:false,
                   cedula:false
               }
           })

           window.open('/SIA/juridico/App/cedulas/tcpdf/examples/Ifa.php?param1='+this.props.volante)


        } else{
            this.setState({
                visible:{
                    modal:value
                }
            })
        }
    }


    HandleCloseCedula(value){
        this.setState({
            visible:{
                cedula:value
            }
        })
    }

    HandlePrint(event){
        event.preventDefault()
        window.open('/SIA/juridico/App/cedulas/tcpdf/examples/Ifa.php?param1='+this.props.volante)

    }

    HandleModalTexto(event){
        event.preventDefault()
        this.setState({
            visible:{
                texto:true
            }
        })
    }

    HandleTexto(value){
        this.setState({
            form:{
                texto:value,
                firmas:this.state.form.firmas
            },
            visible:{
                texto:false
            }
        })
    }

    render(){
        if(this.state.load){
            return (
                <div>
                    <form className='Form' onSubmit={this.HandleSubmit.bind(this)}>
                    <div className='row bottom'>
                        <Text 
                            class='col-lg-3'
                            label='Siglas'
                            name='siglas'
                            classInput='form-control form-control-sm'
                            value={this.state.form.siglas}
                        />

                        <Fecha 
                            class='col-lg-2'
                            label='Fecha Documento'
                            name='fOficio'
                            classInput='form-control form-control-sm'

                        />
                        <div className='col-lg-2'>
                            <label>Añadir Firmas</label>
                            <button className='btn btn-sm btn-info icon' onClick={this.HandleModalFirmas.bind(this)}>
                                <i className="fas fa-pencil-alt"></i>
                                Firmas
                            </button>
                        </div>

                        <div className='col-lg-3'>
                        <label>Promocion de Acciones</label>
                        <button className='btn btn-sm btn-info icon' onClick={this.HandleModalTexto.bind(this)}>
                            <i className="fas fa-text-height"></i>
                            Texto
                        </button>
                    </div>
                    </div>

                    <div className='row bottom'>

                        <Numeric 
                            class='col-lg-3'
                            label='Espacios Observaciones'
                            max='99'
                            min='0'
                            name='encabezado'
                            classInput='form-control form-control-sm '
                            value={this.state.form.espacio_obvs}
                        />
                        <Numeric 
                        class='col-lg-2'
                            label='Espacios Texto'
                            max='99'
                            min='0'
                            name='cuerpo'
                            classInput='form-control form-control-sm '
                            value={this.state.form.espacio_texto}
                        />
                        <Numeric 
                        class='col-lg-2'
                            label='Espacios Firmas'
                            max='99'
                            min='0'
                            name='pie'
                            classInput='form-control form-control-sm '
                            value={this.state.form.espacio_firmas}
                        />
                        <Hidden name="idPuestosJuridico" value={this.state.form.firmas} />
                        <Hidden name="idDocumentoTexto" value={this.state.form.texto} />
                    </div>
                        <Buttons cancel={this.props.cancel.bind(this)} print={this.HandlePrint.bind(this)} />
                    </form>
                    {
                        this.state.visible.firmas &&
                        <ModalFirmas 
                            open={this.state.visible.firmas}
                            request={this.HandleFirmas.bind(this)}
                        />
                    }
                    {
                        this.state.visible.modal &&
                            <Modal 
                                message={this.state.message} 
                                open={this.state.visible.modal}
                                modalClose={this.HanldeModalClose.bind(this)}
                            />
                    }

                    {
                        this.state.visible.texto &&
                            <ModalTextos 
                            open={this.state.visible.texto}
                            requestTexto={this.HandleTexto.bind(this)}
                            />
                    }
                   
                </div>
            )
        } else {
            return(<GridLoader
                color={'#750c05'} 
                loading={true} 
            />)
        }
    
    }
}
