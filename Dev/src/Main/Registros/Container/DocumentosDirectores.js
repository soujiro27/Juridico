import React, { Component } from 'react';
import { AxiosProvider, Request, Get } from 'react-axios'
import Table from './../Components/Documentos-registers'
import './Table.styl';
export default class TableContainer extends Component {
    
    getId(value,area){
        this.props.idRegister(value,area)
    }

    render(){
        return(
        <div className="row Registers">
            <Get url='/SIA/juridico/Documentos/Registers' >
            {(error, response, isLoading, onReload) => {
                if(error) {
                    return (<div>Algo ha ocurrido: {error.message} <button onClick={() => onReload({ params: { reload: true } })}>Recargar</button></div>)
                }
                else if(isLoading) {
                    return (<div>Loading...</div>)
                }
                else if(response !== null) {
                    return ( <Table registers={response.data} dataId={this.getId.bind(this)} /> )
                    
                }

                return (<div>Atendiendo Peticion</div>)
                
            }}
            </Get>
        </div>
        )
    }
}