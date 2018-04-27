import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export default class InputDate extends Component{

    state = {
        startDate:moment(this.props.value)
 
    }

    handleChange(date){
      
        this.setState({
            startDate:date
        })
    }


    render(){
        
        return(
            <div className={this.props.class}>
                <label className={this.props.classLabel}>{this.props.label}</label>    
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange.bind(this)}
                    className={this.props.classInput}
                    locale='es'
                    name={this.props.name}
                    dateFormat="YYYY/MM/DD"
                    showYearDropdown
                    
            />
    </div>   
        )
    }
}
