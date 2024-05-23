import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import axios from 'axios';
import EditUser from './EditUser';
import { toast } from 'react-toastify';
import ApiConfig from '../../../../config/ApiConfig';

const PersonalInfo = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);

    useEffect(() => {
        if (accessToken) {
            const fetchUserProfile = async (e) => {
                try {

                    const headers = {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    };
                    console.log('Headers:', headers);

                    const response = await axios.get(`${ApiConfig.ApiPrefix}/auth/profile`, {}, headers)
                    console.log(response.data);
                    setUserProfile(response.data.user);
                } catch (e) {
                }
            };
            console.log('fetching');
            fetchUserProfile();
        }
    }, [accessToken]);

    const toggleEditPopup = () => {
        setIsEditPopupOpen(!isEditPopupOpen);
    };

    return (
        <>
            <div className="account-overview" style={{ marginTop: '28px' }}>
                <h3 style={{ fontFamily: 'Gill Sans', color: 'black', marginBottom: '15px' }}>ACCOUNT OVERVIEW</h3>
                {userProfile && (
                    <Card className="personal-info-card">
                        <CardBody style={{ padding: '0' }}>
                            <CardTitle tag="h4" className="personal-info-title">
                                Personal Information
                                <Button className="edit-button" onClick={toggleEditPopup}>Edit Details</Button>
                            </CardTitle>
                            <div className="personal-information">
                                <ul className="personal-info-list">
                                    <li>
                                        <span>Name :</span> <strong>{userProfile.first_name} {userProfile.last_name}</strong>
                                    </li>
                                    <li>
                                        <span>Phone number :</span> <strong>{userProfile.phoneno}</strong>
                                    </li>
                                    <li>
                                        <span>Email address :</span> <strong>{userProfile.email}</strong>
                                    </li>
                                </ul>
                            </div>
                        </CardBody>
                    </Card>
                )}
                <EditUser isOpen={isEditPopupOpen} toggle={toggleEditPopup} userProfile={userProfile} toast={toast} />
            </div >
        </>
    );
};

export default PersonalInfo;
