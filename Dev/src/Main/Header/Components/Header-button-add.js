import React, { Component } from 'react';


export default class ButtonAdd extends Component{

    state = {

    }

    HandleClick(){
        this.props.open(false)
    }


    render(){
        return(
            <div className="Header-btn-add col-lg-2 offset-lg-8">
            <button className="btn btn-sm btn-primary" onClick={this.HandleClick.bind(this)}>
                Nuevo Registro
            </button>
        </div>
        )
    }
}

