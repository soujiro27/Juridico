import React, { Component } from 'react';
import Formsy from 'formsy-react';
import InputText from './../../form/Components/text'

export default class InsertAcciones extends Component {
    
    render(){
        return(
            <Formsy>
                <InputText name="nombre"  required validations={{
    isEmail: true,
    maxLength: 50
  }}
  validationErrors={{
    isEmail: 'You have to type valid email',
    maxLength: 'You can not type in more than 50 characters'
  }} />
                <button type="submit" className="btn">
                    Submit
                </button>
            </Formsy>
        )
    }
}