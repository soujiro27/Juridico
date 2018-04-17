import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';


export default class InputDate extends Component{

    render(){
        return(
            <div className={this.props.class}>
                <label className={this.props.classLabel}>{this.props.label}</label>    
                <DatePicker
                    //selected={this.state.startDate}
                    //onChange={this.handleChange}
                    className={this.props.classInput}
                    locale='es'
                    showYearDropdown
                    
            />
    </div>   
        )
    }
}
