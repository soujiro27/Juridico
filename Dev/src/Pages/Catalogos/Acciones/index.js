import React, { Component } from 'react';
import HomeLayout from './../../Containers/HomeLayout';
import Modal from 'react-awesome-modal';
import 'react-responsive-modal/lib/react-responsive-modal.css';
/*--------------Header -----------------------*/
import Header from './../../../Main/Header/Container/Header-container';
import Title from './../../../Main/Header/Components/Header-title';
import ButtonAdd from './../../../Main/Header/Components/Header-button-add';

/*------------------ Table Registers ---------*/
import Registers from './../../../Main/Registros/Container/Table-container';

/*-----------------------Form----------------*/
import Form from './../../../Main/Insert/Catalogos/Acciones';

/*------------------Modal--------------------*/
import ModalContainer from './../../../Main/Modal/Container/Modal-form';



export default class Home extends Component {

    state = {
        header:{
            text:'Lista de Registros',
            icon:'far fa-address-book'
        },
        registers:false, //se cambio para checar el formulario
        insert:false,
        open:true
    }

    onOpenModal = () => {
        this.setState({ open: true });
      };
    
      onCloseModal = () => {
        this.setState({ open: false });
      };
    



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

    render(){
        return(
        <HomeLayout >
            <Header>
                <Title text={this.state.header.text} icon={this.state.header.icon} />
                <ButtonAdd open={this.openForm.bind(this)} />
            </Header>
            {
                this.state.registers &&
                    <Registers />
            }
           
            <Form />
            
            <ModalContainer>
            <button onClick={this.onOpenModal}>Open modal</button>
                <Modal open={this.state.open}>
                    <h1>test</h1>
                </Modal>
                
     
            </ModalContainer>
         
            
        </HomeLayout>
        )
        
    }
}