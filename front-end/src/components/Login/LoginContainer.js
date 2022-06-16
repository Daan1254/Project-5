import '../../styles/Login.css';

import Input from "../Input";
import Button from "../Button";
import {tryLogin} from "../../scripts/Login";
import {useState} from 'react';

export default function LoginContainer() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className="login-container">
            <div className='login-title'>SummaMove Login</div>

            <div className="login-input-container">
                <Input setState={value => {setUsername(value)}} label={'Username'} required={false}/>
                <Input setState={value => {setPassword(value)}} label={'Password'} required={false}/>

                <Button text={'Login'} disabled={false} onClickHandler={() => {tryLogin(username, password, (callback) => {
                    window.location.href = "http://localhost:3000/home";
                })}}/>

            </div>
        </div>
    )

}