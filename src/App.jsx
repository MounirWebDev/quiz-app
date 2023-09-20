import { useEffect, useReducer } from 'react';
import QuizStart from './components/quizStart/QuizStart';
import Error from './components/failed/Error';
import Loader from './components/loader/Loader';
import QuestionList from './components/questionList/QuestionList';
import QuestionEnd from './components/questionEnd/QuestionEnd';

const initialState = {
    questions: [],
    status: 'loadingQuiz',
    timer: 0,
    currentQuestionIndex: 0,
    point: 0,
    userAnswer: null,
    correctAnswer: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'getQuizData':
            return {
                ...state,
                status: 'quizStarter',
                questions: [...action.payload],
                timer: action.payload.length * 15,
            };
        case 'startAnswering':
            return {
                ...state,
                status: 'startAnswering',
            };
        case 'error':
            return { ...state, status: 'error' };
        case 'setTimer':
            return {
                ...state,
                status: state.timer === 0 ? 'result' : state.status,
                timer: state.timer--,
            };
        case 'nextQuestion':
            console.log(state.currentQuestionIndex);
            return {
                ...state,
                currentQuestionIndex: state.currentQuestionIndex++,
                userAnswer: null,
                correctAnswer: null,
                status:
                    state.currentQuestionIndex <= state.questions.length
                        ? state.status
                        : 'result',
            };
        case 'hasAnswered':
            return {
                ...state,
                userAnswer: action.payload,
                correctAnswer: state.questions[
                    state.currentQuestionIndex
                ].correctAnswer
                    .trim()
                    .toLowerCase(),
                point:
                    action.payload ===
                    state.questions[state.currentQuestionIndex].correctAnswer
                        .trim()
                        .toLowerCase()
                        ? state.point++
                        : state.point,
            };
        case 'reset':
            return {
                ...state,
                status: 'quizStarter',
                currentQuestionIndex: 0,
                point: 0,
                timer: state.questions.length * 15,
            };
        default:
            console.log('Unknown action');
            break;
    }
}

function App() {
    // useStates, useRefs, useReducer Hooks
    const [states, dispatch] = useReducer(reducer, initialState);

    // Normal Variables
    const {
        questions,
        status,
        timer,
        currentQuestionIndex,
        point,
        userAnswer,
        correctAnswer,
    } = states;
    const questionsNum = questions.length;

    // useEffects Hooks
    useEffect(() => {
        async function getQuizData() {
            try {
                const res = await fetch('http://localhost:9000/quizData');
                if (!res.ok) {
                    dispatch({ type: 'error' });
                }

                const quizData = await res.json();
                dispatch({ type: 'getQuizData', payload: quizData });
            } catch (err) {
                console.error(err);
            }
        }

        getQuizData();
    }, []);

    return (
        <div className="container">
            <h1 className="title">QUIZ</h1>
            {status === 'loadingQuiz' && <Loader />}
            {status === 'quizStarter' && (
                <QuizStart
                    questionsNum={questionsNum}
                    timer={timer}
                    dispatch={dispatch}
                />
            )}
            {status === 'error' && <Error message={'Something went wrong!'} />}
            {status === 'startAnswering' && (
                <QuestionList
                    currentQuestion={questions[currentQuestionIndex]}
                    questionsNum={questionsNum}
                    currentQuestionNum={currentQuestionIndex + 1}
                    point={point}
                    dispatch={dispatch}
                    userAnswer={userAnswer}
                    correctAnswer={correctAnswer}
                    timer={timer}
                />
            )}
            {status === 'result' && (
                <QuestionEnd dispatch={dispatch} point={point} />
            )}
        </div>
    );
}

export default App;
