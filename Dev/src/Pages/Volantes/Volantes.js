import React, { Component } from 'react';
import { AxiosProvider, Request, Get, Patch, withAxios } from 'react-axios';
import axios from 'axios';
import HomeLayout from './../Containers/HomeLayout';

/*--------------Header -----------------------*/
import Header from './../../Main/Header/Container/Header-container';
import Title from './../../Main/Header/Components/Header-title';
import ButtonAdd from './../../Main/Header/Components/Header-button-add';
/*------------------ Table Registers ---------*/
import Registers from './../../Main/Registros/Container/Volantes';

import Form from './../../Main/Insert/Volantes/Volantes';
import Update  from './../../Main/Update/Volantes/Volantes';
/*-----------------------Form----------------*/

/*------------------Modal--------------------*/


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
            btnAdd:true,
            btnClose:false
        },
        update:{
            id:0
        }
    }

    
    HandleClickBtnAdd(value){
        this.setState({
            header:{
                text:'Nuevo Registro',
            },
            visible:{
                btnAdd:value,
                registers:false,
                insert:true,
                btnClose:true
            }
        })
    }

    async HandleClickTr(value){
        this.setState({
            header:{
                text:'Actualizar Registro',
            },
            visible:{
                registers:false,
                insert:false,
                update:true,
                BtnCloseVolante:true
            },
            update:{
                id:value
            },
            closeVolante:false
        })
    }



  
    HandleCancel(value){
        this.setState({
            header:{
                text:'Lista de Registros',
                icon:'far fa-address-book'
            },
            visible:{
                registers:!value,
                insert:value,
                update:value,
                btnAdd:!value
            }
        })
    }

    render(){
        
        return(
        <HomeLayout >
            <Header>
                <Title text={this.state.header.text} icon={this.state.header.icon} />
                
                { this.state.visible.btnAdd && <ButtonAdd open={this.HandleClickBtnAdd.bind(this)}  /> }
               
            </Header>
            {
                this.state.visible.registers &&
                <Registers idRegister={this.HandleClickTr.bind(this)} />
            }
            {
                this.state.visible.insert &&
                <Form cancel={this.HandleCancel.bind(this)}/>
            }
            {
                this.state.visible.update &&
                <Get url={'/SIA/juridico/Volantes/'+this.state.update.id}>
                    {(error, response, isLoading, onReload) =>{
                        if(response !== null) {
                            
                            return <Update data={response.data} cancel={this.HandleCancel.bind(this)} />
                        } 
                            return (<div>Default message before request is made.</div>)
                        
                    }}
                </Get>
               
            }
        </HomeLayout>
        )
        
    }
}