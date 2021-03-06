import React, { Component } from 'react';

export default class SelectInput extends Component {

    HandleChange(event){
        this.props.changeValue(event.target.value)
    }



    render(){
        return (
            <div className={this.props.class}>
                <label className={this.props.classLabel}>Documento</label>
                <select 
                    className={this.props.classSelect}  
                    onChange={this.HandleChange.bind(this)}
                    defaultValue={this.props.value}
                    name='idTipoDocto'
                    required
                    >
                    <option value="">Escoga una Opcion</option>
                    {
                        this.props.data.map((item) =>(
                            <option 
                                key={item.idTipoDocto}
                                value={item.idTipoDocto}
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