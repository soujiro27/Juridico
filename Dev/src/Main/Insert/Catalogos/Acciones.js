import React, { Component } from 'react';
import { Form } from 'react-validify';
import { BaseForm} from 'react-validify'
import axios from 'axios';
import InputText from './../../Form/Components/Text';
export default class formAcciones extends Component{


    HandleSubmit(values){
        let form = new FormData()
        form.append('nombre',values.nombre)
        axios.post('/SIA/juridico/Acciones/Save',form)
        .then(response => {
            
        })
    }

    rules = {
        nombre:'required|string|max:50'
    }

    errorMessages = {
        'required.nombre': '* El Campo es Requerido ',
        'max.nombre':'* Maximo 50 Caracteres'
    }

    render(){
        return(
            <Form 
                rules={this.rules}  
                errorMessages={this.errorMessages}
                className="row Form"
            >
                
                <InputText col='col-lg-4' label='Nombre' name='nombre' />
                
                <div className="form-group col-lg-4">
                        <button className="btn btn-primary" submit  onClick={this.HandleSubmit.bind(this)}>
                            Guardar
                        </button>

                        <button className="btn btn-danger">
                            Cancelar
                        </button>  
                </div>
            </Form>
        )
    }
}