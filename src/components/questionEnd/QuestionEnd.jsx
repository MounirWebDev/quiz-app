import './QuestionEnd.css';

function QuestionEnd({ dispatch, point }) {
    return (
        <div className="quiz-end">
            <h2>Quiz Completed!</h2>
            <p>Your Score: {point} points</p>
            <p>Thanks for playing!</p>
            <button
                className="play-again-button"
                onClick={() => dispatch({ type: 'reset' })}
            >
                Play Again
            </button>
        </div>
    );
}

export default QuestionEnd;
