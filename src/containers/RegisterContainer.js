import React, { Component } from 'react';

// Components
import RegisterForm from '../components/Registration/RegisterForm'

class RegisterContainer extends Component {
    
    render() {
        return (
            <div className="register-form">
                <RegisterForm />
            </div>
        );
    }
}

export default RegisterContainer