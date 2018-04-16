import React, { Component } from 'react';

export default class Active extends Component{
    render(){
        return(
            <div className={this.props.class}>
            <label className={this.props.classLabel}>Estatus</label>    
                <select name='estatus' className={this.props.classSelect}  defaultValue={this.props.estatus} >
                    <option value="ACTIVO">ACTIVO</option>
                    <option value="INACTIVO">INACTIVO</option>
                </select>
            </div>
        )
    }
}