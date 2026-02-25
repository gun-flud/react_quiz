import Input from "../ui/Input";
import Password from "../ui/password";
import "../index.css";
import hidePassword from '../assets/hide-password.svg';
import showPassword from '../assets/show-password.svg';
import GoogleIcon from '../assets/google-icon.svg';


function LogIn() {

  return (
    <div className="container"> 
        <div className="log-in"> 
            <h1 className="log-in-title">Welcome back!</h1>
            <Input 
            type="text"
            placeholder="Ваш логін"
            classInput="input" 
            />
            <div className="relative w-full">
                <Password 
                type="password"
                placeholder="Ваш пароль"
                classInput="input" 
                />
                {/* <button className="absolute right-3 ">
                    <img src={hidePassword} alt="Hide Password"  className="icon" />
                    <img src={showPassword} alt="Show Password"  className="icon" />
                </button> */}
                <h4 className="text-right cursor-pointer mt-1">Forgot password</h4>
            </div>
            <button className="button mt-6">Зареєструватись</button>
            <button className="button bg-neutral-50 border border-black hover:bg-zinc-200 text-black">Зареєструватись з <img src={GoogleIcon} alt="Google Icon" className="inline-block w-6 h-6" /></button>
            <h3>Don't have an account?</h3>
        </div>
    </div>  
  )

}

export default LogIn;