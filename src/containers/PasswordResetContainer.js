import React from 'react';

// components
import PasswordResetPage from '../components/Password/Reset';
import NewPasswordPage from '../components/Password/New';

function PasswordResetContainer() {

    const currUrl = window.location.pathname;

    return (
        <>
            {
                currUrl === '/password-reset' ?
                    <div className="password-reset-container">
                        <div className="content p-3">
                            <PasswordResetPage />
                        </div>
                    </div>
                :
                    currUrl === '/new-password' &&
                        <div className="new-password-container">
                            <div className="content p-3">
                                <NewPasswordPage />
                            </div>
                        </div>
            }
        </>
    );
}

export default PasswordResetContainer;
