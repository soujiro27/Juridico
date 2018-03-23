import React from 'react';
import './cuentaPublica.styl'
const Cuenta = (props) => (
    <div className="Header-cuenta col-lg-2">
        <p>
            <i class="fas fa-archive"></i>
            {props.cuenta}
        </p>
    </div>
)

export default Cuenta;