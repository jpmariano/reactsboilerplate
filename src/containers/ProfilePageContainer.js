import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { useSelector } from 'react-redux';

// components
import Profile from '../components/Profile/ProfilePage';
import ChangePassword from '../components/Profile/ChangePassword';

function ProfilePageContainer() {

    const user = useSelector(state => state.authentication.user);
    
    return (
        <div className="profile-container">
            <div className="content p-3">
                <Tabs defaultActiveKey="profile" id="profile-tabs">
                    <Tab eventKey="profile" title="Profile">
                        <Profile userInfo={user}/>
                    </Tab>
                    <Tab eventKey="password" title="Change Password">
                        <ChangePassword userInfo={user}/>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default ProfilePageContainer