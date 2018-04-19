import React, { Component } from 'react';
import TimePicker from 'react-time-picker';


export default class InputHour extends Component{


    state = {
        time:'00:00',
    }

    onChange = time => this.setState({ time })

    render(){
        
       
        return(
            <div className={this.props.class}>
                <label className={this.props.classLabel}>{this.props.label}</label>    
                <TimePicker
                    onChange={this.onChange}
                    value={this.state.time}
                    className='form-control form-control-sm'
                    clockIcon={false}
                    clearIcon={false}
                    name={this.props.name}
                    required
                />
    </div>   
        )
    }
}
