import React from 'react';


const Text = ({ error, ...props }) =>(
    <div className={props.col}>
        <label>{props.label}</label>
        <input type="text" {...props} className="form-control" />
        <p>{error}</p>
    </div>
) 


export default Text