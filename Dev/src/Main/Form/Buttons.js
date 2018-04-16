import React, { Component } from 'react';


export default class Buttons extends Component{
    render(){
        return(
            <div className="row Form-save-button">
                <input type="submit" className='btn btn-primary' value='Guardar' />
                <button className='btn btn-danger' onClick={this.props.cancel}>
                    Cancelar
                </button>
            </div>
        )
    }
}