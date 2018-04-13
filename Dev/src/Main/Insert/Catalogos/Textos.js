import React, { Component } from 'react';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import { AxiosProvider, Request, Get, Head, Post, withAxios } from 'react-axios';
import Select from './../../../Main/Form/Select-Documentos';
import SelectSub from './../../../Main/Form/Select-SubDocumentos';
import TextEditor from './../../../Main/Form/Text-editor';
import Modal from './../../Modal/Components/Modal-form';
import './../form.styl';


export default class Insert extends Component{
    
    state = {
        documentos:'',
        subdocumentos:'',
        form:{
            idTipoDocto:'',
            idSubTipoDocumento:''
        }

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
        console.log(name,value)
    }

    HandleChangeTextEditor(value){
        console.log(value)
    }

    render(){
        if(this.state.documentos.length > 0 ){
            console.log('render')
            return(
                <form className="Form">
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
                </form>
            )
        } else {
            return <p>Loading...</p>
        }

    }
}