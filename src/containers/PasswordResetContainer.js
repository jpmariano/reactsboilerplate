import React from 'react';

// components
import PasswordResetPage from '../components/Password/Reset';

function PasswordResetContainer() {
    return (
        <div className="password-reset-container">
            <div className="content p-3">
                <PasswordResetPage />
            </div>
        </div>
    );
}

export default PasswordResetContainer;
