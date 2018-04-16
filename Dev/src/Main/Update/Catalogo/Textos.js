import React, { Component } from 'react';
import axios from 'axios';
import Select from './../../../Main/Form/Select-Documentos';
import SelectSub from './../../../Main/Form/Select-SubDocumentos';
import TextEditor from './../../../Main/Form/Text-editor';
import Buttons from './../../Form/Buttons';
import SelectActive from './../../Form/Select-Activo';
import Modal from './../../Modal/Components/Modal-form';


export default class Insert extends Component{
    
    state = {
        documentos:'',
        subdocumentos:'',
        form:{
            idTipoDocto:'',
            idSubTipoDocumento:'',
            texto:this.props.data.texto
        },
        visible:{
            modal:false,
            insert:false
        },
        message:''

    }

    componentWillMount(){
      
        axios.all([
            axios.get('/SIA/juridico/Api/Documentos'),
            axios({
                method:'GET',
                url:'/SIA/juridico/Api/SubDocumentos',
                params:{
                    documento:this.props.data.idTipoDocto
                }
            })
        ])
        .then(axios.spread((doc,sub) => {
            this.setState({
                documentos:doc.data,
                subdocumentos:sub.data
            })
        }))
    }

    async HandleChangeSelect(value){
        axios({
            method:'GET',
            url:'/SIA/juridico/Api/SubDocumentos',
            params:{
                documento:value
            }
        })
        .then(json=>{
            this.setState({
                subdocumentos:json.data,
                form:{
                    idTipoDocto:value
                }
            })
        })
    }

    HandleChangeInput(name,value){
        console.log(name,value)
    }

    HandleChangeTextEditor(value){
       this.setState({
           form:{
               texto:value
           }
       })
    }


    HandleCancel(event){
        event.preventDefault()
        this.props.cancel(false)
    }


    HandleSubmit(event){
        event.preventDefault();
        let form = new FormData(event.target)
        form.append('texto',this.state.form.texto)
        form.append('id',this.props.data.idDocumentoTexto)
        axios.post('/SIA/juridico/DoctosTextos/Update',form)
        .then(response => {
            this.setState({
                visible:{
                    modal:true,
                },
                message:response.data[0]
                })
        })
        
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


    render(){
      
        if(this.state.documentos.length > 0 ){

            return(
                <div>
                <form className="Form" onSubmit={this.HandleSubmit.bind(this)}>
                    <Select 
                        data={this.state.documentos} 
                        class='row bottom'
                        classLabel='col-lg-2'
                        classSelect='form-control col-lg-3'
                        changeValue={this.HandleChangeSelect.bind(this)}
                        value={this.props.data.idTipoDocto}
                        
                    />
                    <SelectSub 
                        subdocumentos={this.state.subdocumentos} 
                        class='row bottom'
                        classLabel='col-lg-2'
                        classSelect='form-control col-lg-3'
                        inputVal={this.HandleChangeInput.bind(this)}
                        value={this.props.data.idSubTipoDocumento}
                    />


                    <SelectActive 
                        estatus={this.props.data.estatus} 
                        class='row bottom'
                        classLabel='col-lg-2'
                        classSelect='form-control col-lg-3'
                        />

                    <TextEditor inputTextEditor={this.HandleChangeTextEditor.bind(this)} texto={this.props.data.texto}/>
                   
                    <Buttons  cancel={this.HandleCancel.bind(this)} />
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
            return <p>Loading...</p>
        }

    }
}