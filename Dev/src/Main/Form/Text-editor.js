import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class TextoEditor extends Component {
    
    HandleChange(value){
        this.props.inputTextEditor(value)
    }

    toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                              // text direction
    
     
          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
                                            // remove formatting button
      ];



    render(){
        return(
            <ReactQuill 
                className='editor' 
                onChange={this.HandleChange.bind(this)} 
                defaultValue={this.props.texto}
                name='texto'  modules={{
                toolbar:this.toolbarOptions
            }}/>
        )
    }
}