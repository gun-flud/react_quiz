// import { tests } from './quiz.mock.js';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/quizzes';

const QuizContext = createContext(null);

export const QuizProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quizzes, setQuizzes] = useState([]);

    // 1. Виносимо функцію завантаження
    const fetchQuizzes = useCallback(async () => {
        try { 
            const response = await axios.get(API_URL);
            setQuizzes(response.data);
        } catch (err) {
            console.error("failed to GET quizzes:", err);
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchQuizzes(); }, [fetchQuizzes]);


    const deleteQuiz = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            
            setQuizzes((previous) => 
                previous.filter((quiz) => quiz.id !== id));
        } catch (err) {
            console.error("failed to DELETE quiz:", err);
            alert("Не вдалось видалити тест, спробуй ще раз");
        }
    };

    const addQuiz = async (newQuiz) => {
        try {
            await axios.post(API_URL, newQuiz);
           
            await fetchQuizzes(); 
        } catch (err) {
            console.error("failed to ADD quiz:", err);
            alert("Не вдалось додати тест, спробуй ще раз");
        }
    };

    
    const updateQuiz = async (updatedQuizData) => {
        try {
            await axios.put(`${API_URL}/${updatedQuizData.id}`, updatedQuizData);
            
            await fetchQuizzes(); 
            
        } catch (err) {
            console.error("failed to UPDATE quiz:", err);
            alert("Не вдалось оновити тест, спробуй ще раз");
            throw err; 
        }
    }

    return (
        <QuizContext.Provider 
        value={{ addQuiz, updateQuiz, deleteQuiz, quizzes, loading, error }}>
            { children }
        </QuizContext.Provider>
    )
}

export const useQuizzes = () => {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error("useQuizzes must be used within QuizProvider")
  }
  return context
}













