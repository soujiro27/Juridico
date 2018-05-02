import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import {Get} from 'react-axios';
//import 'react-responsive-modal/lib/react-responsive-modal.css';
//import './Modal.styl';

export default class ModalRemitente extends Component {

    state = {
        open:this.props.open,
        tipo:this.props.tipo
       
    }

    dataModal = {
        messageModal:'Copias Internos',
        modalIcon:'fas fa-address-book modal-icon-question',
        modalTextClass:'modal-text-question',
        modalBorder:'question-border width-modal height'
    }

   
    HandleModal = () => { 
        this.props.modalClose(!this.state.open)
      
    }

    HandleSubmit(){
     
       let check = new Array()
        let puestos = document.getElementsByName('internos')
        for(let x in puestos){
            if(puestos[x].checked){
                check.push(puestos[x].value)
            }
        }
       
        this.props.request(check)

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
                alignItems: 'center'
              
            }
        }


        return(
            <Get url='/SIA/juridico/Api/Remitentes' params={{tipo:this.state.tipo}}>
                {(error, response, isLoading, onReload) =>{
                    if(isLoading) {
                        return (<div>Loading...</div>)
                    }
                    else if(response !== null) {
                        return (
                            <Modal 
                                open={this.state.open} 
                                little
                                closeOnEsc={false}
                                showCloseIcon={false}
                                styles={styles}
                                classNames={{modal:this.dataModal.modalBorder}}
                                closeOnOverlayClick={false}
                            >
                            <i className={this.dataModal.modalIcon} ></i>
                            <h4 className={this.dataModal.modalTextClass}>{this.dataModal.messageModal}</h4>
                            <div className='col-lg-12'>
                              <table className="table">
                                <thead>
                                    <th><i className="far fa-check-circle"></i></th>
                                    <th>Nombre</th>
                                    <th>Puesto</th>
                                </thead>
                                <tbody>
                                    {response.data.map(datos => (
                                        <tr key={datos.idRemitenteJuridico} className='table-font'>
                                            <td><input type='checkbox' name='internos' value={datos.idRemitenteJuridico}/></td>
                                            <td>{datos.saludo} {datos.nombre}</td>
                                            <td>{datos.puesto}</td>
                                        </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                            <div className='col-lg-12'>
                            <button className='btn btn-sm btn-primary' onClick={this.HandleSubmit.bind(this)} >Aceptar</button>
                            </div>
                        </Modal>
                        )
                    }
                    return (<div>Default message before request is made.</div>)
                }}
              
            </Get>
        )
    }
}
