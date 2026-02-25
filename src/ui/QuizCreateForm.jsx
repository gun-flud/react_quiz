import { useState, useRef, useEffect, useId } from 'react'
import { useNavigate } from 'react-router'; 
import { useQuizzes } from '../features/quizzes/quiz.context.jsx';
import QuestionForm from '../ui/QuestionForm'; 
import "../index.css"
import plusIcon from '../assets/plus-icon.png';


function QuizCreateForm() {

    const { addQuiz} = useQuizzes();
    

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([
        { text: '', id: Date.now(), options: [
            { text: "", id: Date.now() + 1 , isCorrect: false },
            { text: "", id: Date.now() + 2, isCorrect: false },] }
    ]);

    const navigate = useNavigate();

    const addQuestion = () => {
        setQuestions([...questions,
            { text: '', id: Date.now(),  options: [
                { text: "", id: Date.now() + 1, isCorrect: false },
                { text: "", id: Date.now() + 2, isCorrect: false },
            ]}]);
    }

    const deleteQuestion = (id) => {
        setQuestions(questions.filter(question => question.id != id ));
    }

    const addOption = (id) => {
        setQuestions(questions.map((question) => 
            question.id === id 
            ? { ...question, options: [...question.options, { text: "", id: Date.now(), isCorrect: false }] } 
            : question
        ));
    };





    const deleteOption = (id, oId) => {
        setQuestions(questions.map((question) => 
            question.id === id 
            ? { ...question, options: question.options.filter((option) => option.id != oId)}
            : question
        ));
    };

    // const handleTitleChange = (e) => {

    // }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleQuestionChange = (e, qId) => {
        setQuestions(questions.map((question) => 
            question.id === qId
            ? {...question, text: e.target.value}
            : question
        ));
    }

    const handleOptionChange = (e, qId, oId) => {
    setQuestions(
        questions.map((question) => { 
            if (question.id === qId) {
                return {
                    ...question,
                    options: question.options.map((option) => {
                        if (option.id === oId) {
                            return { ...option, text: e.target.value };
                        }
                        return option; 
                            })
                        };
                    }
                    return question; 
                })
            );
        };

    const handleCorrectChange = (questionId, optionId) => {
    setQuestions(questions.map((q) => {
        // 1. Знаходимо потрібне питання
        if (q.id === questionId) {
            return {
                ...q,
                // 2. Перебираємо опції
                options: q.options.map((opt) => ({
                    ...opt,
                    // 3. Якщо ID співпадає - true, всім іншим - false
                    isCorrect: opt.id === optionId 
                }))
            };
        }
        return q;
    }));
    };

    // заглушка валідації
    const handleSubmit = () => {
        const isTitleValid = title.trim() != "";
        const isDescriptionValid = description.trim() != "";
        const areQuestionsValid = questions.every(q => 
    q.text.trim() !== "" && 
    q.options.every(o => o.text.trim() !== "") && 
    q.options.some(o => o.isCorrect === true));
        if (isTitleValid && isDescriptionValid && areQuestionsValid) {
            const quizData = {
                id: Date.now(),
                title: title,
                description: description,
                questions: questions,
            };
            console.log("Quiz created:", quizData);
            addQuiz(quizData);
            navigate("/");
        }else {
            alert("Please fill in all fields and add at least one question.");
        }
    }

  return (
    // дуже багато правок буде пізніше(не показує 2 опшина дефолтно,
    // не показує кількість питань, яке питання)
      <>
        {/* /створення тайтлу і опису тесту/       */}
         <QuestionForm 
          key={questions.id}
          formType="title"
          label="Delete" 
          type="text" 
          onChange={(e) => {handleTitleChange(e)}}
          onChangeTextarea={(e) => {handleDescriptionChange(e)}}
          classInput="input text-2xl" 
          placeholder="Enter quiz title " 
          />  
          

          {
            questions.map((question, questionIndex) => 
                <QuestionForm
                    key={question.id}
                    formType="question"
                    classInput="input text-xl" 
                    onChange={(e) => handleQuestionChange(e, question.id)}
                    onDeleteQuestion={() => deleteQuestion(question.id)}
                    onChangeOption={(e, optionId) => handleOptionChange(e, question.id, optionId)}
                    onChangeRadio={(optionId) => handleCorrectChange(question.id, optionId)}
                    addOption={() => addOption(question.id)}
                    delete={(oId) => deleteOption(question.id, oId)}
                    label="Delete" 
                    type="text"
                    questionCount={questions.length}
                    questionIndex={questionIndex}
                    value={question.text}
                    classOption="option"
                    placeholder="Enter question text"
                    // options={question.options}
                    {...question}
                />)
          }

          {/* <QuestionForm 
          key={useId()}
          formType="question"
          label="Delete" 
          type="text" 
          classInput="input text-xl" 
          classLabel="button font-bold flex w-fit items-center"  
          placeholder="Enter quiz title " 
          classOption="option"
        
          /> */}
          <div className="button mr-auto max-w-18" onClick={addQuestion}>
            <img src={plusIcon} alt="Add Option"  className="icon" />
          </div>
          <h2 className="question-number text-sky-900">Кількість питань: {questions.length}</h2>
          <div className=" ">
            <button type="submit" className="button mt-4" onClick={() => handleSubmit()}>Save Quiz</button>
          </div>
		  </>
  )

}

export default QuizCreateForm;

{/* <form onSubmit={...}>
        <Питання1 />
        <Питання2 />
        <Питання3 />
        <button type="submit">Відправити все</button>
      </form> */}

// створення міні форми
{/* <QuestionForm 
          key={useId()} унікальний ключ для кожного компоненту
          formType="title, question" - види форм(title - інпут та текстареа, question - інпут питання та опції)
          questionCount={}- кількість питань у тесті
          questionIndex={}- індекс питання у тесті(порядковий номер -1)

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