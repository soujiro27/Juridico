import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class TableRegisters extends Component{
    
    
    state = {
        data: this.props.registers
    }

    columns = [
        {
            Header:'Siglas',
            accessor:'siglas'
        },
        {
            Header:'Nombre',
            accessor:'nombre'
        },
        {
            Header:'Estatus',
            accessor:'estatus'
        }
]

    HandleClickTr(state, rowInfo, column){
        return {
            onClick:(e,handleOriginal) =>{
                this.props.dataId(rowInfo.original.idCaracter)
            }
        }
    }


    render(){
        return(
            <ReactTable 
                data={this.state.data}
                columns={this.columns}
                pageSizeOptions={[5]}
                defaultPageSize={5}
                className="-highlight"
                previousText='Anterior'
                nextText='Siguiente'
                noDataText='Sin Datos'
                pageText='Pagina'
                ofText= 'de'
                getTrProps={this.HandleClickTr.bind(this)}
            />
        )
    }
}