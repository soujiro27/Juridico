import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { parse } from 'url';

export default class TableRegisters extends Component{
    
    
    state = {
        data: this.props.registers
    }

   

    columns = [
        {
            Header:'Documento',
            accessor:'idTipoDocto',
            width:100
        },
        {
            Header:'Texto',
            accessor: props =>{
                let parse = new DOMParser()
                let el = (parse.parseFromString(props.texto,'text/html'))
                return el.body.textContent
            },
            id:'id'
    
        },
        {
            Header:'Estatus',
            accessor:'estatus',
            width:120
        },
]

    HandleClickTr(state, rowInfo, column){
        return {
            onClick:(e,handleOriginal) =>{
                this.props.dataId(rowInfo.original.idDocumentoTexto)
            }
        }
    }


    render(){
        return(
            <ReactTable 
                data={this.state.data}
                columns={this.columns}
                pageSizeOptions={[5,10,15]}
                defaultPageSize={10}
                className="-highlight"
                previousText='Anterior'
                nextText='Siguiente'
                noDataText='Sin Datos'
                pageText='Pagina'
                resizable={true}
                ofText= 'de'
                getTrProps={this.HandleClickTr.bind(this)}
            />
        )
    }
}