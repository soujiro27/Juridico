import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import "./table.styl"

export default class Table extends Component{

    state = {
        data:this.props.datos
    }

    TrProps(state,rowInfo,column){
        return {
            onClick:(e,handle) => {
                if(rowInfo){
                    let url = '/SIA/juridico/'+this.props.url+'/'+rowInfo.original.idAccion
                    location.href = url
                }
               
           }
       }
    }

    render(){
        
        const data = this.state.data
        const columns = [
            {
                Header:'Nombre',
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
                showPageSizeOptions={false}
                previousText='Anterior'
                nextText='Siguiente'
                pageText='Pagina'
                ofText='de'
                className='React-table'
                headerClassName="Table-header"
                getTdProps={this.TrProps.bind(this)} 
            />
        )
    }
}
