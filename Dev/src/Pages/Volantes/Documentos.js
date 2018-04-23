import React, { Component } from 'react';
import { AxiosProvider, Request, Get, Patch, withAxios } from 'react-axios';
import axios from 'axios';
import HomeLayout from './../Containers/HomeLayout';

/*--------------Header -----------------------*/
import Header from './../../Main/Header/Container/Header-container';
import Title from './../../Main/Header/Components/Header-title';

/*------------------ Table Registers ---------*/
import Registers from './../../Main/Registros/Container/Documentos';


import Insert  from './../../Main/Insert/Volantes/Documentos';
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
            update:false,
            btnClose:false
        },
        update:{
            id:0,
            area:''
        }
    }

 

    async HandleClickTr(value,area){
     
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
                id:value,
                area:area
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
            </Header>
            {
                this.state.visible.registers &&
                    <Registers idRegister={this.HandleClickTr.bind(this)} />
            }
            {
                this.state.visible.update &&
                <Get url={'/SIA/juridico/DocumentosGral/'+this.state.update.id+'/'+this.state.update.area}>
                    {(error, response, isLoading, onReload) =>{
                        if(response !== null) {
                            
                            return <Insert data={response.data} cancel={this.HandleCancel.bind(this)} />
                        } 
                            return (<div>Default message before request is made.</div>)
                        
                    }}
                </Get>
               
            }
        </HomeLayout>
        )
        
    }
}