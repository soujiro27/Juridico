import React from 'react';

const InputNumber = (props) => (
    <div className={props.class}>
        <label className={props.classLabel}>{props.label}</label>    
        <input 
            type='number'
            name={props.name}
            max={props.max}
            min={props.min}
            pattern='[0-9]+'
            className={props.classInput}
            required
            
        />

    </div>   
)


export default InputNumber;