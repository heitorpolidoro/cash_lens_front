// /*App.js*/

import React, {useEffect, useState} from 'react';
import {GoogleLogin, googleLogout} from '@react-oauth/google';
import "./App.css";
import {jwtDecode} from 'jwt-decode';

function App() {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const allowedUserSub = process.env.REACT_APP_ALLOWED_USER_SUB;

    const logOut = () => {
        googleLogout();
        localStorage.removeItem('cash_lens_google_profile');
        setProfile(null);
    };

    useEffect(() => {
        const storedProfile = localStorage.getItem('cash_lens_google_profile');
        if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
        }
        setIsLoading(false);
    }, []);

    return (
        <div>
            {!isLoading &&
                <div className='profile-container'>
                    {profile ? (
                            <div className="profile-details">
                                <img src={profile.picture} alt="" className='profile-avathar'/>
                                <div className="profile-content">
                                    <h3>{profile.name}</h3>
                                    <h5>{profile.email}</h5>
                                </div>
                                <button className='profile-button' onClick={logOut}>Logout</button>
                            </div>
                        ) :
                        (
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    const credential = credentialResponse.credential;
                                    try {
                                        const profile = jwtDecode(credential);
                                        if (profile.sub === allowedUserSub) {
                                            localStorage.setItem('cash_lens_google_profile', JSON.stringify(profile));
                                            setProfile(profile);
                                        } else {
                                            console.log("User not allowed")
                                        }

                                    } catch (error) {
                                        // Handle error (e.g., invalid token)
                                        console.error("Error decoding ID token:", error);
                                    }

                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        )
                    }
                </div>
            }
        </div>
    );
}

export default App;
