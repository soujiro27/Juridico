import React, { Component } from 'react';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import Modal from './../../Modal/Components/Modal-form';


export default class formAcciones extends Component{


    state = {
        open:false,
        message:'',
        id:this.props.idRegistro,
        nombre:this.props.nombre,
        idTipoDocto:this.props.idTipoDocto,
        auditoria:this.props.auditoria,
        estatus:this.props.estatus,
        data:this.props.data
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
                            <label className="col-lg-2">Nombre</label>
                            <input 
                                type="text"
                                name='nombre'
                                maxLength='20'
                                required
                                defaultValue={this.state.nombre}
                                className='form-control col-lg-3'
                                onChange={this.HandleInputText.bind(this)}
                            />
                        </div>

                        <div className="row bottom">
                            <label className="col-lg-2">Auditoria</label>
                            <ReactTooltip place='right' effect='solid'/>
                            <select  
                                defaultValue={this.state.auditoria} 
                                className="form-control col-lg-3" 
                                name="auditoria" 
                                data-tip="¿El documento lleva Auditoria?" 
                                required 
                                onChange={this.HandleInputChange.bind(this)}>
                                    <option value="">Selecciona un Elemento </option>
                                    <option value="SI">SI</option>
                                    <option value="NO">NO</option>
                            </select>
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