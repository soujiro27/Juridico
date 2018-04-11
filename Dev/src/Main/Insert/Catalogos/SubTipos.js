import React, { Component } from 'react';
import axios from 'axios';
import ReactTooltip from 'react-tooltip'
import Modal from './../../Modal/Components/Modal-form';
import './../form.styl'


export default class formAcciones extends Component{


    state = {
        open:false,
        message:'',
        idTipoDocto:'',
        nombre:'',
        auditoria:''
    }


    HandleChange(event){
        event.preventDefault()
        this.setState({[event.target.name]:event.target.value.toUpperCase()})
    }


        
    HandleInputChange(event){
        const target = event.target
        const name = target.name
        const value = target.value
        this.setState({
            [name]:value
        })
    }



    HandleSubmit(event){
        event.preventDefault();
        let form = new FormData(event.target)
        axios.post('/SIA/juridico/SubTiposDocumentos/Save',form)
        .then(response => {
            this.setState({
            open:!this.state.open,
            message:response.data[0]
            })
        })
        
    }

    modal(value){
        this.setState({
            open:value
        })

        if(this.state.message === 'success'){
            this.props.cancel()
        }
    }

    handleCancel(){
        this.props.cancel()
    }

   

    render(){
        
        return(
            <div>
            <form className="Form" onSubmit={this.HandleSubmit.bind(this)}>
                <div className="row bottom">
                    <label className="col-lg-2">Tipo Documento</label>
                    <select className="form-control col-lg-3" name="idTipoDocto" required onChange={this.HandleInputChange.bind(this)}>
                        <option value="">Selecciona un Elemento </option>
                        {
                            this.props.data.map(item =>(
                                <option key={item.idTipoDocto} value={item.idTipoDocto}>{item.nombre}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="row bottom">
                    <label className="col-lg-2">Nombre</label>
                    <input 
                        type="text"
                        name='nombre'
                        maxLength='10'
                        spellCheck='true'
                        required
                        className='form-control col-lg-3'
                        onChange={this.HandleChange.bind(this)}
                        value={this.state.nombre}
                    />
                </div>

                <div className="row bottom">
                <label className="col-lg-2">Auditoria</label>
                
                <ReactTooltip place='right' effect='solid'/>
                <select className="form-control col-lg-3" name="auditoria" data-tip="¿El documento lleva Auditoria?" required onChange={this.HandleInputChange.bind(this)}>
                    <option value="">Selecciona un Elemento </option>
                    <option value="SI">SI</option>
                    <option value="NO">NO</option>
                </select>
              
            </div>

                <div className="row">
                    <input type="submit" value="Guardar" className='btn btn-primary save' />
                    <button className="btn btn-danger" onClick={this.handleCancel.bind(this)} >Cancelar</button> 
                </div>
                
            </form>
            {
            
                this.state.open &&
                <Modal 
                    open={this.state.open} 
                    modalClose={this.modal.bind(this)}
                    message={this.state.message}
                />
            }
            </div>
        )
    }
}

