import React, { createContext, useContext, useReducer, useEffect } from 'react';

const SECS_PER_QUESTION = 30;
const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Soruların yapısı için gerekli interface
interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

interface QuizState {
  questions: Question[];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
  index: number;
  allAnswers: Array<number | null>;
  answer: string | null;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
}

type Action =
  | { type: 'dataReceived'; payload: Question[] }
  | { type: 'dataFailed' }
  | { type: 'start' }
  | { type: 'newAnswer'; payload: string }
  | { type: 'nextQuestion' }
  | { type: 'finish' }
  | { type: 'restart' }
  | { type: 'tick' }
  | { type: 'backQuestion' };

interface QuizContextType extends QuizState {
  numQuestions: number;
  maxPossiblePoints: number;
  dispatch: React.Dispatch<Action>;
}

const initialState: QuizState = {
  questions: [],
  status: 'loading',
  allAnswers: [],
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case 'newAnswer': {
      const updatedAnswers = [...state.allAnswers];

      for (let i = state.allAnswers.length; i < state.index; i++) {
        updatedAnswers[i] = null;
      }

      updatedAnswers[state.index] = parseInt(action.payload, 10);

      return {
        ...state,
        answer: action.payload,
        allAnswers: updatedAnswers,
      };
    }

    case 'nextQuestion': {
      const nextAnswer = state.allAnswers[state.index + 1];
      return {
        ...state,
        index: state.index + 1,
        answer: nextAnswer !== undefined ? String(nextAnswer) : null,
      };
    }
    case 'finish': {
      let totalPoints = 0;

      // Doğru yanıtları kontrol ederek puanları hesapla
      state.allAnswers.forEach((answer, index) => {
        if (
          answer !== null &&
          answer === state.questions[index].correctOption
        ) {
          totalPoints += state.questions[index].points;
        }
      });

      return {
        ...state,
        status: 'finished',
        points: totalPoints,
        highscore:
          totalPoints > state.highscore ? totalPoints : state.highscore,
      };
    }

    case 'backQuestion': {
      const previousAnswer = state.allAnswers[state.index - 1];
      return {
        ...state,
        index: state.index - 1,
        answer: previousAnswer !== undefined ? String(previousAnswer) : null,
      };
    }
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining! - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };

    default:
      throw new Error('Action unknown');
  }
}

function QuizProvider({ children }: { children: React.ReactNode }) {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      allAnswers,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0,
  );

  useEffect(() => {
    fetch('/data/questions.json')
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: 'dataReceived', payload: data.questions }),
      )
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch,
        allAnswers,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error('QuizContext was used outside of the QuizProvider');
  return context;
}

export { QuizProvider, useQuiz };
