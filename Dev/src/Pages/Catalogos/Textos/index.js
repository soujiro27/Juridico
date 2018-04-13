import React, { Component } from 'react';
import { AxiosProvider, Request, Get, Patch, withAxios } from 'react-axios';
import axios from 'axios';
import HomeLayout from './../../Containers/HomeLayout';

/*--------------Header -----------------------*/
import Header from './../../../Main/Header/Container/Header-container';
import Title from './../../../Main/Header/Components/Header-title';
import ButtonAdd from './../../../Main/Header/Components/Header-button-add';

/*------------------ Table Registers ---------*/
import Registers from './../../../Main/Registros/Container/Textos';

import Form from './../../../Main/Insert/Catalogos/Textos';
import Update  from './../../../Main/Update/Catalogo/Textos';
/*-----------------------Form----------------*/

/*------------------Modal--------------------*/
import Test from './../../../Main/Insert/Catalogos/test';


export default class Home extends Component {

    state = {
        header:{
            text:'Lista de Registros',
            icon:'far fa-address-book'
        },
        visible:{
            registers:true,
            insert:false,
            update:false,
            btnAdd:true
        },
        registers:true, //se cambio para checar el formulario
        insert:false,
        update:false,
        updateId:0
    }

    
    HandleClickBtnAdd(value){
        this.setState({
            header:{
                text:'Nuevo Registro',
            },
            visible:{
                btnAdd:!value,
                registers:false,
                insert:true
            }
        })
    }


    VisibleComponents(props){
        const value = props.visible
        if(value.registers){
            return <Registers />
        } else if(value.insert){
            return <Form />
        }
    }



    render(){
        return(
        <HomeLayout >
            <Header>
                <Title text={this.state.header.text} icon={this.state.header.icon} />
                {
                    this.state.visible.btnAdd &&
                    <ButtonAdd open={this.HandleClickBtnAdd.bind(this)} />
                }
            </Header>
            <this.VisibleComponents visible={this.state.visible} />
        </HomeLayout>
        )
        
    }
}