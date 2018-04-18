import React from 'react';

const ButtonAuditoria = (props) => (
    <div className={props.class}>
        <label className={props.classLabel}>Auditoria</label>    
        <button className="btn btn-info btn-sm" onClick={props.auditoria}>Agregar</button>
    </div>   
)


export default ButtonAuditoria;