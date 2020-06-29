import React from 'react';

// components
import PasswordResetPage from '../components/Password/Reset';

function PasswordResetContainer() {
    return (
        <div className="profile-container">
            <div className="content p-3">
                <PasswordResetPage />
            </div>
        </div>
    );
}

export default PasswordResetContainer;
