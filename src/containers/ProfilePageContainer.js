import React from 'react';

// material ui
import Divider from '@material-ui/core/Divider';


// components
import Profile from '../components/Profile/ProfilePage';

function ProfilePageContainer() {
    
    return (
        <div className="profile-container">
            
            <div className="content p-3">
                <h1>Profile</h1>
                <Divider />
                <Profile />
            </div>
        </div>
    );
}

export default ProfilePageContainer