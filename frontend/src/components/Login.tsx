import React from 'react';
import { loginWithGoogle, loginWithFacebook, logout } from '../services/authService';

const Login: React.FC = () => {
    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
        } catch (error) {
            console.error(error);
        }
    };

    const handleFacebookLogin = async () => {
        try {
            await loginWithFacebook();
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={handleGoogleLogin}>Login with Google</button>
            <button onClick={handleFacebookLogin}>Login with Facebook</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Login;
