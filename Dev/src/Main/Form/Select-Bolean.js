import React from 'react';

const Select = (props) => (
    <div className={props.class}>
        <label className={props.classLabel}>{props.label}</label>    
        <select name={props.name} className={props.classSelect}  defaultValue={props.estatus}  required>
                <option value="">Escoga una Opcion</option> 
                <option value="SI">SI</option>
                <option value="NO">NO</option>
        </select>
    </div>   
)


export default Select;