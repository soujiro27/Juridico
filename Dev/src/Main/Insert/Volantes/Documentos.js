import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import InputFile from './../../Form/Input-File';
import Buttons from './../../Form/Buttons'


import Modal from './../../Modal/Components/Modal-form';
import './../form.styl';
import Form from 'react-jsonschema-form';
export default class Insert extends Component{

    state = {
        visible:{
            modal:false,
            modalClose:false
        },
        message:'',
        data:[]
    }

    columns = [
        {
            Header:'Enviado Por:',
            accessor:'idAreaRemitente',
           
        },
        {
            Header:'Fecha',
            accessor:'fAlta',
            

        },
        {
            Header:'Archivo',
            accessor:'archivoFinal',
           
        }
       
    ]
    
    
    HandleSubmit(event){
       
        event.preventDefault();
      
        let form = new FormData()
        form.append('file', document.getElementById('file').files[0]);
        form.append('idVolante',this.props.data[0].idVolante)
        form.append('idTurnadoJuridico',this.props.data[0].idTurnadoJuridico)
        axios.post('/SIA/juridico/DocumentosGral/Save',form)
        .then(response => {
            this.setState({
                visible:{
                    modal:true,
                },
                message:response.data[0]
                })
        })
        
    }


    HandleCancel(event){
        event.preventDefault()
        this.props.cancel(false)
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



    
    HandleClickTr(state, rowInfo, column){
        return {
            onClick:(e,handleOriginal) =>{
                let datos = rowInfo.original
                location.href = `/SIA/juridico/files/${datos.idVolante}/Areas/${datos.archivoFinal}`
            }
        }
    }

    render(){
        let datos
       
        
            return(
            
                <div>
                <ReactTable 
                    data={this.props.data}
                    columns={this.columns}
                    pageSizeOptions={[5,10]}
                    defaultPageSize={5}
                    className="-highlight"
                    previousText='Anterior'
                    nextText='Siguiente'
                    noDataText='Sin Datos'
                    pageText='Pagina'
                    resizable={true}
                    ofText= 'de'
                    getTrProps={this.HandleClickTr.bind(this)}
    
                />
                    <form className='Form' onSubmit={this.HandleSubmit.bind(this)} >
                        <div className='form-row bottom'>
                            <InputFile 
                                class='col-lg-6'
                                label='Anexar Documento'
                                classInput='form-control form-control-sm'
                            />    
                        </div>
                    
                            <Buttons cancel={this.HandleCancel.bind(this)}  />
                        
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
}