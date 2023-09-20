function QuestionItem({ option, dispatch, userAnswer, correctAnswer }) {
    return (
        <button
            className={`option ${
                userAnswer === option.trim().toLowerCase() && 'selected'
            } ${correctAnswer === option.trim().toLowerCase() && 'correct'}`}
            disabled={userAnswer}
            onClick={() =>
                dispatch({
                    type: 'hasAnswered',
                    payload: option.trim().toLowerCase(),
                })
            }
        >
            {option}
        </button>
    );
}

export default QuestionItem;
