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
            Header:'Folio',
            accessor:'folio',
            width:50
        },
        {
            Header:'SubFolio',
            accessor:'subFolio',
            width:80
        },
        
        
        {
            Header:'Documento',
            accessor:'numDocumento',
        },
        {
            Header:'Turnado',
            accessor:'idAreaRecepcion'
        },
        {
            Header:'Fecha Recepcion',
            accessor:'fRecepcion'
        },
        {
            Header:'Estado',
            accessor:'idEstadoTurnado',
            width:120
        },
]

    HandleClickTr(state, rowInfo, column){
        return {
            onClick:(e,handleOriginal) =>{
                this.props.dataId(rowInfo.original.idVolante,rowInfo.original.idAreaRecepcion)
            }
        }
    }


    render(){
        return(
            <ReactTable 
                data={this.state.data}
                columns={this.columns}
                pageSizeOptions={[15,20,25,30]}
                defaultPageSize={10}
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
        )
    }
}