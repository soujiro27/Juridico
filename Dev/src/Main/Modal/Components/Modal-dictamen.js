import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import './Modal.styl';

export default class ModalForm extends Component {

    state = {
        open:this.props.open
    }

    cuenta = {
        anio:''
    }

    dataModal = {
        messageModal:'Seleccione la Cuenta Publica',
        modalIcon:'fas fa-archive modal-icon-question',
        modalTextClass:'modal-text-question',
        modalBorder:'question-border'
    }

    HandleModal = () => { 
        this.props.modalClose(!this.state.open)
      
    }


    HandleChange(event){
        let value = event.target.value
        this.cuenta.anio = value
       
    }

    HandleSubmit(){
        if(this.cuenta.anio != ''){
            this.props.request(this.cuenta.anio)
        }
    }

    render(){
        const 
        styles = {
            modal:{
                width:'70%',
                margin:'15%',
                padding: '2.2rem',
                display: 'flex',
                borderRadius:'10px',
                alignItems: 'center',

            }
        }


        return(
            <Modal 
                open={this.state.open} 
                little
                closeOnEsc={false}
                showCloseIcon={false}
                styles={styles}
                classNames={{
                    modal:this.dataModal.modalBorder
                    
                }}
                closeOnOverlayClick={false}>
                <i className={this.dataModal.modalIcon} ></i>
                <h4 className={this.dataModal.modalTextClass}>{this.dataModal.messageModal}</h4>
                <div className="col-lg-4">
                    
                        <select className='form-control form-control-sm' onChange={this.HandleChange.bind(this)}>
                            <option value="">Escoga una opcion</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                        </select>
                </div>
                <button className='btn btn-sm btn-primary' onClick={this.HandleSubmit.bind(this)} >Aceptar</button>
            </Modal>
        )
    }
}
