import React, { Component } from 'react';


export default class HeaderContainer extends Component {
    
    render(){
        return(
            <div className="row Header">
                {this.props.children}
            </div>
        )
    }
}