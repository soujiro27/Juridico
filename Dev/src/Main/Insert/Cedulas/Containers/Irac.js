import React, { Component } from 'react';
import Asignacion from './../Components/Asignacion';
import Respuestas from './../Components/Respuestas';
import Observaciones from './../Components/Observaciones';
import Cedula from './../Components/Cedula-irac';

export default class IracContainer extends Component {
    
    state = {
        option : this.props.option
    }
    
    
    render(){
      
        if(this.props.option == 1 || this.props.option == 0){
            return(<Asignacion cancel={this.props.cancel} volante={this.props.volante} />)
        } else if(this.props.option == 2){
            return(<Respuestas volante={this.props.volante} />)
        } else if(this.props.option == 3){
            return <Observaciones volante={this.props.volante} />
        } else if(this.props.option == 4){
            return <Cedula volante={this.props.volante} cancel={this.props.cancel} />
        }
       
    }
}