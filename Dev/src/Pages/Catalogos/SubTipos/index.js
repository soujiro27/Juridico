import React, { Component } from 'react';
import HomeLayout from './../../Containers/HomeLayout';
import Line from './../../Containers/line-header';
import Header from './../../../Home/Header/Containers/index';
import MainContainer from './../../../Main/Container/MainContainer';
import Menu from './../../../Menu/Containers/index';
import LineMenu from './../../Containers/line-menu';
import Work from './../../../Work/Containers/Work-container';
import WorkHeader from './../../../Work/Containers/Work-header-container';
import WorkHeaderText from './../../../Work/Components/table-header-text';
import ButtonAdd from './../../../Work/Components/table-header-button-add';


import WorkTable from './../../../Work/Containers/Work-table-container';
import Table from './../../../Work/Components/Table-subTipos';

import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../../../../Assets/js/fontawesome-all.min';
export default class Home extends Component {

    render(){
        return(
            <HomeLayout>
                <Header header={this.props.data.header} />
                <Line />
                <MainContainer>
                    <Menu modulos={this.props.data.modulos}/>
                    <LineMenu />
                    <Work>
                        <WorkHeader>
                            <WorkHeaderText />
                            <ButtonAdd url={this.props.url}/>
                        </WorkHeader>
                        <WorkTable>
                            <Table datos={this.props.registers}/>
                        </WorkTable>
                    </Work>
                </MainContainer>
            </HomeLayout>
        )
        
    }
}