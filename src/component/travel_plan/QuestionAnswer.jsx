import React, { useState, useEffect } from 'react';
import axios from 'axios';
import makeApiRequest from '../../api/makeApiRequest';

const QuestionAnswer = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isAnswered, setIsAnswered] = useState(false);

    useEffect(() => {
        // API'den veriyi çek
        makeApiRequest(
            "https://travel-guide-main-de97df9e068d.herokuapp.com/questions_answer",
            "GET"
        )
            .then(response => {
                setQuestions(response.data);
                // Cevapları boş bir şekilde initialize et
                const initialAnswers = {};
                response.data.forEach(question => {
                    initialAnswers[question.question] = '';
                });
                setAnswers(initialAnswers);
            })
            .catch(error => {
                console.error('Soruları alma hatası:', error);
            });
    }, []);

    const handleAnswerChange = (question, answer) => {
        // Kullanıcının verdiği cevabı answers state'ine ekleyin
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [question]: answer
        }));
        setIsAnswered(true);
    };

    const handleNext = () => {
        // Eğer kullanıcı soruyu cevapladıysa bir sonraki soruya geç
        if (isAnswered && currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setIsAnswered(false); // Kullanıcının bir sonraki soruyu cevaplamadığını varsay
        }
    };

    if (questions.length === 0) {
        return <div>Sorular yükleniyor...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div>
            <h2>{currentQuestion?.question}</h2>
            <ul>
                {currentQuestion?.answers?.map((answer, answerIndex) => (
                    <li key={answerIndex}>
                        <input
                            type="radio"
                            id={`${currentQuestionIndex}-${answerIndex}`}
                            name={`question-${currentQuestionIndex}`}
                            value={answer}
                            onChange={() => handleAnswerChange(currentQuestion.question, answer)}
                            checked={answers[currentQuestion.question] === answer}
                        />
                        <label htmlFor={`${currentQuestionIndex}-${answerIndex}`}>{answer}</label>
                    </li>
                ))}
            </ul>
            <button onClick={handleNext} disabled={!isAnswered}>Sonraki</button>
        </div>
    );
};

export default QuestionAnswer;
