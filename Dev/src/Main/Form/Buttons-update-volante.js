import React, { Component } from 'react';


export default class Buttons extends Component{



    render(){
        return(
            <div className="row Form-save-button">
                {
                    this.props.hide == 'ACTIVO' &&
                    <input type="submit" className='btn btn-primary btn-sm' value='Guardar' />
                }

                    <button className='btn btn-danger btn-sm' onClick={this.props.cancel}>
                        Cancelar
                    </button>
                {
                    this.props.hide == 'ACTIVO' &&
                    <button className='btn-warning btn btn-sm closeVolante' onClick={this.props.closeVolante}>
                        <i className="fas fa-pencil-alt"></i>
                        Cerrar Volante
                    </button>
                    
                }
                    
                
            </div>
        )
    }
}