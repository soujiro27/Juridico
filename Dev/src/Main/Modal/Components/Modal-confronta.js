import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import './Modal.styl';

export default class ModalForm extends Component {

    state = {
        open:this.props.open
    }

    dataModal = {
        messageModal:'¿El Oficio contiene Nota Informativa?',
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
                    <button 
                        className='btn btn-sm btn-primary btn-modal-inline' 
                        onClick={this.HandleButton.bind(this)}
                        value='SI'
                        >
                        SI
                    </button> 
                
                    <button 
                        className='btn btn-sm btn-danger btn-modal-inline'
                        value='NO'
                        onClick={this.HandleButton.bind(this)}
                        >
                        NO
                        </button> 
                </div>
            </Modal>
        )
    }
}
