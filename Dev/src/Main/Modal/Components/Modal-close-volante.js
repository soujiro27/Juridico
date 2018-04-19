import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import './Modal.styl';

export default class ModalCloseVolante extends Component {

    state = {
        open:this.props.open
    }

    dataModal = {
        messageModal:'¿Desea Cerrar el Volante?',
        modalIcon:'fas fa-question-circle modal-icon-question',
        modalTextClass:'modal-text-question',
        modalBorder:'question-border'
    }

    HandleModal = () => { 
        this.props.modalClose(!this.state.open)
      
    }


    HandleButton(event){
        let value = event.target.value
        this.props.request(value)
        
    }

    render(){
        const 
        styles = {
            modal:{
                width:'70%',
                margin:'15%',
                padding: '2.2rem',
                display: 'flex',
                'flexWrap':'wrap',
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
                onClose={this.HandleModal}
                classNames={{
                    modal:this.dataModal.modalBorder
                    
                }}
                closeOnOverlayClick={false}>
                <i className={this.dataModal.modalIcon} ></i>
                <h4 className={this.dataModal.modalTextClass}>{this.dataModal.messageModal}</h4>
               

                <div className="col-lg-4">
                    <button 
                        className='btn btn-sm btn-primary margin-right' 
                        onClick={this.HandleButton.bind(this)}
                        value='0'
                        >
                        Aceptar
                    </button> 
                
                    <button 
                        className='btn btn-sm btn-danger '
                        value='1'
                        onClick={this.HandleButton.bind(this)}
                        >
                        Cancelar
                        </button> 
                </div>
            </Modal>
        )
    }
}
