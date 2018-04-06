import React, { Component } from 'react';
import { Form } from 'react-validify';
import { BaseForm} from 'react-validify'
import axios from 'axios';
import { AxiosProvider, Request, Get, Patch, withAxios } from 'react-axios'
import InputText from './../../Form/Components/Text';
import Modal from './../../Modal/Components/Modal-form';

import { error } from 'util';


export default class formAcciones extends Component{


    state = {
        open:false,
        message:'',
        idAccion:this.props.idRegistro
    }


    HandleSubmit(values){
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

        if(this.state.message === 'success'){
            this.props.cancel()
        }
    }

    handleCancel(){
        this.props.cancel()
    }

    rules = {
        nombre:'required|string|max:50'
    }

    errorMessages = {
        'required.nombre': 'El Campo es Requerido ',
        'max.nombre':'* Maximo 50 Caracteres'
    }

    render(){
      
        return(
            <div>
                <Get url={'/SIA/juridico/Acciones/'+this.state.idAccion}>
                    {(error,response,isLoading,onReload) => {
                        
                        if(response !== null){
                            console.log(response.data.nombre)
                            return (
                                <Form 
                                    rules={this.rules}  
                                    errorMessages={this.errorMessages}
                                    className="row Form"
                                >
                
                                    <InputText 
                                        col='col-lg-4' 
                                        label='Nombre' 
                                        name='nombre' 
                                        value='test'
                                    />
                    
                                    <div className="form-group col-lg-12">
                                            <button className="btn btn-primary save" submit  onClick={this.HandleSubmit.bind(this)}>
                                                Guardar
                                            </button>

                                            <button className="btn btn-danger" onClick={this.handleCancel.bind(this)}>
                                                Cancelar
                                            </button>  
                                    </div>
                
                                </Form>
                            )
                        }else{

                           
                            return <p>Loading...</p>
                        }
                    }}
                </Get>
            
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