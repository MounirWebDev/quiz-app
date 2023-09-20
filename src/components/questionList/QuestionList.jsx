import { useEffect } from 'react';
import QuestionItem from '../questionItem/QuestionItem';
import './QuestionList.css';

function QuestionList({
    currentQuestion,
    questionsNum,
    currentQuestionNum,
    point,
    dispatch,
    userAnswer,
    correctAnswer,
    timer,
}) {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({ type: 'setTimer' });
        }, 1000);

        return () => clearInterval(interval);
    }, [minutes, dispatch]);

    return (
        <div className="question-list">
            <div className="progress">
                <progress
                    value={currentQuestionNum}
                    max={questionsNum}
                ></progress>
            </div>
            <div className="question-info">
                <p>
                    Question {currentQuestionNum}/{questionsNum}
                </p>
                <p>Points: {point}</p>
            </div>
            <h2 className="question">{currentQuestion.question}</h2>
            <div className="options">
                {currentQuestion.options.map(option => (
                    <QuestionItem
                        option={option}
                        dispatch={dispatch}
                        userAnswer={userAnswer}
                        correctAnswer={correctAnswer}
                        key={option}
                    />
                ))}
            </div>
            <div className="btns">
                <button className="button">
                    {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                </button>
                <button
                    className="next-button"
                    onClick={() => dispatch({ type: 'nextQuestion' })}
                >
                    {currentQuestionNum === questionsNum ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
    );
}

export default QuestionList;
