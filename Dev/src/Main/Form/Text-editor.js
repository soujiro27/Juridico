import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class TextoEditor extends Component {
    
    HandleChange(value){
        this.props.inputTextEditor(value)
    }


    render(){
        return(
            <ReactQuill onChange={this.HandleChange.bind(this)} name='texto' />
        )
    }
}