import React from 'react';

const buttonAdd = (props) => (
    <div className="Work-header-button-add">
        <a href={'/SIA/juridico/'+props.url+'/New'} className="btn btn-primary">
            Nuevo Registro
        </a>
    </div>
)

export default buttonAdd;