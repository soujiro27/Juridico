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



export default class Home extends Component {

    state = {
        header:{
            text:'Lista de Registros',
            icon:'far fa-address-book'
        },
        registers:true, //se cambio para checar el formulario
        insert:false,
        update:false,
        updateId:0
    }

    documentos = {
        tipo:''
    }


    openForm(val){
        this.setState({
            header:{
                text:'Nuevo Registro',
                icon:'fas fa-pencil-alt'
            },
            registers:val,
            insert:!val
        })
    }


    componentDidMount(){
        axios.get('/SIA/juridico/Api/Documentos').then(json =>{
            this.documentos.tipo = json.data
        })
    }

   shouldComponentUpdate(){
       console.log(this.state)
       return true
   }

    cancelForm(){
        this.setState({
            header:{
                text:'Lista de Registros',
                icon:'far fa-address-book'
            },
            registers:true, //se cambio para checar el formulario
            insert:false,
            update:false
        })
    }

    getIdTr(value){
        this.setState({
            header:{
                text:'Actualizar Registro',
                icon:'fas fa-pencil-alt'
            },
            registers:false,
            insert:false,
            update:true,
            updateId:value
        })
    }



    render(){
        return(
        <HomeLayout >
            <Header>
                <Title text={this.state.header.text} icon={this.state.header.icon} />
                {
                    this.state.registers &&
                    <ButtonAdd open={this.openForm.bind(this)} />
                }
                
            </Header>
            {
                this.state.registers &&
                    <Registers idRegister={this.getIdTr.bind(this)} />
            }
            
            {
                this.state.insert &&
                    <Form cancel={this.cancelForm.bind(this)}  data={this.documentos.tipo}/>
            }

            {
                this.state.update &&
                <Get url={'/SIA/juridico/DoctosTextos/'+this.state.updateId}>
                    {(error,response,isLoading,onReload) => {  
                        if(response !== null){
                             return <Update 
                                idRegistro={this.state.updateId} 
                                idSubTipoDocumento={response.data.idSubTipoDocumento}
                                idTipoDocto={response.data.idTipoDocto} 
                                estatus={response.data.estatus}
                                texto={response.data.texto}
                                cancel={this.cancelForm.bind(this)}
                                data={this.documentos.tipo}/>
                        } else{
                            return <p>Loading...</p>
                        }
                    }}
                    
                </Get>
                
            }
            
            
        </HomeLayout>
        )
        
    }
}