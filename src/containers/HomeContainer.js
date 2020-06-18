import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// actions
import { alertActions } from '../actions';

// helpers
import { history } from '../helpers';

function HomeContainer() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, [dispatch]);
    
    return (
        <div className="infobar">
            {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <h1>Home</h1>

        </div>
    );
}

export default HomeContainer