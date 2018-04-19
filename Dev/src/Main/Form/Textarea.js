import React from 'react';

const TextArea = (props) => (
    <div className={props.class}>
        <label className={props.classLabel}>{props.label}</label>    
        <textarea rows='3' maxLength='350' className={props.classTextArea} name={props.name} defaultValue={props.value}></textarea>
    </div>   
)


export default TextArea;