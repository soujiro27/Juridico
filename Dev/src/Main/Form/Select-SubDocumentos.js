import React, { Component } from 'react';
import axios from 'axios';
export default class SelectInput extends Component {


    HandleChange(event){
        var index = event.nativeEvent.target.selectedIndex
        let texto = event.nativeEvent.target[index].text
        let nombre = event.target.name
        let valor = event.target.value
        this.props.inputVal(nombre,valor,texto)
    }


    render(){
        return (
            <div className={this.props.class}>
                <label className={this.props.classLabel}>Sub Documento</label>
                <select className={this.props.classSelect} 
                    name="idSubTipoDocumento" 
                    onChange={this.HandleChange.bind(this)} 
                    defaultValue={this.props.value}
                    required 
                    >
                    <option value="">Escoga una Opcion</option>
                    {
                        this.props.subdocumentos &&
                        this.props.subdocumentos.map((item) =>(
                            <option 
                                key={item.idSubTipoDocumento}
                                value={item.idSubTipoDocumento}
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