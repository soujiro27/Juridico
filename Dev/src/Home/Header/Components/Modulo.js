import React from 'react';
import './Modulo.styl';

const Modulo = (props) => (
    <div className="Header-modulo col-lg-3">
        <h2>
            <i class="fas fa-desktop"></i>
            {props.modulo}
        </h2>
    </div>
)

export default Modulo;