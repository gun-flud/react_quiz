import { use, useId, useState } from "react";
import hidePassword from '../assets/hide-password.svg';
import showPassword from '../assets/show-password.svg';
import "../index.css";

function Password({ label = '', type, value, onChange, placeholder, ...props}) {
    
    const [passwordType, setPasswordType] = useState(null);

  return (
    <div className={`input-field ${props.classField || ''}`}>
        <input 
        key={props.key || useId()}
        type={passwordType ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        // className={props.classInput || props.classOption || ''}
        className={ placeholder === "option" ? props.classOption || '' : props.classInput || ''}
        // className={`input-${type}`}
        />
        <button className="absolute right-3 border-none" onMouseDown={(e) => e.preventDefault()} onClick={() => setPasswordType(!passwordType)}>
            <img src={passwordType ? hidePassword : showPassword } alt="Hide Password"  className="icon"/>
            {/* <img src={showPassword} alt="Show Password"  className="icon" /> */}
        </button>
    </div>
  );
}

export default Password;