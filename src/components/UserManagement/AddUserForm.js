import React, { Component } from 'react';

class AddUserForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }

    render() {
        return (
            <h1> Hello </h1>
        )
    }
}

export default AddUserForm;
