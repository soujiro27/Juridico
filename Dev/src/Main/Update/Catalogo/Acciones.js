import React, { Component } from 'react';
import axios from 'axios';
import Modal from './../../Modal/Components/Modal-form';


export default class formAcciones extends Component{


    state = {
        open:false,
        message:'',
        idAccion:this.props.idRegistro,
        nombre:this.props.nombre,
        estatus:this.props.estatus
    }


    HandleSubmit(event){
        event.preventDefault()
        let form = new FormData(event.target)
        form.append('id',this.state.idAccion)
        axios.post('/SIA/juridico/Acciones/Update',form)
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
                    <form className="row Form" onSubmit={this.HandleSubmit.bind(this)} id="Form-insert-acciones">
                        <div className="form-group col-lg-4">
                            <label>Nombre</label>
                            <input 
                                type="text"
                                name='nombre'
                                maxLength='20'
                                required
                                defaultValue={this.state.nombre}
                                className='form-control'
                                onChange={this.HandleInputChange.bind(this)}
                            />
                        </div>
                        
                        <div className="form-group col-lg-2">
                            <label>Estatus</label>
                            <select 
                                defaultValue={this.state.estatus} 
                                className="form-control" 
                                name="estatus"
                                onChange={this.HandleInputChange.bind(this)}
                            >
                                <option value="ACTIVO">ACTIVO</option>
                                <option value="INACTIVO">INACTIVO</option>
                            </select> 
                        </div>
                        
                        <div className="form-group col-lg-12">
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