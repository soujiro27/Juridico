import React, { Component } from 'react';
import { Form } from 'react-validify';
import { BaseForm} from 'react-validify'
import axios from 'axios';

import Input from './../../form/Components/text'
import './formAcciones.styl'
export default class InsertAcciones extends Component {


    submit(values){

        let form = new FormData()
        form.append('nombre',values.nombre)
        axios.post('/SIA/juridico/Acciones/Save',form)
        .then(response => {
            console.log(response)
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
                    onClick={this.submit}
                />
                <a href={'/SIA/juridico/'+this.props.url} className ="btn btn-danger btn-sm">Cancelar</a>
            </Form>
        )
    }
}