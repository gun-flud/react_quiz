import { useId } from "react";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import "../index.css";
import plusIcon from '../assets/plus-icon.png';
import deleteIcon from '../assets/trash-icon.png';

function QuestionForm({ formType, label = 'Delete', type = 'text', value, onChange, placeholder, ...props}) {
  if (formType === "title") {
    return (
        <div className={`question-form ${props.classForm || ''}`}>
            <div className="question-number"></div>
        <Input
            label={label} 
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...props}
            
        />
        <Textarea
            placeholderTextarea={props.placeholderTextarea}
            value={props.valueTextarea}
            onChange={props.onChangeTextarea}
            {...props} 
        />
        </div>
        );

    } else if (formType === "question") {
    return (
        <div className={`question-form ${props.classForm || ''}`}>
            <div className="question-props w-full flex items-center gap-4">      
            <Input
                key={props.id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                {...props}
                
            />

             <h2 className="question-number">{`${props.questionIndex + 1}/${props.questionCount}`}</h2>
                    <div className="button delete mr-auto max-w-15" onClick={props.questionCount != 1 && props.onDeleteQuestion || null}>
                        <img src={deleteIcon} alt="Delete Question"  className="icon" />
                </div> 

        </div>
            <div className="button mr-auto max-w-14" onClick={props.addOption}>
            <img src={plusIcon} alt="Add Option"  className="icon" />
            </div>

        {props.options && props.options.map((option, optionIndex) => (
            <Input
            key={option.id}
            label={label} 
            type={props.typeOption || 'text'}
            value={option.text}
            onClick={props.options.length > 1 ? () => props.delete(option.id) : null}
            onChange={(e) => props.onChangeOption(e, option.id)}
            Checked={option.isCorrect}
            onRadioChange={() => props.onChangeRadio(option.id)}
            placeholder='option'
            classOption={`option ${props.classOption  || ''}`}
            {...props}
            
        /> 
        ))}
        </div>
        );
    }
}

export default QuestionForm;

// створення міні форми
{/* <QuestionForm 
          key={useId()} унікальний ключ для кожного компоненту
          formType="title, question" - види форм(title - інпут та текстареа, question - інпут питання та опції)
          
          classField="" - додатковий клас для стилізації поля інпута
          classForm="" - додатковий клас для стилізації форми

          label:
          classLabel="" - додатковий клас для стилізації лейбла(кнопки збоку інпута)
          label="Delete" - будь-який текст для кнопки біля інпута(delete - дефолт)

          input:
          value="" - значення інпута
          onChange={} - ончендж для інпута
          type="text" - тип інпута
          classInput="input text-2xl" - додатковий клас для стилізації інпута
          placeholder="Enter quiz title " - плейсхолдер інпута

          option:
          onChangeOption={} - ончендж для опції
          typeOption="text" - тип опції 
          classOption="option" - додатковий клас для стилізації опції

          textarea:
          placeholderTextarea="Enter quiz description" - плейсхолдер для текстареа
          valueTextarea="{quizData.description}" - значення текстареа
          onChangeTextarea={} - ончендж для текстареа
          classTextarea="" - додатковий клас для стилізації текстареа
          />   */}