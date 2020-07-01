import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

// components
import Profile from '../components/Profile/ProfilePage';
import ChangePassword from '../components/Profile/ChangePassword';

function ProfilePageContainer() {
    
    return (
        <div className="profile-container">
            <div className="content p-3">
                <Tabs defaultActiveKey="profile" id="profile-tabs">
                    <Tab eventKey="profile" title="Profile">
                        <Profile />
                    </Tab>
                    <Tab eventKey="password" title="Change Password">
                        <ChangePassword />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default ProfilePageContainer