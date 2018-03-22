import React, { Component } from 'react';
import HomeLayout from './../../Containers/HomeLayout';
import Header from './../../../Home/Header/Containers/index';
import MainContainer from './../../../Main/Container/MainContainer';

export default class Home extends Component {

    render(){
        return(
            <HomeLayout>
                <Header header={this.props.data.header} />
                <MainContainer>
                </MainContainer>
            </HomeLayout>
        )

       
           
        
    }
}