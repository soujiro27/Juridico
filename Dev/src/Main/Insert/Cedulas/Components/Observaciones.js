import React, { Component } from 'react';
import {Get} from 'react-axios';
import { GridLoader } from 'react-spinners';
import ReactTable from 'react-table';
import axios from 'axios';


import Pagina from './../../../Form/Input-Number';
import Parrafo from './../../../Form/Input-Text';
import TextEditor from './../../../Form/Text-editor';
import Estatus from './../../../Form/Select-Activo';
import Buttons from './../../../Form/Buttons';
import Hidden from './../../../Form/Input-Hidden';

import Modal from './../../../Modal/Components/Modal-form';

export default class Observaciones extends Component {
    
    state = {
        table:true,
        form:{
            texto:'',
            id:'',
            pagina:'',
            parrafo:'',
            observacion:'',
            estatus:'',
            idObsv:''

        },
        visible:{
            modal:false,
            insert:false,
            updated:false
        }
    }

    columns = [
        {
            Header:'Pagina',
            accessor:'pagina',
            width:70
        },
        {
            Header:'Parrafo',
            accessor:'parrafo',
            width:70
        },
        {
            Header:'Observacion',
            accessor: props =>{
                let parse = new DOMParser()
                let el = (parse.parseFromString(props.observacion,'text/html'))
                return el.body.textContent
            },
            id:'id'
        },
        {
            Header:'Estatus',
            accessor:'estatus',
            width:70
        }
    ]

    HandleClickAdd(event){
        event.preventDefault()
        this.setState({
            table:false,
            visible:{
                insert:true
            }
        })
    }

    HandleChangeTextEditor(value){
        this.setState({
            form:{
                texto:value
            }
        })
    }

    HandleCancel(){
        this.setState({
            table:true
        })
    }
    
    HandleSubmitInsert(event){
        event.preventDefault()
        let form = new FormData(event.target)
        form.append('texto',this.state.form.texto)
        form.append('idVolante',this.props.volante)
        axios.post('/SIA/juridico/Observaciones/Save',form).then(json=>{
            this.setState({
                visible:{
                    modal:true,
                    insert:true
                },
                message:json.data[0]
                })
        })
    }


    HandleSubmitUpdate(event){
        event.preventDefault()
       
        let form = new FormData(event.target)
        form.append('texto',this.state.form.texto)
        form.append('idVolante',this.props.volante)
        axios.post('/SIA/juridico/Observaciones/Update',form).then(json=>{
            this.setState({
                visible:{
                    modal:true,
                    insert:true
                },
                message:json.data[0]
                })
        })
    }
    
    HanldeModalClose(value){

        if(this.state.message == 'success'){
            this.setState({
                table:true,
                visible:{
                    modal:false,
                    updated:false,
                    insert:false
                }
            })
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
                //console.log(rowInfo.original)
                this.setState({
                    form:{
                        idObsv:rowInfo.original.idObservacionDoctoJuridico,
                        pagina:rowInfo.original.pagina,
                        parrafo:rowInfo.original.parrafo,
                        texto:rowInfo.original.observacion,
                        estatus:rowInfo.original.estatus,
                    },
                    table:false,
                    visible:{
                        updated:true
                    }
                })
                
            }
        }
    }

    
    render(){
    
        if(this.state.table){
            return(
                <div>
                    <button className='btn btn-info btn-sm btn-add-obsv' onClick={this.HandleClickAdd.bind(this)}>Nueva Observacion</button>
                    <Get url={'/SIA/juridico/Observaciones/'+this.props.volante}>
                        {(error, response, isLoading, onReload) => {
                            if(response !== null) {
                                return <ReactTable 
                                    data={response.data}
                                    columns={this.columns}
                                    pageSizeOptions={[5,10,15]}
                                    defaultPageSize={5}
                                    className="-highlight"
                                    previousText='Anterior'
                                    nextText='Siguiente'
                                    noDataText='Sin Datos'
                                    pageText='Pagina'
                                    ofText= 'de'
                                    getTrProps={this.HandleClickTr.bind(this)}
                                />
                            } else {
                                return (<GridLoader
                                    color={'#750c05'} 
                                    loading={isLoading} 
                                />)
                            }
                        }}
                    </Get>
                </div>
            )
        } else if(this.state.visible.insert) {
            return (<div>
                <form className='Form' onSubmit={this.HandleSubmitInsert.bind(this)}>
                    <Pagina 
                        class='col-lg-2'
                        label='Hoja'
                        name='pagina'
                        min='1'
                        max='999'
                        classInput='form-control form-control-sm'
                    />
                    <Parrafo
                        class='col-lg-2 bottom'
                        label='Parrafo'
                        name='parrafo'
                        max='20'
                        classInput='form-control form-control-sm'
                    />

                    <label className='col-lg-2'>Observacion:</label>
                    <TextEditor inputTextEditor={this.HandleChangeTextEditor.bind(this)} />
                    <Buttons cancel={this.HandleCancel.bind(this)} />
                </form>
                {
                    this.state.visible.modal &&
                        <Modal 
                            message={this.state.message} 
                            open={this.state.visible.modal}
                            modalClose={this.HanldeModalClose.bind(this)}
                            />
                }
            </div>)
        } else if(this.state.visible.updated){
            return(
                <div>
                    <form className='Form form-row' onSubmit={this.HandleSubmitUpdate.bind(this)}>
                    <Pagina 
                        class='col-lg-2'
                        label='Hoja'
                        name='pagina'
                        min='1'
                        max='999'
                        classInput='form-control form-control-sm'
                        value={this.state.form.pagina}
                    />
                    <Parrafo
                        class='col-lg-2 '
                        label='Parrafo'
                        name='parrafo'
                        max='20'
                        classInput='form-control form-control-sm'
                        value={this.state.form.parrafo}
                    />
                    <Estatus 
                        class='col-lg-2 bottom'
                        classSelect='form-control form-control-sm'
                        estatus={this.state.form.estatus}
                    />
                    <TextEditor inputTextEditor={this.HandleChangeTextEditor.bind(this)} texto={this.state.form.texto} />
                    <Hidden name='id' value={this.state.form.idObsv} />
                 
                    <Buttons cancel={this.HandleCancel.bind(this)} />
                </form>
                {
                    this.state.visible.modal &&
                        <Modal 
                            message={this.state.message} 
                            open={this.state.visible.modal}
                            modalClose={this.HanldeModalClose.bind(this)}
                            />
                }
            </div>)
            
        } 
        
    }
}