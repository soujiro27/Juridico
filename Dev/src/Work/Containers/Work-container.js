import React from 'react';
import './work-container.styl';

const WorkContainer = (props) => (
    <section className="Work">
        {props.children}
    </section>
)

export default WorkContainer;