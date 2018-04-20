import React from 'react';

const Select = (props) => (
    <div className={props.class}>
        <label className={props.classLabel}>{props.label}</label>    
        <select 
            name={props.name} 
            className={props.classSelect}  
            defaultValue={props.estatus}  
            onChange={props.change}
            required
        >
                <option value="">Escoga una Opcion</option> 
                <option value="I">Interno</option>
                <option value="E">Externo</option>
        </select>
    </div>   
)


export default Select;