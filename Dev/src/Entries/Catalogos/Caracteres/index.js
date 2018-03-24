import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Home from './../../../Pages/Catalogos/Caracteres/index';

const  root = document.getElementById('root');

function getHomeData(){
    return axios.get('/SIA/juridico/Api/HomeData');
}

function getRegisters(){
    return axios.get('/SIA/juridico/Caracteres/Registers')
}


function load(){

    axios.all([getHomeData(),getRegisters()])
    .then(axios.spread((HomeData,Registers)=> {
        render(
            <Home 
                data={HomeData.data} 
                registers={Registers.data}
            />
            ,root)
    }))
}

load();