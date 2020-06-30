import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

// actions
import { userActions } from '../../actions';

function VerificationPage(props) {
    const vkey = props.vkey;
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.verifyUserToken(vkey));
    }, [dispatch, vkey]);

    return (
        <div className="verify-user-page">
            {
                alert.verifyMessage &&
                    <div className={`alert ${alert.type} m-3 text-center`}>{alert.verifyMessage}</div>
            }
            {
                alert.type === 'alert-success' ?
                    <div className="verification-successful-msg text-center">
                        <h1 className="mt-4">You are now verified! You can proceed on logging in!</h1>
                        <a className="btn btn-primary mt-4" href="/">Go back</a>
                    </div>
                :
                    <div className="verification-failed-msg text-center">
                        <h1 className="mt-4">Sorry, this token has expired/is invalid!</h1>
                        <a className="btn btn-primary mt-4" href="/">Go back</a>
                    </div>
            }
        </div>
    );
}

export default VerificationPage;
