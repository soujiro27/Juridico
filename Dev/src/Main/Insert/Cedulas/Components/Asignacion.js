import React, { Component } from 'react';
import { AxiosProvider, Request, Get, Patch, withAxios } from 'react-axios';
import axios from 'axios';
import SelectPuestos from './../../../Form/Select-personal';
import SelectPrioridad from './../../../Form/Select-prioridad'
import InputFile from './../../../Form/Input-File';
import TextArea from './../../../Form/Textarea';
import Buttons from './../../../Form/Buttons';

import Modal from './../../../Modal/Components/Modal-form';
import './../../form.styl'
export default class Asignacion extends Component {

    state = {
        message:'',
        visible:{
            modal:false
        }
    }

    HandleSubmit(event){
        event.preventDefault();
        let form = new FormData(event.target)
        form.append('idVolante',this.props.volante)
        form.append('file', document.getElementById('file').files[0]);
        axios.post('/SIA/juridico/TurnadosInternos/Save',form)
        .then(response => {
            this.setState({
                visible:{
                    modal:true,
                },
                message:response.data[0]
                })
        })
        
    }


    HanldeModalClose(value){

        if(this.state.message == 'success'){
            this.props.cancel(false)
        } else{
            this.setState({
                visible:{
                    modal:value
                }
            })
        }
    }
    
    render(){
        return(
            <Get url='/SIA/juridico/Api/Puestos'>
            {(error, response, isLoading, onReload) => {
                
                if(response !== null) {
                    return(
                    <div>
                    <form className='Form' onSubmit={this.HandleSubmit.bind(this)}>
                        <div className='row bottom'>
                            <SelectPuestos
                                class='col-lg-4'
                                classSelect='form-control form-control-sm'
                                data={response.data} 
                            />
                            
                            <SelectPrioridad 
                                class='col-lg-3'
                                label='Prioridad'
                                name='idTipoPrioridad'
                                classSelect='form-control form-control-sm'

                            />
                        </div>
                        <div className='row bottom'>
                            <InputFile 
                                class='col-lg-7'
                                classInput='form-control form-control-sm'
                            />
                        </div>

                        <div className='row'> 
                            <TextArea 
                                class='col-lg-7'
                                label='Asunto'
                                classTextArea='form-control'
                                name='asunto'
                            />
                        </div>
                        
                        <Buttons cancel={this.props.cancel.bind(this)}/>
                    </form>
                    {
                        this.state.visible.modal &&
                            <Modal 
                                message={this.state.message} 
                                open={this.state.visible.modal}
                                modalClose={this.HanldeModalClose.bind(this)}
                                />
                    }
                    </div>
                    )
                }
                return (<div>Loading....</div>)
            }}
            </Get>
        )
    }
}