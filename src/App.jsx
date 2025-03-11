import React, {useState, useEffect} from 'react';
import {GoogleLogin, googleLogout} from '@react-oauth/google';
import './App.css';
import {jwtDecode} from 'jwt-decode';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from "./Home";
import Transactions from "./Transactions";
import Statistics from "./Statistics";
import Entities from "./Entities";
import {allowedUserSub} from "./config";

function App() {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loginMessage, setLoginMessage] = useState(''); // State for the message

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

    if (isLoading) {
        return <div>Loading...</div>; // Or a better loading indicator
    }

    if (!profile) {
        return (
            <div className="profile-container">
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        const credential = credentialResponse.credential;
                        try {
                            const profile = jwtDecode(credential);
                            if (profile.sub === allowedUserSub) {
                                localStorage.setItem('cash_lens_google_profile', JSON.stringify(profile));
                                setProfile(profile);
                            } else {
                                setLoginMessage("You are not authorized to use this application.");
                            }
                        } catch (error) {
                            console.error("Error decoding ID token:", error);
                        }
                    }}
                    onError={() => {
                        setLoginMessage('Login Failed');

                    }}
                />
                <p style={{color: 'red'}}>{loginMessage}</p> {/* Display the message */}

            </div>
        );
    }


    return (
        <Router>
            <div className="app-container">
                <div className="left-section"> {/* Combined section */}
                    <div className="profile-section">
                        <img src={profile.picture} alt="" className="profile-avatar"/>
                        <div className="profile-content">
                            <h3>{profile.name}</h3>
                            <h5>{profile.email}</h5>
                        </div>
                        <Link to="/" onClick={logOut}>Logout</Link> {/* Link styled as button */}

                    </div>
                    <div className="menu-section">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/transactions">Transactions</Link></li>
                            <li><Link to="/statistics">Statistics</Link></li>
                            <li><Link to="/entities">Entities</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="content-section">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/transactions" element={<Transactions/>}/>
                        <Route path="/statistics" element={<Statistics/>}/>
                        <Route path="/entities" element={<Entities/>}/>
                    </Routes>
                </div>
            </div>
        </Router>

    );
}


export default App;
