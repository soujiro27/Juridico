import React, { Component } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import Modal from './../../Modal/Components/Modal-form';
import './../form.styl'
import 'react-quill/dist/quill.snow.css'; 


export default class formAcciones extends Component{


    state = {
        open:false,
        message:'',
        idTipoDocto:'',
        SubDocumentos:[],
        idSubTipoDocumento:'',
        texto:''
    }
   
    HandleChangeDocumento(event){
        let documento = event.target.value
        axios({
            method:'get',
            url:'/SIA/juridico/Api/SubDocumentos',
            params:{documento}
        })
        .then(json => {
            this.setState({
                idTipoDocto:documento,
                SubDocumentos:json.data

            })
        })
        
    }

    HandleChangeEditor(value){
        let text = value.toString()
        this.setState({
            texto:String(text)
        })
    }

        
    HandleInputChange(event){
        event.preventDefault()
        const target = event.target
        const name = target.name
        const value = target.value
        this.setState({
            [name]:value
        })
    }



    HandleSubmit(event){
        event.preventDefault();
        let form = new FormData(event.target)
        axios.post('/SIA/juridico/DoctosTextos/Save',form)
        .then(response => {
            this.setState({
            open:!this.state.open,
            message:response.data[0]
            })
        })
        
    }

    modal(value){
        this.setState({
            open:value
        })

        if(this.state.message === 'success'){
            this.props.cancel()
        }
    }

    handleCancel(){
        this.props.cancel()
    }


    modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            [{ 'font': [] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            [{ 'align': [] }],    
        ],
    }
    
    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        ]

    render(){
        return(
            <div>
            <form className="Form" onSubmit={this.HandleSubmit.bind(this)}>
                <div className="row bottom">
                    <label className="col-lg-2">Documento</label>
                    <select className="form-control col-lg-3" name="idTipoDocto" required onChange={this.HandleChangeDocumento.bind(this)}>
                        <option value="">Selecciona un Elemento </option>
                        {
                            this.props.data.map(item =>(
                                <option key={item.idTipoDocto} value={item.idTipoDocto}>{item.nombre}</option>
                            ))
                        }
                    </select>
                </div>


                <div className="row bottom">
                    <label className="col-lg-2">Sub Documento</label>
                    <select 
                        className="form-control col-lg-3" 
                        name="idSubTipoDocumento" 
                        required 
                        onChange={this.HandleInputChange.bind(this)}
                        defaultValue={this.state.idSubTipoDocumento}
                        >
                        <option value="">Selecciona un Elemento </option>
                        {
                            this.state.SubDocumentos.map(item => (
                                <option key={item.idSubTipoDocumento} value={item.idSubTipoDocumento}>{item.nombre}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="row bottom">
                    <label className="col-lg-2">Texto</label>
                </div>
                <div className="row">
                    <ReactQuill 
                        modules={this.modules} 
                        formats={this.formats} 
                        className="editor" 
                        onChange={this.HandleChangeEditor.bind(this)} />
                    <input type="hidden" value={this.state.texto} name="texto" />         
                </div>
               <div className="row Form-save-button">
                    <input type="submit" value="Guardar" className='btn btn-primary save' />
                    <button className="btn btn-danger" onClick={this.handleCancel.bind(this)} >Cancelar</button> 
                </div>
                
            </form>
            {
            
                this.state.open &&
                <Modal 
                    open={this.state.open} 
                    modalClose={this.modal.bind(this)}
                    message={this.state.message}
                />
            }
            </div>
        )
    }
}

