import React from 'react';

const InputNumber = (props) => (
    <div className={props.class}>
        <label className={props.classLabel}>{props.label}</label>    
        <input 
            type='text'
            name={props.name}
            maxLength={props.max}
            className={props.classInput}
            readOnly={props.read}
            defaultValue={props.value}
            required
        />

    </div>   
)


export default InputNumber;