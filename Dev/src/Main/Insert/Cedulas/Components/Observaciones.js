import React, { Component } from 'react';
import {Request, Get, Patch, withAxios } from 'react-axios';
import ReactTable from 'react-table';

export default class Observaciones extends Component {
    
    state = {
        table:true
    }

    columns = [
        {
            Header:'Pagina',
            accessor:'pagina'
        },
        {
            Header:'Parrafo',
            accessor:'parrafo'
        },
        {
            Header:'Observacion',
            accessor:'observacion'
        },
        {
            Header:'Estatus',
            accessor:'estatus'
        }
    ]

    HandleClickAdd(event){
        event.preventDefault()
        this.setState({
            table:false
        })
    }

    
    
    render(){
        if(this.state.table){
            return(
                <div>
                    <button className='btn btn-primary btn-sm' onClick={this.HandleClickAdd.bind(this)}>Nueva Observacion</button>
                    <Get url={'/SIA/juridico/Observaciones/'+this.props.volante}>
                        {(error, response, isLoading, onReload) => {
                            if(response !== null) {
                                return <ReactTable 
                                    data={response.data}
                                    columns={this.columns}
                                    pageSizeOptions={[5]}
                                    defaultPageSize={5}
                                    className="-highlight"
                                    previousText='Anterior'
                                    nextText='Siguiente'
                                    noDataText='Sin Datos'
                                    pageText='Pagina'
                                    ofText= 'de'
                                    //getTrProps={this.HandleClickTr.bind(this)}
                                />
                            } else {
                                return (<div>Loading....</div>)
                            }
                        }}
                    </Get>
                </div>
            )
        } else {
            return (<div>
                <form className='Form'>
                    
                </form>
            </div>)
        }
                
                    
                
            
            
           
        
    }
}