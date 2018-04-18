import React, { Component } from 'react';


export default class InputFile extends Component{

    render(){
        return(
            <div className={this.props.class}>
                <label className={this.props.classLabel}>Anexar Archivo</label>    
                <input type="file" name="file" className={this.props.classInput} id='file'/>
    </div>   
        )
    }
}
