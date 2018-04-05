import React from 'react';

const HeaderTitle = (props) => (
    <div className="col-lg-2 Header-title">
        <p className="Header-title-text">
            <i className={props.icon}></i>
            {props.text}
        </p>
    </div>
)

export default HeaderTitle;