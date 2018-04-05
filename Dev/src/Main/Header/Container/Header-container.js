import React from 'react';
import './Header.styl';

const Header = (props) => (
    <div className="row Header">
        {props.children}
    </div>
)

export default Header;