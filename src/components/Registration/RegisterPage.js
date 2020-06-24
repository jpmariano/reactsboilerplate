import React, { useState } from 'react';

// components
import SuccessModal from '../Alerts/Successful';
import RegisterForm from '../Forms/UserForm';

function RegisterPage() {

    const [successModal, setSuccessModal] = useState(false);

    return (
        <>
            <RegisterForm 
                setSuccessModal={setSuccessModal}
                divClasses="register-form"
                formClasses="registerForm"
                formDivClasses="register-form-fields"
                pageLoc="register"
                action="register"
            />
            <SuccessModal modalShow={successModal} modalMessage='Registration successful!' location='register'/>
        </>
    )
}

export default RegisterPage;
