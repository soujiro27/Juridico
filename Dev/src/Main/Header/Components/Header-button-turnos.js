import React, { Component } from 'react';
import './../Container/Header.styl'
export default class ButtonCedulas extends Component {

    state ={
        text:'Asignacion',
        menu:false
    }

    Menu(event){
        event.preventDefault();
        this.setState({
            menu:!this.state.menu
        })
        
    }

    HandleMenuChange(event){
        let valor = event.target.value
        let nombre = event.target.innerHTML
        this.setState({
            text:nombre,
            menu:!this.state.menu
        })

        this.props.menu(valor)

    }

    render(){
        
        return(
            <div className='row Header-menu-cedulas'>
                <button className='btn btn-sm btn-primary' onClick={this.Menu.bind(this)}>    
                    <i className="fas fa-bars"></i>
                </button>
                <p>{this.state.text}</p>
                {
                    this.state.menu &&
                
                    <ul className='Header-subMenu-cedula'>
                        <li value='1' onClick={this.HandleMenuChange.bind(this)}>Asignacion</li>
                        <li value='2' onClick={this.HandleMenuChange.bind(this)}>Respuestas</li>
                    </ul>
            
                }
            
            </div>
        )
    }
}