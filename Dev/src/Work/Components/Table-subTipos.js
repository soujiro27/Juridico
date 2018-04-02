import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import "./table.styl"

export default class Table extends Component{

    state = {
        data:this.props.datos
    }

    render(){
        
        const data = this.state.data
        const columns = [
            {
                Header:'Tipo',
                accessor:'idTipoDocto'
            },            
            {
                Header:'nombre',
                accessor:'nombre'
            },
            {
                Header:'Estatus',
                accessor:'estatus'
            }
        ]

        return(
            <ReactTable
            data={data}
            columns={columns}
            defaultPageSize={10}
            showPageSizeOptions={true}
            previousText= 'Anterior'
            pageSizeOptions = {[5,10]}
            nextText='Siguiente'
            pageText= 'Pagina'
            ofText= 'de'
            className="React-table"
            headerClassName="Table-header"
          />
        )
    }
}
