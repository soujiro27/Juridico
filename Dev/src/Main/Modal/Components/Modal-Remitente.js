import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { AxiosProvider, Request, Get, Patch, withAxios } from 'react-axios';
import ReactTable from "react-table";
import 'react-responsive-modal/lib/react-responsive-modal.css';
import './Modal.styl';

export default class ModalRemitente extends Component {

    state = {
        open:this.props.open,
        chose:'',
        puesto:'',
        idRemitente:'',
        data:''
       
    }

    dataModal = {
        messageModal:'Seleccione Remitente',
        modalIcon:'fas fa-address-book modal-icon-question',
        modalTextClass:'modal-text-question',
        modalBorder:'question-border width-modal'
    }

    columns = [
        {
            Header:'Nombre',
            accessor:'nombre',
           
        },
        {
            Header:'puesto',
            accessor:'puesto',
            

        },
        {
            Header:'Siglas',
            accessor:'siglasArea',
           
        }
       
    ]

    HandleModal = () => { 
        this.props.modalClose(!this.state.open)
      
    }

    HandleSubmit(){
        if(this.state.idRemitente != ''){
            this.props.request(this.state.data)
        }
    }

    HandleClickTr(state, rowInfo, column){
        return {
            onClick:(e,handleOriginal) =>{
                //this.props.dataId(rowInfo.original.idVolante)
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
                alignItems: 'center',

            }
        }


        return(
            <Get url='/SIA/juridico/Api/Remitentes' params={{tipo:this.props.remitente}}>
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
                                    pageSizeOptions={[8]}
                                    defaultPageSize={8}
                                    className="-highlight"
                                    previousText='Anterior'
                                    filterable={true}
                                    nextText='Siguiente'
                                    noDataText='Sin Datos'
                                    pageText='Pagina'
                                    resizable={true}
                                    ofText= 'de'
                                    getTrProps={this.HandleClickTr.bind(this)}
                            
                                />
                            </div>
                            <div className='col-lg-12'>
                                <p className='form-control'>{this.state.chose} - {this.state.puesto}</p>
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
