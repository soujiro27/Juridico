import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import { GridLoader } from 'react-spinners';

import Text from './../../../Form/Input-Text'
import Fecha from './../../../Form/Input-Date';
import Hora from './../../../Form/Input-Hour';
import Numeric from './../../../Form/Input-Number';
import Hidden from './../../../Form/Input-Hidden';
import TextEditor from './../../../Form/Text-editor';
import Buttons from './../../../Form/Buttons-cedula';

import Modal from './../../../Modal/Components/Modal-form';
import ModalInterno from './../../../Modal/Components/Modal-remitentes-internos';
import ModalNota from './../../../Modal/Components/Modal-nota-puestos';
export default class CedulaIrac extends Component {
    
    state = {
        visible:{
            modal:false,
            interno:false,
            externos:false,
            puestos:false,
            render:false

        },
        form:{
            folio:'',
            siglas:'',
            fOficio:'',
            espacios:'',
            internos:'',
            externos:'',
            asunto:'',
            texto:'',
            puestos:'',
            espaciosCopias:'',
            espaciosSiglas:''
        },
        message:'',
        tipo:''
    }

    componentWillMount(){
        let url = '/SIA/juridico/DocumentosDiversos/'+this.props.volante
        axios.get(url).then(json=>{
            this.setState({
                form:{
                    folio:json.data[0].numFolio,
                    siglas:json.data[0].siglas,
                    fOficio:json.data[0].fOficio,
                    espacios:json.data[0].espacios,
                    asunto:json.data[0].asunto,
                    texto:json.data[0].texto,
                    espaciosCopias:json.data[0].copia,
                    espaciosSiglas:json.data[0].sigla
                },
                visible:{render:true},
                tipo:json.data[0].tipo

            })
        })
    }

  
    HandleSubmit(event){
        event.preventDefault()
        let form = new FormData(event.target)
        form.append('texto',this.state.form.texto)
        form.append('idVolante',this.props.volante)
        axios.post('/SIA/juridico/DocumentosDiversos/Save',form).then(json=>{
            
            this.setState({
                visible:{
                    modal:true,
                    render:true
                },
                message:json.data[0],
                tipo:json.data[1]
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

        window.open('/SIA/juridico/App/cedulas/'+this.state.tipo+'.php?param='+this.props.volante)


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
        window.open('/SIA/juridico/App/cedulas/'+this.state.tipo+'.php?param='+this.props.volante)
    }

    HandleModalInternos(event){
        event.preventDefault()
        this.setState({
            visible:{
                interno:true,
                render:true
            }
        })
    }

    HandleModalExternos(event){
        event.preventDefault()
        this.setState({
            visible:{
                externos:true,
                render:true
            }
        })
    }

    HandleModalPuestos(event){
        event.preventDefault()
        this.setState({
            visible:{
                puestos:true,
                render:true
            }
        })
    }

    requestInternos(value){
        this.setState({
            visible:{
                interno:false,
                render:true
            },
            form:{
                internos:value,
                externos:this.state.form.externos,
                texto:this.state.form.texto,
                puestos:this.state.form.puestos
            }
        })
    }

    requestExternos(value){
        this.setState({
            visible:{
                externo:false,
                render:true
            },
            form:{
                externos:value,
                internos:this.state.form.internos,
                texto:this.state.form.texto,
                puestos:this.state.form.puestos
            }
        })
    }

    requestNota(value){
        console.log(value)
        this.setState({
            visible:{
                puestos:false,
                render:true
            },
            form:{
                puestos:value,
                externos:this.state.form.externos,
                internos:this.state.form.internos,
                texto:this.state.form.texto
                
            }
        })
    }

    HandleChangeTextEditor(value){
        this.setState({
            form:{
                texto:value,
                externos:this.state.form.externos,
                internos:this.state.form.internos,
                puestos:this.state.form.puestos
            }
        })
    }

    render(){
        if(this.state.visible.render){

        
            return(
                <div>
                    <form className='Form' onSubmit={this.HandleSubmit.bind(this)}>
                    <div className='row bottom'>
                    
                        <Text 
                            class='col-lg-2 form-group'
                            classInput='form-control form-control-sm'                        
                            label='Numero de Folio'
                            name='numFolio'
                            value={this.state.form.folio}
                        />

                         <Text 
                            classInput='form-control form-control-sm'
                            class='col-lg-3 form-group'
                            label='Siglas'
                            name='siglas'
                            value={this.state.form.siglas}
                        />
                        
                        {
                            this.state.tipo == 'NOTA' &&
                            <Text 
                                classInput='form-control form-control-sm'
                                class='col-lg-3 form-group'
                                label='Referencia Documento'
                                name='refDocumento'
                                value={this.state.form.siglas}
                            />

                        }

                        <Fecha
                            class='col-lg-3 form-group'
                            classInput='form-control form-control-sm'
                            label='Fecha Documento'
                            name='fOficio'
                            value={this.state.form.fOficio}
                        />

                       
                       
                    </div>

                    <div className='row bottom'>
                    {
                        this.state.tipo != 'NOTA' &&
                        <Text 
                            class='col-lg-4 form-group'
                            classInput='form-control form-control-sm'                            
                            label='Asunto'
                            name='asunto'
                            value={this.state.form.asunto}
                        />
                    }

                   
                        <div className='col-lg-2'>
                            <label>Copias Internos</label>
                            <button 
                                className='btn btn-info btn-sm'
                                onClick={this.HandleModalInternos.bind(this)}>
                                Añadir
                            </button>

                        </div>

                        
                        <div className='col-lg-2'>
                            <label>Copias Externos</label>
                            <button 
                            onClick={this.HandleModalExternos.bind(this)}
                            className='btn btn-info btn-sm'>Añadir</button>
                        </div>

                        {
                            this.state.tipo == 'NOTA' &&
                            <div className='col-lg-2'>
                                <label>Persona que Firma:</label>
                                <button 
                                    onClick={this.HandleModalPuestos.bind(this)}
                                    className='btn btn-info btn-sm'>Añadir</button>
                            </div>
                        }
                    </div>

                    
                    <div className='row bottom'>



                    
                    <Numeric
                        class='col-lg-2 form-group'
                        classInput='form-control form-control-sm'                        
                        label='Espacios en Atte.'
                        name='espacios'
                        value={this.state.form.espacios}
                    />
                    <Numeric
                        class='col-lg-2 form-group'
                        classInput='form-control form-control-sm'                        
                        label='Espacios en Copias'
                        name='espaciosCopias'
                        value={this.state.form.espaciosCopias}
                    />

                    <Numeric
                        class='col-lg-2 form-group'
                        classInput='form-control form-control-sm'                        
                        label='Espacios en Siglas'
                        name='espaciosSiglas'
                        value={this.state.form.espaciosSiglas}
                    />


                    </div>


                    <div className='row'>
                        <label>Texto</label>
                        <TextEditor inputTextEditor={this.HandleChangeTextEditor.bind(this)} texto={this.state.form.texto}/>

                    </div>
                    <Hidden name='internos' value={this.state.form.internos} />
                    <Hidden name='externos' value={this.state.form.externos} />
                    <Hidden name='idPuestoJuridico' value={this.state.form.puestos} />
                    {
                        this.state.tipo == 'NOTA' &&
                        <Hidden name='asunto' value={this.state.form.asunto} />
                    }
                    
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
                    {
                        this.state.visible.interno &&
                        <ModalInterno open={this.state.visible.interno} tipo='I' request={this.requestInternos.bind(this)}/>
                    }

                    {
                        this.state.visible.externos &&
                        <ModalInterno open={this.state.visible.externos} tipo='E' request={this.requestExternos.bind(this)}/>
                    }
                    {
                        this.state.visible.puestos &&
                        <ModalNota open={this.state.visible.puestos} request={this.requestNota.bind(this)}/>
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
