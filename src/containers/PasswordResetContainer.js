import React from 'react';

// components
import PasswordResetPage from '../components/Password/Reset';
import NewPasswordPage from '../components/Password/New';

function PasswordResetContainer(props) {

    const currUrl = window.location.pathname;
    const { match } = props;
    const vkey = match.params.vkey;

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
                    vkey &&
                        <div className="new-password-container">
                            <div className="content p-3">
                                <NewPasswordPage vkey={vkey}/>
                            </div>
                        </div>
            }
        </>
    );
}

export default PasswordResetContainer;
