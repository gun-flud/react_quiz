import { useState, useRef, useEffect, } from 'react'
import { useParams, useNavigate } from 'react-router';
import QuestionForm from '../ui/QuestionForm'; 
import { useQuizzes } from '../features/quizzes/quiz.context.jsx';
import "../index.css"
import plusIcon from '../assets/plus-icon.png';

function QuizEditForm() {
    const { quizzes, updateQuiz } = useQuizzes();
    const [quizData, setQuizData] = useState(null);
    const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    // Перевіряємо, чи є ID і чи завантажився список тестів
    if (id && quizzes.length > 0) {
        
        const foundQuiz = quizzes.find(quiz => quiz.id === parseInt(id));
        
        if (foundQuiz) {
            setQuizData(JSON.parse(JSON.stringify(foundQuiz)));
        } else {
            console.warn(`Quiz with id ${id} not found immediately in list.`);
        }
    }
    }, [id, quizzes]);

    const addQuestion = () => {
        setQuizData({...quizData, questions: [...quizData.questions,
            { text: '', id: Date.now(),  options: [
                { text: "", id: Date.now() + 1, isCorrect: false },
                { text: "", id: Date.now() + 2, isCorrect: false },
            ]}]});
    }

    const deleteQuestion = (id) => {
        setQuizData({...quizData, questions: quizData.questions.filter(question => question.id != id )});
    }

    const addOption = (id) => {
        setQuizData({ ...quizData, questions: quizData.questions.map((question) => 
            question.id === id 
            ? { ...question, options: [...question.options, { text: "", id: Date.now(), isCorrect: false }] } 
            : question
        )}
    );
    };

    const deleteOption = (id, oId) => {
         setQuizData({...quizData, questions: quizData.questions.map((question) => 
            question.id === id 
            ? { ...question, options: question.options.filter((option) => option.id != oId)}
            : question
        )});
    };

    const handleQuestionChange = (e, qId) => {
        setQuizData({...quizData, questions: quizData.questions.map((question) => 
            question.id === qId
            ? {...question, text: e.target.value}
            : question
        )});
    }

    const handleOptionChange = (e, qId, oId) => {
    setQuizData({...quizData, questions: quizData.questions.map((question) => { 
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
            });
        };

    const handleCorrectChange = (questionId, optionId) => {
    setQuizData({...quizData, questions: quizData.questions.map((q) => {
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
    })});
    };

    // додати перевірку
    // updateQuiz крашиться
    const handleSave = async () => {
        if (!quizData) return;

        try {
            console.log("Відправляємо на сервер:", quizData);
            await updateQuiz(quizData);
            navigate('/'); 
        } catch (error) {
            console.error("Failed to save:", error);
            alert("Error saving quiz");
        }
    };

  //з едіт ми сюди тянемо лише id тесту а тут виконуємо його пошук і отримуємо дані
    if (!quizData) {    
        return <div>Loading...</div>;
    }   else {
  return (
      <>
        {/* /створення тайтлу і опису тесту/       */}
          <QuestionForm 
          key={quizData.id}
          value={quizData.title}
          valueTextarea={quizData.description}
          onChange={(e) => setQuizData({...quizData, title: e.target.value})}
          onChangeTextarea={(e) => setQuizData({...quizData, description: e.target.value})}
          formType="title"
          label="Delete"
          classInput="input text-2xl"  
          placeholder="Enter quiz title " 
          />  
          
          {
          quizData.questions.map((question, questionIndex) => (
            <QuestionForm 
            key={question.id}
            questionCount={quizData.questions.length}
            questionIndex={questionIndex}
            value={question.text}
            onChange={(e) => handleQuestionChange(e, question.id)}
            onDeleteQuestion={() => deleteQuestion(question.id)}
            onChangeOption={(e, optionId) => handleOptionChange(e, question.id, optionId)}
            onChangeRadio={(optionId) => handleCorrectChange(question.id, optionId)}
            addOption={() => addOption(question.id)}
            delete={(oId) => deleteOption(question.id, oId)}
            options={question.options}
            formType="question"
            label="Delete"  
            classInput="input text-xl"  
            placeholder="Enter quiz title "
            {...question} 
            />
          ))
          }
          <div className="button mr-auto max-w-18" onClick={addQuestion}>
            <img src={plusIcon} alt="Add Option"  className="icon" />
          </div>
          <h2 className="question-number text-sky-900">
            Кількість питань: {quizData.questions.length}
          </h2>
          <div className=" ">
            <button type="submit" className="button mt-4" onClick={() => handleSave()}>Save Quiz</button>
          </div>
		  </>
        )
    }
};



export default QuizEditForm;

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