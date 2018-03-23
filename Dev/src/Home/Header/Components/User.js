import React, { Component } from 'react';
import FadeIn from 'react-fade-in';
import './User.styl';



export default class User extends Component{

    state = {
        visible:false
    }


    handleClickSubmenu(){
       this.setState({
           visible:!this.state.visible
       })
    }


    render(){
        return(
            <div className="Header-user col-lg-3">
            {
                this.state.visible &&
            <FadeIn>
                <div className="Header-user-submenu">
                    <ul>
                        <li>
                            <a href="#!">
                                <i class="far fa-user"></i>
                                Perfil
                            </a>
                        </li>
                        <li>
                            <a href="#!">
                                <i class="fas fa-sign-out-alt"></i>
                                Salir
                            </a>
                        </li>
                    </ul>
                </div>
            </FadeIn>
            }
            <p onClick={this.handleClickSubmenu.bind(this)}>
            <i class="fas fa-user"></i>
            {this.props.user}
            <i class="fas fa-caret-down"></i>
        </p>
        </div>
        )
    }
}