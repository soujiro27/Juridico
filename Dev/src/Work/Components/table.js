import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";


export default class Table extends Component{

    state = {
        data:this.props.datos
    }

    render(){
        
        const data = this.state.data
        console.log(data)
        return(
            <ReactTable 
                data = {data}
                columns = {[
                    {
                        columns:[
                            {
                                Header:'Siglas',
                                accessor:'siglas'
                            }
                        ],
                        columns:[
                            {
                                Header:'Nombre',
                                accessor:'nombre'
                            }
                        ]
                    }
                ]}
                defaultPageSize={5}
                className="-striped -highlight"
            />
        )
    }
}
