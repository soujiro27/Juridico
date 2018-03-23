import React, { Component } from 'react';

export default class Element extends Component {

    render(){
        return(
            <li className="Menu-item">
                <div className="Menu-item-container">
                    <div className="Menu-item-icon">
                        <i class={this.props.item.icon}></i>
                    </div>
                    <p>{this.props.item.nombre}</p>
                </div>
                <ul className="Menu-sub">
                    {
                        this.props.item.submenus.map(element =>(
                            <li>
                                <a href={element.liga}>
                                    <i className={element.icono}></i> 
                                    <p>{element.nombre.toUpperCase()}</p>
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </li>
        )
    }
}