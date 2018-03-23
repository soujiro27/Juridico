import React, { Component } from 'react';

import Logo from './../Components/logo';
import Cuenta from './../Components/cuentaPublica';
import Modulo from './../Components/Modulo';
import Notificaciones from './../Components/Notificaciones';
import User from './../Components/User';
import './index.styl';

export default class Header  extends Component{

    render(){
        return(
            <header className="Header row">
                <Logo />
                <Cuenta cuenta={this.props.header.cuentaPublica} />
                <Modulo modulo={this.props.header.modulo} />
                <Notificaciones notificaciones={this.props.header.notificaciones} />
                <User user={this.props.header.usuario} />
            </header>
        )
    }
}