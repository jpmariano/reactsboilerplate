import React from 'react';

// components
import Profile from '../components/Profile/ProfilePage';

function ProfilePageContainer() {
    
    return (
        <div className="profile-container">
            <h1>Profile</h1>

            <div className="content p-3">
                <Profile />
            </div>
        </div>
    );
}

export default ProfilePageContainer