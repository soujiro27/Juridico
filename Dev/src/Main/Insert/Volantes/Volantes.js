import React, { Component } from 'react';
import axios from 'axios';
/*-------------- Elementos Formulario --------------*/
import Select from './../../../Main/Form/Select-Documentos';
import SelectSub from './../../../Main/Form/Select-SubDocumentos';
import SelectBolean from './../../Form/Select-Bolean';
import BtnAuditoria from './../../Form/Button-auditoria';
import InputNumber from './../../Form/Input-Number';
import InputText from './../../Form/Input-Text';
import InputDate from './../../Form/Input-Date';
import InputHour from './../../Form/Input-Hour';
import TextArea from './../../Form/Textarea';
import InputFile from './../../Form/Input-File';
import SelectCaracter from './../../Form/Select-Caracter';
import SelectTurnado from './../../Form/Select-Turnado';
import SelectAcciones from './../../Form/Select-Acciones';
import Buttons from './../../Form/Buttons'
import InputHidden from './../../Form/Input-Hidden';


/*------------------Modals--------------------------*/
import Modal from './../../Modal/Components/Modal-form';
import Confronta  from './../../Modal/Components/Modal-confronta';
import Dictamen from './../../Modal/Components/Modal-dictamen';
/*------------------Estilos------------------------*/
import './../form.styl';
import 'react-datepicker/dist/react-datepicker.css';


export default class Insert extends Component{
    
    state = {
        documentos:'',
        subdocumentos:'',
        caracteres:'',
        areas:'',
        acciones:'',
        form:{
            idTipoDocto:'',
            idSubTipoDocumento:'',
            notaConfronta:'NO'
        },
        visible:{
            modal:false,
            insert:false,
            modalConfronta:false,
            modalDictamen:false
        },
        message:''

    }

    form = {
        idTipoDocto:'',
        idSubTipoDocumento:'',
        notaConfronta:''
    }

    componentWillMount(){
        axios.all([
            axios.get('/SIA/juridico/Api/Documentos'),
            axios.get('/SIA/juridico/Api/Caracteres'),
            axios.get('/SIA/juridico/Api/Areas'),
            axios.get('/SIA/juridico/Api/Acciones')
        ])
        .then(axios.spread((doc,carac,areas,accions)=>{
            this.setState({
                documentos:doc.data,
                caracteres:carac.data,
                areas:areas.data,
                acciones:accions.data
            })
        }))
    }

    HandleChangeSelect(value){
        axios({
            method:'GET',
            url:'/SIA/juridico/Api/SubDocumentos',
            params:{
                documento:value
            }
        })
        .then(json=>{
            this.form.idTipoDocto = value
            this.setState({
                subdocumentos:json.data,
                form:{
                    idTipoDocto:value
                }
            })

            
        })
    }

    HandleChangeInput(name,value,texto){
        if(this.form.idTipoDocto === 'OFICIO' && texto === 'CONFRONTA' ){
            this.setState({
                visible:{
                    modalConfronta:true
                }
            })
        } else if(this.form.idTipoDocto === 'OFICIO' && texto === 'DICTAMEN'){
            this.setState({
                visible:{
                    modalDictamen:true
                }
            })
        }
    }


    HandleSubmit(event){
        event.preventDefault();
        let form = new FormData(event.target)
        form.append('texto',this.state.form.texto)
        axios.post('/SIA/juridico/Volantes/Save',form)
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


    ModalConfrontaRequest(value){
        this.setState({
            form:{
                notaConfronta:value
            },
            visible:{
                modalConfronta:false
            }
        })
    }


    render(){
        console.log(this.form)
        if(this.state.documentos.length > 0 ){
            return(
                <div>
                <form className="Form" onSubmit={this.HandleSubmit.bind(this)}>
                    <div className='form-row bottom'>
                        <Select 
                            data={this.state.documentos} 
                            class='col-lg-2'
                            classSelect='form-control form-control-sm'
                            changeValue={this.HandleChangeSelect.bind(this)}
                        />
                        <SelectSub 
                            subdocumentos={this.state.subdocumentos} 
                            class='col-lg-2'
                            classSelect='form-control form-control-sm'
                            inputVal={this.HandleChangeInput.bind(this)}
                        />

                        <SelectBolean 
                            class='col-lg-2'
                            classSelect='form-control form-control-sm'
                            name='promocion'
                            label='Promocion de Accion'
                        />
                        <SelectBolean 
                            class='col-lg-2'
                            classSelect='form-control form-control-sm'
                            name='extemporaneo'
                            label='Extemporaneo'
                        />

                        <BtnAuditoria 
                            class='col-lg-2'
                            classLabel='col-lg-12'
                        />
                    </div>
                    
                    <div className='form-row bottom'>
                        <InputNumber 
                            class='col-lg-1'
                            label='Folio'
                            name='folio'
                            max='9999'
                            min='1'
                            classInput='form-control form-control-sm'
                        />

                        <InputNumber 
                            class='col-lg-1'
                            label='SubFolio'
                            name='subFolio'
                            max='9999'
                            min='0'
                            classInput='form-control form-control-sm'
                        />
                        <InputText 
                            class='col-lg-3'
                            label='Numero de Documento'
                            max='50'
                            classInput='form-control form-control-sm'
                            name='numDocumento'
                        />
                        <InputNumber 
                        class='col-lg-1'
                        label='Anexos'
                        name='anexos'
                        max='99'
                        min='0'
                        classInput='form-control form-control-sm'
                    />
                    </div>

                    <div className='form-row bottom'>
                        <InputDate 
                            class='col-lg-2'
                            label='Fecha Documento'
                            classInput='form-control form-control-sm'
                        />
                        <InputDate 
                            class='col-lg-2'
                            label='Fecha Recepcion'
                            classInput='form-control form-control-sm'
                        />
                        <InputHour
                            class='col-lg-2'
                            label='Hora Recepcion'
                            classInput='form-control form-control-sm'
                        />
                    </div>

                    <div className='form-row bottom'>
                        <InputText 
                            class='col-lg-6'
                            label='Remitente'
                            max='50'
                            classInput='form-control form-control-sm'
                            name='idRemitente'
                            read={true}
                        />
                    </div>

                    <div className='form-row bottom'>
                        <TextArea 
                            class='col-lg-6'
                            label='Asunto'
                            name='asunto'
                            classTextArea='form-control'
                        />
                    </div>

                    <div className='form-row bottom'>
                        <InputFile 
                            class='col-lg-6'
                            classInput='form-control form-control-sm'
                        />
                    </div>

                    <div className='form-row bottom'>
                        <SelectCaracter 
                            class='col-lg-2'
                            classSelect='form-control form-control-sm'
                            data={this.state.caracteres}
                        />
                        <SelectTurnado
                            class='col-lg-6'
                            classSelect='form-control form-control-sm'
                            data={this.state.areas}
                        />
                        <SelectAcciones 
                            class='col-lg-2'
                            classSelect='form-control form-control-sm'
                            data={this.state.acciones}
                        />

                    </div>

                    <InputHidden name='notaConfronta' value={this.state.form.notaConfronta} />
                    
                    <Buttons cancel={this.HandleCancel.bind(this)} />

                    
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
                        this.state.visible.modalConfronta &&
                        <Confronta 
                        open={this.state.visible.modalConfronta}
                        request={this.ModalConfrontaRequest.bind(this)}
                        />
                    }
                    {
                        this.state.visible.modalDictamen &&
                        <Dictamen
                            open={this.state.visible.modalDictamen}
                        />
                    }
                  
                </div>
            )
        } else {
            return <p>Loading...</p>
        }

    }
}