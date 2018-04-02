import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Home from './../../../Pages/Catalogos/Acciones/create';

const  root = document.getElementById('root');


function load(){

    axios.get('/SIA/juridico/Api/HomeData')
    .then(((HomeData)=> {
        render(
            <Home 
                data={HomeData.data} 
            />
            ,root)
    }))
}

load();