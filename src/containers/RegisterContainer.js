import React, { Component } from 'react';

// Components
import RegisterForm from '../components/Registration/RegisterPage'

class RegisterContainer extends Component {
    
    render() {
        return (
            <div className="registration-form-container">
                <div className="content p-3">
                    <RegisterForm />
                </div>
            </div>
        );
    }
}

export default RegisterContainer