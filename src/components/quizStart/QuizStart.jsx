import './QuizStart.css';

function QuizStart({ questionsNum, timer, dispatch }) {
    const minutes = Math.floor(timer / 60);

    return (
        <div className="quiz-start">
            <h1>Welcome to the Quiz!</h1>
            <h2>Test your knowledge with {questionsNum} questions.</h2>
            <h3>You have about {minutes} minutes to complete the quiz.</h3>
            <button onClick={() => dispatch({ type: 'startAnswering' })}>
                Start Quiz
            </button>
        </div>
    );
}

export default QuizStart;
