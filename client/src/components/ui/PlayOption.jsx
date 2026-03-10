import { useId } from 'react';
function PlayOption( { option, id, onChange, keyId } ) { 
    return (
        <>
        <label key={useId()} className="mt-1">
            <input 
                key={keyId}
                type="radio" 
                name={id} 
                className="mr-4"
                onChange={onChange}
            />
            <span key={useId()}>{option.text}</span>
        </label>
        </>
    );
}

export default PlayOption;