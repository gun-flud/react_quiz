import TextareaAutosize from "react-textarea-autosize";
import { useId, forwardRef} from "react";
import "../index.css";

const Textarea = forwardRef(({ value, onChange, placeholderTextarea = 'Enter quiz description', ...props}, ref) => {
    return (
        <TextareaAutosize
            key={useId()}
            ref={ref}   
            value={value}
            onChange={onChange}
            placeholder={placeholderTextarea}
            className={`textarea ${props.classTextarea || ''}`}

        />
    );
}
);

export default Textarea;