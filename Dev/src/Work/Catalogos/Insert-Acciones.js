import React, { Component } from 'react';
import { Form } from 'react-validify';
import { BaseForm} from 'react-validify'
import axios from 'axios';
import Modal from './../../Modal/modal-form';
import Input from './../../form/Components/text'
import './formAcciones.styl'
export default class InsertAcciones extends Component {

    state = {
        open:false,
        message:''
    }

    submit(values){
        let form = new FormData()
        form.append('nombre',values.nombre)
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
    }


    render(){   

        
        return(
            <div className="form-container">
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
            }>
                <Input name='nombre' />
                <input 
                    type="submit"
                    submit
                    value="Guardar"
                    className="btn btn-primary btn-sm"
                    onClick={this.submit.bind(this)}
                />
                <a href={'/SIA/juridico/'+this.props.url} className ="btn btn-danger btn-sm">Cancelar</a>               
            </Form>
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