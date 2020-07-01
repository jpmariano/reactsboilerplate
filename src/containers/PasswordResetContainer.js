import React from 'react';
import { useSelector } from 'react-redux';

// components
import PasswordResetPage from '../components/Password/Reset';
import NewPasswordPage from '../components/Password/New';
import SuccessPage from '../components/Password/Success';

function PasswordResetContainer(props) {

    const currUrl = window.location.pathname;
    const alert = useSelector(state => state.alert);
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
                    vkey ?
                        <div className="new-password-container">
                            <div className="content p-3">
                                {
                                    alert.passwordResetMessage &&
                                        <div className={`alert ${alert.type} m-3 text-center`}>{alert.passwordResetMessage}</div>
                                }
                                <NewPasswordPage vkey={vkey}/>
                            </div>
                        </div>
                    :
                        currUrl === '/reset-password/success' &&
                        <div className="password-change-success-container">
                            <div className="content p-3">
                                {
                                    alert.passwordResetMessage &&
                                        <div className={`alert ${alert.type} m-3 text-center`}>{alert.passwordResetMessage}</div>
                                }
                                <SuccessPage />
                            </div>
                        </div>
            }
        </>
    );
}

export default PasswordResetContainer;
