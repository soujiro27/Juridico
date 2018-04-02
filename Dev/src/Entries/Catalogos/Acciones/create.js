import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Home from './../../../Pages/Catalogos/Acciones/create';

const  root = document.getElementById('root');



function url(){
    let url = window.location
    let urlPath = url.pathname
    let array = urlPath.split('/')
    return array[3]
}


function load(){

    let btnadd = url()

    axios.get('/SIA/juridico/Api/HomeData')
    .then(((HomeData)=> {
        render(
            <Home 
                data={HomeData.data}
                url={btnadd} 
            />
            ,root)
    }))
}

load();