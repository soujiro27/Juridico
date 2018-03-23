import React, { Component } from 'react';

import './Notificaciones.styl';




export default class Notificaciones extends Component {
    render(){
        return(
            <div className="Header-notificaciones col-lg-2">
            <a href="#!"> 
                {
                    this.props.notificaciones > 0 ?
                    <i class="far fa-bell animate"></i> :
                    <i class="far fa-envelope-open"></i>
                }
                Tienes 
                <span>
                    {this.props.notificaciones}
                </span> 
                Notificaciones 
            </a>
        </div>
        )
    }
}