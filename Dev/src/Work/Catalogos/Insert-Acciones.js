import React, { Component } from 'react';
import { Form } from 'react-validify';
import { BaseForm} from 'react-validify'
import axios from 'axios';
import Modal from 'react-responsive-modal';

import Input from './../../form/Components/text'
import './formAcciones.styl'
export default class InsertAcciones extends Component {

    state = {
        open:false
    }
    
    HandleModal = () => { 
        this.setState({
            open:!this.state.open
        })
    }

    submit(values){
        //let self = this.bind(this)

        let form = new FormData()
        form.append('nombre',values.nombre)
        axios.post('/SIA/juridico/Acciones/Save',form)
        .then(response => {
            this.HandleModal()
        })
    }


    render(){
        return(
            <Form
            className="form"
            rules={
                {
                    nombre:'required|string|max:50'
                }
            }
                
            errorMessages={
                {
                    'required.nombre': '* El Campo es Requerido ',
                    'max.nombre':'* Maximo 50 Caracteres'
                }
            }
            >
                <Input name='nombre' />
                <input 
                    type="submit"
                    submit
                    value="Guardar"
                    className="btn btn-primary btn-sm"
                    onClick={this.submit.bind(this)}
                />
                <a href={'/SIA/juridico/'+this.props.url} className ="btn btn-danger btn-sm">Cancelar</a>
                <Modal open={this.state.open} 
                    onClose={this.HandleModal} little
                    closeOnEsc={false}
                    closeOnOverlayClick={false}>
                    <h2>Simple centered modal</h2>
                </Modal>
            </Form>
            
        )
    }
}