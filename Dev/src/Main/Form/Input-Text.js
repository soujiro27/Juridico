import React from 'react';

const InputNumber = (props) => (
    <div className={props.class}>
        <label className={props.classLabel}>{props.label}</label>    
        <input 
            type='Text'
            name={props.name}
            maxLength={props.max}
            className={props.classInput}
            readOnly={props.read}
            required
        />

    </div>   
)


export default InputNumber;