import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import {Get} from 'react-axios';
import ReactTable from "react-table";
//import 'react-responsive-modal/lib/react-responsive-modal.css';
//import './Modal.styl';

export default class ModalRemitente extends Component {

    state = {
        open:this.props.open,
        chose:'',
        puesto:'',
        idRemitente:'',
        data:''
       
    }

    dataModal = {
        messageModal:'Seleccion Firmas',
        modalIcon:'fas fa-address-book modal-icon-question',
        modalTextClass:'modal-text-question',
        modalBorder:'question-border width-modal'
    }

    columns = [
        {
            Header:<i className="far fa-check-square"></i>,
            accessor:props => {
                //console.log(props)
                return <input type="checkbox" name="puestos" value={props.idPuestoJuridico} className='form-control'/>
            },
            id:'id',
           
          
            
        },
        {
            Header:'Nombre',
            accessor:props =>{
                return <span>{props.saludo} {props.nombre} {props.paterno} {props.materno} </span>
            },
            id:'name',
      
            
        },
        {
            Header:'Puesto',
            accessor:'puesto',
         
            
        }
    ]
    HandleModal = () => { 
        this.props.modalClose(!this.state.open)
      
    }

    HandleSubmit(){
     
       let check = new Array()
        let puestos = document.getElementsByName('puestos')
        for(let x in puestos){
            if(puestos[x].checked){
                check.push(puestos[x].value)
            }
        }
        this.props.request(check)

    }

    HandleClickTr(state, rowInfo, column){
        return {
            onClick:(e,handleOriginal) =>{
                //console.log(rowInfo.original)
                this.setState({
                    chose:rowInfo.original.nombre,
                    puesto:rowInfo.original.puesto,
                    idRemitente:rowInfo.original.idRemitenteJuridico,
                    data:rowInfo.original
                })
            }
        }
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
            <Get url='/SIA/juridico/Api/Puestos'>
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
                                <ReactTable 
                                    data={response.data}
                                    columns={this.columns}
                                    pageSizeOptions={[15]}
                                    defaultPageSize={15}
                                    className="-highlight"
                                    previousText='Anterior'
                                    showPagination={false}
                                    nextText='Siguiente'
                                    noDataText='Sin Datos'
                                    pageText='Pagina'
                                    resizable={true}
                                    ofText= 'de'
                                    //getTrProps={this.HandleClickTr.bind(this)}
                            
                                />
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
