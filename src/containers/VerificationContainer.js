import React from 'react';

// components
import VerificationPage from '../components/Verification/VerificationPage';

function VerificationPageContainer(props) {
    const { match } = props;
    const vkey = match.params.vkey;

    return (
        <div className="verify-user-container">
            <div className="content p-3">
                <VerificationPage vkey={vkey}/>
            </div>
        </div>
    );
}

export default VerificationPageContainer;
