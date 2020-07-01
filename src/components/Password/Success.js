import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// actions
import { alertActions } from '../../actions';

// helpers
import { history } from '../../helpers';

function Success() {
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, [dispatch]);

    return (
        <div className="password-reset-success-msg text-center">
            <h1 className="mt-4">Password reset successful! You can now login!</h1>
            {/* <a className="btn btn-primary mt-4" href="/">Go back</a> */}
        </div>
    );
}

export default Success;
