import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Home from './../../../Pages/Catalogos/Caracteres/index';

const  root = document.getElementById('root');

function load(){
    axios.get('/SIA/juridico/Api/HomeData')
    .then((response) => {
        render(<Home data={response.data} />,root)
    })
}

load();