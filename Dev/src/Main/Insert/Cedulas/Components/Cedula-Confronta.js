import React, { Component } from 'react';
import {Get} from 'react-axios';
import axios from 'axios';
import ReactTable from 'react-table';
import { GridLoader } from 'react-spinners';

import Text from './../../../Form/Input-Text'
import Fecha from './../../../Form/Input-Date';
import Hora from './../../../Form/Input-Hour';
import Numeric from './../../../Form/Input-Number';
import Hidden from './../../../Form/Input-Hidden';
import Buttons from './../../../Form/Buttons-cedula';


import Modal from './../../../Modal/Components/Modal-form';
export default class CedulaIrac extends Component {
    
    state = {
        visible:{
            render:false,
            nota:false,
            modal:false

        },
        form:{
            nota:'',
            cargo:'',
            fConfronta:'',
            fOficio:'',
            hConfronta:'',
            nombre:'',
            folio:'',
            siglas:'',
            refDocumento:'',
            espacios:''
        },
        message:''
    }

    componentWillMount(){
        let url = '/SIA/juridico/confrontasJuridico/'+this.props.volante
        axios.get(url).then(json => {
            
            if(json.data[0].idConfrontaJuridico != 'null' ){
                //hay datos
                let data = json.data[0] 
            

                let datos = {
                    nota:data.notaInformativa,
                    cargo:data.cargoResponsable,
                    hConfronta:data.hConfronta ,
                    nombre:data.nombreResponsable,
                    folio:data.numFolio,
                    siglas:data.siglas,
                    refDocumento:data.refDocumento,
                    espacios:data.sigla
                } 

                if(json.data[0].notaConfronta == 'SI'){
                    this.setState({
                        form:datos,
                        visible:{
                            render:true,
                            nota:true
                        }
                    })
                } else{
                    this.setState({
                        form:datos,
                        visible:{render:true}
                    })
                }
            } else {
                // NO hay datos
                if(json.data[0].notaConfronta == 'SI'){
                    this.setState({
                        visible:{
                            render:true,
                            nota:true
                        }
                    })
                } else {
                    this.setState({
                        visible:{render:true}
                    })
                }
            }
        })
    }


    HandleSubmit(event){
        event.preventDefault()
        let form = new FormData(event.target)
        form.append('idVolante',this.props.volante)
        axios.post('/SIA/juridico/confrontasJuridico/Save',form).then(json=>{
            this.setState({
                visible:{
                    modal:true,
                    render:true
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
                   render:true
               }
           })

           window.open('/SIA/juridico/App/cedulas/Confronta.php?param1='+this.props.volante)


        } else{
            this.setState({
                visible:{
                    modal:value
                }
            })
        }
    }

    HandlePrint(event){
        event.preventDefault()
        window.open('/SIA/juridico/App/cedulas/Confronta.php?param1='+this.props.volante)
    }


    render(){
       

        if(this.state.visible.render){
            let hour = this.state.form.hConfronta
            
            if(hour){var hourdata = hour.substr(0, 5)}
            
            
            return(
                <div>
                    <form className='Form' onSubmit={this.HandleSubmit.bind(this)}>
                    <div className='row bottom'>
                        {
                            this.state.visible.nota && 
                            <Text 
                                class='col-lg-2 form-group'
                                classInput='form-control form-control-sm'                        
                                label='Nota Informativa'
                                name='notaInformativa'
                                value={this.sate.form.nota}
                            />
                        }

                        <Text 
                            class='col-lg-3 form-group'
                            classInput='form-control form-control-sm'                            
                            label='Nombre'
                            name='nombre'
                            value={this.state.form.nombre}
                        />

                        <Text 
                            classInput='form-control form-control-sm'
                            class='col-lg-3 form-group'
                            label='Cargo'
                            name='cargo'
                            value={this.state.form.cargo}
                        />
                    </div>

                    <div className='row bottom'>

                        <Fecha
                            class='col-lg-3 form-group'
                            classInput='form-control form-control-sm'
                            label='Fecha Confronta'
                            name='fConfronta'
                            value={this.state.form.fConfronta}
                        />
                        <Hora
                            class='col-lg-3 form-group'
                            label='Hora Confronta'
                            name='hConfronta'
                            value={hourdata}
                        />

                        <Fecha
                            class='col-lg-3 form-group'
                            classInput='form-control form-control-sm'
                            label='Fecha Documento'
                            name='fdocumento'
                            value={this.state.form.fOficio}
                        />
                    </div>
                    <div className='row'>
                        <Text 
                                class='col-lg-3 form-group'
                                classInput='form-control form-control-sm'                            
                                label='Siglas'
                                name='siglas'
                                value={this.state.form.siglas}
                            />
                            <Text 
                                class='col-lg-3 form-group'
                                classInput='form-control form-control-sm'                            
                                label='Numero Documento'
                                name='documento'
                                value={this.state.form.folio}
                            />
                            <Text 
                            class='col-lg-3 form-group'
                            classInput='form-control form-control-sm'                            
                            label='Referencia Documento'
                            name='refDocumento'
                            value={this.state.form.refDocumento}
                        />
                    </div>
                    <div className='row'>
                        <Numeric 
                            class='col-lg-3 form-group'
                            classInput='form-control form-control-sm'                            
                            label='Espacios Siglas'
                            name='espaciosSiglas'
                            min='0'
                            value={this.state.form.espacios}
                        />
                    </div>
                    <Buttons cancel={this.props.cancel.bind(this)} print={this.HandlePrint.bind(this)} />
                    </form>
                    {
                        this.state.visible.modal &&
                            <Modal 
                                message={this.state.message} 
                                open={this.state.visible.modal}
                                modalClose={this.HanldeModalClose.bind(this)}
                            />
                    }
                        
                
                </div>
            )
        } else {
            return (<GridLoader
                color={'#750c05'} 
                loading={true} 
            />)
        }
    }


}
