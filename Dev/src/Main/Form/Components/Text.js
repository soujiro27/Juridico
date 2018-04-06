import React from 'react';


const Text = ({ error, ...props }) =>(
    <div className={props.col}>
        <label>{props.label}</label>
        <input type="text"  className="form-control" {...props} />
        <p>{error}</p>
    </div>
) 


export default Text