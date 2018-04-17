import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';


export default class InputHour extends Component{

    render(){
        return(
            <div className={this.props.class}>
                <label className={this.props.classLabel}>{this.props.label}</label>    
                <DatePicker
                    //selected={this.state.startDate}
                    //onChange={this.handleChange}
                    className={this.props.classInput}
                    locale='es'
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="LT"
                    timeCaption="Time"
                    
            />
    </div>   
        )
    }
}
