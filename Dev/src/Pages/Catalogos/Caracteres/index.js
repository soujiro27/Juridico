import React, { Component } from 'react';
import HomeLayout from './../../Containers/HomeLayout';
import Header from './../../../Home/Header/Containers/index';
import MainContainer from './../../../Main/Container/MainContainer';
import Menu from './../../../Menu/Containers/index';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../../../../Assets/js/fontawesome-all.min';
export default class Home extends Component {

    render(){
        return(
            <HomeLayout>
                <Header header={this.props.data.header} />
                <MainContainer>
                    <Menu modulos={this.props.data.modulos}/>
                </MainContainer>
            </HomeLayout>
        )
        
    }
}