import React, { Component } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import Modal from './../../Modal/Components/Modal-form';


export default class formAcciones extends Component{


    state = {
        open:false,
        message:'',
        id:this.props.idRegistro,
        idSubTipoDocumento:this.props.idSubTipoDocumento,
        idTipoDocto:this.props.idTipoDocto,
        nombre:this.props.nombre,
        estatus:this.props.estatus,
        data:this.props.data,
        SubDocumentos:[]
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

    componentWillMount(){
        axios({
            method:'get',
            url:'/SIA/juridico/Api/SubDocumentos',
            params:{
                documento:this.state.idTipoDocto
            }
        })
        .then(json => {
            this.setState({
                SubDocumentos:json.data,
            })
        })
    }


    HandleSubmit(event){
        event.preventDefault()
        let form = new FormData(event.target)
        form.append('id',this.state.id)
        axios.post('/SIA/juridico/SubTiposDocumentos/Update',form)
        .then(response => {
            this.setState({
            open:!this.state.open,
            message:response.data[0]
            })
        })        
    }

    
    HandleInputChange(event){
        const target = event.target
        const name = target.name
        const value = target.value
        this.setState({
            [name]:value
        })
    }


    HandleInputText(event){
        event.preventDefault()
        this.setState({[event.target.name]:event.target.value.toUpperCase()})
    }

    handleCancel(event){
        event.preventDefault();
        this.props.cancel()
    }

    modal(value){
        this.setState({
            open:value
        })

        if(this.state.message === 'success'){
            this.props.cancel()
        }
    }

    


  
    render(){
       
        return(
                <div>
                    <form className="Form" onSubmit={this.HandleSubmit.bind(this)} id="Form-insert-acciones">
                        <div className="row bottom">
                            <label className="col-lg-2">Tipo de Documento</label>
                            <select 
                                className="form-control col-lg-3" 
                                defaultValue={this.state.idTipoDocto}
                                onChange={this.HandleInputChange.bind(this)}  
                                name="idTipoDocto"
                                >
                                
                                <option value="">Seleccion un Elemento</option>
                            {
                                this.state.data.map(res =>(
                                    <option value={res.idTipoDocto} key={res.idTipoDocto}>{res.nombre}</option>
                                ))
                            }
                            </select>
                        </div>

                        <div className="row bottom">
                            <label className="col-lg-2">Sub Documento</label>
                            <select className="form-control col-lg-3" defaultValue={this.state.idSubTipoDocumento} name='idSubTipoDocumento' >
                                <option value="" >Selecciona un Elemento</option>
                                {
                                    this.state.SubDocumentos.map(item => (
                                        <option key={item.idSubTipoDocumento} value={item.idSubTipoDocumento}>{item.nombre}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="row bottom">
                            <label className="col-lg-2">Texto</label>
                            <ReactQuill 
                            modules={this.modules} 
                            formats={this.formats} 
                            className="editor"
                            value={this.props.texto}
                            //onChange={this.HandleChangeEditor.bind(this)} 
                            />
                            <input type="hidden" value={this.props.texto} name="texto" />         
                        </div>

                        
                        <div className="row bottom">
                            <label className="col-lg-2">Estatus</label>
                            <select 
                                defaultValue={this.state.estatus} 
                                className="form-control col-lg-3" 
                                name="estatus"
                                onChange={this.HandleInputChange.bind(this)}>
                                    <option value="ACTIVO">ACTIVO</option>
                                    <option value="INACTIVO">INACTIVO</option>
                            </select> 
                        </div>
                        
                        <div className="row">
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