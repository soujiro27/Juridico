import React, { Component } from 'react';
import HomeLayout from './../Containers/HomeLayout';

/*--------------Header -----------------------*/
import Header from './../../Main/Header/Container/Header-cedulas-container';
import Title from './../../Main/Header/Components/Header-title';
import MenuCedula from './../../Main/Header/Components/Header-button-turnos';
/*------------------ Table Registers ---------*/
import Registers from './../../Main/Registros/Container/Turnos';


/*-----------------------Form----------------*/
import Cedulas from './../../Main/Insert/Cedulas/Containers/Turnos';


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
            menuCedula:false
        },
        update:{
            id:0
        }
    }

    async HandleClickTr(value){
        this.setState({
            header:{
                text:'Actualizar Registro',
            },
            visible:{
                registers:false,
                insert:true,
                menuCedula:true
            },
            update:{
                id:value
            },
            menuOption:0
        })
    }



  
    HandleCancel(value){
       
        this.setState({
            header:{
                text:'Lista de Registros',
                icon:'far fa-address-book'
            },
            visible:{
                registers:true,
                insert:false
            }
        })
    }


    HandleMenuCedula(value){
       
        this.setState({
            menuOption:value
        })
    }

    render(){
       
        return(
        <HomeLayout >
            <Header>
            {
                this.state.visible.menuCedula ? <MenuCedula menu={this.HandleMenuCedula.bind(this)}/> :<Title text={this.state.header.text} icon={this.state.header.icon} /> 
            }
                
            </Header>
            {
                this.state.visible.registers ? <Registers idRegister={this.HandleClickTr.bind(this)} /> : <Cedulas option={this.state.menuOption} cancel={this.HandleCancel.bind(this)} volante={this.state.update.id} />
            }
        
        </HomeLayout>
        )
        
    }
}