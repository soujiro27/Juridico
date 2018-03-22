import React, { Component } from 'react';
import HomeLayout from './../../Containers/HomeLayout';
import Header from './../../../Home/Header/Containers/index';

export default class Home extends Component {
    render(){
        return (
            <HomeLayout >
                <Header />
            </ HomeLayout>
        )
    }
}