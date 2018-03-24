import React from 'react';
import './Work-header-container.styl'
const workHeader = (props) => (
    <div className="Work-header">
        {props.children}
    </div>
)

export default workHeader;