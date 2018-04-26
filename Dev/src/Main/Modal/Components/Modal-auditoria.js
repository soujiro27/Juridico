import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import ReactTable from "react-table";
import 'react-responsive-modal/lib/react-responsive-modal.css';
import './Modal.styl';

export default class ModalAuditoria extends Component {

    state = {
        open:this.props.open,
        data:[],
        turnado:[]
    }

    dataModal = {
        messageModal:'Auditoria',
        modalIcon:'fas fa-archive modal-icon-question',
        modalTextClass:'modal-text-question',
        modalBorder:'question-border'
    }

    columns = [
        {
            Header:'Area',
            accessor:'idArea'
        },
        {
            Header:'Rubro',
            accessor:'rubro'
        },
        {
            Header:'Sujeto',
            accessor:'sujeto'
        },
        {
            Header:'Tipo',
            accessor:'tipo'
        }
    ]

    columnas =[
        {
            Header:'Documento',
            accessor:'nombre'
        },
        {
            Header:'Area Asignada',
            accessor:'idAreaRecepcion'
        },
    ]

    HandleModal = () => { 
        this.props.modalClose(!this.state.open)
      
    }


    HandleSearch(event){
        let text = event.target.value
        if(text != ''){

            axios.all([
                axios({
                    method:'GET',
                    url:'/SIA/juridico/Api/Auditoria',
                    params:{
                        cuenta:this.props.cuenta,
                        clave:text
                    }
                }),
                axios({
                    method:'GET',
                    url:'/SIA/juridico/Api/AuditoriaTurnos',
                    params:{
                        cuenta:this.props.cuenta,
                        clave:text
                    }
                })
            ])
            .then(axios.spread((datos,turno)=>{
                
                if(datos.data.error){
                    this.setState({
                        data:[],
                        turnado:[]

                    })
                }else{
                    this.setState({
                        data : [datos.data],
                        turnado:turno.data
                    })
                }
            }))
        } else {
            this.setState({
                data:[],
                turnado:[]
            })
        }
        
    }


    HandleSubmit(){
        if(this.state.data.length > 0){
            this.props.request(this.state.data)
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
                flexWrap:'wrap',
                borderRadius:'10px',
                alignItems: 'center',

            }
        }


        return(
            <Modal 
                open={this.state.open}
                onClose={this.HandleModal}
                little
                closeOnEsc={false}
                showCloseIcon={false}
                styles={styles}
                classNames={{
                    modal:this.dataModal.modalBorder
                    
                }}
                closeOnOverlayClick={false}>
                <div className='Modal-datos-cuenta'>
                    <i className={this.dataModal.modalIcon} ></i>
                    <p className={this.dataModal.modalTextClass}>{this.dataModal.messageModal}</p>
                    <p> Cuenta Publica: {this.props.cuenta}</p>
                </div>
                <div className="Modal-search-auditoria">
                    <input 
                        type="text" 
                        placeholder='Numero de Auditoria'  
                        className='form-control form-control-sm' 
                        onKeyUp={this.HandleSearch.bind(this)}
                    />
                </div>
                <div className='Modal-search-auditoria'>
                    <ReactTable 
                        data={this.state.data}
                        columns={this.columns}
                        defaultPageSize={2}
                        className="-highlight"
                        showPagination={false}
                        noDataText='Sin Datos'
                        
                    />

                    <ReactTable 
                    data={this.state.turnado}
                    columns={this.columnas}
                    defaultPageSize={3}
                    className="-highlight"
                    showPagination={false}
                    noDataText='Sin Datos'
                    
                />
                </div>
                <div className='Modal-search-auditoria'>
                    <button className='btn btn-sm btn-primary' onClick={this.HandleSubmit.bind(this)}>Aceptar</button>
                </div>
                
            </Modal>
        )
    }
}
