import React, { Component } from 'react';
import axios from 'axios';
import Modal from './../../Modal/Components/Modal-form';
import './../form.styl'


export default class formAcciones extends Component{


    state = {
        open:false,
        message:'',
        value:''
    }


    HandleChange(event){
        event.preventDefault()
        this.setState({value:event.target.value.toUpperCase()})
    }


    HandleSubmit(event){
        event.preventDefault();
        let form = new FormData()
        form.append('nombre',this.state.value)
        axios.post('/SIA/juridico/Acciones/Save',form)
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
                        spellCheck='true'
                        required
                        className='form-control'
                        onChange={this.HandleChange.bind(this)}
                        value={this.state.value}
                    />
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