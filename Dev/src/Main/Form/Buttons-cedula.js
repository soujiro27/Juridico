import React, { Component } from 'react';


export default class Buttons extends Component{
    render(){
        return(
            <div className="row Form-save-button">
                <input type="submit" className='btn btn-primary btn-sm' value='Guardar' />
                <button className='btn btn-danger btn-sm' onClick={this.props.cancel}>
                    Cancelar
                </button>
                <button className='btn btn-warning btn-sm icon print' onClick={this.props.print}>
                    <i className="fas fa-print"></i>
                    Cedula
                </button>
            </div>
        )
    }
}