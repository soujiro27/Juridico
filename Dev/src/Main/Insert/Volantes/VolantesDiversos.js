import React, { Component } from 'react';
import axios from 'axios';
/*-------------- Elementos Formulario --------------*/
import Select from './../../../Main/Form/Select-Documentos';
import SelectSub from './../../../Main/Form/Select-SubDocumentos';
import SelectBolean from './../../Form/Select-Bolean';
import SelectRemitente  from './../../Form/Select-Remitente';
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

import SelectReact from 'react-select';
import 'react-select/dist/react-select.css';


/*------------------Modals--------------------------*/
import Modal from './../../Modal/Components/Modal-form';
import ModalRemitente from './../../Modal/Components/Modal-Remitente';
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
            notaConfronta:'NO',
            remitente:'',
            idRemitente:'',
            idRemitenteJuridico:'',
            nombreRemitente:'',
            puestoRemitente:'',
        },
        visible:{
            modal:false,
            insert:false,
            modalRemitente:false
        },
        message:'',
        selectedOption: ''

    }

    form = {
        idTipoDocto:'',
        idSubTipoDocumento:'',
        notaConfronta:'',
        ctaPublica:'2016',
        cveAuditoria:''
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
            url:'/SIA/juridico/Api/SubDocumentosDiversos',
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

    HandleSubmit(event){
        event.preventDefault();
        let form = new FormData(event.target)
        form.append('file', document.getElementById('file').files[0]);
        axios.post('/SIA/juridico/VolantesDiversos/Save',form)
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


    HandleChangeRemitente(event){
        event.preventDefault()
        let valor = event.target.value
        if(valor){
            this.setState({
                form:{
                    remitente:valor
                },
                visible:{
                    modalRemitente:true
                }
            })
        }else {
            this.setState({
                form:{
                    idRemitente:'',
                    idRemitenteJuridico:'',
                    nombreRemitente:'',
                    puestoRemitente:''
                },
                visible:{
                    modalRemitente:false
                }
            })
        }
    }

    HandleRequestRemitente(data){
        this.setState({
            form:{
                idRemitente:data.siglasArea,
                idRemitenteJuridico:data.idRemitenteJuridico,
                nombreRemitente:data.nombre,
                puestoRemitente:data.puesto
            },
            visible:{
                modalRemitente:false
            }
        })
    }

    optionSelectAreas = [
        {value: 'DAJPA', label: 'DIRECCIÓN DE ASESORÍA JURíDICA Y PROMOCIÓN DE ACCIONES'},
        {value: 'DCPA', label: 'DIRECCIÓN CONTENCIOSA Y DE PROMOCIÓN DE ACCIONES'},
        {value: 'DIJPA', label: 'DIRECCIÓN DE INTERPRETACIÓN JURíDICA Y PROMOCIÓN DE ACCIONES'},
        {value: 'DN', label: 'DIRECCIÓN DE NORMATIVIDAD'},
        {value:'DGAJ', label:'DIRECCIÓN GENERAL DE ASUNTOS JURÍDICOS'}

        
    ]

    handleChange = (selectedOption) => {
     
        this.setState({ 
            selectedOption:selectedOption
            });
        
      }

    
    
      render(){
        console.log(this.state.selectedOption)
        if(this.state.documentos.length > 0 ){
            
            return(
                <div>
                <form className="Form" onSubmit={this.HandleSubmit.bind(this)} encType="multipart/form-data">
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
                            
                        />

                        <SelectBolean 
                            class='col-lg-2'
                            classSelect='form-control form-control-sm'
                            name='extemporaneo'
                            label='Extemporaneo'
                        />

                    </div>
                    
                    <div className='form-row bottom'>
                        <InputNumber 
                            class='col-lg-2'
                            label='Folio'
                            name='folio'
                            max='9999'
                            min='1'
                            classInput='form-control form-control-sm'
                        />

                        <InputNumber 
                            class='col-lg-2'
                            label='SubFolio'
                            name='subFolio'
                            max='9999'
                            min='0'
                            classInput='form-control form-control-sm'
                        />
                        <InputText 
                            class='col-lg-4'
                            label='Numero de Documento'
                            max='50'
                            classInput='form-control form-control-sm'
                            name='numDocumento'
                        />
                        <InputNumber 
                        class='col-lg-2'
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
                            name='fDocumento'
                        />
                        <InputDate 
                            class='col-lg-2'
                            label='Fecha Recepcion'
                            classInput='form-control form-control-sm'
                            name='fRecepcion'
                        />
                        <InputHour
                            class='col-lg-2'
                            label='Hora Recepcion'
                            classInput='form-control form-control-sm'
                            name='hRecepcion'
                        />
                    </div>

                    <div className='form-row bottom'>
                        <SelectRemitente 
                            class='col-lg-2'
                            label='Remitente'
                            classSelect='form-control form-control-sm'
                            change={this.HandleChangeRemitente.bind(this)}
                        />
                        <div className='col-lg-5'>
                            <label>Nombre</label>
                            <p className='form-control form-control-sm'>                                    {this.state.form.nombreRemitente}
                            </p>
                        </div>
                        
                        <div className='col-lg-5'>
                            <label>Puesto</label>
                            <p className='form-control form-control-sm'>                                    {this.state.form.puestoRemitente}
                            </p>
                        </div>


                    </div>


                    <div className='form-row bottom'>
                        <TextArea 
                            class='col-lg-12'
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
                            class='col-lg-3'
                            classSelect='form-control'
                            data={this.state.caracteres}
                        />
                        <div className='col-lg-5'>
                            <label>Turnado a:</label>
                            <SelectReact
                                name="idTurnado"
                                value={this.state.selectedOption}
                                multi={true}
                                labelKey='value'
                                joinValues={true}
                                className='small-font'
                                onChange={this.handleChange.bind(this)}
                                options={this.optionSelectAreas}
                            />
                        </div>
    
                        <SelectAcciones 
                            class='col-lg-3'
                            classSelect='form-control '
                            data={this.state.acciones}
                        />

                    </div>

                    <InputHidden name='idRemitenteJuridico' value={this.state.form.idRemitenteJuridico} />
                    <InputHidden name="idRemitente" value={this.state.form.idRemitente} />
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
                        this.state.visible.modalRemitente &&
                        <ModalRemitente 
                            open={this.state.visible.modalRemitente}
                            remitente={this.state.form.remitente}
                            request={this.HandleRequestRemitente.bind(this)}
                        />
                    }
                 
                  
                </div>
            )
        } else {
            return <p>Loading...</p>
        }

    }
}