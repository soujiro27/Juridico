import React, { Component } from 'react';
import Inicio from './../Components/inicio';
import Element from './../Components/Elements';
import Salir from './../Components/Exit';
import './index.styl';

export default class Menu extends Component{
    render(){
        const modulos = this.props.modulos
        let array = new Array()
        
        for(let x in modulos){
            array.push(modulos[x])
        }

        return(
            <aside className="col-lg-2">
                <nav>
                    <ul className="Menu">
                        <Inicio/>
                        {
                            array.map(element => (
                                
                                element.submenus.length > 0 &&
                                <Element item={element} />
                                
                            ))

                        }
                        <Salir />
                    </ul>
                </nav>
            </aside>
        )
    }
}