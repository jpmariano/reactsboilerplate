import React from 'react';

function VerificationPage(props) {
    const vkey = props.vkey;

    return (
        <>
            {alert('vkey is ' + vkey)}
        </>
    );
}

export default VerificationPage;
