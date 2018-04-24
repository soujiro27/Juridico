import React, { Component } from 'react';

export default class SelectInput extends Component {

    render(){
        return (
            <div className={this.props.class}>
                <label className={this.props.classLabel}>Enviar A:</label>
                <select 
                    className={this.props.classSelect}  
                    defaultValue={this.props.value}
                    name='idPuestoJuridico'
                    required
                    >
                    <option value="">Escoga una Opcion</option>
                    {
                        this.props.data.map((item) =>(
                            <option 
                                key={item.idPuestoJuridico}
                                value={item.idPuestoJuridico}
                            >
                                {item.saludo} {item.nombre} {item.paterno} {item.materno}
                            </option> 
                        ))
                    }
                </select>
            </div>
        )
    }

}