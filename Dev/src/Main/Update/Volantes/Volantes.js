import React, { Component } from 'react';
import axios from 'axios';
import InputText from './../../Form/Input-Text';
import InputDate from './../../Form/Input-Date';
import TextArea from './../../Form/Textarea';
import SelectCaracter from './../../Form/Select-Caracter';
import SelectAreas from './../../Form/Select-Turnado';
import SelectAcciones from './../../Form/Select-Acciones';
import SelectEstatus from './../../Form/Select-Activo';
import Buttons from './../../Form/Buttons-update-volante';



import Modal from './../../Modal/Components/Modal-form';
import ModalClose from './../../Modal/Components/Modal-close-volante';
export default class Insert extends Component{

    state = {
        caracteres:'',
        areas:'',
        acciones:'',
        visible:{
            modal:false,
            modalClose:false
        },
        message:''
    }
    
    componentWillMount(){
        axios.all([
            axios.get('/SIA/juridico/Api/Caracteres'),
            axios.get('/SIA/juridico/Api/Areas'),
            axios.get('/SIA/juridico/Api/Acciones')
        ])
        .then(axios.spread((carac,areas,accions)=>{
            this.setState({
                caracteres:carac.data,
                areas:areas.data,
                acciones:accions.data
            })
        }))
    }


    HandleSubmit(event){
        event.preventDefault();
        let form = new FormData(event.target)
        form.append('idVolante',this.props.data[0].idVolante)
        form.append('folio',this.props.data[0].folio)
        axios.post('/SIA/juridico/Volantes/Update',form)
        .then(response => {
            this.setState({
                visible:{
                    modal:true,
                },
                message:response.data[0]
                })
        })
        
    }


    HandleCancel(event){
        event.preventDefault()
        this.props.cancel(false)
    }


    HanldeModalClose(value){

        if(this.state.message == 'success'){
            this.props.cancel(false)
        } else{
            this.setState({
                visible:{
                    modal:value
                }
            })
        }
    }

    HandleCloseVolante(event){
        event.preventDefault()
        this.setState({
            visible:{
                modalClose:true
            }
        })
    }

    CloseVolante(value){
        
        if(value == '0'){
            let form = new FormData()
            form.append('idVolante',this.props.data[0].idVolante)
            axios.post('/SIA/juridico/Volantes/Close',form).then(json =>{
                this.props.cancel(false)
            })
        } else {
            this.setState({
                visible:{
                    modalClose:false
                }
            })
        }
    }

    render(){
        //console.log(this.state)
        let hour = this.props.data[0].hRecepcion
        let hourdata = hour.substr(0, 5)
        
        if(this.state.caracteres.length > 0 ){
            return(
            
                <div>
                    <form className='Form' onSubmit={this.HandleSubmit.bind(this)} >
                        <div className='form-row'>
                            <div className='col-lg-1'>
                                <label>Folio</label>
                                <p className='form-control form-control-sm'>{this.props.data[0].folio}</p>
                            </div>
                            
                            <div className='col-lg-1'>
                                <label>Sub Folio</label>
                                <p className='form-control form-control-sm'>{this.props.data[0].subFolio}</p>
                            </div>
                            
                            <InputText
                                class='col-lg-3'
                                label='Numero de Documento'
                                classInput='form-control form-control-sm'
                                value={this.props.data[0].numDocumento}
                                max='50'
                                name='numDocumento'
                            />

                            <InputText
                                class='col-lg-1'
                                label='Anexos'
                                classInput='form-control form-control-sm'
                                value={this.props.data[0].anexos}
                                max='50'
                                name='anexos'
                            />

                        </div>
                        <div className='form-row'>
                            <InputDate 
                                class='col-lg-2'
                                label='Fecha Documento'
                                value={this.props.data.fDocumento}
                                classInput='form-control form-control-sm'
                                name='fDocumento'
                            />

                            <InputDate 
                                class='col-lg-2'
                                label='Fecha Recepcion'
                                value={this.props.data.fRecepcion}
                                classInput='form-control form-control-sm'
                                name='fRecepcion'
                            />

                            <div className='col-lg-2'>
                                <label>Hora Recepcion</label>
                                <p className='form-control form-control-sm'>{hourdata}</p>
                            </div>

                        </div>
                        <div className='form-row bottom'>
                            <TextArea 
                                class='col-lg-12'
                                label='Asunto'
                                classTextArea='form-control form-control-sm'
                                value={this.props.data[0].asunto}
                                name='asunto'
                            />
                        </div>
                        <div className='form-row bottom'>
                            <SelectCaracter 
                                class='col-lg-2'
                                label='Caracteres'
                                classSelect='form-control form-control-sm'
                                data={this.state.caracteres}
                                value={this.props.data[0].idCaracter}
                            />
                            <SelectAreas 
                                class='col-lg-6'
                                label='Turnado a:'
                                classSelect='form-control form-control-sm'
                                data={this.state.areas}
                                value={this.props.data[0].idAreaRecepcion}
                            />

                            <SelectAcciones
                                class='col-lg-3'
                                label='Turnado a:'
                                classSelect='form-control form-control-sm'
                                data={this.state.acciones}
                                value={this.props.data[0].idAccion}
                            />
                        </div>
                       
                            <Buttons cancel={this.HandleCancel.bind(this)} closeVolante={this.HandleCloseVolante.bind(this)} hide={this.props.data[0].estatus}/>
                        
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
                        this.state.visible.modalClose &&
                        <ModalClose 
                            open={this.state.visible.modalClose}
                            modalClose={this.HanldeModalClose.bind(this)}
                            request={this.CloseVolante.bind(this)}
                            
                        />
                    }
                </div>
            )
        } else {
            return <p>Loading....</p>
        }
    }
}