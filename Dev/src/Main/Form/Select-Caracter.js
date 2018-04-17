import React, { Component } from 'react';

export default class SelectCaracter extends Component {

    HandleChange(event){
        this.props.changeValue(event.target.value)
    }



    render(){
        return (
            <div className={this.props.class}>
                <label className={this.props.classLabel}>Caracter</label>
                <select 
                    className={this.props.classSelect}  
                    onChange={this.HandleChange.bind(this)}
                    defaultValue={this.props.value}
                    name='idCaracter'
                    required
                    >
                    <option value="">Escoga una Opcion</option>
                    {
                        this.props.data.map((item) =>(
                            <option 
                                key={item.idCaracter}
                                value={item.idCaracter}
                            >
                                {item.nombre}
                            </option> 
                        ))
                    }
                </select>
            </div>
        )
    }

}