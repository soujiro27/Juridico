import React, { Component } from 'react';
import { Get } from 'react-axios'
import { GridLoader } from 'react-spinners';
import Table from './../Components/Irac-registers'
import './Table.styl';
export default class TableContainer extends Component {
    
    getId(value){
        this.props.idRegister(value)
    }

    render(){
        return(
        <div className="row Registers">
            <Get url='/SIA/juridico/Irac-Internos/Registers' >
            {(error, response, isLoading, onReload) => {
                if(error) {
                    return (<div>Algo ha ocurrido: {error.message} <button onClick={() => onReload({ params: { reload: true } })}>Recargar</button></div>)
                }
                else if(isLoading) {
                    return (<GridLoader
                        color={'#750c05'} 
                        loading={isLoading} 
                    />)
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