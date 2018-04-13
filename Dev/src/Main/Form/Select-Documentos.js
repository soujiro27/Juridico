import React, { Component } from 'react';

export default class SelectInput extends Component {

    HandleChange(event){
        this.props.changeValue(event.target.value)
    }



    render(){
        return (
            <div className={this.props.class}>
                <label className={this.props.classLabel}>Documento</label>
                <select className={this.props.classSelect}  onChange={this.HandleChange.bind(this)}>
                    <option value="">Seleccione un elemento</option>
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