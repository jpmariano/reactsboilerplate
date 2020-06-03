import React, { Component } from 'react';

// Components
import LoginForm from '../components/Authentication/LoginForm'

class LoginContainer extends Component {
    
    render() {
        return (
            <div className="login-form">
                <LoginForm />
            </div>
        );
    }
}

export default LoginContainer