import React, { Component } from 'react';
import axios from 'axios';

import Logo from './../Components/logo';
import Cuenta from './../Components/cuentaPublica';
import Modulo from './../Components/Modulo';
import Notificaciones from './../Components/Notificaciones';
import User from './../Components/User';

export default class Header  extends Component{

    state = {
        datos:[]
    }


    componentWillMount(){
        axios.get('/SIA/juridico/Api/headerData')
        .then((response)=>{
            this.setState({
                datos:response.data
            })
        })
    }

    render(){
        return(
            <header className="Header">
                <Logo />
                <Cuenta cuenta={this.state.datos.cuentaPublica} />
                <Modulo modulo={this.state.datos.modulo} />
                <Notificaciones notificaciones={this.state.datos.notificaciones} />
                <User user={this.state.datos.usuario} />
            </header>
        )
    }
}