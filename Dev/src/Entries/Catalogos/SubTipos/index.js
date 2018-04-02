import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Home from './../../../Pages/Catalogos/SubTipos/index';

const  root = document.getElementById('root');

function getHomeData(){
    return axios.get('/SIA/juridico/Api/HomeData');
}

function getRegisters(){
    return axios.get('/SIA/juridico/SubTiposDocumentos/Registers')
}


function url(){
    let url = window.location
    let urlPath = url.pathname
    let array = urlPath.split('/')
    return array[3]
}

function load(){

    let btnadd = url()

    axios.all([getHomeData(),getRegisters()])
    .then(axios.spread((HomeData,Registers)=> {
        render(
            <Home 
                data={HomeData.data} 
                registers={Registers.data}
                url={btnadd}
            />
            ,root)
    }))
}

load();