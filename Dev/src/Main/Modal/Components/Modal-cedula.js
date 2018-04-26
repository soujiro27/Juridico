import React, { Component } from 'react';
import Modal from 'react-responsive-modal';


export default class ModalRemitente extends Component {

    state = {
        open:this.props.open,
        chose:'',
        puesto:'',
        idRemitente:'',
        data:''
    
    }

    dataModal = {
        messageModal:'¿Desea Cerrar el Volante?',
        modalIcon:'fas fa-file-alt modal-icon-question',
        modalTextClass:'modal-text-question',
        modalBorder:'question-border'
    }



    HandleModal = () => { 
        this.props.modalClose(!this.state.open)

    }

    render(){
        const 
        styles = {
            modal:{
                width:'100%',
                padding: '2.2rem',
                display: 'flex',
                flexWrap:'wrap',
                borderRadius:'10px',
                alignItems: 'center',

            }
        }


        return(
            <Modal 
                open={this.state.open} 
                little
                closeOnEsc={false}
                onClose={this.HandleModal.bind(this)} 
                showCloseIcon={true}
                styles={styles}
                classNames={{modal:this.dataModal.modalBorder}}
                closeOnOverlayClick={false}
            >
                <i className={this.dataModal.modalIcon}></i>
                <h4 className={this.props.titleClass}>{this.props.title}</h4>
                <iframe src={this.props.url} height="500" width="700"></iframe>
            </Modal>
        )           
    }
}
