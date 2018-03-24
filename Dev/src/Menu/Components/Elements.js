import React, { Component } from 'react';
import Fade from 'react-fade-in';
export default class Element extends Component {

    state = {
        visible : false
    }


    handleClickSubmenu(){
        this.setState({
            visible:!this.state.visible
        })
    }


    render(){
        return(
            <li className="Menu-item" onClick={this.handleClickSubmenu.bind(this)}>
                <div className={this.state.visible? "Menu-item-container active" : "Menu-item-container" } >
                    <div className="Menu-item-icon">
                        <i className={this.props.item.icon}></i>
                    </div>
                    <p>{this.props.item.nombre}</p>
                    <i className="fas fa-angle-right arrow-down"></i>
                </div>
                {

                this.state.visible &&
                <Fade>
                <ul className="Menu-sub">
                    {
                        this.props.item.submenus.map(element =>(
                            <li key={element.nombre}>
                                <a href={element.liga}>
                                    <i className={element.icono}></i> 
                                    <p>{element.nombre.toUpperCase()}</p>
                                </a>
                            </li>
                        ))
                    }
                </ul>
                </Fade>
            }
            </li>
        )
    }
}