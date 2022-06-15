import '../../styles/Login.css';

import Input from "../Input";
import Button from "../Button";

export default function LoginContainer() {
    return (
        <div className="login-container">
            <div className='login-title'>SummaMove Login</div>

            <div className="login-input-container">
                <Input label={'Username'} required={false}/>
                <Input label={'Password'} required={false}/>

                <Button text={'Login'} disabled={false} onClickHandler={() => {console.log('hoi')}}/>
            </div>
        </div>
    )

}