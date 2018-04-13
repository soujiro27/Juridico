import React, { Component } from 'react';
import axios from 'axios';
import { AxiosProvider, Request, Get, Patch, withAxios } from 'react-axios';

const Test = withAxios(class tester extends Component{

    state = {
        documentos:'',
        subdocumentos:''
    }
    
    documentos  = () =>(
        axios.get('/SIA/juridico/Api/Documentos')
    )

    subDocumentos = () => (
        axios.get('/SIA/juridico/DoctosTextos/1009')
    )
    
    componentWillMount(){
        axios.all([
            axios.get('/SIA/juridico/Api/Documentos'),
            axios.get('/SIA/juridico/DoctosTextos/1009')
        ]).then(axios.spread((doc,sub) => {
            console.log(doc.data,sub)
        }))
    }
    render(){
        return(<div>test</div>)
    }
})

export default Test