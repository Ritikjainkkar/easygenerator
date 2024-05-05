import React, { useState } from 'react';
import { SignInForm, SignUpForm, Footer } from '../components'
import useAuth from '../hooks/auth';

function SignInSignUp() {
    const [isSignUpActive, setIsSignUpActive] = useState(false);

    const toggle = () => {
        setIsSignUpActive(prev => !prev)
    }

    return (
        <div>
            <div className={`container`}>
                {isSignUpActive ? <SignUpForm toggle={toggle}/> : <SignInForm toggle={toggle}/>}
            </div>
            <Footer />
        </div>
    );
}

export default SignInSignUp;