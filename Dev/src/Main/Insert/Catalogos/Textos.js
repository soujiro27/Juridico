import React, { Component } from 'react';
import axios from 'axios';
import Select from './../../../Main/Form/Select-Documentos';
import SelectSub from './../../../Main/Form/Select-SubDocumentos';
import TextEditor from './../../../Main/Form/Text-editor';
import Buttons from './../../Form/Buttons'


import Modal from './../../Modal/Components/Modal-form';
import './../form.styl';


export default class Insert extends Component{
    
    state = {
        documentos:'',
        subdocumentos:'',
        form:{
            idTipoDocto:'',
            idSubTipoDocumento:'',
            texto:''
        },
        visible:{
            modal:false,
            insert:false
        },
        message:''

    }

    componentWillMount(){
        axios.get('/SIA/juridico/Api/Documentos').then(json => {
            this.setState({
                documentos:json.data,
            })
        })
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
        this.setState({
            form:{
                idSubTipoDocumento:value
            }
        })
    }

    HandleChangeTextEditor(value){
        this.setState({
            form:{
                texto:value
            }
        })
    }

    HandleSubmit(event){
        event.preventDefault();
        let form = new FormData(event.target)
        form.append('texto',this.state.form.texto)
        axios.post('/SIA/juridico/DoctosTextos/Save',form)
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
                    />
                    <SelectSub 
                        subdocumentos={this.state.subdocumentos} 
                        class='row bottom'
                        classLabel='col-lg-2'
                        classSelect='form-control col-lg-3'
                        inputVal={this.HandleChangeInput.bind(this)}
                    />

                    <TextEditor inputTextEditor={this.HandleChangeTextEditor.bind(this)} />
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
                  
                </div>
            )
        } else {
            return <p>Loading...</p>
        }

    }
}