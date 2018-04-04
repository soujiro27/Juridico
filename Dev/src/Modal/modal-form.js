import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import ModalCss from 'react-responsive-modal/lib/css';


export default class ModalForm extends Component {

    state = {
        open:this.props.open
    }

    dataModal = {
        messageModal:'Registro Existoso',
        modalIcon:'fas fa-check-circle modal-icon-success',
        modalTextClass:'modal-text-success',
        modalBorder:'success-border'
    }

    HandleModal = () => { 

        if(this.props.message === 'success') {
            location.href = '/SIA/juridico/'+this.props.url
        } else{
            this.props.modalClose(!this.state.open)
        }

       
    }


    componentWillMount(){
        if(this.props.message != 'success'){
            this.dataModal.messageModal = this.props.message
            this.dataModal.modalIcon = 'fas fa-exclamation-circle modal-icon-error',
            this.dataModal.modalTextClass = 'modal-text-error',
            this.dataModal.modalBorder = 'error-border'
        }
    }


    render(){

       
        const styles = {
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
                onClose={this.HandleModal.bind(this)} 
                little
                transitionEnter ={'react-responsive-modal-transition-enter'}
                closeOnEsc={false}
                styles={styles}
                classNames={{
                    modal:this.dataModal.modalBorder
                    
                }}
                closeOnOverlayClick={false}>
                <i className={this.dataModal.modalIcon} ></i>
                <h4 className={this.dataModal.modalTextClass}>{this.dataModal.messageModal}</h4>
            </Modal>
        )
    }
}

/*

 this.setState({
                    messageModal:message,
                    modalIcon:'fas fa-exclamation-circle modal-icon-error',
                    modalTextClass:'modal-text-error',
                    modalBorder:'#c0392b'

                })*/