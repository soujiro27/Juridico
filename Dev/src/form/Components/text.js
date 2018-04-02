import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';

class InputText extends Component {
    render(){
        return(
                <div>
                    <input type="text" />
                    <p>{this.props.validationErrors.isEmail}</p>
                </div>
            )
    }
}

export default withFormsy(InputText)