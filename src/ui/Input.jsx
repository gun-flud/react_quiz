import { useId } from "react";
import "../index.css";

function Input({ label = '', type, value, onChange, placeholder, ...props}) {
  return (
    <div className={`input-field ${props.classField || ''}`}>
      {placeholder === "option" && <input 
        key={props.key || useId()}
        type='radio'
        name={props.name}
        checked={props.Checked}
        //поки заглушка
        onChange={props.onRadioChange}
        className='radio'
      />}
      <input 
        key={props.key || useId()}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        // className={props.classInput || props.classOption || ''}
        className={ placeholder === "option" ? props.classOption || '' : props.classInput || ''}
        // className={`input-${type}`}
      />
      {label && <label key={props.key || useId()} onClick={props.onClick} className={`button font-bold flex w-fit items-center ${props.classLabel}`}>{label}</label>}
    </div>
  );
}

export default Input;
    
    
