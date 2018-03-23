import React from 'react';
import './MainContainer.styl';
const MainContainer = (props) => (
    <main className="row Main-container">
        {props.children}
    </main>
)

export default MainContainer;
