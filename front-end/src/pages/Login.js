import '../styles/Login.css';
import LoginContainer from "../components/Login/LoginContainer";
import { Switch, Route } from 'react-router-dom';

export default function Login () {
    return (
        <>
            <div className='login-body'>
                <LoginContainer/>
            </div>
        </>
    )
}
